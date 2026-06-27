"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowDownToLine, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  HelpCircle,
  TrendingUp,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Building,
  Coins
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import Link from "next/link";

export default function WithdrawPage() {
  const { user, withdrawals = [], requestWithdrawal } = useApp();
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("USDT_WALLET");
  const [paymentDetails, setPaymentDetails] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill USDT address if selected and user has configured it
  useEffect(() => {
    if (paymentMethod === "USDT_WALLET" && user?.usdtWallet) {
      setPaymentDetails(user.usdtWallet);
    } else {
      setPaymentDetails("");
    }
  }, [paymentMethod, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setErrorMsg("Please enter a valid withdrawal amount.");
      setLoading(false);
      return;
    }

    if (withdrawalAmount > (user?.balance?.personalIncome || 0)) {
      setErrorMsg("Insufficient funds in your income wallet.");
      setLoading(false);
      return;
    }

    const res = await requestWithdrawal(withdrawalAmount, paymentMethod, paymentDetails);
    
    setLoading(false);
    if (res.success) {
      setSuccessMsg("Withdrawal request submitted successfully!");
      setAmount("");
      if (paymentMethod !== "USDT_WALLET") {
        setPaymentDetails("");
      }
    } else {
      setErrorMsg(res.error || "Failed to submit withdrawal request. Please try again.");
    }
  };

  const isKycApproved = user?.kyc?.status === "approved";

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep flex items-center gap-3">
          <ArrowDownToLine className="text-gft-primary" />
          Withdrawal Portal
        </h1>
        <p className="text-gft-deep/60 text-sm mt-1">
          Withdraw earnings securely from your Income Wallet to your USDT wallet or Bank account.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Wallet Balance */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">Income Wallet Balance</span>
            <div className="p-2 rounded-xl bg-gft-primary/10 text-gft-primary">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-gft-deep tracking-tight">
              ₹{(user?.balance?.personalIncome || 0).toLocaleString()}
            </h3>
            <span className="text-[10px] font-bold text-gft-primary block mt-2">Available for immediate withdrawal</span>
          </div>
        </div>

        {/* KYC Status Card */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">KYC Status</span>
            <div className={`p-2 rounded-xl ${isKycApproved ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h3 className={`text-xl font-bold tracking-tight uppercase ${isKycApproved ? "text-emerald-600" : "text-amber-500"}`}>
              {user?.kyc?.status ? user.kyc.status : "Not Submitted"}
            </h3>
            {!isKycApproved && (
              <Link href="/dashboard/profile/kyc" className="text-[10px] font-bold text-gft-primary hover:text-gft-accent flex items-center gap-1 mt-2">
                Complete Verification <ArrowRight className="h-3 w-3" />
              </Link>
            )}
            {isKycApproved && (
              <span className="text-[10px] font-bold text-emerald-600 block mt-2">Withdrawals Enabled</span>
            )}
          </div>
        </div>

        {/* Withdrawal Settings Card */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-gft-deep/50">Withdrawal Terms</span>
            <div className="p-2 rounded-xl bg-gft-light text-gft-dark">
              <HelpCircle className="h-5 w-5" />
            </div>
          </div>
          <div className="text-xs leading-relaxed text-gft-deep/80 font-medium">
            <div className="flex justify-between border-b border-gft-light pb-1.5 mb-1.5">
              <span>Min. Withdrawal</span>
              <span className="font-bold text-gft-deep">₹500</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Time</span>
              <span className="font-bold text-gft-primary">12-24 Hours</span>
            </div>
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
                Under financial regulations, you must complete and receive approval for your KYC verification before requesting any payouts.
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

              {/* Payment Method */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("USDT_WALLET")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      paymentMethod === "USDT_WALLET"
                        ? "bg-gft-primary/5 border-gft-primary text-gft-primary"
                        : "bg-white border-gft-gray-light text-gft-deep/60 hover:bg-gft-light"
                    }`}
                  >
                    <Coins className="h-4 w-4" />
                    USDT Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("BANK_TRANSFER")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      paymentMethod === "BANK_TRANSFER"
                        ? "bg-gft-primary/5 border-gft-primary text-gft-primary"
                        : "bg-white border-gft-gray-light text-gft-deep/60 hover:bg-gft-light"
                    }`}
                  >
                    <Building className="h-4 w-4" />
                    Bank Transfer
                  </button>
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  min="500"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Minimum ₹500"
                  className="w-full bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[13px] font-semibold outline-none focus:border-gft-primary"
                  required
                />
              </div>

              {/* Payment Details */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">
                  {paymentMethod === "USDT_WALLET" ? "USDT Address (USDT-TRC20)" : "Bank Transfer Details"}
                </label>
                <textarea
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder={
                    paymentMethod === "USDT_WALLET"
                      ? "Enter your TRC-20 USDT Wallet Address"
                      : "Account Holder Name:\nAccount Number:\nIFSC Code:\nBank Name & Branch:"
                  }
                  rows={4}
                  className="w-full bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[13px] font-medium outline-none focus:border-gft-primary resize-none"
                  required
                />
                {paymentMethod === "USDT_WALLET" && !user?.usdtWallet && (
                  <p className="text-[10px] text-gft-deep/45 font-medium leading-relaxed">
                    You can configure a default USDT address in your{" "}
                    <Link href="/dashboard/profile/usdt-wallet" className="text-gft-primary font-bold hover:underline">
                      Profile settings
                    </Link>
                    .
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gft-primary hover:bg-gft-accent text-white font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl cursor-pointer transition-colors flex justify-center items-center gap-2 shadow-lg shadow-gft-primary/10"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Request Withdrawal"
                )}
              </button>
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
                    <th className="py-3 px-4">Payout Method</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 rounded-r-xl">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w, index) => {
                    let statusColor = "bg-amber-500/10 text-amber-600 border-amber-500/20";
                    let statusText = "Pending";
                    let StatusIcon = Clock;

                    if (w.status === "approved") {
                      statusColor = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
                      statusText = "Approved";
                      StatusIcon = CheckCircle;
                    } else if (w.status === "rejected") {
                      statusColor = "bg-rose-500/10 text-rose-600 border-rose-500/20";
                      statusText = "Rejected";
                      StatusIcon = XCircle;
                    } else if (w.status === "cancelled") {
                      statusColor = "bg-gray-500/10 text-gray-600 border-gray-500/20";
                      statusText = "Cancelled";
                      StatusIcon = XCircle;
                    }

                    return (
                      <tr 
                        key={w._id || index} 
                        className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors"
                      >
                        <td className="py-4 px-4 font-bold text-gft-deep/60">
                          {new Date(w.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </td>
                        <td className="py-4 px-4 font-bold text-gft-deep">
                          {w.paymentMethod === "USDT_WALLET" ? "USDT (TRC20)" : "Bank Transfer"}
                        </td>
                        <td className="py-4 px-4 font-extrabold text-gft-primary">
                          ₹{w.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[9px] font-bold uppercase tracking-wider ${statusColor}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusText}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold text-gft-deep/45 max-w-[200px] truncate">
                          {w.status === "rejected" && w.rejectReason ? (
                            <span className="text-rose-600" title={w.rejectReason}>Reason: {w.rejectReason}</span>
                          ) : w.status === "approved" && w.txHash ? (
                            <span className="font-mono text-[10px]" title={w.txHash}>Hash: {w.txHash}</span>
                          ) : (
                            <span title={w.details}>{w.details}</span>
                          )}
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
