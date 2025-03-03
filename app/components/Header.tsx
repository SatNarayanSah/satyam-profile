import { useState } from "react";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";

const menuItems = [
  { id: "1", href: "#about", icon: "/icons/user.svg", name: "About" },
  { id: "2", href: "#resume", icon: "/icons/resume.svg", name: "Resume" },
  { id: "5", href: "#skill", icon: "/icons/product.svg", name: "Skills" },
  { id: "3", href: "#project", icon: "/icons/work.svg", name: "Projects" },
  { id: "4", href: "#contact", icon: "/icons/contact.svg", name: "Contact" },
];

// Animation variants for the header
const headerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Animation variants for menu items
const menuItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu on mobile
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle keyboard interaction (Enter or Space) for the hamburger icon
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      toggleMenu();
    }
  };

  return (
    <motion.header
      className="fixed w-full  top-0 left-0 z-50 bg-gray-900 bg-opacity-50 text-white shadow-lg"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto p-2 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div>
          <img src="/images/t-logo.png" className="w-16" alt="logo" />
        </div>

        {/* Hamburger Icon (only visible on mobile) */}
        <div
          className="lg:hidden text-lg z-30"
          onClick={toggleMenu}
          onKeyDown={handleKeyPress} // Updated to onKeyDown
          tabIndex={0} // Make it focusable so it can receive keyboard events
          role="button" // Make it semantically a button for accessibility
          aria-label="Toggle Menu" // Added aria-label for accessibility
        >
          {isOpen ? (
            <img src="/icons/toggle-close.svg" className="w-10 h-10 z-30" alt="close" />
          ) : (
            <img src="/icons/toggle.svg" className="w-10 h-10" alt="hamburger" />
          )}
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.href} className="flex items-center gap-2">
                <img src={item.icon} className="w-4 h-4" alt={item.name} />
                <span className="text-sm">{item.name}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu (shown when isOpen is true) */}
      {isOpen && (
        <motion.div
          className="lg:hidden z-0 bg-gray-900 text-white w-full absolute top-0 left-0 py-4"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <nav className="flex flex-col items-center">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
              >
                <Link to={item.href} className="py-2 px-4 text-lg w-full flex items-center gap-2 bg-opacity-35 text-center">
                  <img src={item.icon} className="w-6 h-6 mx-auto" alt={item.name} />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
