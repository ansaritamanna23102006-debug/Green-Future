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
  const { user, announcementDismissed, setAnnouncementDismissed, cmsContent } = useApp();
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

  // Neutralized chart data (zero mock income)
  const monthlyIncomeData = [
    { name: "Jan", income: 0 },
    { name: "Feb", income: 0 },
    { name: "Mar", income: 0 },
    { name: "Apr", income: 0 },
    { name: "May", income: 0 },
    { name: "Jun", income: 0 }
  ];

  const totalTeamCount = user?.balance?.totalTeam || 0;
  const tokenBal = user?.balance?.tokenBalance || 0;

  const teamGrowthData = [
    { name: "Jan", members: 0 },
    { name: "Feb", members: 0 },
    { name: "Mar", members: 0 },
    { name: "Apr", members: 0 },
    { name: "May", members: 0 },
    { name: "Jun", members: totalTeamCount }
  ];

  const tokenGrowthData = [
    { name: "W1", tokens: 0 },
    { name: "W2", tokens: 0 },
    { name: "W3", tokens: 0 },
    { name: "W4", tokens: 0 },
    { name: "W5", tokens: 0 },
    { name: "W6", tokens: tokenBal }
  ];

  // Top Payout List: Neutralized (Zero mock earnings)
  const highestPayouts = [];

  if (!mounted || !user) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 border-4 border-gft-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const cardItems = [
    { title: "Personal Income", value: user?.balance?.personalIncome || 0, prefix: "₹", icon: Wallet, growth: "Ledger", isPositive: true },
    { title: "Team Income", value: user?.balance?.teamIncome || 0, prefix: "₹", icon: Users, growth: "Ledger", isPositive: true },
    { title: "Direct Income", value: user?.balance?.directIncome || 0, prefix: "₹", icon: UserPlus, growth: "Ledger", isPositive: true },
    { title: "Matching Bonus", value: user?.balance?.bonus || 0, prefix: "₹", icon: Award, growth: "Phase 0 Gated", isPositive: true },
    { title: "Team Turnover", value: user?.balance?.turnover || 0, prefix: "₹", icon: Briefcase, growth: "Sales", isPositive: true },
    { title: "Total Team", value: user?.balance?.totalTeam || 0, icon: Network, growth: `${user?.balance?.totalTeam || 0} members`, isPositive: true },
    { title: "Active Downlines", value: user?.balance?.activeTeam || 0, icon: ShieldCheck, growth: `${user?.balance?.activeTeam || 0} active`, isPositive: true },
    { title: "GFT Tokens", value: user?.balance?.tokenBalance || 0, suffix: " GFT", icon: Coins, growth: "Internal Ledger", isPositive: true }
  ];

  return (
    <div ref={containerRef} className="flex flex-col gap-8 select-none text-white">
      {/* Dashboard Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Affiliate Dashboard</h1>
          <p className="text-white/60 text-sm mt-1">Real-time networking yields, team matrix growth, and GFT token allocations.</p>
        </div>
        <button
          onClick={() => setAnnouncementDismissed(false)}
          className="bg-white/5 border border-gft-border-dark hover:bg-white/10 text-white font-semibold px-4.5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
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
              className="kpi-card bg-gft-card-dark border border-gft-border-dark rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-white/50">{card.title}</span>
                <div className="p-2 rounded-xl bg-white/5 text-gft-accent">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
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
                  <span className="text-white/40">since last week</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income Chart */}
        <div className="chart-panel bg-gft-card-dark border border-gft-border-dark p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Monthly Yields ($)</h3>
            <p className="text-xs text-white/45 mt-0.5">Aggregated Direct & Team commission payouts.</p>
          </div>
          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={monthlyIncomeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="incomeGrad" cx="0" cy="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#65B300" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#65B300" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#104C48" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#062F2D", color: "#FFF", borderRadius: 8, border: "none" }} />
                  <Area type="monotone" dataKey="income" stroke="#65B300" strokeWidth={2} fillOpacity={1} fill="url(#incomeGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-gray-900/50 rounded-lg animate-pulse" />
            )}
          </div>
        </div>

        {/* Team Growth Chart */}
        <div className="chart-panel bg-gft-card-dark border border-gft-border-dark p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Team Node Growth</h3>
            <p className="text-xs text-white/45 mt-0.5">Cumulative direct & indirect wing placement count.</p>
          </div>
          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <LineChart data={teamGrowthData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#104C48" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#062F2D", color: "#FFF", borderRadius: 8, border: "none" }} />
                  <Line type="monotone" dataKey="members" stroke="#8CD83D" strokeWidth={2.5} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-gray-900/50 rounded-lg animate-pulse" />
            )}
          </div>
        </div>

        {/* Token Accumulation Chart */}
        <div className="chart-panel bg-gft-card-dark border border-gft-border-dark p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">GFT Token holdings</h3>
            <p className="text-xs text-white/45 mt-0.5">Tokens distributed from self and team staking actions.</p>
          </div>
          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <BarChart data={tokenGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#104C48" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#062F2D", color: "#FFF", borderRadius: 8, border: "none" }} />
                  <Bar dataKey="tokens" fill="#8CD83D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-gray-900/50 rounded-lg animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Highest Payout Table & Rank List */}
      <div className="bg-gft-card-dark border border-gft-border-dark rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Top 10 Highest Payout List</h3>
            <p className="text-xs text-white/45 mt-0.5">Top-performing network directors in GFT this active week.</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gft-border-dark text-xs font-semibold hover:bg-white/10 text-white transition-all cursor-pointer">
            <Download className="h-3.5 w-3.5" /> Export List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gft-border-dark text-[11px] font-extrabold uppercase tracking-wider text-white/50 bg-white/5">
                <th className="py-3.5 px-4 rounded-l-xl">Rank</th>
                <th className="py-3.5 px-4">Member ID</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4 text-right">Weekly Payout</th>
                <th className="py-3.5 px-4 text-center rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {highestPayouts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-white/50">
                    Live network payouts and commissions are currently paused pending Phase 0 business plan confirmation. Zero mock payouts displayed.
                  </td>
                </tr>
              ) : (
                highestPayouts.map((member) => (
                  <tr key={member.rank} className="border-b border-gft-border-dark last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">
                      {member.rank === 1 && "🥇 "}
                      {member.rank === 2 && "🥈 "}
                      {member.rank === 3 && "🥉 "}
                      {member.rank > 3 && `#${member.rank}`}
                    </td>
                    <td className="py-4 px-4 font-semibold text-white/80">{member.id}</td>
                    <td className="py-4 px-4 font-bold text-white">{member.name}</td>
                    <td className="py-4 px-4 text-right font-extrabold text-gft-primary">
                      ₹{member.payout.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          member.status === "Disbursed"
                            ? "bg-gft-primary/20 text-gft-accent"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pop-Up Announcement Modal */}
      {showAnnouncement && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gft-deep/60 backdrop-blur-md p-6 opacity-0"
        >
          <div
            ref={modalRef}
            className="bg-gft-card-dark border-2 border-gft-primary rounded-3xl p-8 max-w-xl w-full relative shadow-2xl overflow-hidden opacity-0 scale-90 text-white"
          >
            {/* Corner decorative circles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gft-primary/10 rounded-full blur-2xl pointer-events-none" />

            <button
              onClick={handleDismissModal}
              className="absolute top-5 right-5 p-2 rounded-xl hover:bg-white/5 text-white transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 bg-gft-primary/10 text-gft-primary rounded-2xl flex items-center justify-center">
                <Megaphone className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-gft-primary">Official Announcement</span>
                <h2 className="text-xl font-bold text-white">{cmsContent?.popup?.title || "Phase II GFT Tokenization Launch"}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-sm text-white/85 leading-relaxed">
              <p>
                {cmsContent?.popup?.message || "Welcome back to the Green Future Tech Network! We are thrilled to announce that the Phase II Smart Contract audit is complete."}
              </p>
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
