"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import data from "~/../data/data.json";
import { socials, SocialIcon } from "./social";

const field =
  "w-full rounded-xl border border-line/15 bg-paper px-4 py-3 text-[0.95rem] outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/15";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const whatsappLink = data.socialLinks.find(({ url }) => url.startsWith("https://wa.me/"))?.url;

    if (!whatsappLink) {
      toast.error("WhatsApp contact is unavailable. Please email me directly.");
      return;
    }

    const whatsappUrl = new URL(whatsappLink);
    const phone = String(formData.get("phone") ?? "").trim();
    const message = [
      "New contact form message",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      "",
      `Message: ${formData.get("message")}`,
    ];
    if (phone) message.splice(3, 0, `Phone: ${phone}`);
    whatsappUrl.searchParams.set("text", message.join("\n"));

    const whatsappWindow = window.open(whatsappUrl.toString(), "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    setWhatsappFallbackUrl(whatsappWindow ? null : whatsappUrl.toString());

    setSending(true);
    try {
      const res = await fetch("/api/send-mail", { method: "POST", body: new FormData(form) });
      if (res.status === 503) {
        toast.error("Email isn't configured yet. Please send your message in WhatsApp.");
        return;
      }
      if (!res.ok) throw new Error("failed");
      toast.success(whatsappWindow ? "Email sent! Please send your message in WhatsApp too." : "Email sent. Open WhatsApp below to send your message.");
      form.reset();
    } catch {
      toast.error(whatsappWindow ? "Couldn't send the email. Your WhatsApp message is ready to send." : "Couldn't send the email. Use the WhatsApp link below or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-14 md:py-20">
      <div className="shell">
        <div data-swarm="block" className="card grid gap-10 !rounded-3xl p-6 md:p-10 lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-5">
            <p data-swarm="text" className="label w-fit">
              <span className="text-accent">06</span> / Contact
            </p>
            <h2 data-swarm="text" className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-5xl">
              Have a project in mind? Let&apos;s <span className="accent-serif">build</span> it.
            </h2>
            <p data-swarm="text" className="mt-4 leading-relaxed text-muted">
              {data.contact.subtitle}
            </p>

            <dl className="mt-8 space-y-4">
              {data.contact.info.map((c) => (
                <div key={c.title} data-swarm="text" className="w-fit">
                  <dt className="label">{c.title}</dt>
                  <dd className="mt-0.5 text-lg">
                    {c.link ? (
                      <a href={c.link} className="underline decoration-line/30 underline-offset-4 transition hover:decoration-accent">
                        {c.description}
                      </a>
                    ) : (
                      c.description
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-8" aria-label="Social profiles">
              {socials.map((s) => (
                <li key={s.url}>
                  <a
                    data-swarm="text"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="chip gap-2 text-muted transition hover:text-ink"
                  >
                    <SocialIcon path={s.path} className="h-3.5 w-3.5" /> {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <form data-swarm="block" onSubmit={submit} className="grid gap-4 self-start rounded-2xl border border-line/10 bg-ink/[0.03] p-5 md:p-7 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Name</span>
                <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
              </label>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Email</span>
                <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
              </label>
            </div>
            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Contact number <span className="text-muted">(optional)</span></span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="+977 98XXXXXXXX" className={field} />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm font-medium">Project details</span>
              <textarea name="message" required rows={6} placeholder="What are you building, and when do you need it?" className={`${field} resize-none`} />
            </label>
            <button type="submit" disabled={sending} className="btn-primary w-full !py-3.5 text-base disabled:opacity-60">
              {sending ? "Sending…" : "Send message"}
            </button>
            <p className="text-center text-xs text-muted">WhatsApp opens with your message ready; tap Send there to deliver it.</p>
            {whatsappFallbackUrl && (
              <a href={whatsappFallbackUrl} target="_blank" rel="noreferrer" className="text-center text-sm text-accent underline underline-offset-4">
                Open WhatsApp to send your message
              </a>
            )}
            <p className="text-center text-xs text-muted">I usually reply within one working day.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
