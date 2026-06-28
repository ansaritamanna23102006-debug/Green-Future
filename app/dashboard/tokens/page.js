"use client";

import React, { useState, useEffect } from "react";
import { Coins, TrendingUp, Download, Eye, ShieldCheck, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useApp } from "@/lib/context/AppContext";

export default function TokensPage() {
  const { user } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mockTokenTrend = [
    { name: "Week 1", yield: 2400 },
    { name: "Week 2", yield: 4800 },
    { name: "Week 3", yield: 8600 },
    { name: "Week 4", yield: 15200 },
    { name: "Week 5", yield: 28900 },
    { name: "Week 6", yield: user?.balance?.tokenBalance || 45200 }
  ];

  const recentTransactions = [
    { hash: "0xf82a...9b11", type: "Staking Reward", date: "2026-06-21", amount: "+2,500 GFT", status: "Completed" },
    { hash: "0x12dc...47da", type: "Binary Matching Bonus", date: "2026-06-18", amount: "+1,200 GFT", status: "Completed" },
    { hash: "0xa210...90cc", type: "Direct Sponsor Reward", date: "2026-06-15", amount: "+800 GFT", status: "Completed" },
    { hash: "0xe892...28ba", type: "Onboarding Airdrop", date: "2025-11-12", amount: "+100 GFT", status: "Completed" }
  ];

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">GFT Tokens</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Monitor your GFT token yields, staking rewards, and check smart contract hashes.</p>
      </div>

      {/* Token Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Self Token Earn */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">Self Token Earn</span>
            <div className="p-2 rounded-xl bg-gft-light text-gft-dark">
              <Coins className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-gft-deep tracking-tight">
              {user.balance.selfTokenEarn.toLocaleString()} GFT
            </h3>
            <span className="text-[10px] font-bold text-gft-primary block mt-2">Earned from direct stakes</span>
          </div>
        </div>

        {/* Team Token Earn */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">Team Token Earn</span>
            <div className="p-2 rounded-xl bg-gft-light text-gft-dark">
              <Coins className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-gft-deep tracking-tight">
              {user.balance.teamTokenEarn.toLocaleString()} GFT
            </h3>
            <span className="text-[10px] font-bold text-gft-primary block mt-2">Earned from matched wings volume</span>
          </div>
        </div>

        {/* Total Token Earn */}
        <div className="bg-white border border-gft-primary/20 p-6 rounded-2xl shadow-sm flex flex-col justify-between bg-gradient-to-br from-white to-gft-primary/5">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">Total Token Earn</span>
            <div className="p-2 rounded-xl bg-gft-primary text-white">
              <Coins className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-gft-deep tracking-tight">
              {user.balance.tokenBalance.toLocaleString()} GFT
            </h3>
            <span className="text-[10px] font-bold text-gft-accent block mt-2 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> Yield yield active (18% APY)
            </span>
          </div>
        </div>
      </div>

      {/* Charts & Contract Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Token Growth chart */}
        <div className="lg:col-span-8 bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wide">Staked GFT Tokens Growth</h3>
            <p className="text-xs text-gft-deep/45 mt-0.5">Weekly cumulative token balances derived from self and team staking actions.</p>
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                <AreaChart data={mockTokenTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tokenGrad" cx="0" cy="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8CD83D" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8CD83D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F1" />
                  <XAxis dataKey="name" stroke="#0A4D45" fontSize={10} tickLine={false} />
                  <YAxis stroke="#0A4D45" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#062F2D", color: "#FFF", borderRadius: 8, border: "none" }} />
                  <Area type="monotone" dataKey="yield" stroke="#8CD83D" strokeWidth={2.5} fillOpacity={1} fill="url(#tokenGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-gray-50/50 rounded-lg animate-pulse" />
            )}
          </div>
        </div>

        {/* Staking Specs info */}
        <div className="lg:col-span-4 bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col gap-5">
          <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wide border-b border-gft-gray-light pb-2">Staking Details</h3>
          
          <div className="flex flex-col gap-3 text-xs leading-relaxed text-gft-deep/80">
            <div className="flex justify-between border-b border-gft-light pb-2">
              <span className="text-gft-deep/45 font-bold">Standard Yield (APY)</span>
              <span className="font-extrabold text-gft-primary">12% APY</span>
            </div>
            <div className="flex justify-between border-b border-gft-light pb-2">
              <span className="text-gft-deep/45 font-bold">VIP APY (Apex/Sovereign)</span>
              <span className="font-extrabold text-gft-accent">18% APY</span>
            </div>
            <div className="flex justify-between border-b border-gft-light pb-2">
              <span className="text-gft-deep/45 font-bold">Lockup Duration</span>
              <span className="font-bold">180 Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gft-deep/45 font-bold">Reward Payouts</span>
              <span className="font-bold text-gft-primary">Instant Daily</span>
            </div>
          </div>

          <div className="p-4 bg-gft-light border border-gft-gray-light rounded-xl mt-2 flex flex-col gap-1 text-[10px] font-semibold text-gft-deep/60">
            <span className="uppercase text-gft-deep/45 font-bold tracking-wider">ERC-20 Contract Address</span>
            <span className="font-mono text-gft-dark break-all mt-1">0x8CD83D65B3000A4D45062F2D24F1F5F104C48b09</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-gft-deep">Recent Token Transactions</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gft-gray-light rounded-lg text-xs font-semibold hover:bg-gft-light text-gft-deep transition-all">
            <Download className="h-3.5 w-3.5" /> Export Ledger
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gft-gray-light text-[10px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                <th className="py-3 px-4 rounded-l-xl">TX Hash</th>
                <th className="py-3 px-4">Transaction Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-center rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, idx) => (
                <tr key={idx} className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-xs text-gft-dark">{tx.hash}</td>
                  <td className="py-4 px-4 font-bold text-gft-deep">{tx.type}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-gft-deep/60">{tx.date}</td>
                  <td className="py-4 px-4 text-right font-extrabold text-gft-primary">{tx.amount}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex px-2.5 py-1 bg-gft-primary/10 text-gft-primary border border-gft-primary/25 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
