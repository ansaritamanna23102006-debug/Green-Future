"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Gift,
  CheckCircle,
  AlertTriangle,
  Coins,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  XCircle,
  Clock,
  ArrowRight,
  FileCheck,
  ShieldAlert,
  Layers,
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function PackagesPage() {
  const {
    studentPackages,
    personalPackages,
    businessPackages,
    packages,
    user,
    createPackageOrder,
    fetchUserOrders,
    initiateOrderPayment,
    verifyOrderPayment,
  } = useApp();

  const [activeTab, setActiveTab] = useState("student");
  const [userOrders, setUserOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Checkout modal state
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Review, 2: Payment, 3: Result
  const [activeOrder, setActiveOrder] = useState(null);
  const [paymentSession, setPaymentSession] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [modalError, setModalError] = useState("");
  const [activationResult, setActivationResult] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    const res = await fetchUserOrders();
    if (res.success && res.data) {
      setUserOrders(res.data.orders || []);
    }
    setLoadingOrders(false);
  }, [fetchUserOrders]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const getActivePackages = () => {
    if (activeTab === "student") return studentPackages;
    if (activeTab === "personal") return personalPackages;
    return businessPackages;
  };

  const activePackages = getActivePackages();

  const handleOpenCheckout = (pkg) => {
    setSelectedPkg(pkg);
    setCheckoutStep(1);
    setActiveOrder(null);
    setPaymentSession(null);
    setModalError("");
    setActivationResult(null);
  };

  const handleCloseModal = () => {
    setSelectedPkg(null);
    setCheckoutStep(1);
    setActiveOrder(null);
    setPaymentSession(null);
    setModalError("");
    setActivationResult(null);
    loadOrders();
  };

  // Step 1: Create Order on backend
  const handleCreateOrder = async () => {
    if (!selectedPkg) return;
    setProcessing(true);
    setModalError("");

    const res = await createPackageOrder(selectedPkg.id || selectedPkg.name, null, true);
    setProcessing(false);

    if (res.success && res.data) {
      setActiveOrder(res.data);
      // Auto initiate payment session
      setProcessing(true);
      const payRes = await initiateOrderPayment(res.data.orderId, "SANDBOX_MOCK_ADAPTER");
      setProcessing(false);

      if (payRes.success && payRes.data) {
        setPaymentSession(payRes.data);
        setCheckoutStep(2);
      } else {
        setModalError(payRes.error || "Failed to initiate payment session");
      }
    } else {
      setModalError(res.error || "Failed to create order on server");
    }
  };

  // Step 2: Confirm / Verify Payment
  const handleVerifyPayment = async () => {
    if (!activeOrder || !paymentSession) return;
    setProcessing(true);
    setModalError("");

    const verifyPayload = {
      orderId: activeOrder.orderId,
      paymentId: paymentSession.payment?.paymentId || paymentSession.paymentInstructions?.paymentId,
      providerReference: paymentSession.paymentInstructions?.providerReference || paymentSession.payment?.providerReference,
      amountPaid: activeOrder.amount,
      currency: activeOrder.currency,
    };

    const res = await verifyOrderPayment(verifyPayload);
    setProcessing(false);

    if (res.success && res.data) {
      setActivationResult(res.data);
      setCheckoutStep(3);
      loadOrders();
    } else {
      setModalError(res.error || "Payment verification failed");
    }
  };

  return (
    <div className="flex flex-col gap-8 select-none text-white">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Affiliate Staking Packages</h1>
        <p className="text-white/60 text-sm mt-1">
          Backend-authoritative investment packages. Orders are securely generated and verified before activation.
        </p>
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

      {/* Package Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activePackages.map((pkg) => (
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
              onClick={() => handleOpenCheckout(pkg)}
              className="w-full font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all mt-8 cursor-pointer text-center bg-gft-primary hover:bg-gft-accent text-white shadow-md flex items-center justify-center gap-2"
            >
              <span>Acquire Package</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Authoritative Orders History Table */}
      <div className="bg-gft-card-dark border border-gft-border-dark rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-gft-primary" />
            Your Authoritative Orders & Activation Records
          </h3>
          <button
            onClick={loadOrders}
            className="text-xs text-white/60 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loadingOrders ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-extrabold uppercase tracking-wider text-white/40 bg-white/5">
                <th className="py-3 px-4 rounded-l-xl">Order ID</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Authoritative Amount</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Activation Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {userOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-white/40 text-xs">
                    No orders recorded yet. Acquire a package above to begin.
                  </td>
                </tr>
              ) : (
                userOrders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white/90">{ord.orderId}</td>
                    <td className="py-3.5 px-4 text-white font-semibold">
                      {ord.packageSnapshot?.name || ord.packageId}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-gft-primary">
                      ₹{ord.amount?.toLocaleString()} {ord.currency}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                          ord.paymentStatus === "CONFIRMED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase border ${
                          ord.orderStatus === "ACTIVATED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : ord.orderStatus === "ACTIVATION_BLOCKED"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {ord.orderStatus.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-white/60 text-[11px]">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Step Checkout Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-[#082E2B] border border-gft-border-dark rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gft-primary/20 text-gft-accent flex items-center justify-center">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Order Checkout: {selectedPkg.name}</h3>
                  <p className="text-xs text-white/60">Step {checkoutStep} of 3 — Secure Order Engine</p>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1 text-white/40 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs text-white/80">
              {modalError && (
                <div className="p-3 bg-rose-500/15 border border-rose-500/30 text-rose-300 rounded-xl text-xs flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Step 1: Review & Disclaimer */}
              {checkoutStep === 1 && (
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-2">
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Package Terms</p>
                    <div className="flex justify-between items-center text-sm font-bold text-white">
                      <span>{selectedPkg.name} ({activeTab} tier)</span>
                      <span className="text-gft-accent text-lg">₹{selectedPkg.amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/60">
                      <span>Duration / Lock-In:</span>
                      <span>12 Months (365 Days)</span>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-200 text-[11px] space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5 text-amber-300">
                      <ShieldCheck className="h-4 w-4" /> Compliance & Business Freeze Notice
                    </p>
                    <p>
                      Authoritative package prices and lock-in rules are resolved server-side. Packages are governed by master business specifications.
                    </p>
                  </div>

                  <button
                    onClick={handleCreateOrder}
                    disabled={processing}
                    className="w-full py-3.5 bg-gft-primary hover:bg-gft-primary-hover text-white font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 text-xs"
                  >
                    {processing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    Confirm & Generate Authoritative Order
                  </button>
                </div>
              )}

              {/* Step 2: Payment Session */}
              {checkoutStep === 2 && activeOrder && (
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Order ID:</span>
                      <span className="font-mono font-bold text-white">{activeOrder.orderId}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Authoritative Amount:</span>
                      <span className="font-bold text-gft-accent">₹{activeOrder.amount?.toLocaleString()} {activeOrder.currency}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-white/40">Payment Status:</span>
                      <span className="font-bold text-amber-400">{activeOrder.paymentStatus}</span>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl text-blue-200 text-[11px] space-y-2">
                    <p className="font-bold flex items-center gap-1.5 text-blue-300">
                      <CreditCard className="h-4 w-4" /> Sandbox Payment Simulation
                    </p>
                    <p>
                      External live payment gateways are currently disabled. A server-controlled sandbox test adapter will record and verify this transaction.
                    </p>
                    {paymentSession?.paymentInstructions?.providerReference && (
                      <p className="font-mono text-[10px] text-blue-300/80 break-all bg-black/20 p-2 rounded-lg">
                        Ref: {paymentSession.paymentInstructions.providerReference}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleVerifyPayment}
                    disabled={processing}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 text-xs"
                  >
                    {processing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                    Simulate & Verify Sandbox Payment
                  </button>
                </div>
              )}

              {/* Step 3: Result & Activation Status */}
              {checkoutStep === 3 && activationResult && (
                <div className="space-y-4">
                  {activationResult.activation?.activated ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl text-emerald-300 space-y-2 text-center">
                      <CheckCircle className="h-10 w-10 text-emerald-400 mx-auto" />
                      <h4 className="font-bold text-base text-white">Package Successfully Activated!</h4>
                      <p className="text-xs text-emerald-300/80">
                        Payment was verified and your package stake is officially active.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-2xl text-orange-200 space-y-3">
                      <div className="flex items-center gap-2 text-orange-300 font-bold text-sm">
                        <ShieldAlert className="h-5 w-5 text-orange-400 shrink-0" />
                        <span>Payment Confirmed — Activation Paused</span>
                      </div>
                      <p className="text-xs text-orange-200/90 leading-relaxed">
                        {activationResult.activation?.message || "Package activation is currently in ACTIVATION_BLOCKED state."}
                      </p>
                      <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1 text-[11px] text-white/70">
                        <p><strong>Reason:</strong> {activationResult.activation?.reason}</p>
                        <p className="text-[10px] text-white/50">
                          Order status: <strong>ACTIVATION_BLOCKED</strong>. In strict compliance with financial safety rules, zero commission payouts, wallet deductions, or sales volumes were executed.
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all cursor-pointer text-xs"
                  >
                    Close & View Orders
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
