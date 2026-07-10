"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, ShieldCheck, Users, Users2, Zap, ArrowRight, Coins } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReferAndEarnPage() {
  const ladderRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".re-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      ".re-ladder-item",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: "power2.out" }
    );
  }, []);

  const referenceIncome = [
    { level: "1st Level", rate: "5.0%", tokens: "3.5% GFT", description: "Direct sponsorships enrolled under your referral node link." },
    { level: "2nd Level", rate: "3.0%", tokens: "5.5% GFT", description: "Referrals enrolled by your direct Level 1 downline affiliates." },
    { level: "3rd Level", rate: "2.0%", tokens: "6.5% GFT", description: "Referrals enrolled by your Level 2 downline affiliates." },
    { level: "4th Level", rate: "1.0%", tokens: "7.5% GFT", description: "Referrals enrolled by your Level 3 downline affiliates." },
    { level: "5th Level", rate: "0.5%", tokens: "8.0% GFT", description: "Referrals enrolled by your Level 4 downline affiliates." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10 re-title">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Team Architecture</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Refer & Earn Program</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Build your green tech community wings. Share your sponsorship link to earn multi-level INR commissions and GFT token rewards.
          </p>
        </div>
      </section>

      {/* Main Ladders */}
      <section className="py-24 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left: Ladder items (7 cols) */}
        <div ref={ladderRef} className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Referral Ladders</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Multi-Tier Level Commissions</h2>
          <p className="text-gft-deep/70 text-sm sm:text-base leading-relaxed">
            With GFT's affiliate structure, you get rewarded as your team duplicates. Enjoy level commissions on active package purchases plus extra GFT token bonuses.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            {referenceIncome.map((item, index) => (
              <div
                key={index}
                className="re-ladder-item bg-white border border-gft-gray-light p-5 rounded-2xl flex items-center justify-between shadow-sm hover:border-gft-primary/45 transition-colors group"
              >
                <div className="flex-1 pr-6">
                  <span className="text-xs font-bold text-gft-primary">{item.level}</span>
                  <p className="text-xs text-gft-deep/60 mt-1">{item.description}</p>
                </div>
                <div className="flex items-center gap-6 shrink-0 text-right">
                  <div>
                    <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">INR Payout</span>
                    <span className="text-lg font-black text-gft-deep">{item.rate}</span>
                  </div>
                  <div className="border-l border-gft-gray-light/80 pl-6">
                    <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">Token Bonus</span>
                    <span className="text-sm font-black text-gft-accent flex items-center gap-0.5"><Coins size={12}/>{item.tokens}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Genealogy Tree Visual (5 cols) */}
        <div className="lg:col-span-5 bg-[#082F2C] border border-gft-border-dark p-8 rounded-3xl relative text-white flex flex-col gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gft-primary/20 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-bold text-gft-accent flex items-center gap-2">
            <Users2 className="h-5 w-5" /> Recruitment Network Tree
          </h3>
          <p className="text-white/60 text-xs leading-relaxed">
            GFT relies on a binary-wing placement. Sponsor at least one active direct on your left wing and one active direct on your right wing to activate binary overrides.
          </p>

          {/* Tree Diagram SVG */}
          <div className="w-full flex justify-center py-4 bg-black/20 rounded-2xl border border-white/5">
            <svg className="w-64 h-48" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="100" y1="20" x2="50" y2="70" stroke="#65B300" strokeWidth="1.5" />
              <line x1="100" y1="20" x2="150" y2="70" stroke="#65B300" strokeWidth="1.5" />
              <line x1="50" y1="70" x2="25" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />
              <line x1="50" y1="70" x2="75" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />
              <line x1="150" y1="70" x2="125" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />
              <line x1="150" y1="70" x2="175" y2="120" stroke="#8CD83D" strokeWidth="1" opacity="0.6" />

              {/* Node circles */}
              <circle cx="100" cy="20" r="12" fill="#0A4D45" stroke="#65B300" strokeWidth="2.5" />
              <text x="100" y="24" fill="#fff" fontSize="9" fontWeight="black" fontFamily="sans-serif" textAnchor="middle">You</text>

              <circle cx="50" cy="70" r="10" fill="#65B300" stroke="#fff" strokeWidth="1.5" />
              <text x="50" y="73" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">L</text>

              <circle cx="150" cy="70" r="10" fill="#65B300" stroke="#fff" strokeWidth="1.5" />
              <text x="150" y="73" fill="#fff" fontSize="8" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">R</text>

              <circle cx="25" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
              <circle cx="75" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
              <circle cx="125" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
              <circle cx="175" cy="120" r="7" fill="#0A4D45" stroke="#8CD83D" strokeWidth="1.5" opacity="0.8" />
            </svg>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="bg-gft-card-dark text-white py-16 px-6 text-center border-t border-gft-border-dark relative overflow-hidden">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="inline-block px-3 py-1 bg-gft-primary/20 text-gft-accent text-[10px] font-bold rounded-full uppercase tracking-wider">
            Compulsory Directs Rule
          </span>
          <h3 className="text-xl font-black">How do I qualify for Level & Binary Commission?</h3>
          <p className="text-xs text-white/70 max-w-xl leading-relaxed">
            To unlock structural direct level commissions, your account must be active. Direct referral commissions are processed instantly within 24 hours of downline ID activation, and credit overrides settle directly to your USDT wallet balance.
          </p>
          <a
            href="/register"
            className="mt-2 bg-gft-primary hover:bg-gft-accent text-white text-xs font-bold py-3.5 px-8 rounded-full flex items-center gap-2 transition-all shadow-md"
          >
            Get Sponsorship Link <ArrowRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
