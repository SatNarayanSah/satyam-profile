import { motion } from "framer-motion";
import type { Project } from "~/types/types";

interface ProjectCardProps {
  projects: Project[];
}

// Define different text colors for tags dynamically
const tagColors = [
  "text-red-300",
  "text-blue-300",
  "text-green-300",
  "text-yellow-300",
  "text-purple-300",
  "text-pink-300",
  "text-orange-300",
  "text-cyan-300",
];

export default function ProjectCard({ projects }: ProjectCardProps) {
  return (
    <div className="flex flex-wrap justify-center gap-16">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 1.05 }}
          className="relative w-52 sm:w-full md:w-64 rounded-2xl shadow-lg text-white bg-gray-800 overflow-hidden"
        >
          {/* Image Section */}
          <div className="relative overflow-hidden rounded-t-xl">
            <motion.img
              src={project.image}
              alt={project.alt}
              className="w-full object-contain"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content Section */}
          <div className="pt-3 pb-12 px-3">
            {/* Title */}
            <h2 className="text-md font-bold text-center">{project.title}</h2>

            {/* Tags */}
            <div className="flex flex-wrap justify-center mt-2 mb-3 text-sm">
              {project.tags.map((tag, index) => (
                <span key={index} className={`${tagColors[index % tagColors.length]} ml-2`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="absolute bottom-0 left-0 flex items-center justify-between w-full text-sm lg:text-base">
            {project.buttons.map((button, index) => (
              <motion.a
                key={index}
                target="_blank"
                href={button.url}
                className={`flex items-center gap-2 px-6 py-4 text-center w-full transition-all duration-300
                  ${index === 1 ? "text-white bg-gray-800" : "bg-gray-800 text-white"} 
                  hover:bg-opacity-90`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderImage: "linear-gradient(to right, #1f2937, #ffffff, #1f2937) 1", // Gradient border fix
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <span className="text-sm z-10">{button.text}</span>
                <img src={button.icon} className="w-4 h-4 z-10" alt="icon" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
