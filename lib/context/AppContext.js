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

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState(defaultTickets);
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [packages, setPackages] = useState(defaultPackages);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  // Load from localStorage if present
  useEffect(() => {
    const storedUser = localStorage.getItem("gft_user");
    const storedTickets = localStorage.getItem("gft_tickets");
    const storedPackages = localStorage.getItem("gft_packages");
    const storedAuth = localStorage.getItem("gft_auth");

    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(defaultUser);

    if (storedTickets) setTickets(JSON.parse(storedTickets));
    if (storedPackages) setPackages(JSON.parse(storedPackages));
    if (storedAuth === "true") setIsLoggedIn(true);
  }, []);

  // Sync helpers
  const saveUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("gft_user", JSON.stringify(newUserData));
  };

  const saveTickets = (newTickets) => {
    setTickets(newTickets);
    localStorage.setItem("gft_tickets", JSON.stringify(newTickets));
  };

  const savePackages = (newPackages) => {
    setPackages(newPackages);
    localStorage.setItem("gft_packages", JSON.stringify(newPackages));
  };

  const login = (identifier, password) => {
    // Mocks login successfully
    setIsLoggedIn(true);
    localStorage.setItem("gft_auth", "true");
    if (!user) {
      saveUser(defaultUser);
    }
    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("gft_auth");
    setAnnouncementDismissed(false);
  };

  const registerUser = (details) => {
    const newUserObj = {
      ...defaultUser,
      name: details.fullName,
      email: details.email,
      mobile: details.mobile,
      sponsorId: details.sponsorId || "GFT100201",
      sponsorName: details.sponsorName || "Elena Rostova",
      memberId: `GFT${Math.floor(100000 + Math.random() * 900000)}`,
      joiningDate: new Date().toISOString().split("T")[0],
      kycStatus: { aadhaar: "Pending", pan: "Pending", passbook: "Pending" },
      balance: {
        personalIncome: 0,
        teamIncome: 0,
        directIncome: 0,
        bonus: 0,
        turnover: 0,
        totalTeam: 0,
        activeTeam: 0,
        tokenBalance: 100, // Signup reward GFT tokens
        selfTokenEarn: 100,
        teamTokenEarn: 0,
      }
    };
    saveUser(newUserObj);
    setIsLoggedIn(true);
    localStorage.setItem("gft_auth", "true");
    return newUserObj;
  };

  const updateProfile = (profileData) => {
    if (!user) return;
    const updated = { ...user, ...profileData };
    saveUser(updated);
  };

  const updateKYC = (cardType, status) => {
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

  const updateUSDTWallet = (address) => {
    if (!user) return;
    const updated = { ...user, usdtWallet: address };
    saveUser(updated);
  };

  const updateNominee = (nomineeData) => {
    if (!user) return;
    const updated = { ...user, nominee: { ...user.nominee, ...nomineeData } };
    saveUser(updated);
  };

  const raiseTicket = (subject, category, message) => {
    const newTicket = {
      id: `TKT-${Math.floor(8000 + Math.random() * 1999)}`,
      subject,
      category,
      message,
      status: "Pending",
      date: new Date().toISOString().split("T")[0]
    };
    const updatedTickets = [newTicket, ...tickets];
    saveTickets(updatedTickets);
  };

  const buyPackage = (packageName, amount) => {
    if (!user) return;
    const newPkg = {
      name: packageName,
      amount,
      activationDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      status: "Active"
    };
    const updatedPackages = [newPkg, ...packages];
    savePackages(updatedPackages);

    // Increment team/token balance mocks
    const updatedUser = {
      ...user,
      balance: {
        ...user.balance,
        turnover: user.balance.turnover + amount,
        tokenBalance: user.balance.tokenBalance + (amount * 5), // 5 GFT tokens per $1 invested
        selfTokenEarn: user.balance.selfTokenEarn + (amount * 5)
      }
    };
    saveUser(updatedUser);
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
