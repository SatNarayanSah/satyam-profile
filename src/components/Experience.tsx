"use client";

import { motion } from "framer-motion";
import data from "~/../data/data.json";
import Section from "./ui/Section";

type Item = { title: string; sub: string; duration: string; description: string };

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12.5h18" />
  </svg>
);

const CapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
    <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5M22 9.5V15" />
  </svg>
);

const PlaceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5" />
  </svg>
);

// Turn a paragraph into short bullet points, one per sentence.
const toPoints = (text: string) =>
  text
    .split(/\.\s+/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);

function Timeline({ heading, items, icon }: { heading: string; items: Item[]; icon: React.ReactNode }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-200">{icon}</span>
        <h3 className="font-space text-xl font-semibold text-white">{heading}</h3>
        <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-300">
          {items.length} entries
        </span>
      </div>

      <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-gradient-to-b before:from-violet-400/60 before:via-white/10 before:to-transparent">
        {items.map((it, i) => {
          const current = /present/i.test(it.duration);
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`tone-${i % 4} relative flex gap-4`}
            >
              <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[rgb(var(--c)/0.45)] bg-bg-primary font-space text-sm font-bold text-[rgb(var(--c))] shadow-[0_0_18px_-4px_rgb(var(--c)/0.7)]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="glass glass-hover flex-1 !rounded-2xl p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[rgb(var(--c)/0.35)] bg-[rgb(var(--c)/0.12)] px-2.5 py-0.5 font-mono text-xs font-semibold text-[rgb(var(--c))]">
                    {it.duration}
                  </span>
                  {current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" /> Current
                    </span>
                  )}
                </div>

                <h4 className="mt-3 font-space text-lg font-semibold leading-snug text-white">{it.title}</h4>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-300">
                  <PlaceIcon /> {it.sub}
                </div>

                <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  {toPoints(it.description).map((point) => (
                    <li key={point} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-slate-200">
                      <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-[rgb(var(--c))]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m4 8.5 2.5 2.5L12 5.5" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Experience() {
  const work = data.experiences.map((e) => ({ title: e.title, sub: e.company, duration: e.duration, description: e.description }));
  const edu = data.educations.map((e) => ({ title: e.Field, sub: e.institution, duration: e.duration, description: e.description }));
  return (
    <Section id="resume" index="04" title="Experience & education" subtitle="Where I have worked and studied.">
      <div className="grid gap-10 md:grid-cols-2 md:gap-6">
        <Timeline heading="Experience" items={work} icon={<BriefcaseIcon />} />
        <Timeline heading="Education" items={edu} icon={<CapIcon />} />
      </div>
    </Section>
  );
}
