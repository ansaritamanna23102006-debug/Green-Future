"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "@/lib/apiConfig";

const AppContext = createContext();

// Initial state constants — Neutral, server-derived or clean empty states
const defaultTickets = [];

const defaultNotifications = [
  { id: 1, title: "Platform Notice", message: "Welcome to Green Future Technology. System rules are currently under audit.", time: "System", unread: false }
];

const defaultPackages = [];

const defaultStudentPackages = [
  { id: "student-1", name: "GFT-1 (Student Tier)", amount: 3000, prototypePrice: 1200, roi: 5.0, monthlyReturn: 150, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false },
  { id: "student-2", name: "GFT-2 (Student Tier)", amount: 5000, prototypePrice: 3000, roi: 5.0, monthlyReturn: 250, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false },
  { id: "student-3", name: "GFT-3 (Student Tier)", amount: 10000, prototypePrice: 5000, roi: 5.0, monthlyReturn: 500, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false }
];

const defaultPersonalPackages = [
  { id: "personal-1", name: "GFT-4 (Personal Tier)", amount: 20000, prototypePrice: 20000, roi: 6.0, monthlyReturn: 1200, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false },
  { id: "personal-2", name: "GFT-5 (Personal Tier)", amount: 30000, prototypePrice: 30000, roi: 6.0, monthlyReturn: 1800, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false },
  { id: "personal-3", name: "GFT-6 (Personal Tier)", amount: 40000, prototypePrice: 50000, roi: 7.0, monthlyReturn: 2800, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false }
];

