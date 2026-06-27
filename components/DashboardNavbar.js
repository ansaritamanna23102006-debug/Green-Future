"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Search, User, LogOut, Menu, Settings, ShieldAlert, CheckCircle } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function DashboardNavbar({ isCollapsed, setIsMobileOpen }) {
  const router = useRouter();
  const { user, notifications, logout, markAllNotificationsRead } = useApp();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to log out from Green Future Tech?");
    if (confirm) {
      router.push("/dashboard/logout");
    }
  };

  return (
    <header className="bg-white border-b border-gft-gray-light sticky top-0 z-30 py-4 px-6 flex justify-between items-center select-none shadow-sm">
      {/* Search and Mobile toggle */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-gft-gray-light text-gft-deep"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search bar */}
        <div className="relative max-w-xs w-full hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gft-deep/40">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search transactions, referrals..."
            className="w-full bg-gft-light border border-gft-gray-light rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:border-gft-primary"
          />
        </div>
      </div>

      {/* Action triggers */}
      <div className="flex items-center gap-4">
        {/* Verification Status Banner */}
        {user && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gft-primary/10 text-gft-primary">
            <CheckCircle className="h-3.5 w-3.5" /> ID: {user.memberId}
          </span>
        )}

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="p-2 rounded-xl hover:bg-gft-light border border-gft-gray-light text-gft-deep relative transition-all"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white border border-gft-gray-light rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="p-4 border-b border-gft-gray-light flex justify-between items-center bg-gft-light">
                <span className="font-bold text-gft-deep text-sm">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-gft-primary font-bold hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gft-deep/50">
                    No notifications available.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gft-gray-light hover:bg-gft-light transition-colors ${
                        notif.unread ? "bg-gft-primary/5" : ""
                      }`}
                    >
                      <h4 className="text-xs font-bold text-gft-deep flex justify-between">
                        {notif.title}
                        <span className="text-[10px] text-gft-deep/45 font-normal">{notif.time}</span>
                      </h4>
                      <p className="text-xs text-gft-deep/70 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-3 border-t border-gft-gray-light text-center bg-gft-light">
                <Link
                  href="/dashboard/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-gft-primary font-bold hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Trigger */}
        {user && (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gft-light border border-gft-gray-light transition-all text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gft-dark text-white flex items-center justify-center font-bold text-xs">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex flex-col hidden md:block">
                <span className="text-xs font-bold text-gft-deep block leading-tight">{user.name}</span>
                <span className="text-[10px] text-gft-deep/60 leading-tight uppercase font-medium">{user.designation}</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gft-gray-light rounded-2xl shadow-xl overflow-hidden z-50">
                <div className="p-4 border-b border-gft-gray-light bg-gft-light">
                  <p className="text-xs text-gft-deep/60">Logged in as</p>
                  <p className="text-sm font-bold text-gft-deep truncate">{user.email}</p>
                </div>
                <div className="p-1 flex flex-col">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-gft-deep hover:bg-gft-light"
                  >
                    <User className="h-4.5 w-4.5 text-gft-deep/60" /> Profile & KYC
                  </Link>
                  <Link
                    href="/dashboard/support"
                    onClick={() => setShowProfile(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-gft-deep hover:bg-gft-light"
                  >
                    <Settings className="h-4.5 w-4.5 text-gft-deep/60" /> Help Support
                  </Link>
                  <hr className="my-1 border-gft-gray-light" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 text-left w-full cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5 text-rose-500" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
