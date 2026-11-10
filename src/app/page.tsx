import type { Metadata } from "next";
import Hero from "~/components/sections/Hero";
import Work from "~/components/sections/Work";
import Services from "~/components/sections/Services";
import Skills from "~/components/sections/Skills";
import Journey from "~/components/sections/Journey";
import Writing from "~/components/sections/Writing";
import Contact from "~/components/sections/Contact";
import SwarmRebuild from "~/components/swarm/SwarmRebuild";

export const metadata: Metadata = {
  title: "Satyam Sah | Full-Stack Developer",
  description:
    "Hi, I'm Satyam, a full-stack developer from Nepal. I enjoy building websites and web apps with React, Next.js, Node.js, and Python while continuing to learn.",
  keywords:
    "Satyam Sah, Full-Stack Developer, Web Developer, React, Next.js, Node.js, Python, TypeScript, Nepal",
  openGraph: {
    title: "Satyam Sah | Full-Stack Developer",
    description:
      "Take a look at the websites and web apps I've worked on and the tools I use as I continue learning full-stack development.",
    url: "https://satyamsah.com",
  },
};

export default function Index() {
  return (
    <>
      <div id="swarm-root">
        <Hero />
        <Work />
        <Services />
        <Skills />
        <Journey />
        <Writing />
        <Contact />
        <footer className="pb-24 pt-6">
          <div className="shell flex flex-col gap-3 border-t border-line/15 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
            <p data-swarm="text" className="w-fit">
              © {new Date().getFullYear()} Sat Narayan Sah · JanakpurDham, Nepal
            </p>
           
            <a data-swarm="text" href="#top" className="w-fit font-medium text-ink hover:text-accent">
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>
      <SwarmRebuild />
    </>
  );
}
