"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import {
  UserCheck,
  Shield,
  ChevronRight,
  ChevronLeft,
  Mail,
  Phone,
  Lock,
  Sparkles,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  MapPin,
  FileCheck,
  Clock,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import GFTLogo from "@/components/GFTLogo";

export default function RegisterPage() {
  const router = useRouter();
  const { validateSponsor, sendRegistrationOtp, verifyRegistrationOtp, registerUser } = useApp();

  // Wizard Step (1: Sponsor, 2: Contact Info, 3: OTP Verification, 4: Password, 5: Address, 6: Consent, 7: Completed)
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    sponsorId: "",
    sponsorName: "",
    noSponsor: false,
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    consentTerms: false,
    consentAml: false,
  });

  // OTP State
  const [otpInput, setOtpInput] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [sponsorValidating, setSponsorValidating] = useState(false);
  const [sponsorError, setSponsorError] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);

  const containerRef = useRef(null);
  const stepRef = useRef(null);

  // Cooldown countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Animate card on mount
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
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  // STEP 1: Verify Sponsor server-side
  const handleVerifySponsor = async () => {
    if (formData.noSponsor) {
      setFormData((prev) => ({ ...prev, sponsorId: "NONE", sponsorName: "Direct Company Placement" }));
      setSponsorError("");
      setStep(2);
      return;
    }

    const cleanSponsor = formData.sponsorId.trim();
    if (!cleanSponsor) {
      setSponsorError("Please enter a valid Sponsor ID or select direct placement.");
      return;
    }

    setSponsorValidating(true);
    setSponsorError("");

    const res = await validateSponsor(cleanSponsor);
    setSponsorValidating(false);

    if (res.valid) {
      setFormData((prev) => ({
        ...prev,
        sponsorId: res.sponsor.sponsorId,
        sponsorName: res.sponsor.sponsorName,
      }));
      setSponsorError("");
      setStep(2);
    } else {
      setSponsorError(res.message || "Invalid Sponsor ID. Please confirm with your inviter.");
    }
  };

  // STEP 2: Submit Contact & Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.mobile.trim()) {
      setError("Please complete all personal contact fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const mobileClean = formData.mobile.replace(/\D/g, "");
    if (mobileClean.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    const res = await sendRegistrationOtp(formData.email.trim().toLowerCase(), formData.mobile.trim());
    setLoading(false);

    if (res.success) {
      setSuccessMsg(res.message || "Verification code dispatched to your email & mobile.");
      setResendCooldown(60);
      setStep(3);
    } else {
      setError(res.message || "Failed to send verification code. Please try again.");
    }
  };

  // STEP 3: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const cleanOtp = otpInput.trim();
    if (cleanOtp.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    setLoading(true);
    const res = await verifyRegistrationOtp(formData.email.trim().toLowerCase(), cleanOtp);
    setLoading(false);

    if (res.success) {
      setVerificationToken(res.verificationToken);
      setSuccessMsg("Contact information verified successfully!");
      setStep(4);
    } else {
      setError(res.message || "Invalid verification code.");
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setLoading(true);
    const res = await sendRegistrationOtp(formData.email.trim().toLowerCase(), formData.mobile.trim());
    setLoading(false);

    if (res.success) {
      setSuccessMsg("A fresh 6-digit verification code has been dispatched.");
      setResendCooldown(60);
    } else {
      setError(res.message || "Could not resend OTP at this time.");
    }
  };

  // STEP 4: Password Creation
  const handlePasswordNext = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passRegex.test(formData.password)) {
      setError("Password must have at least 8 characters, including 1 uppercase, 1 lowercase, 1 number, and 1 special symbol.");
      return;
    }

    setStep(5);
  };

  // STEP 5: Address Details
  const handleAddressNext = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.address.trim() || !formData.city.trim() || !formData.state.trim()) {
      setError("Please provide your street address, city, and state.");
      return;
    }
    setStep(6);
  };

  // STEP 6: Consent & Final Registration
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.consentTerms || !formData.consentAml) {
      setError("You must accept the Terms of Service and Compliance Consent to proceed.");
      return;
    }

    if (!verificationToken) {
      setError("OTP verification token missing or expired. Please re-verify your contact details.");
      setStep(3);
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      mobile: formData.mobile.trim(),
      password: formData.password,
      sponsorId: formData.sponsorId,
      position: "left",
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      country: formData.country.trim() || "India",
      verificationToken,
    };

    const res = await registerUser(payload);
    setLoading(false);

    if (res && res.success) {
      setCreatedUser({
        name: formData.fullName,
        email: formData.email,
        sponsorId: formData.sponsorId,
      });
      setStep(7);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3500);
    } else {
      setError(res ? res.error : "Registration failed. Please try again.");
    }
  };

  // Step Labels
  const stepTitles = [
    { num: 1, title: "Sponsor" },
    { num: 2, title: "Contact" },
    { num: 3, title: "Verify OTP" },
    { num: 4, title: "Password" },
    { num: 5, title: "Address" },
    { num: 6, title: "Consent" },
  ];

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gft-dark-bg via-[#072F2B] to-gft-deep p-4 sm:p-6 overflow-hidden">
      {/* Abstract Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gft-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gft-accent/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 flex flex-col gap-6">
        <div className="flex justify-center">
          <Link href="/">
            <GFTLogo className="h-16 sm:h-20 w-auto" light={true} />
          </Link>
        </div>

        {/* Step Indicator Panel (Only shown during steps 1 to 6) */}
        {step <= 6 && (
          <div className="glass-panel-dark px-4 py-3 rounded-2xl border border-white/10 flex items-center justify-between overflow-x-auto">
            {stepTitles.map((s) => (
              <div key={s.num} className="flex items-center gap-1.5 shrink-0 px-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step === s.num
                      ? "bg-gft-accent text-[#06241E] scale-110 shadow-md shadow-gft-accent/30 font-black"
                      : step > s.num
                      ? "bg-gft-primary text-white"
                      : "bg-white/5 border border-white/10 text-white/40"
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                </div>
                <span
                  className={`text-[11px] font-semibold tracking-wide hidden sm:inline ${
                    step === s.num ? "text-white font-bold" : step > s.num ? "text-white/80" : "text-white/40"
                  }`}
                >
                  {s.title}
                </span>
                {s.num < 6 && <div className="h-0.5 w-2 sm:w-3 bg-white/10 mx-0.5 hidden sm:block" />}
              </div>
            ))}
          </div>
        )}

        <div
          ref={containerRef}
          className="glass-panel-dark p-6 sm:p-10 rounded-3xl glow-green opacity-0 shadow-2xl relative"
        >
          {error && (
            <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs sm:text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && step !== 7 && (
            <div className="mb-5 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm rounded-xl flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div ref={stepRef}>
            {/* STEP 1: SPONSOR / REFERRAL ID */}
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-gft-accent" /> Sponsor & Referral
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Enter your inviter&apos;s Sponsor ID to connect with your affiliate team.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                    Sponsor ID
                  </label>
                  <input
                    type="text"
                    name="sponsorId"
                    placeholder="e.g. GFT100201"
                    disabled={formData.noSponsor}
                    value={formData.sponsorId}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white outline-none focus:border-gft-primary uppercase disabled:opacity-40"
                  />
                  {sponsorError && <p className="text-xs text-rose-400 mt-0.5">{sponsorError}</p>}
                </div>

                <div className="flex items-center gap-2.5">
                  <input
                    id="noSponsor"
                    name="noSponsor"
                    type="checkbox"
                    checked={formData.noSponsor}
                    onChange={handleChange}
                    className="w-4 h-4 bg-white/5 border border-white/10 rounded accent-gft-primary cursor-pointer"
                  />
                  <label htmlFor="noSponsor" className="text-xs text-white/70 cursor-pointer">
                    I don&apos;t have a Sponsor ID (Direct Company Registration)
                  </label>
                </div>

                <button
                  type="button"
                  disabled={sponsorValidating}
                  onClick={handleVerifySponsor}
                  className="w-full bg-gft-primary hover:bg-gft-accent text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer shadow-lg shadow-gft-primary/20"
                >
                  {sponsorValidating ? "Verifying Sponsor..." : "Validate Sponsor & Continue"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* STEP 2: REGISTRATION CONTACT INFO */}
            {step === 2 && (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">Affiliate Identity</h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Sponsor verified: <strong className="text-gft-accent">{formData.sponsorName || formData.sponsorId}</strong>
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full legal name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                    <input
                      type="email"
                      name="email"
                      placeholder="alexander@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-white/40" />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="9876543210"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer shadow-lg shadow-gft-primary/20"
                  >
                    {loading ? "Sending Code..." : "Send OTP"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: OTP VERIFICATION */}
            {step === 3 && (
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gft-accent" /> Verify OTP
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Enter the 6-digit code sent to <span className="text-white font-medium">{formData.email}</span>
                  </p>
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70 self-start">
                    6-Digit Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="••••••"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                    className="w-full bg-white/5 border border-white/15 rounded-2xl py-3.5 text-center text-2xl font-mono tracking-widest text-white outline-none focus:border-gft-primary focus:bg-white/10"
                    autoFocus
                    required
                  />
                  <div className="w-full flex items-center justify-between text-xs text-white/50 px-1 mt-1">
                    <span>Single-use code valid for 10 minutes</span>
                    {resendCooldown > 0 ? (
                      <span className="text-gft-accent font-mono">Resend in {resendCooldown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        className="text-gft-primary hover:underline cursor-pointer font-semibold"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Change Info
                  </button>
                  <button
                    type="submit"
                    disabled={loading || otpInput.length !== 6}
                    className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer shadow-lg shadow-gft-primary/20 disabled:opacity-40"
                  >
                    {loading ? "Verifying..." : "Confirm Code"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: PASSWORD CREATION */}
            {step === 4 && (
              <form onSubmit={handlePasswordNext} className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <Lock className="h-5 w-5 text-gft-accent" /> Password Creation
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Set a secure password for your affiliate account.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Min. 8 chars with Uppercase, Number, Symbol"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gft-primary pr-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-white/40 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                    required
                  />
                </div>

                <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-white/60 leading-relaxed">
                  🔒 Password requirements: Minimum 8 characters, at least 1 uppercase letter (A-Z), 1 lowercase letter (a-z), 1 digit (0-9), and 1 special symbol (@$!%*?&).
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer shadow-lg shadow-gft-primary/20"
                  >
                    Next: Personal Details
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 5: PERSONAL DETAILS & ADDRESS */}
            {step === 5 && (
              <form onSubmit={handleAddressNext} className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gft-accent" /> Personal Details
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Provide your primary residential address for compliance.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">Residential Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Building, Street, Landmark"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Mumbai"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase font-bold tracking-wider text-white/70">State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Maharashtra"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase font-bold tracking-wider text-white/70">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                    required
                  />
                </div>

                <div className="p-3 bg-gft-primary/10 border border-gft-primary/20 rounded-xl text-xs text-gft-accent leading-relaxed">
                  ℹ️ KYC Notice: Official identity documents (PAN / Aadhaar) will be uploaded inside the Member Portal under Phase 2 compliance.
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer shadow-lg shadow-gft-primary/20"
                  >
                    Review & Consent
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 6: CONSENT & ACCOUNT CREATION */}
            {step === 6 && (
              <form onSubmit={handleFinalSubmit} className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-gft-accent" /> Terms & Consent
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm mt-1">
                    Review and confirm agreements before final account creation.
                  </p>
                </div>

                {/* Summary Box */}
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between text-white/60">
                    <span>Full Name:</span>
                    <strong className="text-white">{formData.fullName}</strong>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Email:</span>
                    <strong className="text-white">{formData.email}</strong>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Mobile:</span>
                    <strong className="text-white">{formData.mobile}</strong>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Sponsor:</span>
                    <strong className="text-gft-accent">{formData.sponsorName || formData.sponsorId}</strong>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="consentTerms"
                      checked={formData.consentTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 bg-white/5 border border-white/15 rounded accent-gft-primary cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-white/80 leading-relaxed">
                      I accept the GFT Terms of Service and Privacy Policy, and agree to electronic communications regarding my account.
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="consentAml"
                      checked={formData.consentAml}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 bg-white/5 border border-white/15 rounded accent-gft-primary cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-white/80 leading-relaxed">
                      I certify that all details provided are accurate, and acknowledge that KYC verification is mandatory prior to withdrawal eligibility.
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 text-sm cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !formData.consentTerms || !formData.consentAml}
                    className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer shadow-lg shadow-gft-primary/20 disabled:opacity-40"
                  >
                    {loading ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4" /> Create Account
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 7: REGISTRATION COMPLETE */}
            {step === 7 && (
              <div className="flex flex-col items-center text-center gap-5 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-white">Welcome to Green Future Tech!</h2>
                  <p className="text-white/60 text-sm mt-1">
                    Your affiliate account has been created successfully.
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl w-full text-xs text-white/80 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span>Member Name:</span>
                    <strong className="text-white">{createdUser?.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Registered Email:</span>
                    <strong className="text-white">{createdUser?.email}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned Sponsor:</span>
                    <strong className="text-gft-accent">{createdUser?.sponsorId}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gft-accent">
                  <div className="h-2 w-2 rounded-full bg-gft-accent animate-ping" />
                  <span>Logging you into your member dashboard...</span>
                </div>

                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full bg-gft-primary hover:bg-gft-accent text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm transition-all cursor-pointer shadow-lg shadow-gft-primary/20"
                >
                  Enter Dashboard Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Auth footer link */}
          {step <= 6 && (
            <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs sm:text-sm text-white/60">
              Already an affiliate member?{" "}
              <Link href="/login" className="font-bold text-gft-primary hover:text-gft-accent transition-colors">
                Sign In Instead
              </Link>
            </div>
          )}
        </div>

        {/* Compliance Footer */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/40">
          <Shield className="h-4 w-4" /> COMPLIANT WITH ANTI-MONEY LAUNDERING (AML) & DATA PRIVACY STANDARDS
        </div>
      </div>
    </div>
  );
}
