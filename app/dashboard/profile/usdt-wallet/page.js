"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Wallet, ChevronLeft, AlertTriangle, Check, Copy, Scan, X, Camera } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function USDTWalletPage() {
  const router = useRouter();
  const { user, updateUSDTWallet } = useApp();

  const [address, setAddress] = useState(user?.usdtWallet || "");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Scanner states
  const [showScanner, setShowScanner] = useState(false);
  const [scannerStatus, setScannerStatus] = useState("Initializing camera...");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanTimeoutRef = useRef(null);

  const startScanner = async () => {
    setShowScanner(true);
    setScannerStatus("Initializing camera...");
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      streamRef.current = stream;
      setScannerStatus("Position QR code inside the frame");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Auto scan simulator after 2.5 seconds of active feed
      scanTimeoutRef.current = setTimeout(() => {
        playBeep();
        setAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        stopScanner();
      }, 2500);
    } catch (err) {
      console.warn("Camera access failed, fallback to simulation:", err.message || err);
      setScannerStatus("Camera blocked. Simulating scan...");
      // Fallback mockup scan
      scanTimeoutRef.current = setTimeout(() => {
        playBeep();
        setAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
        stopScanner();
      }, 2000);
    }
  };

  const stopScanner = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setShowScanner(false);
  };

  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio context blocked or unsupported");
    }
  };

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
    <div className="flex flex-col gap-6 max-w-2xl mx-auto select-none text-white">
      {/* Back button */}
      <button
        onClick={() => {
          stopScanner();
          router.push("/dashboard/profile");
        }}
        className="flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white transition-colors cursor-pointer self-start"
      >
        <ChevronLeft className="h-4.5 w-4.5" /> Back to Profile
      </button>

      <div className="bg-gft-card-dark border border-gft-border-dark rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3.5 mb-6 border-b border-gft-border-dark pb-4">
          <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-accent flex items-center justify-center border border-gft-primary/20">
            <Wallet className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">USDT Settlement Address</h1>
            <p className="text-xs text-white/60">Configure ERC-20 / TRC-20 digital withdrawal addresses.</p>
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
            <div className="w-32 h-32 bg-white/5 border border-gft-border-dark rounded-2xl flex items-center justify-center p-3 shadow-sm shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-gft-accent">
                <path d="M0 0h30v30H0zm5 5v20h20V5zm2 2h16v16H7zm63-7h30v30H70zm5 5v20h20V5zm2 2h16v16H72zM0 70h30v30H0zm5 5v20h20V75zm2 2h16v16H7zm43-7h5v5h-5zm10 5h5v10h-5zm0 15h10v5H80zm5-10h15v5H85zm10-5h5v5h-5zm-5-5h5v5h-5zm-15-5h10v5H70zm15 15h5v5h-5zm-25 5h5v5h-5zm5-15h5v5h-5zm5-10h15v5H85z" />
                <rect x="40" y="40" width="20" height="20" fill="#65B300" rx="3" />
              </svg>
            </div>

            <div className="flex flex-col gap-4 flex-1 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-white/50">USDT Recipient Wallet</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter 0x... address"
                    className="w-full bg-white/5 border border-gft-border-dark rounded-xl px-4 py-3 text-[13px] outline-none font-mono focus:border-gft-primary text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={startScanner}
                    title="Scan QR Code"
                    className="bg-white/5 border border-gft-border-dark hover:bg-white/10 p-3 rounded-xl transition-all cursor-pointer text-gft-accent"
                  >
                    <Scan className="h-4.5 w-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="bg-white/5 border border-gft-border-dark hover:bg-white/10 p-3 rounded-xl transition-all cursor-pointer"
                  >
                    {copied ? <Check className="h-4.5 w-4.5 text-gft-primary" /> : <Copy className="h-4.5 w-4.5 text-white/70" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2 text-[10px] font-semibold text-amber-500 bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                <span>IMPORTANT: Ensure the address is correct. GFT cannot reverse transactions sent to wrong addresses.</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end border-t border-gft-border-dark pt-6">
            <button
              type="button"
              onClick={() => {
                stopScanner();
                router.push("/dashboard/profile");
              }}
              className="bg-white/5 hover:bg-white/10 border border-gft-border-dark text-white font-bold text-xs uppercase px-6 py-3.5 rounded-xl cursor-pointer"
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

      {/* QR Code Scanner Overlay Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in">
          <div className="bg-gft-card-dark border-2 border-gft-primary rounded-3xl p-6 max-w-sm w-full relative shadow-2xl overflow-hidden flex flex-col items-center">
            {/* Close Button */}
            <button
              onClick={stopScanner}
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/5 text-white transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center gap-1.5 mb-5 text-center mt-2">
              <Camera className="h-6 w-6 text-gft-accent animate-pulse" />
              <h3 className="text-sm font-bold text-white">Scan Wallet QR Code</h3>
              <p className="text-[10px] text-white/50">{scannerStatus}</p>
            </div>

            {/* Video Viewport / Scan Overlay Frame */}
            <div className="relative w-64 h-64 bg-black rounded-2xl overflow-hidden border border-gft-border-dark shadow-inner flex items-center justify-center">
              {/* Actual Video Feed */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />

              {/* Viewfinder brackets */}
              <div className="absolute inset-8 border-2 border-dashed border-gft-accent/40 rounded-xl pointer-events-none"></div>

              {/* Glowing animated laser scanline */}
              <div className="absolute left-4 right-4 h-0.5 bg-gft-accent shadow-[0_0_10px_#8CD83D] animate-[bounce_2s_infinite] pointer-events-none"></div>
            </div>

            <button
              onClick={stopScanner}
              className="mt-6 w-full bg-white/5 border border-gft-border-dark hover:bg-white/10 text-white font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              Close Camera
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
