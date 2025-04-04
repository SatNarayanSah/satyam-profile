import type { MetaFunction } from "@remix-run/node";
import AboutMe from "../components/About";
import Projects from "../components/Projects";
import Resume from "../components/Resume";
import ServicesSection from "../components/Service";
import SkillsSection from "../components/SkillsSection";
import Contact from "./Contact";

export const meta: MetaFunction = () => {
  return [
    { title: "Sat Narayan Sah (Satyam Sah) - MERN Stack Developer - Freelancer" },
    { name: "description", content: "I'm Sat Narayan Sah, a MERN stack developer crafting scalable web apps with MongoDB, Express.js, React.js, Next.js, Remix & Node.js for top performance." },
  ];
};

export default function Index() {
  return (
    <>

      {/* Main Content - Scrollable */}
      <div className="w-full  p-4 lg:top-0 mt-0 lg:pt-14  flex flex-col items-center justify-center ">
        <div className="max-h-[80vh] w-full rounded-3xl overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <AboutMe />
          <ServicesSection />
          <SkillsSection />
          <Resume />
          <Projects />
          <Contact />
          <div className="text-center text-white rounded-xl mt-2  bg-gray-900 p-4 text-sm font-bold">All Copy Right to ©️ satnarayan.com.np - {new Date().getFullYear()} </div>
        </div>
      </div>
    </>
  );
}
