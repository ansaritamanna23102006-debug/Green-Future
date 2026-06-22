"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { UserCheck, Shield, ChevronRight, ChevronLeft, Mail, Phone, Lock, Sparkles, UserPlus } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import GFTLogo from "@/components/GFTLogo";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sponsorId: "",
    sponsorName: "",
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const [sponsorValidating, setSponsorValidating] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const stepRef = useRef(null);

  // Animate whole box on mount
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  // Animate steps slide-in on change
  useEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, x: 15 },
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [step]);

  // Simulate sponsor verification lookup
  useEffect(() => {
    if (formData.sponsorId.length >= 6) {
      setSponsorValidating(true);
      setError("");
      const timer = setTimeout(() => {
        setSponsorValidating(false);
        if (formData.sponsorId.toUpperCase() === "GFT100201") {
          setFormData((prev) => ({ ...prev, sponsorName: "Elena Rostova (Emerald Director)" }));
        } else {
          setFormData((prev) => ({ ...prev, sponsorName: `Sponsor Agent #${formData.sponsorId.slice(-3)}` }));
        }
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setFormData((prev) => ({ ...prev, sponsorName: "" }));
    }
  }, [formData.sponsorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setError("");
    if (step === 1) {
      if (!formData.sponsorId) {
        setError("Sponsor ID is required.");
        return;
      }
      if (!formData.sponsorName) {
        setError("Please enter a valid Sponsor ID.");
        return;
      }
    } else if (step === 2) {
      if (!formData.fullName || !formData.email || !formData.mobile) {
        setError("Please fill in all personal details.");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Please enter a valid email address.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      registerUser(formData);
      setLoading(false);
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gft-dark-bg via-[#072F2B] to-gft-deep p-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gft-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gft-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 flex flex-col gap-6">
        <div className="flex justify-center">
          <Link href="/">
            <GFTLogo className="h-10 w-auto" light={true} />
          </Link>
        </div>

        {/* Step Indicator Panel */}
        <div className="flex justify-between items-center px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s
                    ? "bg-gft-primary text-white scale-110 shadow-md shadow-gft-primary/20"
                    : "bg-white/5 border border-white/10 text-white/50"
                }`}
              >
                {s}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider hidden sm:inline ${step >= s ? "text-white" : "text-white/40"}`}>
                {s === 1 ? "Sponsor" : s === 2 ? "Identity" : "Security"}
              </span>
            </div>
          ))}
        </div>

        <div
          ref={containerRef}
          className="glass-panel-dark p-8 sm:p-10 rounded-3xl glow-green opacity-0"
        >
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div ref={stepRef}>
              {/* STEP 1: SPONSOR INFORMATION */}
              {step === 1 && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-gft-accent" /> Referral Invitation
                    </h2>
                    <p className="text-white/60 text-xs sm:text-sm">
                      Please enter the Sponsor ID of the affiliate member who invited you.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                      Sponsor ID
                    </label>
                    <input
                      type="text"
                      name="sponsorId"
                      placeholder="e.g. GFT100201"
                      value={formData.sponsorId}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all uppercase"
                      required
                    />
                  </div>

                  {sponsorValidating && (
                    <p className="text-xs text-gft-accent animate-pulse">Verifying Sponsor ID...</p>
                  )}

                  {formData.sponsorName && (
                    <div className="p-4 bg-gft-primary/10 border border-gft-primary/20 rounded-2xl flex items-center gap-3 text-gft-accent">
                      <UserCheck className="h-5 w-5" />
                      <div className="flex flex-col">
                        <span className="text-xs uppercase text-white/60 font-bold tracking-wide">Sponsor Name</span>
                        <span className="text-[14px] font-bold text-white">{formData.sponsorName}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-gft-primary hover:bg-gft-accent text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all mt-4 cursor-pointer"
                  >
                    Continue Onboarding
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* STEP 2: PERSONAL IDENTITY */}
              {step === 2 && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-white">Personal Identity</h2>
                    <p className="text-white/60 text-xs sm:text-sm">Provide your official name and contact information.</p>
                  </div>

                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Alexander Pierce"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/45">
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="alexander@gft.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/45">
                        <Phone className="h-5 w-5" />
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      Next Step <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SECURITY & SUBMIT */}
              {step === 3 && (
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-white">Account Security</h2>
                    <p className="text-white/60 text-xs sm:text-sm">Set up your access password to complete the registration.</p>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/45">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/45">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed mt-2">
                    By clicking Register, you accept GFT's Terms of Service and consent to KYC checks for wallet eligibility.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-gft-primary/20"
                    >
                      {loading ? (
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <UserPlus className="h-5 w-5" /> Register
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Auth footer links */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-gft-primary hover:text-gft-accent transition-colors">
              Sign In Instead
            </Link>
          </div>
        </div>

        {/* Security assurance */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/40">
          <Shield className="h-4 w-4" /> COMPLIANT WITH ANTI-MONEY LAUNDERING (AML) STANDARDS
        </div>
      </div>
    </div>
  );
}
