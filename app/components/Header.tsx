import { useState } from "react";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";


const menuItems = [
  { id: "1", href: "#home", icon: "/icons/user.svg", name: "About" },
  { id: "2", href: "#resume", icon: "/icons/resume.svg", name: "Resume" },
  { id: "3", href: "#works", icon: "/icons/work.svg", name: "Works" },
  { id: "4", href: "#contact", icon: "/icons/contact.svg", name: "Contact" },
  { id: "5", href: "#products", icon: "/icons/product.svg", name: "Products" },
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
      className="fixed w-full top-0 left-0 z-50 bg-gray-900 bg-opacity-20  text-white shadow-lg"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold">MySite</div>

        {/* Hamburger Icon (only visible on mobile) */}
        <div
          className="lg:hidden text-lg"
          onClick={toggleMenu}
          onKeyPress={handleKeyPress} // Add keyboard event listener
          tabIndex={0} // Make it focusable so it can receive keyboard events
          role="button" // Make it semantically a button for accessibility
        >
          {isOpen ? ( <div> X </div> ) : ( <img src="/image/toggle.svg" alt="close" /> )}
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
          className="lg:hidden bg-gray-800 text-white w-full absolute top-0 left-0 py-4"
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
                <Link to={item.href} className="py-2 px-4 text-lg w-full text-center">
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
