'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ArrowDownToLine, CheckCircle, XCircle, Clock, Search, ShieldCheck, Play, Eye } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function WithdrawalsManagement() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAdminWithdrawals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("gft_token");
      if (!token) return;
      const res = await fetch(`${API_URL}/withdrawals/admin/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setWithdrawals(data.data.withdrawals || data.data || []);
      }
    } catch (err) {
      console.error("Failed to load admin withdrawals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminWithdrawals();
  }, []);

  const handleStartReview = async (id) => {
    setActionLoading(id);
    setActionMessage(null);
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/withdrawals/admin/${id}/review`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });
      const data = await res.json();
      if (data.status === "success") {
        setActionMessage({ type: "success", text: "Review started successfully." });
        fetchAdminWithdrawals();
      } else {
        setActionMessage({ type: "error", text: data.message || "Failed to start review." });
      }
    } catch (err) {
      setActionMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    setActionMessage(null);
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/withdrawals/admin/${id}/approve`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });
      const data = await res.json();
      if (data.status === "success") {
        setActionMessage({ type: "success", text: "Withdrawal approved successfully." });
        fetchAdminWithdrawals();
      } else {
        setActionMessage({ type: "error", text: data.message || "Approval failed." });
      }
    } catch (err) {
      setActionMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt("Enter rejection reason:");
    if (!reason) return;

    setActionLoading(id);
    setActionMessage(null);
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/withdrawals/admin/${id}/reject`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ reason })
      });
      const data = await res.json();
      if (data.status === "success") {
        setActionMessage({ type: "success", text: "Withdrawal rejected and funds refunded to ledger." });
        fetchAdminWithdrawals();
      } else {
        setActionMessage({ type: "error", text: data.message || "Rejection failed." });
      }
    } catch (err) {
      setActionMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const handleProcessPayout = async (id) => {
    setActionLoading(id);
    setActionMessage(null);
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/withdrawals/admin/${id}/process`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });
      const data = await res.json();
      if (data.status === "success") {
        setActionMessage({ type: "success", text: "Payout process executed." });
        fetchAdminWithdrawals();
      } else {
        setActionMessage({ type: "error", text: data.message || "Payout execution failed." });
      }
    } catch (err) {
      setActionMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'withdrawalId',
      header: 'Withdrawal ID',
      cell: info => <span className="font-mono text-xs text-gray-600 dark:text-gray-300">{info.getValue() || info.row.original._id}</span>
    },
    {
      accessorKey: 'userId',
      header: 'User / Member ID',
      cell: info => <span className="font-medium dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'amountPaisa',
      header: 'Amount',
      cell: info => {
        const paisa = info.getValue();
        const rupees = paisa ? (paisa / 100).toFixed(2) : (info.row.original.amount || 0);
        return <span className="font-bold text-[#65B300]">₹{rupees}</span>;
      }
    },
    {
      accessorKey: 'destinationType',
      header: 'Destination',
      cell: info => (
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded text-gray-700 dark:text-gray-300 font-semibold">
          {info.getValue() || "USDT"}
        </span>
      )
    },
    {
      accessorKey: 'createdAt',
      header: 'Requested Date',
      cell: info => {
        const val = info.getValue();
        return <span className="text-xs text-gray-500">{val ? new Date(val).toLocaleDateString() : "-"}</span>;
      }
    },
    {
      accessorKey: 'status',
      header: 'State Machine Status',
      cell: info => {
        const status = String(info.getValue() || "REQUESTED").toUpperCase();
        let color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        let Icon = Clock;
        
        if (status === 'COMPLETED' || status === 'APPROVED') {
          color = 'bg-green-100 text-green-800 border-green-200';
          Icon = CheckCircle;
        } else if (status === 'UNDER_REVIEW') {
          color = 'bg-blue-100 text-blue-800 border-blue-200';
          Icon = Eye;
        } else if (status === 'PROCESSING') {
          color = 'bg-indigo-100 text-indigo-800 border-indigo-200';
          Icon = Play;
        } else if (status === 'REJECTED' || status === 'FAILED') {
          color = 'bg-red-100 text-red-800 border-red-200';
          Icon = XCircle;
        }
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 w-fit ${color}`}>
            <Icon size={12} />
            {status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      header: 'Phase 8 Transition Actions',
      cell: ({ row }) => {
        const item = row.original;
        const status = String(item.status || "REQUESTED").toUpperCase();
        const id = item.withdrawalId || item._id;
        const isCurrentLoading = actionLoading === id;

        if (status === 'REQUESTED') {
          return (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => handleStartReview(id)}
                disabled={isCurrentLoading}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded text-xs font-semibold transition-colors cursor-pointer"
                title="Start Review"
              >
                Start Review
              </button>
              <button 
                onClick={() => handleReject(id)}
                disabled={isCurrentLoading}
                className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded text-xs font-semibold transition-colors cursor-pointer"
                title="Reject"
              >
                Reject
              </button>
            </div>
          );
        }

        if (status === 'UNDER_REVIEW') {
          return (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => handleApprove(id)}
                disabled={isCurrentLoading}
                className="px-2.5 py-1 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded text-xs font-semibold transition-colors cursor-pointer"
                title="Approve"
              >
                Approve
              </button>
              <button 
                onClick={() => handleReject(id)}
                disabled={isCurrentLoading}
                className="px-2.5 py-1 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded text-xs font-semibold transition-colors cursor-pointer"
                title="Reject"
              >
                Reject
              </button>
            </div>
          );
        }

        if (status === 'APPROVED') {
          return (
            <button 
              onClick={() => handleProcessPayout(id)}
              disabled={isCurrentLoading}
              className="px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded text-xs font-semibold transition-colors cursor-pointer"
              title="Process Payout"
            >
              Process Payout
            </button>
          );
        }

        return <span className="text-gray-400 text-xs font-medium">Finalized</span>;
      }
    }
  ], [actionLoading]);

  const filteredWithdrawals = useMemo(() => {
    if (!searchQuery) return withdrawals;
    const q = searchQuery.toLowerCase();
    return withdrawals.filter(w => 
      (w.withdrawalId && w.withdrawalId.toLowerCase().includes(q)) ||
      (w.userId && w.userId.toLowerCase().includes(q)) ||
      (w.destinationReference && w.destinationReference.toLowerCase().includes(q))
    );
  }, [withdrawals, searchQuery]);

  const stats = useMemo(() => {
    const total = withdrawals.length;
    const requested = withdrawals.filter(w => String(w.status).toUpperCase() === 'REQUESTED').length;
    const underReview = withdrawals.filter(w => String(w.status).toUpperCase() === 'UNDER_REVIEW').length;
    const approved = withdrawals.filter(w => ['APPROVED', 'PROCESSING', 'COMPLETED'].includes(String(w.status).toUpperCase())).length;
    return { total, requested, underReview, approved };
  }, [withdrawals]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <ArrowDownToLine className="text-[#65B300]" />
            Withdrawal Management (Phase 8 State Machine)
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Authoritative withdrawal reviews enforced via strict state transitions: REQUESTED &rarr; UNDER_REVIEW &rarr; APPROVED &rarr; PROCESSING &rarr; COMPLETED.
          </p>
        </div>
      </div>

      {actionMessage && (
        <div className={`p-4 rounded-xl text-xs font-bold border ${
          actionMessage.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
            : 'bg-rose-50 text-rose-700 border-rose-200'
        }`}>
          {actionMessage.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Requests" value={String(stats.total)} icon={ArrowDownToLine} delay={0.1} />
        <StatCard title="Requested (New)" value={String(stats.requested)} icon={Clock} delay={0.2} />
        <StatCard title="Under Review" value={String(stats.underReview)} icon={Eye} delay={0.3} />
        <StatCard title="Approved / Settled" value={String(stats.approved)} icon={CheckCircle} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold dark:text-white flex items-center gap-2 text-sm">
            <Clock size={16} className="text-[#65B300]" />
            Live Authoritative Queue
          </h3>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by ID or User..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 dark:border-[#0A4D45] bg-white dark:bg-[#031E1C] text-gray-800 dark:text-white outline-none"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="py-16 text-center text-xs text-gray-500">Loading authoritative withdrawals...</div>
        ) : (
          <DataTable data={filteredWithdrawals} columns={columns} />
        )}
      </div>
    </div>
  );
}
