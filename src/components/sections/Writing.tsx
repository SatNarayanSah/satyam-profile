import Link from "next/link";
import { blogPosts } from "~/components/blog/blogPosts";
import Section from "./Section";

export default function Writing() {
  return (
    <Section
      id="writing"
      index="05"
      label="Writing"
      title={
        <>
          What I&apos;m <span className="accent-serif">learning</span>
        </>
      }
      intro="Short guides and notes about web topics I am exploring."
    >
      <div className="grid gap-4">
        {blogPosts.posts.map((post) => {
          const date = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-swarm="block"
              className="card group grid overflow-hidden transition hover:border-line/30 md:grid-cols-12"
            >
              <div className="overflow-hidden bg-ink/5 md:col-span-5">
                <img src={post.imageUrl} alt="" loading="lazy" className="aspect-[16/10] h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="flex flex-col gap-3 p-6 md:col-span-7 md:p-8">
                <p data-swarm="text" className="label w-fit">
                  {post.category} · {date} · {post.readTime}
                </p>
                <h3 data-swarm="text" className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {post.title}
                </h3>
                <p data-swarm="text" className="leading-relaxed text-muted">
                  {post.description}
                </p>
                <span data-swarm="text" className="mt-auto w-fit pt-2 text-sm font-semibold text-accent">
                  Read the article <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
