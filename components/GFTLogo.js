"use client";

import React from "react";

export default function GFTLogo({ className = "h-8 w-auto", showText = true, light = false }) {
  return (
    <div className="flex items-center select-none group/logo">
      <img
        src="/logo.png"
        alt="Green Future Technology"
        className={`${className} object-contain transition-transform duration-300 group-hover/logo:scale-105`}
      />
    </div>
  );
}




