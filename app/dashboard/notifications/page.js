"use client";

import React from "react";
import { Bell, Check, Trash2, Calendar, ShieldCheck, Mail, Info } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function NotificationsPage() {
  const { notifications, markAllNotificationsRead } = useApp();

  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes("payout") || t.includes("earned") || t.includes("withdrawal")) {
      return <ShieldCheck className="h-5 w-5 text-gft-primary" />;
    }
    if (t.includes("member") || t.includes("downline") || t.includes("registration")) {
      return <Mail className="h-5 w-5 text-blue-500" />;
    }
    return <Info className="h-5 w-5 text-amber-500" />;
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Notifications Center</h1>
          <p className="text-gft-deep/60 text-sm mt-1">
            Keep track of your network activity, commissions, and platform notices.
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gft-primary hover:bg-gft-accent text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Check className="h-4 w-4" /> Mark All as Read
          </button>
        )}
      </div>

      {/* Main List */}
      <div className="bg-white border border-gft-gray-light rounded-3xl p-6 sm:p-8 shadow-sm">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-gft-light flex items-center justify-center text-gft-deep/45">
              <Bell className="h-7 w-7" />
            </div>
            <h3 className="text-sm font-bold text-gft-deep mt-2">All Caught Up!</h3>
            <p className="text-xs text-gft-deep/45 max-w-[280px]">
              No notifications available at this time. We will let you know when new updates occur.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`border border-gft-gray-light rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-gft-primary/45 ${
                  notif.unread ? "bg-gft-primary/5 border-gft-primary/20 shadow-sm" : "bg-white"
                }`}
              >
                <div className="p-2.5 rounded-xl bg-gft-light flex items-center justify-center shrink-0">
                  {getIcon(notif.title)}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row justify-between items-start gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-gft-deep flex items-center gap-2">
                      {notif.title}
                      {notif.unread && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      )}
                    </h3>
                    <p className="text-xs text-gft-deep/70 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gft-deep/45 font-semibold bg-gft-light px-2.5 py-1 rounded-lg shrink-0">
                    <Calendar className="h-3 w-3" /> {notif.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
