'use client';

import { Users, Package, DollarSign, Coins, Activity, ArrowUpRight, RefreshCw } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { RevenueChart, RegistrationsChart, DistributionPieChart } from '@/components/admin/charts/DashboardCharts';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { downloadCSV } from '@/lib/exportUtils';
import Link from 'next/link';
import { API_URL, authFetch } from '@/lib/apiConfig';

export default function SuperAdminDashboard() {
  const feedRef = useRef(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);

  const [supplyMetrics, setSupplyMetrics] = useState({
    totalSupply: 1000000000,
    availableSupply: 1000000000,
    reservedTokens: 0,
    distributedBonuses: 0,
    returnedTokens: 0,
    totalWithdrawalsINR: 0,
    totalWithdrawalsUSDT: 0,
    activeIds: 0,
    inactiveIds: 0,
  });

  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    pendingUsers: 0,
    totalPackagesSold: 0,
    totalTurnover: 0,
    totalWithdrawals: 0,
    totalTokensIssued: 0,
  });

  const [chartDataRevenue, setChartDataRevenue] = useState([
    { name: 'Jan', revenue: 0 },
    { name: 'Feb', revenue: 0 },
    { name: 'Mar', revenue: 0 },
    { name: 'Apr', revenue: 0 },
    { name: 'May', revenue: 0 },
    { name: 'Jun', revenue: 0 },
  ]);

  const [chartDataRegistrations, setChartDataRegistrations] = useState([
    { name: 'Mon', users: 0 },
    { name: 'Tue', users: 0 },
    { name: 'Wed', users: 0 },
    { name: 'Thu', users: 0 },
    { name: 'Fri', users: 0 },
    { name: 'Sat', users: 0 },
    { name: 'Sun', users: 0 },
  ]);

  const handleExportDashboardSummary = () => {
    const summaryData = [
      { Metric: "Total Supply (GFT)", Value: supplyMetrics.totalSupply },
      { Metric: "Available Supply (GFT)", Value: supplyMetrics.availableSupply },
      { Metric: "Reserved Tokens (Active IDs)", Value: supplyMetrics.reservedTokens },
      { Metric: "Distributed Bonuses (GFT)", Value: supplyMetrics.distributedBonuses },
      { Metric: "Returned Tokens (Inactive IDs)", Value: supplyMetrics.returnedTokens },
      { Metric: "Active User IDs", Value: supplyMetrics.activeIds },
      { Metric: "Inactive User IDs", Value: supplyMetrics.inactiveIds },
      { Metric: "Total INR Withdrawals", Value: `₹${supplyMetrics.totalWithdrawalsINR}` },
      { Metric: "Total USDT Withdrawals", Value: `$${supplyMetrics.totalWithdrawalsUSDT}` },
      { Metric: "Total Users", Value: dashboardMetrics.totalUsers },
      { Metric: "Packages Sold", Value: dashboardMetrics.totalPackagesSold },
      { Metric: "Total Turnover", Value: `₹${dashboardMetrics.totalTurnover}` },
      { Metric: "Tokens Issued", Value: dashboardMetrics.totalTokensIssued },
      { Metric: "Generated At", Value: new Date().toISOString() },
    ];
    downloadCSV(summaryData, `gft-dashboard-executive-summary-${new Date().toISOString().slice(0, 10)}.csv`);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const fetchDashboardData = async () => {
    setLoadingStats(true);
    try {
      // 1. Fetch Authoritative Dashboard Stats
      const statsRes = await authFetch('/admin/dashboard-stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.status === 'success' && statsData.data) {
          const d = statsData.data;
          setDashboardMetrics({
            totalUsers: d.totalUsers || 0,
            activeUsers: d.activeUsers || 0,
            inactiveUsers: d.inactiveUsers || 0,
            pendingUsers: d.pendingUsers || 0,
            totalPackagesSold: d.totalPackagesSold || 0,
            totalTurnover: d.totalTurnover || 0,
            totalWithdrawals: d.totalWithdrawals || 0,
            totalTokensIssued: d.totalTokensIssued || 0,
          });
          if (Array.isArray(d.revenueTrend) && d.revenueTrend.length > 0) {
            setChartDataRevenue(d.revenueTrend);
          }
          if (Array.isArray(d.registrationsTrend) && d.registrationsTrend.length > 0) {
            setChartDataRegistrations(d.registrationsTrend);
          }
        }
      }

      // 2. Fetch Authoritative Supply Metrics
      const supplyRes = await authFetch('/admin/token-supply');
      if (supplyRes.ok) {
        const supplyData = await supplyRes.json();
        if (supplyData.status === 'success' && supplyData.data) {
          setSupplyMetrics(supplyData.data);
        }
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 15000);
    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: 'Active Users', value: dashboardMetrics.activeUsers },
    { name: 'Inactive Users', value: dashboardMetrics.inactiveUsers },
    { name: 'Pending Users', value: dashboardMetrics.pendingUsers },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Authoritative executive intelligence from MongoDB Atlas cluster.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchDashboardData}
            className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Refresh Dashboard"
          >
            <RefreshCw size={15} className={loadingStats ? 'animate-spin' : ''} />
            Refresh
          </button>
          <Link
            href="/superadmin/reports"
            className="border border-gray-300 dark:border-[#0A4D45] text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0A4D45] px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            All Reports
          </Link>
          <button 
            onClick={handleExportDashboardSummary}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <ArrowUpRight size={16} />
            {downloadSuccess ? "Downloaded!" : "Generate Report"}
          </button>
        </div>
      </div>
      {downloadSuccess && (
        <div className="bg-[#65B300]/15 border border-[#65B300] text-[#65B300] dark:text-[#8CD83D] px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-between animate-fade-in">
          <span>✓ Executive Dashboard summary CSV exported successfully!</span>
        </div>
      )}

      {/* GFT Token Supply Management System Dashboard Section */}
      <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#0A4D45] pb-4">
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Coins className="text-[#65B300] h-5 w-5" />
              GFT Token Supply & Circulation Management
            </h3>
            <p className="text-xs text-gray-400 mt-1">Authoritative metrics derived from live TokenSupply collection.</p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#0A4D45] rounded-lg text-gray-500 hover:text-gray-700 transition"
            title="Refresh Supply Stats"
          >
            <RefreshCw size={16} className={loadingStats ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Total Fixed Supply</span>
            <span className="text-lg font-extrabold text-gray-800 dark:text-white">{supplyMetrics.totalSupply.toLocaleString()}</span>
            <span className="text-[9px] text-[#65B300] font-bold">1 Billion Genesis</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Available Unallocated</span>
            <span className="text-lg font-extrabold text-[#65B300]">{supplyMetrics.availableSupply.toLocaleString()}</span>
            <span className="text-[9px] text-gray-400 font-bold">In reserve treasury</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Reserved for Active IDs</span>
            <span className="text-lg font-extrabold text-gray-800 dark:text-white">{supplyMetrics.reservedTokens.toLocaleString()}</span>
            <span className="text-[9px] text-amber-500 font-bold">Locked by packages</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Distributed Bonuses</span>
            <span className="text-lg font-extrabold text-gray-800 dark:text-white">{supplyMetrics.distributedBonuses.toLocaleString()}</span>
            <span className="text-[9px] text-[#65B300] font-bold">Earned commissions</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Returned (Inactive IDs)</span>
            <span className="text-lg font-extrabold text-gray-800 dark:text-white">{supplyMetrics.returnedTokens.toLocaleString()}</span>
            <span className="text-[9px] text-blue-400 font-bold">Recovered to Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 dark:border-[#0A4D45] pt-4">
          <div className="flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/20 p-3.5 rounded-xl border border-gray-100 dark:border-[#0A4D45]">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Active / Inactive user IDs</span>
            <span className="text-xs font-extrabold text-white">
              <span className="text-[#65B300]">{supplyMetrics.activeIds} Active</span>
              <span className="text-gray-500 mx-1.5">|</span>
              <span className="text-rose-500">{supplyMetrics.inactiveIds} Inactive</span>
            </span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/20 p-3.5 rounded-xl border border-gray-100 dark:border-[#0A4D45]">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Total INR Withdrawals</span>
            <span className="text-xs font-extrabold text-[#65B300]">₹{supplyMetrics.totalWithdrawalsINR.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/20 p-3.5 rounded-xl border border-gray-100 dark:border-[#0A4D45]">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Total USDT Withdrawals</span>
            <span className="text-xs font-extrabold text-[#65B300]">${supplyMetrics.totalWithdrawalsUSDT.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Registered Users" value={dashboardMetrics.totalUsers.toLocaleString()} icon={Users} trend={0} delay={0.1} />
        <StatCard title="Confirmed Packages Sold" value={dashboardMetrics.totalPackagesSold.toLocaleString()} icon={Package} trend={0} delay={0.2} />
        <StatCard title="Total Platform Turnover" value={`₹${dashboardMetrics.totalTurnover.toLocaleString()}`} icon={DollarSign} trend={0} delay={0.3} />
        <StatCard title="Tokens Issued / Allocated" value={dashboardMetrics.totalTokensIssued.toLocaleString()} icon={Coins} trend={0} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white">Revenue Overview</h3>
            <span className="text-xs text-gray-400">Authoritative Package Volume (INR)</span>
          </div>
          <RevenueChart data={chartDataRevenue} />
        </div>

        {/* User Distribution */}
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-800 dark:text-white mb-2">User Status Distribution</h3>
          <div className="flex-1">
            <DistributionPieChart data={pieData} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registrations Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white mb-6">Weekly Registrations</h3>
          <RegistrationsChart data={chartDataRegistrations} />
        </div>

        {/* Live System State */}
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-[#65B300]" />
              Database Health & Sync
            </h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65B300] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65B300]"></span>
            </span>
          </div>
          
          <div className="flex-1 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-[#0A4D45]/30 rounded-xl">
              <span className="font-bold text-gray-700 dark:text-white block mb-0.5">Authoritative Ledger</span>
              Synchronized with MongoDB Atlas. Zero hardcoded mock transactions rendered.
            </div>
            <div className="p-3 bg-gray-50 dark:bg-[#0A4D45]/30 rounded-xl">
              <span className="font-bold text-gray-700 dark:text-white block mb-0.5">Compliance Rule Gates</span>
              Phase 0 business plan gating active. Package activations require client sign-off.
            </div>
            <div className="p-3 bg-gray-50 dark:bg-[#0A4D45]/30 rounded-xl">
              <span className="font-bold text-gray-700 dark:text-white block mb-0.5">Active Admin Tier</span>
              Superadmin Executive Clearance (Full Platform Authority).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
