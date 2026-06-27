"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const defaultUser = {
  memberId: "GFT908127",
  name: "Alexander Pierce",
  email: "alex.pierce@gft.com",
  mobile: "+91 98765 43210",
  address: "42 Spinney Road, Cyber City, Hyderabad, India",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  joiningDate: "2025-11-12",
  designation: "Emerald Director",
  sponsorId: "GFT100201",
  sponsorName: "Elena Rostova",
  sponsorDesignation: "Emerald Manager",
  sponsorMobile: "+91 98765 43201",
  sponsorJoiningDate: "2025-11-12",
  kycStatus: {
    aadhaar: "Approved",
    pan: "Pending",
    passbook: "Approved"
  },
  usdtWallet: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  nominee: {
    name: "Sophia Pierce",
    age: "28",
    relation: "Spouse",
    contact: "+91 98765 43211",
    address: "42 Spinney Road, Cyber City, Hyderabad, India"
  },
  balance: {
    personalIncome: 12450.00,
    teamIncome: 48920.00,
    directIncome: 8200.00,
    bonus: 3500.00,
    turnover: 145000.00,
    totalTeam: 184,
    activeTeam: 120,
    tokenBalance: 45200.00,
    selfTokenEarn: 15200.00,
    teamTokenEarn: 30000.00,
  }
};

const defaultTickets = [
  { id: "TKT-8902", subject: "USDT Withdrawal Delay", category: "Payout", message: "My withdrawal request of 250 USDT is still processing after 24 hours.", status: "Pending", date: "2026-06-21" },
  { id: "TKT-8711", subject: "KYC PAN Card Rejection", category: "KYC", message: "Why was my PAN card rejected? The image is blurry.", status: "Rejected", date: "2026-06-18" },
  { id: "TKT-8452", subject: "Welcome Package Activation", category: "Packages", message: "Thank you for the quick support, package is active now.", status: "Approved", date: "2026-06-10" }
];

const defaultNotifications = [
  { id: 1, title: "Payout Disbursed", message: "Your weekly team binary payout of $450 has been sent to your USDT wallet.", time: "2 hours ago", unread: true },
  { id: 2, title: "New Team Member", message: "Siddharth Kumar has registered under your Level 3 downline.", time: "1 day ago", unread: true },
  { id: 3, title: "System Update", message: "GFT Smart Contract Upgrade is complete. Token rewards will now distribute instantly.", time: "2 days ago", unread: false }
];

const defaultPackages = [
  { name: "Starter Eco", amount: 100, activationDate: "2025-11-12", expiryDate: "2026-11-12", status: "Active" },
  { name: "Growth Green", amount: 500, activationDate: "2026-02-15", expiryDate: "2027-02-15", status: "Active" },
  { name: "Apex Forest", amount: 2500, activationDate: "2026-06-01", expiryDate: "2027-06-01", status: "Active" }
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [packages, setPackages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  // Sync helpers
  const saveUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("gft_user", JSON.stringify(newUserData));
  };

  const saveTickets = (newTickets) => {
    setTickets(newTickets);
    localStorage.setItem("gft_tickets", JSON.stringify(newTickets));
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

      // Merge wallet metrics into balance
      u.balance = {
        personalIncome: walletData.status === "success" ? walletData.data.incomeWallet : 0,
        teamIncome: 0,
        directIncome: 0,
        bonus: 0,
        turnover: u.leftLegSalesVolume + u.rightLegSalesVolume,
        totalTeam: u.leftLegActiveUsers + u.rightLegActiveUsers,
        activeTeam: u.leftLegActiveUsers + u.rightLegActiveUsers,
        tokenBalance: walletData.status === "success" ? walletData.data.tokenWallet : 0,
        selfTokenEarn: walletData.status === "success" ? walletData.data.tokenWallet : 0,
        teamTokenEarn: 0,
      };

      // Map kyc details
      u.kycStatus = {
        aadhaar: u.kyc.status === "approved" ? "Approved" : u.kyc.status === "pending" ? "Pending" : "Not Submitted",
        pan: u.kyc.status === "approved" ? "Approved" : u.kyc.status === "pending" ? "Pending" : "Not Submitted",
        passbook: u.kyc.status === "approved" ? "Approved" : u.kyc.status === "pending" ? "Pending" : "Not Submitted"
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
  }, []);

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

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setTickets([]);
    setPackages([]);
    localStorage.removeItem("gft_token");
    localStorage.removeItem("gft_refresh");
    localStorage.removeItem("gft_auth");
    localStorage.removeItem("gft_user");
    localStorage.removeItem("gft_tickets");
    localStorage.removeItem("gft_packages");
    setAnnouncementDismissed(false);
  };

  const registerUser = async (details) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.fullName,
          email: details.email,
          mobile: details.mobile,
          password: details.password,
          sponsorId: details.sponsorId,
          position: details.position || "left"
        }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        throw new Error(data.message);
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

  const buyPackage = async (packageName, amount) => {
    try {
      const token = localStorage.getItem("gft_token");
      const pkgsRes = await fetch(`${API_URL}/wallet/packages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const pkgsData = await pkgsRes.json();
      if (pkgsData.status !== "success") return;

      const pkg = pkgsData.data.find(p => p.name === packageName || p.price === amount);
      if (!pkg) {
        console.error("Matching GFT investment package not found on server");
        return;
      }

      const res = await fetch(`${API_URL}/wallet/buy-package`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ packageId: pkg._id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        await loadDashboardData(token);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
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
        updateProfile,
        updateKYC,
        updateUSDTWallet,
        updateNominee,
        raiseTicket,
        buyPackage,
        markAllNotificationsRead
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
