import { motion } from "framer-motion";
import data from "../../data/data.json"

const AboutMe = () => {
    const { AboutSection, AboutSectionTitle, description, skills, contactInfo, counters } = data;

    return (
        <div data-scroll-index="1" className="w-full " id="about" >
            <motion.div
                className="about-section px-4 py-6 md:p-8 bg-gray-900 rounded-2xl lg:p-10 2xl:p-13"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Section Name */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white  border-dashed border shadow-orange-300 lg:px-5 rounded-full"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img src="/icons/user.svg" className="w-6 h-6" alt="user" />
                    {AboutSection}
                </motion.div>

                {/* Section Title */}
                <motion.div
                    className="mt-5 md:mt-10 section-title"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h2 className="title text-2xl md:text-4xl lg:text-5xl font-extralight text-black dark:text-white leading-tight">
                        {AboutSectionTitle.split(" ")[0]}{" "}
                        <span className="font-semibold text-orange-300">{AboutSectionTitle.split(" ")[1]}</span>
                    </h2>
                    <p className=" mt-3 md:mt-6 text-justify">
                        {description}
                    </p>
                </motion.div>

                {/* Skills Section */}
                <motion.div
                    className="mt-4 md:mt-6 section-content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="flex flex-wrap items-center gap-2 mb-5 text-xs md:text-sm md:gap-4">
                        {skills.map((skill, index) => (
                            <motion.a
                                key={index}
                                href="#"
                                className="hover:text-theme border px-4 py-2 border-dashed rounded-full border-orange-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {skill.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <ul className="grid mt-4 mb-8 text-sm lg:mt-6 md:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-3">
                        {contactInfo.map((info, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                            >
                                <span className="flex-[0_0_6rem]">{info.label}</span>
                                <span className="flex-[0_0_2rem]">: </span>
                                {info.link ? (
                                    <a href={info.link}>
                                        <span className="text-white ">{info.value}</span>
                                    </a>
                                ) : (
                                    <span className="text-black dark:text-white">{info.value}</span>
                                )}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Counters */}
                    <ul className="grid grid-cols-2 gap-4 md:gap-6 counters md:grid-cols-4 xl:gap-8">
                        {counters.map((counter, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 * index }}
                            >
                                <div className="mb-1 text-2xl font-semibold md:text-3xl number text-theme 2xl:text-4xl">
                                    <span className="text-orange-300">{counter.number}</span>
                                </div>
                                <div className="text-sm">{counter.label}</div>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AboutMe;