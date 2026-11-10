import data from "~/../data/data.json";
import { getWhatsAppUrl, socials, SocialIcon } from "./social";

const whatsappUrl = getWhatsAppUrl(
  "Hi Satyam, I found your portfolio and would like to discuss a project.",
);
const whatsapp = socials.find((social) => social.name === "WhatsApp");

export default function Contact() {
  return (
    <section id="contact" className="py-14 md:py-20">
      <div className="shell">
        <div data-swarm="block" className="card grid gap-10 !rounded-3xl p-6 md:p-10 lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-7">
            <p data-swarm="text" className="label w-fit">
              <span className="text-accent">06</span> / Contact
            </p>
            <h2 data-swarm="text" className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-5xl">
              Have a project in mind? Let&apos;s <span className="accent-serif">build</span> it.
            </h2>
            <p data-swarm="text" className="mt-4 max-w-xl leading-relaxed text-muted">
              {data.contact.subtitle}
            </p>
            <a
              data-swarm="text"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 w-fit !px-6 !py-3.5 text-base"
            >
              {whatsapp && <SocialIcon path={whatsapp.path} className="h-5 w-5" />}
              Message me on WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-3 text-sm text-muted">
              WhatsApp will open with a message ready to send. I usually reply within one working day.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {data.contact.info.map((contact) => (
                <div key={contact.title} data-swarm="text" className="w-fit">
                  <dt className="label">{contact.title}</dt>
                  <dd className="mt-0.5 text-lg">
                    {contact.link ? (
                      <a href={contact.link} className="underline decoration-line/30 underline-offset-4 transition hover:decoration-accent">
                        {contact.description}
                      </a>
                    ) : (
                      contact.description
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="flex flex-wrap gap-2" aria-label="Social profiles">
              {socials.map((social) => (
                <li key={social.url}>
                  <a
                    data-swarm="text"
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="chip gap-2 text-muted transition hover:text-ink"
                  >
                    <SocialIcon path={social.path} className="h-3.5 w-3.5" /> {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
