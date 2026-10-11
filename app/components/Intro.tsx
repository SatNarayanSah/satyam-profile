import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "~/../data/data.json";

const pop = (i: number) => ({
  initial: { opacity: 0, y: 24, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
});

// Orbs sit in a pyramid like the reference; each is a dark sphere with a violet rim.
const orbRows = [data.socialLinks.slice(0, 2), data.socialLinks.slice(2, 5)];
const years = data.counters[0].number.replace("+", "");
const projectCount = data.counters[1].number;

function Orb({ s }: { s: { icon: string; url: string } }) {
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noreferrer"
      className="grid h-14 w-14 place-items-center rounded-full border border-violet-400/40 bg-[radial-gradient(circle_at_50%_120%,rgba(167,139,250,0.9),rgba(20,10,40,0.95)_65%)] shadow-[0_0_24px_rgba(139,92,246,0.45)] transition duration-300 hover:-translate-y-1 hover:scale-110 sm:h-16 sm:w-16"
    >
      <img src={s.icon} alt="" className="h-6 w-6 invert" />
    </a>
  );
}

function Clover() {
  return (
    <div className="relative h-28 w-28">
      {[0, 90, 180, 270].map((r) => (
        <span
          key={r}
          style={{ transform: `rotate(${r}deg) translateY(-26px)` }}
          className="absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16 rounded-full bg-gradient-to-br from-violet-300 to-fuchsia-600 opacity-90 shadow-[0_0_40px_rgba(168,85,247,0.8)]"
        />
      ))}
      <span className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-bg-primary" />
    </div>
  );
}

// Featured projects: tag pills + browser preview, cycled with the arrows.
function ProjectShowcase() {
  const [i, setI] = useState(0);
  const projects = data.projects;
  const p = projects[i];
  const go = (d: number) => setI((i + d + projects.length) % projects.length);

  return (
    <div className="glass relative flex flex-col gap-4 overflow-hidden p-5 md:col-span-8">
      <h3 className="text-sm text-slate-100">
        Latest <span className="accent-serif">Portfolio</span> Projects
      </h3>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-100">
            {t.replace("#", "")}
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="mx-auto w-full max-w-xl overflow-hidden rounded-t-xl border border-white/15 bg-bg-secondary shadow-glow"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="ml-3 truncate text-[10px] text-slate-200">{p.title.trim()}</span>
          </div>
          <img src={p.image} alt={p.alt} className="aspect-[16/8] w-full object-cover object-top" />
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              aria-label={d < 0 ? "Previous project" : "Next project"}
              onClick={() => go(d)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/15"
            >
              {d < 0 ? "‹" : "›"}
            </button>
          ))}
        </div>
        <a href="#contact" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:scale-105">
          Work With Me
        </a>
      </div>
    </div>
  );
}

export default function Intro() {
  return (
    <section className="px-3 pb-4 md:px-5">
      <div className="grid w-full gap-3 md:grid-cols-12">
        {/* Hero */}
        <motion.div {...pop(0)} className="glass relative flex min-h-[340px] flex-col justify-end overflow-hidden p-6 md:col-span-5">
          <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_70%_30%,#000,transparent_65%)]" />
          <div className="absolute left-5 top-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" /> Open to work
          </div>
          <img
            src="/images/Satyam.png"
            alt={data.name}
            className="absolute inset-0 h-full w-full object-cover object-[70%_20%] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
          <div className="relative z-10 space-y-3">
            <p className="max-w-[60%] text-sm text-slate-100">
              Hi! I am {data.name}, aka {data.nickname}, and
            </p>
            <h1 className="font-space text-3xl font-bold leading-tight text-white md:text-4xl">
              I Will Be Your <span className="border-l-2 border-violet-400 pl-2 accent-serif">Developer.</span>
            </h1>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href="#contact" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:scale-105">
                Contact me
              </a>
              <a href={data.buttons[0].url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                Download CV ↓
              </a>
            </div>
          </div>
        </motion.div>

        {/* Connect orbs */}
        <motion.div {...pop(1)} className="glass flex flex-col gap-4 p-6 md:col-span-4">
          <h3 className="text-sm text-slate-200">
            How To Connect With <span className="accent-serif">ME</span>
          </h3>
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            {orbRows.map((row, r) => (
              <div key={r} className="flex gap-3">
                {row.map((s) => (
                  <Orb key={s.url} s={s} />
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div {...pop(2)} className="violet-panel relative flex flex-col items-center justify-between overflow-hidden p-5 text-center md:col-span-3">
          <div className="pt-4">
            <Clover />
          </div>
          <p className="text-left text-sm text-slate-200">
            “Good software is a matter of some <span className="accent-serif">care</span> and <span className="accent-serif">timing</span>.”
            <span className="mt-2 block text-right text-sm text-slate-200">— {data.nickname}</span>
          </p>
        </motion.div>

        {/* Years */}
        <motion.div {...pop(3)} className="violet-panel flex flex-row items-center justify-between p-5 md:col-span-2 md:min-h-[320px] md:flex-col md:items-start">
          <span className="font-space text-8xl font-bold leading-none text-white/90 md:text-[9rem]">{years}</span>
          <span className="text-sm text-slate-200">
            Years Of <span className="accent-serif">Experience</span>
          </span>
        </motion.div>

        <ProjectShowcase />

        {/* Projects count */}
        <motion.div {...pop(5)} className="violet-panel flex flex-row items-center justify-between p-5 md:col-span-2 md:flex-col md:items-end">
          <span className="font-space text-7xl font-bold leading-none text-white/90 md:[writing-mode:vertical-rl] md:text-[7rem]">{projectCount}</span>
          <span className="text-sm text-slate-200 md:text-right">
            Projects <span className="accent-serif">Delivered</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
