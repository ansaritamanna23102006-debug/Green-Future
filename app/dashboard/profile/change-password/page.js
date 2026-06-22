"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user } = useApp();

  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        setSuccess(false);
        router.push("/dashboard/profile");
      }, 1500);
    }, 800);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto select-none">
      {/* Back button */}
      <button
        onClick={() => router.push("/dashboard/profile")}
        className="flex items-center gap-1.5 text-xs font-bold text-gft-deep/60 hover:text-gft-primary transition-colors cursor-pointer self-start"
      >
        <ChevronLeft className="h-4.5 w-4.5" /> Back to Profile
      </button>

      <div className="bg-white border border-gft-gray-light rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3.5 mb-6 border-b border-gft-gray-light pb-4">
          <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
            <Lock className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gft-deep">Security & Passwords</h1>
            <p className="text-xs text-gft-deep/45">Update your system log-in password parameters.</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-gft-primary/10 border border-gft-primary/20 text-gft-primary text-xs font-bold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5" /> Password credentials updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase font-bold text-gft-deep/50">Current Password</label>
            <input
              type="password"
              value={form.oldPassword}
              onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
              className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">New Password</label>
              <input
                type="password"
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Confirm New Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end border-t border-gft-gray-light pt-6 mt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/profile")}
              className="bg-gft-light hover:bg-gft-gray-light border border-gft-gray-light text-gft-dark font-bold text-xs uppercase px-6 py-3.5 rounded-xl cursor-pointer"
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
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
