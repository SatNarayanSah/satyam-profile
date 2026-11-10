import data from "~/../data/data.json";
import { getWhatsAppUrl, socials, SocialIcon } from "./social";

const stack = ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Angular", "Python", "Django", "Tailwind CSS"];

// Each word is its own swarm task so the headline gets rebuilt word by word.
const headline: { word: string; accent?: boolean }[] = [
  { word: "full-stack" },
  { word: "developer" },
  { word: "building" },
  { word: "websites" },
  { word: "and" },
  { word: "apps" },
  { word: "with care.", accent: true },
];

const stats = [
  { value: data.counters[0].number, label: "Years of experience" },
  { value: data.counters[1].number, label: "Projects worked on" },
  { value: data.counters[2].number.replace(/^0/, ""), label: "Open-source libraries" },
  { value: String(data.languages.length), label: "Languages I speak" },
];

export default function Hero() {
  return (
    <section id="top" className="pb-8 pt-24 md:pt-28">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col lg:col-span-8">
          <p data-swarm="text" className="chip w-fit gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to projects and new opportunities
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,5.6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            {headline.map(({ word, accent }) => (
              <span key={word}>
                <span data-swarm="text" className={`inline-block ${accent ? "accent-serif pr-1" : ""}`}>
                  {word}
                </span>{" "}
              </span>
            ))}
          </h1>

          <p data-swarm="text" className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m {data.name}, though most people call me Satyam. I enjoy making websites and web apps with React, Next.js, Node.js, and
            Python. I&apos;m always learning and improving through the projects I work on.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a data-swarm="text" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Talk about a project <span aria-hidden="true">→</span>
            </a>
            <a data-swarm="text" href={data.buttons[0].url} className="btn-ghost">
              Download CV <span aria-hidden="true">↓</span>
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Social profiles">
            {socials.map((s) => (
              <li key={s.url}>
                <a
                  data-swarm="text"
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line/15 bg-surface text-muted transition hover:-translate-y-0.5 hover:text-ink"
                >
                  <SocialIcon path={s.path} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <figure data-swarm="block" className="card relative overflow-hidden !rounded-3xl">
            <img src="/images/Satyam.png" alt={`Portrait of ${data.name}`} className="aspect-[4/4.4] w-full object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-white">
              <figcaption data-swarm="text" className="w-fit">
                <span className="block font-display text-xl font-semibold">{data.name}</span>
                <span className="block font-mono text-xs uppercase tracking-[0.14em] text-white/75">JanakpurDham, Nepal · GMT+5:45</span>
              </figcaption>
            </div>
            <span data-swarm="text" className="absolute right-4 top-4 rotate-3 rounded-full bg-accent px-3 py-1.5 font-mono text-xs font-semibold text-accent-ink shadow-lg">
              {data.title[0]} · {data.title[1]}
            </span>
          </figure>

          <div data-swarm="block" className="card mt-3 p-5">
            <p data-swarm="text" className="label w-fit">
              Now
            </p>
            <p data-swarm="text" className="mt-2 w-fit leading-snug">
              {data.experiences[0].title}, working remotely with clients worldwide.
            </p>
            <p data-swarm="text" className="mt-1 w-fit text-sm text-muted">
              Studying for a BIT at {data.educations[0].institution}.
            </p>
          </div>
        </div>
      </div>

      <div className="shell mt-10">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} data-swarm="block" className="card flex flex-col p-5">
              <dt data-swarm="text" className="order-2 mt-2 w-fit text-sm text-muted">
                {s.label}
              </dt>
              <dd data-swarm="text" className="w-fit font-display text-5xl font-semibold tracking-tight">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span data-swarm="text" className="label mr-2">
            Tools I use
          </span>
          {stack.map((t) => (
            <span key={t} data-swarm="text" className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
