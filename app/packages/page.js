"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ShieldCheck, Zap, Award, Coins, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const packageTiers = [
  {
    id: "gft-1",
    name: "GFT-1 Eco Starter",
    amount: 3000,
    dailyRate: 0.01, // 1%
    capping: 9000,
    features: ["Direct Referral Pool: 10%", "Binary Matching Eligibility", "100 GFT signup tokens", "Instant USDT Withdrawals"],
    popular: false,
    gradient: "from-emerald-500/10 to-teal-500/10"
  },
  {
    id: "gft-2",
    name: "GFT-2 Green Growth",
    amount: 5000,
    dailyRate: 0.01, // 1%
    capping: 15000,
    features: ["Direct Referral Pool: 10%", "Binary Matching Eligibility", "150 GFT signup tokens", "Instant USDT Withdrawals"],
    popular: false,
    gradient: "from-green-500/10 to-emerald-600/10"
  },
  {
    id: "gft-3",
    name: "GFT-3 Carbon Stake",
    amount: 10000,
    dailyRate: 0.012, // 1.2%
    capping: 30000,
    features: ["Direct Referral Pool: 10%", "Binary Matching: Level 1-2 Boost", "300 GFT signup tokens", "Instant USDT Withdrawals"],
    popular: false,
    gradient: "from-teal-600/10 to-gft-dark/10"
  },
  {
    id: "gft-4",
    name: "GFT-4 Yield Accelerator",
    amount: 20000,
    dailyRate: 0.015, // 1.5%
    capping: 60000,
    features: ["Direct Referral Pool: 10%", "Binary Matching: Level 1-3 Boost", "600 GFT signup tokens", "Instant USDT Withdrawals"],
    popular: true,
    gradient: "from-gft-primary/10 to-gft-accent/10"
  },
  {
    id: "gft-5",
    name: "GFT-5 Green Master",
    amount: 30000,
    dailyRate: 0.015, // 1.5%
    capping: 90000,
    features: ["Direct Referral Pool: 10%", "Binary Matching: Level 1-4 Boost", "900 GFT signup tokens", "Priority KYC Verification"],
    popular: false,
    gradient: "from-emerald-600/10 to-gft-primary/10"
  },
  {
    id: "gft-6",
    name: "GFT-6 Solar Core",
    amount: 40000,
    dailyRate: 0.015, // 1.5%
    capping: 120000,
    features: ["Direct Referral Pool: 10%", "Binary Matching: Level 1-5 Boost", "1200 GFT signup tokens", "Priority KYC Verification"],
    popular: false,
    gradient: "from-teal-600/15 to-emerald-600/15"
  },
  {
    id: "gft-7",
    name: "GFT-7 Eco Director",
    amount: 50000,
    dailyRate: 0.018, // 1.8%
    capping: 150000,
    features: ["Direct Referral Pool: 10%", "Binary Matching: Level 1-7 Boost", "1500 GFT signup tokens", "Global Leadership Pool Access"],
    popular: false,
    gradient: "from-gft-dark/20 to-gft-accent/15"
  },
  {
    id: "gft-8",
    name: "GFT-8 Apex Ambassador",
    amount: 100000,
    dailyRate: 0.02, // 2%
    capping: 300000,
    features: ["Direct Referral Pool: 10%", "Binary Matching: Level 1-7 Max Boost", "3000 GFT signup tokens", "Weekly Global Pool Equity Share"],
    popular: true,
    gradient: "from-amber-500/10 to-gft-primary/20"
  }
];

export default function PackagesPage() {
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const [hoveredPkg, setHoveredPkg] = useState(null);

  // Initial animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );

      // Cards staggered entry
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: "back.out(1.2)" }
      );
    });

    return () => ctx.revert();
  }, []);

  // 3D Tilt Card Effects
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum tilt angles (deg)
    const maxRotateX = 12;
    const maxRotateY = 12;

    const rotateX = ((y - centerY) / centerY) * -maxRotateX; // negative for intuitive direction
    const rotateY = ((x - centerX) / centerX) * maxRotateY;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        {/* Glow Spheres */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gft-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gft-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div ref={headerRef} className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Packages</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Eco-Tech Investment Packages</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Choose a tier and active stake to participate in our green energy pools, unlocking native GFT tokens and multi-level matching network pipelines.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packageTiers.map((pkg, idx) => {
            const dailyROI = pkg.amount * pkg.dailyRate;
            const monthlyROI = dailyROI * 30;
            const totalROI = dailyROI * 300; // 300 days cycle

            return (
              <div
                key={pkg.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                onMouseEnter={() => setHoveredPkg(pkg.id)}
                className={`relative bg-white border ${
                  pkg.popular ? "border-gft-primary shadow-lg shadow-gft-primary/10" : "border-gft-gray-light"
                } rounded-3xl p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl cursor-pointer overflow-hidden transform-gpu`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background Accent Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-20 pointer-events-none`} />

                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-gft-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                    Popular
                  </div>
                )}

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-gft-deep/45 uppercase tracking-wide">Package Tier</span>
                    <h3 className="text-lg font-bold text-gft-deep">{pkg.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-gft-gray-light">
                    <span className="text-xs text-gft-deep/50 block font-medium">Activation Amount</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-gft-deep">₹{pkg.amount.toLocaleString()}</span>
                      <span className="text-xs text-gft-deep/60">INR</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 my-2">
                    {pkg.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-xs text-gft-deep/75 leading-tight">
                        <CheckCircle2 className="h-4 w-4 text-gft-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Animated ROI Preview Panel */}
                <div className="relative z-10 mt-6 pt-5 border-t border-gft-gray-light bg-gft-light/50 p-3 rounded-2xl flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gft-deep/55 uppercase">
                    <span>Yield Summary</span>
                    <span className="text-gft-primary">{(pkg.dailyRate * 100).toFixed(1)}% Daily</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mt-1">
                    <div className="bg-white border border-gft-gray-light/60 p-2 rounded-xl">
                      <span className="text-[9px] text-gft-deep/40 font-bold block">Daily</span>
                      <span className="text-[11px] font-extrabold text-gft-deep">₹{dailyROI}</span>
                    </div>
                    <div className="bg-white border border-gft-gray-light/60 p-2 rounded-xl">
                      <span className="text-[9px] text-gft-deep/40 font-bold block">Monthly</span>
                      <span className="text-[11px] font-extrabold text-gft-deep">₹{monthlyROI}</span>
                    </div>
                    <div className="bg-white border border-gft-gray-light/60 p-2 rounded-xl">
                      <span className="text-[9px] text-gft-deep/40 font-bold block">Total ROI</span>
                      <span className="text-[11px] font-extrabold text-gft-primary font-black">₹{totalROI}</span>
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <Link
                  href="/register"
                  className={`relative z-10 w-full text-center mt-6 text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-all ${
                    pkg.popular
                      ? "bg-gft-primary text-white hover:bg-gft-accent shadow-md shadow-gft-primary/20"
                      : "bg-gft-dark text-white hover:bg-gft-deep"
                  }`}
                >
                  Acquire Stake
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info Warning Banner */}
      <section className="bg-gft-card-dark text-white py-12 px-6 border-t border-gft-border-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gft-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-gft-primary/20 text-gft-accent rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg font-bold">Important Network Capping Safeguard</h3>
            <p className="text-xs text-white/70 leading-relaxed mt-1">
              GFT operates with an automated capping threshold. All packages expire upon reaching 300% (3x) return limits. Sponsoring commissions, direct yields, and binary matching calculations all accumulate towards the 3x ceiling. Re-activating a package resets capping variables.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
