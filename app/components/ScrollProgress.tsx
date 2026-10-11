import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[200] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-300 shadow-[0_0_10px_#8b5cf6]"
    />
  );
}
