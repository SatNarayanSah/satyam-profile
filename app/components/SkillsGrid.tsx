import { motion } from "framer-motion";
import data from "~/../data/data.json";
import Section from "./ui/Section";

export default function SkillsGrid() {
  return (
    <Section id="skill" index="03" title="Skills" subtitle="Technologies and tools, with my comfort level.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {data.skills.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.05 }}
            className={`glass p-3 glass-hover tone-${i % 4}`}
          >
            <div className="mb-2 flex items-center gap-2">
              <img src={s.icon} alt="" className="h-6 w-6 object-contain" />
              <span className="text-base font-medium text-white">{s.name}</span>
              <span className="ml-auto text-sm text-slate-200">{s.percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
