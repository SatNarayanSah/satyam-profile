import type { MetaFunction } from "@remix-run/node";
import Intro from "~/components/Intro";
import AboutSection from "~/components/AboutSection";
import ServicesSection from "~/components/ServicesSection";
import SkillsGrid from "~/components/SkillsGrid";
import Experience from "~/components/Experience";
import Work from "~/components/Work";
import Blog from "~/components/blog/Blog";
import Contact from "./Contact";
import TechMarquee from "~/components/TechMarquee";

export const meta: MetaFunction = () => {
  return [
    { title: "Satyam Sah | Full Stack Developer" },
    { name: "description", content: "Portfolio of Satyam Sah - Full Stack Developer & Solutions Architect with expertise in scalable applications, microservices, and cloud architecture. Specializing in high-performance MERN stack solutions and system design." },
    { property: "og:title", content: "Satyam Sah | Full Stack Developer & Solutions Architect | Professional Portfolio" },
    { property: "og:description", content: "Discover the portfolio of a Full Stack Developer specializing in scalable applications, microservices architecture, and cloud-native solutions. Expert in MERN stack and system design." },
    { property: "og:url", content: "https://satyamsah.com" },
    { name: "keywords", content: "Satyam Sah, Full Stack Developer, Solutions Architect, Web Applications, System Design, Cloud Architecture, MERN Stack Expert, Microservices, React.js, Node.js, MongoDB, Express.js, TypeScript, Performance Optimization" },
  ];
};

export default function Index() {
  return (
    <div className="flex w-full flex-col">
      <Intro />
      <TechMarquee />
      <AboutSection />
      <ServicesSection />
      <SkillsGrid />
      <Experience />
      <Work />
      <Blog />
      <Contact />
      <footer className="border-t border-white/10 px-5 py-6 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} Satyam Sah. Built with Remix & Tailwind.
      </footer>
    </div>
  );
}
