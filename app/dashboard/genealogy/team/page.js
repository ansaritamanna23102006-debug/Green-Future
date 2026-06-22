"use client";

import React, { useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function DownlineTeamPage() {
  const downlineMembers = [
    { level: 1, id: "GFT100201", name: "Elena Rostova", date: "2025-11-12", package: "Apex Forest ($2500)", status: "Active" },
    { level: 1, id: "GFT100340", name: "Siddharth Kumar", date: "2026-02-15", package: "Growth Green ($500)", status: "Active" },
    { level: 2, id: "GFT100098", name: "Marcus Aurelius", date: "2025-12-01", package: "Growth Green ($500)", status: "Active" },
    { level: 2, id: "GFT100112", name: "Sarah Jenkins", date: "2026-01-20", package: "Starter Eco ($100)", status: "Active" },
    { level: 2, id: "GFT100155", name: "Chloe Dupont", date: "2026-03-02", package: "Starter Eco ($100)", status: "Inactive" },
    { level: 2, id: "GFT100412", name: "Zahir Al-Hassan", date: "2026-05-18", package: "Growth Green ($500)", status: "Active" },
    { level: 3, id: "GFT200101", name: "Rajesh Sharma", date: "2026-06-01", package: "Starter Eco ($100)", status: "Active" },
    { level: 3, id: "GFT200108", name: "Chen Lee", date: "2026-06-02", package: "Growth Green ($500)", status: "Active" },
    { level: 4, id: "GFT300892", name: "Sophia Lopez", date: "2026-06-05", package: "Apex Forest ($2500)", status: "Active" },
    { level: 5, id: "GFT400231", name: "Jean Moreau", date: "2026-06-10", package: "Starter Eco ($100)", status: "Inactive" },
    { level: 6, id: "GFT500612", name: "Yuki Tanaka", date: "2026-06-12", package: "Starter Eco ($100)", status: "Active" },
    { level: 7, id: "GFT600109", name: "Fatima Al-Sudairy", date: "2026-06-15", package: "Growth Green ($500)", status: "Active" }
  ];

  const [filterLevel, setFilterLevel] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTableQuery, setSearchTableQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTableData = downlineMembers.filter((m) => {
    const matchLevel = filterLevel === "All" || m.level.toString() === filterLevel;
    const matchStatus = filterStatus === "All" || m.status === filterStatus;
    const matchQuery = m.name.toLowerCase().includes(searchTableQuery.toLowerCase()) ||
                       m.id.toLowerCase().includes(searchTableQuery.toLowerCase());
    return matchLevel && matchStatus && matchQuery;
  });

  const totalPages = Math.ceil(filteredTableData.length / itemsPerPage);
  const paginatedTableData = filteredTableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-8 select-none">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Downline Team List</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Audit matching placement nodes registered across GFT compensation wings.</p>
      </div>

      <div className="bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        {/* Filters and search row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gft-light p-4 rounded-xl border border-gft-gray-light">
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gft-deep/60" />
              <select
                value={filterLevel}
                onChange={(e) => {
                  setFilterLevel(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-gft-gray-light text-xs font-bold text-gft-deep rounded-lg px-3 py-2 outline-none"
              >
                <option value="All">All Levels</option>
                {[1, 2, 3, 4, 5, 6, 7].map((l) => (
                  <option key={l} value={l.toString()}>
                    Level {l}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-white border border-gft-gray-light text-xs font-bold text-gft-deep rounded-lg px-3 py-2 outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gft-deep/40">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchTableQuery}
              onChange={(e) => {
                setSearchTableQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search table..."
              className="w-full bg-white border border-gft-gray-light rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-gft-primary"
            />
          </div>
        </div>

        {/* Downline Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gft-gray-light text-[11px] font-extrabold uppercase tracking-wider text-gft-deep/45 bg-gft-light/50">
                <th className="py-3.5 px-4 rounded-l-xl">Level</th>
                <th className="py-3.5 px-4">Member ID</th>
                <th className="py-3.5 px-4">Full Name</th>
                <th className="py-3.5 px-4">Joining Date</th>
                <th className="py-3.5 px-4">Active Package</th>
                <th className="py-3.5 px-4 text-center rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTableData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs font-semibold text-gft-deep/50">
                    No downlines match selected filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedTableData.map((member, i) => (
                  <tr key={i} className="border-b border-gft-gray-light last:border-0 hover:bg-gft-light/35 transition-colors">
                    <td className="py-4 px-4 font-bold text-gft-deep">Tier {member.level}</td>
                    <td className="py-4 px-4 font-semibold text-gft-deep/80">{member.id}</td>
                    <td className="py-4 px-4 font-bold text-gft-deep">{member.name}</td>
                    <td className="py-4 px-4 text-xs font-semibold text-gft-deep/60">{member.date}</td>
                    <td className="py-4 px-4 font-bold text-gft-deep">{member.package}</td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          member.status === "Active"
                            ? "bg-gft-primary/10 text-gft-primary"
                            : "bg-rose-500/10 text-rose-500"
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

        {/* Pagination Row */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center border-t border-gft-gray-light pt-6">
            <span className="text-xs font-semibold text-gft-deep/60">
              Showing page {currentPage} of {totalPages} ({filteredTableData.length} members found)
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="w-10 h-10 border border-gft-gray-light rounded-xl flex items-center justify-center text-gft-deep hover:bg-gft-light transition-colors disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="w-10 h-10 border border-gft-gray-light rounded-xl flex items-center justify-center text-gft-deep hover:bg-gft-light transition-colors disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
