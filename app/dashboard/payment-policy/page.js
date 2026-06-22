"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { FileCheck, ChevronDown, ShieldCheck, Landmark, Receipt, Sparkles } from "lucide-react";

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

export default function DashboardPolicyPage() {
  const [openPolicy, setOpenPolicy] = useState("withdrawal");

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">GFT Corporate Policy</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Review GFT smart contract rules, cash caps, matching splits, and legal compliance guidelines.</p>
      </div>

      {/* Accordions Stack */}
      <div className="flex flex-col gap-4">
        {/* Withdrawal Policy */}
        <PolicyAccordion
          title="USDT Withdrawal Policy"
          icon={Landmark}
          isOpen={openPolicy === "withdrawal"}
          toggleOpen={() => setOpenPolicy(openPolicy === "withdrawal" ? null : "withdrawal")}
        >
          <p>
            Green Future Tech handles withdrawals via smart contracts using <strong>USDT TRC-20, ERC-20, or BEP-20 protocols</strong>. This guarantees instant, decentralized settlements.
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li><strong>Minimum Withdrawal:</strong> The minimum threshold for initiating a withdrawal request is <strong>₹1,500 ($20)</strong>.</li>
            <li><strong>Processing Timeline:</strong> Withdrawals are processed automatically and settle instantly (usually within 5 to 15 minutes depending on blockchain traffic).</li>
            <li><strong>Service Fees:</strong> A flat administrative fee of <strong>5%</strong> is deducted from the gross payout amount to cover smart contract gas fees and energy asset backing reserves.</li>
            <li><strong>Limits:</strong> Standard members have a daily withdrawal cap of <strong>₹80,000 ($1,000)</strong>. Ranks from Emerald and above have matching limits up to <strong>₹800,000 ($10,000)</strong> daily.</li>
          </ul>
        </PolicyAccordion>

        {/* Income Distribution */}
        <PolicyAccordion
          title="Income Distribution & Capping"
          icon={Receipt}
          isOpen={openPolicy === "distribution"}
          toggleOpen={() => setOpenPolicy(openPolicy === "distribution" ? null : "distribution")}
        >
          <p>
            Commissions are split into distinct ledger pools to maintain the platform's liquidity and green asset investment reserves.
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li><strong>Direct Referrals:</strong> A flat <strong>10%</strong> commission is awarded on all direct node package activations.</li>
            <li><strong>Binary Matching Income:</strong> Matching wing volume commissions are matches at <strong>12%</strong> on the weaker wing. The maximum binary capping per week matches the user's active package value.</li>
            <li><strong>Reinvestment Pool:</strong> <strong>10%</strong> of weekly binary income is routed to the user's Staking Reinvestment Pool, which automatically stakes back once it reaches ₹8,000 ($100), boosting their passive return yields.</li>
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
            GFT tokens represent decentralized stakes in green solar farm operations.
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li><strong>Signup & Purchase Airdrop:</strong> New affiliates receive 100 GFT on signup. Staking purchases award 5x token rewards (e.g., ₹10,000 package yields 500 GFT).</li>
            <li><strong>Staking APY:</strong> Tokens are locked in a yield contract generating up to <strong>18% APY</strong> (accrued and distributed daily).</li>
            <li><strong>Vesting & Release:</strong> To prevent token dumps, a <strong>180-day lockup</strong> is applied to rewards. Post lockup, users can transfer GFT tokens to their external Web3 wallets or trade them at prevailing platform exchange values.</li>
          </ul>
        </PolicyAccordion>

        {/* KYC Requirements */}
        <PolicyAccordion
          title="KYC Compliance Requirements"
          icon={ShieldCheck}
          isOpen={openPolicy === "kyc"}
          toggleOpen={() => setOpenPolicy(openPolicy === "kyc" ? null : "kyc")}
        >
          <p>
            To prevent fraud, multiple account setups, and strictly comply with international anti-money laundering (AML) laws, GFT mandates Identity Verification.
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li><strong>Identity Verification:</strong> Scans of national identities (e.g. Aadhaar Card, PAN Card, Passport) are mandatory.</li>
            <li><strong>Bank Verification:</strong> A canceled cheque or passbook image showing the matching account name is required to verify fiat withdrawal alternatives.</li>
            <li><strong>Restrictions:</strong> Unverified accounts are capped at a lifetime withdrawal threshold of ₹40,000 ($500). Verification checks are resolved within 24 hours of submission.</li>
          </ul>
        </PolicyAccordion>

        {/* Terms & Conditions */}
        <PolicyAccordion
          title="Code of Conduct & Ethics"
          icon={FileCheck}
          isOpen={openPolicy === "ethics"}
          toggleOpen={() => setOpenPolicy(openPolicy === "ethics" ? null : "ethics")}
        >
          <p>
            Affiliates are independent representatives and are required to promote GFT ethically and transparently.
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li><strong>No Spam/False Yield claims:</strong> Affiliates cannot guarantee speculative yields beyond official plan disclosures. Representing GFT as a guaranteed get-rich-quick scheme is grounds for node termination.</li>
            <li><strong>Single Node per Taxpayer:</strong> Setting up phantom nodes (dummy downlines using the same taxpayer ID) violates matrix integrity. GFT reserves the right to lock suspicious wings pending audit.</li>
            <li><strong>Cross-Sponsoring:</strong> Inducing active members to switch wings or register under new sponsor nodes is strictly prohibited.</li>
          </ul>
        </PolicyAccordion>
      </div>
    </div>
  );
}
