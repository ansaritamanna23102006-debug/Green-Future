"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";
import { useApp } from "@/lib/context/AppContext";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { isLoggedIn, user } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Client-side authentication check
  useEffect(() => {
    if (mounted) {
      const storedAuth = localStorage.getItem("gft_auth");
      if (storedAuth !== "true" && !isLoggedIn) {
        router.push("/login");
      }
    }
  }, [mounted, isLoggedIn, router]);

  // Loading fallback until mounted & logged-in check is complete
  if (!mounted || (!isLoggedIn && typeof window !== "undefined" && localStorage.getItem("gft_auth") !== "true")) {
    return (
      <div className="min-h-screen bg-gft-dark-bg flex flex-col items-center justify-center text-white gap-4">
        <div className="h-10 w-10 border-4 border-gft-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold tracking-wider text-white/60">Securing your session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gft-dark-bg text-white gft-dashboard-theme">
      {/* Responsive Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <DashboardNavbar
          isCollapsed={isCollapsed}
          setIsMobileOpen={setIsMobileOpen}
        />
        
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto pb-16">
          {children}
        </main>
      </div>
    </div>
  );
}
