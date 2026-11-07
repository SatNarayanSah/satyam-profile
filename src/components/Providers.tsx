"use client";

import { Toaster } from "react-hot-toast";

export default function Providers() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "rgb(var(--surface))",
          color: "rgb(var(--ink))",
          border: "1px solid rgb(var(--line) / 0.15)",
          borderRadius: "14px",
          fontSize: "0.9rem",
        },
      }}
    />
  );
}
