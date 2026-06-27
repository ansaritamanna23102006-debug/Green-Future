"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Coins,
  ChevronDown,
  Award,
  ArrowRight,
  Briefcase,
  Zap,
  CheckCircle2,
  Users2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroCanvas from "@/components/HeroCanvas";

gsap.registerPlugin(ScrollTrigger);


// Count Up Component using GSAP
function CountUp({ end, duration = 1.5, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ val: 0 });

  useEffect(() => {
    const endVal = parseFloat(end.toString().replace(/,/g, ""));
    gsap.to(countRef.current, {
      val: endVal,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        setCount(countRef.current.val);
      }
    });
  }, [end, duration]);

  const formatted = Math.round(count).toLocaleString(undefined, {
    maximumFractionDigits: 0
  });

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

// FAQ Accordion Card (Uses GSAP Height Tween)
function FAQItem({ question, answer, isOpen, toggleOpen }) {
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
    <div className="border-b border-gft-gray-light dark:border-gft-border-dark py-4">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
      >
        <span className="text-[17px] font-semibold text-gft-deep hover:text-gft-primary transition-colors">
          {question}
        </span>
        <div ref={chevronRef}>
          <ChevronDown className="h-5 w-5 text-gft-primary" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="text-[15px] leading-relaxed text-gft-deep/70 pt-2 pb-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const cardsRef = useRef([]);
  const roadmapStepsRef = useRef([]);
  const testimonialContainerRef = useRef(null);

  const stats = [
    { label: "Active Members", value: 124800, suffix: "+", icon: Users2 },
    { label: "Total Payout", value: 34500000, prefix: "$", suffix: "+", icon: TrendingUp },
    { label: "Team Growth Rate", value: 145, suffix: "% MoM", icon: Award },
    { label: "GFT Token Distribution", value: 5800000, suffix: " GFT", icon: Coins },
  ];

  const opportunityCards = [
    {
      title: "Direct Income",
      description: "Earn 10% instant commission on package activations purchased directly through your sponsor link.",
      benefit: "10% Flat Rate",
      icon: Briefcase,
      color: "from-emerald-500/10 to-teal-500/10"
    },
    {
      title: "Team Binary Income",
      description: "Build left/right network wings and qualify for a 12% team volume matching bonus paid out weekly.",
      benefit: "12% Binary Match",
      icon: Users,
      color: "from-green-500/10 to-emerald-600/10"
    },
    {
      title: "Rank Bonus Pool",
      description: "Secure a share of GFT's global leadership turnover pool. Ranks from Emerald to Crown Ambassador.",
      benefit: "Up to 5% Global Pool",
      icon: ShieldCheck,
      color: "from-teal-600/10 to-gft-dark/10"
    },
    {
      title: "Token Staking Rewards",
      description: "Stake GFT native tokens to earn up to 18% APY, boosting passive yield as the community network grows.",
      benefit: "18% Max APY",
      icon: Coins,
      color: "from-gft-primary/10 to-gft-accent/10"
    }
  ];

  const roadmapSteps = [
    { step: "01", title: "Free Registration", desc: "Sign up via sponsor link and establish your node in the global hierarchy." },
    { step: "02", title: "Choose Package", desc: "Select an eco-tech package ranging from ₹3,000 up to ₹1,00,000 to unlock yields." },
    { step: "03", title: "Build Your Team", desc: "Leverage GFT's automated placement engine to register downlines and match wings." },
    { step: "04", title: "Earn Incomes", desc: "Receive direct, matching, and ranking pool bonuses directly to your USDT wallet." },
    { step: "05", title: "Earn GFT Tokens", desc: "Unlock native blockchain tokens, redeemable for green energy stakes and governance." },
  ];

  const testimonials = [
    {
      quote: "GFT completely reshaped my perspective on MLM. The digital tokens offer actual utility in renewable energy projects, and the dashboard is incredibly clean. I reached Diamond rank in under 6 months!",
      author: "Rajesh K. Verma",
      role: "Diamond Director, India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "The instant USDT withdrawal policy is a game-changer. I don't have to wait weeks for administrative approvals. Highly recommend Green Future Tech to any serious team builder.",
      author: "Samantha Miller",
      role: "Emerald Manager, South Africa",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
    },
    {
      quote: "Using the GFT tokens to claim stakes in carbon offset protocols is highly innovative. This platform bridges green tech and community networking beautifully.",
      author: "Hiroshi Sato",
      role: "Platinum Director, Japan",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ];

  const faqs = [
    { q: "What is Green Future Tech?", a: "Green Future Tech (GFT) is a premium network marketing platform that leverages digital financing, blockchain tokens, and referral compensation architectures to fund green technology products and carbon offset initiatives." },
    { q: "How do I qualify for team binary payouts?", a: "To qualify for binary matching bonuses, you need to sponsor at least one active member in your Left Wing and one active member in your Right Wing, with active packages of ₹3,000 or more." },
    { q: "What are GFT Tokens used for?", a: "GFT tokens represent shares of green energy production assets within the ecosystem. Members can stake them for yield, convert them to USDT at exchange values, or use them to claim carbon offset certificates." },
    { q: "How fast are withdrawal requests processed?", a: "USDT withdrawals are automated via smart contracts and processed instantly (usually within 5-15 minutes depending on network confirmations)." },
    { q: "Is KYC verification mandatory?", a: "Yes. In compliance with international anti-money laundering (AML) laws, KYC verification (Aadhaar/PAN/Identity proof) must be approved before initiating USDT withdrawals exceeding ₹40,000." }
  ];

  // GSAP Animations on mount
  useEffect(() => {
    // Hero content entrance
    gsap.fromTo(
      heroLeftRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
    );

    gsap.fromTo(
      heroRightRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
    );

    // Floating animation on Right side mockups
    gsap.to(heroRightRef.current, {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Scroll trigger for Opportunity Cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#opportunity",
          start: "top 80%"
        }
      }
    );

    // Scroll trigger for Roadmap steps
    roadmapStepsRef.current.forEach((step, sIdx) => {
      const isEven = sIdx % 2 === 0;
      gsap.fromTo(
        step,
        { opacity: 0, x: isEven ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%"
          }
        }
      );
    });
  }, []);

  // Handle slide testimonial transition
  const handleTestimonialChange = (newIdx) => {
    gsap.to(testimonialContainerRef.current, {
      opacity: 0,
      y: -15,
      duration: 0.25,
      onComplete: () => {
        setActiveTestimonial(newIdx);
        gsap.fromTo(
          testimonialContainerRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
          <Navbar />

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center pt-24 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
            {/* 3D WebGL Globe & Particle Shell Background */}
            <HeroCanvas />

            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gft-primary/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gft-accent/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Hero Left Content */}
              <div ref={heroLeftRef} className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gft-accent text-[13px] font-bold tracking-wider uppercase backdrop-blur-sm">
                  <Zap className="h-4 w-4 fill-gft-accent text-gft-accent animate-pulse" /> Next-Gen Network Marketing Platform
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                  Building Wealth Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-gft-primary to-gft-accent">Technology</span> & Community
                </h1>

                <p className="text-lg sm:text-xl text-white/80 max-w-xl font-normal leading-relaxed">
                  Join Green Future Tech and unlock opportunities through smart networking, digital assets, and team growth.
                </p>

                <div className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto text-center bg-gft-primary hover:bg-gft-accent text-white text-[15px] font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-gft-primary/25 hover:shadow-gft-accent/25 hover:-translate-y-0.5"
                  >
                    Join Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="w-full sm:w-auto text-center bg-white/5 hover:bg-white/10 border border-white/15 text-white text-[15px] font-bold px-8 py-4 rounded-full transition-all backdrop-blur-sm flex justify-center items-center"
                  >
                    Member Login
                  </Link>
                </div>

                {/* Quick trust metrics */}
                <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-white/10 w-full max-w-lg">
                  <div>
                    <h4 className="text-xl font-bold text-gft-accent">100%</h4>
                    <p className="text-white/60 text-xs">Automated Payouts</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gft-accent">Secured</h4>
                    <p className="text-white/60 text-xs">USDT Contracts</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gft-accent">24/7</h4>
                    <p className="text-white/60 text-xs">Direct Support</p>
                  </div>
                </div>
              </div>

              {/* Hero Right Graphic */}
              <div ref={heroRightRef} className="lg:col-span-5 flex justify-center items-center relative">
                {/* 3D Fintech/Network SVG Graphic */}
                <div className="relative w-full max-w-[450px] aspect-square">
                  <svg className="w-full h-full drop-shadow-[0_15px_40px_rgba(101,179,0,0.25)]" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="250" cy="250" r="220" stroke="#0A4D45" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
                    <circle cx="250" cy="250" r="170" stroke="#65B300" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                    <circle cx="250" cy="250" r="110" stroke="#8CD83D" strokeWidth="2" opacity="0.15" />

                    <line x1="250" y1="80" x2="130" y2="190" stroke="#65B300" strokeWidth="1.5" opacity="0.5" />
                    <line x1="250" y1="80" x2="370" y2="190" stroke="#65B300" strokeWidth="1.5" opacity="0.5" />
                    <line x1="130" y1="190" x2="130" y2="330" stroke="#65B300" strokeWidth="1.5" opacity="0.5" />
                    <line x1="370" y1="190" x2="370" y2="330" stroke="#65B300" strokeWidth="1.5" opacity="0.5" />
                    <line x1="130" y1="330" x2="250" y2="420" stroke="#65B300" strokeWidth="1.5" opacity="0.5" />
                    <line x1="370" y1="330" x2="250" y2="420" stroke="#65B300" strokeWidth="1.5" opacity="0.5" />
                    <line x1="250" y1="80" x2="250" y2="250" stroke="#8CD83D" strokeWidth="2" />
                    <line x1="130" y1="190" x2="250" y2="250" stroke="#8CD83D" strokeWidth="1" opacity="0.5" />
                    <line x1="370" y1="190" x2="250" y2="250" stroke="#8CD83D" strokeWidth="1" opacity="0.5" />
                    <line x1="130" y1="330" x2="250" y2="250" stroke="#8CD83D" strokeWidth="1" opacity="0.5" />
                    <line x1="370" y1="330" x2="250" y2="250" stroke="#8CD83D" strokeWidth="1" opacity="0.5" />

                    <defs>
                      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8CD83D" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#8CD83D" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    <circle cx="250" cy="80" r="30" fill="url(#glow)" opacity="0.5" />
                    <circle cx="250" cy="250" r="50" fill="url(#glow)" opacity="0.3" />

                    <rect x="215" y="215" width="70" height="70" rx="35" fill="#0A4D45" stroke="#65B300" strokeWidth="4" />
                    <path d="M250 230L265 245H235L250 230Z" fill="#8CD83D" />
                    <rect x="240" y="250" width="20" height="20" rx="3" fill="#65B300" />

                    <circle cx="250" cy="80" r="14" fill="#65B300" stroke="#FFFFFF" strokeWidth="3" />
                    <circle cx="130" cy="190" r="10" fill="#0A4D45" stroke="#8CD83D" strokeWidth="2.5" />
                    <circle cx="370" cy="190" r="10" fill="#0A4D45" stroke="#8CD83D" strokeWidth="2.5" />
                    <circle cx="130" cy="330" r="12" fill="#65B300" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="370" cy="330" r="12" fill="#65B300" stroke="#FFFFFF" strokeWidth="2.5" />
                    <circle cx="250" cy="420" r="14" fill="#0A4D45" stroke="#8CD83D" strokeWidth="3" />

                    <g opacity="0.85">
                      <rect x="300" y="280" width="120" height="70" rx="10" fill="#082F2C" stroke="#104C48" strokeWidth="1" />
                      <path d="M315 330L335 315L355 325L395 295" stroke="#8CD83D" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="395" cy="295" r="3" fill="#8CD83D" />
                      <text x="315" y="303" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">USDT Yield</text>
                      <text x="315" y="340" fill="#8CD83D" fontSize="8" fontFamily="sans-serif">+145%</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* About Company Section */}
          <section id="about" className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
                <span className="text-gft-primary font-bold text-sm tracking-wider uppercase">Our Foundation</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gft-deep">
                  Fusing Green Innovation with Network Architecture
                </h2>
                <p className="text-gft-deep/75 text-[16px] leading-relaxed">
                  Green Future Tech empowers developers and stakeholders globally. We fund actual renewable assets through direct distribution structures, creating transparent yields for our affiliate network.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Vision Card */}
                <div className="bg-gft-light/50 border border-gft-gray-light p-8 rounded-2xl flex flex-col gap-5 hover:border-gft-primary/45 hover:-translate-y-2 duration-300 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gft-primary/10 flex items-center justify-center text-gft-primary group-hover:bg-gft-primary group-hover:text-white transition-colors duration-300">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gft-deep">Our Vision</h3>
                  <p className="text-gft-deep/70 text-[14px] leading-relaxed">
                    To build a carbon-neutral digital ecosystem where energy production stakes are decentralized and network members share direct technology growth pools.
                  </p>
                </div>

                {/* Mission Card */}
                <div className="bg-gft-light/50 border border-gft-gray-light p-8 rounded-2xl flex flex-col gap-5 hover:border-gft-primary/45 hover:-translate-y-2 duration-300 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gft-primary/10 flex items-center justify-center text-gft-primary group-hover:bg-gft-primary group-hover:text-white transition-colors duration-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gft-deep">Our Mission</h3>
                  <p className="text-gft-deep/70 text-[14px] leading-relaxed">
                    Empowering communities with a high-fidelity affiliate matrix that guarantees transparent yield reporting, KYC security, and instant global USDT settlement.
                  </p>
                </div>

                {/* Why GFT Card */}
                <div className="bg-gft-light/50 border border-gft-gray-light p-8 rounded-2xl flex flex-col gap-5 hover:border-gft-primary/45 hover:-translate-y-2 duration-300 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gft-primary/10 flex items-center justify-center text-gft-primary group-hover:bg-gft-primary group-hover:text-white transition-colors duration-300">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gft-deep">Why Choose GFT</h3>
                  <p className="text-gft-deep/70 text-[14px] leading-relaxed">
                    Unlike traditional MLM schemes, GFT yields are backed by real solar farms and wind assets, generating concrete yields that power token values.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Opportunity Section */}
          <section id="opportunity" className="py-24 bg-gft-light relative">
            <div className="absolute top-1/2 left-0 w-80 h-80 bg-gft-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
                <span className="text-gft-primary font-bold text-sm tracking-wider uppercase">Affiliate Plan</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gft-deep">
                  Unrivaled Compensation Architecture
                </h2>
                <p className="text-gft-deep/75 text-[16px]">
                  GFT offers four powerful income pipelines, structured to reward direct sponsors, network team builders, and long-term token holders.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {opportunityCards.map((card, idx) => (
                  <div
                    key={idx}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className="bg-white/80 border border-white/60 p-6 rounded-2xl flex flex-col justify-between h-[300px] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group shadow-sm"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />

                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gft-dark/10 flex items-center justify-center text-gft-dark">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gft-deep">{card.title}</h3>
                      <p className="text-gft-deep/70 text-[13px] leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-gft-deep/5 flex justify-between items-center">
                      <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/45">Yield Rate</span>
                      <span className="text-sm font-extrabold text-gft-primary">{card.benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Growth Roadmap Section */}
          <section id="roadmap" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col gap-4">
                <span className="text-gft-primary font-bold text-sm tracking-wider uppercase">Your Journey</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gft-deep">
                  Step-by-Step Growth Roadmap
                </h2>
                <p className="text-gft-deep/75 text-[16px]">
                  We facilitate seamless entry. Follow our linear acceleration path to unlock direct affiliate payouts and passive clean energy yields.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gft-primary/20 -translate-x-1/2" />

                <div className="flex flex-col gap-12">
                  {roadmapSteps.map((step, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={idx} className={`flex flex-col lg:flex-row items-start ${isEven ? "" : "lg:flex-row-reverse"} relative`}>
                        {/* Node Dot */}
                        <div className="absolute left-8 lg:left-1/2 w-8 h-8 rounded-full bg-white border-4 border-gft-primary shadow-md -translate-x-1/2 flex items-center justify-center z-10">
                          <div className="w-2 h-2 rounded-full bg-gft-primary" />
                        </div>

                        {/* Content Box */}
                        <div className={`w-full lg:w-1/2 pl-16 lg:pl-0 ${isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}>
                          <div
                            ref={(el) => (roadmapStepsRef.current[idx] = el)}
                            className="bg-gft-light/50 border border-gft-gray-light p-6 rounded-2xl inline-block max-w-md shadow-sm"
                          >
                            <span className="text-3xl font-extrabold text-gft-primary/20 block mb-1">{step.step}</span>
                            <h3 className="text-lg font-bold text-gft-deep mb-2">{step.title}</h3>
                            <p className="text-gft-deep/70 text-[13.5px] leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Income Benefits Statistics (Counters) */}
          <section className="py-20 bg-gft-dark text-white relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm relative group hover:border-gft-primary transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gft-primary/10 flex items-center justify-center text-gft-accent mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-extrabold tracking-tight mb-2 text-white">
                      <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </h3>
                    <p className="text-white/60 text-sm font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
                <span className="text-gft-primary font-bold text-sm tracking-wider uppercase">User Success</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gft-deep">
                  Trusted by 100K+ Active Affiliates
                </h2>
              </div>

              <div className="max-w-4xl mx-auto relative px-8">
                <div
                  ref={testimonialContainerRef}
                  className="bg-gft-light/50 border border-gft-gray-light p-10 sm:p-12 rounded-3xl relative text-center flex flex-col items-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gft-primary">
                    <img
                      src={testimonials[activeTestimonial].image}
                      alt={testimonials[activeTestimonial].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gft-deep/80 text-lg sm:text-xl italic font-normal leading-relaxed">
                    &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                  </p>
                  <div>
                    <h4 className="text-[17px] font-bold text-gft-deep">
                      {testimonials[activeTestimonial].author}
                    </h4>
                    <p className="text-gft-primary text-xs font-semibold uppercase tracking-wider mt-1">
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() =>
                      handleTestimonialChange(activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1)
                    }
                    className="w-12 h-12 rounded-full border border-gft-gray-light flex items-center justify-center text-gft-deep hover:bg-gft-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      handleTestimonialChange(activeTestimonial === testimonials.length - 1 ? 0 : activeTestimonial + 1)
                    }
                    className="w-12 h-12 rounded-full border border-gft-gray-light flex items-center justify-center text-gft-deep hover:bg-gft-primary hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24 bg-gft-light relative">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16 flex flex-col gap-4">
                <span className="text-gft-primary font-bold text-sm tracking-wider uppercase">Questions & Answers</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gft-deep">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gft-gray-light shadow-sm flex flex-col gap-2">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={activeFAQ === index}
                    toggleOpen={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-gft-dark to-gft-deep text-white relative text-center">
            <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Claim Your Digital Carbon Stakes?</h2>
              <p className="text-white/70 max-w-lg leading-relaxed text-[15px]">
                Sign up today to receive 100 GFT signup bonus tokens and start building your sustainable binary network wings.
              </p>
              <Link
                href="/register"
                className="bg-gft-primary hover:bg-gft-accent text-white font-bold text-[15px] px-10 py-4 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                Create Your Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <Footer />
        </div>
  );
}
