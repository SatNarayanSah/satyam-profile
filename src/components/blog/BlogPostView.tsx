import { Children, isValidElement, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { BlogPost } from "~/types/types";
import { getWhatsAppUrl } from "~/components/sections/social";
import BlogShareButton from "./BlogShareButton";
import MermaidDiagram from "./MermaidDiagram";

type MarkdownCodeProps = {
  children?: ReactNode;
  className?: string;
};

function getMarkdownComponents(): Components {
  let headingCount = 0;

  return {
    h2: ({ children, node: _node, ...props }) => {
      headingCount += 1;
      const heading = Children.toArray(children)
        .filter((child): child is string | number => typeof child === "string" || typeof child === "number")
        .join("");
      const isExample = /example/i.test(heading);

      return (
        <h2
          {...props}
          className="mt-10 flex scroll-mt-24 items-start gap-3 font-display text-2xl font-semibold leading-tight tracking-tight first:mt-0 md:text-3xl"
        >
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent/10 font-mono text-xs font-semibold text-accent">
            {String(headingCount).padStart(2, "0")}
          </span>
          <span className="flex flex-wrap items-center gap-2">
            {children}
            {isExample && (
              <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-accent">
                Example
              </span>
            )}
          </span>
        </h2>
      );
    },
    h3: ({ children, node: _node, ...props }) => {
      const heading = Children.toArray(children)
        .filter((child): child is string | number => typeof child === "string" || typeof child === "number")
        .join("");

      return (
        <h3 {...props} className="mt-6 flex flex-wrap items-center gap-2 font-display text-xl font-semibold tracking-tight">
          {children}
          {/example/i.test(heading) && (
            <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-accent">
              Example
            </span>
          )}
        </h3>
      );
    },
    p: ({ node: _node, ...props }) => <p {...props} className="mt-3 text-base leading-7 text-ink/85" />,
    ul: ({ node: _node, ...props }) => <ul {...props} className="mt-3 list-disc space-y-2 pl-6 text-base leading-7 text-ink/85 marker:text-accent" />,
    ol: ({ node: _node, ...props }) => <ol {...props} className="mt-3 list-decimal space-y-2 pl-6 text-base leading-7 text-ink/85 marker:text-accent" />,
    li: ({ node: _node, ...props }) => <li {...props} className="pl-1" />,
    strong: ({ node: _node, ...props }) => <strong {...props} className="font-semibold text-ink" />,
    a: ({ node: _node, ...props }) => <a {...props} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent" />,
    blockquote: ({ node: _node, ...props }) => (
      <blockquote {...props} className="mt-4 border-l-2 border-accent/60 pl-4 text-muted [&>p]:mt-0" />
    ),
    hr: () => <hr className="my-6 border-line/15" />,
    table: ({ node: _node, ...props }) => (
      <div className="mt-4 overflow-x-auto rounded-xl border border-line/15">
        <table {...props} className="w-full border-collapse text-left text-sm" />
      </div>
    ),
    th: ({ node: _node, ...props }) => <th {...props} className="border-b border-line/15 bg-ink/[0.04] px-3 py-2.5 font-semibold text-ink" />,
    td: ({ node: _node, ...props }) => <td {...props} className="border-b border-line/10 px-3 py-2.5 leading-6 text-ink/80 last:border-0" />,
    code: ({ className, node: _node, ...props }) => (
      <code {...props} className={`${className ?? ""} rounded bg-ink/[0.06] px-1.5 py-0.5 font-mono text-[0.86em] text-ink`} />
    ),
    pre: ({ children }) => {
      const codeElement = Children.toArray(children).find(
        (child): child is React.ReactElement<MarkdownCodeProps> =>
          isValidElement<MarkdownCodeProps>(child),
      );

      if (!codeElement) return <pre className="mt-6 overflow-x-auto">{children}</pre>;

      const language = codeElement.props.className?.match(/language-([\w-]+)/)?.[1] ?? "code";
      const code = String(codeElement.props.children ?? "").replace(/\n$/, "");

      if (language === "mermaid") return <MermaidDiagram chart={code} />;

      return (
        <figure className="mt-5 overflow-hidden rounded-2xl border border-line/15 bg-ink text-paper shadow-sm">
          <figcaption className="flex items-center justify-between border-b border-paper/10 px-4 py-2.5">
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-paper/60">Code</span>
            <span className="rounded-full bg-paper/10 px-2.5 py-1 font-mono text-[0.68rem] text-paper/70">
              {language}
            </span>
          </figcaption>
          <pre className="overflow-x-auto p-4 text-[0.85rem] leading-6 text-paper/90 sm:p-5">
            <code className="bg-transparent p-0 text-inherit">{code}</code>
          </pre>
        </figure>
      );
    },
  };
}

export default function BlogPostView({ post, markdown }: { post: BlogPost; markdown: string }) {
  const date = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const hasExamples = /^#{2,3}\s+.*example/im.test(markdown);
  const hasCode = /^```(?!mermaid)/im.test(markdown);
  const hasDiagram = /^```mermaid/im.test(markdown);
  const highlights = [
    hasExamples ? "Examples" : null,
    hasCode ? "Code samples" : null,
    hasDiagram ? "Diagrams" : null,
  ].filter((highlight): highlight is string => highlight !== null);

  return (
    <article className="shell max-w-7xl pb-16 pt-20 md:pb-20 md:pt-24">
      <div className="flex items-center justify-between">
        <Link href="/#writing" className="text-sm font-medium text-muted transition hover:text-ink">
          ← All articles
        </Link>
        <BlogShareButton
          post={{ slug: post.slug, title: post.title, description: post.description }}
        />
      </div>

      <header className="mx-auto mt-6 max-w-7xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip !border-accent/25 !bg-accent/5 !text-accent">{post.category}</span>
          <span className="chip text-sm text-muted">{date}</span>
          <span className="chip text-sm text-muted">{post.readTime}</span>
        </div>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted md:text-lg">{post.description}</p>
        {highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Article content">
            <span className="mr-1 text-xs font-medium uppercase tracking-[0.12em] text-muted">In this guide</span>
            {highlights.map((highlight) => (
              <span key={highlight} className="rounded-full border border-line/10 bg-surface/80 px-3 py-1.5 text-xs font-medium text-ink/75">
                {highlight}
              </span>
            ))}
          </div>
        )}
        <div className="card relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_-40px_rgb(var(--ink)/0.35)]">
          <Image
            src={post.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-7xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={getMarkdownComponents()}>
          {markdown}
        </ReactMarkdown>
      </div>

      <footer className="mx-auto mt-10 max-w-[46rem] border-t border-line/15 pt-5">
        <a
          href={getWhatsAppUrl(`Hi Satyam, I just read "${post.title}" and would like to discuss a project.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="card group block p-5 text-center transition hover:border-line/30 sm:p-6"
        >
          <span className="label">Thanks for reading</span>
          <span className="mt-2 block font-display text-xl font-semibold tracking-tight group-hover:text-accent sm:text-2xl">
            Have a project in mind? Message me on WhatsApp →
          </span>
        </a>
      </footer>
    </article>
  );
}
