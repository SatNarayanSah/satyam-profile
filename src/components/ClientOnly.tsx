"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Renders children only in the browser (false during SSR and hydration).
export function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);
  return <>{isClient ? children : fallback}</>;
}
