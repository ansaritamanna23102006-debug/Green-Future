"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ShieldCheck, Zap, Award, Coins, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

export default function PackagesPage() {
  const { studentPackages, personalPackages, businessPackages } = useApp();
  const [activeTab, setActiveTab] = useState("student");
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  const getActivePackages = () => {
    if (activeTab === "student") return studentPackages;
    if (activeTab === "personal") return personalPackages;
    return businessPackages;
  };

  const activePackages = getActivePackages();

  // Reset animations when tab changes
  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.15)" }
    );
  }, [activeTab]);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gft-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-gft-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div ref={headerRef} className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Packages</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Eco-Tech Staking Packages</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Select a tier category to participate in GFT green portfolios, earning monthly yields and native token multipliers.
          </p>
        </div>
      </section>

      {/* Tab Selectors */}
      <section className="py-8 bg-white border-b border-gft-gray-light sticky top-[72px] z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex justify-center gap-4">
          {["student", "personal", "business"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-6 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                activeTab === tab
                  ? "bg-gft-primary text-white border-gft-primary shadow-md"
                  : "bg-gft-light border-gft-gray-light text-gft-deep hover:border-gft-primary/45"
              }`}
            >
              {tab} packages
            </button>
          ))}
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activePackages.map((pkg, idx) => {
            return (
              <div
                key={pkg.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="relative bg-white border border-gft-gray-light rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group overflow-hidden"
              >
                {/* Background Accent Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gft-primary/5 to-gft-accent/5 opacity-40 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-gft-primary uppercase tracking-wide">{activeTab} package</span>
                    <h3 className="text-lg font-black text-gft-deep">{pkg.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-gft-gray-light/60">
                    <span className="text-[10px] text-gft-deep/50 block font-bold uppercase">Activation Amount</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-gft-deep">₹{pkg.amount.toLocaleString()}</span>
                      <span className="text-xs text-gft-deep/60">INR</span>
                    </div>
                  </div>

                  {/* Yield Details */}
                  <div className="flex flex-col gap-3 my-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Monthly Profit %</span>
                      <span className="font-extrabold text-gft-primary">{pkg.roi}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Monthly Profit amount</span>
                      <span className="font-extrabold text-gft-primary">₹{pkg.monthlyReturn.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gft-deep/50 font-bold uppercase text-[9px]">GFT Token allocation</span>
                      <span className="font-extrabold text-gft-accent flex items-center gap-1"><Coins size={12}/>{pkg.tokens} GFT</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Staking Term</span>
                      <span className="font-extrabold text-gft-deep">{pkg.duration} Months</span>
                    </div>
                  </div>
                </div>

                {/* Buy Button */}
                <Link
                  href="/register"
                  className="relative z-10 w-full text-center mt-6 text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5 transition-all bg-gft-dark text-white hover:bg-gft-deep cursor-pointer"
                >
                  Acquire Package
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info Warning Banner */}
      <section className="bg-gft-card-dark text-white py-12 px-6 border-t border-gft-border-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-gft-primary/20 text-gft-accent rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg font-bold">Important Safeguard Rules</h3>
            <p className="text-xs text-white/70 leading-relaxed mt-1">
              Once an investment is made under GFT plans, the package is locked for 1 year (12 months). You will receive monthly profits on the 1st, 11th, and 21st, and the investment capital cannot be withdrawn in between.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
