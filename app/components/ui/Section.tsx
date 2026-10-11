import type { ReactNode } from "react";
import { motion } from "framer-motion";

// Shared section frame: small numbered label, clear title, optional subtitle.
export default function Section({
  id,
  index,
  title,
  subtitle,
  children,
}: {
  id: string;
  index: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const words = title.split(" ");
  const last = words.pop();
  return (
    <section id={id} className="scroll-mt-24 px-4 py-8 md:px-8 md:py-10 xl:px-14">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-5 flex flex-col gap-1"
        >
          <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-sm font-medium text-violet-200">{index}</span>
          <h2 className="font-space text-2xl font-bold text-white md:text-3xl">{words.join(" ")} <span className="accent-serif">{last}</span></h2>
          {subtitle && <p className="max-w-2xl text-base text-slate-200">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
