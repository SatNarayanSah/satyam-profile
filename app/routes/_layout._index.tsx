import type { MetaFunction } from "@remix-run/node";
import AboutMe from "../components/About";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import ServicesSection from "../components/Service";
import SkillsSection from "../components/SkillsSection";
import Contact from "./Contact";
import Blog from "~/components/blog/Blog";

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
    <>

      {/* Main Content - Scrollable */}
      <div className="w-full  p-4 lg:top-0 mt-0 lg:pt-14  flex flex-col items-center justify-center ">
        <div className="max-h-[85vh] w-full rounded-3xl overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <AboutMe />
          <ServicesSection />
          <SkillsSection />
          <Resume />
          <Projects />
          <Blog/>
          <Contact />
          
        </div>
      </div>
    </>
  );
}
