"use client";

import { useState } from "react";
import type { BlogPost } from "~/types/types";

const SITE_URL = "https://satyamsah.com";
const SITE_NAME = "Satyam Sah - Full Stack Developer";

export default function BlogShareButton({
  post,
}: {
  post: Pick<BlogPost, "slug" | "title" | "description">;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
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
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShareOpen(!shareOpen)}
        aria-expanded={shareOpen}
        className="btn-ghost !px-4 !py-2"
      >
        Share
      </button>
      {shareOpen && (
        <div className="card absolute right-0 z-50 mt-2 grid w-48 gap-0.5 p-1.5 shadow-xl">
          {share.map((item) => (
            <a key={item.name} href={item.href} target="_blank" rel="noreferrer" className="rounded-lg px-3 py-2 text-sm hover:bg-ink/5">
              {item.name}
            </a>
          ))}
          <button type="button" onClick={copy} className="rounded-lg px-3 py-2 text-left text-sm hover:bg-ink/5">
            {copied ? "Link copied ✓" : "Copy link"}
          </button>
        </div>
      )}
    </div>
  );
}
