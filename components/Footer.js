"use client";

import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import GFTLogo from "./GFTLogo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gft-dark-bg text-white pt-20 pb-8 border-t border-gft-border-dark">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand & Description */}
        <div className="flex flex-col gap-5">
          <GFTLogo className="h-9 w-auto" light={true} />
          <p className="text-white/70 text-[14px] leading-relaxed max-w-sm mt-2">
            Pioneering digital wealth creation through smart network marketing, sustainable blockchain technology, and robust community empowerment.
          </p>
          <div className="flex gap-4 mt-2">
            {[
              {
                name: "Facebook",
                href: "#",
                svg: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                )
              },
              {
                name: "Twitter",
                href: "#",
                svg: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )
              },
              {
                name: "Instagram",
                svg: (
                  <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                ),
                href: "#"
              },
              {
                name: "Linkedin",
                href: "#",
                svg: (
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                )
              }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-gft-accent hover:border-gft-accent transition-all hover:shadow-[0_0_10px_rgba(140,216,61,0.2)]"
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold tracking-wide text-gft-accent mb-6">Company Links</h3>
          <ul className="flex flex-col gap-3.5">
            {[
              { name: "About Company", href: "/about" },
              { name: "Business Plan", href: "/business-plan" },
              { name: "Offers & Promos", href: "/offers" },
              { name: "Support Desk", href: "/contact" },
              { name: "Member Login", href: "/login" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white/70 hover:text-gft-primary text-[14px] transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h3 className="text-lg font-semibold tracking-wide text-gft-accent mb-6">Support & Policy</h3>
          <ul className="flex flex-col gap-3.5">
            {[
              { name: "Terms & Conditions", href: "/payment-policy" },
              { name: "Withdrawal Policy", href: "/payment-policy" },
              { name: "KYC Requirements", href: "/payment-policy" },
              { name: "Privacy Policy", href: "/payment-policy" },
              { name: "Contact Helpdesk", href: "/contact" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white/70 hover:text-gft-primary text-[14px] transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold tracking-wide text-gft-accent mb-6">Contact Info</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gft-primary shrink-0 mt-0.5" />
              <span className="text-white/70 text-[14px] leading-relaxed">
                Green Tech Tower, 24th Floor, Fintech Boulevard, Hyderabad, TS, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gft-primary" />
              <a href="mailto:support@gft.com" className="text-white/70 hover:text-gft-primary text-[14px]">
                support@gft.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gft-primary" />
              <a href="tel:+919876543210" className="text-white/70 hover:text-gft-primary text-[14px]">
                +91 98765 43210
              </a>
            </li>
          </ul>

          {/* Newsletter signup */}
          <div className="mt-6">
            <h4 className="text-[13px] uppercase font-bold tracking-wider text-white/50 mb-3">Newsletter</h4>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-white/5 border border-white/10 rounded-l-md px-4 py-2 text-[14px] text-white outline-none focus:border-gft-primary"
              />
              <button
                type="submit"
                className="bg-gft-primary hover:bg-gft-accent text-white px-4 py-2 rounded-r-md transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/50 text-[13px]">
        <span>&copy; {currentYear} Green Future Tech. All Rights Reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gft-primary">Secured by SSL</a>
          <a href="#" className="hover:text-gft-primary">GFT Smart Contract</a>
        </div>
      </div>
    </footer>
  );
}
