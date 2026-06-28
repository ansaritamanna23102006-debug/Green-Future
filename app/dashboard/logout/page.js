"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { LogOut, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import GFTLogo from "@/components/GFTLogo";

export default function DashboardLogoutPage() {
  const router = useRouter();
  const { logout } = useApp();

  const [confirmed, setConfirmed] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const confirmRef = useRef(null);
  const clearedRef = useRef(null);

  const handleConfirmLogout = () => {
    if (confirmRef.current) {
      gsap.to(confirmRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          setConfirmed(true);
          setRedirecting(true);
        }
      });
    } else {
      setConfirmed(true);
      setRedirecting(true);
    }
  };

  useEffect(() => {
    if (confirmed) {
      logout();

      // Animate cleared status card
      if (clearedRef.current) {
        gsap.fromTo(
          clearedRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.2)" }
        );
        gsap.fromTo(
          ".check-icon",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, delay: 0.2, ease: "back.out(1.5)" }
        );
      }

      const timer = setTimeout(() => {
        router.push("/login");
      }, 2600);

      return () => clearTimeout(timer);
    } else {
      // Animate confirm card on mount
      if (confirmRef.current) {
        gsap.fromTo(
          confirmRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
        );
      }
    }
  }, [confirmed, logout, router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-full max-w-md relative z-10 flex flex-col gap-6">
        
        {!confirmed ? (
          /* Step 1: Confirmation Form Card */
          <div
            ref={confirmRef}
            className="bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm flex flex-col items-center gap-6 opacity-0"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <LogOut className="h-6 w-6" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold text-gft-deep">Confirm Logout</h2>
              <p className="text-gft-deep/60 text-xs sm:text-sm font-normal">
                Are you sure you want to end your active affiliate session? Unsaved profile edits might be lost.
              </p>
            </div>

            <div className="flex gap-4 w-full mt-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex-1 bg-gft-light hover:bg-gft-gray-light border border-gft-gray-light text-gft-dark font-bold text-xs uppercase py-3.5 rounded-2xl transition-colors cursor-pointer"
              >
                No, Keep Dashboard
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase py-3.5 rounded-2xl shadow-md shadow-rose-600/10 transition-colors cursor-pointer"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Animated exit splash loader */
          <div
            ref={clearedRef}
            className="bg-gft-dark-bg text-white border border-gft-border-dark p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col items-center gap-6 glow-green opacity-0"
          >
            <GFTLogo className="h-20 w-auto" light={true} showText={false} />

            <div
              className="check-icon w-16 h-16 rounded-full bg-gft-primary/20 border border-gft-primary flex items-center justify-center text-gft-accent opacity-0"
            >
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Session Cleared</h2>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-normal">
                Your credentials have been securely wiped from this browser. See you soon!
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-white/40 mt-4">
              <div className="h-4 w-4 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
              <span>Forwarding to login portal...</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
