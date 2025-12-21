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
        <meta name="description" content="Satyam Sah - Full Stack Developer & Solutions Architect with expertise in web applications. Specialized in scalable architectures using MERN stack, microservices, cloud solutions, and advanced web technologies. Delivering high-performance applications." />
        <meta name="keywords" content="Satyam Sah, Full Stack Developer, Solutions Architect, Web Applications, MERN Stack Expert, Cloud Architecture, Microservices, System Design, React.js, Node.js, MongoDB, Express.js, TypeScript, AWS, Docker, Kubernetes, CI/CD, Performance Optimization" />
        <meta name="author" content="Satyam Sah" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Satyam Sah - Full Stack Developer & Solutions Architect | Web Applications Expert" />
        <meta property="og:description" content="Full Stack Developer specializing in scalable applications, microservices architecture, and cloud solutions. Delivering high-performance systems with modern tech stack including MERN, TypeScript, and cloud services." />
        <meta property="og:image" content="https://satyamsah.com/satyam.jpg" />
        <meta property="og:url" content="https://satyamsah.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Satyam Sah -  Full Stack Engineer " />
        <meta name="twitter:description" content="Enterprise application specialist with deep expertise in scalable architectures, cloud solutions, and modern web technologies. View my professional portfolio and technical achievements." />
        <meta name="twitter:image" content="https://satyamsah.com/satyam.jpg" />
        <link rel="canonical" href="https://satyamsah.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/satyam.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/satyam.jpg" />
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
              "image": "https://satyamsah.com/satyam.jpg",
              "sameAs": [
                "https://github.com/SatNarayanSah",
                "https://www.linkedin.com/in/satnarayansah/",
                "https://www.facebook.com/SatNarayanSahOfficial/",
                "https://www.instagram.com/satyam_sah566"
              ],
              "jobTitle": "Full Stack Developer & Solutions Architect",
              "worksFor": {
                "@type": "Organization",
                "name": "Independent Technology Consultant"
              },
              "description": "Full Stack Developer and Solutions Architect specializing in scalable applications, microservices architecture, and cloud solutions. Expert in building high-performance systems using modern technology stack.",
              "knowsAbout": [
                "Microservices Design",
                "MERN Stack Development",
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
