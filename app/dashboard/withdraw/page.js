"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowDownToLine, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  HelpCircle, 
  Wallet, 
  ArrowRight, 
  ShieldCheck, 
  Coins, 
  Lock, 
  Info 
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import Link from "next/link";

export default function WithdrawPage() {
  const { user, withdrawals = [], requestWithdrawal, authoritativeRules } = useApp();
  const [amount, setAmount] = useState("");
  const [destinationType, setDestinationType] = useState("USDT");
  const [destinationReference, setDestinationReference] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Check if withdrawal rule is confirmed and executable
  const isWithdrawalExecutable = authoritativeRules?.withdrawalStatus?.executable === true;

  // Pre-fill USDT address if selected and user has configured it
  useEffect(() => {
    if (destinationType === "USDT" && user?.usdtWallet) {
      setDestinationReference(user.usdtWallet);
    } else if (destinationType === "USDT" && !destinationReference) {
      setDestinationReference("");
    }
  }, [destinationType, user]);

  const kycStatus = String(user?.kyc?.status || user?.kycStatus?.status || "").toUpperCase();
  const isKycApproved = kycStatus === "APPROVED";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    if (!isWithdrawalExecutable) {
      setErrorMsg("Withdrawal limits and fee structure are pending final business confirmation.");
      setLoading(false);
      return;
    }

    if (!isKycApproved) {
      setErrorMsg("KYC must be APPROVED before requesting withdrawals.");
      setLoading(false);
      return;
    }

    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setErrorMsg("Please enter a valid withdrawal amount.");
      setLoading(false);
      return;
    }

    const availableBalance = user?.wallet?.availableRupees 
      ? parseFloat(user.wallet.availableRupees) 
      : (user?.balance?.personalIncome || 0);

    if (withdrawalAmount > availableBalance) {
      setErrorMsg("Insufficient available funds in your ledger wallet.");
      setLoading(false);
      return;
    }

    const res = await requestWithdrawal(withdrawalAmount, destinationType, destinationReference);
    
    setLoading(false);
    if (res.success) {
      setSuccessMsg("Withdrawal request submitted successfully and logged to audit ledger.");
      setAmount("");
      if (destinationType !== "USDT") {
        setDestinationReference("");
      }
    } else {
      // Map safe backend error codes
      const errorMap = {
        REQUIRES_CLIENT_CONFIRMATION: "Business plan or withdrawal rules are pending client confirmation.",
        KYC_REQUIRED: "Approved KYC identity verification is required before requesting payouts.",
        RULE_NOT_EXECUTABLE: "Withdrawal engine is currently non-executable under Phase 0 governance.",
        PAYMENT_REQUIRED: "Active package activation is required to authorize withdrawals.",
        PROVIDER_NOT_CONFIGURED: "Payout provider is not currently active.",
        WITHDRAWAL_BLOCKED: "Withdrawals are currently blocked by system safety controls.",
      };

      setErrorMsg(errorMap[res.errorCode] || res.error || "Withdrawal limits and fee structure are pending final business confirmation.");
    }
  };

  const getStatusBadge = (status) => {
    const s = String(status).toUpperCase();
    switch (s) {
      case "COMPLETED":
        return { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Completed", icon: CheckCircle };
      case "APPROVED":
        return { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Approved", icon: CheckCircle };
      case "PROCESSING":
        return { color: "bg-indigo-50 text-indigo-700 border-indigo-200", label: "Processing", icon: Clock };
      case "UNDER_REVIEW":
        return { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Under Review", icon: Clock };
      case "REJECTED":
        return { color: "bg-rose-50 text-rose-700 border-rose-200", label: "Rejected", icon: XCircle };
      case "CANCELLED":
        return { color: "bg-gray-100 text-gray-600 border-gray-200", label: "Cancelled", icon: XCircle };
      default:
        return { color: "bg-amber-50 text-amber-700 border-amber-200", label: "Requested", icon: Clock };
    }
  };

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep flex items-center gap-3">
          <ArrowDownToLine className="text-gft-primary" />
          Withdrawal Portal
        </h1>
        <p className="text-gft-deep/60 text-sm mt-1">
          Internal double-entry ledger withdrawal requests. Subject to strict Phase 0 business confirmation and verified KYC.
        </p>
      </div>

      {/* Governance Banner */}
      {!isWithdrawalExecutable && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block font-bold">Withdrawal Configuration Pending</strong>
            <p>
              Withdrawal limits and fee structure are pending final business confirmation. Financial submissions are paused until corporate and provider sign-off.
            </p>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Ledger Balance */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">Available Ledger Balance</span>
            <div className="p-2 rounded-xl bg-gft-primary/10 text-gft-primary">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-gft-deep tracking-tight">
              ₹{user?.wallet?.availableRupees || (user?.balance?.personalIncome || 0).toLocaleString()}
            </h3>
            <span className="text-[10px] font-bold text-gft-deep/50 block mt-2">
              Authoritative backend balance: {user?.wallet?.availablePaisa || 0} Paisa
            </span>
          </div>
        </div>

        {/* KYC Status Card */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">KYC Verification Gate</span>
            <div className={`p-2 rounded-xl ${isKycApproved ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className={`text-xl font-bold tracking-tight uppercase ${isKycApproved ? "text-emerald-600" : "text-amber-600"}`}>
              {kycStatus || "NOT_STARTED"}
            </h3>
            {!isKycApproved ? (
              <Link href="/dashboard/profile/kyc" className="text-[10px] font-bold text-gft-primary hover:text-gft-accent flex items-center gap-1 mt-2">
                Complete Verification <ArrowRight className="h-3 w-3" />
              </Link>
            ) : (
              <span className="text-[10px] font-bold text-emerald-600 block mt-2">KYC Identity Verified</span>
            )}
          </div>
        </div>

        {/* Withdrawal Settings Card */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">Rule Policy Status</span>
            <div className="p-2 rounded-xl bg-gft-light text-gft-dark">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs text-gft-deep/80 leading-relaxed font-medium">
            <span className="inline-block text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md font-semibold mb-2">
              Pending Business Confirmation
            </span>
            <p className="text-[11px] text-gft-deep/60">
              Withdrawal limits and fee structure are pending final business confirmation.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Withdrawal Form */}
        <div className="lg:col-span-5 bg-white border border-gft-gray-light p-6 rounded-3xl shadow-sm">
          <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wide border-b border-gft-gray-light pb-3 mb-6">
            Request Payout
          </h3>

          {!isKycApproved ? (
            <div className="flex flex-col gap-4 text-xs font-semibold text-amber-700 bg-amber-500/10 border border-amber-500/15 p-5 rounded-2xl">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <span>KYC VERIFICATION REQUIRED</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800/80 font-medium">
                Under financial safety regulations, your KYC status must be APPROVED before requesting any payouts.
              </p>
              <Link 
                href="/dashboard/profile/kyc" 
                className="mt-2 w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Go to KYC Upload
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {successMsg && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold rounded-xl flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  {successMsg}
                </div>
              )}

              {errorMsg && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2">
                  <XCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              {/* Destination Type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">Destination Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDestinationType("USDT")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      destinationType === "USDT"
                        ? "bg-gft-primary/5 border-gft-primary text-gft-primary"
                        : "bg-white border-gft-gray-light text-gft-deep/60 hover:bg-gft-light"
                    }`}
                  >
                    <Coins className="h-4 w-4" />
                    USDT (TRC-20)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDestinationType("INR_BANK")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      destinationType === "INR_BANK"
                        ? "bg-gft-primary/5 border-gft-primary text-gft-primary"
                        : "bg-white border-gft-gray-light text-gft-deep/60 hover:bg-gft-light"
                    }`}
                  >
                    Bank Account
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in INR"
                  className="w-full bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[13px] font-semibold outline-none focus:border-gft-primary"
                  required
                />
              </div>

              {/* Destination Reference */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">
                  {destinationType === "USDT" ? "USDT Address (TRC-20)" : "Bank Account Details / IFSC"}
                </label>
                <textarea
                  value={destinationReference}
                  onChange={(e) => setDestinationReference(e.target.value)}
                  placeholder={
                    destinationType === "USDT"
                      ? "Enter your TRC-20 USDT Wallet Address"
                      : "Account Holder Name:\nAccount Number:\nIFSC Code:\nBank Name:"
                  }
                  rows={3}
                  className="w-full bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[13px] font-medium outline-none focus:border-gft-primary resize-none"
                  required
                />
              </div>

              {/* Submit / Execution Disabled Button */}
              <div className="flex flex-col gap-2 mt-2">
                <button
                  type="submit"
                  disabled={!isWithdrawalExecutable || loading}
                  className={`w-full font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl flex justify-center items-center gap-2 transition-all ${
                    !isWithdrawalExecutable
                      ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none"
                      : "bg-gft-primary hover:bg-gft-accent text-white cursor-pointer shadow-lg shadow-gft-primary/10"
                  }`}
                >
                  {loading ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : !isWithdrawalExecutable ? (
                    <span className="flex items-center gap-1.5">
                      <Lock size={13} /> Submissions Disabled (Pending Confirmation)
                    </span>
                  ) : (
                    "Request Withdrawal"
                  )}
                </button>
                {!isWithdrawalExecutable && (
                  <p className="text-[10px] text-center text-amber-800/80 font-medium">
                    Withdrawal limits and fee structure are pending final business confirmation.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* History Table */}
        <div className="lg:col-span-7 bg-white border border-gft-gray-light rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wide border-b border-gft-gray-light pb-3 mb-6">
            Withdrawal History
          </h3>

          <div className="overflow-x-auto">
            {withdrawals.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center gap-2 text-gft-deep/45">
                <Clock className="h-10 w-10 stroke-1" />
                <span className="text-xs font-bold">No withdrawal requests found</span>
                <p className="text-[10px] leading-relaxed text-gft-deep/30">Your payout requests will be recorded here.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gft-gray-light text-[10px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                    <th className="py-3 px-4 rounded-l-xl">Requested Date</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w, index) => {
                    const badge = getStatusBadge(w.status);
                    const BadgeIcon = badge.icon;

                    return (
                      <tr 
                        key={w.withdrawalId || w._id || index} 
                        className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors"
                      >
                        <td className="py-4 px-4 font-bold text-gft-deep/60">
                          {new Date(w.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-4 px-4 font-bold text-gft-deep">
                          {w.destinationType || "USDT"}
                        </td>
                        <td className="py-4 px-4 font-black text-gft-primary">
                          ₹{w.amountRupees || (w.amountPaisa ? (w.amountPaisa / 100).toFixed(2) : (w.amount || 0))}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${badge.color}`}>
                            <BadgeIcon className="h-3 w-3" />
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
