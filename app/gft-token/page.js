"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { Coins, ShieldCheck, Clock, Info, HelpCircle } from "lucide-react";
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
    {
      q: "What is the GFT Token status?",
      a: "GFT Token utility, exchange mechanisms, and ledger accounting are currently under client confirmation. Token distribution rules will be formally published upon corporate activation.",
    },
    {
      q: "Are token transfers or conversions active?",
      a: "Token utility and transfer rules are pending final confirmation. No live on-chain transfers, external liquidity pools, or fiat swaps are permitted until client sign-off.",
    },
    {
      q: "How will token balances be determined?",
      a: "All token balances and rewards will be computed and authorized strictly by authoritative backend ledger services.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10 token-title">
          <div className="inline-flex items-center gap-2 self-center bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide">
            <Clock size={13} />
            <span>Specification Phase</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">GFT Digital Asset Architecture</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Platform architecture for the GFT utility token. Features and exchange rules are subject to final verification.
          </p>
        </div>
      </section>

      {/* Mandatory Governance Alert */}
      <div className="bg-amber-50 border-b border-amber-200 py-3.5 px-6 text-center text-xs text-amber-900 font-medium">
        <span className="font-bold">Authoritative Notice:</span> Token utility and transfer rules are pending final confirmation. Token conversion, USDT swaps, and transfer capabilities are not active in production.
      </div>

      {/* Architecture & Utility Status Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wider">Asset Lifecycle</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Planned Token Framework</h2>
          <p className="text-gft-deep/70 leading-relaxed text-sm sm:text-base">
            The GFT Token framework is planned as an internal accounting utility to complement the double-entry financial ledger. Parameters regarding allocations, vesting periods, and transfer mechanics remain under client review.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
            <div className="bg-white border border-gft-gray-light p-5 rounded-2xl">
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">01 / Accounting</span>
              <span className="font-bold text-gft-deep block mt-1">Internal Ledger</span>
              <p className="text-xs text-gft-deep/60 mt-1">Managed via backend balance states.</p>
            </div>
            <div className="bg-white border border-gft-gray-light p-5 rounded-2xl">
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">02 / Governance</span>
              <span className="font-bold text-gft-deep block mt-1">Rule Confirmation</span>
              <p className="text-xs text-gft-deep/60 mt-1">Gated under Phase 0 policy rules.</p>
            </div>
            <div className="bg-white border border-gft-gray-light p-5 rounded-2xl">
              <span className="text-[10px] text-gft-deep/45 uppercase font-bold block">03 / Utility</span>
              <span className="font-bold text-gft-deep block mt-1">Pending Rules</span>
              <p className="text-xs text-gft-deep/60 mt-1">Rules pending final confirmation.</p>
            </div>
          </div>
        </div>

        {/* Right Status Card */}
        <div className="lg:col-span-5 bg-[#062F2D] border border-gft-border-dark p-8 rounded-3xl text-white text-center flex flex-col items-center gap-5 shadow-xl relative">
          <div className="w-16 h-16 rounded-full bg-gft-primary/20 border border-gft-accent/40 flex items-center justify-center text-gft-accent">
            <Coins className="h-8 w-8 text-gft-accent" />
          </div>
          <div>
            <h3 className="text-xl font-bold">GFT Token Status</h3>
            <span className="text-xs text-amber-300 font-semibold tracking-wide block mt-1">
              Pending Final Confirmation
            </span>
          </div>
          <p className="text-white/70 text-xs leading-relaxed max-w-xs">
            Token utility and transfer rules are pending final confirmation. Live swaps, liquidity, and token payouts will only become active after client and legal approval.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gft-light border-t border-gft-gray-light">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-black text-gft-deep text-center mb-8">Token Architecture FAQ</h2>
          <div className="bg-white p-6 rounded-2xl border border-gft-gray-light flex flex-col gap-4 shadow-sm">
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
