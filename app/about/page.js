"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Server, Database, Code, CheckCircle2, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const { cmsContent } = useApp();
  const overviewRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      overviewRef.current,
      { opacity: 0, x: -35 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: overviewRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const architecturePillars = [
    {
      title: "Double-Entry Ledger",
      desc: "Every credit and debit is balanced through an immutable double-entry journal, guaranteeing mathematical consistency.",
      icon: Database,
    },
    {
      title: "Statutory KYC Compliance",
      desc: "Identity verification workflows strictly require document authentication before income or withdrawal execution.",
      icon: ShieldCheck,
    },
    {
      title: "Strict Business Gates",
      desc: "All financial calculations remain locked under authoritative backend gates until explicit corporate activation.",
      icon: Lock,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Platform Overview</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About Green Future Technology</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A digital technology platform engineered with financial safety controls, strict execution gates, and transparent ledger accounting.
          </p>
        </div>
      </section>

      {/* Corporate Overview */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={overviewRef} className="flex flex-col gap-6 opacity-0">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wide">Platform Vision</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">
            {cmsContent?.about?.heading || "Sustainable Digital Technology"}
          </h2>
          <p className="text-gft-deep/75 text-sm sm:text-base leading-relaxed font-normal">
            {cmsContent?.about?.description ||
              "Green Future Technology provides enterprise networking software, community tools, and auditable accounting systems. Our core focus is building verified, secure digital infrastructure that adheres to strict financial safety standards."}
          </p>
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Audit-First Engineering</strong>
              <span>
                All user accounts, balances, and referral trees are managed server-side. The user interface has zero financial authority and functions solely as a verified presentation layer.
              </span>
            </div>
          </div>
        </div>

        {/* Technical Architecture Overview */}
        <div className="bg-[#082F2C] border border-gft-border-dark p-8 rounded-3xl relative overflow-hidden text-white flex flex-col gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gft-primary/20 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-bold text-gft-accent flex items-center gap-2">
            <Server className="h-5 w-5" /> Verified Technical Architecture
          </h3>
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Core Ledger Model</span>
              <span className="font-bold">Double-Entry (Balanced Paisa)</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">KYC Verification Gate</span>
              <span className="font-bold">Strict Service-Level Enforcement</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Genealogy Matrix</span>
              <span className="font-bold">5-Level Unilevel & Binary Trees</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Business Plan State</span>
              <span className="font-mono text-amber-400 font-bold">Pending Client Activation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architecture Pillars */}
      <section className="py-20 bg-gft-light/50 border-t border-b border-gft-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col gap-3">
            <span className="text-gft-primary font-bold text-xs uppercase tracking-wide">Engineering Standards</span>
            <h2 className="text-3xl font-extrabold text-gft-deep">Core Architectural Principles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {architecturePillars.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white border border-gft-gray-light p-8 rounded-2xl flex flex-col gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gft-deep">{v.title}</h3>
                  <p className="text-gft-deep/60 text-xs sm:text-sm leading-relaxed font-normal">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Governance & Corporate Disclosure Notice */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col gap-4 items-center">
          <ShieldCheck className="h-10 w-10 text-gft-primary" />
          <h2 className="text-xl font-extrabold text-gft-deep">Corporate Governance & Compliance</h2>
          <p className="text-xs sm:text-sm text-gft-deep/70 max-w-xl leading-relaxed">
            Executive appointments, corporate registration certificates, legal counsel, and jurisdictional filings will be formally published upon complete regulatory clearance and live production sign-off.
          </p>
          <div className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full mt-2">
            Status: Corporate Documentation Under Client & Legal Review
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
