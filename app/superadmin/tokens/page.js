'use client';

import { useEffect, useMemo, useState } from 'react';
import { Coins, ArrowUpRight, ArrowDownRight, History, CreditCard, Download, CheckCircle, X, RefreshCw, AlertCircle, ShieldAlert } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import DataTable from '@/components/admin/DataTable';
import { downloadCSV } from '@/lib/exportUtils';
import { API_URL, authFetch } from '@/lib/apiConfig';

export default function TokenManagement() {
  const [tokenLogs, setTokenLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [logsError, setLogsError] = useState(null);

  const [supplyMetrics, setSupplyMetrics] = useState({
    totalSupply: 1000000000,
    availableSupply: 1000000000,
    reservedTokens: 0,
    distributedBonuses: 0,
    returnedTokens: 0,
  });
  const [loadingSupply, setLoadingSupply] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form states
  const [formUser, setFormUser] = useState('');
  const [formAction, setFormAction] = useState('Credit');
  const [formType, setFormType] = useState('Self Token');
  const [formAmount, setFormAmount] = useState('500');
  const [formRemarks, setFormRemarks] = useState('');

  const fetchSupply = async () => {
    setLoadingSupply(true);
    try {
      const res = await authFetch('/admin/token-supply');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.data) {
          setSupplyMetrics(data.data);
        }
      }
    } catch (err) {
      console.error('Failed to fetch supply:', err);
    } finally {
      setLoadingSupply(false);
    }
  };

  const fetchTokenLogs = async () => {
    setLoadingLogs(true);
    setLogsError(null);
    try {
      const res = await authFetch('/admin/tokens/logs');
      if (res.status === 403) {
        setLogsError('Permission Denied: Administrative privileges required to inspect token audit logs.');
        setTokenLogs([]);
        return;
      }
      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.status === 'success' && data.data) {
        setTokenLogs(data.data.tokenLogs || []);
      } else {
        setTokenLogs([]);
      }
    } catch (err) {
      console.error('Failed to fetch token logs:', err);
      setLogsError('Unable to load token logs from backend. Please verify backend connection.');
      setTokenLogs([]);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchSupply();
    fetchTokenLogs();
  }, []);

  const handleProcessTransaction = (e) => {
    e.preventDefault();
    // Compliance Guard: Real token minting and adjustment is locked under Phase 0 client governance
    setStatusMessage('Notice: Manual token minting and distribution is strictly locked under Phase 0 compliance governance.');
    setIsModalOpen(false);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleExportCSV = () => {
    if (tokenLogs.length === 0) {
      setStatusMessage('No token logs available to export.');
      setTimeout(() => setStatusMessage(null), 3000);
      return;
    }
    const headers = ['Log ID', 'User / Account', 'Audit Action', 'Direction', 'Amount (GFT)', 'Date', 'Processed By', 'Details'];
    const rows = tokenLogs.map((l) => [l.id, l.user, l.type, l.action, l.amount, l.date, l.by, l.details || '']);
    downloadCSV(`GFT_Token_Audit_Logs_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Token audit logs exported to CSV.');
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
      header: 'User / Target',
      cell: (info) => <span className="font-medium dark:text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Event Type',
      cell: (info) => <span className="text-xs font-mono">{info.getValue()}</span>,
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: (info) => {
        const action = info.getValue();
        const isCredit = action === 'Credit';
        return (
          <span
            className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 w-max ${
              isCredit
                ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
            }`}
          >
            {isCredit ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
            {action}
          </span>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: 'Amount (GFT)',
      cell: (info) => <span className="font-bold">{info.getValue()} GFT</span>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: (info) => <span className="text-xs text-gray-500">{info.getValue()}</span>,
    },
    {
      accessorKey: 'by',
      header: 'Initiator',
      cell: (info) => (
        <span className="text-xs bg-gray-100 dark:bg-[#0A4D45] px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    },
  ], []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Coins className="text-[#65B300]" />
            Token Supply & Distribution
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Authoritative GFT token metrics and distribution activity logs from MongoDB.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              fetchSupply();
              fetchTokenLogs();
            }}
            className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Refresh Token Data"
          >
            <RefreshCw size={15} className={loadingSupply || loadingLogs ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button
            onClick={handleExportCSV}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Coins size={16} /> Process Token Movement
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      {logsError && (
        <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          {logsError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Token Reserve"
          value={`${supplyMetrics.totalSupply?.toLocaleString()} GFT`}
          icon={Coins}
          trend={0}
          delay={0.1}
        />
        <StatCard
          title="Available Unallocated"
          value={`${supplyMetrics.availableSupply?.toLocaleString()} GFT`}
          icon={CreditCard}
          trend={0}
          delay={0.2}
        />
        <StatCard
          title="Reserved for Active IDs"
          value={`${supplyMetrics.reservedTokens?.toLocaleString()} GFT`}
          icon={History}
          trend={0}
          delay={0.3}
        />
        <StatCard
          title="Bonuses Distributed"
          value={`${supplyMetrics.distributedBonuses?.toLocaleString()} GFT`}
          icon={ArrowDownRight}
          trend={0}
          delay={0.4}
        />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden p-1">
        {loadingLogs ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
            <RefreshCw size={24} className="animate-spin text-[#65B300]" />
            <span>Loading authoritative token audit logs...</span>
          </div>
        ) : tokenLogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
            <Coins size={32} className="text-gray-400 dark:text-gray-600" />
            <span className="font-medium">No token audit events found in staging database.</span>
            <span className="text-xs text-gray-400">Zero mock records are displayed. All token records are sourced directly from MongoDB AuditLog.</span>
          </div>
        ) : (
          <DataTable data={tokenLogs} columns={columns} />
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold dark:text-white mb-2 flex items-center gap-2">
              <Coins className="text-[#65B300]" />
              Manual Token Adjustment
            </h2>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2 mb-4">
              <ShieldAlert size={16} className="shrink-0" />
              <span>Safety Gate: Manual minting/transfers are paused in staging under Phase 0 compliance rules.</span>
            </div>

            <form onSubmit={handleProcessTransaction} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Target Member User ID</label>
                <input
                  type="text"
                  placeholder="e.g. GFT777777"
                  value={formUser}
                  onChange={(e) => setFormUser(e.target.value)}
                  className="w-full text-sm bg-gray-50 dark:bg-[#0A4D45] border border-gray-300 dark:border-[#0A4D45] rounded-lg p-2.5 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Action</label>
                  <select
                    value={formAction}
                    onChange={(e) => setFormAction(e.target.value)}
                    className="w-full text-sm bg-gray-50 dark:bg-[#0A4D45] border border-gray-300 dark:border-[#0A4D45] rounded-lg p-2.5 dark:text-white"
                  >
                    <option value="Credit">Credit (Add)</option>
                    <option value="Debit">Debit (Deduct)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Amount (GFT)</label>
                  <input
                    type="number"
                    min="1"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    className="w-full text-sm bg-gray-50 dark:bg-[#0A4D45] border border-gray-300 dark:border-[#0A4D45] rounded-lg p-2.5 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Reason / Remarks</label>
                <textarea
                  rows="2"
                  placeholder="Administrative justification..."
                  value={formRemarks}
                  onChange={(e) => setFormRemarks(e.target.value)}
                  className="w-full text-sm bg-gray-50 dark:bg-[#0A4D45] border border-gray-300 dark:border-[#0A4D45] rounded-lg p-2.5 dark:text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 border border-gray-300 dark:border-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#0A4D45]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg text-sm font-medium"
                >
                  Confirm Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
