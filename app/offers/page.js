"use client";

import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { Compass, Image as ImageIcon, Eye, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useApp } from "@/lib/context/AppContext";

export default function OffersPage() {
  const { cmsContent } = useApp();
  const [filter, setFilter] = useState("all");
  const [selectedPoster, setSelectedPoster] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      ".offers-title",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const posters = cmsContent?.posters || [];

  const filteredPosters = posters.filter((p) => {
    if (filter === "all") return true;
    return p.category.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-4 relative z-10 offers-title">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">GFT Announcements</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Offers & Banners</h1>
          <p className="text-white/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Stay updated with GFT's latest promotional banners, corporate offers, and active rank milestone posters.
          </p>
        </div>
      </section>

      {/* Filter Options */}
      <section className="py-8 bg-white border-b border-gft-gray-light sticky top-[72px] z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex justify-center gap-4 flex-wrap">
          {["all", "offers", "announcements", "rank"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`py-2 px-5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                filter === cat
                  ? "bg-gft-primary text-white border-gft-primary shadow-sm"
                  : "bg-gft-light border-gft-gray-light text-gft-deep hover:border-gft-primary/45"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posters Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full flex-1">
        {filteredPosters.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center text-gft-deep/50 gap-4">
            <ImageIcon size={48} className="opacity-40" />
            <h3 className="text-lg font-bold">No posters found</h3>
            <p className="text-xs">No media files match this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosters.map((poster) => (
              <div
                key={poster.id}
                onClick={() => setSelectedPoster(poster)}
                className="bg-white border border-gft-gray-light rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group relative"
              >
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-gft-light">
                  <img
                    src={poster.image}
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/95 text-gft-deep p-3 rounded-full shadow-lg">
                      <Eye size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-5 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gft-deep text-sm">{poster.title}</h3>
                    <span className="text-[10px] text-gft-primary uppercase font-bold tracking-wide mt-1 block">
                      {poster.category}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-bold rounded uppercase tracking-wider">
                    {poster.status || "Active"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal Preview */}
      {selectedPoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-3xl w-full max-h-[85vh] overflow-hidden bg-[#031412] rounded-3xl border border-white/10 shadow-2xl flex flex-col p-4">
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 z-10 bg-black/40 text-white hover:bg-black/60 p-2.5 rounded-full outline-none transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="w-full flex-1 overflow-hidden flex items-center justify-center p-2">
              <img
                src={selectedPoster.image}
                alt={selectedPoster.title}
                className="max-w-full max-h-[65vh] object-contain rounded-2xl"
              />
            </div>
            <div className="pt-4 px-2 text-center text-white">
              <h3 className="font-black text-lg">{selectedPoster.title}</h3>
              <span className="text-xs text-gft-accent font-bold uppercase tracking-wider mt-1 block">
                {selectedPoster.category}
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
