import type { MetaFunction } from "@remix-run/node";

import AboutMe from "~/components/About";
import Contact from "~/components/Contact";
import Profile from "~/components/Profile";
import Projects from "~/components/Projects";
import Resume from "~/components/Resume";
import ServicesSection from "~/components/Service";
import Sidebar from "~/components/Sidebar";
import SkillsSection from "~/components/SkillsSection";

export const meta: MetaFunction = () => {
  return [
    { title: "Sat Narayan Sah" },
    { name: "description", content: "MERN Stack Developer" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="container mx-auto">
        <div className="flex  min-h-screen w-full flex-col lg:flex-row">
          {/* Sidebar - Fixed on all screens */}
          <div className="w-full lg:w-[200px] lg:h-screen  lg:left-0 lg:top-0  shadow-md flex items-center justify-center">
            <Sidebar />
          </div>

          {/* Profile - Fixed on all screens */}
          <div className="w-full lg:w-[350px] lg:h-screen  lg:left-[150px] lg:top-0  shadow-md flex items-center justify-center mt-4 lg:mt-0">
            <Profile />
          </div>

          {/* Main Content - Scrollable */}
          <div className="w-full  p-4 lg:top-0 mt-0 lg:p-8  flex flex-col items-center justify-center ">
            <div className="max-h-[550px] w-full rounded-3xl overflow-scroll">
              <AboutMe />
              <ServicesSection />
              <SkillsSection />
              <Resume/>
              <Projects/>
              <Contact/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
