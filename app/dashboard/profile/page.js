"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  ShieldCheck,
  Wallet,
  FileCheck,
  Mail,
  Phone,
  Calendar,
  Lock,
  Award,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function ProfileOverviewPage() {
  const { user } = useApp();

  if (!user) return null;

  const kycApprovedCount = Object.values(user.kycStatus).filter((s) => s === "Approved").length;
  const totalKycDocs = Object.keys(user.kycStatus).length;
  const kycPercentage = Math.round((kycApprovedCount / totalKycDocs) * 100);

  const shortcutLinks = [
    { name: "Edit Personal Info", desc: "Update your official name, email, phone number, and address.", href: "/dashboard/profile/edit", icon: User },
    { name: "KYC Verification", desc: "Upload Aadhaar, PAN, and Bank proofs to activate matching limits.", href: "/dashboard/profile/kyc", icon: ShieldCheck, highlight: true },
    { name: "USDT Wallet Settings", desc: "Configure your TRC-20/ERC-20 USDT settlement address.", href: "/dashboard/profile/usdt-wallet", icon: Wallet },
    { name: "Nominee Beneficiary", desc: "Manage nominee names, ages, relations, and addresses.", href: "/dashboard/profile/nominee", icon: UserCheck },
    { name: "Change Password", desc: "Update your system password credentials.", href: "/dashboard/profile/change-password", icon: Lock },
    { name: "GFT Welcome Letter", desc: "View and print your official independent affiliate certificate.", href: "/dashboard/profile/welcome-letter", icon: Award }
  ];

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Profile Overview</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Configure account settings, security passwords, USDT wallets, and verify KYC statuses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Summary Card */}
        <div className="lg:col-span-4 bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-gft-dark text-white border-4 border-gft-primary flex items-center justify-center font-bold text-3xl mb-4 relative">
            {user.name.split(" ").map((n) => n[0]).join("")}
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gft-primary border-2 border-white flex items-center justify-center">
              <Award className="h-3 w-3 text-white" />
            </span>
          </div>

          <h2 className="text-xl font-bold text-gft-deep">{user.name}</h2>
          <p className="text-xs font-bold text-gft-primary uppercase tracking-wider mt-1">{user.designation}</p>

          {/* Quick contact list */}
          <div className="w-full border-t border-gft-gray-light my-6 pt-6 flex flex-col gap-4 text-left">
            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-gft-dark shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gft-deep/45">Email Address</span>
                <span className="text-xs font-semibold text-gft-deep/80">{user.email}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-5 w-5 text-gft-dark shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gft-deep/45">Phone Number</span>
                <span className="text-xs font-semibold text-gft-deep/80">{user.mobile}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Calendar className="h-5 w-5 text-gft-dark shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-gft-deep/45">Registration Date</span>
                <span className="text-xs font-semibold text-gft-deep/80">{user.joiningDate}</span>
              </div>
            </div>
          </div>

          {/* KYC Progress Ring */}
          <div className="w-full bg-gft-light p-5 rounded-xl border border-gft-gray-light flex items-center gap-4">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="#EBEFEB" strokeWidth="4" fill="transparent" />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="#65B300"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={150}
                  strokeDashoffset={150 - (150 * kycPercentage) / 100}
                />
              </svg>
              <span className="absolute text-[11px] font-extrabold text-gft-deep">{kycPercentage}%</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-gft-deep">KYC Progress</h4>
              <p className="text-[10px] text-gft-deep/60 mt-0.5">{kycApprovedCount} of {totalKycDocs} documents approved.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Shortcut Cards Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {shortcutLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={idx}
                href={link.href}
                className={`bg-white border rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-gft-primary transition-all group ${
                  link.highlight ? "border-gft-primary/40 ring-1 ring-gft-primary/5" : "border-gft-gray-light"
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gft-light text-gft-dark flex items-center justify-center mb-4 group-hover:bg-gft-primary group-hover:text-white transition-colors duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-gft-deep group-hover:text-gft-primary transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-gft-deep/65 text-xs mt-1.5 leading-relaxed">
                    {link.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-extrabold text-gft-primary mt-4 self-start">
                  Configure Settings <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
