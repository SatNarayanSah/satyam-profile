import type { MetaFunction } from "@remix-run/node";

import AboutMe from "~/components/About";
import Contact from "~/routes/Contact";
import Header from "~/components/Header";
// import ParticlesBackground from "~/components/ParticlesBackground";
import Profile from "~/components/Profile";
import Projects from "~/components/Projects";
import Resume from "~/components/Resume";
import ServicesSection from "~/components/Service";
import SkillsSection from "~/components/SkillsSection";

export const meta: MetaFunction = () => {
  return [
    { title: "Sat Narayan Sah - MERN Stack Developer - Freelancer" },
    { name: "description", content: "I’m Sat Narayan Sah, a MERN stack developer passionate about building scalable and dynamic web applications. I specialize in MongoDB, Express.js, React.js,  Nextjs, Remix and Node.js, creating high-performance solutions with clean code and modern web technologies. My focus is on delivering seamless user experiences and robust backend functionality." },
  ];
};

export default function Index() {
  return (
    <>
    {/* <ParticlesBackground/> */}
      <div className="container mx-auto pl-4  ">
        <Header/>
        <div className="flex justify-between  min-h-screen w-full flex-col lg:flex-row">
          {/* Sidebar - Fixed on all screens */}
          {/* <div className="w-full lg:w-[200px] lg:h-screen  lg:left-0 lg:top-0  shadow-md flex items-center justify-center">
            <Sidebar />
          </div> */}

          {/* Profile - Fixed on all screens */}
          <div className="w-full lg:w-[350px] lg:h-[90vh] mt-12 lg:left-[150px] lg:top-0  shadow-md flex items-center justify-center  lg:pt-12">
            <Profile />
          </div>

          {/* Main Content - Scrollable */}
          <div className="w-full  p-4 lg:top-0 mt-0 lg:pt-16  flex flex-col items-center justify-center ">
          <div className="max-h-[80vh] w-full rounded-3xl overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
