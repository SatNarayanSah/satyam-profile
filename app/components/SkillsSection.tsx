import SkillProgress from "./SkillProgress";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  icon: string;
  percent: number;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[] | null>(null);
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
        const data = await response.json();
        setSkills(data.skills); // Access the `skills` array from the JSON
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

  if (!skills) {
    return <div className="text-white text-center">No skills data available.</div>;
  }

  return (
    <div data-scroll-index="3" id="skill" className="mt-6 px-5 py-8 md:p-8 bg-gray-900 rounded-3xl lg:p-10 2xl:p-13">
      <div className="inline-flex items-center gap-4 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 border-dashed rounded-full shadow-orange-300">
        <img src="/icons/education.svg" className="w-4 h-4" alt="icons" />
        SKILLS
      </div>
      <div className="mb-8 mt-7 md:my-10 section-title">
        <h2 className="title text-[32px] md:text-4xl lg:text-5xl font-extralight text-black dark:text-white leading-1.27">
          My <span className="font-semibold text-orange-300">Advantages</span>
        </h2>
        <p className="max-w-xl mt-4 md:mt-6 text-gray-600 dark:text-gray-300">
          I design products that are more than just pretty. I make them functional, shippable, and user-friendly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2 border w-fit p-4 rounded-3xl border-dashed border-orange-300 transition-all duration-700 hover:shadow-orange-300 ease-in-out"
          >
            <div>
              <img src={skill.icon} className="w-20 h-20" alt={skill.name} />
            </div>
            <div className="flex justify-center items-center">
              <SkillProgress percent={skill.percent} />
            </div>
            <div className="text-md font-semibold tracking-widest">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}