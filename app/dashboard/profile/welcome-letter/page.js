"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Award, ChevronLeft, Printer } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function WelcomeLetterPage() {
  const router = useRouter();
  const { user } = useApp();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto select-none">
      {/* Back button and Print Trigger */}
      <div className="flex justify-between items-center w-full">
        <button
          onClick={() => router.push("/dashboard/profile")}
          className="flex items-center gap-1.5 text-xs font-bold text-gft-deep/60 hover:text-gft-primary transition-colors cursor-pointer self-start"
        >
          <ChevronLeft className="h-4.5 w-4.5" /> Back to Profile
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 text-xs font-bold text-gft-primary hover:underline cursor-pointer"
        >
          Print Certificate <Printer className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Printable letterhead container */}
      <div className="bg-white border-8 border-gft-dark p-6 sm:p-10 font-sans shadow-lg relative text-gft-deep">
        <div className="absolute top-2 left-2 right-2 bottom-2 border border-gft-primary/45 pointer-events-none" />

        {/* Letterhead Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-b border-gft-gray-light pb-6 gap-4">
          <div className="flex flex-col leading-none text-center sm:text-left select-none">
            <span className="text-2xl font-black tracking-wider text-gft-dark">GREEN FUTURE</span>
            <span className="text-xs font-bold tracking-[0.25em] text-gft-primary mt-1">TECHNOLOGY</span>
            <span className="text-[10px] text-gft-deep/45 font-medium mt-2 leading-relaxed">
              Regd Off: Fintech Boulevard, Hyderabad, India<br />
              Web: www.greenfuturetech.com | Mail: admin@gft.com
            </span>
          </div>

          <div className="text-center sm:text-right text-xs">
            <span className="text-gft-deep/45 font-bold uppercase tracking-wider block">Official Dispatch</span>
            <span className="font-bold text-gft-deep block mt-1">Ref No: GFT/WEL/2026/{user.memberId}</span>
            <span className="font-semibold text-gft-deep/60 block">Date: {user.joiningDate}</span>
          </div>
        </div>

        {/* Salutation & Address Block */}
        <div className="my-8 text-[14px]">
          <p className="font-bold text-gft-deep">To,</p>
          <p className="font-extrabold text-gft-dark text-base mt-1">{user.name}</p>
          <p className="text-gft-deep/80 leading-relaxed max-w-sm mt-1 text-xs">
            {user.address}, {user.city}, {user.state}, {user.country}
          </p>
          <p className="text-xs font-semibold text-gft-primary mt-2">Member ID: {user.memberId}</p>
        </div>

        {/* Letter Contents */}
        <div className="text-xs sm:text-[13px] leading-relaxed text-gft-deep/85 flex flex-col gap-4 text-justify">
          <p className="font-bold text-gft-dark">Subject: Welcome to the Green Future Tech Affiliate Family</p>
          
          <p>Dear <strong className="text-gft-dark">{user.name}</strong>,</p>
          
          <p>
            On behalf of the Board of Directors of Green Future Tech, we extend our warmest welcome to you as an independent affiliate partner. We are excited to collaborate with you to propagate sustainable digital asset financing and ecological development pools globally.
          </p>
          
          <p>
            By establishing your node under Sponsor <strong className="text-gft-dark">{user.sponsorName}</strong> ({user.sponsorId}), you have activated access to our industry-leading compensation matrix. You are eligible to accrue commissions across our 7-Level Direct Structure, Team Matching matching bonuses, and monthly leadership ranks.
          </p>

          <p>
            Your credential profile is activated. Please verify your identity documents (Aadhaar & PAN) under the KYC tab to remove deposit or withdrawal thresholds. We wish you immense success in building your wings and helping construct a green, sustainable future.
          </p>
        </div>

        {/* MD Signature Seal block */}
        <div className="mt-12 pt-6 flex justify-between items-end border-t border-gft-gray-light">
          <div>
            <span className="text-[10px] text-gft-deep/40 font-bold uppercase tracking-wider">Authorized Seal</span>
            <div className="w-16 h-16 border-2 border-gft-primary/45 rounded-full flex items-center justify-center text-[10px] font-bold text-gft-primary rotate-12 mt-1">
              GFT CORP
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold text-gft-deep font-mono italic">Devendra P. Rao</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-gft-deep/50 mt-1">Managing Director</p>
            <p className="text-[9px] text-gft-primary font-bold">Green Future Tech Private Limited</p>
          </div>
        </div>

      </div>
    </div>
  );
}
