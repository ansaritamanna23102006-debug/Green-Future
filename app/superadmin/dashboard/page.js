'use client';
import { Users, Package, DollarSign, Coins, Activity, ArrowUpRight, RefreshCw } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { RevenueChart, RegistrationsChart, DistributionPieChart } from '@/components/admin/charts/DashboardCharts';
import { dashboardStats, chartDataRevenue, chartDataRegistrations, activityFeed } from '@/lib/adminDummyData';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function SuperAdminDashboard() {
  const feedRef = useRef(null);
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
  const [loadingSupply, setLoadingSupply] = useState(true);

  const fetchSupplyMetrics = async () => {
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch("http://localhost:5000/api/v1/superadmin/token-supply", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success") {
        setSupplyMetrics(data.data);
      }
    } catch (err) {
      console.warn("Failed to load token supply metrics:", err);
    } finally {
      setLoadingSupply(false);
    }
  };

  useEffect(() => {
    fetchSupplyMetrics();
    // Refresh every 10 seconds for real-time GFT supply tracking
    const interval = setInterval(fetchSupplyMetrics, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (feedRef.current) {
      const items = feedRef.current.querySelectorAll('.feed-item');
      gsap.fromTo(items, 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.8, ease: 'power2.out' }
      );
    }
  }, []);

  const pieData = [
    { name: 'Active Users', value: dashboardStats.activeUsers },
    { name: 'Inactive Users', value: dashboardStats.inactiveUsers },
    { name: 'Pending Users', value: dashboardStats.pendingUsers },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back, Super Admin. Here's what's happening today.</p>
        </div>
        <button className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <ArrowUpRight size={16} />
          Generate Report
        </button>
      </div>

      {/* GFT Token Supply Management System Dashboard Section */}
      <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-gray-100 dark:border-[#0A4D45] pb-4">
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Coins className="text-[#65B300] h-5 w-5" />
              GFT Token Supply & Circulation Management
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-[11px] mt-0.5">Automated synchronization: ID activation reserves tokens, bonuses distribute, and expiration releases them.</p>
          </div>
          <button 
            onClick={fetchSupplyMetrics} 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0A4D45] text-gray-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh Supply Stats"
          >
            <RefreshCw size={16} className={loadingSupply ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Total Supply</span>
            <span className="text-lg font-extrabold text-gray-800 dark:text-white">{supplyMetrics.totalSupply.toLocaleString()}</span>
            <span className="text-[9px] text-[#65B300] font-bold">100 Crore GFT (Fixed)</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Available Supply</span>
            <span className="text-lg font-extrabold text-gray-800 dark:text-white">{supplyMetrics.availableSupply.toLocaleString()}</span>
            <span className="text-[9px] text-[#65B300] font-bold">Circulating capacity</span>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#0A4D45]/30 border border-gray-100 dark:border-[#0A4D45] flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-400">Reserved (Active IDs)</span>
            <span className="text-lg font-extrabold text-gray-800 dark:text-white">{supplyMetrics.reservedTokens.toLocaleString()}</span>
            <span className="text-[9px] text-amber-500 font-bold">Locked in active IDs</span>
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
        <StatCard title="Total Users" value={dashboardStats.totalUsers.toLocaleString()} icon={Users} trend={12.5} delay={0.1} />
        <StatCard title="Packages Sold" value={dashboardStats.totalPackagesSold.toLocaleString()} icon={Package} trend={8.2} delay={0.2} />
        <StatCard title="Total Turnover" value={`$${(dashboardStats.totalTurnover/1000).toFixed(1)}K`} icon={DollarSign} trend={15.3} delay={0.3} />
        <StatCard title="Tokens Issued" value={dashboardStats.totalTokensIssued.toLocaleString()} icon={Coins} trend={-2.4} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white">Revenue Overview</h3>
            <select className="bg-gray-50 dark:bg-[#0A4D45] border-none text-sm rounded-md px-3 py-1.5 focus:ring-2 focus:ring-[#65B300] dark:text-white">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
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

        {/* Live Activity Feed */}
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-[#65B300]" />
              Live Activity
            </h3>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65B300] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65B300]"></span>
            </span>
          </div>
          
          <div className="flex-1 overflow-hidden" ref={feedRef}>
            <div className="flex flex-col gap-4">
              {activityFeed.map((activity) => (
                <div key={activity.id} className="feed-item flex gap-3 pb-4 border-b border-gray-100 dark:border-[#0A4D45] last:border-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-[#0A4D45]/10 dark:bg-[#0A4D45] flex items-center justify-center text-[#65B300] shrink-0">
                    {activity.type === 'registration' && <Users size={14} />}
                    {activity.type === 'kyc' && <DollarSign size={14} />}
                    {activity.type === 'package' && <Package size={14} />}
                    {activity.type === 'withdrawal' && <ArrowUpRight size={14} />}
                    {activity.type === 'token' && <Coins size={14} />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{activity.message}</p>
                    <span className="text-xs text-gray-400 mt-1">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
