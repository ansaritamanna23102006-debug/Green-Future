"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, RefreshCw, Users } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function DownlineTeamPage() {
  const { user } = useApp();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const fetchReferrals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("gft_token");
      if (!token) return;

      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      });

      if (filterStatus !== "All") {
        queryParams.append("status", filterStatus.toLowerCase());
      }

      const res = await fetch(`${API_URL}/genealogy/direct-referrals?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.status === "success" && data.data) {
        setReferrals(data.data.referrals || []);
        setTotalPages(data.data.pagination?.totalPages || 1);
        setTotalCount(data.data.pagination?.total || 0);
      }
    } catch (err) {
      console.error("Failed to load direct referrals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [currentPage, filterStatus]);

  const filteredReferrals = referrals.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (m.name || "").toLowerCase().includes(q) || (m.userId || "").toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-8 select-none text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Direct Referrals & Team</h1>
          <p className="text-white/60 text-sm mt-1">
            Authoritative unilevel direct referrals and partner accounts enrolled with your sponsor link.
          </p>
        </div>
        <button
          onClick={fetchReferrals}
          disabled={loading}
          className="flex items-center gap-2 bg-gft-card-dark border border-gft-border-dark px-4 py-2 rounded-xl text-xs font-bold hover:bg-gft-primary/20 transition-colors cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Team ({totalCount})
        </button>
      </div>

      <div className="bg-gft-card-dark border border-gft-border-dark rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        {/* Filters and search row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gft-dark-bg/60 p-4 rounded-xl border border-gft-border-dark">
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/60" />
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white/5 border border-gft-border-dark text-xs font-bold text-white rounded-lg px-3 py-2 outline-none"
              >
                <option value="All" className="bg-zinc-900 text-white">All Statuses</option>
                <option value="Active" className="bg-zinc-900 text-white">Active Only</option>
                <option value="Inactive" className="bg-zinc-900 text-white">Inactive Only</option>
              </select>
            </div>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member name or ID..."
              className="w-full bg-white/5 border border-gft-border-dark rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-gft-primary text-white placeholder-white/40"
            />
          </div>
        </div>

        {/* Referrals Table */}
        <div className="overflow-x-auto relative min-h-[240px]">
          {loading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-10">
              <RefreshCw className="animate-spin text-gft-accent" size={24} />
            </div>
          )}

          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gft-border-dark text-[11px] font-extrabold uppercase tracking-wider text-white/45 bg-white/5">
                <th className="py-3.5 px-4 rounded-l-xl">Member ID</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4">Joining Date</th>
                <th className="py-3.5 px-4">Designation</th>
                <th className="py-3.5 px-4">Active Package</th>
                <th className="py-3.5 px-4 text-center rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.length === 0 && !loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs font-semibold text-white/50">
                    <div className="flex flex-col items-center gap-2">
                      <Users size={32} className="text-white/20" />
                      <span>No direct referrals found matching criteria.</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReferrals.map((member, i) => (
                  <tr key={i} className="border-b border-gft-border-dark/60 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-gft-accent">{member.userId}</td>
                    <td className="py-4 px-4 font-bold text-white">{member.name}</td>
                    <td className="py-4 px-4 text-xs font-semibold text-white/60">
                      {member.joiningDate ? member.joiningDate.split("T")[0] : "—"}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-white/80">
                      {member.rank && member.rank !== "none" ? member.rank.toUpperCase() : "MEMBER"}
                    </td>
                    <td className="py-4 px-4 font-bold text-white/90">{member.activePackageName || "None"}</td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          member.status === "active"
                            ? "bg-gft-primary/20 text-gft-accent border border-gft-primary/30"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center border-t border-gft-border-dark pt-4 text-xs text-white/60">
            <span>
              Page {currentPage} of {totalPages} ({totalCount} total direct enrollees)
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1 || loading}
                className="p-2 bg-white/5 border border-gft-border-dark rounded-lg disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages || loading}
                className="p-2 bg-white/5 border border-gft-border-dark rounded-lg disabled:opacity-30 hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
