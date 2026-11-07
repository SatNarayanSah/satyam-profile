"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { SwarmEngine, swarmStore } from "./engine";

const SPEEDS = [0.5, 1, 2, 4];

// Mounts the swarm engine over `#swarm-root`, plays the rebuild automatically on every visit
// and shows a playback dock while it runs. The dock disappears once the page is rebuilt.
export default function SwarmRebuild() {
  const snap = useSyncExternalStore(swarmStore.subscribe, swarmStore.get, swarmStore.server);
  // Read once: StrictMode re-runs the effect after the boot attribute is already gone.
  const arrivedErased = useRef<boolean | null>(null);

  useEffect(() => {
    if (arrivedErased.current === null) arrivedErased.current = document.documentElement.hasAttribute("data-swarm-boot");
    const root = document.getElementById("swarm-root");
    if (!root) return;
    const engine = new SwarmEngine(root);

    // Always plays, on every visit (including when the OS asks for reduced motion).
    if (window.location.hash) {
      // Deep link (e.g. /#contact): rebuild in place, don't drag the reader back to the top.
      if (arrivedErased.current) engine.start();
      else engine.replay();
    } else {
      // First load builds straight away; coming back from another page demolishes first.
      // The tour always starts at the top, so stop the browser restoring an old position.
      history.scrollRestoration = "manual";
      void engine.tour(arrivedErased.current);
    }
    return () => engine.destroy();
  }, []);

  const engine = swarmStore.engine();
  const running = snap.phase === "building" || snap.phase === "erasing";
  if (!engine || !running) return null;

  const pct = snap.total ? Math.round((snap.built / snap.total) * 100) : 0;
  const status = snap.phase === "erasing" ? "Demolishing" : snap.standby ? "Scroll to rebuild" : snap.touring ? "Rebuilding the page" : "Rebuilding";

  return (
    <div className="swarm-dock is-running" role="region" aria-label="Swarm rebuild controls">
      <div className="flex min-w-0 items-center gap-2.5 pl-2 pr-1">
        <span className="swarm-pulse" aria-hidden="true" />
        <div className="min-w-0">
          <p className="truncate text-[0.8rem] font-semibold leading-tight">{status}</p>
          <p className="font-mono text-[0.68rem] leading-tight text-muted" aria-live="polite">
            {snap.built}/{snap.total} · {pct}%
          </p>
        </div>
      </div>
      <div className="hidden h-1 w-20 overflow-hidden rounded-full bg-ink/10 sm:block" aria-hidden="true">
        <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <span className="dock-sep" aria-hidden="true" />
      <button type="button" className="dock-icon" onClick={() => engine.togglePause()} aria-label={snap.paused ? "Resume" : "Pause"}>
        {snap.paused ? <PlayIcon /> : <PauseIcon />}
      </button>
      <div className="hidden items-center rounded-full bg-ink/5 p-0.5 sm:flex" role="group" aria-label="Speed">
        {SPEEDS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => engine.setSpeed(s)}
            aria-pressed={snap.speed === s}
            className={`rounded-full px-2 py-1 font-mono text-[0.7rem] transition ${snap.speed === s ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {s}×
          </button>
        ))}
      </div>
      <button
        type="button"
        className="dock-icon font-mono text-[0.7rem] sm:hidden"
        onClick={() => engine.setSpeed(SPEEDS[(SPEEDS.indexOf(snap.speed) + 1) % SPEEDS.length])}
        aria-label={`Speed ${snap.speed}×, change`}
      >
        {snap.speed}×
      </button>
      <button type="button" className="dock-btn !bg-ink !text-paper" onClick={() => engine.goLive()} title="Skip the animation (Esc)">
        Go live
      </button>
    </div>
  );
}

const svg = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const PlayIcon = () => (
  <svg {...svg} aria-hidden="true">
    <path d="M7 5v14l11-7z" fill="currentColor" />
  </svg>
);
const PauseIcon = () => (
  <svg {...svg} aria-hidden="true">
    <path d="M8 5v14M16 5v14" />
  </svg>
);
