"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// FAQ Accordion Card using GSAP
function FAQItem({ question, answer, isOpen, toggleOpen }) {
  const contentRef = useRef(null);
  const chevronRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(chevronRef.current, { rotate: 180, duration: 0.2 });
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(chevronRef.current, { rotate: 0, duration: 0.2 });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gft-gray-light py-4.5">
      <button
        onClick={toggleOpen}
        className="w-full flex justify-between items-center text-left py-2 focus:outline-none"
      >
        <span className="text-sm sm:text-base font-bold text-gft-deep hover:text-gft-primary transition-colors">
          {question}
        </span>
        <div ref={chevronRef}>
          <ChevronDown className="h-4.5 w-4.5 text-gft-primary" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="text-xs sm:text-sm leading-relaxed text-gft-deep/70 pt-2 pb-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  const faqs = [
    { q: "What is Green Future Tech?", a: "Green Future Tech (GFT) is a premium network marketing platform that leverages digital financing, blockchain tokens, and referral compensation architectures to fund green technology products and carbon offset initiatives." },
    { q: "How do I qualify for team binary payouts?", a: "To qualify for binary matching bonuses, you need to sponsor at least one active member in your Left Wing and one active member in your Right Wing, with active packages of ₹3,000 or more." },
    { q: "What are GFT Tokens used for?", a: "GFT tokens represent shares of green energy production assets within the ecosystem. Members can stake them for yield, convert them to USDT at exchange values, or use them to claim carbon offset certificates." },
    { q: "How fast are withdrawal requests processed?", a: "USDT withdrawals are automated via smart contracts and processed instantly (usually within 5-15 minutes depending on network confirmations)." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gft-light overflow-x-hidden selection:bg-gft-primary selection:text-white">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-gft-dark-bg via-[#082E2B] to-[#031412] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col gap-5 relative z-10">
          <span className="text-gft-accent font-bold text-xs uppercase tracking-widest">Support Center</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact Customer Helpdesk</h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Need assistance with your packages, referral placements, or USDT withdrawals? Reach out to our 24/7 technical desk.
          </p>
        </div>
      </section>

      {/* Grid of contact details & form */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Contact Channels & FAQ */}
        <div className="lg:col-span-6 flex flex-col gap-10">
          <div className="flex flex-col gap-5 bg-white border border-gft-gray-light p-6 rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold text-gft-deep">Support Channels</h2>
            
            <div className="flex flex-col gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gft-primary" />
                <a href="mailto:support@gft.com" className="text-gft-deep hover:text-gft-primary font-semibold">
                  support@gft.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gft-primary" />
                <a href="tel:+919876543210" className="text-gft-deep hover:text-gft-primary font-semibold">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gft-primary shrink-0 mt-0.5" />
                <span className="text-gft-deep/80 leading-relaxed font-normal">
                  Green Tech Tower, 24th Floor, Fintech Boulevard, Hyderabad, TS, India
                </span>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gft-deep flex items-center gap-2">
              <HelpCircle className="h-5.5 w-5.5 text-gft-primary" /> General FAQ
            </h2>
            <div className="bg-white p-6 rounded-3xl border border-gft-gray-light shadow-sm flex flex-col gap-1">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={activeFAQ === idx}
                  toggleOpen={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Contact/Ticket Form */}
        <div className="lg:col-span-6 bg-white border border-gft-gray-light p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold text-gft-deep mb-6">Submit Ticket Request</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-gft-primary/10 border border-gft-primary/20 text-gft-primary text-xs font-bold rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5" /> Inquiry submitted successfully. Support will respond shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alexander Pierce"
                  className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-bold text-gft-deep/50">Your Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alexander@gft.com"
                  className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How to activate Staking Package?"
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase font-bold text-gft-deep/50">Inquiry Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message..."
                className="bg-gft-light border border-gft-gray-light rounded-xl px-4 py-3 text-[14px] outline-none focus:border-gft-primary min-h-[140px] resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gft-primary hover:bg-gft-accent text-white font-bold py-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-gft-primary/10 flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="h-3.5 w-3.5" /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
