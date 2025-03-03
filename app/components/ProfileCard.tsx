import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ProfileData } from "~/types/types";
import Typewriter from "typewriter-effect";

interface ProfileCardProps {
    profile: ProfileData;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
        // Cycle through titles every 5 seconds
        const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % profile.title.length);
        }, 5000); // Change title every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [profile.title.length]);

    return (
        <motion.div
            className="w-full bg-gray-900 relative rounded-lg shadow-3xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Banner Section */}
            <div className="relative h-48 lg:h-64 overflow-hidden z-0">
                <div className="absolute inset-0">
                    <img
                        src={profile.bannerImages}
                        alt="banner"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Profile Content */}
            <div className="round">
                <div className="p-4 lg:p-8 text-center relative z-20">
                    {/* Avatar */}
                    <motion.div
                        className="w-32 h-32 lg:w-44 lg:h-44 mx-auto -mt-20 lg:-mt-40 rounded-full border-4 border-orange-300 shadow-orange-300 overflow-hidden z-30"
                        whileHover={{ scale: 1.1 }}
                    >
                        <img
                            src={profile.avatar}
                            alt={profile.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        className="text-2xl lg:text-3xl font-bold mt-4 text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {profile.name}
                        <p className="text-xl font-bold underline underline-offset-8 text-orange-300"> ({profile.nickname})</p>
                    </motion.h1>

                    {/* Title (Typing Animation) */}
                    <div className="text-lg text-gray-400 mt-2 h-6 overflow-hidden">
                        <Typewriter
                            options={{
                                strings: [profile.title[currentTitleIndex]], // Current title
                                autoStart: true, // Start typing automatically
                                loop: false, // Don't loop the current string
                                delay: 100, // Typing speed (100ms per character)
                                deleteSpeed: 50, // Deleting speed (50ms per character)
                                cursor: "|", // Custom cursor
                            }}
                        />
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center mt-4 mb-24 space-x-4">
                        {profile.socialLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" border p-2 rounded-full border-orange-300 shadow-white shadow-md"
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <img src={link.icon} className="w-6 h-6" alt="icons" />
                            </motion.a>
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="absolute bottom-0 flex items-center left-0 justify-between w-full text-sm lg:text-base">
                        {profile.buttons.map((button, index) => (
                            <motion.a
                                key={index}
                                href={button.url}
                                className={`flex items-center gap-2 px-6 py-4 text-center w-full relative 
                ${index === 1 ? " text-white bg-gray-800" : "bg-gray-800 text-white"} 
                hover:bg-opacity-90 transition-all duration-300`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    borderImage: "linear-gradient(to right, #1f2937, #ffffff, #1f2937) 1", // Gradient border
                                    borderWidth: "1px", // Border width
                                    borderStyle: "solid", // Border style
                                }}
                                download={button.text === "Download CV" ? true : undefined} // Only add download attribute to "Download CV" button
                            >
                                {/* Gradient Border Overlay */}
                                <div className="absolute inset-0 border-l border-r border-t border-transparent  hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Button Content */}
                                <span className="text-sm z-10">{button.text}</span>
                                <img src={button.icon} className="w-4 h-4 z-10" alt="icons" />
                            </motion.a>
                        ))}

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileCard;