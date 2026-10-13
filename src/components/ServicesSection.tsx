"use client";

import { motion } from "framer-motion";
import data from "~/../data/data.json";
import Section from "./ui/Section";

export default function ServicesSection() {
  return (
    <Section id="services" index="02" title="What I do" subtitle="Services I can help you with.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className={`glass p-5 glass-hover tone-${i % 4}`}
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-cyan/15 text-base font-bold text-accent-cyan">
              {i + 1}
            </div>
            <h3 className="mb-1 font-semibold text-white">{s.title}</h3>
            <p className="line-clamp-4 text-base text-slate-200">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
