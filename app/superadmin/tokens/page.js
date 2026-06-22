'use client';
import { useMemo, useState } from 'react';
import { Coins, ArrowUpRight, ArrowDownRight, History, CreditCard } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import DataTable from '@/components/admin/DataTable';

const dummyTokenLogs = [
  { id: 'TKN-8001', user: 'Rahul Sharma', type: 'Self Token', action: 'Credit', amount: 500, date: '2026-06-20', by: 'System' },
  { id: 'TKN-8002', user: 'Priya Patel', type: 'Team Token', action: 'Credit', amount: 250, date: '2026-06-20', by: 'System' },
  { id: 'TKN-8003', user: 'Amit Singh', type: 'Bonus Token', action: 'Debit', amount: 100, date: '2026-06-19', by: 'Admin' },
  { id: 'TKN-8004', user: 'Neha Gupta', type: 'Self Token', action: 'Credit', amount: 1500, date: '2026-06-19', by: 'System' },
  { id: 'TKN-8005', user: 'Vikram Reddy', type: 'Team Token', action: 'Debit', amount: 50, date: '2026-06-18', by: 'Super Admin' },
];

export default function TokenManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Log ID',
      cell: info => <span className="text-gray-500 dark:text-gray-400">{info.getValue()}</span>
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: info => <span className="font-medium dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'type',
      header: 'Token Type',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: info => {
        const action = info.getValue();
        return (
          <span className={`px-2 py-1 flex items-center gap-1 w-fit rounded-full text-xs font-medium ${
            action === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {action === 'Credit' ? <ArrowDownRight size={12}/> : <ArrowUpRight size={12}/>}
            {action}
          </span>
        );
      }
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: info => <span className={`font-bold ${info.row.original.action === 'Credit' ? 'text-[#65B300]' : 'text-red-500'}`}>
        {info.row.original.action === 'Credit' ? '+' : '-'}{info.getValue()} GFT
      </span>
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'by',
      header: 'Processed By',
      cell: info => <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded border border-gray-200 dark:border-[#0A4D45]/50 text-gray-700 dark:text-gray-300">{info.getValue()}</span>
    }
  ], []);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Coins className="text-[#65B300]" />
            Token Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage GFT token distribution, credit and debit operations.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20"
        >
          <CreditCard size={16} />
          Credit / Debit Tokens
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tokens Issued" value="5,000,000" icon={Coins} trend={2.5} delay={0.1} />
        <StatCard title="Self Tokens" value="2,500,000" icon={Coins} delay={0.2} />
        <StatCard title="Team Tokens" value="1,800,000" icon={Coins} delay={0.3} />
        <StatCard title="Bonus Tokens" value="700,000" icon={Coins} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30 flex items-center gap-2">
          <History size={18} className="text-[#65B300]" />
          <h3 className="font-bold dark:text-white">Token Transaction History</h3>
        </div>
        <DataTable data={dummyTokenLogs} columns={columns} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <CreditCard size={18} className="text-[#65B300]" />
                Credit / Debit Tokens
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold"
              >✕</button>
            </div>
            
            <div className="p-6">
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID / Username</label>
                  <input type="text" placeholder="e.g. GFT-1001" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action</label>
                    <select className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none">
                      <option>Credit</option>
                      <option>Debit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token Type</label>
                    <select className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none">
                      <option>Self Token</option>
                      <option>Team Token</option>
                      <option>Bonus Token</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (GFT)</label>
                  <input type="number" placeholder="1000" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks</label>
                  <textarea placeholder="Reason for transaction..." rows="2" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"></textarea>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors">Cancel</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors">Process Transaction</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
