import data from "~/../data/data.json";
import Section from "./Section";

type Entry = { title: string; place: string; duration: string; description: string };

// One bullet per sentence of the description.
const points = (text: string) =>
  text
    .split(/\.\s+/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);

function Timeline({ heading, entries }: { heading: string; entries: Entry[] }) {
  return (
    <div>
      <h3 data-swarm="text" className="label mb-2 w-fit">
        {heading}
      </h3>
      <ol>
        {entries.map((e) => {
          const now = /present/i.test(e.duration);
          return (
            <li key={e.title} data-swarm="block" className="grid gap-3 border-t border-line/15 py-6 sm:grid-cols-[8.5rem_1fr]">
              <div className="flex items-center gap-2 sm:flex-col sm:items-start">
                <span data-swarm="text" className="w-fit font-mono text-sm text-muted">
                  {e.duration}
                </span>
                {now && (
                  <span data-swarm="text" className="w-fit rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    Now
                  </span>
                )}
              </div>
              <div>
                <h4 data-swarm="text" className="w-fit font-display text-xl font-semibold tracking-tight">
                  {e.title}
                </h4>
                <p data-swarm="text" className="mt-0.5 w-fit text-muted">
                  {e.place}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {points(e.description).map((p) => (
                    <li key={p} data-swarm="text" className="flex gap-2.5 leading-relaxed">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Journey() {
  const work = data.experiences.map((e) => ({ title: e.title, place: e.company, duration: e.duration, description: e.description }));
  const study = data.educations.map((e) => ({ title: e.Field, place: e.institution, duration: e.duration, description: e.description }));

  return (
    <Section
      id="journey"
      index="04"
      label="Journey"
      title={
        <>
          Where I&apos;ve <span className="accent-serif">been</span>
        </>
      }
      intro="I started out running engineering labs and IT systems, and now I build full-stack products for clients while finishing my BIT degree."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <Timeline heading="Experience" entries={work} />
        <Timeline heading="Education" entries={study} />
      </div>
    </Section>
  );
}
