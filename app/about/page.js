"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Users, Leaf, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
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
          start: "top 80%"
        }
      }
    );
  }, []);

  const values = [
    { title: "Eco-First Technology", desc: "We fund, operate, and build concrete solar and wind energy production networks globally.", icon: Leaf },
    { title: "Transparency Protocol", desc: "Staking yields and energy outputs are recorded transparently via blockchain tokens.", icon: ShieldCheck },
    { title: "Community Decentralization", desc: "Referral structures reward organic affiliate builders who help bootstrap global green asset stakes.", icon: Users },
  ];

  const leadership = [
    { name: "Devendra P. Rao", role: "Founder & Managing Director", desc: "Fintech veteran with 20+ years of compensation architecture design and venture funding.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Elena Rostova", role: "Chief Networking Officer", desc: "Global organizational builder who has scaled multiple direct sales networks over 100K members.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" },
    { name: "Dr. Hiroshi Sato", role: "VP of Renewable Infrastructure", desc: "Former lead researcher at Japan Eco-Energy Lab, overseeing solar farm smart-grid deployments.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Pioneering Eco-Fintech</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Our Mission & Identity</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Green Future Tech bridges decentralized financial networking with real-world renewable energy assets to power carbon-neutral wealth networks.
          </p>
        </div>
      </section>

      {/* Corporate Overview */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div
          ref={overviewRef}
          className="flex flex-col gap-6 opacity-0"
        >
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wide">Corporate Overview</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Who is Green Future Tech?</h2>
          <p className="text-gft-deep/75 text-sm sm:text-base leading-relaxed font-normal">
            Founded in 2025, Green Future Tech (GFT) was created to address a primary challenge in traditional network marketing: the lack of physical asset backing. We construct utility-scale solar arrays and wind turbines. 
          </p>
          <p className="text-gft-deep/75 text-sm sm:text-base leading-relaxed font-normal">
            By purchasing GFT eco-packages, members directly acquire fractional stakes in energy outputs, generating daily rewards and native GFT blockchain tokens while supporting global carbon offset credits.
          </p>
        </div>

        {/* Floating vector graph */}
        <div className="bg-[#082F2C] border border-gft-border-dark p-8 rounded-3xl relative overflow-hidden text-white flex flex-col gap-6">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gft-primary/20 rounded-full blur-2xl pointer-events-none" />
          <h3 className="text-lg font-bold text-gft-accent flex items-center gap-2">
            <Cpu className="h-5 w-5" /> Renewable Energy Generation Grid
          </h3>
          <div className="flex flex-col gap-4 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Staked Solar Farms</span>
              <span className="font-bold">14 MegaWatts active</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Wind Turbine Assets</span>
              <span className="font-bold">6 Turbine Nodes active</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-white/50">Total Carbon Offset</span>
              <span className="font-bold">42,800 Tons CO2 e</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/50">Smart Contract Ledger</span>
              <span className="font-mono text-gft-primary font-bold">Audited & Locked</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gft-light/50 border-t border-b border-gft-gray-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-gft-primary font-bold text-xs uppercase tracking-wide">Our Values</span>
            <h2 className="text-3xl font-extrabold text-gft-deep">Powered by Sustainability</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white border border-gft-gray-light p-8 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
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

      {/* Executive Board */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-gft-primary font-bold text-xs uppercase tracking-wide">Executive Board</span>
          <h2 className="text-3xl font-extrabold text-gft-deep">Leadership & Governance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((l, i) => (
            <div key={i} className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm text-center flex flex-col items-center gap-4">
              <img src={l.image} alt={l.name} className="w-20 h-20 rounded-full object-cover border-2 border-gft-primary animate-pulse" />
              <div>
                <h3 className="font-bold text-gft-deep">{l.name}</h3>
                <span className="text-xs text-gft-primary font-semibold block mt-0.5">{l.role}</span>
              </div>
              <p className="text-gft-deep/60 text-xs leading-relaxed max-w-xs font-normal">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
