// app/routes/blog.$id.tsx
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { blogPosts } from "./blogPosts";
import type { BlogPost } from "../../types/types";

export async function loader({ params }: LoaderFunctionArgs) {
  const post = blogPosts.posts.find((p) => p.slug === params.slug);
  
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ post });
}

export default function BlogDetailsPage() {
  const { post } = useLoaderData<{ post: BlogPost }>();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative w-full min-h-screen bg-bg-primary pt-32 pb-24 px-6 lg:px-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-purple/5 blur-[120px] rounded-full" />
      </div>

      <article className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Back Button */}
        <Link
          to="/#blog"
          className="inline-flex items-center gap-3 text-[10px] font-black   text-accent-cyan hover:text-white transition-colors group"
        >
          <div className="w-8 h-[1px] bg-accent-cyan/30 group-hover:bg-white transition-colors" />
          [ Return_to_Archives ]
        </Link>

        {/* Header Metadata */}
        <header className="space-y-8">
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="h-[2px] w-8 bg-accent-cyan" />
                <span className="text-[10px] font-black  text-accent-cyan ">
                  DATA_LOG // {post.category.toUpperCase()}
                </span>
             </div>
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white font-space  leading-[0.9] tracking-tighter">
                {post.title}
             </h1>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-[10px] font-sans text-text-muted ">
             <div className="flex items-center gap-2">
                <span className="text-accent-cyan">Published</span>
                <span>{formattedDate}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-accent-cyan">Read time</span>
                <span>{post.readTime}</span>
             </div>
          </div>

          <div className="w-full aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 bg-bg-card/50 shadow-2xl relative group">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
          </div>
        </header>

        {/* Content Body */}
        <div className="space-y-12">
          {post.content.map((section, index) => (
            <section key={index} className="space-y-6">
              <div className="flex items-start gap-6">
                 <span className="text-[10px] font-sans text-accent-cyan/40 mt-1.5">0{index + 1}</span>
                 <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-black text-white  tracking-tight font-space">
                      {section.heading}
                    </h2>
                    <p className="text-lg text-text-primary/80 leading-relaxed font-medium whitespace-pre-line border-l-2 border-accent-cyan/10 pl-8">
                      {section.text}
                    </p>
                 </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer Navigation */}
        <footer className="pt-12 border-t border-white/5">
          <Link
            to="/#blog"
            className="group flex flex-col items-center justify-center p-12 bg-bg-card/30 border border-white/5 rounded-[2.5rem] hover:border-accent-cyan/40 transition-all duration-500"
          >
             <span className="text-[10px] font-black  text-accent-cyan  mb-2">Thanks for reading</span>
             <span className="text-2xl font-black text-white  tracking-tighter group-hover:text-accent-cyan transition-colors">Access All Transmissions →</span>
          </Link>
        </footer>
      </article>
    </div>
  );
}