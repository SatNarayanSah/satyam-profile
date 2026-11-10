"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

export default function MermaidDiagram({ chart }: { chart: string }) {
  const id = `mermaid-${useId().replace(/:/g, "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const renderDiagram = async () => {
      try {
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "neutral" });
        const result = await mermaid.render(id, chart);
        if (active) setSvg(result.svg);
      } catch (renderError) {
        console.error("Failed to render blog diagram:", renderError);
        if (active) setError("This diagram could not be rendered.");
      }
    };

    void renderDiagram();
    return () => {
      active = false;
    };
  }, [chart, id]);

  return (
    <figure className="my-8 overflow-hidden rounded-3xl border border-line/15 bg-surface">
      <figcaption className="border-b border-line/10 px-5 py-3">
        <span className="rounded-full bg-accent/10 px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-accent">
          Diagram
        </span>
      </figcaption>
      {error ? (
        <div className="p-5">
          <p className="text-sm text-muted">{error}</p>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-ink/[0.04] p-4 text-sm text-ink/80">
            <code>{chart}</code>
          </pre>
        </div>
      ) : (
        <div
          aria-label="Blog diagram"
          className="overflow-x-auto p-5 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
          role="img"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </figure>
  );
}
