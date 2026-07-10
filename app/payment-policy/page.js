"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FileCheck, ChevronDown, ShieldCheck, Landmark, Receipt, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function PolicyAccordion({ title, icon: Icon, children, isOpen, toggleOpen }) {
  const contentRef = useRef(null);
  const chevronRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(chevronRef.current, { rotate: 180, duration: 0.2 });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(chevronRef.current, { rotate: 0, duration: 0.2 });
    }
  }, [isOpen]);

  return (
    <div className="border border-gft-gray-light bg-white rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center text-left p-5 focus:outline-none bg-white hover:bg-gft-light/35 transition-colors select-none cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gft-light flex items-center justify-center text-gft-dark">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-sm sm:text-base font-bold text-gft-deep">
            {title}
          </span>
        </div>
        <div ref={chevronRef}>
          <ChevronDown className="h-5 w-5 text-gft-primary" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden border-t border-gft-gray-light"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="p-6 text-xs sm:text-sm text-gft-deep/80 leading-relaxed bg-white flex flex-col gap-4 text-justify font-normal">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function PublicPolicyPage() {
  const [openPolicy, setOpenPolicy] = useState("terms");

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Compliance Desk</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Payment & Terms Policy</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Official guidelines governing investment timelines, withdrawal schedules, and dynamic referral terms.
          </p>
        </div>
      </section>

      {/* Accordions Stack */}
      <section className="py-24 max-w-4xl mx-auto px-6 w-full flex flex-col gap-4">
        {/* Core Terms */}
        <PolicyAccordion
          title="Company Terms & Conditions"
          icon={Landmark}
          isOpen={openPolicy === "terms"}
          toggleOpen={() => setOpenPolicy(openPolicy === "terms" ? null : "terms")}
        >
          <p>
            Welcome to Green Future Tech. By registering and activating a package, you agree to comply with the following operational rules:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2.5">
            <li><strong>Mandatory Verification Documents:</strong> National identity proof (Aadhaar Card, PAN Card) and your own personal bank account coordinates are required to qualify for payouts.</li>
            <li><strong>Account Closing Cycle:</strong> Closing is conducted from the <strong>1st to the 30th of every month</strong>.</li>
            <li><strong>Capital Lockup:</strong> Once an investment is activated, the stake is locked for exactly <strong>1 year (12 months)</strong>. No early withdrawals or principal redemptions are allowed under any circumstances.</li>
            <li><strong>Market Risk Notice:</strong> There is a possibility of short-term losses due to market movement in the stock and forex markets. In such cases, GFT advises members to remain calm and wait for market recovery.</li>
          </ul>
        </PolicyAccordion>

        {/* Withdrawal & Income Timelines */}
        <PolicyAccordion
          title="Income Payout & Withdrawal Timelines"
          icon={Receipt}
          isOpen={openPolicy === "timelines"}
          toggleOpen={() => setOpenPolicy(openPolicy === "timelines" ? null : "timelines")}
        >
          <p>
            GFT distributes different income categories on dedicated dates to ensure stability and smooth transaction processing:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2.5">
            <li><strong>Self Income:</strong> Disbursed monthly on the <strong>1st, 11th, and 21st</strong>.</li>
            <li><strong>Reference Level Income:</strong> Disbursed instantly within <strong>24 hours</strong> of a downline ID activation.</li>
            <li><strong>Turnover & Designation Income:</strong> Calculated monthly and given to leaders on the <strong>5th of every month</strong>.</li>
            <li><strong>Passive Income:</strong> Settled and disbursed on the <strong>7th of every month</strong>.</li>
            <li><strong>Minimum Withdrawal:</strong> Standard withdraw minimum is ₹500 (or $10 equivalent).</li>
          </ul>
        </PolicyAccordion>

        {/* Token Staking Policy */}
        <PolicyAccordion
          title="GFT Token Protocol & Staking APY"
          icon={Sparkles}
          isOpen={openPolicy === "token"}
          toggleOpen={() => setOpenPolicy(openPolicy === "token" ? null : "token")}
        >
          <p>
            GFT tokens represent clean energy allocations and decentralized yield stakes:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2.5">
            <li><strong>Signup & Airdrop:</strong> New affiliates receive 100 GFT on signup. Active package purchases award up to 5x token rewards (e.g. ₹10,000 package yields 1,200 GFT).</li>
            <li><strong>APY Yield:</strong> Tokens held in the wallet generate automated yield rewards, which are added directly to the total token balance.</li>
            <li><strong>Lockup Term:</strong> Staking rewards are locked for a standard term of 12 months, synced with your eco-package duration.</li>
          </ul>
        </PolicyAccordion>
      </section>

      <Footer />
    </div>
  );
}
