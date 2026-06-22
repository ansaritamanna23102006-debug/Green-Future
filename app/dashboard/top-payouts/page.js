"use client";

import React from "react";
import { Download, Award, ShieldCheck } from "lucide-react";

export default function TopPayoutsPage() {
  const highestPayouts = [
    { rank: 1, id: "GFT100045", name: "Vikram R. Malhotra", direct: 24500, team: 58200, bonus: 6500, status: "Disbursed" },
    { rank: 2, id: "GFT100112", name: "Sarah Jenkins", direct: 18900, team: 51100, bonus: 4500, status: "Disbursed" },
    { rank: 3, id: "GFT100004", name: "Chen Wei", direct: 15400, team: 43200, bonus: 3500, status: "Disbursed" },
    { rank: 4, id: "GFT100201", name: "Elena Rostova", direct: 12200, team: 34220, bonus: 2500, status: "Disbursed" },
    { rank: 5, id: "GFT100340", name: "Marcus Aurelius", direct: 10500, team: 27300, bonus: 2000, status: "Disbursed" },
    { rank: 6, id: "GFT100098", name: "Aarav Sharma", direct: 9800, team: 24100, bonus: 1500, status: "Disbursed" },
    { rank: 7, id: "GFT100155", name: "Chloe Dupont", direct: 7200, team: 20200, bonus: 1500, status: "Processing" },
    { rank: 8, id: "GFT100412", name: "Zahir Al-Hassan", direct: 6800, team: 16700, bonus: 1000, status: "Disbursed" },
    { rank: 9, id: "GFT100227", name: "Sophia Martinez", direct: 5400, team: 13400, bonus: 1000, status: "Disbursed" },
    { rank: 10, id: "GFT100389", name: "John Dumont", direct: 4500, team: 10100, bonus: 800, status: "Processing" }
  ];

  const handleExport = () => {
    alert("Exporting top payout logs to CSV ledger...");
  };

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Top Earning Leaders</h1>
          <p className="text-gft-deep/60 text-sm mt-1">Audit payout ledgers representing GFT's highest weekly network matched volumes.</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gft-primary hover:bg-gft-accent text-white rounded-xl text-xs font-bold shadow-md shadow-gft-primary/10 transition-colors cursor-pointer"
        >
          <Download className="h-4 w-4" /> Export CSV Ledger
        </button>
      </div>

      {/* Payout Grid Table */}
      <div className="bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                <th className="py-4 px-4 rounded-l-2xl">Rank</th>
                <th className="py-4 px-4">Member ID</th>
                <th className="py-4 px-4">Full Name</th>
                <th className="py-4 px-4 text-right">Direct Referral</th>
                <th className="py-4 px-4 text-right">Binary Matching</th>
                <th className="py-4 px-4 text-right">Rank Bonus</th>
                <th className="py-4 px-4 text-right rounded-r-2xl">Total Yield</th>
              </tr>
            </thead>
            <tbody>
              {highestPayouts.map((member) => {
                const total = member.direct + member.team + member.bonus;
                return (
                  <tr key={member.rank} className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors">
                    <td className="py-4.5 px-4 font-extrabold text-gft-deep">
                      {member.rank <= 3 ? `🥇 0${member.rank}` : `#0${member.rank}`}
                    </td>
                    <td className="py-4.5 px-4 font-semibold text-gft-deep/80">{member.id}</td>
                    <td className="py-4.5 px-4 font-bold text-gft-deep">{member.name}</td>
                    <td className="py-4.5 px-4 text-right font-medium text-gft-deep/80">${member.direct.toLocaleString()}</td>
                    <td className="py-4.5 px-4 text-right font-medium text-gft-deep/80">${member.team.toLocaleString()}</td>
                    <td className="py-4.5 px-4 text-right font-medium text-gft-deep/80">${member.bonus.toLocaleString()}</td>
                    <td className="py-4.5 px-4 text-right font-extrabold text-gft-primary">
                      ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
