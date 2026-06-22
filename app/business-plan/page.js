"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, ShieldCheck, ArrowRight, DollarSign, Users, Briefcase, Zap, HelpCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BusinessPlanPage() {
  const scrollContainerRef = useRef(null);
  const flowLineRef = useRef(null);
  const nodeSelfRef = useRef(null);
  const nodeRefRef = useRef(null);
  const nodeTeamRef = useRef(null);
  const nodeTurnRef = useRef(null);

  // Self Staking Calculator States
  const [stakeAmount, setStakeAmount] = useState(10000);
  const [stakeProfit, setStakeProfit] = useState({ daily: 120, monthly: 3600, yearly: 43200 });

  // Reference Level Calculator States
  const [teamSizeL1, setTeamSizeL1] = useState(5);
  const [avgStake, setAvgStake] = useState(10000);
  const [referralYield, setReferralYield] = useState(5000);

  // 1. Calculate Self Staking ROI
  useEffect(() => {
    // Tier percentages
    let dailyRate = 0.01; // 1% default
    if (stakeAmount >= 50000) dailyRate = 0.018; // 1.8%
    else if (stakeAmount >= 20000) dailyRate = 0.015; // 1.5%
    else if (stakeAmount >= 10000) dailyRate = 0.012; // 1.2%

    const daily = stakeAmount * dailyRate;
    const monthly = daily * 30;
    const yearly = daily * 365;

    // Animate numbers using GSAP counters
    const targetObj = { d: daily, m: monthly, y: yearly };
    const displayObj = { d: stakeProfit.daily, m: stakeProfit.monthly, y: stakeProfit.yearly };

    gsap.to(displayObj, {
      d: targetObj.d,
      m: targetObj.m,
      y: targetObj.y,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        setStakeProfit({
          daily: Math.round(displayObj.d),
          monthly: Math.round(displayObj.m),
          yearly: Math.round(displayObj.y)
        });
      }
    });
  }, [stakeAmount]);

  // 2. Calculate Reference Referral Income (down 7 levels simulation)
  useEffect(() => {
    // Commission rates: L1=10%, L2=5%, L3=3%, L4=2%, L5=1%, L6=0.5%, L7=0.5%
    const l1Yield = teamSizeL1 * avgStake * 0.1;
    const l2Yield = (teamSizeL1 * 3) * avgStake * 0.05; // assuming each L1 invites 3 members
    const l3Yield = (teamSizeL1 * 9) * avgStake * 0.03;
    const totalYield = l1Yield + l2Yield + l3Yield;

    const displayObj = { val: referralYield };
    gsap.to(displayObj, {
      val: totalYield,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        setReferralYield(Math.round(displayObj.val));
      }
    });
  }, [teamSizeL1, avgStake]);

  // 3. Scroll Triggered Money Flow Animation
  useEffect(() => {
    // Animate money flow nodes as they scroll into view
    const trigger = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1
      }
    });

    // Animate glowing nodes and SVG paths
    trigger.fromTo(nodeSelfRef.current, { scale: 0.8, opacity: 0.3 }, { scale: 1.1, opacity: 1, duration: 1 })
           .fromTo(nodeRefRef.current, { scale: 0.8, opacity: 0.3 }, { scale: 1.1, opacity: 1, duration: 1 }, "+=0.5")
           .fromTo(nodeTeamRef.current, { scale: 0.8, opacity: 0.3 }, { scale: 1.1, opacity: 1, duration: 1 }, "+=0.5")
           .fromTo(nodeTurnRef.current, { scale: 0.8, opacity: 0.3 }, { scale: 1.1, opacity: 1, duration: 1 }, "+=0.5");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Comp Plan</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Interactive Compensation Plan</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Calculate your staking profits, level commission pipelines, and team matched turnover volume in real-time.
          </p>
        </div>
      </section>

      {/* Interactive Calculators Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Self Staking Calculator */}
        <div className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3.5 border-b border-gft-gray-light pb-4">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
              <DollarSign className="h-5.5 w-5.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gft-deep">Self Staking Yield Planner</h2>
              <p className="text-xs text-gft-deep/45">Acquire packages and receive daily passive payouts.</p>
            </div>
          </div>

          {/* Amount Slider Input */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
              <span>Stake Amount</span>
              <span className="text-gft-primary text-sm">₹{stakeAmount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="100000"
              step="1000"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Number(e.target.value))}
              className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
            />
            <div className="flex justify-between text-[10px] text-gft-deep/45 font-bold">
              <span>Min: ₹3,000</span>
              <span>Max: ₹1,00,000</span>
            </div>
          </div>

          {/* Outputs */}
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div className="bg-gft-light border border-gft-gray-light p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-gft-deep/45">Daily ROI</span>
              <h3 className="text-lg font-extrabold text-gft-primary mt-1">₹{stakeProfit.daily}</h3>
            </div>
            <div className="bg-gft-light border border-gft-gray-light p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-gft-deep/45">Monthly ROI</span>
              <h3 className="text-lg font-extrabold text-gft-primary mt-1">₹{stakeProfit.monthly}</h3>
            </div>
            <div className="bg-gft-light border border-gft-gray-light p-4 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-gft-deep/45">Yearly ROI</span>
              <h3 className="text-lg font-extrabold text-gft-primary mt-1">₹{stakeProfit.yearly}</h3>
            </div>
          </div>
        </div>

        {/* Right: Reference Level Calculator */}
        <div className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3.5 border-b border-gft-gray-light pb-4">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
              <Users className="h-5.5 w-5.5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gft-deep">Direct Referral Level Calculator</h2>
              <p className="text-xs text-gft-deep/45">Estimate passive commissions across 7 levels of team growth.</p>
            </div>
          </div>

          {/* Level 1 Direct size */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
              <span>Direct Referrals (Level 1)</span>
              <span className="text-gft-primary text-sm">{teamSizeL1} active directs</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              step="1"
              value={teamSizeL1}
              onChange={(e) => setTeamSizeL1(Number(e.target.value))}
              className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
            />
          </div>

          {/* Average downline stake amount */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
              <span>Average Downline Stake</span>
              <span className="text-gft-primary text-sm">₹{avgStake.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="50000"
              step="1000"
              value={avgStake}
              onChange={(e) => setAvgStake(Number(e.target.value))}
              className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
            />
          </div>

          {/* Level Yield Output */}
          <div className="bg-[#082F2C] border border-gft-border-dark p-5 rounded-2xl flex justify-between items-center text-white mt-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Est. Levels 1-3 yield</span>
              <span className="text-sm text-gft-accent font-semibold">Assuming 3x multiplication speed</span>
            </div>
            <h3 className="text-2xl font-black text-gft-primary">₹{referralYield.toLocaleString()}</h3>
          </div>
        </div>
      </section>

      {/* Scroll-Linked Money Flow System */}
      <section
        ref={scrollContainerRef}
        className="py-24 bg-gft-dark-bg text-white relative overflow-hidden flex flex-col gap-12"
      >
        <div className="text-center max-w-2xl mx-auto mb-12 relative z-10 px-6">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GSAP Scrolling Timeline</span>
          <h2 className="text-3xl font-extrabold text-white mt-2">Comp Plan Money Flow Visualization</h2>
          <p className="text-white/60 text-xs sm:text-sm mt-2">Scroll down to observe how capital distributes across binary matched wings.</p>
        </div>

        {/* Money flow graphic */}
        <div className="max-w-5xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 items-center justify-center">
          {/* Node 1: Self Staking */}
          <div
            ref={nodeSelfRef}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center gap-3 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-gft-primary/20 text-gft-accent flex items-center justify-center">
              <Zap className="h-5.5 w-5.5" />
            </div>
            <h4 className="text-sm font-bold text-white">1. Self Staking</h4>
            <p className="text-[11px] text-white/65 leading-relaxed">Member stakes GFT packages, generating passive daily ROI.</p>
          </div>

          {/* Node 2: Reference Yields */}
          <div
            ref={nodeRefRef}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center gap-3 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-gft-primary/20 text-gft-accent flex items-center justify-center">
              <Users className="h-5.5 w-5.5" />
            </div>
            <h4 className="text-sm font-bold text-white">2. Direct Referral</h4>
            <p className="text-[11px] text-white/65 leading-relaxed">Referral code matches active direct downline volumes at 10%.</p>
          </div>

          {/* Node 3: Binary Match */}
          <div
            ref={nodeTeamRef}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center gap-3 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-gft-primary/20 text-gft-accent flex items-center justify-center">
              <Award className="h-5.5 w-5.5" />
            </div>
            <h4 className="text-sm font-bold text-white">3. Binary Match</h4>
            <p className="text-[11px] text-white/65 leading-relaxed">Wings match matching volume; pays weekly binary commission at 12%.</p>
          </div>

          {/* Node 4: Global Pool */}
          <div
            ref={nodeTurnRef}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center gap-3 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-xl bg-gft-primary/20 text-gft-accent flex items-center justify-center">
              <Briefcase className="h-5.5 w-5.5" />
            </div>
            <h4 className="text-sm font-bold text-white">4. Leadership Pools</h4>
            <p className="text-[11px] text-white/65 leading-relaxed">Weekly corporate caps route shares of pool distributions to top directors.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
