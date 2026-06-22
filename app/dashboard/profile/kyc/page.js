"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FileCheck, ChevronLeft, Upload, CheckCircle2 } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

export default function KYCPage() {
  const router = useRouter();
  const { user, updateKYC } = useApp();

  const [kycFiles, setKycFiles] = useState({
    aadhaar: null,
    pan: null,
    passbook: null
  });

  const handleFileDrop = (e, documentType) => {
    e.preventDefault();
    const files = e.dataTransfer?.files || e.target.files;
    if (files && files.length > 0) {
      setKycFiles((prev) => ({ ...prev, [documentType]: files[0].name }));
      updateKYC(documentType, "Pending");
    }
  };

  const getKycBadgeColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-gft-primary/10 text-gft-primary border-gft-primary/25";
      case "Rejected":
        return "bg-rose-500/10 text-rose-600 border-rose-500/25";
      default:
        return "bg-amber-500/10 text-amber-600 border-amber-500/25";
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto select-none">
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
            <FileCheck className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gft-deep">KYC Document Verification</h1>
            <p className="text-xs text-gft-deep/45">Compliance center for processing personal identity scans.</p>
          </div>
        </div>

        <p className="text-xs text-gft-deep/60 mb-6 leading-relaxed">
          Please drag & drop or click to upload clear scanned files. Status changes are approved by GFT regulatory agents within 24 hours. Use the simulation buttons below to test UI states.
        </p>

        {/* Form elements */}
        <div className="flex flex-col gap-5">
          {["aadhaar", "pan", "passbook"].map((docType) => {
            const status = user.kycStatus[docType];
            const hasFile = kycFiles[docType];
            const isApproved = status === "Approved";

            return (
              <div key={docType} className="border border-gft-gray-light rounded-2xl p-5 bg-gft-light/35 flex flex-col sm:flex-row gap-5 justify-between items-center">
                <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                  <span className="text-sm font-bold capitalize text-gft-deep">
                    {docType === "aadhaar" && "Aadhaar Card (Identity & Address)"}
                    {docType === "pan" && "PAN Card (Tax Identification)"}
                    {docType === "passbook" && "Bank Passbook / Cancelled Cheque"}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 border text-[9px] font-extrabold uppercase rounded-full ${getKycBadgeColor(status)}`}>
                      {status}
                    </span>
                    {hasFile && <span className="text-xs text-gft-primary truncate max-w-[200px]">({hasFile})</span>}
                  </div>
                </div>

                {/* Upload elements */}
                <div className="flex items-center gap-3">
                  {!isApproved && (
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleFileDrop(e, docType)}
                      className="relative border border-dashed border-gft-dark/20 hover:border-gft-primary rounded-xl px-4 py-3 flex items-center justify-center gap-2 cursor-pointer transition-all bg-white hover:bg-gft-light"
                    >
                      <input
                        type="file"
                        onChange={(e) => handleFileDrop(e, docType)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="h-4.5 w-4.5 text-gft-dark" />
                      <span className="text-xs font-bold text-gft-deep/80">Upload Scans</span>
                    </div>
                  )}

                  {/* Status cycle simulation */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] uppercase font-bold text-gft-deep/45 text-center">Simulate State</span>
                    <div className="flex border border-gft-gray-light rounded-lg overflow-hidden text-[9px] font-bold">
                      {["Pending", "Approved", "Rejected"].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => updateKYC(docType, s)}
                          className={`px-2 py-1 transition-colors border-r last:border-0 cursor-pointer ${
                            status === s
                              ? "bg-gft-dark text-white"
                              : "bg-white hover:bg-gft-light text-gft-deep"
                          }`}
                        >
                          {s[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
