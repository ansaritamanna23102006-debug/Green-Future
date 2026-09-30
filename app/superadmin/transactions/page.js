'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ReceiptText, Download, Filter, ArrowUpRight, ArrowDownRight, CheckCircle, X } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadCSV, downloadTextReport } from '@/lib/exportUtils';

const dummyTransactions = [
  { id: 'TXN-901', user: 'Rahul Sharma', type: 'Package Purchase', amount: 50, date: '2026-06-21', status: 'Completed', method: 'USDT' },
  { id: 'TXN-902', user: 'Priya Patel', type: 'Wallet Transfer', amount: 100, date: '2026-06-20', status: 'Completed', method: 'Internal' },
  { id: 'TXN-903', user: 'Amit Singh', type: 'Withdrawal', amount: 250, date: '2026-06-19', status: 'Pending', method: 'Bank Transfer' },
  { id: 'TXN-904', user: 'Neha Gupta', type: 'Package Purchase', amount: 250, date: '2026-06-18', status: 'Failed', method: 'Credit Card' },
  { id: 'TXN-905', user: 'Vikram Reddy', type: 'Fund Add', amount: 500, date: '2026-06-17', status: 'Completed', method: 'Crypto' },
];

export default function TransactionsManagement() {
  const [transactions] = useState(dummyTransactions);
  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = filterType === 'ALL' || t.type === filterType;
      const matchStatus = filterStatus === 'ALL' || t.status === filterStatus;
      return matchType && matchStatus;
    });
  }, [transactions, filterType, filterStatus]);

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'User', 'Type', 'Amount (USD)', 'Payment Method', 'Date', 'Status'];
    const rows = filteredTransactions.map((t) => [t.id, t.user, t.type, t.amount, t.method, t.date, t.status]);
    downloadCSV(`GFT_Transactions_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Transactions successfully exported to CSV / Excel.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleExportPDF = () => {
    downloadTextReport(
      `GFT_Financial_Statement_${new Date().toISOString().split('T')[0]}`,
      'Ledger Transaction Summary Statement',
      [
        {
          title: 'Ledger Audit Summary',
          data: {
            'Report Date': new Date().toLocaleString(),
            'Total Transactions': filteredTransactions.length,
            'Total Inflow': '$1,250,000',
            'Total Outflow': '$450,000',
            'Net Ledger Balance': '$800,000',
            'Audit Integrity': 'Double-entry balanced',
          },
        },
        {
          title: 'Transactions Log',
          data: filteredTransactions.map(
            (t) => `[${t.date}] ${t.id} - ${t.user} | ${t.type} | $${t.amount} | ${t.method} | Status: ${t.status}`
          ),
        },
      ]
    );
    setStatusMessage('Transaction summary statement downloaded.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'TXN ID',
      cell: (info) => <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">{info.getValue()}</span>,
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: (info) => <span className="font-medium dark:text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (info) => {
        const type = info.getValue();
        const isCredit = ['Fund Add', 'Income'].includes(type);
        return (
          <span className="flex items-center gap-1">
            {isCredit ? <ArrowDownRight size={14} className="text-green-500" /> : <ArrowUpRight size={14} className="text-red-500" />}
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: (info) => <span className="font-bold">${info.getValue()}</span>,
    },
    {
      accessorKey: 'method',
      header: 'Payment Method',
      cell: (info) => (
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date & Time',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800';
        if (status === 'Completed') color = 'bg-green-100 text-green-800';
        if (status === 'Failed') color = 'bg-red-100 text-red-800';

        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
            {status}
          </span>
        );
      },
    },
  ], []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <ReceiptText className="text-[#65B300]" />
            Transaction History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Comprehensive double-entry ledger of all platform financial movements.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowFilterBar(!showFilterBar)}
            className={`border px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
              showFilterBar
                ? 'bg-[#65B300] text-white border-[#65B300]'
                : 'bg-white dark:bg-[#062F2D] border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white'
            }`}
          >
            <Filter size={16} /> Filters {filterType !== 'ALL' || filterStatus !== 'ALL' ? '(Active)' : ''}
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download size={16} /> Export Statement
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download size={16} /> Export Excel / CSV
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      {showFilterBar && (
        <div className="p-4 bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs bg-gray-50 dark:bg-[#0A4D45] border border-gray-300 dark:border-[#0A4D45] rounded-lg px-2.5 py-1.5 dark:text-white"
            >
              <option value="ALL">All Types</option>
              <option value="Package Purchase">Package Purchase</option>
              <option value="Wallet Transfer">Wallet Transfer</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Fund Add">Fund Add</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-gray-50 dark:bg-[#0A4D45] border border-gray-300 dark:border-[#0A4D45] rounded-lg px-2.5 py-1.5 dark:text-white"
            >
              <option value="ALL">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {(filterType !== 'ALL' || filterStatus !== 'ALL') && (
            <button
              onClick={() => {
                setFilterType('ALL');
                setFilterStatus('ALL');
              }}
              className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer ml-auto flex items-center gap-1"
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Inflow" value="$1,250,000" icon={ArrowDownRight} trend={12.5} delay={0.1} />
        <StatCard title="Total Outflow" value="$450,000" icon={ArrowUpRight} trend={8.2} delay={0.2} />
        <StatCard title="Net Balance" value="$800,000" icon={ReceiptText} trend={15.3} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={filteredTransactions} columns={columns} />
      </div>
    </div>
  );
}
