'use client';
import { useMemo, useState } from 'react';
import { Coins, ArrowUpRight, ArrowDownRight, History, CreditCard, Download, CheckCircle, X } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import DataTable from '@/components/admin/DataTable';
import { downloadCSV } from '@/lib/exportUtils';

const initialTokenLogs = [
  { id: 'TKN-8001', user: 'Rahul Sharma', type: 'Self Token', action: 'Credit', amount: 500, date: '2026-06-20', by: 'System' },
  { id: 'TKN-8002', user: 'Priya Patel', type: 'Team Token', action: 'Credit', amount: 250, date: '2026-06-20', by: 'System' },
  { id: 'TKN-8003', user: 'Amit Singh', type: 'Bonus Token', action: 'Debit', amount: 100, date: '2026-06-19', by: 'Admin' },
  { id: 'TKN-8004', user: 'Neha Gupta', type: 'Self Token', action: 'Credit', amount: 1500, date: '2026-06-19', by: 'System' },
  { id: 'TKN-8005', user: 'Vikram Reddy', type: 'Team Token', action: 'Debit', amount: 50, date: '2026-06-18', by: 'Super Admin' },
];

export default function TokenManagement() {
  const [tokenLogs, setTokenLogs] = useState(initialTokenLogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form states
  const [formUser, setFormUser] = useState('');
  const [formAction, setFormAction] = useState('Credit');
  const [formType, setFormType] = useState('Self Token');
  const [formAmount, setFormAmount] = useState('500');
  const [formRemarks, setFormRemarks] = useState('');

  const handleProcessTransaction = (e) => {
    e.preventDefault();
    if (!formUser.trim() || !formAmount || parseFloat(formAmount) <= 0) {
      alert('Please enter a valid user ID and positive amount');
      return;
    }

    const amt = parseFloat(formAmount);
    const newLog = {
      id: `TKN-${Math.floor(8000 + tokenLogs.length + 1)}`,
      user: formUser.trim(),
      type: formType,
      action: formAction,
      amount: amt,
      date: new Date().toISOString().split('T')[0],
      by: 'Super Admin',
    };

    setTokenLogs((prev) => [newLog, ...prev]);
    setIsModalOpen(false);
    setFormUser('');
    setFormAmount('500');
    setFormRemarks('');
    setStatusMessage(`Successfully processed ${formAction} of ${amt} GFT for ${newLog.user}.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleExportCSV = () => {
    const headers = ['Log ID', 'User', 'Token Type', 'Action', 'Amount (GFT)', 'Date', 'Processed By'];
    const rows = tokenLogs.map((l) => [l.id, l.user, l.type, l.action, l.amount, l.date, l.by]);
    downloadCSV(`GFT_Token_Logs_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Token logs exported to CSV.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Log ID',
      cell: (info) => <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">{info.getValue()}</span>,
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: (info) => <span className="font-medium dark:text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Token Type',
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: (info) => {
        const action = info.getValue();
        return (
          <span
            className={`px-2 py-1 flex items-center gap-1 w-fit rounded-full text-xs font-medium ${
              action === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {action === 'Credit' ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {action}
          </span>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (info) => (
        <span
          className={`font-bold ${
            info.row.original.action === 'Credit' ? 'text-[#65B300]' : 'text-red-500'
          }`}
        >
          {info.row.original.action === 'Credit' ? '+' : '-'}
          {info.getValue().toLocaleString()} GFT
        </span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'by',
      header: 'Processed By',
      cell: (info) => (
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded border border-gray-200 dark:border-[#0A4D45]/50 text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    },
  ], []);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Coins className="text-[#65B300]" />
            Token Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage GFT token supply distribution, execute manual credit/debit operations, and audit allocations.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download size={16} /> Export Logs CSV
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 cursor-pointer"
          >
            <CreditCard size={16} /> Credit / Debit Tokens
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tokens Issued" value="5,000,000" icon={Coins} trend={2.5} delay={0.1} />
        <StatCard title="Self Tokens" value="2,500,000" icon={Coins} delay={0.2} />
        <StatCard title="Team Tokens" value="1,800,000" icon={Coins} delay={0.3} />
        <StatCard title="Bonus Tokens" value="700,000" icon={Coins} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#65B300]" />
            <h3 className="font-bold dark:text-white">Token Transaction History ({tokenLogs.length})</h3>
          </div>
          <span className="text-xs text-gray-500">Double-entry verified records</span>
        </div>
        <DataTable data={tokenLogs} columns={columns} />
      </div>

      {/* Credit / Debit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <CreditCard size={18} className="text-[#65B300]" />
                Execute Token Operation
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProcessTransaction} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target User ID</label>
                <input
                  type="text"
                  required
                  value={formUser}
                  onChange={(e) => setFormUser(e.target.value)}
                  placeholder="e.g. GFT100001 or rahul@example.com"
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action</label>
                  <select
                    value={formAction}
                    onChange={(e) => setFormAction(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  >
                    <option value="Credit">Credit (+)</option>
                    <option value="Debit">Debit (-)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Token Category</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  >
                    <option value="Self Token">Self Token</option>
                    <option value="Team Token">Team Token</option>
                    <option value="Bonus Token">Bonus Token</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (GFT)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  placeholder="500"
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason / Remarks</label>
                <textarea
                  value={formRemarks}
                  onChange={(e) => setFormRemarks(e.target.value)}
                  placeholder="Reason for manual adjustment..."
                  rows={2}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md"
                >
                  Process Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
