'use client';
import { useMemo } from 'react';
import { Award, Edit, Target, DollarSign, Gift } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { designationsData } from '@/lib/adminDummyData';

export default function DesignationsManagement() {
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Designation Name',
      cell: info => <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D] flex items-center gap-2"><Award size={16} className="text-[#65B300]"/>{info.getValue()}</span>
    },
    {
      accessorKey: 'turnover',
      header: 'Required Turnover ($)',
      cell: info => <span className="font-medium">${info.getValue().toLocaleString()}</span>
    },
    {
      accessorKey: 'percentage',
      header: 'Bonus Percentage',
      cell: info => <span className="font-medium text-gray-600 dark:text-gray-300">{info.getValue()}%</span>
    },
    {
      accessorKey: 'rewards',
      header: 'Reward',
      cell: info => (
        <span className="px-2.5 py-1 rounded-md text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1.5 w-fit">
          <Gift size={12} /> {info.getValue()}
        </span>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <button className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200 transition-colors tooltip-trigger" title="Edit Criteria">
          <Edit size={16} />
        </button>
      )
    }
  ], []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Award className="text-[#65B300]" />
            Designations Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Configure criteria and rewards for member ranks.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#65B300]/10 flex items-center justify-center text-[#65B300]">
            <Target size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Ranks</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{designationsData.length}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
            <Gift size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Rewards Given</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">1,245</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-[#0A4D45] flex items-center justify-center text-green-600 dark:text-[#8CD83D]">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Bonus Paid</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">$45,000</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden">
        <DataTable data={designationsData} columns={columns} searchable={false} />
      </div>
    </div>
  );
}
