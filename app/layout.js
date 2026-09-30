import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenfuturetech.com";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Green Future Tech (GFT) | Smart Networking & Next-Gen Fintech Platform",
    template: "%s | Green Future Tech (GFT)",
  },
  description:
    "Join Green Future Tech (GFT) — a next-generation decentralized fintech and smart networking platform empowering global wealth generation with secure digital assets, AI algorithms, and verified multi-tier rewards.",
  keywords: [
    "Green Future Tech",
    "GFT Token",
    "Fintech Platform",
    "Smart Networking",
    "Digital Wealth",
    "Cryptocurrency Investment",
    "Passive Income",
    "Decentralized Finance",
    "MLM Compensation Plan",
    "Clean Tech Ecosystem",
    "Binary Network Matrix",
    "Web3 Asset Growth",
  ],
  authors: [{ name: "Green Future Tech Team", url: siteUrl }],
  creator: "Green Future Tech",
  publisher: "Green Future Tech Ecosystem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo-icon.png", sizes: "any" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    title: "Green Future Tech (GFT) | Smart Networking & Next-Gen Fintech Platform",
    description:
      "Unlock boundless financial opportunities with Green Future Tech. Smart networking, audited tokenomics, binary matrix placements, and transparent rewards.",
    url: siteUrl,
    siteName: "Green Future Tech",
    images: [
      {
        url: "/logo-icon.png",
        width: 800,
        height: 800,
        alt: "Green Future Tech Logo & Platform Identity",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Future Tech (GFT) | Smart Networking & Fintech Platform",
    description:
      "Unlock boundless financial opportunities with Green Future Tech. Smart networking, audited tokenomics, and transparent rewards.",
    images: ["/logo-icon.png"],
    creator: "@GreenFutureTech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "finance",
};

// Schema.org Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Green Future Tech",
      url: siteUrl,
      logo: `${siteUrl}/logo-icon.png`,
      sameAs: [
        "https://twitter.com/GreenFutureTech",
        "https://t.me/GreenFutureTechOfficial",
      ],
      description:
        "Green Future Tech is an advanced fintech and smart networking enterprise dedicated to sustainable wealth generation and clean tech digital assets.",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@greenfuturetech.com",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Green Future Tech",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/packages?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FinancialService",
      name: "Green Future Tech Ecosystem",
      url: siteUrl,
      description:
        "Sustainable digital wealth creation through multi-tier referral programs, automated ledger calculations, and GFT utility tokens.",
      currenciesAccepted: "USD, USDT, INR",
      paymentAccepted: "USDT TRC20, USDT BEP20, Bank Transfer",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-gft-light text-gft-deep font-sans selection:bg-gft-primary selection:text-white">
        <AppProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </AppProvider>
      </body>
    </html>
  );
}
