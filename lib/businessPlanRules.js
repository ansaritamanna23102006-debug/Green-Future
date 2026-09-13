/**
 * Green Future Tech (GFT) — Frontend Display & Estimate Helpers
 * Phase 0: Display Constants & Presentation Formatting
 * 
 * IMPORTANT ARCHITECTURAL RULE:
 * This file is strictly for client-side UI rendering and interactive calculators.
 * It is NOT the financial source of truth.
 * All live balances, commissions, package prices, and withdrawals are
 * validated, calculated, and authorized EXCLUSIVELY by the backend.
 * 
 * All unconfirmed parameters carry the explicit label:
 * "Estimate — Pending Confirmation"
 */

export const ESTIMATE_NOTICE = "Estimate — Pending Confirmation";

export const DISPLAY_PACKAGES = Object.freeze([
  {
    packageId: "pkg_gft_1",
    name: "GFT-1",
    category: "Student",
    officialPrice: 3000,
    prototypePrice: 1200,
    monthlyPercentage: 5.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
  {
    packageId: "pkg_gft_2",
    name: "GFT-2",
    category: "Student",
    officialPrice: 5000,
    prototypePrice: 3000,
    monthlyPercentage: 5.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
  {
    packageId: "pkg_gft_3",
    name: "GFT-3",
    category: "Student",
    officialPrice: 10000,
    prototypePrice: 5000,
    monthlyPercentage: 5.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
  {
    packageId: "pkg_gft_4",
    name: "GFT-4",
    category: "Personal",
    officialPrice: 20000,
    prototypePrice: 20000,
    monthlyPercentage: 6.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
  {
    packageId: "pkg_gft_5",
    name: "GFT-5",
    category: "Personal",
    officialPrice: 30000,
    prototypePrice: 30000,
    monthlyPercentage: 6.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
  {
    packageId: "pkg_gft_6",
    name: "GFT-6",
    category: "Personal",
    officialPrice: 40000,
    prototypePrice: 50000,
    monthlyPercentage: 7.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
  {
    packageId: "pkg_gft_7",
    name: "GFT-7",
    category: "Business",
    officialPrice: 50000,
    prototypePrice: 100000,
    monthlyPercentage: 7.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
  {
    packageId: "pkg_gft_8",
    name: "GFT-8",
    category: "Business",
    officialPrice: 100000,
    prototypePrice: 500000,
    monthlyPercentage: 8.0,
    durationMonths: 12,
    lockInDays: 365,
    statusLabel: ESTIMATE_NOTICE,
  },
]);

export const DISPLAY_REFERENCE_LEVELS = Object.freeze([
  { level: 1, percentage: 5.0, label: "5.0% (Confirmed in PDF)" },
  { level: 2, percentage: 3.0, label: "3.0% (Confirmed in PDF)" },
  { level: 3, percentage: 2.0, label: "2.0% (Confirmed in PDF)" },
  { level: 4, percentage: 1.5, label: `1.5% (${ESTIMATE_NOTICE})` },
  { level: 5, percentage: 1.0, label: `1.0% (${ESTIMATE_NOTICE})` },
]);

export const DISPLAY_RANKS = Object.freeze([
  { rank: "Silver", turnover: 250000, fund: "2.0% (₹5,000)", rewards: "GFT Badge / Pin" },
  { rank: "Gold", turnover: 750000, fund: "1.5% (₹11,250)", rewards: "Fossil Watch (BQ2493)" },
  { rank: "Emerald", turnover: 1500000, fund: "1.0% (₹15,000)", rewards: "Emerald Ring / Gold Coin" },
  { rank: "Platinum", turnover: 3000000, fund: "0.75% (₹22,500)", rewards: "Yamaha R15 V4 Bike" },
  { rank: "Diamond", turnover: 6000000, fund: "0.50% (₹30,000)", rewards: "GFT Diamond Trophy & Cruise" },
  { rank: "Ruby", turnover: 12000000, fund: "0.25% (₹30,000)", rewards: "1-Week Thailand Tour" },
  { rank: "Chairman", turnover: 25000000, fund: "1.0% (₹2,50,000)", rewards: "Dubai Luxury Tour" },
]);

export const DISPLAY_CALENDAR = Object.freeze({
  closingCycle: "1st to 30th of every month",
  selfIncomeDays: "1st, 11th, and 21st of every month",
  turnoverFundDay: "5th of every month",
  passiveIncomeDay: "7th of every month",
  capitalLockIn: "365 Days (1 Year mandatory)",
});

/**
 * Interactive Estimate Calculator for UI Simulators (Presentation only).
 * Clearly marked as an estimate; never mutates account balances.
 */
export function calculateUiEstimate({ amount = 0, monthlyRatePct = 5.0 }) {
  const numAmount = Number(amount) || 0;
  const numRate = Number(monthlyRatePct) || 0;
  const monthly = Math.round(numAmount * (numRate / 100));
  const yearly = monthly * 12;

  return {
    amount: numAmount,
    monthlyRatePct: numRate,
    estimatedMonthlyProfit: monthly,
    estimatedYearlyProfit: yearly,
    disclaimer: "Estimated figures for illustration only. Authoritative returns are governed by backend policy confirmation.",
  };
}
