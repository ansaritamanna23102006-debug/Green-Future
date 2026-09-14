"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Users2, CheckCircle2, Clock, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DISPLAY_REFERENCE_LEVELS } from "@/lib/businessPlanRules";

export default function ReferAndEarnPage() {
  const ladderRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".re-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      ".re-ladder-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10 re-title">
          <div className="inline-flex items-center gap-2 self-center bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Clock size={13} />
            <span>Specification Phase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Referral Network Architecture</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Multi-level referral specifications managed exclusively through backend unilevel tree hierarchies.
          </p>
        </div>
      </section>

      {/* Governance Notice */}
      <div className="bg-amber-50 border-b border-amber-200 py-3.5 px-6 text-center text-xs text-amber-900 font-medium">
        <span className="font-bold">Authoritative Notice:</span> Levels 1–3 are confirmed in the business plan specification. Levels 4 and 5 are pending client confirmation. Live execution remains gated under Phase 0 controls.
      </div>

      {/* Main Ladders */}
      <section className="py-20 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Ladder items (7 cols) */}
        <div ref={ladderRef} className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Referral Ladders</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Multi-Tier Reference Income</h2>
          <p className="text-gft-deep/70 text-sm sm:text-base leading-relaxed">
            Reference earnings are calculated based on active package volumes across downline affiliates. Calculations are performed strictly by backend services.
          </p>

          <div className="flex flex-col gap-4 mt-2">
            {DISPLAY_REFERENCE_LEVELS.map((item) => (
              <div
                key={item.level}
                className="re-ladder-item bg-white border border-gft-gray-light p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-gft-primary/45 transition-colors group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gft-deep">Level {item.level}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.badge === "Rule Confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.badge === "Rule Confirmed" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gft-deep/60 mt-1">{item.secondaryText}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">Commission</span>
                  <span className="text-xl font-black text-gft-primary">{item.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Genealogy Tree Visual (5 cols) */}
        <div className="lg:col-span-5 bg-[#082F2C] border border-gft-border-dark p-8 rounded-3xl relative text-white flex flex-col gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gft-primary/20 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-bold text-gft-accent flex items-center gap-2">
            <Users2 className="h-5 w-5" /> Network Tree Architecture
          </h3>
          <p className="text-white/60 text-xs leading-relaxed">
            The platform maintains dual organizational representations: a 5-level unilevel tree for reference income, and a binary tree for organizational turnover matching.
          </p>

          {/* Tree Diagram SVG */}
          <div className="w-full flex justify-center py-4 bg-black/20 rounded-2xl border border-white/5">
            <svg className="w-64 h-48" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="100" y1="20" x2="50" y2="70" stroke="#65B300" strokeWidth="1.5" />
              <line x1="100" y1="20" x2="150" y2="70" stroke="#65B300" strokeWidth="1.5" />
              <line x1="50" y1="70" x2="25" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />
              <line x1="50" y1="70" x2="75" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />
              <line x1="150" y1="70" x2="125" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />
              <line x1="150" y1="70" x2="175" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />

              <circle cx="100" cy="20" r="12" fill="#0A4D45" stroke="#65B300" strokeWidth="2.5" />
              <text x="100" y="24" fill="#fff" fontSize="9" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">You</text>

              <circle cx="50" cy="70" r="10" fill="#65B300" stroke="#fff" strokeWidth="1.5" />
              <text x="50" y="73" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">L</text>

              <circle cx="150" cy="70" r="10" fill="#65B300" stroke="#fff" strokeWidth="1.5" />
              <text x="150" y="73" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">R</text>

              <circle cx="25" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
              <circle cx="75" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
              <circle cx="125" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
              <circle cx="175" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
            </svg>
          </div>
        </div>
      </section>

      {/* Policy section */}
      <section className="bg-gft-card-dark text-white py-12 px-6 border-t border-gft-border-dark text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10">
          <Info className="h-6 w-6 text-amber-400" />
          <h3 className="text-base font-bold">Execution Safety Requirements</h3>
          <p className="text-xs text-white/70 max-w-lg leading-relaxed">
            Reference calculations strictly require verified KYC, active package status, and non-cyclical sponsor trees. Direct income posting occurs exclusively within backend financial transactions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
