"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

export default function StudentPackagesPage() {
  const { studentPackages } = useApp();
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

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
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Student Staking Packages</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Preview the GFT student tier packages. Live activations are paused pending client confirmation.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentPackages.map((pkg, idx) => (
            <div
              key={pkg.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="bg-white border border-gft-gray-light rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="relative z-10 flex flex-col gap-4">
                <div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[9px] font-bold uppercase rounded-full tracking-wider">Student Tier</span>
                  <h3 className="text-xl font-black text-gft-deep mt-3">{pkg.name}</h3>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 w-fit">
                  <Clock size={12} />
                  <span>Pending final business confirmation</span>
                </div>

                <div className="py-4 border-y border-gft-gray-light/60">
                  <span className="text-[10px] text-gft-deep/50 block font-bold uppercase">Proposed Activation Amount</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-black text-gft-deep">₹{pkg.amount.toLocaleString()}</span>
                    <span className="text-xs text-gft-deep/60">INR</span>
                  </div>
                </div>

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
                    <span className="text-gft-deep/50 font-bold uppercase text-[9px]">Staking Term</span>
                    <span className="font-extrabold text-gft-deep">{pkg.duration} Months (Lock-in)</span>
                  </div>
                </div>
              </div>

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
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
