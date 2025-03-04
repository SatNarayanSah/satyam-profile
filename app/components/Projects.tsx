import ProjectCard from "./ProjectCard";
import data from "../../data/data.json"

const Projects = () => {
  const { projects } = data;
  const projects = {
    projects
  };

  return (
    <>
      <div className="bg-gray-900 p-5 py-7 rounded-3xl mt-5" id="project">
        <div>
          <div className="inline-flex items-center gap-4 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 border-dashed rounded-full shadow-orange-300 uppercase">
            <img src="/icons/product.svg" className="w-4 h-4" alt="icons" />
            Projects
          </div>
          <div className="mb-8 mt-7 md:my-10 section-title">
            <h2 className="title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27">
              My <span className="font-semibold text-orange-300">Projects</span>
            </h2>
            <p className=" text-justify mt-4 md:mt-6 text-gray-300">
              Over the course of my career, I have successfully developed more than 4 websites, each tailored to meet the specific needs and goals of my clients. These projects have enabled me to hone my skills in web development and deliver high-quality, responsive, and user-friendly websites
            </p>
          </div>
          {/* Pass projects data to ProjectCard */}
          <div className="">
            {projects && <ProjectCard projects={projects} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;