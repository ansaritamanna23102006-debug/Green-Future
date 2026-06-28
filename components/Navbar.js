"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import GFTLogo from "./GFTLogo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Plan", href: "/business-plan" },
    { name: "Offers", href: "/offers" },
    { name: "Policy", href: "/payment-policy" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gft-dark-bg/90 backdrop-blur-md py-4 shadow-lg border-b border-gft-primary/45"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center animate-fade-in hover:drop-shadow-[0_0_12px_rgba(201,163,74,0.5)] transition-all duration-300">
          <GFTLogo className="h-16 md:h-20 w-auto" light={true} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[15px] font-medium transition-colors relative group py-2 text-white/95 hover:text-gft-primary"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gft-primary" />
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-[15px] font-semibold transition-colors px-4 py-2 text-white/90 hover:text-gft-primary"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-gft-primary hover:bg-gft-accent text-gft-deep text-[14px] font-bold px-6 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg shadow-gft-primary/20 hover:-translate-y-0.5 gold-shine-sweep"
          >
            Join Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 transition-colors cursor-pointer text-white"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-b p-6 flex flex-col gap-5 shadow-2xl transition-all duration-300 bg-gft-card-dark border-gft-border-dark text-white">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-semibold transition-colors text-white hover:text-gft-primary"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gft-border-dark" />
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="text-center font-bold py-3 border rounded-full text-white border-white/20 hover:bg-white/5"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="bg-gft-primary hover:bg-gft-accent text-gft-deep text-center font-bold py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md shadow-gft-primary/20"
            >
              Join Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
