import type { MetaFunction } from "@remix-run/node";
import AboutMe from "~/components/About";
import Profile from "~/components/Profile";
import ServicesSection from "~/components/Service";
import Sidebar from "~/components/Sidebar";

export const meta: MetaFunction = () => {
  return [
    { title: "Sat Narayan Sah" },
    { name: "description", content: "MERN Stack Developer" },
  ];
};

export default function Index() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Sidebar - Fixed on all screens */}
      <div className="w-full lg:w-[200px] lg:h-screen lg:fixed lg:left-0 lg:top-0  shadow-md flex items-center justify-center">
        <Sidebar />
      </div>

      {/* Profile - Fixed on all screens */}
      <div className="w-full lg:w-[350px] lg:h-screen lg:fixed lg:left-[150px] lg:top-0  shadow-md flex items-center justify-center mt-4 lg:mt-0">
        <Profile />
      </div>

      {/* Main Content - Scrollable */}
      <div className="w-full lg:ml-[500px] p-4 lg:top-0 mt-0 lg:p-8  flex flex-col items-center justify-center ">
        <div className="max-h-[1200px]">
        <AboutMe />
        <ServicesSection/>
        </div>
      </div>
    </div>
  );
}
