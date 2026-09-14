"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, CheckCircle2, Clock, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DISPLAY_RANKS } from "@/lib/businessPlanRules";

export default function RanksRewardsPage() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      ".rank-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10 rank-title">
          <div className="inline-flex items-center gap-2 self-center bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
            <CheckCircle2 size={13} />
            <span>Specifications Confirmed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Ranks, Designations & Rewards</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Seven milestone designations determined by organizational turnover and matched leg volume.
          </p>
        </div>
      </section>

      {/* Governance Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-3.5 px-6 text-center text-xs text-amber-900 font-medium">
        <span className="font-bold">Authoritative Notice:</span> Rank qualification rules are confirmed in plan documentation. Live financial rewards and leadership distributions remain subject to final business-plan activation.
      </div>

      {/* Ranks Cards List */}
      <section className="py-16 max-w-5xl mx-auto px-6 flex flex-col gap-6 w-full">
        {DISPLAY_RANKS.map((item, idx) => {
          return (
            <div
              key={item.rank}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-gft-gray-light flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-sm hover:border-gft-primary/45 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Card Left Info */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gft-deep">{item.rank} Designation</h2>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-1">
                      <CheckCircle2 size={11} />
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 mt-1 border-t border-gft-gray-light/60">
                  <div>
                    <span className="text-[10px] text-gft-deep/50 uppercase font-bold block">Required Turnover</span>
                    <span className="text-sm font-extrabold text-gft-deep">₹{(item.turnover / 100000).toFixed(2)} Lakh</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gft-deep/50 uppercase font-bold block">Leadership Fund</span>
                    <span className="text-sm font-extrabold text-gft-primary">{item.fund}</span>
                  </div>
                </div>
              </div>

              {/* Card Right Rewards / Benefits */}
              <div className="w-full md:w-80 shrink-0 bg-gft-light/60 border border-gft-gray-light p-5 rounded-2xl flex flex-col gap-3">
                <div>
                  <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">Incentive Reward</span>
                  <span className="text-xs font-bold text-gft-deep block mt-0.5 leading-relaxed">
                    {item.rewards}
                  </span>
                </div>
                <div className="border-t border-gft-gray-light pt-2">
                  <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">Activation Constraint</span>
                  <span className="text-[11px] text-gft-deep/60 block mt-0.5">
                    {item.secondaryText}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Policy section */}
      <section className="bg-gft-card-dark text-white py-12 px-6 border-t border-gft-border-dark text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-3 relative z-10">
          <Info className="h-6 w-6 text-amber-400" />
          <h3 className="text-base font-bold">Turnover & Rank Settlement Rules</h3>
          <p className="text-xs text-white/70 max-w-lg leading-relaxed">
            Turnover fund calculations are executed monthly. All designation advancements require verified leg maintenance and system-level qualification verification.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
