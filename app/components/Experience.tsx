import { motion } from "framer-motion";
import data from "~/../data/data.json";
import Section from "./ui/Section";

type Item = { title: string; sub: string; duration: string; description: string };

function Timeline({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-white">{heading}</h3>
      <ol className="relative space-y-3 border-l border-white/10 pl-5">
        {items.map((it, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`relative glass p-4 tone-${i % 4}`}
          >
            <span className="absolute -left-[27px] top-5 h-3 w-3 rounded-full border-2 border-bg-primary bg-accent-cyan" />
            <div className="text-sm text-accent-cyan">{it.duration}</div>
            <div className="font-semibold text-white">{it.title}</div>
            <div className="text-base text-slate-200">{it.sub}</div>
            <p className="mt-2 line-clamp-3 text-base text-slate-200">{it.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  const work = data.experiences.map((e) => ({ title: e.title, sub: e.company, duration: e.duration, description: e.description }));
  const edu = data.educations.map((e) => ({ title: e.Field, sub: e.institution, duration: e.duration, description: e.description }));
  return (
    <Section id="resume" index="04" title="Experience & education" subtitle="Where I have worked and studied.">
      <div className="grid gap-6 md:grid-cols-2">
        <Timeline heading="Experience" items={work} />
        <Timeline heading="Education" items={edu} />
      </div>
    </Section>
  );
}
