"use client";

import React, { useState } from "react";
import { Gift, CheckCircle, ShieldAlert, Award, ArrowUpRight, Coins } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function PackagesPage() {
  const { packages, buyPackage, user } = useApp();
  const [buying, setBuying] = useState(null);

  const availablePackages = [
    { name: "Starter Eco", amount: 100, yield: "0.8% Daily", tokenMultiplier: "5x Tokens", duration: "365 Days", color: "from-emerald-500/10 to-teal-500/10", border: "hover:border-emerald-500" },
    { name: "Growth Green", amount: 500, yield: "1.0% Daily", tokenMultiplier: "5x Tokens", duration: "365 Days", color: "from-green-500/10 to-emerald-600/10", border: "hover:border-green-500" },
    { name: "Apex Forest", amount: 2500, yield: "1.2% Daily", tokenMultiplier: "5x Tokens", duration: "365 Days", color: "from-teal-600/10 to-gft-dark/10", border: "hover:border-gft-primary" },
    { name: "Sovereign Canopy", amount: 10000, yield: "1.5% Daily", tokenMultiplier: "5x Tokens", duration: "365 Days", color: "from-gft-primary/10 to-gft-accent/10", border: "hover:border-gft-accent" }
  ];

  const handlePurchase = (pkgName, amount) => {
    const confirm = window.confirm(`Confirm purchase of ${pkgName} package for $${amount}?`);
    if (confirm) {
      setBuying(pkgName);
      setTimeout(() => {
        buyPackage(pkgName, amount);
        setBuying(null);
        alert(`Successfully purchased ${pkgName} package. $${amount} added to Turnover and GFT token yields distributed.`);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Affiliate Packages</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Upgrade your green energy stake. Higher packages yield daily returns and boost binary limits.</p>
      </div>

      {/* Package Tier Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availablePackages.map((pkg, idx) => {
          const isBuyingThis = buying === pkg.name;
          const isApex = pkg.name === "Apex Forest";

          return (
            <div
              key={idx}
              className={`bg-white border-2 border-gft-gray-light rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group ${pkg.border} ${
                isApex ? "border-gft-primary ring-2 ring-gft-primary/10" : ""
              }`}
            >
              {/* Highlight ribbon for Apex */}
              {isApex && (
                <span className="absolute top-3 right-[-30px] bg-gft-primary text-white text-[9px] font-bold uppercase tracking-widest px-8 py-1.5 rotate-45 select-none shadow">
                  Popular
                </span>
              )}

              {/* Top details */}
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gft-light flex items-center justify-center text-gft-dark mb-4`}>
                  <Gift className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-gft-deep">{pkg.name}</h3>
                <h2 className="text-3xl font-extrabold text-gft-deep mt-2 tracking-tight">
                  ${pkg.amount.toLocaleString()}
                </h2>

                <div className="flex flex-col gap-3.5 mt-6 border-t border-gft-gray-light pt-6 text-xs text-gft-deep/85">
                  <div className="flex justify-between items-center">
                    <span className="text-gft-deep/45">Passive Returns</span>
                    <span className="font-bold text-gft-primary">{pkg.yield}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gft-deep/45">Staking Bonus</span>
                    <span className="font-bold text-gft-accent flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5" /> {pkg.tokenMultiplier}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gft-deep/45">Staking Term</span>
                    <span className="font-bold">{pkg.duration}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <button
                disabled={isBuyingThis}
                onClick={() => handlePurchase(pkg.name, pkg.amount)}
                className={`w-full font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all mt-8 cursor-pointer text-center ${
                  isApex || pkg.name === "Sovereign Canopy"
                    ? "bg-gft-primary hover:bg-gft-accent text-white shadow-md shadow-gft-primary/10"
                    : "bg-gft-light hover:bg-gft-gray-light text-gft-dark border border-gft-gray-light"
                }`}
              >
                {isBuyingThis ? (
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  "Stake Package"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Packages Table */}
      <div className="bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-gft-deep mb-6">Your Active Package Stakes</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                <th className="py-3.5 px-4 rounded-l-xl">Package Name</th>
                <th className="py-3.5 px-4">Stake Amount</th>
                <th className="py-3.5 px-4">Activation Date</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4 text-center rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, i) => (
                <tr key={i} className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors">
                  <td className="py-4 px-4 font-bold text-gft-deep">{pkg.name}</td>
                  <td className="py-4 px-4 font-extrabold text-gft-primary">${pkg.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-gft-deep/60">{pkg.activationDate}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-gft-deep/60">{pkg.expiryDate}</td>
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
