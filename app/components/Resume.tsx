import { motion } from "framer-motion";
import type { ResumeData } from "~/types/types";
import { useEffect, useState } from "react";

export default function Resume() {
  const [data, setData] = useState<ResumeData | null>(null); // Corrected type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data asynchronously
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json"); // Adjust the path if needed
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData); // Set the entire JSON object
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-white text-center">No data available.</div>;
  }

  const { ResumeTitle, experiences, educations, skills, knowledge, languages } = data;

  return (
    <div className="min-h-screen bg-gray-900 rounded-3xl mt-4 py-12" id="resume">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 text-md tracking-wide text-white  border-dashed border shadow-orange-300 lg:px-5 rounded-full mb-5"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img src="/icons/resume.svg" className="w-6 h-6" alt="user" />
          {ResumeTitle}
        </motion.div>

        {/* Experience and Education Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-transparent p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="border p-2 rounded-full  border-orange-300 shadow-orange-500 shadow-md">
                <img src="/icons/work.svg" className="w-6 h-6" alt="icons" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-300 ">Experience</h2>
            </div>
            <div className="relative  pl-6">
              {/* Vertical Line */}
              <div className="absolute left-1.5 top-0 w-0.5 h-full bg-gray-500"></div>

              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start ">
                  {/* Timeline Dot */}
                  <div className="w-3 h-3 shadow-orange-300 bg-orange-500 rounded-full absolute -left-6 -top-1.5"></div>

                  {/* Content */}
                  <div className="border-b border-dashed border-orange-300 py-5">
                    <h3 className="text-xl font-semibold text-gray-300">{exp.title}</h3>
                    <p className="text-gray-500">
                      {exp.company} | <span>{exp.duration}</span>
                    </p>
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-transparent p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="border p-2 rounded-full  border-orange-300 shadow-orange-500 shadow-md">
                <img src="/icons/education.svg" className="w-6 h-6" alt="icons" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-300 ">Education</h2>
            </div>
            <div className="relative  pl-6">
              {/* Vertical Line */}
              <div className="absolute left-1.5 top-0 w-0.5 h-full bg-gray-500"></div>

              {educations.map((edu, index) => (
                <div key={index} className="relative flex items-start ">
                  {/* Timeline Dot */}
                  <div className="w-3 h-3 shadow-orange-300 bg-orange-500 rounded-full absolute -left-6 -top-1.5"></div>

                  {/* Content */}
                  <div className="border-b border-dashed border-orange-300 py-5">
                    <h3 className="text-xl font-semibold text-gray-300">{edu.institution}</h3>
                    <p className="text-orange-300 flex flex-col ">
                      {edu.Field}   <span className="text-gray-400">{edu.duration}</span>
                    </p>
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <motion.a
            className=" border p-2 rounded-full border-orange-300 shadow-orange-300 shadow-md flex gap-2 px-4 w-fit mb-5 border-dashed"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/icons/education.svg" className="w-6 h-6" alt="icons" />
            <h1>Skills</h1>
          </motion.a>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Coding Skills */}
            <div className="bg-transparent p-6 rounded-lg shadow-lg">

              <div className="flex items-center justify-between  gap-2 border-b border-dashed border-orange-300 py-3">
                <div className="flex items-center gap-2">
                  <img src="/icons/skill.svg" className="w-8 h-8 shadow-orange-400 shadow-md border border-dashed rounded-full p-1 " alt="" />
                  <h3 className="text-md font-semibold text-orange-300 ">Coding</h3>
                </div>
                <div className="text-md text-orange-300 font-bold">&</div>
                <div className="flex items-center gap-2">
                  <img src="/icons/design.svg" className="w-8 h-8 shadow-orange-400 shadow-md border border-dashed rounded-full p-1 " alt="icon" />
                  <h3 className="text-md font-semibold text-orange-300 ">Designing</h3>
                </div>
              </div>
              <div className="space-y-4 py-3">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-gray-300">{skill.name}</p>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div
                        className="bg-green-500 h-1.5 rounded-full"
                        style={{ width: `${skill.percent}%` }} // Use `percent` instead of `level`
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Skills */}
            <div className="bg-transparent p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-2">
                <img src="/icons/list.svg" className="w-8 h-8 shadow-orange-400 shadow-md border border-dashed rounded-full p-1" alt="icon" />
                <h3 className="text-xl font-semibold text-orange-300 ">Knowledge</h3>
              </div>
              <div className="space-y-4 py-5">
                {knowledge.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3">
                      <img src="/icons/tick.svg" className="w-6 h-6" alt="ticke" />
                      <p className="text-gray-300">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Languages Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-12 bg-transprent  "
              >
                <h2 className="text-3xl font-bold text-gray-300 text-center mb-8">Languages</h2>
                <div className="space-y-4">
                  {languages.map((lang, index) => (
                    <div key={index}>
                      <p className="text-gray-400">{lang.name}</p>
                      {/* <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-orange-300 h-1.5 rounded-full"
                          style={{ width: `${lang.level}%` }} // Use `level` for languages
                        ></div>
                      </div> */}
                      {/* Binary-like dots filling based on percentage */}
                      <div className="flex w-full space-x-4 mt-2">
                        {Array.from({ length: 10 }).map((_, bitIndex) => (
                          <div
                            key={bitIndex}
                            className={`w-3 h-3 rounded-full ${bitIndex < Math.floor(lang.level / 10) ? 'bg-orange-400' : 'bg-gray-300'
                              }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}