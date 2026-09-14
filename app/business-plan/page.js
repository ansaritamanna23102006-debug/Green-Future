"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ShieldCheck, DollarSign, Users, Briefcase, Zap, HelpCircle, Coins, AlertTriangle, Info, CheckCircle2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";
import {
  DISPLAY_REFERENCE_LEVELS,
  DISPLAY_RANKS,
  DISPLAY_PASSIVE_TIERS,
  CALCULATOR_TITLE,
  CALCULATOR_DISCLAIMER,
} from "@/lib/businessPlanRules";

gsap.registerPlugin(ScrollTrigger);

export default function BusinessPlanPage() {
  const { studentPackages, personalPackages, businessPackages } = useApp();
  const scrollContainerRef = useRef(null);

  // Self Staking Calculator States (Estimate simulator only)
  const [stakeAmount, setStakeAmount] = useState(10000);
  const [stakeProfit, setStakeProfit] = useState({ daily: 16, monthly: 500, yearly: 6000 });

  // Reference Level Calculator States (Estimate simulator only)
  const [teamSizeL1, setTeamSizeL1] = useState(5);
  const [avgStake, setAvgStake] = useState(10000);
  const [referralYield, setReferralYield] = useState(5000);

  // 1. Calculate Self Staking ROI (Strictly an estimate simulator)
  useEffect(() => {
    const allPkgs = [...studentPackages, ...personalPackages, ...businessPackages];
    const matchedPkg = allPkgs.find((p) => p.amount === stakeAmount);

    let rate = 0.05; // 5% baseline estimate
    if (matchedPkg && matchedPkg.roi) {
      rate = matchedPkg.roi / 100;
    } else {
      if (stakeAmount >= 100000) rate = 0.08;
      else if (stakeAmount >= 40000) rate = 0.07;
      else if (stakeAmount >= 20000) rate = 0.06;
      else rate = 0.05;
    }

    const monthly = stakeAmount * rate;
    const daily = monthly / 30;
    const yearly = monthly * 12;

    const displayObj = { d: stakeProfit.daily, m: stakeProfit.monthly, y: stakeProfit.yearly };

    gsap.to(displayObj, {
      d: daily,
      m: monthly,
      y: yearly,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        setStakeProfit({
          daily: Math.round(displayObj.d),
          monthly: Math.round(displayObj.m),
          yearly: Math.round(displayObj.y),
        });
      },
    });
  }, [stakeAmount, studentPackages, personalPackages, businessPackages]);

  // 2. Calculate Reference Referral Income (5 levels illustrative)
  useEffect(() => {
    // Only L1-L3 are confirmed (5%, 3%, 2%); L4 & L5 pending confirmation
    const l1Yield = teamSizeL1 * avgStake * 0.05;
    const l2Yield = (teamSizeL1 * 3) * avgStake * 0.03;
    const l3Yield = (teamSizeL1 * 6) * avgStake * 0.02;
    const totalYield = l1Yield + l2Yield + l3Yield;

    const displayObj = { val: referralYield };
    gsap.to(displayObj, {
      val: totalYield,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        setReferralYield(Math.round(displayObj.val));
      },
    });
  }, [teamSizeL1, avgStake]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bp-section-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bp-section-grid",
            start: "top 85%",
          },
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
          <div className="inline-flex items-center gap-2 self-center bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Clock size={13} />
            <span>Audit & Verification Phase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">GFT Compensation & Business Plan</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Detailed breakdown of our five compensation structures. All rules and financial gates are enforced exclusively by backend ledger controls.
          </p>

          {/* Critical Governance Alert */}
          <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-left max-w-3xl mx-auto flex items-start gap-4">
            <Info className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-white/80 space-y-1">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Authoritative Notice: Program Status</p>
              <p>
                Individual rules with the badge <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">Rule Confirmed</span> are structurally defined in the plan specification. However, live financial payouts remain subject to overall platform activation. Rules with <span className="text-amber-300 font-semibold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">Pending final business confirmation</span> require client sign-off before becoming executable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Pillars Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-14 flex flex-col gap-3">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Business Mechanics</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Our 5 Core Income Categories</h2>
          <p className="text-sm text-gft-deep/60 max-w-xl mx-auto">
            Each category represents a distinct accounting stream executed through our double-entry ledger.
          </p>
        </div>

        <div className="bp-section-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-3 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">1</div>
            <h3 className="font-bold text-base text-gft-deep">Self Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Illustrative monthly yields (5% to 8%) on verified packages over 12-month tenure, subject to activation.
            </p>
            <span className="mt-auto text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md text-center">
              Pending Package Confirmation
            </span>
          </div>

          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-3 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">2</div>
            <h3 className="font-bold text-base text-gft-deep">Reference Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Multi-tier referral structure: L1 (5%), L2 (3%), L3 (2%) confirmed; L4 (1.5%) and L5 (1.0%) under review.
            </p>
            <span className="mt-auto text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md text-center">
              L1–L3 Rule Confirmed
            </span>
          </div>

          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-3 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">3</div>
            <h3 className="font-bold text-base text-gft-deep">Ranks & Rewards</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              7 milestone ranks (Silver to Chairman) based on matched leg volume with recognition pins and travel incentives.
            </p>
            <span className="mt-auto text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md text-center">
              Rule Confirmed
            </span>
          </div>

          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-3 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">4</div>
            <h3 className="font-bold text-base text-gft-deep">Turnover Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Dedicated leadership pool payouts (2.0% down to 0.25% depending on rank) calculated on matched team volume.
            </p>
            <span className="mt-auto text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md text-center">
              Rule Confirmed
            </span>
          </div>

          <div className="bp-section-card bg-white border border-gft-gray-light p-6 rounded-2xl flex flex-col gap-3 hover:border-gft-primary/45 transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center font-bold">5</div>
            <h3 className="font-bold text-base text-gft-deep">Passive Income</h3>
            <p className="text-xs text-gft-deep/70 leading-relaxed">
              Monthly milestone distributions as cumulative team turnover scales from ₹5 Lakh up to ₹100 Crore.
            </p>
            <span className="mt-auto text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-md text-center">
              Tier 8 Under Review
            </span>
          </div>
        </div>
      </section>

      {/* Reference Income Levels Detail */}
      <section className="py-16 bg-white border-t border-b border-gft-gray-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10 flex flex-col gap-2">
            <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Level Breakdown</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gft-deep">5-Level Reference Income Specification</h2>
            <p className="text-xs sm:text-sm text-gft-deep/60">Authoritative status of each referral tier.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gft-gray-light">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-gft-light border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/60">
                  <th className="py-3.5 px-5">Level</th>
                  <th className="py-3.5 px-5">Commission Rate</th>
                  <th className="py-3.5 px-5">Specification Status</th>
                  <th className="py-3.5 px-5">Execution Constraint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gft-gray-light/60">
                {DISPLAY_REFERENCE_LEVELS.map((item) => (
                  <tr key={item.level} className="hover:bg-gft-light/40 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-gft-deep">Level {item.level}</td>
                    <td className="py-3.5 px-5 font-black text-gft-primary text-base">{item.percentage.toFixed(1)}%</td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          item.badge === "Rule Confirmed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.badge === "Rule Confirmed" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {item.badge}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-gft-deep/70">{item.secondaryText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Estimate Simulators Section */}
      <section ref={scrollContainerRef} className="py-20 bg-gft-light/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8 flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 self-center bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <Info size={14} />
              <span>{CALCULATOR_TITLE}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gft-deep">Planning & Estimation Tools</h2>
            <p className="text-xs sm:text-sm text-gft-deep/60 max-w-2xl mx-auto">
              {CALCULATOR_DISCLAIMER} Results displayed below are educational projections and do not constitute guaranteed returns or financial commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            {/* Left: Self Staking Planner */}
            <div className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3.5 border-b border-gft-gray-light pb-4">
                <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gft-deep">Self Package Yield Simulator</h3>
                  <p className="text-xs text-gft-deep/50">Simulate potential payouts across package tiers.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
                  <span>Simulated Stake Amount</span>
                  <span className="text-gft-primary text-sm font-black">₹{stakeAmount.toLocaleString()}</span>
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

              <div className="grid grid-cols-3 gap-3 text-center mt-2">
                <div className="bg-gft-light p-3.5 rounded-xl border border-gft-gray-light/60">
                  <span className="text-[9px] uppercase font-bold text-gft-deep/50 block">Est. Daily</span>
                  <span className="text-sm font-black text-gft-primary block mt-1">₹{stakeProfit.daily}</span>
                </div>
                <div className="bg-gft-light p-3.5 rounded-xl border border-gft-gray-light/60">
                  <span className="text-[9px] uppercase font-bold text-gft-deep/50 block">Est. Monthly</span>
                  <span className="text-sm font-black text-gft-primary block mt-1">₹{stakeProfit.monthly}</span>
                </div>
                <div className="bg-gft-light p-3.5 rounded-xl border border-gft-gray-light/60">
                  <span className="text-[9px] uppercase font-bold text-gft-deep/50 block">Est. Yearly</span>
                  <span className="text-sm font-black text-gft-primary block mt-1">₹{stakeProfit.yearly}</span>
                </div>
              </div>

              <div className="text-[11px] text-gft-deep/50 bg-gft-light/50 p-3 rounded-xl border border-gft-gray-light/50">
                ⚠️ <strong className="text-gft-deep">Estimate simulator only:</strong> Authoritative returns are subject to backend confirmation and live package activation.
              </div>
            </div>

            {/* Right: Team Referral Commission Simulator */}
            <div className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3.5 border-b border-gft-gray-light pb-4">
                <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gft-deep">Referral Matrix Simulator</h3>
                  <p className="text-xs text-gft-deep/50">Project commissions across confirmed levels (L1–L3).</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs font-bold text-gft-deep">
                  <span>Direct Referrals (Level 1)</span>
                  <span className="text-gft-primary text-sm font-black">{teamSizeL1} directs</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
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
                  min="3000"
                  max="50000"
                  step="1000"
                  value={avgStake}
                  onChange={(e) => setAvgStake(Number(e.target.value))}
                  className="w-full h-2 bg-gft-light rounded-lg appearance-none cursor-pointer accent-gft-primary"
                />
              </div>

              <div className="bg-gft-light/60 p-4.5 rounded-2xl border border-gft-gray-light/60 flex justify-between items-center mt-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gft-deep/50 block">Simulated Referral Payout</span>
                  <span className="text-[11px] text-gft-deep/60 mt-0.5 block">Estimated across confirmed L1–L3 depth</span>
                </div>
                <h3 className="text-2xl font-black text-gft-primary">₹{referralYield.toLocaleString()}</h3>
              </div>

              <div className="text-[11px] text-gft-deep/50 bg-gft-light/50 p-3 rounded-xl border border-gft-gray-light/50">
                ⚠️ <strong className="text-gft-deep">Estimate simulator only:</strong> Team volume, qualification criteria, and leg balance are determined strictly by backend processing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranks & Rewards Specification */}
      <section className="py-20 max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-12 flex flex-col gap-3">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Leadership Tiers</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Ranks & Recognition Rewards</h2>
          <p className="text-sm text-gft-deep/60 max-w-xl mx-auto">
            Designations achieved through cumulative matched organizational turnover.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gft-gray-light bg-white shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gft-light border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/60">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Required Turnover</th>
                <th className="py-4 px-6">Leadership Fund</th>
                <th className="py-4 px-6">Incentive Reward</th>
                <th className="py-4 px-6">Rule Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gft-gray-light/60">
              {DISPLAY_RANKS.map((r) => (
                <tr key={r.rank} className="hover:bg-gft-light/35 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-gft-deep">{r.rank}</td>
                  <td className="py-3.5 px-6 font-semibold text-gft-deep/80">₹{(r.turnover / 100000).toFixed(2)} Lakh</td>
                  <td className="py-3.5 px-6 font-bold text-gft-primary">{r.fund}</td>
                  <td className="py-3.5 px-6 text-gft-deep/80">{r.rewards}</td>
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 size={12} />
                      {r.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Passive Income Breakdown */}
      <section className="py-20 bg-white border-t border-gft-gray-light">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="text-center mb-12 flex flex-col gap-3">
            <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Milestone Rewards</span>
            <h2 className="text-3xl font-extrabold text-gft-deep">Passive Matching Income</h2>
            <p className="text-sm text-gft-deep/60 max-w-xl mx-auto">
              Monthly milestone distributions based on organization turnover. All values remain subject to final platform activation.
            </p>
          </div>

          <div className="bg-white border border-gft-gray-light rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/60 bg-gft-light">
                    <th className="py-3.5 px-6">Tier</th>
                    <th className="py-3.5 px-6">Turnover Milestone</th>
                    <th className="py-3.5 px-6 text-gft-primary">Monthly Passive</th>
                    <th className="py-3.5 px-6 text-right">Yearly Total</th>
                    <th className="py-3.5 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gft-gray-light/60">
                  {DISPLAY_PASSIVE_TIERS.map((level) => {
                    const isDisputed = level.arithmeticMismatch;
                    return (
                      <tr
                        key={level.tier}
                        className={`hover:bg-gft-light/35 transition-colors ${
                          isDisputed ? "bg-amber-50/60" : ""
                        }`}
                      >
                        <td className="py-3.5 px-6 font-bold text-gft-deep/60">Tier {level.tier}</td>
                        <td className="py-3.5 px-6 font-bold text-gft-deep">
                          {level.turnover >= 10000000
                            ? `₹${(level.turnover / 10000000).toFixed(1)} Crore`
                            : `₹${(level.turnover / 100000).toFixed(1)} Lakh`}
                        </td>
                        <td className="py-3.5 px-6 font-black text-gft-primary">
                          {isDisputed ? (
                            <span className="text-amber-700 text-xs font-semibold">Pending Confirmation</span>
                          ) : (
                            `₹${level.monthlyAmount?.toLocaleString()}`
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-right font-bold text-gft-deep/80">
                          {isDisputed ? (
                            <span className="text-amber-700 text-xs font-semibold">Pending Confirmation</span>
                          ) : (
                            `₹${level.yearlyAmount?.toLocaleString()}`
                          )}
                        </td>
                        <td className="py-3.5 px-6">
                          {isDisputed ? (
                            <div className="flex flex-col gap-1">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 w-fit">
                                <AlertTriangle size={12} />
                                {level.badge}
                              </span>
                              <span className="text-[11px] text-amber-800/80 leading-snug">
                                {level.secondaryText}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-0.5">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
                                <CheckCircle2 size={12} />
                                {level.badge}
                              </span>
                              <span className="text-[10px] text-gft-deep/50">
                                {level.secondaryText}
                              </span>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
