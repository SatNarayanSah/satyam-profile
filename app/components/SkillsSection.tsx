import {motion} from "framer-motion"
import data from "../../data/data.json"
import SkillProgress from "./SkillProgress"
export default function SkillsSection() {
const {skills} = data

  return (
    <motion.div
      data-scroll-index="3"
      id="skill"
      className="mt-6 px-5 py-8 md:p-8 bg-gray-900 rounded-3xl lg:p-10 2xl:p-13"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Section Header Animation */}
      <motion.div
        className="inline-flex items-center gap-4 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 border-dashed rounded-full shadow-orange-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      >
        <img src="/icons/education.svg" className="w-4 h-4" alt="icons" />
        SKILLS
      </motion.div>

      <motion.div
        className="mb-8 mt-7 md:my-10 section-title"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <h2 className="title text-[32px] md:text-4xl lg:text-5xl font-extralight text-white leading-1.27">
          My <span className="font-semibold text-orange-300">Advantages</span>
        </h2>
        <p className="max-w-xl mt-4 md:mt-6 text-gray-300">
          I design products that are more than just pretty. I make them functional, shippable, and user-friendly.
        </p>
      </motion.div>

      {/* Skills List with Animations */}
      <motion.div
        className="flex flex-wrap justify-between gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
          },
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center gap-2 border w-32 p-2 px-4 rounded-3xl border-dashed border-orange-300 transition-all duration-700 hover:shadow-orange-300 ease-in-out"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            whileHover={{ scale: 1.1, rotate: 3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <img src={skill.icon} className="w-16 h-16 sm:w-20 sm:h-20" alt={skill.name} />
            </motion.div>
            <motion.div
              className="flex justify-center items-center"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            >
              <SkillProgress percent={skill.percent} />
            </motion.div>
            <motion.div
              className="text-md md:text-sm font-semibold tracking-widest text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.3 }}
            >
              {skill.name}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
