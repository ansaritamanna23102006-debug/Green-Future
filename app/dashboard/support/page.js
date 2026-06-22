"use client";

import React, { useState } from "react";
import { Mail, Phone, MessageSquare, AlertCircle, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function SupportPage() {
  const { tickets, raiseTicket } = useApp();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Payout");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !message) {
      alert("Please fill in all ticket details.");
      return;
    }

    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      raiseTicket(subject, category, message);
      setLoading(false);
      setSuccess(true);
      setSubject("");
      setMessage("");

      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
      case "Approved":
        return "bg-gft-primary/10 text-gft-primary border-gft-primary/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    }
  };

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Customer Support</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Submit help tickets, track pending issues, or contact our support channels directly.</p>
      </div>

      {/* Support Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Support Card */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center shrink-0">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-gft-deep/50 uppercase font-bold tracking-wider">Email Helpdesk</span>
            <h3 className="text-base font-bold text-gft-deep mt-0.5">support@gft.com</h3>
            <p className="text-xs text-gft-deep/60 mt-1">Average response time: Under 4 hours</p>
          </div>
        </div>

        {/* Phone Support Card */}
        <div className="bg-white border border-gft-gray-light p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gft-primary/10 text-gft-primary flex items-center justify-center shrink-0">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] text-gft-deep/50 uppercase font-bold tracking-wider">Phone Support</span>
            <h3 className="text-base font-bold text-gft-deep mt-0.5">+91 98765 43210</h3>
            <p className="text-xs text-gft-deep/60 mt-1">Monday - Saturday (10:00 AM - 6:00 PM IST)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Raise Ticket Form */}
        <div className="lg:col-span-5 bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wider border-b border-gft-gray-light pb-2 mb-6">
            Raise Support Ticket
          </h3>

          {success && (
            <div className="mb-6 p-4 bg-gft-primary/15 border border-gft-primary/25 text-gft-primary text-xs font-bold rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5" /> Ticket submitted. Check History.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Ticket Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Withdrawal matching issue"
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Ticket Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary text-gft-deep"
              >
                <option value="Payout">Payout Commission</option>
                <option value="KYC">KYC Documents Verification</option>
                <option value="Packages">Staking Packages</option>
                <option value="Tokens">GFT Tokens Issues</option>
                <option value="Security">Security & Access</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Detailed Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain your problem in detail..."
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary min-h-[120px] resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition-all mt-2 cursor-pointer shadow-lg shadow-gft-primary/10"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                "Submit Support Ticket"
              )}
            </button>
          </form>
        </div>

        {/* Ticket History */}
        <div className="lg:col-span-7 bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-gft-deep uppercase tracking-wider border-b border-gft-gray-light pb-2 mb-6">
            Ticket History Log
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gft-gray-light text-[10px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                  <th className="py-3 px-3 rounded-l-xl">Ticket ID</th>
                  <th className="py-3 px-3">Subject</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-center rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t.id} className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors">
                    <td className="py-4 px-3 font-bold text-gft-deep text-xs">{t.id}</td>
                    <td className="py-4 px-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-gft-deep/80 text-xs sm:text-sm">{t.subject}</span>
                        <span className="text-[10px] text-gft-deep/50 font-medium truncate max-w-[200px] mt-0.5">{t.message}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-xs font-semibold text-gft-deep/60">{t.category}</td>
                    <td className="py-4 px-3 text-xs font-semibold text-gft-deep/60 whitespace-nowrap">{t.date}</td>
                    <td className="py-4 px-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full border text-[9px] font-extrabold uppercase ${getStatusStyle(t.status)}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
