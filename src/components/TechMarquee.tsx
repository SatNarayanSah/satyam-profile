const stack = ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Angular", "Next.js", "Remix", "AWS", "Docker", "GraphQL", "Tailwind CSS"];

export default function TechMarquee() {
  const row = [...stack, ...stack];
  return (
    <div className="relative w-full overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max gap-3 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="whitespace-nowrap rounded-full glass !rounded-full px-4 py-1.5 text-sm text-text-primary/80">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
