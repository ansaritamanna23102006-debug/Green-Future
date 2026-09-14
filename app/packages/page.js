"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, Coins, Clock, Info } from "lucide-react";
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
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeTab]);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <div className="inline-flex items-center gap-2 self-center bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Clock size={13} />
            <span>Specifications Under Client Verification</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">GFT Startup Packages Catalog</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Preview our multi-tier package architecture. Direct financial purchasing is paused until final business confirmation.
          </p>
        </div>
      </section>

      {/* Governance Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-3 px-6 text-center text-xs text-amber-900 font-medium">
        <span className="font-bold">Catalog Status:</span> Package prices, ROI percentages, and staking schedules are proposals pending client confirmation. Financial execution is disabled.
      </div>

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
      <section className="py-16 max-w-7xl mx-auto px-6 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activePackages.map((pkg, idx) => {
            return (
              <div
                key={pkg.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="relative bg-white border border-gft-gray-light rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group overflow-hidden"
              >
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-gft-primary uppercase tracking-wide">{activeTab} package</span>
                      <h3 className="text-xl font-black text-gft-deep">{pkg.name}</h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 w-fit">
                    <Clock size={12} />
                    <span>Pending final business confirmation</span>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-gft-gray-light/60">
                    <span className="text-[10px] text-gft-deep/50 block font-bold uppercase">Proposed Activation Amount</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-black text-gft-deep">₹{pkg.amount.toLocaleString()}</span>
                      <span className="text-xs text-gft-deep/60">INR</span>
                    </div>
                  </div>

                  {/* Yield Details */}
                  <div className="flex flex-col gap-3 my-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Proposed Monthly Yield</span>
                      <span className="font-extrabold text-gft-primary">{pkg.roi}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Est. Monthly Return</span>
                      <span className="font-extrabold text-gft-primary">₹{pkg.monthlyReturn.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Tenure</span>
                      <span className="font-extrabold text-gft-deep">{pkg.duration} Months (Lock-in)</span>
                    </div>
                  </div>
                </div>

                {/* Disabled CTA with informative label */}
                <div className="mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    disabled
                    className="w-full text-center text-xs font-bold py-3.5 rounded-full flex items-center justify-center gap-1.5 bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed select-none"
                  >
                    Pending Confirmation
                  </button>
                  <p className="text-[10px] text-center text-gft-deep/40">Financial execution paused under Phase 0 governance</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info Safeguard Banner */}
      <section className="bg-gft-card-dark text-white py-12 px-6 border-t border-gft-border-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-14 h-14 bg-gft-primary/20 text-gft-accent rounded-2xl flex items-center justify-center shrink-0">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-lg font-bold">Policy & Capital Lock-in</h3>
            <p className="text-xs text-white/70 leading-relaxed mt-1">
              Under GFT specifications, activated packages carry a mandatory 365-day capital lock-in. Staking distributions are credited to the ledger on the 1st, 11th, and 21st of each calendar month.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
