import data from "~/../data/data.json";
import Section from "./Section";
import { getWhatsAppUrl } from "./social";

type Project = (typeof data.projects)[number];

// Placeholder links in the data become a direct WhatsApp demo request.
const links = (p: Project) => {
  const repo = p.buttons.find((b) => b.text === "Github" && b.url !== "https://github.com")?.url;
  const live = p.buttons.find((b) => b.text === "View" && b.url.startsWith("http"))?.url;
  return { repo, live };
};

const tags = (p: Project) => p.tags.map((t) => t.replace("#", ""));

function Links({ p }: { p: Project }) {
  const { repo, live } = links(p);
  return (
    <div className="flex flex-wrap gap-2">
      {live ? (
        <a data-swarm="text" href={live} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2">
          Live site <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <a data-swarm="text" href={getWhatsAppUrl(`Hi Satyam, could you share more about ${p.title.trim()}?`)} target="_blank" rel="noopener noreferrer" className="btn-ghost !px-4 !py-2">
          Request a demo
        </a>
      )}
      {repo && (
        <a data-swarm="text" href={repo} target="_blank" rel="noreferrer" className="btn-ghost !px-4 !py-2">
          Source <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

export default function Work() {
  const featured = data.projects.find((p) => links(p).live) ?? data.projects[0];
  const rest = data.projects.filter((p) => p !== featured);

  return (
    <Section
      id="work"
      index="01"
      label="Selected work"
      title={
        <>
          Things I&apos;ve <span className="accent-serif">built</span>
        </>
      }
      intro="A mix of client sites and products I built to learn something new. Most are live, and the code for many of them is on GitHub."
    >
      <article data-swarm="block" className="card grid overflow-hidden md:grid-cols-12">
        <div className="overflow-hidden border-b border-line/10 bg-ink/5 md:col-span-7 md:border-b-0 md:border-r">
          <img src={featured.image} alt={featured.alt} className="aspect-[16/10] h-full w-full object-cover object-top" />
        </div>
        <div className="flex flex-col justify-between gap-6 p-6 md:col-span-5 md:p-8">
          <div>
            <p data-swarm="text" className="label w-fit">
              Featured project
            </p>
            <h3 data-swarm="text" className="mt-3 w-fit font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {featured.title.trim()}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech used">
              {tags(featured).map((t) => (
                <li key={t} data-swarm="text" className="chip font-mono !text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Links p={featured} />
        </div>
      </article>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <article key={p.id} data-swarm="block" className="card group flex flex-col overflow-hidden">
            <div className="relative overflow-hidden border-b border-line/10 bg-ink/5">
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2 py-0.5 font-mono text-[0.7rem] backdrop-blur">
                {String(i + 2).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <h3 data-swarm="text" className="w-fit font-display text-xl font-semibold tracking-tight">
                {p.title.trim()}
              </h3>
              <p data-swarm="text" className="w-fit font-mono text-xs text-muted">
                {tags(p).slice(0, 4).join(" · ")}
              </p>
              <div className="mt-auto">
                <Links p={p} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
