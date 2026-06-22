"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Wallet,
  Users,
  UserPlus,
  Award,
  Briefcase,
  Network,
  ShieldCheck,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  X,
  Megaphone,
  Download,
  ExternalLink
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  BarChart,
  Bar
} from "recharts";
import { useApp } from "@/lib/context/AppContext";

// Count Up helper for dashboard cards using GSAP
function DashboardCountUp({ end, prefix = "", suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef({ val: 0 });

  useEffect(() => {
    gsap.to(countRef.current, {
      val: end,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        setCount(countRef.current.val);
      }
    });
  }, [end]);

  return (
    <span>
      {prefix}
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}
      {suffix}
    </span>
  );
}

export default function DashboardPage() {
  const { user, announcementDismissed, setAnnouncementDismissed } = useApp();
  const [mounted, setMounted] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animate dashboard entrance
  useEffect(() => {
    if (!mounted || !user) return;
    
    // Stagger animate cards and charts
    gsap.fromTo(
      ".kpi-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );
    
    gsap.fromTo(
      ".chart-panel",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: "power2.out" }
    );
  }, [mounted, user]);

  // Handle modal trigger and animations
  useEffect(() => {
    if (mounted && !announcementDismissed) {
      setShowAnnouncement(true);
      // Wait a tick for render then animate in
      setTimeout(() => {
        if (overlayRef.current && modalRef.current) {
          gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
          gsap.fromTo(
            modalRef.current,
            { scale: 0.9, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.25)" }
          );
        }
      }, 50);
    } else {
      setShowAnnouncement(false);
    }
  }, [announcementDismissed, mounted]);

  const handleDismissModal = () => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 15, duration: 0.25, ease: "power2.in" });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          setAnnouncementDismissed(true);
          setShowAnnouncement(false);
        }
      });
    } else {
      setAnnouncementDismissed(true);
      setShowAnnouncement(false);
    }
  };

  // Mock data for Recharts
  const monthlyIncomeData = [
    { name: "Jan", income: 2400 },
    { name: "Feb", income: 3600 },
    { name: "Mar", income: 5200 },
    { name: "Apr", income: 4800 },
    { name: "May", income: 8900 },
    { name: "Jun", income: 12450 }
  ];

  const teamGrowthData = [
    { name: "Jan", members: 30 },
    { name: "Feb", members: 55 },
    { name: "Mar", members: 82 },
    { name: "Apr", members: 110 },
    { name: "May", members: 145 },
    { name: "Jun", members: 184 }
  ];

  const tokenGrowthData = [
    { name: "W1", tokens: 8000 },
    { name: "W2", tokens: 15000 },
    { name: "W3", tokens: 21000 },
    { name: "W4", tokens: 30000 },
    { name: "W5", tokens: 38000 },
    { name: "W6", tokens: 45200 }
  ];

  // Top 10 Payout List
  const highestPayouts = [
    { rank: 1, id: "GFT100045", name: "Vikram R. Malhotra", payout: 89200.00, status: "Disbursed" },
    { rank: 2, id: "GFT100112", name: "Sarah Jenkins", payout: 74500.00, status: "Disbursed" },
    { rank: 3, id: "GFT100004", name: "Chen Wei", payout: 62100.00, status: "Disbursed" },
    { rank: 4, id: "GFT100201", name: "Elena Rostova", payout: 48920.00, status: "Disbursed" },
    { rank: 5, id: "GFT100340", name: "Marcus Aurelius", payout: 39800.00, status: "Disbursed" },
    { rank: 6, id: "GFT100098", name: "Aarav Sharma", payout: 35400.00, status: "Disbursed" },
    { rank: 7, id: "GFT100155", name: "Chloe Dupont", payout: 28900.00, status: "Processing" },
    { rank: 8, id: "GFT100412", name: "Zahir Al-Hassan", payout: 24500.00, status: "Disbursed" },
    { rank: 9, id: "GFT100227", name: "Sophia Martinez", payout: 19800.00, status: "Disbursed" },
    { rank: 10, id: "GFT100389", name: "John Dumont", payout: 15400.00, status: "Processing" }
  ];

  if (!mounted || !user) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 border-4 border-gft-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Dashboard Cards Definition
  const cardItems = [
    { title: "Personal Income", value: user.balance.personalIncome, prefix: "$", icon: Wallet, growth: "+12.4%", isPositive: true },
    { title: "Team Income", value: user.balance.teamIncome, prefix: "$", icon: Users, growth: "+24.8%", isPositive: true },
    { title: "Direct Income", value: user.balance.directIncome, prefix: "$", icon: UserPlus, growth: "+8.2%", isPositive: true },
    { title: "Matching Bonus", value: user.balance.bonus, prefix: "$", icon: Award, growth: "+15.0%", isPositive: true },
    { title: "Team Turnover", value: user.balance.turnover, prefix: "$", icon: Briefcase, growth: "+31.2%", isPositive: true },
    { title: "Total Team", value: user.balance.totalTeam, icon: Network, growth: "+14 members", isPositive: true },
    { title: "Active Downlines", value: user.balance.activeTeam, icon: ShieldCheck, growth: "85.2% active", isPositive: true },
    { title: "GFT Tokens", value: user.balance.tokenBalance, suffix: " GFT", icon: Coins, growth: "+5,200 GFT", isPositive: true }
  ];

  return (
    <div ref={containerRef} className="flex flex-col gap-8 select-none">
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Affiliate Dashboard</h1>
          <p className="text-gft-deep/60 text-sm mt-1">Real-time networking yields, team matrix growth, and GFT token allocations.</p>
        </div>
        <button
          onClick={() => setAnnouncementDismissed(false)}
          className="bg-white border border-gft-gray-light hover:bg-gft-light text-gft-deep font-semibold px-4.5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Megaphone className="h-4 w-4 text-gft-primary" /> View Announcements
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardItems.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="kpi-card bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">{card.title}</span>
                <div className="p-2 rounded-xl bg-gft-light text-gft-dark">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-gft-deep tracking-tight">
                  <DashboardCountUp
                    end={card.value}
                    prefix={card.prefix || ""}
                    suffix={card.suffix || ""}
                    decimals={card.prefix ? 2 : 0}
                  />
                </h3>
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <span className={`font-bold flex items-center ${card.isPositive ? "text-gft-primary" : "text-rose-500"}`}>
                    {card.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {card.growth}
                  </span>
                  <span className="text-gft-deep/45">since last week</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Chart */}
        <div className="chart-panel bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wide">Monthly Yields ($)</h3>
            <p className="text-xs text-gft-deep/45 mt-0.5">Aggregated Direct & Team commission payouts.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyIncomeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" cx="0" cy="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#65B300" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#65B300" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F1" />
                <XAxis dataKey="name" stroke="#0A4D45" fontSize={10} tickLine={false} />
                <YAxis stroke="#0A4D45" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ background: "#062F2D", color: "#FFF", borderRadius: 8, border: "none" }} />
                <Area type="monotone" dataKey="income" stroke="#65B300" strokeWidth={2} fillOpacity={1} fill="url(#incomeGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Growth Chart */}
        <div className="chart-panel bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wide">Team Node Growth</h3>
            <p className="text-xs text-gft-deep/45 mt-0.5">Cumulative direct & indirect wing placement count.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={teamGrowthData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F1" />
                <XAxis dataKey="name" stroke="#0A4D45" fontSize={10} tickLine={false} />
                <YAxis stroke="#0A4D45" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ background: "#062F2D", color: "#FFF", borderRadius: 8, border: "none" }} />
                <Line type="monotone" dataKey="members" stroke="#0A4D45" strokeWidth={2.5} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Token Accumulation Chart */}
        <div className="chart-panel bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wide">GFT Token holdings</h3>
            <p className="text-xs text-gft-deep/45 mt-0.5">Tokens distributed from self and team staking actions.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tokenGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F1" />
                <XAxis dataKey="name" stroke="#0A4D45" fontSize={10} tickLine={false} />
                <YAxis stroke="#0A4D45" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ background: "#062F2D", color: "#FFF", borderRadius: 8, border: "none" }} />
                <Bar dataKey="tokens" fill="#8CD83D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Highest Payout Table & Rank List */}
      <div className="bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-gft-deep">Top 10 Highest Payout List</h3>
            <p className="text-xs text-gft-deep/45 mt-0.5">Top-performing network directors in GFT this active week.</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gft-gray-light text-xs font-semibold hover:bg-gft-light text-gft-deep transition-all cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                <th className="py-3.5 px-4 rounded-l-xl">Rank</th>
                <th className="py-3.5 px-4">Member ID</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4 text-right">Weekly Payout</th>
                <th className="py-3.5 px-4 text-center rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {highestPayouts.map((member) => (
                <tr key={member.rank} className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors">
                  <td className="py-4 px-4 font-bold text-gft-deep">
                    {member.rank === 1 && "🥇 "}
                    {member.rank === 2 && "🥈 "}
                    {member.rank === 3 && "🥉 "}
                    {member.rank > 3 && `#${member.rank}`}
                  </td>
                  <td className="py-4 px-4 font-semibold text-gft-deep/80">{member.id}</td>
                  <td className="py-4 px-4 font-bold text-gft-deep">{member.name}</td>
                  <td className="py-4 px-4 text-right font-extrabold text-gft-primary">
                    ${member.payout.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        member.status === "Disbursed"
                          ? "bg-gft-primary/10 text-gft-primary"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pop-Up Announcement Modal */}
      {showAnnouncement && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gft-deep/50 backdrop-blur-md p-6 opacity-0"
        >
          <div
            ref={modalRef}
            className="bg-white border-2 border-gft-primary rounded-3xl p-8 max-w-xl w-full relative shadow-2xl overflow-hidden opacity-0 scale-90"
          >
            {/* Corner decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gft-primary/10 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={handleDismissModal}
              className="absolute top-5 right-5 p-2 rounded-xl hover:bg-gft-light text-gft-deep transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 bg-gft-primary/10 text-gft-primary rounded-2xl flex items-center justify-center">
                <Megaphone className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-gft-primary">Official Announcement</span>
                <h2 className="text-xl font-bold text-gft-deep">Phase II GFT Tokenization Launch</h2>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm text-gft-deep/85 leading-relaxed">
              <p>
                Welcome back to the Green Future Tech Network! We are thrilled to announce that the **Phase II Smart Contract audit** is complete.
              </p>
              <p>
                Starting this week, all binary matching outputs will carry a **5% GFT Token loyalty bonus**. Make sure your **USDT ERC-20 / BEP-20 Wallet Address** is updated under your Profile panel to secure automated payouts.
              </p>
              <div className="p-4 bg-gft-light border border-gft-gray-light rounded-2xl flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gft-deep/50 font-bold uppercase">Audit Document</span>
                  <span className="text-xs font-bold text-gft-deep">GFT-Audit-Report-V2.pdf</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-gft-primary font-bold hover:underline cursor-pointer">
                  Download <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleDismissModal}
                className="flex-1 bg-gft-primary hover:bg-gft-accent text-white font-bold py-3.5 rounded-2xl text-center shadow-lg shadow-gft-primary/10 transition-all cursor-pointer"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
