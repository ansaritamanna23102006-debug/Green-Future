"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, ArrowRight, DollarSign, Users, Briefcase, Zap, HelpCircle, Coins, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

export default function BusinessPlanPage() {
  const { studentPackages, personalPackages, businessPackages, ranks, passiveIncome } = useApp();
  const scrollContainerRef = useRef(null);

  // Self Staking Calculator States
  const [stakeAmount, setStakeAmount] = useState(10000);
  const [stakeProfit, setStakeProfit] = useState({ daily: 80, monthly: 800, yearly: 9600, tokens: 1200 });

  // Reference Level Calculator States
  const [teamSizeL1, setTeamSizeL1] = useState(5);
  const [avgStake, setAvgStake] = useState(10000);
  const [referralYield, setReferralYield] = useState(5000);

  // 1. Calculate Self Staking ROI
  useEffect(() => {
    // Find matching package or interpolate yield
    const allPkgs = [...studentPackages, ...personalPackages, ...businessPackages];
    let matchedPkg = allPkgs.find(p => p.amount === stakeAmount);
    
    let rate = 0.08; // default 8%
    let tokensAllocated = stakeAmount * 0.12; // default GFT multiplier approximation
    
    if (matchedPkg) {
      rate = matchedPkg.roi / 100;
      tokensAllocated = matchedPkg.tokens;
    } else {
      // Find closest rates
      if (stakeAmount >= 150000) rate = 0.13;
      if (stakeAmount >= 300000) rate = 0.14;
      if (stakeAmount >= 500000) rate = 0.15;
      if (stakeAmount < 10000) rate = 0.05;
      tokensAllocated = stakeAmount * (stakeAmount >= 100000 ? 0.075 : 0.15); 
    }

    const monthly = stakeAmount * rate;
    const daily = monthly / 30;
    const yearly = monthly * 12;

    const displayObj = { d: stakeProfit.daily, m: stakeProfit.monthly, y: stakeProfit.yearly, t: stakeProfit.tokens };

    gsap.to(displayObj, {
      d: daily,
      m: monthly,
      y: yearly,
      t: tokensAllocated,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        setStakeProfit({
          daily: Math.round(displayObj.d),
          monthly: Math.round(displayObj.m),
          yearly: Math.round(displayObj.y),
          tokens: Math.round(displayObj.t)
        });
      }
    });
  }, [stakeAmount, studentPackages, personalPackages, businessPackages]);

  // 2. Calculate Reference Referral Income (5 levels)
  useEffect(() => {
    // commission levels: L1=5%, L2=3%, L3=2%, L4=1%, L5=0.5%
    const l1Yield = teamSizeL1 * avgStake * 0.05;
    const l2Yield = (teamSizeL1 * 4) * avgStake * 0.03; // assuming each invites 4
    const l3Yield = (teamSizeL1 * 12) * avgStake * 0.02;
    const totalYield = l1Yield + l2Yield + l3Yield;

    const displayObj = { val: referralYield };
    gsap.to(displayObj, {
      val: totalYield,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        setReferralYield(Math.round(displayObj.val));
      }
    });
  }, [teamSizeL1, avgStake]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bp-section-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
          scrollTrigger: {
            trigger: ".bp-section-grid",
            start: "top 80%"
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Comp Plan</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">GFT Compensation & Business Plan</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Maximize your wealth with our 5-tier financial growth structure: Self Staking, Level Referral, Ranks Reward, Turnover Matching, and Passive Turnover Income.
          </p>
        </div>
      </section>

      {/* The Five Pillars Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-16 flex flex-col gap-4">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wide">Business Mechanics</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Our 5 Core Income Categories</h2>
        </div>

        <div className="bp-section-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-4 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">1</div>
            <h3 className="font-bold text-lg text-gft-deep">Self Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Earn monthly payouts ranging from 5% to 15% on your active package activations for a duration of 1 year.
            </p>
          </div>
          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-4 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">2</div>
            <h3 className="font-bold text-lg text-gft-deep">Reference Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Earn level commission payouts down 5 levels: L1 (5%), L2 (3%), L3 (2%), L4 (1%), and L5 (0.5%) matching team volume.
            </p>
          </div>
          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-4 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">3</div>
            <h3 className="font-bold text-lg text-gft-deep">Ranks & Rewards</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Achieve leader designations (Silver, Gold, Emerald, etc.) and unlock rewards like Smartwatches, R15 Bikes, and Dubai Trips.
            </p>
          </div>
          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-4 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">4</div>
            <h3 className="font-bold text-lg text-gft-deep">Turnover Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Unlock dedicated global pool payouts (from 2% down to 0.25% depending on rank) on matched team turnover volume.
            </p>
          </div>
          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-4 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">5</div>
            <h3 className="font-bold text-lg text-gft-deep">Passive Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Earn regular monthly stable rewards as your cumulative matched team turnover scales from 5 Lakh up to 100 Crore.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section ref={scrollContainerRef} className="py-20 bg-gft-light/50 border-t border-b border-gft-gray-light">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Self Staking Planner */}
          <div className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3.5 border-b border-gft-gray-light pb-4">
              <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
                <DollarSign className="h-5.5 w-5.5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gft-deep">Self Yield Planner</h2>
                <p className="text-xs text-gft-deep/45">Simulate packages and GFT Token yields dynamically.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
                <span>Select Package Stake</span>
                <span className="text-gft-primary text-sm font-black">₹{stakeAmount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1200"
                max="500000"
                step="1000"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
              />
              <div className="flex justify-between text-[10px] text-gft-deep/45 font-bold">
                <span>Min: ₹1,200</span>
                <span>Max: ₹5,00,000</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-2">
              <div className="bg-gft-light p-3.5 rounded-xl border border-gft-gray-light/60">
                <span className="text-[9px] uppercase font-bold text-gft-deep/45 block">Daily Return</span>
                <span className="text-[14px] font-black text-gft-primary block mt-1">₹{stakeProfit.daily}</span>
              </div>
              <div className="bg-gft-light p-3.5 rounded-xl border border-gft-gray-light/60">
                <span className="text-[9px] uppercase font-bold text-gft-deep/45 block">Monthly Return</span>
                <span className="text-[14px] font-black text-gft-primary block mt-1">₹{stakeProfit.monthly}</span>
              </div>
              <div className="bg-gft-light p-3.5 rounded-xl border border-gft-gray-light/60">
                <span className="text-[9px] uppercase font-bold text-gft-deep/45 block">Yearly Return</span>
                <span className="text-[14px] font-black text-gft-primary block mt-1">₹{stakeProfit.yearly}</span>
              </div>
              <div className="bg-gft-light p-3.5 rounded-xl border border-gft-gray-light/60">
                <span className="text-[9px] uppercase font-bold text-gft-deep/45 block">Tokens Reward</span>
                <span className="text-[14px] font-black text-gft-accent block mt-1 flex items-center justify-center gap-0.5"><Coins size={12}/>{stakeProfit.tokens}</span>
              </div>
            </div>
          </div>

          {/* Right: Team Referral Commission Simulator */}
          <div className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-6">
            <div className="flex items-center gap-3.5 border-b border-gft-gray-light pb-4">
              <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
                <Users className="h-5.5 w-5.5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gft-deep">Referral Matrix Simulator</h2>
                <p className="text-xs text-gft-deep/45">Estimate passive commissions across 5 levels of team structure.</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
                <span>Active Direct Referrals (L1)</span>
                <span className="text-gft-primary text-sm font-black">{teamSizeL1} directs</span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                step="1"
                value={teamSizeL1}
                onChange={(e) => setTeamSizeL1(Number(e.target.value))}
                className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
                <span>Average Downline Package Stake</span>
                <span className="text-gft-primary text-sm font-black">₹{avgStake.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1200"
                max="100000"
                step="1000"
                value={avgStake}
                onChange={(e) => setAvgStake(Number(e.target.value))}
                className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
              />
            </div>

            <div className="bg-gft-light/50 p-4.5 rounded-2xl border border-gft-gray-light/60 flex justify-between items-center mt-1">
              <div>
                <span className="text-[10px] uppercase font-bold text-gft-deep/45 block">Simulated Referral Payout</span>
                <span className="text-[11px] text-gft-deep/60 mt-0.5 block">Includes Level 1 to Level 3 network depth</span>
              </div>
              <h3 className="text-2xl font-black text-gft-primary">₹{referralYield.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Passive Income Breakdown */}
      <section className="py-24 max-w-5xl mx-auto px-6 w-full">
        <div className="text-center mb-16 flex flex-col gap-4">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wide">Milestone Passive Rewards</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Passive Matching Income</h2>
          <p className="text-gft-deep/70 text-sm max-w-xl mx-auto">
            GFT awards steady monthly payouts when your total organization turnover matched volume hits specific corporate thresholds.
          </p>
        </div>

        <div className="bg-white border border-gft-gray-light rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                  <th className="py-4 px-6">Level</th>
                  <th className="py-4 px-6">Total Turn-Over Milestone</th>
                  <th className="py-4 px-6 text-gft-primary">Monthly Passive Income</th>
                  <th className="py-4 px-6 text-right">Yearly Passive Payout</th>
                </tr>
              </thead>
              <tbody>
                {passiveIncome.map((level, index) => (
                  <tr key={index} className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors">
                    <td className="py-4 px-6 font-bold text-gft-deep/50">L{level.level}</td>
                    <td className="py-4 px-6 font-bold text-gft-deep">
                      {level.turnover >= 10000000 ? `${(level.turnover / 10000000).toFixed(1)} Crore` : `${(level.turnover / 100000).toFixed(1)} Lakh`}
                    </td>
                    <td className="py-4 px-6 font-black text-gft-primary">₹{level.monthly.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right font-bold text-gft-deep/80">₹{level.yearly.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
