"use client";

import React from "react";

export default function GFTLogo({ className = "h-8 w-auto", showText = true, light = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon: Leaf and Network Nodes */}
      <svg
        className={className}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Leaf Leaf Shape Left (Dark Green) */}
        <path
          d="M50 15C50 15 25 35 25 60C25 75 35 85 50 85C50 85 50 50 50 15Z"
          fill="#0A4D45"
        />
        {/* Leaf Leaf Shape Right (Primary Green) */}
        <path
          d="M50 15C50 15 75 35 75 60C75 75 65 85 50 85C50 85 50 50 50 15Z"
          fill="#65B300"
        />
        {/* Accent Overlay Leaf (Light Green Accent) */}
        <path
          d="M50 40C50 40 65 52.5 65 65C65 72.5 60 77.5 50 77.5C50 77.5 50 55 50 40Z"
          fill="#8CD83D"
          opacity="0.85"
        />
        {/* Network Nodes (Fintech Network representation) */}
        <circle cx="50" cy="15" r="5" fill={light ? "#FFFFFF" : "#0A4D45"} />
        <circle cx="25" cy="60" r="5" fill="#8CD83D" />
        <circle cx="75" cy="60" r="5" fill="#8CD83D" />
        <circle cx="50" cy="85" r="5" fill={light ? "#FFFFFF" : "#0A4D45"} />
        {/* Connecting lines of the network */}
        <path d="M50 15L25 60M50 15L75 60M25 60L50 85M75 60L50 85" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-xl font-bold tracking-wider ${light ? "text-white" : "text-gft-deep"}`}>
            GREEN FUTURE
          </span>
          <span className={`text-[10px] font-semibold tracking-[0.25em] ${light ? "text-gft-primary" : "text-gft-dark"}`}>
            TECHNOLOGY
          </span>
        </div>
      )}
    </div>
  );
}
