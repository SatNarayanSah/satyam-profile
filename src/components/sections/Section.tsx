import type { ReactNode } from "react";

// Shared section frame: a rule the swarm draws first, a numbered label, then title and intro.
export default function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="py-14 md:py-20">
      <div className="shell">
        <div data-swarm="text" className="h-px w-full bg-line/20" />
        <div className="mb-10 mt-6 grid gap-4 md:mb-12 md:grid-cols-12">
          <p data-swarm="text" className="label h-fit w-fit md:col-span-3">
            <span className="text-accent">{index}</span> / {label}
          </p>
          <div className="md:col-span-9">
            <h2 data-swarm="text" className="w-fit font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              {title}
            </h2>
            {intro && (
              <p data-swarm="text" className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                {intro}
              </p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
