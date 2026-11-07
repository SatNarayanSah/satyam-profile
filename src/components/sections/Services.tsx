import data from "~/../data/data.json";
import Section from "./Section";

export default function Services() {
  return (
    <Section
      id="services"
      index="02"
      label="Services"
      title={
        <>
          How I can <span className="accent-serif">help</span>
        </>
      }
      intro={data.ServiceDescription}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {data.services.map((s, i) => (
          <div key={s.id} data-swarm="block" className="card group flex gap-5 p-6 transition hover:border-line/30 md:p-7">
            <span data-swarm="text" className="h-fit font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 data-swarm="text" className="w-fit font-display text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p data-swarm="text" className="mt-2 leading-relaxed text-muted">
                {s.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
