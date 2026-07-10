// Force style compile refresh
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AppProvider } from "@/lib/context/AppContext";

export const metadata = {
  title: "Green Future Tech (GFT) - Network Marketing & Fintech Platform",
  description: "Join Green Future Tech and unlock wealth opportunities through smart networking, digital assets, and team growth.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gft-light text-gft-deep font-sans">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
