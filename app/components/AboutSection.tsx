import data from "~/../data/data.json";
import Section from "./ui/Section";

export default function AboutSection() {
  return (
    <Section id="about" index="01" title="About me" subtitle="A short summary of who I am and how I work.">
      <div className="grid gap-3 md:grid-cols-3">
        <p className="glass p-5 text-base leading-relaxed text-slate-100 md:col-span-2">
          {data.description}
        </p>
        <dl className="space-y-3 glass p-5 text-base">
          {data.contactInfo.map((c) => (
            <div key={c.label}>
              <dt className="text-sm text-slate-300">{c.label}</dt>
              <dd className="break-words text-slate-200">
                {"link" in c && c.link ? <a href={c.link} className="hover:text-accent-cyan">{c.value}</a> : c.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
