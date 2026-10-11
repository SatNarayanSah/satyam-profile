import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import data from "../../data/data.json";

const field =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-base text-white placeholder:text-slate-300 outline-none transition focus:border-accent-cyan focus:bg-white/10 focus:ring-2 focus:ring-accent-cyan/30";

export default function Contact() {
  const { contact } = data;
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      const res = await fetch("/api/send-mail", { method: "POST", body: new FormData(form) });
      if (!res.ok) throw new Error("failed");
      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
    } catch {
      toast.error("Could not send the message. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 px-5 py-8 md:py-10">
      <div className="w-full space-y-6">
        <div>
          <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-sm font-medium text-violet-200">07</span>
          <h2 className="font-space text-2xl font-bold text-white md:text-3xl">Let's work <span className="accent-serif">together</span></h2>
          <p className="mt-2 max-w-2xl text-base text-slate-100">{contact.subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <div className="space-y-3 md:col-span-2">
            {contact.info.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="block glass glass-hover px-4 py-3"
              >
                <div className="text-sm font-medium text-accent-cyan">{item.title}</div>
                <div className="break-all text-base font-medium text-white">{item.description}</div>
              </motion.a>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass space-y-3 p-4 md:col-span-3 md:p-6"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1">
                <span className="text-base font-medium text-slate-200">Name</span>
                <input name="name" type="text" required placeholder="Your name" className={field} />
              </label>
              <label className="block space-y-1">
                <span className="text-base font-medium text-slate-200">Email</span>
                <input name="email" type="email" required placeholder="you@example.com" className={field} />
              </label>
            </div>
            <label className="block space-y-1">
              <span className="text-base font-medium text-slate-200">Message</span>
              <textarea name="message" required rows={4} placeholder="Tell me about your project..." className={`${field} resize-none`} />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-white py-3 text-base font-semibold text-slate-900 transition hover:scale-[1.01] disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
