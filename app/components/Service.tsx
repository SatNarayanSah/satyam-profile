import { motion } from "framer-motion";
import data from "../../data/data.json";

const ServicesSection = () => {
    const { ServiceectionName, ServiceSectionTitle, ServiceDescription, services } = data;

    return (
        <div data-scroll-index="2" id="service">
            <motion.div
                className="service-section px-5 py-8 md:p-8 bg-gray-900 mt-5 rounded-2xl lg:p-10 2xl:p-13"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                {/* Section Name */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-wide text-white border lg:px-5 border-dashed rounded-full shadow-orange-300"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <img src="/icons/work.svg" className="w-6 h-6" alt="icon" />
                    {ServiceectionName}
                </motion.div>

                {/* Section Title */}
                <motion.div
                    className="mb-8 mt-7 md:my-10 section-title"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <h2 className="title md:text-4xl lg:text-5xl font-extralight text-white leading-1.27">
                        {ServiceSectionTitle.split(" ")[0]}{" "}
                        <span className="font-semibold text-orange-300">
                            {ServiceSectionTitle.split(" ")[1]}
                        </span>
                    </h2>
                    <p className="text-justify mt-4 md:mt-6 text-gray-400">
                        {ServiceDescription}
                    </p>
                </motion.div>

                {/* Service Cards */}
                <motion.div
                    className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:gap-7 2xl:gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

const ServiceCard = ({ service, index }) => {
    return (
        <motion.div
            className="relative p-5 transition duration-700 border py-7 md:p-7 rounded-2xl xl:p-8 2xl:p-10 bg-transparent shadow-2xl hover:border-orange-400 hover:scale-50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            {/* Icon with Floating Animation */}
            <motion.div
                className="absolute md:top-10 right-6 top-7 md:right-8 lg:top-11"
                animate={{
                    y: [0, -3, 0], 
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut"
                }}
            >
                <img className="w-20" src={service.icon} alt="" />
            </motion.div>

            {/* Number */}
            <motion.div
                className="text-5xl font-extrabold md:text-6xl lg:text-7xl  text-orange-300 opacity-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
            >
                0{service.id}
            </motion.div>

            {/* Title */}
            <h4 className="mt-5 mb-4 text-xl font-medium text-white xl:text-2xl">
                {service.title}
            </h4>

            {/* Description */}
            <p className="text-gray-400 text-justify">{service.description}</p>
        </motion.div>
    );
};

export default ServicesSection;
