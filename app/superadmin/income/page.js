'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { DollarSign, Download, Filter } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const dummyIncomeLogs = [
  { id: 'INC-1001', user: 'Rahul Sharma', type: 'Direct Income', amount: 50, date: '2026-06-20', status: 'Credited' },
  { id: 'INC-1002', user: 'Priya Patel', type: 'Level Income', amount: 25, date: '2026-06-20', status: 'Credited' },
  { id: 'INC-1003', user: 'Rahul Sharma', type: 'Bonus Income', amount: 100, date: '2026-06-19', status: 'Credited' },
  { id: 'INC-1004', user: 'Amit Singh', type: 'ROI Income', amount: 15, date: '2026-06-19', status: 'Pending' },
  { id: 'INC-1005', user: 'Neha Gupta', type: 'Direct Income', amount: 50, date: '2026-06-18', status: 'Credited' },
];

export default function IncomeManagement() {
  const [activeTab, setActiveTab] = useState('all');

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: info => <span className="text-gray-500 dark:text-gray-400">{info.getValue()}</span>
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: info => <span className="font-medium dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'type',
      header: 'Income Type',
      cell: info => (
        <span className="px-2.5 py-1 rounded-md text-xs font-medium border bg-[#0A4D45]/10 text-[#0A4D45] dark:text-[#8CD83D] border-[#0A4D45]/20">
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: info => <span className="font-bold text-[#65B300]">+${info.getValue()}</span>
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'Credited' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        );
      }
    }
  ], []);

  const tabs = [
    { id: 'all', label: 'All Income' },
    { id: 'roi', label: 'Self Income' },
    { id: 'direct', label: 'Direct Income' },
    { id: 'team', label: 'Team Income' },
    { id: 'bonus', label: 'Bonus Income' },
    { id: 'turnover', label: 'Turnover Income' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <DollarSign className="text-[#65B300]" />
            Income Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Monitor and manage all system payouts.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Filter size={16} /> Filter
          </button>
          <button className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Distributed" value="$800,000" icon={DollarSign} trend={5.2} delay={0.1} />
        <StatCard title="Today's Payouts" value="$12,450" icon={DollarSign} trend={2.1} delay={0.2} />
        <StatCard title="Pending Payouts" value="$4,200" icon={DollarSign} trend={-1.5} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-[#0A4D45] hide-scrollbar bg-gray-50 dark:bg-[#0A4D45]/30">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeTab === tab.id 
                  ? 'text-[#65B300] dark:text-[#8CD83D]' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#65B300]"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-[#0A4D45]/10 border-b border-gray-200 dark:border-[#0A4D45] flex justify-between items-center">
          <h3 className="font-bold dark:text-white">Income Logs</h3>
          <button className="text-sm text-[#65B300] hover:text-[#8CD83D] font-medium">Edit Income Rules</button>
        </div>
        
        <DataTable data={dummyIncomeLogs} columns={columns} />
      </div>
    </div>
  );
}
