'use client';
import { Users, Package, DollarSign, Coins, Activity, ArrowUpRight } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { RevenueChart, RegistrationsChart, DistributionPieChart } from '@/components/admin/charts/DashboardCharts';
import { dashboardStats, chartDataRevenue, chartDataRegistrations, activityFeed } from '@/lib/adminDummyData';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SuperAdminDashboard() {
  const feedRef = useRef(null);

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
