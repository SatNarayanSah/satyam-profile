import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

const menuItems = [
  { id: "1", href: "#home", icon: "/icons/user.svg", name: "About" },
  { id: "2", href: "#resume", icon: "/icons/resume.svg", name: "Resume" },
  { id: "3", href: "#works", icon: "/icons/work.svg", name: "Works" },
  { id: "4", href: "#contact", icon: "/icons/contact.svg", name: "Contact" },
  { id: "5", href: "#products", icon: "/icons/product.svg", name: "Products" },
];

// Animation variants for the sidebar
const sidebarVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Animation variants for menu items
const menuItemVariants = {
  hidden: { opacity: 10, y: 50 },
  visible: {
    opacity: 20,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function Sidebar() {
  return (
    <motion.div
      className="w-full lg:w-16 bg-gray-900 text-white"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="flex lg:flex-col justify-around lg:justify-start">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            data-id={item.id}
            className="py-3 lg:py-4 lg:border-b border-gray-500 shadow-xl"
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <Link
              to={item.href}
              className="flex flex-col items-center justify-center gap-1 lg:gap-2"
            >
              <img src={item.icon} className="w-4 h-4" alt="icon" />
              <span className="text-[10px] lg:text-xs">{item.name}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}