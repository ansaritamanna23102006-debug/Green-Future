"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, CheckCircle2, ChevronLeft } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateProfile } = useApp();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    country: user?.country || ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      updateProfile(form);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/dashboard/profile");
      }, 1500);
    }, 800);
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto select-none">
      {/* Header breadcrumb */}
      <button
        onClick={() => router.push("/dashboard/profile")}
        className="flex items-center gap-1.5 text-xs font-bold text-gft-deep/60 hover:text-gft-primary transition-colors cursor-pointer self-start"
      >
        <ChevronLeft className="h-4.5 w-4.5" /> Back to Profile
      </button>

      <div className="bg-white border border-gft-gray-light rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3.5 mb-6 border-b border-gft-gray-light pb-4">
          <div className="w-10 h-10 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
            <User className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gft-deep">Edit Personal Information</h1>
            <p className="text-xs text-gft-deep/45">Update your account identity and address fields.</p>
          </div>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-gft-primary/10 border border-gft-primary/20 text-gft-primary text-xs font-bold rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5" /> Profile details saved successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Mobile Number</label>
              <input
                type="text"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Mailing Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">State</label>
              <input
                type="text"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-4">
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
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
