import data from "~/../data/data.json";
import Section from "./Section";

const groups = [
  { title: "Frontend", names: ["HTML5", "CSS3", "JavaScript", "ReactJs", "NextJs", "Remix", "Angular", "Tailwind", "jQuery"] },
  { title: "Backend", names: ["NodeJs", "Express Js", "Python", "Django"] },
  { title: "Design", names: ["Figma", "Adobe Photoshop", "Adobe Illustrator"] },
];

// Ten-segment meter: reads like a small bar chart and redraws nicely left-to-right.
function Meter({ percent }: { percent: number }) {
  const filled = Math.round(percent / 10);
  return (
    <span className="flex gap-[3px]" role="img" aria-label={`${percent}%`}>
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className={`h-3 w-1.5 rounded-sm ${i < filled ? "bg-accent" : "bg-ink/10"}`} />
      ))}
    </span>
  );
}

function SkillGroup({ title, names }: { title: string; names: string[] }) {
  const skills = data.skills.filter((s) => names.includes(s.name));
  return (
    <div data-swarm="block" className="card h-fit p-5 md:p-6">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 data-swarm="text" className="w-fit font-display text-xl font-semibold">
          {title}
        </h3>
        <span data-swarm="text" className="label">
          {skills.length} tools
        </span>
      </div>
      <ul className="divide-y divide-line/10">
        {skills.map((s) => (
          <li key={s.name} data-swarm="text" className="flex items-center gap-3 py-2.5">
            <img src={s.icon} alt="" className="h-5 w-5 object-contain" loading="lazy" />
            <span className="text-[0.95rem]">{s.name}</span>
            <span className="ml-auto flex items-center gap-3">
              <Meter percent={s.percent} />
              <span className="w-7 text-right font-mono text-xs text-muted">{s.percent}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Skills"
      title={
        <>
          Tools I <span className="accent-serif">trust</span>
        </>
      }
      intro="My comfort level with each, rated honestly. I use the frontend tools every day; the design tools come out when a project needs them."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SkillGroup {...groups[0]} />
        <div className="grid content-start gap-4">
          <SkillGroup {...groups[1]} />
          <SkillGroup {...groups[2]} />
        </div>
        <div className="grid content-start gap-4 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-1">
          <div data-swarm="block" className="card p-5 md:p-6">
            <h3 data-swarm="text" className="label w-fit">
              Languages
            </h3>
            <ul className="mt-4 space-y-3">
              {data.languages.map((l) => (
                <li key={l.name} data-swarm="text" className="grid grid-cols-[5.5rem_1fr] items-center gap-3 text-sm">
                  {l.name}
                  <span className="h-1.5 overflow-hidden rounded-full bg-ink/10">
                    <span className="block h-full rounded-full bg-ink" style={{ width: `${l.level}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div data-swarm="block" className="card p-5 md:p-6">
            <h3 data-swarm="text" className="label w-fit">
              Also comfortable with
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.knowledge.map((k) => (
                <li key={k.name} data-swarm="text" className="chip">
                  {k.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
