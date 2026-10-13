"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "skill", label: "Skills" },
  { id: "resume", label: "Experience" },
  { id: "project", label: "Projects" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-3 z-[100] px-3 md:px-5"
    >
      <div className="glass flex h-14 w-full items-center justify-between !rounded-2xl bg-bg-primary/60 px-5">
        <Link href="/" className="font-space text-lg font-bold text-white" onClick={() => setOpen(false)}>
          Satyam<span className="accent-serif text-xl">_Sah</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                active === l.id ? "bg-white/10 text-white" : "text-slate-200 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-[0_0_24px_rgba(255,255,255,0.25)] transition hover:scale-105 lg:block">
          Hire me
        </Link>

        <button
          aria-label="Toggle menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-white" />
          <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 bg-white" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass mt-2 w-full overflow-hidden bg-bg-primary/90 lg:hidden"
          >
            <div className="flex flex-col p-3">
              {links.map((l) => (
                <Link key={l.id} href={`/#${l.id}`} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-slate-100 hover:bg-white/5 hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
