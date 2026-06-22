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
          ? "bg-white/95 backdrop-blur-md py-4 shadow-lg border-b border-gft-gray-light"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center animate-fade-in">
          <GFTLogo className="h-9 w-auto" light={!scrolled} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[15px] font-medium transition-colors relative group py-2 ${
                scrolled
                  ? "text-gft-deep/80 hover:text-gft-primary"
                  : "text-white/85 hover:text-gft-accent"
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                scrolled ? "bg-gft-primary" : "bg-gft-accent"
              }`} />
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className={`text-[15px] font-semibold transition-colors px-4 py-2 ${
              scrolled
                ? "text-gft-dark hover:text-gft-primary"
                : "text-white/90 hover:text-gft-accent"
            }`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-gft-primary hover:bg-gft-accent text-white text-[14px] font-semibold px-6 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg shadow-gft-primary/20 hover:-translate-y-0.5"
          >
            Join Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors cursor-pointer ${
            scrolled ? "text-gft-deep" : "text-white"
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 border-b p-6 flex flex-col gap-5 shadow-2xl transition-all duration-300 ${
          scrolled 
            ? "bg-white border-gft-gray-light text-gft-deep"
            : "bg-gft-card-dark border-gft-border-dark text-white"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-base font-semibold transition-colors ${
                scrolled
                  ? "text-gft-deep hover:text-gft-primary"
                  : "text-white hover:text-gft-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className={scrolled ? "border-gft-gray-light" : "border-gft-border-dark"} />
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className={`text-center font-bold py-3 border rounded-full ${
                scrolled
                  ? "text-gft-dark border-gft-dark/20 hover:bg-gft-light"
                  : "text-white border-white/20 hover:bg-white/5"
              }`}
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="bg-gft-primary hover:bg-gft-accent text-center font-bold text-white py-3 rounded-full flex items-center justify-center gap-1.5 shadow-md shadow-gft-primary/20"
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
