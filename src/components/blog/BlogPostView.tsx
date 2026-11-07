"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "~/types/types";

const SITE_URL = "https://satyamsah.com";
const SITE_NAME = "Satyam Sah - Full Stack Developer";

export default function BlogPostView({ post }: { post: BlogPost }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const date = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const url = encodeURIComponent(`${SITE_URL}/blog/${post.slug}`);
  const title = encodeURIComponent(post.title);

  const share = [
    { name: "X / Twitter", href: `https://twitter.com/intent/tweet?text=${title}&url=${url}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${encodeURIComponent(post.description)}&source=${encodeURIComponent(SITE_NAME)}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${SITE_URL}/blog/${post.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  return (
    <article className="shell max-w-3xl pb-24 pt-28 md:pt-32">
      <div className="flex items-center justify-between">
        <Link href="/#writing" className="text-sm font-medium text-muted transition hover:text-ink">
          ← All articles
        </Link>
        <div className="relative">
          <button type="button" onClick={() => setShareOpen(!shareOpen)} aria-expanded={shareOpen} className="btn-ghost !px-4 !py-2">
            Share
          </button>
          {shareOpen && (
            <div className="card absolute right-0 z-50 mt-2 grid w-48 gap-0.5 p-1.5 shadow-xl">
              {share.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="rounded-lg px-3 py-2 text-sm hover:bg-ink/5">
                  {s.name}
                </a>
              ))}
              <button type="button" onClick={copy} className="rounded-lg px-3 py-2 text-left text-sm hover:bg-ink/5">
                {copied ? "Link copied ✓" : "Copy link"}
              </button>
            </div>
          )}
        </div>
      </div>

      <header className="mt-10">
        <p className="label">
          <span className="text-accent">{post.category}</span> · {date} · {post.readTime}
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] md:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
        <img src={post.imageUrl} alt="" className="card mt-10 aspect-video w-full object-cover" />
      </header>

      <div className="mt-12 space-y-10">
        {post.content.map((section, i) => (
          <section key={i}>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{section.heading}</h2>
            <p className="mt-3 whitespace-pre-line text-lg leading-relaxed text-ink/85">{section.text}</p>
          </section>
        ))}
      </div>

      <footer className="mt-16 border-t border-line/15 pt-8">
        <Link href="/#contact" className="card group block p-8 text-center transition hover:border-line/30">
          <span className="label">Thanks for reading</span>
          <span className="mt-2 block font-display text-2xl font-semibold tracking-tight group-hover:text-accent">
            Have a project in mind? Let&apos;s talk →
          </span>
        </Link>
      </footer>
    </article>
  );
}
