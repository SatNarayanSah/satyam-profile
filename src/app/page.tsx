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
  title: "Satyam Sah | Full Stack Developer",
  description:
    "Portfolio of Satyam Sah - Full Stack Developer & Solutions Architect with expertise in scalable applications, microservices, and cloud architecture. Specializing in high-performance MERN stack solutions and system design.",
  keywords:
    "Satyam Sah, Full Stack Developer, Solutions Architect, Web Applications, System Design, Cloud Architecture, MERN Stack Expert, Microservices, React.js, Node.js, MongoDB, Express.js, TypeScript, Performance Optimization",
  openGraph: {
    title: "Satyam Sah | Full Stack Developer & Solutions Architect | Professional Portfolio",
    description:
      "Discover the portfolio of a Full Stack Developer specializing in scalable applications, microservices architecture, and cloud-native solutions. Expert in MERN stack and system design.",
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
