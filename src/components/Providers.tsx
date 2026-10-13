"use client";

import { Toaster } from "react-hot-toast";
import { ClientOnly } from "./ClientOnly";
import SmoothScroll from "./SmoothScroll";
import TechBackground from "./TechBackground";
import ScrollProgress from "./ScrollProgress";

// Client-only chrome that must not run during server rendering.
export default function Providers() {
  return (
    <>
      <ClientOnly>
        <SmoothScroll />
        <TechBackground />
        <ScrollProgress />
      </ClientOnly>
      <Toaster position="top-right" />
    </>
  );
}