const defaultBusinessPackages = [
  { id: "business-1", name: "GFT-7 (Business Tier)", amount: 50000, prototypePrice: 100000, roi: 7.0, monthlyReturn: 3500, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false },
  { id: "business-2", name: "GFT-8 (Business Tier)", amount: 100000, prototypePrice: 500000, roi: 8.0, monthlyReturn: 8000, tokens: 0, duration: 12, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", status: "Pending final business confirmation", executable: false }
];

const defaultRanks = [
  { id: "silver", name: "Silver", turnover: 250000, matchedTurnover: 125000, fund: "Silver Fund (2%)", travel: "Domestic Seminar", rewards: "GFT Smart Mobile / Pin", confirmationStatus: "CONFIRMED", badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation." },
  { id: "gold", name: "Gold", turnover: 750000, matchedTurnover: 250000, fund: "Gold Fund (1.5%)", travel: "National Summit", rewards: "Fossil Hybrid Watch", confirmationStatus: "CONFIRMED", badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation." },
  { id: "emerald", name: "Emerald", turnover: 1500000, matchedTurnover: 750000, fund: "Emerald Fund (1%)", travel: "Regional Retreat", rewards: "Emerald Ring / Gold Coin", confirmationStatus: "CONFIRMED", badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation." },
  { id: "platinum", name: "Platinum", turnover: 3000000, matchedTurnover: 1500000, fund: "Platinum Fund (0.75%)", travel: "Leadership Forum", rewards: "Yamaha R15 V4 Bike", confirmationStatus: "CONFIRMED", badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation." },
  { id: "diamond", name: "Diamond", turnover: 6000000, matchedTurnover: 3000000, fund: "Diamond Fund (0.5%)", travel: "Cruise Tour", rewards: "GFT Diamond Trophy", confirmationStatus: "CONFIRMED", badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation." },
  { id: "ruby", name: "Ruby", turnover: 12000000, matchedTurnover: 6000000, fund: "Ruby Fund (0.25%)", travel: "Thailand Tour", rewards: "Ruby Recognition", confirmationStatus: "CONFIRMED", badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation." },
  { id: "chairman", name: "Chairman", turnover: 25000000, matchedTurnover: 12000000, fund: "Chairman Fund (1%)", travel: "Dubai Tour", rewards: "Chairman Recognition", confirmationStatus: "CONFIRMED", badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation." }
];

const defaultPassiveIncome = [
  { level: 1, turnover: 500000, monthly: 2000, yearly: 24000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 2, turnover: 1000000, monthly: 5000, yearly: 60000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 3, turnover: 5000000, monthly: 25000, yearly: 300000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 4, turnover: 10000000, monthly: 50000, yearly: 600000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 5, turnover: 25000000, monthly: 125000, yearly: 1500000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 6, turnover: 70000000, monthly: 350000, yearly: 4200000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 7, turnover: 150000000, monthly: 750000, yearly: 9000000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 8, turnover: 350000000, monthly: null, yearly: null, arithmeticMismatch: true, confirmationStatus: "REQUIRES_CLIENT_CONFIRMATION", badge: "Pending final arithmetic confirmation", secondaryText: "Client confirmation required before this tier becomes executable." },
  { level: 9, turnover: 750000000, monthly: 3750000, yearly: 45000000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" },
  { level: 10, turnover: 1000000000, monthly: 5000000, yearly: 60000000, badge: "Rule Confirmed", secondaryText: "Subject to final business-plan activation.", confirmationStatus: "CONFIRMED" }
];

const defaultCMS = {
  hero: {
    title: "Green Future Technology",
    subtitle: "A digital technology and community platform built on an immutable double-entry ledger architecture.",
    primaryBtn: "Register",
    primaryBtnLink: "/register",
    secondaryBtn: "Business Plan",
    secondaryBtnLink: "/business-plan",
  },
  about: {
    heading: "Sustainable Technology & Digital Network Architecture",
    description: "Green Future Technology (GFT) provides enterprise networking, digital community infrastructure, and auditable accounting systems.",
    vision: "To provide transparent, auditable digital platforms worldwide.",
    mission: "To establish verified, compliant financial software architecture."
  },
  contact: {
    address: "Registered Corporate Office, India",
    email: "support@greenfuturetech.net",
    phone: "Official Helpline Available After Live Launch",
    website: "www.greenfuturetech.net"
  },
  posters: [],
  popup: {
    title: "Platform Notice",
    message: "Financial configurations are currently under client verification. Live financial execution remains paused.",
    active: false
  }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [packages, setPackages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);

  // GFT Configuration States
  const [studentPackages, setStudentPackages] = useState(defaultStudentPackages);
  const [personalPackages, setPersonalPackages] = useState(defaultPersonalPackages);
  const [businessPackages, setBusinessPackages] = useState(defaultBusinessPackages);
  const [ranks, setRanks] = useState(defaultRanks);
  const [passiveIncome, setPassiveIncome] = useState(defaultPassiveIncome);
  const [cmsContent, setCmsContent] = useState(defaultCMS);
  const [authoritativeRules, setAuthoritativeRules] = useState(null);

  const fetchBusinessRules = async () => {
    try {
      const res = await fetch(`${API_URL}/income/rules`);
      const data = await res.json();
      if (data.status === "success" && data.data) {
        setAuthoritativeRules(data.data);
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (err) {
      console.warn("Could not fetch authoritative rules from /income/rules:", err);
      return { success: false, error: err.message };
    }
  };

  // Sync helpers
  const saveUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("gft_user", JSON.stringify(newUserData));
  };

  const saveTickets = (newTickets) => {
    setTickets(newTickets);
    localStorage.setItem("gft_tickets", JSON.stringify(newTickets));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setTickets([]);
    setPackages([]);
    setWithdrawals([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("gft_token");
      localStorage.removeItem("gft_refresh");
      localStorage.removeItem("gft_auth");
      localStorage.removeItem("gft_user");
      localStorage.removeItem("gft_tickets");
      localStorage.removeItem("gft_packages");
    }
    setAnnouncementDismissed(false);
  };

  const loadDashboardData = async (token) => {
    if (!token) return;
    try {
      // 1. Fetch User Profile
      const profRes = await fetch(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const profData = await profRes.json();
      if (profData.status !== "success") {
        throw new Error(profData.message || "Failed to load profile");
      }
      
      const u = profData.data;

      // 2. Fetch Wallet Balances
      const walletRes = await fetch(`${API_URL}/wallet/balances`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const walletData = await walletRes.json();

      // 3. Fetch User Support Tickets
      const ticketsRes = await fetch(`${API_URL}/users/tickets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const ticketsData = await ticketsRes.json();

      // Merge authoritative wallet metrics into balance
      const wd = (walletData && walletData.status === "success" && walletData.data) ? walletData.data : {};
      u.wallet = {
        availablePaisa: wd.availablePaisa || 0,
        lockedPaisa: wd.lockedPaisa || 0,
        totalEarnedPaisa: wd.totalEarnedPaisa || 0,
        availableRupees: wd.availableRupees || "0.00",
        lockedRupees: wd.lockedRupees || "0.00",
        totalEarnedRupees: wd.totalEarnedRupees || "0.00",
        version: wd.version || 1,
      };
      u.balance = {
        personalIncome: Number(wd.availableRupees || wd.incomeWallet || 0),
        teamIncome: 0,
        directIncome: 0,
        bonus: 0,
        turnover: u.leftLegSalesVolume + u.rightLegSalesVolume,
        totalTeam: u.leftLegActiveUsers + u.rightLegActiveUsers,
        activeTeam: u.leftLegActiveUsers + u.rightLegActiveUsers,
        tokenBalance: wd.tokenWallet || 0,
        selfTokenEarn: wd.tokenWallet || 0,
        teamTokenEarn: 0,
      };

      // Map kyc details
      const kycStatus = (u.kyc && u.kyc.status) ? u.kyc.status.toUpperCase() : "NOT_STARTED";
      u.kycStatus = {
        status: kycStatus,
        aadhaar: (kycStatus === "APPROVED") ? "Approved" : (kycStatus === "UNDER_REVIEW" || kycStatus === "SUBMITTED") ? "Pending" : "Not Submitted",
        pan: (kycStatus === "APPROVED") ? "Approved" : (kycStatus === "UNDER_REVIEW" || kycStatus === "SUBMITTED") ? "Pending" : "Not Submitted",
        passbook: (kycStatus === "APPROVED") ? "Approved" : (kycStatus === "UNDER_REVIEW" || kycStatus === "SUBMITTED") ? "Pending" : "Not Submitted",
        flaggedDocuments: (u.kyc && u.kyc.flaggedDocuments) || []
      };
      u.usdtWallet = u.usdtWalletAddress;
      u.memberId = u.userId;

      // Map active package if any
      const userPackages = [];
      if (u.activePackage && u.activePackage.name) {
        userPackages.push({
          name: u.activePackage.name,
          amount: u.activePackage.amount,
          activationDate: u.activePackage.activatedAt ? u.activePackage.activatedAt.split("T")[0] : "",
          expiryDate: u.activePackage.expiresAt ? u.activePackage.expiresAt.split("T")[0] : "",
          status: "Active"
        });
      }
      setPackages(userPackages);

      // Fetch Withdrawals from authoritative Phase 8 endpoint
      try {
        const withdrawalsRes = await fetch(`${API_URL}/withdrawals`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const withdrawalsData = await withdrawalsRes.json();
        if (withdrawalsData.status === "success" && withdrawalsData.data) {
          setWithdrawals(withdrawalsData.data.withdrawals || withdrawalsData.data || []);
        }
      } catch (e) {
        console.error("Failed to load withdrawals", e);
      }

      saveUser(u);
      setIsLoggedIn(true);

      // Map tickets
      if (ticketsData.status === "success") {
        const mappedTickets = ticketsData.data.map(t => ({
          id: t._id,
          subject: t.subject,
          category: t.priority === "high" ? "Payout" : "General",
          message: t.description,
          status: t.status === "open" ? "Pending" : t.status === "resolved" ? "Approved" : "Rejected",
          date: new Date(t.createdAt).toISOString().split("T")[0]
        }));
        saveTickets(mappedTickets);
      }
    } catch (err) {
      console.error("Failed to load GFT dashboard:", err);
      logout();
    }
  };

  // Load from localStorage / fetch API on mount
  useEffect(() => {
    const token = localStorage.getItem("gft_token");
    if (token) {
      loadDashboardData(token);
    }

    if (typeof window !== "undefined") {
      const savedStudent = localStorage.getItem("gft_student_packages");
      if (savedStudent) setStudentPackages(JSON.parse(savedStudent));
      
      const savedPersonal = localStorage.getItem("gft_personal_packages");
      if (savedPersonal) setPersonalPackages(JSON.parse(savedPersonal));

      const savedBusiness = localStorage.getItem("gft_business_packages");
      if (savedBusiness) setBusinessPackages(JSON.parse(savedBusiness));

      const savedRanks = localStorage.getItem("gft_ranks");
      if (savedRanks) setRanks(JSON.parse(savedRanks));

      const savedPassive = localStorage.getItem("gft_passive_income");
      if (savedPassive) setPassiveIncome(JSON.parse(savedPassive));

      const savedCMS = localStorage.getItem("gft_cms");
      if (savedCMS) setCmsContent(JSON.parse(savedCMS));
    }
    fetchBusinessRules();
  }, []);

  const updateCMSContent = (updatedCMS) => {
    setCmsContent(updatedCMS);
    localStorage.setItem("gft_cms", JSON.stringify(updatedCMS));
  };

  const updateStudentPackages = (pkgs) => {
    setStudentPackages(pkgs);
    localStorage.setItem("gft_student_packages", JSON.stringify(pkgs));
  };

  const updatePersonalPackages = (pkgs) => {
    setPersonalPackages(pkgs);
    localStorage.setItem("gft_personal_packages", JSON.stringify(pkgs));
  };

  const updateBusinessPackages = (pkgs) => {
    setBusinessPackages(pkgs);
    localStorage.setItem("gft_business_packages", JSON.stringify(pkgs));
  };

  const updateRanks = (updatedRanks) => {
    setRanks(updatedRanks);
    localStorage.setItem("gft_ranks", JSON.stringify(updatedRanks));
  };

  const updatePassiveIncome = (updatedPassive) => {
    setPassiveIncome(updatedPassive);
    localStorage.setItem("gft_passive_income", JSON.stringify(updatedPassive));
  };

  // Phase 1 Auth Methods
  const validateSponsor = async (sponsorId) => {
    try {
      const res = await fetch(`${API_URL}/auth/validate-sponsor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sponsorId }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        return { valid: false, message: data.message || "Invalid sponsor ID" };
      }
      return { valid: true, sponsor: data.data };
    } catch (err) {
      return { valid: false, message: err.message || "Failed to validate sponsor" };
    }
  };

  const sendRegistrationOtp = async (email, mobile) => {
    try {
      const res = await fetch(`${API_URL}/auth/send-registration-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mobile }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        return { success: false, message: data.message || "Failed to send verification code" };
      }
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message || "Network error sending verification code" };
    }
  };

  const verifyRegistrationOtp = async (email, otp) => {
    try {
      const res = await fetch(`${API_URL}/auth/verify-registration-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        return { success: false, message: data.message || "Verification code failed" };
      }
      return {
        success: true,
        verificationToken: data.data.verificationToken,
        message: data.message,
      };
    } catch (err) {
      return { success: false, message: err.message || "Network error verifying code" };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        return { success: false, error: data.message };
      }

      localStorage.setItem("gft_token", data.data.accessToken);
      localStorage.setItem("gft_refresh", data.data.refreshToken);
      localStorage.setItem("gft_auth", "true");

      await loadDashboardData(data.data.accessToken);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return { success: data.status === "success", message: data.message };
    } catch (err) {
      return { success: false, message: err.message || "Failed to process forgot password request" };
    }
  };

  const resetPassword = async (email, otp, newPassword) => {
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        return { success: false, message: data.message };
      }
      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, message: err.message || "Failed to reset password" };
    }
  };

  const registerUser = async (details) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.fullName || details.name,
          email: details.email,
          mobile: details.mobile,
          password: details.password,
          sponsorId: details.sponsorId,
          position: details.position || "left",
          address: details.address || "",
          state: details.state || "",
          city: details.city || "",
          country: details.country || "India",
          verificationToken: details.verificationToken,
        }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        return { success: false, error: data.message };
      }

      // Auto login after signup
      return await login(details.email, details.password);
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateKYC = async (cardType, status) => {
    if (!user) return;
    const updated = {
      ...user,
      kycStatus: {
        ...user.kycStatus,
        [cardType]: status
      }
    };
    saveUser(updated);
  };

  const fetchKycProfile = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/kyc/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const uploadKycDocuments = async (formData) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/kyc/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token);
        return { success: true, data: data.data, message: data.message };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchAdminKycQueue = async ({ status = "ALL", search = "", page = 1, limit = 20 } = {}) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const query = new URLSearchParams({ status, search, page: String(page), limit: String(limit) });
      const res = await fetch(`${API_URL}/admin/kyc/queue?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const startKycReview = async (userId) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/admin/kyc/start-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data, message: data.message };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const submitKycDecision = async ({ userId, decision, reason, flaggedDocuments = [] }) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/admin/kyc/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, decision, reason, flaggedDocuments })
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data, message: data.message };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const superAdminKycOverride = async ({ userId, overrideAction, reason }) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/superadmin/kyc/override`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, overrideAction, reason })
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data, message: data.message };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateUSDTWallet = async (address) => {
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/users/crypto-wallet`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ usdtWalletAddress: address }),
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateNominee = async (nomineeData) => {
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/users/nominee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(nomineeData),
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const raiseTicket = async (subject, category, message) => {
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/users/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject,
          description: message,
          priority: category === "Payout" ? "high" : "medium"
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createPackageOrder = async (packageId, idempotencyKey = null, isSandbox = false) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ packageId, idempotencyKey, isSandbox })
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const fetchUserOrders = async (query = {}) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const params = new URLSearchParams(query);
      const res = await fetch(`${API_URL}/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const initiateOrderPayment = async (orderId, paymentMethod = "SANDBOX_MOCK_ADAPTER") => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/orders/${orderId}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ paymentMethod })
      });
      const data = await res.json();
      if (data.status === "success") {
        return { success: true, data: data.data };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const verifyOrderPayment = async (payload) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("gft_token") : null;
      if (!token) return { success: false, error: "Not authenticated" };
      const res = await fetch(`${API_URL}/orders/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token);
        return { success: true, data: data.data, message: data.message };
      }
      return { success: false, error: data.message };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const buyPackage = async (packageName, amount) => {
    return await createPackageOrder(packageName);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const requestWithdrawal = async (amount, paymentMethod, paymentDetails) => {
    try {
      const token = localStorage.getItem("gft_token");
      if (!token) throw new Error("Authentication token not found");
      const res = await fetch(`${API_URL}/withdrawals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amountPaisa: Math.round(Number(amount) * 100),
          destinationType: paymentMethod === "USDT_WALLET" ? "CRYPTO_WALLET" : "BANK_TRANSFER",
          destinationReference: paymentDetails,
          idempotencyKey: `wd_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token); // Reload balances and history
        return { success: true, data: data.data };
      } else {
        return { success: false, error: data.message };
      }
    } catch (err) {
      console.error("Withdrawal error:", err);
      return { success: false, error: err.message };
    }
  };

  const fetchLedgerStatement = async (params = {}) => {
    try {
      const token = localStorage.getItem("gft_token");
      if (!token) return { success: false, error: "Not authenticated" };
      const queryString = new URLSearchParams(params).toString();
      const res = await fetch(`${API_URL}/wallet/statement?${queryString}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        tickets,
        notifications,
        packages,
        isLoggedIn,
        announcementDismissed,
        setAnnouncementDismissed,
        login,
        logout,
        registerUser,
        validateSponsor,
        sendRegistrationOtp,
        verifyRegistrationOtp,
        forgotPassword,
        resetPassword,
        updateProfile,
        updateKYC,
        fetchKycProfile,
        uploadKycDocuments,
        fetchAdminKycQueue,
        startKycReview,
        submitKycDecision,
        superAdminKycOverride,
        updateUSDTWallet,
        updateNominee,
        raiseTicket,
        buyPackage,
        createPackageOrder,
        fetchUserOrders,
        getOrderById,
        initiateOrderPayment,
        verifyOrderPayment,
        fetchLedgerStatement,
        markAllNotificationsRead,
        withdrawals,
        requestWithdrawal,
        fetchBusinessRules,
        authoritativeRules,
        studentPackages,
        personalPackages,
        businessPackages,
        ranks,
        passiveIncome,
        cmsContent,
        updateCMSContent,
        updateStudentPackages,
        updatePersonalPackages,
        updateBusinessPackages,
        updateRanks,
        updatePassiveIncome
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
