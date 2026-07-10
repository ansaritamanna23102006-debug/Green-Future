"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { Coins, ShieldCheck, Zap, RefreshCw, HelpCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GFTTokenPage() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      ".token-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const tokenFaqs = [
    { q: "What is the GFT Token?", a: "GFT (Green Future Technology) Token is the native utility asset powering the GFT sustainability ecosystem. It represents fractional claims in green tech funding outcomes and clean energy portfolios." },
    { q: "How do I earn GFT Tokens?", a: "Staking packages awards GFT tokens as an instant airdrop multiplier (up to 5x of value equivalent in tokens). You also earn team referral GFT token bonuses up to 5 levels deep." },
    { q: "What is the utility of GFT?", a: "GFT tokens can be held for long-term growth, staked for secondary APY, or converted to USDT on-demand via the member dashboard's withdrawal system." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10 token-title">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Blockchain Asset</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">GFT Utility Token</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            The power source of the GFT clean energy financing matrix, backing transparent yields and decentralized distribution shares.
          </p>
        </div>
      </section>

      {/* Token Utility Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Ecosystem Utility</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Utility-Backed Yield Ledger</h2>
          <p className="text-gft-deep/70 leading-relaxed text-sm sm:text-base">
            Every green technology staking contract triggers an instant distribution of GFT native tokens, establishing direct stake ownership in GFT's environmental funding pipelines.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            <div className="bg-white border border-gft-gray-light p-6 rounded-2xl">
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">01 / Earn</span>
              <span className="font-extrabold text-gft-primary block mt-1.5">Self Tokens</span>
              <p className="text-xs text-gft-deep/60 mt-1">Receive direct tokens on package activation.</p>
            </div>
            <div className="bg-white border border-gft-gray-light p-6 rounded-2xl">
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">02 / Build</span>
              <span className="font-extrabold text-gft-primary block mt-1.5">Team Tokens</span>
              <p className="text-xs text-gft-deep/60 mt-1">Earn downline tokens down 5 levels.</p>
            </div>
            <div className="bg-white border border-gft-gray-light p-6 rounded-2xl">
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">03 / Convert</span>
              <span className="font-extrabold text-gft-primary block mt-1.5">USDT Redeems</span>
              <p className="text-xs text-gft-deep/60 mt-1">Swap GFT tokens directly into USDT payouts.</p>
            </div>
          </div>
        </div>

        {/* Right Token Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#062F2D] to-[#031412] border border-gft-border-dark p-8 rounded-3xl text-white text-center flex flex-col items-center gap-6 shadow-2xl relative">
          <div className="w-20 h-20 rounded-full bg-gft-primary/10 border-2 border-gft-accent/40 flex items-center justify-center text-gft-accent animate-spin-slow">
            <Coins className="h-10 w-10 text-gft-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold">GFT Token Mechanics</h3>
            <span className="text-xs text-gft-accent font-semibold tracking-wide block mt-1">Staking Purchase Airdrop</span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed max-w-xs">
            Affiliate package stakes award a 5x GFT token reward relative to activation values. For example, a ₹10,000 package yields 1,200 GFT tokens automatically.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gft-light border-t border-b border-gft-gray-light">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-black text-gft-deep text-center mb-10">Token FAQ</h2>
          <div className="bg-white p-6 rounded-2xl border border-gft-gray-light flex flex-col gap-4">
            {tokenFaqs.map((faq, index) => (
              <div key={index} className="border-b border-gft-gray-light last:border-0 pb-3 last:pb-0">
                <button
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  className="w-full flex justify-between items-center text-left text-xs font-bold text-gft-deep py-2 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-gft-primary">{activeFAQ === index ? "−" : "+"}</span>
                </button>
                {activeFAQ === index && (
                  <p className="text-xs text-gft-deep/60 mt-1 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
