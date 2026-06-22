"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { DollarSign, Percent, TrendingUp, HelpCircle, ChevronRight, Zap, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const packageOptions = [
  { name: "GFT-1", amount: 3000, rate: 0.010 },
  { name: "GFT-2", amount: 5000, rate: 0.010 },
  { name: "GFT-3", amount: 10000, rate: 0.012 },
  { name: "GFT-4", amount: 20000, rate: 0.015 },
  { name: "GFT-5", amount: 30000, rate: 0.015 },
  { name: "GFT-6", amount: 40000, rate: 0.015 },
  { name: "GFT-7", amount: 50000, rate: 0.018 },
  { name: "GFT-8", amount: 100000, rate: 0.020 }
];

export default function IncomeCalculatorPage() {
  const [selectedIdx, setSelectedIdx] = useState(2); // Default to GFT-3 (10,000)
  const [termMonths, setTermMonths] = useState(10); // Default to 10 months (300 days)
  
  // Results states
  const [results, setResults] = useState({
    daily: 120,
    monthly: 3600,
    yearly: 43800,
    totalExpected: 36000
  });

  const selectedPkg = packageOptions[selectedIdx];

  // GSAP animated counter references
  const dailyRef = useRef(null);
  const monthlyRef = useRef(null);
  const yearlyRef = useRef(null);
  const totalRef = useRef(null);

  useEffect(() => {
    const dailyVal = selectedPkg.amount * selectedPkg.rate;
    const monthlyVal = dailyVal * 30;
    const yearlyVal = dailyVal * 365;
    const totalExpectedVal = dailyVal * 30 * termMonths;

    const animObj = {
      d: results.daily,
      m: results.monthly,
      y: results.yearly,
      t: results.totalExpected
    };

    gsap.to(animObj, {
      d: dailyVal,
      m: monthlyVal,
      y: yearlyVal,
      t: totalExpectedVal,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        setResults({
          daily: Math.round(animObj.d),
          monthly: Math.round(animObj.m),
          yearly: Math.round(animObj.y),
          totalExpected: Math.round(animObj.t)
        });
      }
    });
  }, [selectedIdx, termMonths]);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gft-primary/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gft-accent/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">ROI Calculator</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Interactive ROI Simulator</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Simulate passive returns and calculate clean energy yields instantly. Select a tech package and scroll the sliders to customize your targets.
          </p>
        </div>
      </section>

      {/* Main Simulator Console */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Input Console (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-8">
          <div className="flex justify-between items-center border-b border-gft-gray-light pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
                <TrendingUp className="h-5.5 w-5.5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gft-deep">Package Selection</h2>
                <p className="text-xs text-gft-deep/45">Pick a package tier to observe daily returns.</p>
              </div>
            </div>
            <button 
              onClick={() => setSelectedIdx(2)}
              className="w-8 h-8 rounded-full bg-gft-light text-gft-deep/60 hover:text-gft-primary hover:bg-gft-primary/10 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {packageOptions.map((pkg, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`py-4 px-3 rounded-2xl border text-center transition-all flex flex-col gap-1 cursor-pointer ${
                  selectedIdx === idx
                    ? "bg-[#082F2C] border-gft-primary text-white scale-[1.02] shadow-md shadow-gft-primary/10"
                    : "bg-gft-light border-gft-gray-light text-gft-deep hover:border-gft-primary/50"
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedIdx === idx ? "text-gft-accent" : "text-gft-deep/50"}`}>
                  {pkg.name}
                </span>
                <span className="text-sm font-extrabold">₹{pkg.amount.toLocaleString()}</span>
                <span className={`text-[9px] font-semibold mt-1 ${selectedIdx === idx ? "text-white/60" : "text-gft-deep/40"}`}>
                  {(pkg.rate * 100).toFixed(1)}% Daily
                </span>
              </button>
            ))}
          </div>

          {/* Staking Term Slider */}
          <div className="flex flex-col gap-4 border-t border-gft-gray-light pt-6">
            <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
              <span>Simulation Period (Months)</span>
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
              <span>12 Months (Full Year)</span>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Yield Rates Panel */}
          <div className="bg-[#082F2C] text-white p-8 rounded-3xl border border-gft-border-dark flex flex-col gap-6 relative overflow-hidden">
            {/* Absolute background accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gft-primary/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-gft-accent flex items-center justify-center">
                <Percent className="h-5.5 w-5.5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Estimated Staking Returns</h3>
                <span className="text-[10px] text-white/50">Simulated results based on current pools</span>
              </div>
            </div>

            <div className="flex flex-col gap-5 pt-4 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-semibold">Daily Yield</span>
                <span ref={dailyRef} className="text-lg font-bold text-gft-accent">₹{results.daily.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-semibold">Monthly Yield</span>
                <span ref={monthlyRef} className="text-lg font-bold text-gft-accent">₹{results.monthly.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60 font-semibold">Yearly Projection</span>
                <span ref={yearlyRef} className="text-lg font-bold text-gft-accent">₹{results.yearly.toLocaleString()}</span>
              </div>
            </div>

            {/* Simulated Yield Total */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mt-2 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase font-extrabold tracking-wider">Expected Return</span>
                <span className="text-[10px] text-gft-accent font-bold mt-0.5">Over {termMonths} Months</span>
              </div>
              <h3 ref={totalRef} className="text-2xl font-black text-gft-primary">₹{results.totalExpected.toLocaleString()}</h3>
            </div>
          </div>

          {/* Action Card */}
          <div className="bg-white border border-gft-gray-light p-6 rounded-3xl flex flex-col gap-4 text-center">
            <p className="text-xs text-gft-deep/70">
              Interested in funding green tech? Join GFT now and receive daily passive payouts sent directly to your web3 wallet.
            </p>
            <Link
              href="/register"
              className="bg-gft-primary hover:bg-gft-accent text-white font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-1 transition-all"
            >
              Get Started Now
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimers FAQ */}
      <section className="bg-white border-t border-gft-gray-light py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="h-5 w-5 text-gft-primary" />
            <h3 className="text-base font-bold text-gft-deep">Calculator Disclaimers</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] text-gft-deep/70 leading-relaxed">
            <div>
              <h4 className="font-semibold text-gft-deep mb-1.5">How is daily ROI derived?</h4>
              <p>
                Returns are backed by revenue generated from active clean solar microgrids and grid-tied offset programs. Tiers GFT-1 and GFT-2 yield a flat 1.0% daily, while GFT-8 offers a premium 2.0% daily return due to higher equity shares.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gft-deep mb-1.5">Are return caps simulated here?</h4>
              <p>
                GFT packages operate with a maximum 3x ceiling. In this calculator, the expected return matches a strict linear ROI payout schedule. In practice, direct commission earnings may hit the 3x limit faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
