// Swarm Rebuild engine.
//
// Every element marked `data-swarm="text" | "block"` inside the root is a task. A swarm of
// colourful cursor "agents" erases those elements and redraws them one by one: a block is
// scanned top-to-bottom in a zig-zag, a line of text is swept left-to-right. A task only
// becomes drawable once its nearest `data-swarm` ancestor is finished (frame first, then
// contents) and once it has scrolled into view, so the swarm follows the reader down the page.

export type Phase = "idle" | "erasing" | "building" | "done";

export type Snapshot = {
  phase: Phase;
  paused: boolean;
  speed: number;
  built: number;
  total: number;
  touring: boolean;
  standby: boolean; // building, but everything in view is finished: agents parked
};

type Kind = "text" | "block";
type Point = { x: number; y: number };
type Box = Point & { w: number; h: number };

interface Task {
  el: HTMLElement;
  kind: Kind;
  state: "pending" | "active" | "done";
  parent: Task | null;
  children: Task[];
  box: Box;
  seen: boolean;
  inView: boolean;
  ghost: HTMLDivElement;
}

interface Agent {
  el: HTMLDivElement;
  x: number;
  y: number;
  parked: boolean;
  idleSince: number;
}

export const IDLE: Snapshot = { phase: "idle", paused: false, speed: 1, built: 0, total: 0, touring: false, standby: false };

