import type { Metadata } from "next";
import Intro from "~/components/Intro";
import AboutSection from "~/components/AboutSection";
import ServicesSection from "~/components/ServicesSection";
import SkillsGrid from "~/components/SkillsGrid";
import Experience from "~/components/Experience";
import Work from "~/components/Work";
import Blog from "~/components/blog/Blog";
import Contact from "~/components/Contact";
import TechMarquee from "~/components/TechMarquee";

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
