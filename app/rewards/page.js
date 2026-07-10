"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ShieldCheck, Box, HelpCircle, ArrowRight, Eye, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InspectCanvas from "@/components/InspectCanvas";

const rewardsList = [
  {
    id: "gold",
    name: "Fossil Model - Bq2493 Watch",
    rank: "Gold",
    value: "₹11,250 Fund + Watch",
    description: "Premium mechanical timepiece custom-made with GFT luxury styling, awarded upon completing Gold designation matching turnover thresholds.",
    criteria: "Achieve total team turnover of ₹7.50 Lakh (₹2.50 Lakh matched volume on left and right wings respectively).",
    specs: ["Model Bq2493 Custom Face", "Matte Emerald Green Bezel", "GFT Engraved Steel Plate"],
    canvasType: "gold"
  },
  {
    id: "platinum",
    name: "Yamaha model - R15 V4 Bike",
    rank: "Platinum",
    value: "₹22,500 Fund + Sports Bike",
    description: "High-performance Yamaha R15 V4 sports motorcycle custom-finished in GFT green and gold matte paint decals.",
    criteria: "Achieve total team turnover of ₹30.0 Lakh (₹15.0 Lakh matched volume on left and right wings respectively).",
    specs: ["155cc liquid-cooled engine", "Custom Matte Green Decals", "GFT Authenticated Registry"],
    canvasType: "platinum"
  },
  {
    id: "diamond",
    name: "GFT Diamond Trophy & Cruise",
    rank: "Diamond",
    value: "₹30,000 Fund + Cruise",
    description: "A prestigious hand-cut diamond trophy coupled with an premium 2-person cruise getaway.",
    criteria: "Achieve total team turnover of ₹60.0 Lakh (₹30.0 Lakh matched volume on left and right wings respectively).",
    specs: ["Conflict-Free Diamond Accents", "Indestructible Crystal Core", "Includes 2-person luxury cruise trip"],
    canvasType: "diamond"
  },
  {
    id: "chairman",
    name: "Mercedes-Benz E-Class & Dubai Trip",
    rank: "Chairman",
    value: "₹2,50,000 Fund + Luxury Payout",
    description: "The ultimate GFT milestone. Awarded a fully-funded Mercedes-Benz lease and a trip to Dubai (requires 3 Rubies in team).",
    criteria: "Achieve total team turnover of ₹2.50 Crore (₹1.20 Crore matched volume on left and right wings respectively).",
    specs: ["Dubai Vacation Package", "Mercedes-Benz E-Class Sedan", "Requires 3 Rubies in your downlines"],
    canvasType: "chairman"
  }
];

export default function RewardsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const selectedReward = rewardsList[activeIdx];
  const viewerRef = useRef(null);
  const detailRef = useRef(null);

  // Stagger animate detail items when switching active rewards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        detailRef.current.children,
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );
      
      gsap.fromTo(
        viewerRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.1)" }
      );
    });

    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gft-primary/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gft-accent/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Rewards</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Interactive 3D Rewards Showcase</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Drag, rotate, and inspect your milestone physical rewards in full 3D WebGL directly inside your browser. Climb ranks to claim them.
          </p>
        </div>
      </section>

      {/* Split Interactive Viewport */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: 3D Model Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex justify-between items-center bg-white/70 border border-gft-gray-light py-3 px-6 rounded-2xl">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gft-primary animate-pulse" />
              <span className="text-[11px] font-bold text-gft-deep/60 uppercase tracking-wider">3D WebGL Interactive Viewer</span>
            </div>
            <div className="text-[10px] font-semibold text-gft-deep/45">
              Drag left/right to orbit rotate model
            </div>
          </div>

          {/* Canvas Box */}
          <div 
            ref={viewerRef}
            className="w-full aspect-[4/3] bg-gradient-to-tr from-[#031716] to-[#082f2c] border border-gft-border-dark rounded-3xl overflow-hidden relative shadow-2xl"
          >
            {/* Absolute overlay elements */}
            <div className="absolute top-6 left-6 z-10">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gft-accent text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                Active Render
              </span>
            </div>

            {/* Render Canvas */}
            <InspectCanvas rewardType={selectedReward.canvasType} />
          </div>
          
          {/* Quick Selector Tabs below canvas */}
          <div className="grid grid-cols-4 gap-3">
            {rewardsList.map((reward, idx) => (
              <button
                key={reward.id}
                onClick={() => setActiveIdx(idx)}
                className={`py-3 px-2 rounded-xl text-center text-[10px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                  activeIdx === idx
                    ? "bg-gft-primary border-gft-primary text-white shadow-md"
                    : "bg-white border-gft-gray-light text-gft-deep hover:border-gft-primary/40"
                }`}
              >
                {reward.id}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Description & Claims Specs (5 cols) */}
        <div ref={detailRef} className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-gft-primary font-bold uppercase tracking-widest">{selectedReward.rank} Reward</span>
            <h2 className="text-3xl font-black text-gft-deep leading-tight">{selectedReward.name}</h2>
            <span className="text-sm font-extrabold text-gft-primary/85 bg-gft-primary/10 py-1.5 px-3 rounded-lg w-max mt-1">
              {selectedReward.value}
            </span>
          </div>

          <p className="text-[14px] text-gft-deep/75 leading-relaxed font-normal">
            {selectedReward.description}
          </p>

          <div className="bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-4">
            <div>
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold tracking-wider">Qualification Target</span>
              <p className="text-xs text-gft-deep/80 leading-relaxed font-semibold mt-1">
                {selectedReward.criteria}
              </p>
            </div>
            
            <div className="border-t border-gft-gray-light pt-3">
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold tracking-wider">Custom Specs</span>
              <ul className="flex flex-col gap-2 mt-2">
                {selectedReward.specs.map((spec, sidx) => (
                  <li key={sidx} className="flex items-center gap-2 text-xs text-gft-deep/75">
                    <div className="w-1.5 h-1.5 rounded-full bg-gft-primary" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/register"
            className="w-full text-center bg-gft-dark hover:bg-gft-deep text-white text-xs font-bold py-4 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-md shadow-gft-dark/10"
          >
            Start Recruiting downlines
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Verification Notice */}
      <section className="bg-white border-t border-gft-gray-light py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-12 h-12 bg-gft-primary/10 text-gft-primary rounded-xl flex items-center justify-center shrink-0">
            <Box className="h-6 w-6" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-base font-bold text-gft-deep">Cash Value Alternatives Available</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed mt-1">
              Qualified leaders who prefer USDT direct payouts instead of physical cargo logistics can opt to claim equivalent cash payouts directly. Gold smartwatch awards can be redeemed for 250 USDT, R15 sports bikes for 2,200 USDT, and Chairman Crown Mercedes lease bundles for 60,000 USDT respectively. Claim forms are audited and settled within 48 hours.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
