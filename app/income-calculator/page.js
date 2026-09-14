"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { TrendingUp, HelpCircle, Info, RefreshCw, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DISPLAY_PACKAGES, CALCULATOR_TITLE, CALCULATOR_DISCLAIMER } from "@/lib/businessPlanRules";

export default function IncomeCalculatorPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [termMonths, setTermMonths] = useState(12);

  const selectedPkg = DISPLAY_PACKAGES[selectedIdx] || DISPLAY_PACKAGES[0];

  const [results, setResults] = useState({
    daily: 5,
    monthly: 150,
    yearly: 1800,
    totalExpected: 1800,
  });

  const dailyRef = useRef(null);
  const monthlyRef = useRef(null);
  const yearlyRef = useRef(null);
  const totalRef = useRef(null);

  useEffect(() => {
    // Official monthly ROI rate from Phase 0 configuration (5% to 8% monthly)
    const monthlyRate = (selectedPkg.monthlyPercentage || 5.0) / 100;
    const monthlyVal = selectedPkg.officialPrice * monthlyRate;
    const dailyVal = monthlyVal / 30;
    const yearlyVal = monthlyVal * 12;
    const totalExpectedVal = monthlyVal * termMonths;

    const animObj = {
      d: results.daily,
      m: results.monthly,
      y: results.yearly,
      t: results.totalExpected,
    };

    gsap.to(animObj, {
      d: dailyVal,
      m: monthlyVal,
      y: yearlyVal,
      t: totalExpectedVal,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        setResults({
          daily: Math.round(animObj.d),
          monthly: Math.round(animObj.m),
          yearly: Math.round(animObj.y),
          totalExpected: Math.round(animObj.t),
        });
      },
    });
  }, [selectedIdx, termMonths, selectedPkg]);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <div className="inline-flex items-center gap-2 self-center bg-blue-500/20 text-blue-300 border border-blue-500/40 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Info size={13} />
            <span>{CALCULATOR_TITLE}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Package Yield Simulator</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Simulate package returns based on illustrative 5% to 8% monthly parameters.
          </p>
        </div>
      </section>

      {/* Mandatory Disclaimer Banner */}
      <div className="bg-amber-50 border-b border-amber-200 py-3.5 px-6 text-center text-xs text-amber-900 font-medium">
        <span className="font-bold">Important Notice:</span> {CALCULATOR_DISCLAIMER} Calculations do not represent guaranteed income, guaranteed profit, or guaranteed return.
      </div>

      {/* Main Simulator Console */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Input Console (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-gft-gray-light pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gft-deep">Select Specification Package</h2>
                <p className="text-xs text-gft-deep/50">Pick a package tier to observe estimated returns.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedIdx(0);
                setTermMonths(12);
              }}
              title="Reset Simulator"
              className="w-8 h-8 rounded-full bg-gft-light text-gft-deep/60 hover:text-gft-primary hover:bg-gft-primary/10 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DISPLAY_PACKAGES.map((pkg, idx) => (
              <button
                key={pkg.packageId}
                onClick={() => setSelectedIdx(idx)}
                className={`py-3.5 px-3 rounded-2xl border text-center transition-all flex flex-col gap-1 cursor-pointer ${
                  selectedIdx === idx
                    ? "bg-[#082F2C] border-gft-primary text-white scale-[1.02] shadow-sm"
                    : "bg-gft-light border-gft-gray-light text-gft-deep hover:border-gft-primary/50"
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedIdx === idx ? "text-gft-accent" : "text-gft-deep/50"}`}>
                  {pkg.name}
                </span>
                <span className="text-sm font-black">₹{pkg.officialPrice.toLocaleString()}</span>
                <span className={`text-[9px] font-semibold mt-0.5 ${selectedIdx === idx ? "text-white/60" : "text-gft-deep/40"}`}>
                  {pkg.monthlyPercentage.toFixed(1)}% / mo
                </span>
              </button>
            ))}
          </div>

          {/* Term Slider */}
          <div className="flex flex-col gap-3 border-t border-gft-gray-light pt-6">
            <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
              <span>Simulation Horizon (Months)</span>
              <span className="text-gft-primary text-sm font-black">{termMonths} Months ({termMonths * 30} Days)</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="1"
              value={termMonths}
              onChange={(e) => setTermMonths(Number(e.target.value))}
              className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
            />
            <div className="flex justify-between text-[10px] text-gft-deep/45 font-bold">
              <span>1 Month</span>
              <span>12 Months (Standard Lock-in)</span>
            </div>
          </div>

          <div className="text-[11px] text-gft-deep/60 bg-amber-50/60 border border-amber-200/60 p-3.5 rounded-xl flex items-start gap-2">
            <AlertCircle size={14} className="text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Simulation only:</strong> The figures generated represent illustrative estimates derived from draft business specifications. Live financial eligibility is evaluated exclusively by backend services.
            </span>
          </div>
        </div>

        {/* Right Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-[#082F2C] text-white p-8 rounded-3xl border border-gft-border-dark flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gft-accent flex items-center justify-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Estimated Yield Projections</h3>
                <span className="text-[10px] text-white/50">{CALCULATOR_TITLE}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-semibold">Est. Daily Pro-Rata</span>
                <span ref={dailyRef} className="text-lg font-bold text-gft-accent">₹{results.daily.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-semibold">Est. Monthly Payout</span>
                <span ref={monthlyRef} className="text-lg font-bold text-gft-accent">₹{results.monthly.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-semibold">Est. Yearly Schedule</span>
                <span ref={yearlyRef} className="text-lg font-bold text-gft-accent">₹{results.yearly.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mt-2 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-extrabold tracking-wider">Estimated Total</span>
                <span className="text-[10px] text-gft-accent font-bold mt-0.5">Over {termMonths} Months</span>
              </div>
              <h3 ref={totalRef} className="text-2xl font-black text-gft-primary">₹{results.totalExpected.toLocaleString()}</h3>
            </div>
          </div>

          <div className="bg-white border border-gft-gray-light p-6 rounded-3xl flex flex-col gap-2 text-center text-xs text-gft-deep/60">
            <p className="font-semibold text-gft-deep">Execution Gating Notice</p>
            <p>
              Package activation and yield disbursement are subject to the Phase 0 business plan gate. All ledger transactions require confirmed business rules.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimers FAQ */}
      <section className="bg-white border-t border-gft-gray-light py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-gft-primary" />
            <h3 className="text-base font-bold text-gft-deep">Simulator Disclaimers & Governance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] text-gft-deep/70 leading-relaxed">
            <div>
              <h4 className="font-semibold text-gft-deep mb-1.5">Are returns guaranteed?</h4>
              <p>
                No. Green Future Technology does not offer guaranteed returns, guaranteed income, or guaranteed profit. All projections are educational simulations based on proposed business rules.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gft-deep mb-1.5">How is eligibility determined?</h4>
              <p>
                Actual financial eligibility, ledger postings, and withdrawal authorizations are determined exclusively by backend-authoritative rules and verified KYC status.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
