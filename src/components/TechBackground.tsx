"use client";

import { motion } from "framer-motion";

// Deep violet backdrop: drifting glows plus a faint dot grid fading toward the edges.
export default function TechBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-bg-primary">
      <motion.div
        className="absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full bg-violet-600/30 blur-[150px]"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 h-[480px] w-[480px] rounded-full bg-fuchsia-600/20 blur-[150px]"
        animate={{ x: [0, -70, 0], y: [0, 80, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="dot-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />

      {/* Floating geometric shapes: ring, square, triangle, pill, in teal / amber / pink / violet. */}
      <motion.div className="absolute left-[6%] top-[22%] h-20 w-20 rounded-full border-4 border-teal-400/40" animate={{ y: [0, -24, 0], rotate: [0, 90, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-[8%] top-[18%] h-14 w-14 rotate-12 rounded-xl border-4 border-amber-400/40" animate={{ y: [0, 28, 0], rotate: [12, 102, 12] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div
        className="absolute bottom-[16%] left-[10%] h-0 w-0 border-x-[26px] border-b-[44px] border-x-transparent border-b-pink-400/40"
        animate={{ y: [0, -30, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute bottom-[22%] right-[12%] h-8 w-28 rounded-full bg-gradient-to-r from-violet-400/40 to-teal-300/40" animate={{ x: [0, -30, 0], rotate: [-20, 0, -20] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute left-[46%] top-[60%] h-6 w-6 rotate-45 bg-amber-300/30" animate={{ rotate: [45, 225, 45], scale: [1, 1.4, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}
