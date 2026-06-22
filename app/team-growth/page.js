"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Users, UserPlus, ShieldCheck, ArrowRight, Zap, Award, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NetworkCanvas from "@/components/NetworkCanvas";

const teamAcronym = [
  {
    letter: "T",
    title: "Technology",
    highlight: "Smart Contracts",
    description: "Fully automated MLM placement matrices, direct commission distributions, and secure staking pools managed via verified smart contracts."
  },
  {
    letter: "E",
    title: "Ecosystem",
    highlight: "Clean Energy Assets",
    description: "GFT staking models fund tangible community solar grids, wind farms, and carbon offset initiatives, backing digital tokens with actual physical output."
  },
  {
    letter: "A",
    title: "Alliance",
    highlight: "Global Network",
    description: "Connect and coordinate across left and right binary matching wings, pooling leadership equity globally to reward community growth."
  },
  {
    letter: "M",
    title: "Momentum",
    highlight: "Exponential Payouts",
    description: "As team size multiplies, matching bonuses, referral payouts, and weekly designation rewards scale rapidly toward structural caps."
  }
];

export default function TeamGrowthPage() {
  const lettersRef = useRef([]);
  const statsRef = useRef(null);
  const [liveRegistrations, setLiveRegistrations] = useState([
    { id: 1, member: "GFT-89102", action: "Activated GFT-4 Package", time: "Just Now", details: "Left Wing (Level 2)" },
    { id: 2, member: "GFT-12490", action: "Registered Free Account", time: "1 min ago", details: "Right Wing (Level 4)" },
    { id: 3, member: "GFT-78119", action: "Advanced to Gold Leader", time: "3 mins ago", details: "Direct Referral" },
    { id: 4, member: "GFT-90214", action: "Activated GFT-8 Package", time: "8 mins ago", details: "Left Wing (Level 3)" }
  ]);

  useEffect(() => {
    // Live update simulation using GSAP animations on text addition
    const interval = setInterval(() => {
      setLiveRegistrations(prev => {
        const nextId = prev[0].id + 1;
        const members = ["GFT-78902", "GFT-23481", "GFT-91024", "GFT-44129", "GFT-10020"];
        const actions = ["Activated GFT-1 Package", "Activated GFT-3 Package", "Registered Free Account", "Earned Binary Payout", "Advanced to Silver Leader"];
        const details = ["Left Wing (Level 5)", "Right Wing (Level 3)", "Direct Referral", "Level 1 Downline", "Right Wing (Level 2)"];
        
        const randomMember = members[Math.floor(Math.random() * members.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomDetail = details[Math.floor(Math.random() * details.length)];

        const newReg = {
          id: nextId,
          member: randomMember,
          action: randomAction,
          time: "Just Now",
          details: randomDetail
        };

        // Slide existing ones down and add new one
        const slice = prev.slice(0, 3);
        return [newReg, ...slice.map(item => ({...item, time: parseInt(item.time) ? `${parseInt(item.time) + 1} mins ago` : "1 min ago"}))];
      });
      
      // Flash animation on live ticker container
      gsap.fromTo(".live-item-0", 
        { backgroundColor: "rgba(101, 179, 0, 0.2)", scale: 0.98 },
        { backgroundColor: "transparent", scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger acronym letters loading
      gsap.fromTo(
        lettersRef.current,
        { opacity: 0, scale: 0.6, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.3)" }
      );

      // Slide in stats
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.4 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header with Network Canvas */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-[#031d1c] via-[#05322f] to-[#031412] text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Render 3D Network canvas */}
        <NetworkCanvas />

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1.5 rounded-full w-max mx-auto backdrop-blur-sm">
            Blockchain Tree Matrices
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Structured Team Growth & Wings</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Observe your affiliate placement tree growing dynamically. Form Left/Right wings and coordinate downlines to claim compounding payouts.
          </p>
        </div>
      </section>

      {/* T.E.A.M. Acronym Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full flex flex-col gap-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">The GFT Pillars</span>
          <h2 className="text-3xl font-extrabold text-gft-deep mt-1">Driving Cooperative Innovation</h2>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {teamAcronym.map((item, idx) => (
            <div
              key={item.letter}
              ref={(el) => (lettersRef.current[idx] = el)}
              className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all flex flex-col gap-5 relative overflow-hidden group hover:border-gft-primary/40"
            >
              {/* Huge letter watermark */}
              <span className="absolute -bottom-8 -right-4 text-9xl font-black text-gft-light dark:text-gft-gray-light/20 select-none group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                {item.letter}
              </span>

              <div className="w-12 h-12 rounded-2xl bg-gft-primary text-white font-black text-xl flex items-center justify-center shadow-md shadow-gft-primary/10">
                {item.letter}
              </div>

              <div className="relative z-10 flex flex-col gap-2">
                <span className="text-[10px] text-gft-primary font-bold uppercase tracking-wider">
                  {item.highlight}
                </span>
                <h3 className="text-xl font-bold text-gft-deep">
                  {item.title}
                </h3>
                <p className="text-xs text-gft-deep/70 leading-relaxed font-normal mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Network Metrics & Live registrations Ticker */}
      <section className="py-20 bg-gft-card-dark text-white border-t border-gft-border-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-gft-primary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Stats Left (7 cols) */}
          <div ref={statsRef} className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Growth Dynamics</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Wings Balance & Matching Payouts</h2>
              <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
                By maintaining active lines in both your Left Wing and Right Wing, GFT's compensation protocol matches active volumes weekly. Matching payouts represent 12% of the balanced business volume.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Left Volume</span>
                <span className="text-xl font-black text-white">₹8,45,000</span>
                <span className="text-[10px] text-gft-accent font-semibold flex items-center gap-1 mt-0.5">
                  <Zap className="h-3 w-3 fill-gft-accent" /> Active Nodes: 45
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Right Volume</span>
                <span className="text-xl font-black text-white">₹11,10,000</span>
                <span className="text-[10px] text-gft-accent font-semibold flex items-center gap-1 mt-0.5">
                  <Zap className="h-3 w-3 fill-gft-accent" /> Active Nodes: 58
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
                <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Matched Pool</span>
                <span className="text-xl font-black text-gft-primary">₹8,45,000</span>
                <span className="text-[10px] text-white/40 block mt-0.5">Weekly matching base</span>
              </div>
            </div>
          </div>

          {/* Live Feed Ticker Right (5 cols) */}
          <div className="lg:col-span-5 bg-[#031d1c] border border-gft-border-dark p-6 rounded-3xl">
            <div className="flex justify-between items-center border-b border-gft-border-dark pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gft-primary animate-ping" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Activity Feed</h3>
              </div>
              <span className="text-[9px] text-white/40 font-semibold uppercase">Global Sync</span>
            </div>

            <div className="flex flex-col gap-3">
              {liveRegistrations.map((item, idx) => (
                <div
                  key={item.id}
                  className={`live-item-${idx} border border-white/5 p-4 rounded-2xl flex justify-between items-center gap-4 transition-all duration-500`}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{item.member}</span>
                      <span className="text-[9px] text-gft-accent font-semibold uppercase tracking-wider">
                        {item.details}
                      </span>
                    </div>
                    <span className="text-xs text-white/60 font-medium">{item.action}</span>
                  </div>
                  <span className="text-[10px] text-white/40 shrink-0 font-medium">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
