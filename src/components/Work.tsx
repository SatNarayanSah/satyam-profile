"use client";

import { motion } from "framer-motion";
import data from "~/../data/data.json";
import Section from "./ui/Section";

export default function Work() {
  return (
    <Section id="project" index="05" title="Projects" subtitle="Some things I have built recently.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.projects.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08 }}
            whileHover={{ y: -4 }}
            className={`group overflow-hidden glass glass-hover tone-${i % 4}`}
          >
            <div className="aspect-video overflow-hidden bg-black/30">
              <img src={p.image} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="space-y-2 p-4">
              <h3 className="font-semibold text-white">{p.title.trim()}</h3>
              <div className="flex flex-wrap gap-1.5">
                {p.tags.slice(0, 4).map((t) => (
                  <span key={t} className="rounded bg-accent-cyan/10 px-2 py-0.5 text-sm text-accent-cyan">{t.replace("#", "")}</span>
                ))}
              </div>
              <div className="flex gap-4 pt-1 text-base font-medium">
                {p.buttons.map((b) => (
                  <a key={b.text} href={b.url} target={b.url.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-slate-100 hover:text-accent-cyan">
                    {b.text} ↗
                  </a>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
