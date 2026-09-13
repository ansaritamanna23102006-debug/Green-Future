"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileCheck,
  FileSearch,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Search,
  ChevronRight,
  Eye,
  ShieldAlert,
  ArrowRight,
  UserCheck,
  Lock
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const DOC_TYPES = [
  { id: "aadhaarFront", label: "Aadhaar Front" },
  { id: "aadhaarBack", label: "Aadhaar Back" },
  { id: "panCard", label: "PAN Card" },
  { id: "bankPassbook", label: "Bank Passbook" }
];

export default function KYCManagement() {
  const { fetchAdminKycQueue, startKycReview, submitKycDecision, superAdminKycOverride, user } = useApp();

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [queue, setQueue] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0 });
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Review modal state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [activeDocPreview, setActiveDocPreview] = useState("aadhaarFront");
  const [docToken, setDocToken] = useState("");

  // Decision inputs
  const [decisionType, setDecisionType] = useState(null); // 'APPROVE' | 'REJECT' | 'RESUBMISSION_REQUIRED' | 'OVERRIDE'
  const [decisionReason, setDecisionReason] = useState("");
  const [flaggedDocs, setFlaggedDocs] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState({ type: "", text: "" });

  const isSuperAdmin = user?.role === "superadmin";

  const loadQueue = useCallback(async () => {
    setLoading(true);
    setFeedbackMsg({ type: "", text: "" });
    const res = await fetchAdminKycQueue({
      status: filterStatus,
      search: searchQuery,
      page: pagination.page,
      limit: pagination.limit
    });
    if (res.success && res.data) {
      setQueue(res.data.users || []);
      if (res.data.pagination) {
        setPagination((prev) => ({
          ...prev,
          page: res.data.pagination.page,
          total: res.data.pagination.total
        }));
      }
    } else {
      setFeedbackMsg({ type: "error", text: res.error || "Failed to load KYC queue" });
    }
    setLoading(false);
  }, [fetchAdminKycQueue, filterStatus, searchQuery, pagination.page, pagination.limit]);

  useEffect(() => {
    loadQueue();
    if (typeof window !== "undefined") {
      setDocToken(localStorage.getItem("gft_token") || "");
    }
  }, [loadQueue]);

  // Handle explicit start review
  const handleStartReview = async (userId) => {
    setActionLoading(true);
    setFeedbackMsg({ type: "", text: "" });
    const res = await startKycReview(userId);
    setActionLoading(false);

    if (res.success) {
      setFeedbackMsg({ type: "success", text: res.message || "Review started successfully." });
      // Update local state
      if (selectedCandidate && selectedCandidate._id === userId) {
        setSelectedCandidate((prev) => ({
          ...prev,
          kyc: { ...prev.kyc, status: "UNDER_REVIEW" }
        }));
      }
      await loadQueue();
    } else {
      setFeedbackMsg({ type: "error", text: res.error || "Failed to start review." });
    }
  };

  // Handle decision submit
  const handleExecuteDecision = async () => {
    if (!selectedCandidate || !decisionType) return;

    if (decisionType === "REJECT" && !decisionReason.trim()) {
      setFeedbackMsg({ type: "error", text: "Rejection reason is mandatory." });
      return;
    }

    if (decisionType === "RESUBMISSION_REQUIRED") {
      if (!decisionReason.trim()) {
        setFeedbackMsg({ type: "error", text: "Resubmission instructions/reason are mandatory." });
        return;
      }
      if (flaggedDocs.length === 0) {
        setFeedbackMsg({ type: "error", text: "Select at least one document requiring resubmission." });
        return;
      }
    }

    if (decisionType === "OVERRIDE") {
      if (!decisionReason.trim()) {
        setFeedbackMsg({ type: "error", text: "Super admin override reason is mandatory." });
        return;
      }
      setActionLoading(true);
      const res = await superAdminKycOverride({
        userId: selectedCandidate._id,
        overrideAction: "REOPEN_FOR_REVIEW",
        reason: decisionReason.trim()
      });
      setActionLoading(false);
      if (res.success) {
        setFeedbackMsg({ type: "success", text: "Approved KYC successfully reopened for review." });
        setDecisionType(null);
        setDecisionReason("");
        setSelectedCandidate(null);
        await loadQueue();
      } else {
        setFeedbackMsg({ type: "error", text: res.error || "Override failed." });
      }
      return;
    }

    setActionLoading(true);
    const res = await submitKycDecision({
      userId: selectedCandidate._id,
      decision: decisionType,
      reason: decisionReason.trim() || (decisionType === "APPROVE" ? "All identity documents verified and approved." : ""),
      flaggedDocuments: flaggedDocs
    });
    setActionLoading(false);

    if (res.success) {
      setFeedbackMsg({ type: "success", text: res.message || "KYC decision recorded successfully." });
      setDecisionType(null);
      setDecisionReason("");
      setFlaggedDocs([]);
      setSelectedCandidate(null);
      await loadQueue();
    } else {
      setFeedbackMsg({ type: "error", text: res.error || "Failed to record KYC decision." });
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "NOT_STARTED").toUpperCase();
    switch (s) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "UNDER_REVIEW":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "RESUBMISSION_REQUIRED":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "REJECTED":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "DRAFT":
        return "bg-slate-100 text-slate-700 border-slate-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FileCheck className="text-[#65B300]" />
            KYC & Verification Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Review identity documents, execute compliance reviews, and record auditable decisions.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search user / ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-xl text-gray-800 dark:text-white focus:outline-none focus:border-[#65B300]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-xl text-gray-800 dark:text-white focus:outline-none focus:border-[#65B300]"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUBMITTED">Submitted (Pending Review)</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="RESUBMISSION_REQUIRED">Resubmission Required</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <button
            onClick={loadQueue}
            className="p-2 bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-xl text-gray-600 dark:text-gray-300 hover:text-[#65B300] transition-colors"
            title="Refresh queue"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedbackMsg.text && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
            feedbackMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {feedbackMsg.type === "success" ? <CheckCircle className="h-4 w-4 shrink-0" /> : <AlertTriangle className="h-4 w-4 shrink-0" />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* KYC Queue Table */}
      <div className="bg-white dark:bg-[#062F2D] rounded-2xl border border-gray-200 dark:border-[#0A4D45] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-[#0A4D45]/50 border-b border-gray-200 dark:border-[#0A4D45] text-gray-500 dark:text-gray-300 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Member ID</th>
                <th className="py-3.5 px-4">Name / Contact</th>
                <th className="py-3.5 px-4">Submitted At</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Documents</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#0A4D45]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-[#65B300]" />
                    Loading KYC records...
                  </td>
                </tr>
              ) : queue.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No KYC submissions match the selected criteria.
                  </td>
                </tr>
              ) : (
                queue.map((row) => {
                  const kyc = row.kyc || {};
                  const status = (kyc.status || "NOT_STARTED").toUpperCase();
                  const isUnder = status === "UNDER_REVIEW";
                  const isSub = status === "SUBMITTED";
                  const isApp = status === "APPROVED";

                  return (
                    <tr key={row._id} className="hover:bg-gray-50/50 dark:hover:bg-[#0A4D45]/20 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-gray-800 dark:text-white">
                        {row.userId || row.memberId || row._id.slice(-6)}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900 dark:text-white">{row.name}</div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400">{row.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300">
                        {kyc.submittedAt ? new Date(kyc.submittedAt).toLocaleString() : "—"}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border uppercase ${getStatusBadge(status)}`}>
                          {status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1">
                          {DOC_TYPES.map((d) => {
                            const exists = kyc.documents?.[d.id]?.storedFilename;
                            const isFlagged = kyc.flaggedDocuments?.includes(d.id);
                            return (
                              <span
                                key={d.id}
                                title={`${d.label}: ${isFlagged ? "Flagged" : exists ? "Uploaded" : "Missing"}`}
                                className={`w-2.5 h-2.5 rounded-full ${
                                  isFlagged
                                    ? "bg-orange-500 ring-2 ring-orange-200"
                                    : exists
                                    ? "bg-emerald-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Correction 1: Explicit Start Review Button */}
                          {isSub && (
                            <button
                              onClick={() => handleStartReview(row._id)}
                              disabled={actionLoading}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[11px] font-bold transition-all cursor-pointer shadow-sm"
                            >
                              Start Review
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setSelectedCandidate(row);
                              setDecisionType(null);
                              setDecisionReason("");
                              setFlaggedDocs([]);
                            }}
                            className="px-3 py-1 bg-[#65B300]/10 hover:bg-[#65B300]/20 text-[#65B300] dark:text-[#88d924] rounded-lg transition-colors flex items-center gap-1 font-bold cursor-pointer"
                          >
                            <FileSearch size={13} />
                            Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review & Decision Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200 dark:border-[#0A4D45]">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#65B300]/15 text-[#65B300] flex items-center justify-center font-bold">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">
                    KYC Candidate: {selectedCandidate.name} ({selectedCandidate.userId || selectedCandidate._id.slice(-6)})
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    <span>Email: {selectedCandidate.email}</span>
                    <span>•</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold border uppercase ${getStatusBadge(selectedCandidate.kyc?.status)}`}>
                      {selectedCandidate.kyc?.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-[#0A4D45] transition-colors cursor-pointer"
              >
                <XCircle size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Side: Document Preview Tabs & Viewer (7 cols) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                  {/* Document Selector Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-[#0A4D45] pb-3">
                    {DOC_TYPES.map((d) => {
                      const exists = selectedCandidate.kyc?.documents?.[d.id]?.storedFilename;
                      const isFlagged = selectedCandidate.kyc?.flaggedDocuments?.includes(d.id);
                      const isCurrent = activeDocPreview === d.id;

                      return (
                        <button
                          key={d.id}
                          onClick={() => setActiveDocPreview(d.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                            isCurrent
                              ? "bg-[#65B300] text-white shadow"
                              : "bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                          }`}
                        >
                          <span>{d.label}</span>
                          {isFlagged ? (
                            <span className="w-2 h-2 rounded-full bg-orange-400" />
                          ) : exists ? (
                            <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Document Stream Viewer */}
                  <div className="bg-gray-100 dark:bg-[#0A4D45]/30 rounded-2xl p-4 border border-gray-200 dark:border-[#0A4D45] min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden">
                    {selectedCandidate.kyc?.documents?.[activeDocPreview]?.storedFilename ? (
                      <div className="w-full flex flex-col items-center gap-3">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          MIME: {selectedCandidate.kyc.documents[activeDocPreview].mimeType || "application/octet-stream"} • Size:{" "}
                          {((selectedCandidate.kyc.documents[activeDocPreview].sizeBytes || 0) / (1024 * 1024)).toFixed(2)} MB
                        </div>

                        {selectedCandidate.kyc.documents[activeDocPreview].mimeType === "application/pdf" ? (
                          <div className="p-8 text-center bg-white dark:bg-[#062F2D] rounded-2xl border border-gray-200 dark:border-[#0A4D45]">
                            <FileSearch size={48} className="mx-auto text-blue-500 mb-3" />
                            <p className="font-bold text-sm text-gray-800 dark:text-white">PDF Document Stored</p>
                            <a
                              href={`${API_BASE}/admin/kyc/${selectedCandidate._id}/document/${activeDocPreview}`}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow"
                            >
                              <Eye size={14} /> Open Secure Stream in New Tab
                            </a>
                          </div>
                        ) : (
                          <div className="w-full max-h-[380px] overflow-auto rounded-xl flex items-center justify-center bg-black/10">
                            {/* Authenticated stream */}
                            <img
                              src={`${API_BASE}/admin/kyc/${selectedCandidate._id}/document/${activeDocPreview}`}
                              alt={activeDocPreview}
                              className="max-h-[360px] max-w-full object-contain rounded-lg shadow"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "";
                                e.target.alt = "Failed to load document stream (authentication required)";
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-gray-400">
                        <FileSearch size={40} className="mx-auto mb-2 opacity-50" />
                        <p className="font-bold text-sm">No file uploaded for this document</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Workflow & Decisions (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  {/* Status Card */}
                  <div className="bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-2xl border border-gray-200 dark:border-[#0A4D45] space-y-2 text-xs">
                    <p className="font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider text-[10px]">
                      Application Metadata
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
                      <div>Status: <span className="font-bold text-gray-900 dark:text-white">{selectedCandidate.kyc?.status}</span></div>
                      <div>Flagged: <span className="font-bold">{selectedCandidate.kyc?.flaggedDocuments?.length || 0} docs</span></div>
                      <div>Submitted: <span>{selectedCandidate.kyc?.submittedAt ? new Date(selectedCandidate.kyc.submittedAt).toLocaleDateString() : "N/A"}</span></div>
                      <div>Reviewed: <span>{selectedCandidate.kyc?.reviewedAt ? new Date(selectedCandidate.kyc.reviewedAt).toLocaleDateString() : "N/A"}</span></div>
                    </div>

                    {selectedCandidate.kyc?.rejectionReason && (
                      <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-[11px]">
                        <strong>Previous Rejection:</strong> {selectedCandidate.kyc.rejectionReason}
                      </div>
                    )}

                    {selectedCandidate.kyc?.resubmissionReason && (
                      <div className="p-2.5 bg-orange-50 border border-orange-200 text-orange-800 rounded-xl text-[11px]">
                        <strong>Resubmission Note:</strong> {selectedCandidate.kyc.resubmissionReason}
                      </div>
                    )}
                  </div>

                  {/* Explicit Start Review Prompt if still SUBMITTED */}
                  {selectedCandidate.kyc?.status === "SUBMITTED" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs space-y-3">
                      <div className="flex items-start gap-2 font-bold">
                        <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span>Status is SUBMITTED</span>
                      </div>
                      <p className="text-[11px] text-blue-800/80">
                        Viewing documents does not silently change status. Click below to explicitly begin review and audit the action.
                      </p>
                      <button
                        onClick={() => handleStartReview(selectedCandidate._id)}
                        disabled={actionLoading}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow cursor-pointer text-xs"
                      >
                        {actionLoading ? "Starting Review..." : "Start Official Review"}
                      </button>
                    </div>
                  )}

                  {/* Review Actions when UNDER_REVIEW */}
                  {selectedCandidate.kyc?.status === "UNDER_REVIEW" && (
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-gray-700 dark:text-gray-200">Select Decision:</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setDecisionType("APPROVE")}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            decisionType === "APPROVE"
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setDecisionType("RESUBMISSION_REQUIRED")}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            decisionType === "RESUBMISSION_REQUIRED"
                              ? "bg-orange-600 text-white border-orange-600"
                              : "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
                          }`}
                        >
                          Resubmit
                        </button>
                        <button
                          onClick={() => setDecisionType("REJECT")}
                          className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            decisionType === "REJECT"
                              ? "bg-rose-600 text-white border-rose-600"
                              : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                          }`}
                        >
                          Reject
                        </button>
                      </div>

                      {/* Flagged documents selector (Correction 4) */}
                      {decisionType === "RESUBMISSION_REQUIRED" && (
                        <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 space-y-2 text-xs">
                          <p className="font-bold text-orange-900 text-[11px]">
                            Identify Affected Documents (Member replaces ONLY these):
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {DOC_TYPES.map((d) => (
                              <label key={d.id} className="flex items-center gap-2 cursor-pointer text-[11px] text-orange-950 font-semibold">
                                <input
                                  type="checkbox"
                                  checked={flaggedDocs.includes(d.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setFlaggedDocs((prev) => [...prev, d.id]);
                                    } else {
                                      setFlaggedDocs((prev) => prev.filter((id) => id !== d.id));
                                    }
                                  }}
                                  className="rounded text-orange-600 focus:ring-orange-500"
                                />
                                <span>{d.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Decision reason input */}
                      {decisionType && (
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
                            {decisionType === "APPROVE"
                              ? "Approval Notes (Optional)"
                              : decisionType === "RESUBMISSION_REQUIRED"
                              ? "Instructions for Member (Mandatory)"
                              : "Reason for Rejection (Mandatory)"}
                          </label>
                          <textarea
                            rows={3}
                            value={decisionReason}
                            onChange={(e) => setDecisionReason(e.target.value)}
                            placeholder={
                              decisionType === "APPROVE"
                                ? "Verified against government identity guidelines."
                                : decisionType === "RESUBMISSION_REQUIRED"
                                ? "Please re-upload clearer scan of PAN card with visible tax ID."
                                : "Documents are illegible or invalid."
                            }
                            className="w-full p-2.5 text-xs bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-xl text-gray-800 dark:text-white focus:outline-none focus:border-[#65B300]"
                          />
                          <button
                            onClick={handleExecuteDecision}
                            disabled={actionLoading}
                            className="w-full py-2.5 bg-[#65B300] hover:bg-[#589c00] text-white rounded-xl font-bold transition-all shadow cursor-pointer text-xs flex items-center justify-center gap-2"
                          >
                            {actionLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ArrowRight size={14} />}
                            Confirm & Record {decisionType.replace("_", " ")}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Super Admin Override for APPROVED status */}
                  {selectedCandidate.kyc?.status === "APPROVED" && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs space-y-3">
                      <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 font-bold">
                        <UserCheck size={16} />
                        <span>KYC is Approved</span>
                      </div>
                      <p className="text-[11px] text-emerald-700/80">
                        This member is fully verified. Standard admins cannot modify this state.
                      </p>

                      {isSuperAdmin && (
                        <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 space-y-2">
                          <button
                            onClick={() => setDecisionType(decisionType === "OVERRIDE" ? null : "OVERRIDE")}
                            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                          >
                            <ShieldAlert size={14} /> Super Admin Override: Reopen for Review
                          </button>

                          {decisionType === "OVERRIDE" && (
                            <div className="space-y-2">
                              <textarea
                                rows={2}
                                value={decisionReason}
                                onChange={(e) => setDecisionReason(e.target.value)}
                                placeholder="Mandatory reason for reopening approved KYC..."
                                className="w-full p-2 text-xs bg-white dark:bg-[#062F2D] border border-rose-200 rounded-xl text-gray-800 dark:text-white focus:outline-none"
                              />
                              <button
                                onClick={handleExecuteDecision}
                                disabled={actionLoading}
                                className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs cursor-pointer"
                              >
                                {actionLoading ? "Executing..." : "Confirm Override to UNDER_REVIEW"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
