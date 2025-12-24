import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { Toaster } from "react-hot-toast";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Satyam Sah — Full Stack Developer (MERN & MEAN). I build scalable, high-performance web applications using MERN and MEAN stacks, microservices, and cloud-native architectures." />
        <meta name="keywords" content="Satyam Sah, Full Stack Developer, MERN, MEAN, React, Angular, Node.js, Express, MongoDB, JavaScript, TypeScript, AWS, DevOps, Microservices, System Design" />
        <meta name="author" content="Satyam Sah" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Satyam Sah — Full Stack Developer (MERN & MEAN) | Web & Cloud Apps" />
        <meta property="og:description" content="Full Stack Developer focused on MERN and MEAN stacks, building scalable web applications, microservices, and cloud-native solutions. Explore my portfolio and projects." />
        <meta property="og:image" content="https://satyamsah.com/site.png" />
        <meta property="og:url" content="https://satyamsah.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Satyam Sah — Full Stack Developer (MERN & MEAN)" />
        <meta name="twitter:description" content="Building high-performance web applications with MERN and MEAN stacks, microservices, and cloud-native patterns. See projects and contact information." />
        <meta name="twitter:image" content="https://satyamsah.com/site.png" />
        <link rel="canonical" href="https://satyamsah.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/satyam.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/site.png" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Satyam Sah",
              "url": "https://satyamsah.com",
              "image": "https://satyamsah.com/site.png",
              "sameAs": [
                "https://github.com/SatNarayanSah",
                "https://www.linkedin.com/in/satnarayansah/",
                "https://www.facebook.com/SatNarayanSahOfficial/",
                "https://www.instagram.com/satyam_sah566"
              ],
              "jobTitle": "Full Stack Developer (MERN & MEAN) & Solutions Architect",
              "worksFor": {
                "@type": "Freelancer",
                "name": "Independent Technology Consultant"
              },
              "description": "Full Stack Developer specializing in MERN and MEAN stacks, scalable microservices, and cloud-native architectures. Experienced in building production-ready web applications.",
              "skills": ["MERN Stack","MEAN Stack","React","Angular","Node.js","Express","MongoDB","TypeScript"],
              "knowsAbout": [
                "Microservices Design",
                "MERN Stack Development",
                "MEAN Stack Development",
                "System Design & Optimization",
                "DevOps & CI/CD",
                "React.js & Node.js",
                "MongoDB & Express.js",
                "TypeScript & JavaScript",
                "AWS & Cloud Services",
                "API Design & Development",
                "Performance Optimization",
                "Security Implementation",
                "Scalable Architecture"
              ]
            }),
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
     
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Outlet /> {/* Your app content */}
      <Toaster position="top-right" /> {/* Toast notifications */}
    </>
  );
}
