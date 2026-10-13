"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "~/types/types";

const SITE_URL = "https://satyamsah.com";
const SITE_NAME = "Satyam Sah - Full Stack Developer";

export default function BlogPostView({ post }: { post: BlogPost }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}&source=${encodeURIComponent(SITE_NAME)}`,
      '_blank',
      'width=550,height=420'
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL: ', err);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-bg-primary pt-28 pb-24 px-6 lg:px-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-purple/5 blur-[120px] rounded-full" />
      </div>

      <article className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-3 text-[10px] font-black   text-accent-cyan hover:text-white transition-colors group"
          >
            <div className="w-8 h-[1px] bg-accent-cyan/30 group-hover:bg-white transition-colors" />
            [ Return_to_Archives ]
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsShareOpen(!isShareOpen)}
              className="p-3 rounded-full bg-bg-card/50 backdrop-blur-xl border border-white/10 hover:border-accent-cyan/40 transition-all text-accent-cyan shadow-glow-sm"
              aria-label="Share options"
            >
              <img src="/icons/share.svg" alt="" className="h-5 w-5 invert" />
            </button>
            <AnimatePresence>
              {isShareOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-56 bg-bg-card/90 backdrop-blur-2xl rounded-2xl shadow-2xl z-50 border border-white/10 p-2 overflow-hidden"
                >
                  <div className="space-y-1">
                    {[
                      { name: 'Twitter', icon: 'twitter', action: shareOnTwitter },
                      { name: 'Facebook', icon: 'facebook', action: shareOnFacebook },
                      { name: 'LinkedIn', icon: 'linkedin', action: shareOnLinkedIn },
                    ].map((platform) => (
                      <button
                        key={platform.name}
                        onClick={platform.action}
                        className="flex items-center px-4 py-3 w-full text-left rounded-xl hover:bg-white/5 transition-colors text-[10px] font-black   text-white/70 hover:text-accent-cyan"
                      >
                        <img src={`/icons/${platform.icon}.svg`} alt="" className="h-4 w-4 mr-3 invert" />
                        {platform.name}
                      </button>
                    ))}
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center px-4 py-3 w-full text-left rounded-xl hover:bg-white/5 transition-colors text-[10px] font-black   text-white/70 hover:text-accent-cyan"
                    >
                      <img src="/icons/copy-link.svg" alt="" className="h-4 w-4 mr-3 invert" />
                      {isCopied ? 'Access_Link_Copied' : 'Copy_Asset_Link'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

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
            href="/#blog"
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