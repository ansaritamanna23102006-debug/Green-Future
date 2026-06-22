'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, DollarSign, Users, Award, Shield, Wallet, Clock, Activity } from 'lucide-react';
import { usersData } from '@/lib/adminDummyData';
import StatCard from '@/components/admin/StatCard';

export default function UserDetails({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const userId = unwrappedParams.id;
  
  const user = usersData.find(u => u.id === userId) || usersData[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-lg text-gray-500 hover:text-[#65B300] hover:bg-gray-50 dark:hover:bg-[#0A4D45] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            {user.name} 
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
              user.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
              user.status === 'Inactive' ? 'bg-red-100 text-red-800 border-red-200' :
              'bg-yellow-100 text-yellow-800 border-yellow-200'
            }`}>
              {user.status}
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user.id} • Joined {user.joinDate}</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Income" value="$12,500" icon={DollarSign} delay={0.1} />
        <StatCard title="Direct Team" value="24" icon={Users} delay={0.2} />
        <StatCard title="Total Team" value="1,250" icon={Activity} delay={0.3} />
        <StatCard title="Main Wallet" value="$450" icon={Wallet} delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details */}
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-[#0A4D45]">
            <User size={18} className="text-[#65B300]" />
            Profile Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
              <p className="font-medium dark:text-white">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
              <p className="font-medium dark:text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mobile Number</p>
              <p className="font-medium dark:text-white">{user.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sponsor ID</p>
              <p className="font-medium text-[#65B300]">{user.sponsorId}</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-[#0A4D45]">
            <Shield size={18} className="text-[#65B300]" />
            Account Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Package</p>
              <p className="font-medium text-[#0A4D45] dark:text-[#8CD83D]">{user.package}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Designation</p>
              <p className="font-medium dark:text-white">{user.designation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">KYC Status</p>
              <p className="font-medium text-green-600">Approved</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Login</p>
              <p className="font-medium dark:text-white">Today, 10:45 AM</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-[#0A4D45]">
            <Clock size={18} className="text-[#65B300]" />
            Quick Actions
          </h3>
          
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 dark:bg-[#0A4D45]/30 dark:hover:bg-[#0A4D45] dark:text-white rounded-lg transition-colors">
              Credit / Debit Fund
            </button>
            <button className="w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 dark:bg-[#0A4D45]/30 dark:hover:bg-[#0A4D45] dark:text-white rounded-lg transition-colors">
              Change Package
            </button>
            <button className="w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 dark:bg-[#0A4D45]/30 dark:hover:bg-[#0A4D45] dark:text-white rounded-lg transition-colors">
              View Team Structure
            </button>
            <button className="w-full text-left px-4 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors mt-4">
              Suspend Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
