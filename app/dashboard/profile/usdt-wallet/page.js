"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, ChevronLeft, AlertTriangle, Check, Copy } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function USDTWalletPage() {
  const router = useRouter();
  const { user, updateUSDTWallet } = useApp();

  const [address, setAddress] = useState(user?.usdtWallet || "");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      updateUSDTWallet(address);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/dashboard/profile");
      }, 1500);
    }, 800);
  };

  const handleCopy = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto select-none">
      {/* Back button */}
      <button
        onClick={() => router.push("/dashboard/profile")}
        className="flex items-center gap-1.5 text-xs font-bold text-gft-deep/60 hover:text-gft-primary transition-colors cursor-pointer self-start"
      >
        <ChevronLeft className="h-4.5 w-4.5" /> Back to Profile
      </button>

      <div className="bg-white border border-gft-gray-light rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3.5 mb-6 border-b border-gft-gray-light pb-4">
          <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
            <Wallet className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gft-deep">USDT Settlement Address</h1>
            <p className="text-xs text-gft-deep/45">Configure ERC-20 / TRC-20 digital withdrawal addresses.</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-gft-primary/10 border border-gft-primary/20 text-gft-primary text-xs font-bold rounded-2xl">
            USDT Wallet address configured successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Vector QR preview */}
            <div className="w-32 h-32 bg-white border border-gft-gray-light rounded-2xl flex items-center justify-center p-2 shadow-sm shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-gft-deep">
                <path d="M0 0h30v30H0zm5 5v20h20V5zm2 2h16v16H7zm63-7h30v30H70zm5 5v20h20V5zm2 2h16v16H72zM0 70h30v30H0zm5 5v20h20V75zm2 2h16v16H7zm43-7h5v5h-5zm10 5h5v10h-5zm0 15h10v5H80zm5-10h15v5H85zm10-5h5v5h-5zm-5-5h5v5h-5zm-15-5h10v5H70zm15 15h5v5h-5zm-25 5h5v5h-5zm5-15h5v5h-5zm5-10h15v5H85z" />
                <rect x="40" y="40" width="20" height="20" fill="#65B300" rx="3" />
              </svg>
            </div>

            <div className="flex flex-col gap-4 flex-1 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">USDT Recipient Wallet</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter 0x... address"
                    className="w-full bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[13px] outline-none font-mono focus:border-gft-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="bg-white border border-gft-gray-light hover:bg-gft-light p-3 rounded-xl transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-4.5 w-4.5 text-gft-primary" /> : <Copy className="h-4.5 w-4.5 text-gft-dark" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 text-[10px] font-semibold text-amber-600 bg-amber-500/10 border border-amber-500/15 p-3.5 rounded-xl">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                <span>IMPORTANT: Ensure the address is correct. GFT cannot reverse transactions sent to wrong addresses.</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end border-t border-gft-gray-light pt-6">
            <button
              type="button"
              onClick={() => router.push("/dashboard/profile")}
              className="bg-gft-light hover:bg-gft-gray-light border border-gft-gray-light text-gft-dark font-bold text-xs uppercase px-6 py-3.5 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gft-primary hover:bg-gft-accent text-white font-bold text-xs uppercase px-6 py-3.5 rounded-xl cursor-pointer shadow-lg shadow-gft-primary/10"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Save Address"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
