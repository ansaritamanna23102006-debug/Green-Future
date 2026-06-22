'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { withdrawalsData } from '@/lib/adminDummyData';
import { ArrowDownToLine, CheckCircle, XCircle, Clock, CheckSquare } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

export default function WithdrawalsManagement() {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <input 
          type="checkbox" 
          className="rounded border-gray-300 text-[#65B300] focus:ring-[#65B300] bg-white dark:bg-[#0A4D45]/50" 
        />
      ),
      cell: ({ row }) => (
        <input 
          type="checkbox" 
          className="rounded border-gray-300 text-[#65B300] focus:ring-[#65B300] bg-white dark:bg-[#0A4D45]/50" 
        />
      )
    },
    {
      accessorKey: 'id',
      header: 'Request ID',
      cell: info => <span className="text-gray-500 dark:text-gray-400">{info.getValue()}</span>
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: info => <span className="font-medium dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: info => <span className="font-bold text-[#65B300]">${info.getValue()}</span>
    },
    {
      accessorKey: 'wallet',
      header: 'Wallet Type',
      cell: info => (
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      )
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
        let color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        let Icon = Clock;
        
        if (status === 'Approved') {
          color = 'bg-green-100 text-green-800 border-green-200';
          Icon = CheckCircle;
        }
        if (status === 'Rejected') {
          color = 'bg-red-100 text-red-800 border-red-200';
          Icon = XCircle;
        }
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit ${color}`}>
            <Icon size={12} />
            {status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        if (row.original.status !== 'Pending') return <span className="text-gray-400 text-xs">Processed</span>;
        return (
          <div className="flex items-center gap-1">
            <button className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors" title="Approve">
              <CheckCircle size={16} />
            </button>
            <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors" title="Reject">
              <XCircle size={16} />
            </button>
            <button className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors" title="Hold">
              <Clock size={16} />
            </button>
          </div>
        );
      }
    }
  ], []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <ArrowDownToLine className="text-[#65B300]" />
            Withdrawal Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Process and monitor member withdrawal requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Processed" value="$450,000" icon={ArrowDownToLine} delay={0.1} />
        <StatCard title="Pending Requests" value="12" icon={Clock} delay={0.2} />
        <StatCard title="Pending Amount" value="$12,500" icon={ArrowDownToLine} delay={0.3} />
        <StatCard title="Rejected Requests" value="5" icon={XCircle} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="font-bold dark:text-white flex items-center gap-2">
            <Clock size={18} className="text-[#65B300]" />
            Recent Requests
          </h3>
          
          {/* Bulk Processing UI */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">Bulk Action:</span>
            <button className="px-3 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center gap-1.5">
              <CheckSquare size={14} /> Approve All Selected
            </button>
            <button className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors flex items-center gap-1.5">
              <XCircle size={14} /> Reject All Selected
            </button>
          </div>
        </div>
        
        <DataTable data={withdrawalsData} columns={columns} />
      </div>
    </div>
  );
}
