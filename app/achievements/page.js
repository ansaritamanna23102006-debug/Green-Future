"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award, Target, Trophy, Sparkles, Zap, ShieldAlert, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const achievementsData = [
  {
    rank: "Silver",
    class: "rank-silver",
    turnover: "₹1,00,000",
    poolPercent: "1%",
    income: "₹10,000/mo",
    benefits: "Executive Forum Access, Monthly State Webinars",
    rewards: "Silver Sponsor Pin, GFT Executive Organizer",
    icon: Award,
    description: "Your gateway into GFT leadership. Earn structural matching pools."
  },
  {
    rank: "Gold",
    class: "rank-gold",
    turnover: "₹3,00,000",
    poolPercent: "2%",
    income: "₹25,000/mo",
    benefits: "VIP Seating at GFT Summit, Monthly Leadership Workshops",
    rewards: "Fossil Hybrid Smartwatch, Gold Lapel Badge",
    icon: Award,
    description: "The primary growth anchor. Anchors a solid passive downline."
  },
  {
    rank: "Emerald",
    class: "rank-emerald",
    turnover: "₹10,00,000",
    poolPercent: "3%",
    income: "₹80,000/mo",
    benefits: "Advisory Council Invite, Semi-Annual Regional Retreats",
    rewards: "Emerald Ring, Domestic Flight Getaway Package",
    icon: Star,
    description: "Crystalized leadership. Emerald status opens regional pooling shares."
  },
  {
    rank: "Platinum",
    class: "rank-platinum",
    turnover: "₹25,00,000",
    poolPercent: "4%",
    income: "₹2,00,000/mo",
    benefits: "Global Mastermind Forums, Priority Helpdesk Channels",
    rewards: "Apple iPad Air, Platinum Custom Plaque",
    icon: Target,
    description: "Elite performer. Command neon levels of matching returns and pools."
  },
  {
    rank: "Diamond",
    class: "rank-diamond",
    turnover: "₹1,00,00,000",
    poolPercent: "5%",
    income: "₹7,50,000/mo",
    benefits: "Boardroom Invites, Shareholder Dinner Gala, VIP Flights",
    rewards: "Yamaha R15 Sport Bike, Diamond-Studded Cufflinks",
    icon: Sparkles,
    description: "Pure performance. Sparkle with top equity shares in renewable grids."
  },
  {
    rank: "Ruby",
    class: "rank-ruby",
    turnover: "₹2,50,00,000",
    poolPercent: "6%",
    income: "₹18,00,000/mo",
    benefits: "Board Advisory Board Seat, First-Class Global Travel",
    rewards: "Ruby-Studded Gold Watch, Luxury Dubai Getaway Tour",
    icon: Trophy,
    description: "Prestigious status. Commands a massive global wing distribution network."
  },
  {
    rank: "Chairman",
    class: "rank-chairman",
    turnover: "₹10,00,00,000",
    poolPercent: "7%",
    income: "₹65,00,000/mo",
    benefits: "Fully Funded Premium Corporate Office, Lifetime Equity",
    rewards: "GFT Chairman Trophy, Mercedes-Benz E-Class Sedan",
    icon: Trophy,
    description: "The peak of network marketing. Sits at the apex of Green Future Tech equity."
  }
];

