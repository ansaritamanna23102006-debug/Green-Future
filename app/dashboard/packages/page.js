"use client";

import React, { useState } from "react";
import { Gift, CheckCircle, ShieldAlert, Award, ArrowUpRight, Coins, ArrowRight } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function PackagesPage() {
  const { studentPackages, personalPackages, businessPackages, packages, buyPackage } = useApp();
  const [activeTab, setActiveTab] = useState("student");
  const [buying, setBuying] = useState(null);

  const getActivePackages = () => {
    if (activeTab === "student") return studentPackages;
    if (activeTab === "personal") return personalPackages;
    return businessPackages;
  };

  const activePackages = getActivePackages();

  const handlePurchase = (pkgName, amount) => {
    const confirm = window.confirm(`Confirm purchase of ${pkgName} package for ₹${amount.toLocaleString()}?`);
    if (confirm) {
      setBuying(pkgName);
      setTimeout(() => {
        buyPackage(pkgName, amount);
        setBuying(null);
        alert(`Successfully purchased ${pkgName} package. ₹${amount.toLocaleString()} added to your active stakes and GFT token yields distributed.`);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-8 select-none text-white">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Affiliate Packages</h1>
        <p className="text-white/60 text-sm mt-1">Upgrade your eco-tech stakes. Higher packages yield daily returns and boost binary limits.</p>
      </div>

      {/* Tab Selectors */}
      <div className="flex gap-3 border-b border-gft-border-dark pb-4">
        {["student", "personal", "business"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeTab === tab
                ? "bg-gft-primary text-white border-gft-primary shadow-sm"
                : "bg-white/5 border-white/10 text-white/70 hover:border-gft-primary/45"
            }`}
          >
            {tab} Packages
          </button>
        ))}
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activePackages.map((pkg, idx) => {
          const isBuyingThis = buying === pkg.name;

          return (
            <div
              key={pkg.id}
              className="bg-gft-card-dark border-2 border-gft-border-dark rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-gft-primary/45 transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center mb-4">
                  <Gift className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-gft-primary font-bold uppercase tracking-wide">{activeTab} tier</span>
                <h3 className="text-lg font-bold text-white mt-1">{pkg.name}</h3>
                <h2 className="text-3xl font-black text-white mt-2 tracking-tight">
                  ₹{pkg.amount.toLocaleString()}
                </h2>

                <div className="flex flex-col gap-3 mt-6 border-t border-white/5 pt-6 text-xs text-white/80">
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Monthly Return %</span>
                    <span className="font-bold text-gft-primary">{pkg.roi}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Monthly Profit</span>
                    <span className="font-bold text-gft-primary">₹{pkg.monthlyReturn.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">GFT Tokens</span>
                    <span className="font-bold text-gft-accent flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5" /> {pkg.tokens} GFT
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Staking Term</span>
                    <span className="font-bold">{pkg.duration} Months</span>
                  </div>
                </div>
              </div>

              <button
                disabled={isBuyingThis}
                onClick={() => handlePurchase(pkg.name, pkg.amount)}
                className="w-full font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all mt-8 cursor-pointer text-center bg-gft-primary hover:bg-gft-accent text-white shadow-md"
              >
                {isBuyingThis ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "Activate Package"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Packages Table */}
      <div className="bg-gft-card-dark border border-gft-border-dark rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-white mb-6">Your Active Package Stakes</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[11px] font-extrabold uppercase tracking-wider text-white/40 bg-white/5">
                <th className="py-3.5 px-4 rounded-l-xl">Package Name</th>
                <th className="py-3.5 px-4">Stake Amount</th>
                <th className="py-3.5 px-4">Activation Date</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4 text-center rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-white">{pkg.name}</td>
                  <td className="py-4 px-4 font-extrabold text-gft-primary">₹{pkg.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-white/60">{pkg.activationDate}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-white/60">{pkg.expiryDate}</td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex px-2.5 py-1 bg-gft-primary/10 text-gft-primary border border-gft-primary/25 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {pkg.status}
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
