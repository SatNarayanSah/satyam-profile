"use client";

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

// Official brand marks in their original colours, keyed by the link's domain.
const brands: Record<string, { name: string; color: string; logo: React.ReactNode }> = {
  facebook: {
    name: "Facebook",
    color: "#1877F2",
    logo: (
      <>
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path fill="#fff" d="M16.671 15.469L17.203 12h-3.328V9.749c0-.949.465-1.874 1.956-1.874h1.513V4.922s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669V12H7.078v3.469h3.047v8.385a12.09 12.09 0 003.75 0v-8.385z" />
      </>
    ),
  },
  instagram: {
    name: "Instagram",
    color: "#E1306C",
    logo: (
      <>
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0" stopColor="#fdf497" />
            <stop offset="0.05" stopColor="#fdf497" />
            <stop offset="0.45" stopColor="#fd5949" />
            <stop offset="0.6" stopColor="#d6249f" />
            <stop offset="0.9" stopColor="#285AEB" />
          </radialGradient>
        </defs>
        <rect x="1" y="1" width="22" height="22" rx="6.5" fill="url(#ig-grad)" />
        <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.7" />
        <circle cx="15.9" cy="8.1" r="0.95" fill="#fff" />
      </>
    ),
  },
  github: {
    name: "GitHub",
    color: "#ffffff",
    logo: (
      <path fill="#fff" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
  },
  linkedin: {
    name: "LinkedIn",
    color: "#0A66C2",
    logo: (
      <>
        <rect x="2" y="2" width="20" height="20" fill="#fff" />
        <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </>
    ),
  },
  "wa.me": {
    name: "WhatsApp",
    color: "#25D366",
    logo: (
      <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    ),
  },
};

function Orb({ s }: { s: { icon: string; url: string } }) {
  const brand = Object.entries(brands).find(([key]) => s.url.includes(key))?.[1];
  if (!brand) return null;
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noreferrer"
      aria-label={brand.name}
      title={brand.name}
      style={{ "--brand": brand.color } as React.CSSProperties}
      className="grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-1 hover:scale-110 hover:border-[color:var(--brand)] hover:shadow-[0_0_28px_-4px_var(--brand)] sm:h-16 sm:w-16"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        {brand.logo}
      </svg>
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
