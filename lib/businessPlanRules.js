/**
 * Green Future Tech (GFT) — Frontend Display & Estimate Helpers
 * Phase 0: Display Constants & Presentation Formatting
 * 
 * IMPORTANT ARCHITECTURAL RULE:
 * This file is strictly for client-side UI rendering and interactive calculators.
 * It is NOT the financial source of truth.
 * All live balances, commissions, package prices, and withdrawals are
 * validated, calculated, and authorized EXCLUSIVELY by the backend.
 */

export const ESTIMATE_NOTICE = "Pending final business confirmation";
export const CONFIRMED_RULE_BADGE = "Rule Confirmed";
export const CONFIRMED_RULE_NOTE = "Subject to final business-plan activation.";
export const UNCONFIRMED_RULE_BADGE = "Pending final business confirmation";
export const UNCONFIRMED_RULE_NOTE = "Client confirmation required before this tier becomes executable.";
export const TIER8_BADGE = "Pending final arithmetic confirmation";
export const TIER8_NOTE = "Client confirmation required before this tier becomes executable.";
export const CALCULATOR_TITLE = "Interactive Estimate Simulator Only";
export const CALCULATOR_DISCLAIMER = "Actual financial eligibility and calculations are determined by backend-authoritative rules.";

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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
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
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
  },
]);

export const DISPLAY_REFERENCE_LEVELS = Object.freeze([
  {
    level: 1,
    percentage: 5.0,
    badge: CONFIRMED_RULE_BADGE,
    secondaryText: CONFIRMED_RULE_NOTE,
    confirmationStatus: "CONFIRMED",
    executable: false,
  },
  {
    level: 2,
    percentage: 3.0,
    badge: CONFIRMED_RULE_BADGE,
    secondaryText: CONFIRMED_RULE_NOTE,
    confirmationStatus: "CONFIRMED",
    executable: false,
  },
  {
    level: 3,
    percentage: 2.0,
    badge: CONFIRMED_RULE_BADGE,
    secondaryText: CONFIRMED_RULE_NOTE,
    confirmationStatus: "CONFIRMED",
    executable: false,
  },
  {
    level: 4,
    percentage: 1.5,
    badge: UNCONFIRMED_RULE_BADGE,
    secondaryText: UNCONFIRMED_RULE_NOTE,
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
  },
  {
    level: 5,
    percentage: 1.0,
    badge: UNCONFIRMED_RULE_BADGE,
    secondaryText: UNCONFIRMED_RULE_NOTE,
    confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION",
    executable: false,
  },
]);

export const DISPLAY_RANKS = Object.freeze([
  { rank: "Silver", turnover: 250000, fund: "2.0% (₹5,000)", rewards: "GFT Badge / Pin", badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { rank: "Gold", turnover: 750000, fund: "1.5% (₹11,250)", rewards: "Fossil Watch (BQ2493)", badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { rank: "Emerald", turnover: 1500000, fund: "1.0% (₹15,000)", rewards: "Emerald Ring / Gold Coin", badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { rank: "Platinum", turnover: 3000000, fund: "0.75% (₹22,500)", rewards: "Yamaha R15 V4 Bike", badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { rank: "Diamond", turnover: 6000000, fund: "0.50% (₹30,000)", rewards: "GFT Diamond Trophy & Cruise", badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { rank: "Ruby", turnover: 12000000, fund: "0.25% (₹30,000)", rewards: "1-Week Thailand Tour", badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { rank: "Chairman", turnover: 25000000, fund: "1.0% (₹2,50,000)", rewards: "Dubai Luxury Tour", badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
]);

export const DISPLAY_PASSIVE_TIERS = Object.freeze([
  { tier: 1, turnover: 500000, monthlyAmount: 2000, yearlyAmount: 24000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { tier: 2, turnover: 1000000, monthlyAmount: 5000, yearlyAmount: 60000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { tier: 3, turnover: 5000000, monthlyAmount: 25000, yearlyAmount: 300000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { tier: 4, turnover: 10000000, monthlyAmount: 50000, yearlyAmount: 600000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { tier: 5, turnover: 25000000, monthlyAmount: 125000, yearlyAmount: 1500000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { tier: 6, turnover: 70000000, monthlyAmount: 350000, yearlyAmount: 4200000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { tier: 7, turnover: 150000000, monthlyAmount: 750000, yearlyAmount: 9000000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  {
    tier: 8,
    turnover: 350000000,
    monthlyAmount: null, // Disputed value
    yearlyAmount: null, // Disputed value
    arithmeticMismatch: true,
    badge: TIER8_BADGE,
    secondaryText: TIER8_NOTE,
    disputeNote: "Pending final arithmetic confirmation (Client confirmation required before this tier becomes executable). Discrepancy between ₹2.10 Crore/year and ₹21 Lakh/year.",
  },
  { tier: 9, turnover: 750000000, monthlyAmount: 3750000, yearlyAmount: 45000000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
  { tier: 10, turnover: 1000000000, monthlyAmount: 5000000, yearlyAmount: 60000000, badge: CONFIRMED_RULE_BADGE, secondaryText: CONFIRMED_RULE_NOTE },
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
    disclaimer: `${CALCULATOR_TITLE}: ${CALCULATOR_DISCLAIMER} Figures are non-binding simulations.`,
  };
}
