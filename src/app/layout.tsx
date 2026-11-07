import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "~/components/Header";
import Providers from "~/components/Providers";

const SITE_URL = "https://satyamsah.com";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

// Runs before first paint: applies the saved/system theme and, on the home page, hides every
// [data-swarm] element so the swarm can rebuild it. This runs on every visit, even when the OS
// asks for reduced motion (the owner wants the rebuild always on). If the engine never starts (JS error,
// slow hydration) the page is revealed again after 8 seconds.
const bootScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem("theme");
if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t;
if(location.pathname==="/"){d.setAttribute("data-swarm-boot","");
setTimeout(function(){if(!window.__swarm)d.removeAttribute("data-swarm-boot")},8000)}}catch(e){}})();`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0d0c" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Satyam Sah | Full Stack Developer",
  description:
    "Satyam Sah — Full Stack Developer (MERN & MEAN). I build scalable, high-performance web applications using MERN and MEAN stacks, microservices, and cloud-native architectures.",
  keywords: [
    "Satyam Sah", "Full Stack Developer", "MERN", "MEAN", "React", "Angular", "Node.js", "Express",
    "MongoDB", "JavaScript", "TypeScript", "AWS", "DevOps", "Microservices", "System Design",
  ],
  authors: [{ name: "Satyam Sah" }],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [{ url: "/images/Satyam.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/images/Satyam.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Satyam Sah — Full Stack Developer (MERN & MEAN) | Web & Cloud Apps",
    description:
      "Full Stack Developer focused on MERN and MEAN stacks, building scalable web applications, microservices, and cloud-native solutions. Explore my portfolio and projects.",
    url: SITE_URL,
    type: "website",
    images: [`${SITE_URL}/site.png`],
  },
  twitter: {
    card: "summary_large_image",
    title: "Satyam Sah — Full Stack Developer (MERN & MEAN)",
    description:
      "Building high-performance web applications with MERN and MEAN stacks, microservices, and cloud-native patterns. See projects and contact information.",
    images: [`${SITE_URL}/site.png`],
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Satyam Sah",
  alternateName: "Sat Narayan Sah",
  url: SITE_URL,
  image: `${SITE_URL}/site.png`,
  sameAs: [
    "https://github.com/SatNarayanSah",
    "https://www.linkedin.com/in/satnarayansah/",
    "https://www.facebook.com/SatNarayanSahOfficial/",
    "https://www.instagram.com/satyam_sah566",
  ],
  jobTitle: "Full Stack Developer",
  worksFor: { "@type": "Organization", name: "Independent Technology Consultant" },
  description:
    "Full Stack Developer specializing in modern web development with MERN and MEAN stacks, scalable microservices, and cloud-native architectures.",
  knowsAbout: [
    "Microservices Design", "MERN Stack Development", "MEAN Stack Development", "System Design & Optimization",
    "DevOps & CI/CD", "React.js & Node.js", "MongoDB & Express.js", "TypeScript & JavaScript",
    "AWS & Cloud Services", "API Design & Development", "Performance Optimization", "Security Implementation",
    "Scalable Architecture",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Satyam Sah - Full Stack Developer",
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      </head>
      <body className="min-h-screen overflow-x-clip">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Providers />
      </body>
    </html>
  );
}
