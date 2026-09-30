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
    { name: "Vision", href: "/vision-mission" },
    { name: "Packages", href: "/packages" },
    { name: "Refer", href: "/refer-earn" },
    { name: "Ranks", href: "/ranks-rewards" },
    { name: "Token", href: "/gft-token" },
    { name: "Offers", href: "/offers" },
  ];

  const isLinkActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gft-dark-bg/90 backdrop-blur-md py-4 shadow-lg border-b border-gft-primary/45"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center animate-fade-in transition-all duration-300">
          <GFTLogo className="h-10 sm:h-11 md:h-12 w-auto shrink-0" light={true} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-3.5 lg:gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] lg:text-[14.5px] xl:text-[15px] transition-all relative group py-2 whitespace-nowrap ${
                  active
                    ? "text-gft-primary font-bold drop-shadow-[0_0_8px_rgba(101,179,0,0.5)]"
                    : "text-white/80 hover:text-white font-medium"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 bg-gft-primary ${
                    active ? "w-full shadow-[0_0_8px_rgba(101,179,0,0.8)]" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3.5 shrink-0">
          <Link
            href="/login"
            className="text-[13px] lg:text-[14px] font-semibold transition-colors px-3 py-2 text-white/90 hover:text-gft-primary whitespace-nowrap"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-gft-primary hover:bg-gft-accent text-gft-deep text-[13px] lg:text-[14px] font-bold px-4 lg:px-6 py-2 lg:py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg shadow-gft-primary/20 hover:-translate-y-0.5 gold-shine-sweep whitespace-nowrap"
          >
            Join Now
            <ArrowRight className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
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
        <div className="md:hidden absolute top-full left-0 right-0 border-b p-5 sm:p-6 flex flex-col gap-3 shadow-2xl transition-all duration-300 bg-gft-card-dark border-gft-border-dark text-white max-h-[calc(100vh-5rem)] overflow-y-auto">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-base transition-all px-4 py-2.5 rounded-xl flex items-center justify-between ${
                  active
                    ? "bg-gft-primary/15 text-gft-primary border border-gft-primary/30 font-bold"
                    : "text-white/80 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="w-2 h-2 rounded-full bg-gft-primary shadow-[0_0_6px_rgba(101,179,0,0.8)]" />
                )}
              </Link>
            );
          })}
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
