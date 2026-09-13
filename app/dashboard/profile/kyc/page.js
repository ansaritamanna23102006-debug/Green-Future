"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FileCheck,
  ChevronLeft,
  Upload,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
  Eye,
  RefreshCw,
  Lock
} from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

const REQUIRED_DOCS = [
  { id: "aadhaarFront", label: "Aadhaar Card (Front)", desc: "Government photo ID card with full name & photo" },
  { id: "aadhaarBack", label: "Aadhaar Card (Back)", desc: "Reverse side showing full registered address" },
  { id: "panCard", label: "PAN Card", desc: "Permanent Account Number card for tax compliance" },
  { id: "bankPassbook", label: "Bank Passbook / Cheque", desc: "First page of passbook or cancelled cheque with account details" }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function KYCPage() {
  const router = useRouter();
  const { user, fetchKycProfile, uploadKycDocuments } = useApp();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [kycData, setKycData] = useState(null);
  const [files, setFiles] = useState({});
  const [previewUrls, setPreviewUrls] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");
    const res = await fetchKycProfile();
    if (res.success && res.data) {
      setKycData(res.data);
    } else if (res.error) {
      setErrorMsg(res.error);
    }
    setLoading(false);
  }, [fetchKycProfile]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleFileSelect = (docKey, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg(`File for ${docKey} exceeds maximum 5MB size limit.`);
      return;
    }
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) {
      setErrorMsg(`Invalid file type for ${docKey}. Allowed: JPG, PNG, PDF.`);
      return;
    }
    setErrorMsg("");
    setFiles((prev) => ({ ...prev, [docKey]: file }));

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [docKey]: url }));
    } else {
      setPreviewUrls((prev) => ({ ...prev, [docKey]: "pdf" }));
    }
  };

  const handleFileDrop = (e, docKey) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) {
      handleFileSelect(docKey, droppedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const status = kycData?.status || "NOT_STARTED";
    const flagged = kycData?.flaggedDocuments || [];
    const existingDocs = kycData?.documents || {};

    // Validate requirements:
    // If RESUBMISSION_REQUIRED, ensure all flagged documents are being replaced
    if (status === "RESUBMISSION_REQUIRED") {
      const missingFlagged = flagged.filter((f) => !files[f]);
      if (missingFlagged.length > 0) {
        setErrorMsg(`Please select replacements for all flagged documents: ${missingFlagged.join(", ")}`);
        return;
      }
    } else {
      // Must have all 4 documents either uploaded previously or selected now
      const missing = REQUIRED_DOCS.filter((d) => !files[d.id] && !existingDocs[d.id]?.uploaded);
      if (missing.length > 0) {
        setErrorMsg(`All 4 documents are required. Please upload: ${missing.map((m) => m.label).join(", ")}`);
        return;
      }
    }

    const formData = new FormData();
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    });

    setSubmitting(true);
    const res = await uploadKycDocuments(formData);
    setSubmitting(false);

    if (res.success) {
      setSuccessMsg(res.message || "KYC documents submitted successfully!");
      setFiles({});
      await loadProfile();
    } else {
      setErrorMsg(res.error || "Failed to submit KYC documents");
    }
  };

  const currentStatus = kycData?.status || "NOT_STARTED";
  const isApproved = currentStatus === "APPROVED";
  const isUnderReview = currentStatus === "UNDER_REVIEW";
  const isSubmitted = currentStatus === "SUBMITTED";
  const isResubmission = currentStatus === "RESUBMISSION_REQUIRED";
  const isRejected = currentStatus === "REJECTED";
  const isLocked = isApproved || isUnderReview || isSubmitted;

  const flaggedList = kycData?.flaggedDocuments || [];
  const existingDocs = kycData?.documents || {};

  const getStatusBadge = () => {
    switch (currentStatus) {
      case "APPROVED":
        return {
          label: "Verified & Approved",
          classes: "bg-emerald-50 text-emerald-700 border-emerald-300",
          icon: CheckCircle2
        };
      case "UNDER_REVIEW":
        return {
          label: "Under Review",
          classes: "bg-amber-50 text-amber-700 border-amber-300",
          icon: Clock
        };
      case "SUBMITTED":
        return {
          label: "Submitted (Pending Review)",
          classes: "bg-blue-50 text-blue-700 border-blue-300",
          icon: Clock
        };
      case "RESUBMISSION_REQUIRED":
        return {
          label: "Resubmission Required",
          classes: "bg-orange-50 text-orange-700 border-orange-300",
          icon: AlertTriangle
        };
      case "REJECTED":
        return {
          label: "Rejected",
          classes: "bg-rose-50 text-rose-700 border-rose-300",
          icon: XCircle
        };
      case "DRAFT":
        return {
          label: "Draft",
          classes: "bg-slate-50 text-slate-700 border-slate-300",
          icon: FileText
        };
      default:
        return {
          label: "Not Started",
          classes: "bg-slate-50 text-slate-600 border-slate-200",
          icon: AlertCircle
        };
    }
  };

  const badge = getStatusBadge();
  const BadgeIcon = badge.icon;

  if (!user && !loading) return null;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => router.push("/dashboard/profile")}
        className="flex items-center gap-1.5 text-xs font-bold text-gft-deep/60 hover:text-gft-primary transition-colors cursor-pointer self-start"
      >
        <ChevronLeft className="h-4.5 w-4.5" /> Back to Profile
      </button>

      <div className="bg-white border border-gft-gray-light rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gft-gray-light pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gft-primary/10 text-gft-primary flex items-center justify-center">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gft-deep">KYC Document Verification</h1>
              <p className="text-xs text-gft-deep/60">Official compliance and identity verification center</p>
            </div>
          </div>

          <div className={`px-3.5 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 ${badge.classes}`}>
            <BadgeIcon className="h-4 w-4" />
            <span>{badge.label}</span>
          </div>
        </div>

        {/* Status Alerts */}
        {isApproved && (
          <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4.5 flex items-start gap-3 text-emerald-800">
            <CheckCircle2 className="h-5 w-5 mt-0.5 text-emerald-600 shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm">Account Verified</p>
              <p>Your identity documents have been verified and approved by the compliance team.</p>
              {kycData?.reviewedAt && (
                <p className="text-[11px] text-emerald-700/80">Approved on: {new Date(kycData.reviewedAt).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        )}

        {isUnderReview && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4.5 flex items-start gap-3 text-amber-800">
            <Clock className="h-5 w-5 mt-0.5 text-amber-600 shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm">Review in Progress</p>
              <p>An authorized compliance administrator is currently evaluating your documents. This process typically takes under 24 hours.</p>
            </div>
          </div>
        )}

        {isSubmitted && (
          <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4.5 flex items-start gap-3 text-blue-800">
            <Clock className="h-5 w-5 mt-0.5 text-blue-600 shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm">Documents Submitted</p>
              <p>Your submission is queued for compliance verification. You will be notified once review starts.</p>
            </div>
          </div>
        )}

        {isResubmission && (
          <div className="mb-6 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4.5 flex items-start gap-3 text-orange-800">
            <AlertTriangle className="h-5 w-5 mt-0.5 text-orange-600 shrink-0" />
            <div className="text-xs space-y-1.5">
              <p className="font-bold text-sm">Action Required: Document Resubmission</p>
              <p>
                <strong>Reason:</strong> {kycData?.resubmissionReason || "Some documents require replacement."}
              </p>
              <p className="text-[11px] text-orange-700">
                You only need to replace the flagged documents below. Your valid existing documents remain intact.
              </p>
            </div>
          </div>
        )}

        {isRejected && (
          <div className="mb-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4.5 flex items-start gap-3 text-rose-800">
            <XCircle className="h-5 w-5 mt-0.5 text-rose-600 shrink-0" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-sm">KYC Application Rejected</p>
              <p><strong>Reason:</strong> {kycData?.rejectionReason || "Verification failed requirements."}</p>
              <p className="text-[11px] text-rose-700/80">Please contact support or compliance if you believe this is an error.</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3.5 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-3.5 text-xs flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Guidelines */}
        <div className="bg-gft-light/50 border border-gft-gray-light rounded-2xl p-4 mb-6 text-xs text-gft-deep/70 space-y-1">
          <p className="font-bold text-gft-deep">Document Guidelines:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[11px]">
            <li>Accepted formats: JPG, PNG, PDF (Max 5MB each).</li>
            <li>Ensure all text, numbers, photos, and signatures are clearly legible.</li>
            <li>Files are securely stored in private authenticated storage outside public web directories.</li>
          </ul>
        </div>

        {/* Documents Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REQUIRED_DOCS.map((doc) => {
              const isFlagged = isResubmission && flaggedList.includes(doc.id);
              const isUploaded = existingDocs[doc.id]?.uploaded;
              const newFileSelected = files[doc.id];
              const docDisabled = isLocked || (isResubmission && !isFlagged);

              return (
                <div
                  key={doc.id}
                  className={`border rounded-2xl p-4.5 transition-all flex flex-col justify-between ${
                    isFlagged
                      ? "border-orange-400 bg-orange-50/30"
                      : isUploaded
                      ? "border-emerald-200 bg-emerald-50/20"
                      : "border-gft-gray-light bg-white hover:border-gft-primary/40"
                  }`}
                >
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gft-deep">{doc.label}</span>
                      {isFlagged && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 border border-orange-300">
                          Resubmit This
                        </span>
                      )}
                      {isUploaded && !isFlagged && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Uploaded
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gft-deep/60 leading-relaxed">{doc.desc}</p>
                  </div>

                  {/* Selected / Uploaded File Status */}
                  <div className="mt-auto pt-3 border-t border-gft-gray-light/60">
                    {newFileSelected ? (
                      <div className="flex items-center justify-between bg-gft-light/60 rounded-xl p-2.5 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="h-4 w-4 text-gft-primary shrink-0" />
                          <span className="font-semibold text-gft-deep truncate">{newFileSelected.name}</span>
                          <span className="text-[10px] text-gft-deep/50">
                            ({(newFileSelected.size / (1024 * 1024)).toFixed(2)} MB)
                          </span>
                        </div>
                        {!docDisabled && (
                          <button
                            type="button"
                            onClick={() => {
                              setFiles((p) => {
                                const copy = { ...p };
                                delete copy[doc.id];
                                return copy;
                              });
                            }}
                            className="text-rose-500 hover:text-rose-700 text-xs font-bold px-2 py-1 cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ) : isUploaded && !isFlagged ? (
                      <div className="flex items-center justify-between text-xs text-gft-deep/70 bg-slate-50 rounded-xl p-2.5">
                        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> File on Record
                        </span>
                        {isLocked ? (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Lock className="h-3 w-3" /> Locked
                          </span>
                        ) : (
                          <span className="text-[11px] text-slate-500">Valid</span>
                        )}
                      </div>
                    ) : (
                      /* Drag & Drop / File Input */
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => !docDisabled && handleFileDrop(e, doc.id)}
                        className={`relative border border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                          docDisabled
                            ? "bg-slate-50 border-slate-200 cursor-not-allowed opacity-60"
                            : isFlagged
                            ? "bg-orange-50/50 border-orange-300 hover:bg-orange-50 cursor-pointer"
                            : "bg-gft-light/30 border-gft-primary/30 hover:bg-gft-light/60 hover:border-gft-primary cursor-pointer"
                        }`}
                      >
                        {!docDisabled && (
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            onChange={(e) => handleFileSelect(doc.id, e.target.files?.[0])}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        )}
                        <Upload className={`h-5 w-5 ${isFlagged ? "text-orange-500" : "text-gft-primary"}`} />
                        <span className="text-xs font-bold text-gft-deep">
                          {docDisabled ? "Document on Record" : "Click or Drag file to upload"}
                        </span>
                        <span className="text-[10px] text-gft-deep/50">PDF, JPG, PNG up to 5MB</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          {!isLocked && !isRejected && (
            <div className="pt-4 border-t border-gft-gray-light flex flex-col sm:flex-row justify-end items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gft-primary hover:bg-gft-primary-hover text-white font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Submitting Documents...
                  </>
                ) : isResubmission ? (
                  <>
                    <Upload className="h-4 w-4" /> Submit Flagged Replacements
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" /> Submit All Documents for Review
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
