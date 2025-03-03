import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ContactData {
    title: string;
    subtitle: string;
    info: {
        icon: string;
        title: string;
        description: string;
        link?: string;
    }[];
    map: string;
}

export default function Contact() {
    const [data, setData] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/data/data.json");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                setData(jsonData.contact);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-white">Error: {error}</div>;
    }

    if (!data) {
        return <div className="text-center text-white">No data available.</div>;
    }

    return (
        <div id="contact" className="min-h-screen bg-gray-900 rounded-xl mt-5 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Title Section */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-[32px] md:text-4xl lg:text-5xl font-extralight text-black dark:text-white">
                        {data.title}
                    </h2>
                    <p className="mt-3.5 md:mt-5 max-w-sectionTitle text-black dark:text-white">
                        {data.subtitle}
                    </p>
                </motion.div>

                {/* Contact Info and Form */}
                <div className="grid gap-12 md:grid-cols-12">
                    {/* Contact Info */}
                    <div className="md:col-span-5">
                        <ul className="space-y-6 md:space-y-10">
                            {data.info.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="flex items-center gap-5"
                                >
                                    <div className="flex justify-center w-12">
                                        {item.icon === "location" && (
                                            <img src="icons/location.svg" alt="icons" />
                                        )}
                                        {item.icon === "email" && (
                                            <img src="icons/email.svg" alt="icons" />
                                        )}
                                        {item.icon === "phone" && (
                                            <img src="icons/contact-color.svg" alt="icons" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="text-lg text-white">{item.title}</h6>
                                        {item.link ? (
                                            <a href={item.link} className="text-sm text-white">
                                                {item.description}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-white">{item.description}</p>
                                        )}
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Form */}
                    <div className="md:col-span-7">
                        <form
                            id="contactForm"
                            action="https://formsubmit.co/satnarayan5166@gmail.com"
                            method="POST"
                            className="space-y-2"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Full Name"
                                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                                required
                            />

                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="9800000000"
                                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="something@gmail.com"
                                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                className="w-full p-4 rounded-lg border bg-transparent border-gray-300 focus:border-orange-300 focus:ring-2 focus:ring-orange-300 outline-none"
                                required
                            ></textarea>
                            <input type="hidden" name="_subject" value="New Contact Form Submission" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="hidden" name="_next" value="https://satnarayan.com.np/thanks.html" />
                            <button
                                type="submit"
                                className=" text-white py-2 w-full px-9 rounded-full bg-gradient-to-r from-orange-300 to-orange-700 hover:text-xl  transition-all duration-500"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Google Map */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-12"
                >
                    <iframe
                        src={data.map}
                        title="Google Map Location" // Add a descriptive title here
                        className="w-full h-80 2xl:h-96 rounded-2xl border-10 border-platinum dark:border-greyBlack"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
}