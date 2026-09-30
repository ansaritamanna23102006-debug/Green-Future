'use client';
import { useMemo, useState } from 'react';
import { Award, Edit, Target, DollarSign, Gift, Download, X, CheckCircle } from 'lucide-react';
import DataTable from '@/components/admin/DataTable';
import { designationsData as initialData } from '@/lib/adminDummyData';
import { downloadCSV } from '@/lib/exportUtils';

export default function DesignationsManagement() {
  const [designations, setDesignations] = useState(initialData);
  const [editingRank, setEditingRank] = useState(null);
  const [formTurnover, setFormTurnover] = useState('');
  const [formPercentage, setFormPercentage] = useState('');
  const [formReward, setFormReward] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleOpenEdit = (rank) => {
    setEditingRank(rank);
    setFormTurnover(rank.turnover.toString());
    setFormPercentage(rank.percentage.toString());
    setFormReward(rank.rewards);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingRank) return;

    setDesignations((prev) =>
      prev.map((d) =>
        d.id === editingRank.id
          ? {
              ...d,
              turnover: parseFloat(formTurnover) || d.turnover,
              percentage: parseFloat(formPercentage) || d.percentage,
              rewards: formReward.trim() || d.rewards,
            }
          : d
      )
    );

    setStatusMessage(`Designation "${editingRank.name}" criteria updated successfully.`);
    setEditingRank(null);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['Designation Name', 'Required Turnover ($)', 'Bonus Percentage (%)', 'Reward Item'];
    const rows = designations.map((d) => [d.name, d.turnover, d.percentage, d.rewards]);
    downloadCSV(`GFT_Designations_Matrix_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Designations matrix exported to CSV.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Designation Name',
      cell: (info) => (
        <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D] flex items-center gap-2">
          <Award size={16} className="text-[#65B300]" />
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'turnover',
      header: 'Required Turnover ($)',
      cell: (info) => <span className="font-medium">${info.getValue().toLocaleString()}</span>,
    },
    {
      accessorKey: 'percentage',
      header: 'Bonus Percentage',
      cell: (info) => <span className="font-medium text-gray-600 dark:text-gray-300">{info.getValue()}%</span>,
    },
    {
      accessorKey: 'rewards',
      header: 'Reward',
      cell: (info) => (
        <span className="px-2.5 py-1 rounded-md text-xs font-medium border bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1.5 w-fit">
          <Gift size={12} /> {info.getValue()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button
          onClick={() => handleOpenEdit(row.original)}
          className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200 transition-colors cursor-pointer"
          title="Edit Rank Criteria"
        >
          <Edit size={16} />
        </button>
      ),
    },
  ], []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Award className="text-[#65B300]" />
            Designations Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Configure qualification criteria, matching bonus allocations, and physical reward thresholds.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 cursor-pointer"
        >
          <Download size={16} /> Export Criteria CSV
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#062F2D] p-6 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#65B300]/10 flex items-center justify-center text-[#65B300]">
            <Target size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Ranks</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{designations.length}</h3>
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
        <DataTable data={designations} columns={columns} searchable={false} />
      </div>

      {/* Edit Rank Modal */}
      {editingRank && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <Edit size={18} className="text-[#65B300]" />
                Edit Rank: {editingRank.name}
              </h3>
              <button
                onClick={() => setEditingRank(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Required Turnover ($)</label>
                <input
                  type="number"
                  required
                  value={formTurnover}
                  onChange={(e) => setFormTurnover(e.target.value)}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bonus Percentage (%)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formPercentage}
                  onChange={(e) => setFormPercentage(e.target.value)}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reward Item</label>
                <input
                  type="text"
                  required
                  value={formReward}
                  onChange={(e) => setFormReward(e.target.value)}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingRank(null)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md"
                >
                  Save Criteria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
