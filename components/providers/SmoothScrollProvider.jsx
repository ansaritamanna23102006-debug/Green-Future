"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function SmoothScrollProvider({ children }) {
  const pathname = usePathname();

  // On dashboard and admin portals, use standard native OS scrolling
  // so tables, modals, sidebars, and interactive graphs (ReactFlow) scroll smoothly
  const isDashboardRoute =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/superadmin") ||
    pathname?.startsWith("/dashboard");

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
        autoRaf: true,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
