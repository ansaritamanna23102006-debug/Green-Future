"use client";

import React from "react";
import { ShieldAlert, FileText, CheckCircle2, Lock } from "lucide-react";

export default function TopPayoutsPage() {
  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Network Payout Audit & Status</h1>
          <p className="text-gft-deep/60 text-sm mt-1">
            Authoritative tracking and compliance verification for GFT income distributions.
          </p>
        </div>
      </div>

      {/* Compliance / Status Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-5">
        <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-gft-deep flex items-center gap-2">
            Live Network Payouts Paused Pending Client Confirmation
          </h3>
          <p className="text-xs text-gft-deep/70 mt-1 leading-relaxed">
            In strict compliance with GFT financial governance protocols (Phase 6 Engine Foundation), live network 
            distributions, direct commissions, and binary turnover matching remain paused until the Phase 0 Business 
            Plan rules are formally confirmed. No mock or fabricated payout values are displayed.
          </p>
        </div>
      </div>

      {/* Governance Diagnostics Matrix */}
      <div className="bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gft-deep mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-gft-primary" />
          Business Rule Execution Gates
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gft-deep/60 uppercase">Reference Levels (L1 - L3)</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-600">CONFIRMED</span>
            </div>
            <p className="text-xs text-gft-deep/80 font-medium">L1: 5.0%, L2: 3.0%, L3: 2.0% unilevel percentages verified.</p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gft-deep/60 uppercase">Reference Levels (L4 - L5)</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-600">PENDING</span>
            </div>
            <p className="text-xs text-gft-deep/80 font-medium">PDF vs Prototype discrepancy (L4: 1.5% vs 1.0%; L5: 1.0% vs 0.5%).</p>
          </div>

          <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gft-deep/60 uppercase">Package Catalog Execution</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/20 text-rose-600">GATED</span>
            </div>
            <p className="text-xs text-gft-deep/80 font-medium">Package pricing discrepancies pending client sign-off before financial distribution.</p>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gft-light/40 border border-gft-gray-light text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gft-deep/60">
            <Lock className="h-4 w-4" />
            Historical leaderboards and payout ledgers will populate automatically upon execution gate activation.
          </div>
        </div>
      </div>
    </div>
  );
}
