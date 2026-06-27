"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  User,
  GitBranch,
  Gift,
  FileText,
  HelpCircle,
  Coins,
  Compass,
  FileCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  UserPlus,
  Lock,
  Wallet,
  Settings,
  ShieldCheck,
  ArrowDownToLine
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";
import GFTLogo from "./GFTLogo";

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useApp();

  // Submenu open states
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [genealogyExpanded, setGenealogyExpanded] = useState(false);

  // Automatically expand submenus if active route is nested inside
  useEffect(() => {
    if (pathname.startsWith("/dashboard/profile")) {
      setProfileExpanded(true);
    }
    if (pathname.startsWith("/dashboard/genealogy")) {
      setGenealogyExpanded(true);
    }
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      name: "Profile Settings",
      icon: User,
      isSubmenu: true,
      expanded: profileExpanded,
      setExpanded: setProfileExpanded,
      subItems: [
        { name: "Overview", href: "/dashboard/profile" },
        { name: "Edit Profile", href: "/dashboard/profile/edit" },
        { name: "KYC Verification", href: "/dashboard/profile/kyc" },
        { name: "USDT Wallet", href: "/dashboard/profile/usdt-wallet" },
        { name: "Nominee Details", href: "/dashboard/profile/nominee" },
        { name: "Change Password", href: "/dashboard/profile/change-password" },
        { name: "Welcome Letter", href: "/dashboard/profile/welcome-letter" }
      ]
    },
    {
      name: "Genealogy",
      icon: GitBranch,
      isSubmenu: true,
      expanded: genealogyExpanded,
      setExpanded: setGenealogyExpanded,
      subItems: [
        { name: "Graphical Tree", href: "/dashboard/genealogy/tree" },
        { name: "Team Table", href: "/dashboard/genealogy/team" },
        { name: "Sponsor Info", href: "/dashboard/genealogy/sponsor" }
      ]
    },
    { name: "My Packages", href: "/dashboard/packages", icon: Gift },
    { name: "GFT Tokens", href: "/dashboard/tokens", icon: Coins },
    { name: "Withdrawal", href: "/dashboard/withdraw", icon: ArrowDownToLine },
    { name: "Offers & Promos", href: "/dashboard/offers", icon: Compass },
    { name: "Company Docs", href: "/dashboard/documents", icon: FileText },
    { name: "Support Tickets", href: "/dashboard/support", icon: HelpCircle },
    { name: "Payment Policy", href: "/dashboard/payment-policy", icon: FileCheck }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-gft-deep/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-40 bg-gft-dark-bg text-white h-screen border-r border-gft-border-dark flex flex-col justify-between transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-gft-border-dark flex items-center justify-between">
          <Link href="/dashboard" className="overflow-hidden">
            <GFTLogo className="h-8 w-auto shrink-0" showText={!isCollapsed} light={true} />
          </Link>

          {/* Collapse Button for desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* User Card */}
        {!isCollapsed && user && (
          <div className="p-4 mx-4 mt-6 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gft-primary/25 border border-gft-primary text-gft-accent flex items-center justify-center font-bold">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold truncate text-white">{user.name}</span>
              <span className="text-[10px] text-gft-accent font-semibold tracking-wider uppercase truncate">
                {user.designation}
              </span>
            </div>
          </div>
        )}

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto flex flex-col gap-1 select-none">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.isSubmenu) {
              const isSubActive = item.subItems.some((s) => pathname === s.href);
              
              return (
                <div key={item.name} className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      if (isCollapsed) {
                        setIsCollapsed(false);
                      }
                      item.setExpanded(!item.expanded);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                      isSubActive
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Icon className="h-5 w-5 shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          item.expanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Render nested children with animations */}
                  {!isCollapsed && item.expanded && (
                    <div className="flex flex-col gap-1 pl-9 pr-2 overflow-hidden">
                      {item.subItems.map((sub) => {
                        const isSubItemActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={`block py-2.5 px-3.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                              isSubItemActive
                                ? "text-gft-primary bg-gft-primary/5"
                                : "text-white/45 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? "bg-gft-primary text-white shadow-md shadow-gft-primary/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-white/60 group-hover:text-gft-accent"}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}

                {/* Tooltip for collapsed view */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 rounded bg-gft-deep text-xs border border-gft-border-dark whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout action links to dedicated route */}
        <div className="p-3 border-t border-gft-border-dark">
          <Link
            href="/dashboard/logout"
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative ${
              pathname === "/dashboard/logout"
                ? "bg-rose-600 text-white"
                : "text-rose-300 hover:text-rose-100 hover:bg-rose-950/30"
            }`}
          >
            <LogOut className="h-5 w-5 shrink-0 text-rose-300 group-hover:text-rose-100" />
            {!isCollapsed && <span>Sign Out</span>}

            {isCollapsed && (
              <div className="absolute left-full ml-4 px-2 py-1 rounded bg-rose-950 text-xs border border-rose-900 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Sign Out
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
