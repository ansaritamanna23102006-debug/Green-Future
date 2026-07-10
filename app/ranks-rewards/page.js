"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, Target, Trophy, Sparkles, Zap, ShieldAlert, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

export default function RanksRewardsPage() {
  const { ranks } = useApp();
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      ".rank-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );
  }, [ranks]);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10 rank-title">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Leader Ladder</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Ranks, Designations & Rewards</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Acquire matching turnover volumes on left and right wings to scale designations, unlocking travel funds and physical luxury rewards.
          </p>
        </div>
      </section>

      {/* Ranks Cards List */}
      <section className="py-20 max-w-5xl mx-auto px-6 flex flex-col gap-8 w-full">
        {ranks.map((item, idx) => {
          return (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="p-8 rounded-3xl bg-white border border-gft-gray-light flex flex-col md:flex-row gap-8 items-start md:items-center justify-between shadow-sm hover:border-gft-primary/45 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Card Left Info */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center shrink-0">
                    <Award className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-gft-deep">{item.name} Designation</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-3 mt-1 border-t border-gft-gray-light/60">
                  <div>
                    <span className="text-[10px] text-gft-deep/50 uppercase font-bold block">Req. Match Volume</span>
                    <span className="text-sm font-extrabold text-gft-deep">₹{item.matchedTurnover.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gft-deep/50 uppercase font-bold block">Reward Fund</span>
                    <span className="text-sm font-extrabold text-gft-primary">{item.fund}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gft-deep/50 uppercase font-bold block">Total Turnover</span>
                    <span className="text-sm font-extrabold text-gft-deep">₹{item.turnover.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Card Right Rewards / Benefits */}
              <div className="w-full md:w-80 shrink-0 bg-gft-light/60 border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-4">
                <div>
                  <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">Travel Benefit</span>
                  <span className="text-xs font-semibold text-gft-deep block mt-1 leading-relaxed">
                    {item.travel}
                  </span>
                </div>
                <div className="border-t border-gft-gray-light pt-3">
                  <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">Physical Rewards</span>
                  <span className="text-xs font-bold text-gft-primary block mt-1 leading-relaxed">
                    {item.rewards}
                  </span>
                </div>
                {item.cashAlternative && (
                  <div className="border-t border-gft-gray-light pt-3">
                    <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">Cash Alternative</span>
                    <span className="text-xs font-bold text-gft-accent block mt-1">
                      ₹{item.cashAlternative} / USDT equivalent
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Policy section */}
      <section className="bg-gft-card-dark text-white py-12 px-6 border-t border-gft-border-dark text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <span className="inline-block px-3 py-1 bg-gft-primary/20 text-gft-accent text-[10px] font-bold rounded-full uppercase tracking-wider">
            Reward Distribution Policy
          </span>
          <h3 className="text-lg font-bold">Designation Audits & Settlements</h3>
          <p className="text-xs text-white/70 max-w-lg leading-relaxed">
            If matched turnover or designation milestones are met, payouts and cash alternatives are approved and settled on the 5th of every month. Physical cargo shipping is dispatched within 10 days of request approval.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