export default function AchievementsPage() {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo(
        ".ach-title",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Embedded CSS Shaders/Styles for Luxury styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Silver: Metallic Chrome */
        .rank-silver {
          background: linear-gradient(135deg, #1b262c 0%, #062f2d 100%);
          border: 2px solid #8e9eab;
          box-shadow: 0 0 15px rgba(142, 158, 171, 0.15);
        }
        .rank-silver .rank-badge {
          background: linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%);
          color: #1b262c;
        }

        /* Gold: Reflection Sweep */
        .rank-gold {
          background: linear-gradient(135deg, #161e12 0%, #062d2a 100%);
          border: 2px solid #d4af37;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.25);
          position: relative;
          overflow: hidden;
        }
        .rank-gold::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: rgba(255, 255, 255, 0.13);
          transform: rotate(30deg);
          animation: sweep 4s infinite ease-in-out;
        }
        @keyframes sweep {
          0% { left: -60%; }
          30% { left: 140%; }
          100% { left: 140%; }
        }
        .rank-gold .rank-badge {
          background: linear-gradient(135deg, #fceabb 0%, #f8b500 100%);
          color: #062d2a;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.4);
        }

        /* Emerald: Green Crystal */
        .rank-emerald {
          background: linear-gradient(135deg, #021a18 0%, #054038 100%);
          border: 2px solid #65b300;
          box-shadow: 0 0 20px rgba(101, 179, 0, 0.35);
        }
        .rank-emerald .rank-badge {
          background: linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%);
          color: #021a18;
          box-shadow: 0 0 12px rgba(101, 179, 0, 0.5);
        }

        /* Platinum: Neon Blue Glow */
        .rank-platinum {
          background: linear-gradient(135deg, #091a27 0%, #062f2d 100%);
          border: 2px solid #00d2ff;
          box-shadow: 0 0 25px rgba(0, 210, 255, 0.4);
        }
        .rank-platinum .rank-badge {
          background: linear-gradient(135deg, #00d2ff 0%, #0072ff 100%);
          color: #fff;
          box-shadow: 0 0 12px rgba(0, 210, 255, 0.5);
        }

        /* Diamond: Sparkles */
        .rank-diamond {
          background: linear-gradient(135deg, #13222a 0%, #062f2d 100%);
          border: 2px solid #e0f7fa;
          box-shadow: 0 0 30px rgba(224, 247, 250, 0.5);
          position: relative;
        }
        .rank-diamond::after {
          content: '✦';
          position: absolute;
          top: 15px;
          right: 20px;
          color: #fff;
          font-size: 14px;
          text-shadow: 0 0 8px rgba(255,255,255,0.8);
          animation: sparkle 2.5s infinite alternate ease-in-out;
        }
        .rank-diamond::before {
          content: '✦';
          position: absolute;
          bottom: 25px;
          left: 20px;
          color: #fff;
          font-size: 10px;
          text-shadow: 0 0 6px rgba(255,255,255,0.8);
          animation: sparkle 2s infinite alternate-reverse ease-in-out;
        }
        @keyframes sparkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        .rank-diamond .rank-badge {
          background: linear-gradient(135deg, #ffffff 0%, #b2ebf2 100%);
          color: #13222a;
          box-shadow: 0 0 15px rgba(224, 247, 250, 0.6);
        }

        /* Ruby: Radial Glow */
        .rank-ruby {
          background: linear-gradient(135deg, #27060f 0%, #062f2d 100%);
          border: 2px solid #ff416c;
          box-shadow: 0 0 30px rgba(255, 65, 108, 0.4);
        }
        .rank-ruby .rank-badge {
          background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
          color: #fff;
          box-shadow: 0 0 15px rgba(255, 65, 108, 0.5);
        }

        /* Chairman: Gold Cascades */
        .rank-chairman {
          background: linear-gradient(135deg, #271d05 0%, #062f2d 100%);
          border: 2px solid #ffd700;
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
          position: relative;
        }
        .rank-chairman::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 20%, rgba(255,215,0,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .rank-chairman .rank-badge {
          background: linear-gradient(135deg, #ffe066 0%, #f5af19 100%);
          color: #271d05;
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
        }
      ` }} />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gft-primary/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gft-accent/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10 ach-title">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Achievements</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Designations & Rewards Hierarchy</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Acquire matching turnover milestones to advance through GFT leadership ranks. Settle global pool commission shares and claim luxury rewards.
          </p>
        </div>
      </section>

      {/* Ranks Cards List */}
      <section ref={containerRef} className="py-20 max-w-5xl mx-auto px-6 flex flex-col gap-12 w-full">
        {achievementsData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.rank}
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`p-8 rounded-3xl text-white flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border ${item.class}`}
            >
              {/* Card Left Info */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="rank-badge w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">{item.rank} Designation</h2>
                </div>
                <p className="text-white/75 text-sm leading-relaxed max-w-xl font-normal">
                  {item.description}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 mt-1 border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-white/50 uppercase font-bold block">Req. Turnover</span>
                    <span className="text-sm font-extrabold text-white">{item.turnover}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 uppercase font-bold block">Pool Share</span>
                    <span className="text-sm font-extrabold text-gft-accent">{item.poolPercent} Share</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-white/50 uppercase font-bold block">Est. Royalties</span>
                    <span className="text-sm font-extrabold text-gft-accent">{item.income}</span>
                  </div>
                </div>
              </div>

              {/* Card Right Rewards / Benefits */}
              <div className="w-full md:w-80 shrink-0 bg-black/25 border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                <div>
                  <span className="text-[10px] text-white/45 uppercase font-bold block">Designation Benefits</span>
                  <span className="text-xs font-semibold text-white/90 block mt-1 leading-relaxed">
                    {item.benefits}
                  </span>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <span className="text-[10px] text-white/45 uppercase font-bold block">Physical Rewards</span>
                  <span className="text-xs font-bold text-gft-accent block mt-1 leading-relaxed">
                    {item.rewards}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick notice block */}
      <section className="bg-gft-card-dark text-white py-12 px-6 border-t border-gft-border-dark relative overflow-hidden text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <span className="inline-block px-3 py-1 bg-gft-primary/20 text-gft-accent text-[10px] font-bold rounded-full uppercase tracking-wider">
            Pool Payout Policy
          </span>
          <h3 className="text-lg font-bold">How are Leadership Pool Shares Distributed?</h3>
          <p className="text-xs text-white/70 max-w-lg leading-relaxed">
            The corporate turnover pool represents 7% of total GFT global sales, audited and distributed weekly. Each qualified rank receives points based on matching wings volume, generating regular stable USDT payouts to active wallets.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
