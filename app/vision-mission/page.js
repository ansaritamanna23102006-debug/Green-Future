"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ShieldCheck, Target, Heart, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

export default function VisionMissionPage() {
  const { cmsContent } = useApp();
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      ".vm-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10 vm-title">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Sustaining Tomorrow</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Vision & Mission</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Discover the core driving principles and milestones established by Green Future Tech to bring financial freedom and sustainable assets worldwide.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="py-24 max-w-6xl mx-auto px-6 w-full flex flex-col gap-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision card */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className="bg-white border-2 border-gft-primary/20 p-10 rounded-3xl flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gft-primary/10 text-gft-primary flex items-center justify-center group-hover:bg-gft-primary group-hover:text-white transition-colors duration-300">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-black text-gft-deep">Our Vision</h2>
            <p className="text-gft-deep/80 text-sm sm:text-base leading-relaxed font-normal">
              {cmsContent?.about?.vision || "To be the most trusted and reliable service provider of smart saving solutions worldwide."}
            </p>
            <div className="mt-4 text-xs font-semibold text-gft-primary flex items-center gap-1.5">
              <span>Building Decentralized Smart Saving Networks</span>
            </div>
          </div>

          {/* Mission card */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className="bg-white border-2 border-gft-primary/20 p-10 rounded-3xl flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-gft-primary/10 text-gft-primary flex items-center justify-center group-hover:bg-gft-primary group-hover:text-white transition-colors duration-300">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-black text-gft-deep">Our Mission</h2>
            <p className="text-gft-deep/80 text-sm sm:text-base leading-relaxed font-normal">
              {cmsContent?.about?.mission || "To help our clients build financial security and stability with the highest level of customer satisfaction through personal and professional service."}
            </p>
            <div className="mt-4 text-xs font-semibold text-gft-primary flex items-center gap-1.5">
              <span>Goal: 1 Lakh Financially Free Affiliates by 2030</span>
            </div>
          </div>
        </div>

        {/* Commitment details */}
        <div 
          ref={(el) => (cardRefs.current[2] = el)}
          className="bg-gft-card-dark text-white rounded-3xl p-10 md:p-12 border border-gft-border-dark flex flex-col gap-6"
        >
          <span className="text-gft-accent font-bold text-xs uppercase tracking-wider">Our Core Commitment</span>
          <h3 className="text-2xl font-black">Trust, Innovation, and Sustainability</h3>
          <p className="text-white/70 text-sm leading-relaxed max-w-3xl">
            At GFT, we believe in giving back to the planet while growing structural wealth. We stand committed to complete corporate transparency, utilizing smart contract ledgers and forex-backed investment diversification to ensure long-term stability and consistent payout delivery.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 border-t border-white/10 pt-8 text-center sm:text-left">
            <div>
              <span className="text-gft-accent font-bold text-lg">100% Secure</span>
              <p className="text-xs text-white/50 mt-1">Audit-verified smart contract parameters</p>
            </div>
            <div>
              <span className="text-gft-accent font-bold text-lg">Fintech Growth</span>
              <p className="text-xs text-white/50 mt-1">Stakes diversified in stocks & forex</p>
            </div>
            <div>
              <span className="text-gft-accent font-bold text-lg">Affiliate Care</span>
              <p className="text-xs text-white/50 mt-1">24-hour support verification turns</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
