"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { LogIn, Lock, ShieldCheck, Eye, EyeOff, User, Mail, KeyRound, CheckCircle2, ArrowLeft, X } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import GFTLogo from "@/components/GFTLogo";

export default function LoginPage() {
  const router = useRouter();
  const { login, forgotPassword, resetPassword } = useApp();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Forgot Password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = request OTP, 2 = verify OTP & reset
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await login(identifier.trim(), password.trim());
      setLoading(false);
      if (res && !res.success) {
        setError(res.error || "Invalid user ID, email, or password.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleRequestResetOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError("Please enter your registered email address.");
      return;
    }

    setForgotLoading(true);
    setForgotError("");
    setForgotSuccess("");

    const res = await forgotPassword(forgotEmail.trim().toLowerCase());
    setForgotLoading(false);

    // Always show generic message to avoid account enumeration
    setForgotSuccess(res.message || "If this account exists, a 6-digit verification code has been sent.");
    setForgotStep(2);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!forgotOtp || !newPassword || !confirmNewPassword) {
      setForgotError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setForgotError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setForgotError("Password must be at least 8 characters with letters, numbers, and symbols.");
      return;
    }

    setForgotLoading(true);
    setForgotError("");

    const res = await resetPassword(forgotEmail.trim().toLowerCase(), forgotOtp.trim(), newPassword.trim());
    setForgotLoading(false);

    if (!res.success) {
      setForgotError(res.message || "Failed to reset password. Check your OTP and try again.");
    } else {
      setForgotSuccess("Password reset successfully! You can now sign in with your new password.");
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotOtp("");
        setNewPassword("");
        setConfirmNewPassword("");
        setForgotSuccess("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gft-dark-bg via-[#072F2B] to-gft-deep p-6 overflow-hidden">
      {/* Abstract Glowing Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gft-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gft-accent/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 flex flex-col gap-8">
        <div className="flex justify-center">
          <Link href="/">
            <GFTLogo className="h-20 w-auto" light={true} />
          </Link>
        </div>

        <div
          ref={cardRef}
          className="glass-panel-dark p-8 sm:p-10 rounded-3xl glow-green opacity-0"
        >
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Welcome Back</h1>
            <p className="text-white/60 text-sm">Enter your credentials to access your affiliate portal.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* User ID or Email */}
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                User ID or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/45">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="GFT100201 or name@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-xs uppercase font-bold tracking-wider text-white/70">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setForgotError("");
                    setForgotSuccess("");
                    setForgotStep(1);
                  }}
                  className="text-xs font-semibold text-gft-primary hover:text-gft-accent transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/45">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-[15px] text-white outline-none focus:border-gft-primary focus:bg-white/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/45 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 mt-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-white/5 border border-white/10 rounded text-gft-primary focus:ring-gft-primary cursor-pointer accent-gft-primary"
              />
              <label htmlFor="remember" className="text-sm text-white/70 select-none cursor-pointer">
                Remember this device for 30 days
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gft-primary hover:bg-gft-accent text-white font-bold py-4.5 rounded-2xl flex items-center justify-center gap-2 transition-all mt-4 cursor-pointer shadow-lg shadow-gft-primary/20 hover:shadow-gft-accent/20"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Alternative Auth Footer */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-white/60">
            Don&apos;t have an affiliate account?{" "}
            <Link href="/register" className="font-bold text-gft-primary hover:text-gft-accent transition-colors">
              Register Here
            </Link>
          </div>
        </div>

        {/* Technical compliance badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/40">
          <ShieldCheck className="h-4 w-4" /> SECURE 256-BIT SSL ENCRYPTED GATEWAY
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel-dark p-6 sm:p-8 rounded-3xl w-full max-w-md border border-white/15 relative glow-green shadow-2xl">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gft-primary/20 text-gft-accent flex items-center justify-center">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Reset Password</h3>
                <p className="text-xs text-white/60">Recover access to your GFT affiliate portal</p>
              </div>
            </div>

            {forgotError && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl">
                {forgotError}
              </div>
            )}

            {forgotSuccess && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {forgotStep === 1 ? (
              <form onSubmit={handleRequestResetOtp} className="flex flex-col gap-4">
                <p className="text-xs text-white/70">
                  Enter your registered account email address. We will dispatch a secure 6-digit verification code.
                </p>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/40">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    placeholder="yourname@domain.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-gft-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-gft-primary hover:bg-gft-accent text-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {forgotLoading ? "Sending Code..." : "Send Verification Code"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="flex flex-col gap-3.5">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Sent to: {forgotEmail}</span>
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    className="text-gft-primary hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3 w-3" /> Change
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-wider text-white/70 font-semibold">6-Digit Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center text-lg font-mono tracking-widest text-white outline-none focus:border-gft-primary"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-wider text-white/70 font-semibold">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-gft-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3 text-white/40 hover:text-white"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs uppercase tracking-wider text-white/70 font-semibold">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Repeat new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-gft-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-gft-primary hover:bg-gft-accent text-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer mt-2 flex items-center justify-center gap-2"
                >
                  {forgotLoading ? "Resetting..." : "Reset Password & Login"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
