'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { DollarSign, Download, Filter, CheckCircle, X } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadCSV } from '@/lib/exportUtils';
import { useRouter } from 'next/navigation';

const initialIncomeLogs = [
  { id: 'INC-1001', user: 'Rahul Sharma', type: 'Direct Income', amount: 50, date: '2026-06-20', status: 'Credited' },
  { id: 'INC-1002', user: 'Priya Patel', type: 'Level Income', amount: 25, date: '2026-06-20', status: 'Credited' },
  { id: 'INC-1003', user: 'Rahul Sharma', type: 'Bonus Income', amount: 100, date: '2026-06-19', status: 'Credited' },
  { id: 'INC-1004', user: 'Amit Singh', type: 'Self Income', amount: 15, date: '2026-06-19', status: 'Pending' },
  { id: 'INC-1005', user: 'Neha Gupta', type: 'Direct Income', amount: 50, date: '2026-06-18', status: 'Credited' },
  { id: 'INC-1006', user: 'Vikram Reddy', type: 'Turnover Income', amount: 120, date: '2026-06-18', status: 'Credited' },
];

export default function IncomeManagement() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [statusMessage, setStatusMessage] = useState(null);

  const filteredLogs = useMemo(() => {
    return initialIncomeLogs.filter((log) => {
      // Tab matching
      let matchTab = true;
      if (activeTab === 'roi') matchTab = log.type === 'Self Income';
      else if (activeTab === 'direct') matchTab = log.type === 'Direct Income';
      else if (activeTab === 'team') matchTab = log.type === 'Level Income';
      else if (activeTab === 'bonus') matchTab = log.type === 'Bonus Income';
      else if (activeTab === 'turnover') matchTab = log.type === 'Turnover Income';

      // Status matching
      const matchStatus = filterStatus === 'ALL' || log.status === filterStatus;
      return matchTab && matchStatus;
    });
  }, [activeTab, filterStatus]);

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'User', 'Income Type', 'Amount (USD)', 'Date', 'Status'];
    const rows = filteredLogs.map((l) => [l.id, l.user, l.type, l.amount, l.date, l.status]);
    downloadCSV(`GFT_Income_Payouts_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Income payout logs successfully exported.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Transaction ID',
      cell: (info) => <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">{info.getValue()}</span>,
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: (info) => <span className="font-medium dark:text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Income Type',
      cell: (info) => (
        <span className="px-2.5 py-1 rounded-md text-xs font-medium border bg-[#0A4D45]/10 text-[#0A4D45] dark:text-[#8CD83D] border-[#0A4D45]/20">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (info) => <span className="font-bold text-[#65B300]">+${info.getValue()}</span>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === 'Credited' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ], []);

  const tabs = [
    { id: 'all', label: 'All Income' },
    { id: 'direct', label: 'Direct Income' },
    { id: 'team', label: 'Team Income' },
    { id: 'roi', label: 'Self Income' },
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
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Monitor, audit, and export affiliate payouts across all compensation lines.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`border px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              showFilter
                ? 'bg-[#65B300] text-white border-[#65B300]'
                : 'bg-white dark:bg-[#062F2D] border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white'
            }`}
          >
            <Filter size={16} /> Filter {filterStatus !== 'ALL' ? '(Active)' : ''}
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      {showFilter && (
        <div className="p-4 bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm flex items-center gap-4">
          <span className="text-xs font-semibold text-gray-500 uppercase">Payout Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-gray-50 dark:bg-[#0A4D45] border border-gray-300 dark:border-[#0A4D45] rounded-lg px-2.5 py-1.5 dark:text-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="Credited">Credited</option>
            <option value="Pending">Pending</option>
          </select>
          {filterStatus !== 'ALL' && (
            <button
              onClick={() => setFilterStatus('ALL')}
              className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer ml-auto flex items-center gap-1"
            >
              <X size={14} /> Clear Filter
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Distributed" value="$800,000" icon={DollarSign} trend={5.2} delay={0.1} />
        <StatCard title="Today's Payouts" value="$12,450" icon={DollarSign} trend={2.1} delay={0.2} />
        <StatCard title="Pending Payouts" value="$4,200" icon={DollarSign} trend={-1.5} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-[#0A4D45] hide-scrollbar bg-gray-50 dark:bg-[#0A4D45]/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative cursor-pointer ${
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
          <h3 className="font-bold dark:text-white">Income Distribution Logs ({filteredLogs.length})</h3>
          <button
            onClick={() => router.push('/superadmin/settings')}
            className="text-sm text-[#65B300] hover:text-[#8CD83D] font-medium cursor-pointer"
          >
            Edit Income Rules →
          </button>
        </div>

        <DataTable data={filteredLogs} columns={columns} />
      </div>
    </div>
  );
}
