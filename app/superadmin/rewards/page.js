'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Gift, CheckCircle, Search, Trophy } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const dummyRewards = [
  { id: 'RWD-201', user: 'Rahul Sharma', reward: 'Smartphone', designation: 'Gold', status: 'Delivered', date: '2026-06-15' },
  { id: 'RWD-202', user: 'Neha Gupta', reward: 'Laptop', designation: 'Emerald', status: 'Pending', date: '2026-06-18' },
  { id: 'RWD-203', user: 'Priya Patel', reward: 'Smartwatch', designation: 'Silver', status: 'Processing', date: '2026-06-20' },
  { id: 'RWD-204', user: 'Amit Singh', reward: 'Bike', designation: 'Platinum', status: 'Pending', date: '2026-06-21' },
];

export default function RewardsManagement() {
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Reward ID',
      cell: info => <span className="text-gray-500 dark:text-gray-400">{info.getValue()}</span>
    },
    {
      accessorKey: 'user',
      header: 'Achiever',
      cell: info => <span className="font-medium dark:text-white flex items-center gap-2"><Trophy size={14} className="text-[#65B300]"/> {info.getValue()}</span>
    },
    {
      accessorKey: 'designation',
      header: 'Achieved Rank',
      cell: info => <span className="text-gray-600 dark:text-gray-300 font-medium">{info.getValue()}</span>
    },
    {
      accessorKey: 'reward',
      header: 'Reward Item',
      cell: info => <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D]">{info.getValue()}</span>
    },
    {
      accessorKey: 'date',
      header: 'Date Achieved',
    },
    {
      accessorKey: 'status',
      header: 'Delivery Status',
      cell: info => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800';
        if (status === 'Delivered') color = 'bg-green-100 text-green-800';
        if (status === 'Processing') color = 'bg-blue-100 text-blue-800';
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
            {status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status !== 'Delivered' && (
            <button className="px-3 py-1.5 bg-[#65B300] text-white rounded hover:bg-[#8CD83D] transition-colors text-xs font-medium flex items-center gap-1">
              <CheckCircle size={14} /> Mark Delivered
            </button>
          )}
        </div>
      )
    }
  ], []);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Gift className="text-[#65B300]" />
            Rewards Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track member achievements and dispatch rewards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Rewards Issued" value="450" icon={Gift} delay={0.1} />
        <StatCard title="Pending Deliveries" value="24" icon={Gift} delay={0.2} />
        <StatCard title="Total Bikes" value="12" icon={Gift} delay={0.3} />
        <StatCard title="Total Cars" value="2" icon={Gift} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={dummyRewards} columns={columns} />
      </div>
    </div>
  );
}
