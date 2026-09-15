"use client";

import React from "react";
import Image from "next/image";

/**
 * Green Future Technology Brand Logo
 * Displays the official platform insignia and typography.
 *
 * @param {string} className - Optional styling classes
 * @param {boolean} showText - Whether to show the full logo with typography or icon-only
 * @param {boolean} light - Inverted / light styling mode
 * @param {"full" | "icon" | "horizontal"} variant - Force a specific logo composition
 */
export default function GFTLogo({
  className = "h-10 w-auto",
  showText = true,
  light = true,
  variant,
}) {
  const isIconOnly = variant === "icon" || (!showText && variant !== "full");

  if (isIconOnly) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
        <Image
          src="/logo-icon.png"
          alt="Green Future Tech Logo"
          width={80}
          height={60}
          priority
          className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(101,179,0,0.35)]"
        />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center gap-3 select-none ${className}`}>
      <Image
        src="/GreenFutureLogo.png"
        alt="Green Future Technology — Grow | Trade | Prosper"
        width={360}
        height={300}
        priority
        className="h-full w-auto object-contain rounded-lg drop-shadow-[0_0_15px_rgba(101,179,0,0.25)] transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>
  );
}
