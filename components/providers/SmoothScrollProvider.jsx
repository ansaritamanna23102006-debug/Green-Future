"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Bind Lenis scroll events to GSAP ScrollTrigger for buttery smooth parallax & reveal animations
    function updateScrollTrigger(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    const lenisInstance = lenisRef.current?.lenis;
    if (lenisInstance) {
      lenisInstance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(updateScrollTrigger);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      if (lenisInstance) {
        lenisInstance.off("scroll", ScrollTrigger.update);
      }
      gsap.ticker.remove(updateScrollTrigger);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.09,
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        infinite: false,
        autoRaf: false, // Managed through GSAP ticker for frame-perfect sync
      }}
    >
      {children}
    </ReactLenis>
  );
}