const COLORS = ["#ff4d4f", "#ff9f1a", "#f5c400", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#84cc16", "#e11d48"];
const NAMES = ["layout", "type", "paint", "grid", "pixel", "border", "motion", "copy", "icon", "kern", "color", "align"];
const ARROW =
  '<svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true"><path d="M3 2.5v15l4.2-3.7 2.8 6.1 2.7-1.2-2.7-6 5.9-.3Z" fill="currentColor" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const settle = (a: Animation) => a.finished.then(() => true, () => false);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const tr = (p: Point) => `translate(${p.x}px, ${p.y}px)`;

// One engine at a time; React subscribes to snapshots through this store.
let snapshot: Snapshot = IDLE;
let current: SwarmEngine | null = null;
const subscribers = new Set<() => void>();
const publish = (s: Snapshot) => {
  snapshot = s;
  subscribers.forEach((f) => f());
};

export const swarmStore = {
  subscribe(fn: () => void) {
    subscribers.add(fn);
    return () => void subscribers.delete(fn);
  },
  get: () => snapshot,
  server: () => IDLE,
  engine: () => current,
};

declare global {
  interface Window {
    __swarm?: boolean;
  }
}

export class SwarmEngine {
  private tasks: Task[] = [];
  private agents: Agent[] = [];
  private layer: HTMLDivElement; // agents, above the header
  private ghostLayer: HTMLDivElement; // wireframe placeholders, below the header
  private anims = new Set<Animation>();
  private mult = new WeakMap<Animation, number>();
  private token = 0;
  private waiters: (() => void)[] = [];
  private ro: ResizeObserver;
  private raf = 0;
  private viewRaf = 0;
  private erasing = 0;
  private stopTour: (() => void) | null = null;
  private snap: Snapshot = { ...IDLE, phase: "done" };

  constructor(root: HTMLElement) {
    window.__swarm = true;
    current = this;

    const makeLayer = (cls: string) => {
      const el = document.createElement("div");
      el.className = cls;
      el.setAttribute("aria-hidden", "true");
      document.body.appendChild(el);
      return el;
    };
    this.ghostLayer = makeLayer("swarm-layer swarm-ghosts");
    this.layer = makeLayer("swarm-layer");

    const byEl = new Map<Element, Task>();
    root.querySelectorAll<HTMLElement>("[data-swarm]").forEach((el) => {
      const kind: Kind = el.dataset.swarm === "block" ? "block" : "text";
      const ghost = document.createElement("div");
      ghost.className = "swarm-ghost";
      ghost.dataset.kind = kind;
      const radius = getComputedStyle(el).borderRadius;
      ghost.style.borderRadius = radius === "0px" ? (kind === "text" ? "6px" : "0px") : radius;
      this.ghostLayer.appendChild(ghost);
      const t: Task = { el, kind, state: "done", parent: null, children: [], box: { x: 0, y: 0, w: 0, h: 0 }, seen: false, inView: false, ghost };
      byEl.set(el, t);
      this.tasks.push(t);
    });
    for (const t of this.tasks) {
      const up = t.el.parentElement?.closest("[data-swarm]");
      t.parent = (up && byEl.get(up)) || null;
      t.parent?.children.push(t);
      this.setState(t, "done");
    }

    // Visibility comes from the cached boxes, not IntersectionObserver: Chrome applies the
    // target's own clip-path, so an erased element would never count as visible.
    this.ro = new ResizeObserver(this.scheduleLayout);
    this.ro.observe(document.body);
    window.addEventListener("resize", this.scheduleLayout);
    window.addEventListener("scroll", this.scheduleView, { passive: true });
    window.addEventListener("keydown", this.onKey);
    this.layout();
    this.emit({ total: this.tasks.length, built: this.tasks.length });
  }

  // ---- public controls -------------------------------------------------------------------

  /** First paint: the page arrives erased (see the boot script in layout.tsx); just rebuild. */
  start() {
    this.halt();
    this.tasks.forEach((t) => this.setState(t, "pending"));
    document.documentElement.removeAttribute("data-swarm-boot");
    this.emit({ phase: "building", built: 0, paused: false });
    this.spawn(this.token);
  }

  /** Demolish what is on screen, then rebuild the whole page. */
  replay() {
    this.stopTour?.();
    this.restart();
  }

  goLive() {
    this.stopTour?.();
    this.halt();
    this.tasks.forEach((t) => this.setState(t, "done"));
    document.documentElement.removeAttribute("data-swarm-boot");
    this.emit({ phase: "done", built: this.tasks.length, paused: false, standby: false });
  }

  togglePause() {
    const paused = !this.snap.paused;
    this.anims.forEach((a) => (paused ? a.pause() : a.play()));
    if (!paused) this.waiters.splice(0).forEach((w) => w());
    this.emit({ paused });
  }

  setSpeed(speed: number) {
    this.anims.forEach((a) => a.updatePlaybackRate(speed * (this.mult.get(a) ?? 1)));
    this.emit({ speed });
  }

  /**
   * Auto-scroll down the page, letting the swarm finish each screen before moving on, then
   * glide back to the top. `fresh` = the page arrived erased (first load), so build straight
   * away; otherwise demolish what is visible first. Any wheel/touch/scroll key hands control
   * back to the reader (the swarm keeps rebuilding as they scroll).
   */
  async tour(fresh = false) {
    this.stopTour?.();
    let cancelled = false;
    const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Home", "End"];
    const onUser = (e: Event) => {
      if (e instanceof KeyboardEvent && !keys.includes(e.key)) return;
      stop();
    };
    const stop = () => {
      if (cancelled) return;
      cancelled = true;
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchstart", onUser);
      window.removeEventListener("keydown", onUser);
      this.stopTour = null;
      this.emit({ touring: false });
    };
    this.stopTour = stop;
    window.addEventListener("wheel", onUser, { passive: true });
    window.addEventListener("touchstart", onUser, { passive: true });
    window.addEventListener("keydown", onUser);
    this.emit({ touring: true });
    if (this.snap.speed < 2) this.setSpeed(2); // a full-page tour at 1× drags

    window.scrollTo({ top: 0, behavior: "instant" });
    this.updateView();
    if (cancelled) return;
    if (fresh) this.start();
    else this.restart();

    let reachedEnd = false;
    while (!cancelled) {
      while (!cancelled && !this.screenFinished()) await sleep(150);
      if (cancelled) break;
      await sleep(450 / this.snap.speed);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (cancelled) break;
      if (window.scrollY >= max - 4) {
        reachedEnd = true;
        break;
      }
      window.scrollTo({ top: Math.min(max, window.scrollY + window.innerHeight * 0.8), behavior: "smooth" });
      await sleep(750);
    }
    stop();
    if (reachedEnd) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  destroy() {
    this.stopTour?.();
    this.halt();
    this.tasks.forEach((t) => this.setState(t, "done"));
    this.ro.disconnect();
    cancelAnimationFrame(this.raf);
    cancelAnimationFrame(this.viewRaf);
    window.removeEventListener("resize", this.scheduleLayout);
    window.removeEventListener("scroll", this.scheduleView);
    window.removeEventListener("keydown", this.onKey);
    this.layer.remove();
    this.ghostLayer.remove();
    if (current === this) {
      current = null;
      publish(IDLE);
    }
  }

  // ---- orchestration ---------------------------------------------------------------------

  private restart() {
    this.halt();
    // Off-screen work is reset instantly; what the reader can see gets demolished by the swarm.
    this.tasks.forEach((t) => !t.inView && this.setState(t, "pending"));
    this.emit({ phase: "erasing", built: this.count(), paused: false });
    this.spawn(this.token);
  }

  /** Stop every agent and animation; tasks fall back to their last settled state. */
  private halt() {
    this.token++;
    this.anims.forEach((a) => a.cancel());
    this.anims.clear();
    this.waiters.splice(0).forEach((w) => w());
    for (const t of this.tasks) if (t.state === "active") this.setState(t, t.el.dataset.swarmState === "done" ? "done" : "pending");
    this.agents.forEach((a) => a.el.remove());
    this.agents = [];
    this.erasing = 0;
  }

  private spawn(tk: number) {
    const w = window.innerWidth;
    const n = w >= 1024 ? 12 : w >= 640 ? 9 : 6;
    const dock = this.dockPoint();
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "swarm-agent";
      el.style.setProperty("--agent", COLORS[i % COLORS.length]);
      el.innerHTML = `${ARROW}<span class="swarm-tag">${NAMES[i % NAMES.length]}</span>`;
      const a: Agent = { el, x: dock.x + (Math.random() - 0.5) * 60, y: dock.y + (Math.random() - 0.5) * 20, parked: false, idleSince: 0 };
      el.style.transform = tr(a);
      this.layer.appendChild(el);
      this.agents.push(a);
      void this.run(a, tk, i * 70);
    }
  }

  private async run(a: Agent, tk: number, delay: number) {
    await sleep(delay);
    while (tk === this.token) {
      await this.gate();
      if (tk !== this.token) return;

      if (this.snap.phase === "erasing") {
        const t = this.pick(a, (t) => t.state === "done" && t.inView && t.children.every((c) => c.state === "pending"));
        if (t) {
          this.erasing++;
          await this.draw(a, t, tk, "erase");
          this.erasing--;
        } else if (this.erasing === 0) {
          this.finishErase();
        } else {
          await this.wander(a, tk);
        }
        continue;
      }

      const t = this.pick(a, this.buildable);
      if (t) {
        a.idleSince = 0;
        if (a.parked) this.unpark(a);
        await this.draw(a, t, tk, "build");
      } else if (this.count() >= this.tasks.length) {
        this.complete(tk);
        return;
      } else {
        await this.idle(a, tk);
      }
    }
  }

  private buildable = (t: Task) => t.state === "pending" && t.seen && (!t.parent || t.parent.state === "done");

  private pick(a: Agent, ok: (t: Task) => boolean) {
    let best: Task | null = null;
    let bestD = Infinity;
    for (const t of this.tasks) {
      if (!ok(t)) continue;
      const d = Math.hypot(t.box.x + t.box.w / 2 - a.x, t.box.y + t.box.h / 2 - a.y);
      if (d < bestD) {
        bestD = d;
        best = t;
      }
    }
    if (best) best.state = "active";
    return best;
  }

  /** Sweep one task: reveal it ("build") or wipe it away ("erase"), cursor riding the edge. */
  private async draw(a: Agent, t: Task, tk: number, mode: "build" | "erase") {
    const path = this.path(t);
    if (!(await this.moveTo(a, path[0], tk))) return;

    const build = mode === "build";
    if (build) {
      t.ghost.dataset.state = "active";
      t.ghost.style.setProperty("--agent", a.el.style.getPropertyValue("--agent"));
    }
    const { w, h } = t.box;
    const base = t.kind === "text" ? clamp(w * 1.1 + 160, 280, 1100) : clamp((w + h) * 0.75, 520, 1500);
    const dur = build ? base : base * 0.4;
    const easing = t.kind === "text" ? "cubic-bezier(.4,0,.2,1)" : "linear";
    const clip =
      t.kind === "text"
        ? build ? ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] : ["inset(0 0 0 0%)", "inset(0 0 0 100%)"]
        : build ? ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] : ["inset(0% 0 0 0)", "inset(100% 0 0 0)"];
    const mult = build ? this.boost() : 2.2;

    const reveal = this.play(t.el, clip.map((clipPath) => ({ clipPath })), dur, easing, mult);
    const cursor = this.play(a.el, path.map((p) => ({ transform: tr(p) })), dur, easing, mult);
    const ok = (await Promise.all([settle(reveal), settle(cursor)])).every(Boolean);
    if (!ok || tk !== this.token) return;

    this.place(a, path[path.length - 1]);
    cursor.cancel();
    // Commit the end state before dropping the animation so nothing flashes for a frame.
    this.setState(t, build ? "done" : "pending");
    reveal.cancel();
    this.emit({ built: this.count() });
  }

  private finishErase() {
    if (this.snap.phase !== "erasing") return;
    this.tasks.forEach((t) => this.setState(t, "pending"));
    this.emit({ phase: "building", built: 0 });
  }

  private complete(tk: number) {
    if (tk !== this.token) return;
    this.token++;
    this.anims.forEach((a) => a.cancel());
    this.anims.clear();
    const dock = this.dockPoint();
    const leaving = this.agents;
    this.agents = [];
    leaving.forEach((a, i) => {
      const exit = a.el.animate(
        [
          { transform: tr(a), opacity: a.parked ? 0 : 1 },
          { transform: tr({ x: dock.x + (i - leaving.length / 2) * 14, y: dock.y + 30 }), opacity: 0 },
        ],
        { duration: 600, delay: i * 30, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" }
      );
      void settle(exit).then(() => a.el.remove());
    });
    this.emit({ phase: "done", standby: false });
  }

  // ---- agent movement --------------------------------------------------------------------

  private async idle(a: Agent, tk: number) {
    if (a.parked) return sleep(220);
    const now = performance.now();
    if (!a.idleSince) a.idleSince = now;
    if (now - a.idleSince < 1400) return this.wander(a, tk);
    // Nothing left on screen: return to the dock and wait for the reader to scroll.
    if (!(await this.moveTo(a, this.dockPoint(), tk))) return;
    const fade = this.play(a.el, [{ opacity: 1 }, { opacity: 0 }], 250, "ease-out", 1);
    if (!(await settle(fade)) || tk !== this.token) return;
    a.el.style.opacity = "0";
    fade.cancel();
    a.parked = true;
    this.emit({ standby: this.agents.every((x) => x.parked) });
  }

  private unpark(a: Agent) {
    this.place(a, this.dockPoint());
    a.el.style.opacity = "1";
    a.parked = false;
    this.emit({ standby: false });
  }

  private async wander(a: Agent, tk: number) {
    const sx = window.scrollX;
    const sy = window.scrollY;
    const p = {
      x: clamp(a.x + (Math.random() - 0.5) * 360, sx + 30, sx + window.innerWidth - 60),
      y: clamp(a.y + (Math.random() - 0.5) * 260, sy + 90, sy + window.innerHeight - 70),
    };
    await this.moveTo(a, p, tk);
    await sleep(120);
  }

  private async moveTo(a: Agent, p: Point, tk: number) {
    const dur = clamp(Math.hypot(p.x - a.x, p.y - a.y) * 0.9, 200, 900);
    const anim = this.play(a.el, [{ transform: tr(a) }, { transform: tr(p) }], dur, "cubic-bezier(.22,.8,.24,1)", this.boost());
    const ok = await settle(anim);
    if (!ok || tk !== this.token) return false;
    this.place(a, p);
    anim.cancel();
    return true;
  }

  private place(a: Agent, p: Point) {
    a.x = p.x;
    a.y = p.y;
    a.el.style.transform = tr(p);
  }

  /** Cursor route over a task: one straight sweep for text, a zig-zag scan for blocks. */
  private path(t: Task): Point[] {
    const { x, y, w, h } = t.box;
    if (t.kind === "text") return [{ x: x + 2, y: y + h / 2 }, { x: x + w - 2, y: y + h / 2 }];
    const rows = clamp(Math.round(h / 110), 1, 5);
    const pts: Point[] = [];
    for (let r = 0; r < rows; r++) {
      const ry = y + (h * (r + 0.5)) / rows;
      const [from, to] = r % 2 ? [x + w - 8, x + 8] : [x + 8, x + w - 8];
      pts.push({ x: from, y: ry }, { x: to, y: ry });
    }
    return pts;
  }

  // ---- plumbing --------------------------------------------------------------------------

  private play(el: Element, frames: Keyframe[], duration: number, easing: string, mult: number) {
    const anim = el.animate(frames, { duration, easing, fill: "forwards" });
    anim.playbackRate = this.snap.speed * mult;
    if (this.snap.paused) anim.pause();
    this.mult.set(anim, mult);
    this.anims.add(anim);
    const drop = () => this.anims.delete(anim);
    anim.addEventListener("finish", drop);
    anim.addEventListener("cancel", drop);
    return anim;
  }

  /** Speed up when a long backlog is waiting (e.g. the reader scrolled fast). */
  private boost() {
    const backlog = this.tasks.reduce((n, t) => n + (t.state === "pending" && t.seen ? 1 : 0), 0);
    const cap = Math.max(1, this.agents.length) * 3;
    return backlog > cap ? Math.min(3, backlog / cap) : 1;
  }

  private gate() {
    return this.snap.paused ? new Promise<void>((r) => this.waiters.push(r)) : Promise.resolve();
  }

  private setState(t: Task, s: "pending" | "done") {
    t.state = s;
    t.el.dataset.swarmState = s;
    t.ghost.dataset.state = s;
  }

  private count() {
    return this.tasks.reduce((n, t) => n + (t.state === "done" ? 1 : 0), 0);
  }

  private screenFinished() {
    return this.snap.phase === "done" || (this.snap.phase === "building" && !this.tasks.some((t) => t.inView && t.state !== "done"));
  }

  private dockPoint(): Point {
    return { x: window.scrollX + window.innerWidth / 2, y: window.scrollY + window.innerHeight - 56 };
  }

  private scheduleLayout = () => {
    cancelAnimationFrame(this.raf);
    this.raf = requestAnimationFrame(() => this.layout());
  };

  private layout() {
    const sx = window.scrollX;
    const sy = window.scrollY;
    let skipped = false;
    for (const t of this.tasks) {
      const r = t.el.getBoundingClientRect();
      t.box = { x: r.left + sx, y: r.top + sy, w: r.width, h: r.height };
      // Detached or display:none at this breakpoint: nothing to draw.
      if ((!t.el.isConnected || (r.width === 0 && r.height === 0)) && t.state === "pending") {
        this.setState(t, "done");
        skipped = true;
      }
      const g = t.ghost.style;
      g.transform = `translate(${t.box.x}px, ${t.box.y}px)`;
      g.width = `${t.box.w}px`;
      g.height = `${t.box.h}px`;
    }
    if (skipped) this.emit({ built: this.count() });
    this.updateView();
  }

  private scheduleView = () => {
    cancelAnimationFrame(this.viewRaf);
    this.viewRaf = requestAnimationFrame(() => this.updateView());
  };

  /** A task counts as in view once it overlaps the viewport (minus a small bottom margin). */
  private updateView() {
    const top = window.scrollY;
    const bottom = top + window.innerHeight * 0.94;
    for (const t of this.tasks) {
      t.inView = t.box.y < bottom && t.box.y + t.box.h > top;
      if (t.inView) t.seen = true;
    }
  }

  private onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && (this.snap.phase === "building" || this.snap.phase === "erasing")) this.goLive();
  };

  private emit(patch: Partial<Snapshot>) {
    this.snap = { ...this.snap, ...patch, total: this.tasks.length };
    if (current === this) publish(this.snap);
  }
}
