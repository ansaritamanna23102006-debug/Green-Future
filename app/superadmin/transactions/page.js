'use client';
import { useMemo } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ReceiptText, Download, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const dummyTransactions = [
  { id: 'TXN-901', user: 'Rahul Sharma', type: 'Package Purchase', amount: 50, date: '2026-06-21', status: 'Completed', method: 'USDT' },
  { id: 'TXN-902', user: 'Priya Patel', type: 'Wallet Transfer', amount: 100, date: '2026-06-20', status: 'Completed', method: 'Internal' },
  { id: 'TXN-903', user: 'Amit Singh', type: 'Withdrawal', amount: 250, date: '2026-06-19', status: 'Pending', method: 'Bank Transfer' },
  { id: 'TXN-904', user: 'Neha Gupta', type: 'Package Purchase', amount: 250, date: '2026-06-18', status: 'Failed', method: 'Credit Card' },
  { id: 'TXN-905', user: 'Vikram Reddy', type: 'Fund Add', amount: 500, date: '2026-06-17', status: 'Completed', method: 'Crypto' },
];

export default function TransactionsManagement() {
  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'TXN ID',
      cell: info => <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">{info.getValue()}</span>
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: info => <span className="font-medium dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: info => {
        const type = info.getValue();
        const isCredit = ['Fund Add', 'Income'].includes(type);
        return (
          <span className="flex items-center gap-1">
            {isCredit ? <ArrowDownRight size={14} className="text-green-500"/> : <ArrowUpRight size={14} className="text-red-500"/>}
            {type}
          </span>
        );
      }
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: info => <span className="font-bold">${info.getValue()}</span>
    },
    {
      accessorKey: 'method',
      header: 'Payment Method',
      cell: info => <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded text-gray-700 dark:text-gray-300">{info.getValue()}</span>
    },
    {
      accessorKey: 'date',
      header: 'Date & Time',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800';
        if (status === 'Completed') color = 'bg-green-100 text-green-800';
        if (status === 'Failed') color = 'bg-red-100 text-red-800';
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
            {status}
          </span>
        );
      }
    }
  ], []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <ReceiptText className="text-[#65B300]" />
            Transaction History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Comprehensive ledger of all system financial activities.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Download size={16} /> Export PDF
          </button>
          <button className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Download size={16} /> Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Inflow" value="$1,250,000" icon={ArrowDownRight} trend={12.5} delay={0.1} />
        <StatCard title="Total Outflow" value="$450,000" icon={ArrowUpRight} trend={8.2} delay={0.2} />
        <StatCard title="Net Balance" value="$800,000" icon={ReceiptText} trend={15.3} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={dummyTransactions} columns={columns} />
      </div>
    </div>
  );
}
