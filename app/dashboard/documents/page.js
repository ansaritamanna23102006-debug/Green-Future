"use client";

import React, { useState } from "react";
import { FileText, Download, ShieldCheck, Filter, Search, Award, FileCode } from "lucide-react";

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const documents = [
    {
      title: "GFT Incorporation Certificate",
      category: "Certificates",
      description: "Official certificate of incorporation issued by the Registrar of Companies.",
      fileSize: "1.2 MB",
      format: "PDF",
      date: "2025-06-15"
    },
    {
      title: "ISO 9001:2015 Green Audit",
      category: "Certificates",
      description: "Quality management and carbon verification audit certificate for GFT Solar projects.",
      fileSize: "2.4 MB",
      format: "PDF",
      date: "2026-01-10"
    },
    {
      title: "Affiliate Compensation Plan V3",
      category: "Presentations",
      description: "Detailed slide deck outlining direct margins, binary wings matching, and leadership ranks.",
      fileSize: "6.8 MB",
      format: "PPTX",
      date: "2026-05-20"
    },
    {
      title: "GFT Whitepaper & Roadmap 2.0",
      category: "Legal Documents",
      description: "Technical document describing the tokenomics, renewable staking protocol, and compliance architecture.",
      fileSize: "4.5 MB",
      format: "PDF",
      date: "2026-02-18"
    },
    {
      title: "Withdrawal & Payout Policy",
      category: "Company Policies",
      description: "Regulatory rules governing standard and accelerated withdrawal options.",
      fileSize: "840 KB",
      format: "PDF",
      date: "2026-06-01"
    },
    {
      title: "Compliance Terms & Code of Ethics",
      category: "Company Policies",
      description: "Guidelines and ethical rules governing social promotions and affiliate binary wing recruiting.",
      fileSize: "1.1 MB",
      format: "PDF",
      date: "2025-11-20"
    }
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = activeCategory === "All" || doc.category === activeCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (title) => {
    alert(`Starting download for: ${title}`);
  };

  const categories = ["All", "Certificates", "Legal Documents", "Company Policies", "Presentations"];

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Company Documents</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Official Certificates, Legal Documents, Presentations, and Company Policies available for download.</p>
      </div>

      {/* Filter and Search Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gft-gray-light shadow-sm">
        <div className="flex overflow-x-auto gap-2 w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-gft-dark text-white"
                  : "bg-gft-light hover:bg-gft-gray-light text-gft-deep"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gft-deep/40">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document library..."
            className="w-full bg-gft-light border border-gft-gray-light rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-gft-primary"
          />
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full bg-white border border-gft-gray-light p-10 rounded-2xl text-center font-bold text-gft-deep/45 text-sm">
            No matching documents found in category.
          </div>
        ) : (
          filteredDocs.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white border border-gft-gray-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gft-light flex items-center justify-center text-gft-dark">
                    {doc.category === "Certificates" ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <FileText className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-[10px] bg-gft-primary/10 text-gft-primary border border-gft-primary/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {doc.format}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gft-deep leading-snug">{doc.title}</h3>
                <p className="text-gft-deep/60 text-xs mt-2 leading-relaxed h-12 overflow-hidden text-ellipsis">
                  {doc.description}
                </p>
              </div>

              <div className="border-t border-gft-gray-light mt-6 pt-4 flex justify-between items-center text-xs">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase font-bold text-gft-deep/45">Size</span>
                  <span className="font-bold text-gft-deep/80">{doc.fileSize}</span>
                </div>
                <button
                  onClick={() => handleDownload(doc.title)}
                  className="bg-gft-primary hover:bg-gft-accent text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SSL compliance card */}
      <div className="bg-gft-dark text-white p-6 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-gft-accent shrink-0">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm font-bold uppercase tracking-wide">Secure Document Vault</h4>
          <p className="text-xs text-white/70 mt-1">All contracts and corporate plans are signed and timestamped using SHA-256 digital protocols.</p>
        </div>
      </div>
    </div>
  );
}
