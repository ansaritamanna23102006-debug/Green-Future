"use client";

import React, { useState, useEffect } from "react";
import { Compass, Calendar, ArrowRight, ShieldCheck, Flame, X, CheckCircle, Award } from "lucide-react";
import { useApp } from "@/lib/context/AppContext";

// Countdown timer helper component
function OfferCountdown({ daysLeft }) {
  const [timeLeft, setTimeLeft] = useState({
    days: daysLeft,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-2 text-center text-white select-none">
      {[
        { label: "D", val: timeLeft.days },
        { label: "H", val: timeLeft.hours },
        { label: "M", val: timeLeft.minutes },
        { label: "S", val: timeLeft.seconds }
      ].map((t, i) => (
        <div key={i} className="flex flex-col bg-gft-dark-bg/60 border border-white/10 px-2.5 py-1.5 rounded-xl min-w-[45px]">
          <span className="text-sm sm:text-base font-extrabold tracking-tight">{t.val.toString().padStart(2, "0")}</span>
          <span className="text-[8px] uppercase font-bold text-white/55">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function OffersPage() {
  const [activeOffer, setActiveOffer] = useState(null);

  const offers = [
    {
      id: 1,
      title: "Dubai Leadership Retreat 2026",
      tagline: "Unleash your potential in luxury",
      description: "Introduce 20 direct active members and secure a total Team Matching turnover of $50,000 before the deadline to win a fully-sponsored 5-day leadership retreat to Dubai.",
      target: "$50,000 Volume",
      achieved: "$42,000 Volume",
      progress: 84,
      daysLeft: 38,
      rewards: ["Luxury 5-Star Hotel Accommodations", "Exclusive Leadership Workshop with CEO", "Desert Safari & Yacht Networking gala", "Fully paid flight tickets"],
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Tesla Model Y Promotion",
      tagline: "Eco-Friendly Leadership Car Award",
      description: "Achieve the rank of Emerald Director and introduce 50 active direct members to qualify for a lease-free GFT sponsored Tesla Model Y.",
      target: "50 Active Directs",
      achieved: "34 Active Directs",
      progress: 68,
      daysLeft: 72,
      rewards: ["Brand new Tesla Model Y (GFT Edition)", "Free EV Supercharging for 1 year", "Custom vehicle decals", "Direct ranking promotion pool"],
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gft-deep">Offers & Promos</h1>
        <p className="text-gft-deep/60 text-sm mt-1">Participate in corporate network challenge pools and qualify for luxury retreats or car awards.</p>
      </div>

      {/* Offers List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white border border-gft-gray-light rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Banner block */}
            <div className="h-48 relative overflow-hidden flex items-end">
              <img
                src={offer.image}
                alt={offer.title}
                className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              
              {/* Overlay elements */}
              <div className="relative z-10 p-6 flex justify-between items-end w-full gap-4 flex-wrap">
                <div>
                  <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-widest text-gft-accent bg-gft-dark-bg/60 border border-gft-accent/30 px-2.5 py-1.5 rounded-full mb-2">
                    <Flame className="h-3 w-3 text-gft-accent fill-gft-accent" /> Active Promotion
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{offer.title}</h3>
                </div>
                
                {/* Countdown Timer */}
                <OfferCountdown daysLeft={offer.daysLeft} />
              </div>
            </div>

            {/* Progress stats */}
            <div className="p-6 flex flex-col gap-5">
              <p className="text-xs sm:text-[13px] leading-relaxed text-gft-deep/75">
                {offer.tagline}. {offer.description.slice(0, 100)}...
              </p>

              {/* Progress Bar */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gft-deep/45 font-bold uppercase tracking-wider">Qualification Target</span>
                  <span className="font-extrabold text-gft-primary">{offer.achieved} / {offer.target}</span>
                </div>
                <div className="w-full bg-gft-light h-3.5 rounded-full border border-gft-gray-light overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gft-primary to-gft-accent h-full rounded-full transition-all duration-1000"
                    style={{ width: `${offer.progress}%` }}
                  />
                </div>
                <span className="text-[10px] text-right font-bold text-gft-deep/60">{offer.progress}% Achieved</span>
              </div>

              <button
                onClick={() => setActiveOffer(offer)}
                className="w-full bg-gft-light hover:bg-gft-primary hover:text-white border border-gft-gray-light hover:border-transparent font-bold text-xs uppercase py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                Qualify Details <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Offer Details Modal */}
      {activeOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gft-deep/50 backdrop-blur-md p-6">
          <div className="bg-white border border-gft-gray-light rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveOffer(null)}
              className="absolute top-5 right-5 p-2 rounded-xl hover:bg-gft-light text-gft-deep transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6 border-b border-gft-gray-light pb-4">
              <div className="w-12 h-12 bg-gft-primary/10 text-gft-primary rounded-2xl flex items-center justify-center">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-gft-primary">Promotion qualification details</span>
                <h2 className="text-xl font-bold text-gft-deep">{activeOffer.title}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-5 text-sm text-gft-deep/80 leading-relaxed">
              <p>{activeOffer.description}</p>

              {/* Progress stats */}
              <div className="p-4 bg-gft-light border border-gft-gray-light rounded-2xl">
                <div className="flex justify-between items-center text-xs font-bold mb-2">
                  <span>Current Standing</span>
                  <span className="text-gft-primary">{activeOffer.progress}% Qualify Match</span>
                </div>
                <div className="flex justify-between text-xs text-gft-deep/60">
                  <span>Achieved: {activeOffer.achieved}</span>
                  <span>Required: {activeOffer.target}</span>
                </div>
              </div>

              {/* Rewards Checklist */}
              <div>
                <h4 className="text-xs uppercase font-extrabold text-gft-deep/60 tracking-wider mb-3">Rewards Included:</h4>
                <ul className="flex flex-col gap-2.5">
                  {activeOffer.rewards.map((reward, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <CheckCircle className="h-4.5 w-4.5 text-gft-primary shrink-0 mt-0.5" />
                      <span>{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => setActiveOffer(null)}
              className="w-full bg-gft-primary hover:bg-gft-accent text-white font-bold py-3.5 rounded-2xl text-center shadow-lg transition-all mt-8 cursor-pointer"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
