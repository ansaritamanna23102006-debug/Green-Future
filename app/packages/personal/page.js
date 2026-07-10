"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ShieldCheck, Coins, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

export default function PersonalPackagesPage() {
  const { personalPackages } = useApp();
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.1)" }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Growth Tiers</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Personal Staking Packages</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Take control of your financial growth. Packages starting at ₹20,000 designed for regular wealth accumulators.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {personalPackages.map((pkg, idx) => (
            <div
              key={pkg.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="bg-white border border-gft-gray-light rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-gft-primary/5 opacity-40 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-teal-100 text-teal-850 text-[9px] font-bold uppercase rounded-full tracking-wider">Personal Tier</span>
                  <h3 className="text-lg font-black text-gft-deep mt-4">{pkg.name}</h3>
                </div>

                <div className="py-4 border-y border-gft-gray-light/60">
                  <span className="text-[10px] text-gft-deep/50 block font-bold uppercase">Activation Amount</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-gft-deep">₹{pkg.amount.toLocaleString()}</span>
                    <span className="text-xs text-gft-deep/60">INR</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 my-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Monthly Profit %</span>
                    <span className="font-extrabold text-gft-primary">{pkg.roi}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Monthly Return</span>
                    <span className="font-extrabold text-gft-primary">₹{pkg.monthlyReturn.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Tokens Allocation</span>
                    <span className="font-extrabold text-gft-accent flex items-center gap-1"><Coins size={12}/>{pkg.tokens} GFT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Staking Term</span>
                    <span className="font-extrabold text-gft-deep">{pkg.duration} Months</span>
                  </div>
                </div>
              </div>

              <Link
                href="/register"
                className="relative z-10 w-full text-center mt-6 text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-all bg-gft-dark text-white hover:bg-gft-deep cursor-pointer"
              >
                Acquire Personal Package
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
