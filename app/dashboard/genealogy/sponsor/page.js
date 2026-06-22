"use client";

import React from "react";
import { User, Award, Phone, Calendar, ShieldCheck } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function SponsorInfoPage() {
  const { user } = useApp();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Sponsor Information</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Check credentials, designations, and contacts of the GFT independent sponsor who referred you.</p>
      </div>

      {/* Sponsor Card */}
      <div className="bg-white border border-gft-gray-light rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
        {/* Profile Circle */}
        <div className="w-20 h-20 rounded-2xl bg-gft-dark text-white border-2 border-gft-primary flex items-center justify-center font-bold text-2xl mb-4">
          {user.sponsorName.split(" ").map((n) => n[0]).join("")}
        </div>

        <h2 className="text-xl font-bold text-gft-deep">{user.sponsorName}</h2>
        <p className="text-xs font-bold text-gft-primary uppercase tracking-wider mt-1">{user.sponsorDesignation || "Emerald Manager"}</p>

        {/* Sponsor details grid */}
        <div className="w-full border-t border-gft-gray-light my-6 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gft-light flex items-center justify-center text-gft-dark shrink-0">
              <User className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gft-deep/45">Sponsor Member ID</span>
              <span className="text-sm font-extrabold text-gft-deep/85">{user.sponsorId}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gft-light flex items-center justify-center text-gft-dark shrink-0">
              <Phone className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gft-deep/45">Mobile Number</span>
              <span className="text-sm font-extrabold text-gft-deep/85">{user.sponsorMobile || "+91 98765 43201"}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gft-light flex items-center justify-center text-gft-dark shrink-0">
              <Calendar className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gft-deep/45">Registration Date</span>
              <span className="text-sm font-extrabold text-gft-deep/85">{user.sponsorJoiningDate || "2025-11-12"}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gft-light flex items-center justify-center text-gft-dark shrink-0">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-gft-deep/45">Placements</span>
              <span className="text-sm font-extrabold text-gft-primary">Left Wing active wing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
