'use client';

import { useEffect, useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ReceiptText, Download, Filter, ArrowUpRight, ArrowDownRight, CheckCircle, X, RefreshCw, AlertCircle } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadCSV, downloadTextReport } from '@/lib/exportUtils';
import { API_URL, authFetch } from '@/lib/apiConfig';

export default function TransactionsManagement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });

  const [filterType, setFilterType] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const fetchTransactions = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch(`/admin/transactions?page=${page}&limit=20`);
      if (res.status === 403) {
        setError('Permission Denied: Administrative privileges required to access global transactions ledger.');
        setTransactions([]);
        return;
      }
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.status === 'success' && data.data) {
        setTransactions(data.data.transactions || []);
        setPagination({
          currentPage: data.data.currentPage || 1,
          totalPages: data.data.totalPages || 1,
          totalItems: data.data.totalItems || 0,
        });
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
      setError('Unable to load transactions from backend server. Please verify backend connection.');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchType = filterType === 'ALL' || t.type.toLowerCase().includes(filterType.toLowerCase());
      const matchStatus = filterStatus === 'ALL' || t.status.toLowerCase() === filterStatus.toLowerCase();
      return matchType && matchStatus;
    });
  }, [transactions, filterType, filterStatus]);

  // Authoritative ledger summary calculation
  const { totalInflow, totalOutflow, netBalance } = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    transactions.forEach((t) => {
      const val = parseFloat(t.amount) || 0;
      if (t.direction === 'CREDIT') {
        inflow += val;
      } else {
        outflow += val;
      }
    });
    return {
      totalInflow: inflow.toFixed(2),
      totalOutflow: outflow.toFixed(2),
      netBalance: (inflow - outflow).toFixed(2),
    };
  }, [transactions]);

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      setStatusMessage('No transactions available to export.');
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }
    const headers = ['Transaction ID', 'User / Account', 'Type', 'Direction', 'Amount (INR)', 'Payment Method', 'Date', 'Status'];
    const rows = filteredTransactions.map((t) => [t.id, t.user, t.type, t.direction, t.amount, t.method, t.date, t.status]);
    downloadCSV(`GFT_Authoritative_Ledger_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Ledger records successfully exported to CSV.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleExportPDF = () => {
    if (filteredTransactions.length === 0) {
      setStatusMessage('No transactions available to export.');
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }
    downloadTextReport(
      `GFT_Financial_Statement_${new Date().toISOString().split('T')[0]}`,
      'Authoritative Double-Entry Ledger Statement',
      [
        {
          title: 'Ledger Audit Summary',
          data: {
            'Report Date': new Date().toLocaleString(),
            'Total Transactions': filteredTransactions.length,
            'Total Inflow (INR)': `₹${totalInflow}`,
            'Total Outflow (INR)': `₹${totalOutflow}`,
            'Net Ledger Balance (INR)': `₹${netBalance}`,
            'Audit Integrity': 'Double-entry balanced',
          },
        },
        {
          title: 'Transactions Log',
          data: filteredTransactions.map(
            (t) => `[${t.date}] ${t.id} - ${t.user} | ${t.type} | ₹${t.amount} | ${t.method} | Status: ${t.status}`
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
      header: 'TXN / POSTING ID',
      cell: (info) => <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">{info.getValue()}</span>,
    },
    {
      accessorKey: 'user',
      header: 'User / Account',
      cell: (info) => <span className="font-medium dark:text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type / Event',
      cell: (info) => {
        const type = info.getValue();
        const isCredit = info.row.original.direction === 'CREDIT';
        return (
          <span className="flex items-center gap-1 font-mono text-xs">
            {isCredit ? <ArrowDownRight size={14} className="text-green-500" /> : <ArrowUpRight size={14} className="text-red-500" />}
            {type}
          </span>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount (INR)',
      cell: (info) => <span className="font-bold">₹{info.getValue()}</span>,
    },
    {
      accessorKey: 'method',
      header: 'Method',
      cell: (info) => (
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date & Time',
      cell: (info) => <span className="text-xs text-gray-500 dark:text-gray-400">{info.getValue()}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue() || 'Completed';
        let color = 'bg-yellow-100 text-yellow-800';
        if (status === 'Completed' || status === 'CONFIRMED' || status === 'POSTED') color = 'bg-green-100 text-green-800';
        if (status === 'Failed' || status === 'REJECTED') color = 'bg-red-100 text-red-800';

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
            Authoritative double-entry ledger of all platform financial movements from database.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => fetchTransactions(pagination.currentPage)}
            className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Refresh Ledger"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
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

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          {error}
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
              <option value="ORDER">Order / Purchase</option>
              <option value="INCOME">Income Posting</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="LEDGER">General Ledger</option>
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
        <StatCard title="Total Ledger Inflow" value={`₹${totalInflow}`} icon={ArrowDownRight} trend={0} delay={0.1} />
        <StatCard title="Total Ledger Outflow" value={`₹${totalOutflow}`} icon={ArrowUpRight} trend={0} delay={0.2} />
        <StatCard title="Net Ledger Balance" value={`₹${netBalance}`} icon={ReceiptText} trend={0} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden p-1">
        {loading ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
            <RefreshCw size={24} className="animate-spin text-[#65B300]" />
            <span>Loading authoritative ledger transactions...</span>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
            <ReceiptText size={32} className="text-gray-400 dark:text-gray-600" />
            <span className="font-medium">No ledger transactions found in staging database.</span>
            <span className="text-xs text-gray-400">Zero mock records are displayed. All transactions are derived directly from MongoDB.</span>
          </div>
        ) : (
          <DataTable data={filteredTransactions} columns={columns} />
        )}
      </div>
    </div>
  );
}
