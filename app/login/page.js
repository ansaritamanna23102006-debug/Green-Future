"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { LogIn, Mail, Lock, ShieldCheck, Eye, EyeOff, User } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import GFTLogo from "@/components/GFTLogo";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const res = await login(identifier, password);
      setLoading(false);
      if (res && !res.success) {
        setError(res.error || "Invalid username or password.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
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
            <GFTLogo className="h-10 w-auto" light={true} />
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
                  placeholder="GFT908127 or email"
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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Instructions to reset your password have been simulated. Check your registered email.");
                  }}
                  className="text-xs font-semibold text-gft-primary hover:text-gft-accent transition-colors"
                >
                  Forgot Password?
                </a>
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
            Don't have an affiliate account?{" "}
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
    </div>
  );
}
