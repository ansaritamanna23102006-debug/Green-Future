"use client";

import React, { useState, useEffect } from "react";
import { User, Award, Calendar, ShieldCheck, RefreshCw } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function SponsorInfoPage() {
  const { user } = useApp();
  const [sponsorData, setSponsorData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("gft_token");
        if (!token) return;

        const res = await fetch(`${API_URL}/genealogy/sponsor-info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.status === "success" && data.data) {
          setSponsorData(data.data);
        }
      } catch (err) {
        console.error("Failed to load sponsor info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsor();
  }, []);

  if (!user) return null;

  const sponsorName = sponsorData?.sponsorName || user.sponsorName || "System Administration";
  const sponsorId = sponsorData?.sponsorId || user.sponsorId || "none";
  const sponsorRank = sponsorData?.rank && sponsorData.rank !== "none" ? sponsorData.rank.toUpperCase() : "MEMBER";
  const initials = sponsorName.split(" ").map((n) => n[0]).join("");
  const registrationDate = sponsorData?.joiningDate ? sponsorData.joiningDate.split("T")[0] : "Platform Root";
  const status = sponsorData?.status ? sponsorData.status.toUpperCase() : "ACTIVE";

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto select-none text-white">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Sponsor Information</h1>
        <p className="text-white/60 text-sm mt-1">
          Check credentials and designations of the GFT independent sponsor who referred you.
        </p>
      </div>

      {/* Sponsor Card */}
      <div className="bg-gft-card-dark border border-gft-border-dark rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
            <RefreshCw className="animate-spin text-gft-accent" size={24} />
          </div>
        )}

        {/* Profile Circle */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#082F2C] to-[#041D1C] text-white border-2 border-gft-primary flex items-center justify-center font-bold text-2xl mb-4 shadow-lg">
          {initials}
        </div>

        <h2 className="text-xl font-bold text-white">{sponsorName}</h2>
        <p className="text-xs font-bold text-gft-primary uppercase tracking-wider mt-1">{sponsorRank}</p>

        {/* Sponsor details grid */}
        <div className="w-full border-t border-gft-border-dark my-6 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-gft-border-dark flex items-center justify-center text-gft-accent shrink-0">
              <User className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/40">Sponsor Member ID</span>
              <span className="text-sm font-extrabold text-white/90">{sponsorId}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-gft-border-dark flex items-center justify-center text-gft-accent shrink-0">
              <Award className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/40">Account Status</span>
              <span className="text-sm font-extrabold text-gft-primary">{status}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-gft-border-dark flex items-center justify-center text-gft-accent shrink-0">
              <Calendar className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/40">Registration Date</span>
              <span className="text-sm font-extrabold text-white/90">{registrationDate}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-gft-border-dark flex items-center justify-center text-gft-accent shrink-0">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-white/40">Direct Sponsorship</span>
              <span className="text-sm font-extrabold text-gft-primary">Verified Network Sponsor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
