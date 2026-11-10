"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getWhatsAppUrl } from "./sections/social";

const links = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "writing", label: "Writing" },
];

function ThemeToggle() {
  const toggle = () => {
    const d = document.documentElement;
    const next = d.dataset.theme === "dark" ? "light" : "dark";
    d.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" className="grid h-9 w-9 place-items-center rounded-full border border-line/15 transition hover:bg-ink/5">
      {/* Both icons render; CSS picks one so server and client markup match. */}
      <svg viewBox="0 0 24 24" className="h-4 w-4 dark:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg viewBox="0 0 24 24" className="hidden h-4 w-4 dark:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the nav link of the section currently in view.
    const obs = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-40% 0px -55% 0px",
    });
    [...links, { id: "contact" }].forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-colors duration-300 ${
        scrolled || open ? "border-b border-line/10 bg-paper/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-display text-sm font-bold text-paper">SS</span>
          <span className="font-display text-[1.05rem] font-semibold tracking-tight">Satyam Sah</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-line/10 bg-surface/60 p-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${active === l.id ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary hidden !py-2 sm:inline-flex">
            Let&apos;s talk
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line/15 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="shell pb-4 md:hidden">
          <div className="card grid gap-1 p-2">
            {[...links, { id: "contact", label: "Contact" }].map((l) => (
              <Link key={l.id} href={`/#${l.id}`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 hover:bg-ink/5">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
