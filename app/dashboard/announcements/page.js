"use client";

import React from "react";
import { Megaphone, ExternalLink, Calendar, Bell } from "lucide-react";

export default function AnnouncementsPage() {
  const notices = [
    {
      id: 1,
      title: "Phase II GFT Tokenization Launch",
      date: "2026-06-22",
      importance: "Critical",
      message: "The Phase II Smart Contract audit is fully complete. Starting this cycle, binary wing matching commissions carry a 5% native token loyalty bonus. Ensure your USDT wallet address is configured to receive automated contract payments."
    },
    {
      id: 2,
      title: "Mumbai Leadership Summit Invitation",
      date: "2026-06-18",
      importance: "High",
      message: "Congratulations to all Diamond Directors and Emerald Managers. The GFT Leadership Council invites you to the Grand Hyatt Mumbai on July 15 for our annual Eco-Blockchain summit."
    },
    {
      id: 3,
      title: "USDT Wallet Address Protocol Upgrades",
      date: "2026-06-10",
      importance: "Normal",
      message: "We have optimized gas limits for TRC-20 and BEP-20 payouts. Automated withdrawal runs will clear within 5-15 minutes instead of the prior 2-hour window."
    }
  ];

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Admin Announcements</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Check administrative notices, smart contract releases, and official network newsletters.</p>
      </div>

      {/* Announcements Stack */}
      <div className="flex flex-col gap-6">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`bg-white border rounded-3xl p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden ${
              notice.importance === "Critical"
                ? "border-gft-primary/45 ring-2 ring-gft-primary/5"
                : "border-gft-gray-light"
            }`}
          >
            {/* Corner blur for Critical importance */}
            {notice.importance === "Critical" && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-gft-primary/10 rounded-full blur-xl pointer-events-none" />
            )}

            <div className="flex justify-between items-start flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  notice.importance === "Critical" ? "bg-gft-primary/10 text-gft-primary" : "bg-gft-light text-gft-dark"
                }`}>
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <span className={`text-[9px] uppercase font-extrabold tracking-widest ${
                    notice.importance === "Critical" ? "text-gft-primary" : "text-gft-deep/50"
                  }`}>
                    {notice.importance} Notice
                  </span>
                  <h3 className="text-base font-bold text-gft-deep mt-0.5">{notice.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gft-deep/45 font-semibold bg-gft-light px-3 py-1.5 rounded-lg border border-gft-gray-light">
                <Calendar className="h-3.5 w-3.5" /> {notice.date}
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-gft-deep/80 text-justify">
              {notice.message}
            </p>

            {notice.importance === "Critical" && (
              <div className="border-t border-gft-gray-light pt-4 mt-2 flex justify-between items-center text-xs">
                <span className="text-gft-deep/45 font-bold">Attachment: GFT-Audit-V2.pdf</span>
                <button className="flex items-center gap-1.5 text-xs text-gft-primary font-bold hover:underline">
                  Download Audit Report <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
