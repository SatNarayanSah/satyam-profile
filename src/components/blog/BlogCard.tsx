"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "../../types/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`group overflow-hidden glass glass-hover tone-${post.slug.length % 4}`}
    >
      <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
        <img src={post.imageUrl} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between text-sm text-slate-200">
          <span className="rounded bg-accent-cyan/10 px-2 py-0.5 text-accent-cyan">{post.category}</span>
          <span>{date} · {post.readTime}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="line-clamp-2 font-semibold text-white group-hover:text-accent-cyan">{post.title}</h3>
        </Link>
        <p className="line-clamp-2 text-base text-slate-200">{post.description}</p>
        <Link href={`/blog/${post.slug}`} className="inline-block text-base font-medium text-accent-cyan">
          Read article →
        </Link>
      </div>
    </motion.article>
  );
}
