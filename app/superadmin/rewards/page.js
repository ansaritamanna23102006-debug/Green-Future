'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Gift, CheckCircle, Trophy, Download, Plus, Edit, Trash2, X } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadCSV } from '@/lib/exportUtils';

const initialRewards = [
  { id: 'RWD-201', user: 'Rahul Sharma', reward: 'Fossil Watch (Bq2493)', designation: 'Gold', status: 'Delivered', date: '2026-06-15' },
  { id: 'RWD-202', user: 'Neha Gupta', reward: 'Luxury Electronics Kit', designation: 'Emerald', status: 'Pending', date: '2026-06-18' },
  { id: 'RWD-203', user: 'Priya Patel', reward: 'Executive Chronograph', designation: 'Silver', status: 'Processing', date: '2026-06-20' },
  { id: 'RWD-204', user: 'Amit Singh', reward: 'Yamaha R15 V4 Bike', designation: 'Platinum', status: 'Pending', date: '2026-06-21' },
];

export default function RewardsManagement() {
  const [rewards, setRewards] = useState(initialRewards);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalReward, setEditModalReward] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    user: '',
    designation: 'Silver',
    reward: '',
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
  });

  const handleMarkDelivered = (rewardId, user) => {
    setRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, status: 'Delivered' } : r))
    );
    setStatusMessage(`Reward ${rewardId} for ${user} marked as Delivered.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDeleteReward = (rewardId, user) => {
    if (!window.confirm(`Are you sure you want to delete reward dispatch record for ${user}?`)) return;
    setRewards((prev) => prev.filter((r) => r.id !== rewardId));
    setStatusMessage(`Reward record ${rewardId} deleted.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleOpenEdit = (reward) => {
    setEditModalReward(reward);
    setFormData({
      user: reward.user,
      designation: reward.designation,
      reward: reward.reward,
      status: reward.status,
      date: reward.date,
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editModalReward) return;
    setRewards((prev) =>
      prev.map((r) =>
        r.id === editModalReward.id
          ? { ...r, ...formData }
          : r
      )
    );
    setEditModalReward(null);
    setStatusMessage(`Reward record ${editModalReward.id} updated successfully.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleCreateReward = (e) => {
    e.preventDefault();
    if (!formData.user.trim() || !formData.reward.trim()) {
      alert('Please fill out all required fields.');
      return;
    }
    const newRecord = {
      id: `RWD-${200 + rewards.length + 1}`,
      ...formData,
    };
    setRewards((prev) => [newRecord, ...prev]);
    setIsAddModalOpen(false);
    setFormData({
      user: '',
      designation: 'Silver',
      reward: '',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    });
    setStatusMessage(`New reward dispatch logged for ${newRecord.user}.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExportCSV = () => {
    const headers = ['Reward ID', 'Achiever', 'Achieved Rank', 'Reward Item', 'Date Achieved', 'Delivery Status'];
    const rows = rewards.map((r) => [r.id, r.user, r.designation, r.reward, r.date, r.status]);
    downloadCSV(`GFT_Rewards_Dispatch_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Rewards dispatch registry exported to CSV.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Reward ID',
      cell: (info) => <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">{info.getValue()}</span>,
    },
    {
      accessorKey: 'user',
      header: 'Achiever',
      cell: (info) => (
        <span className="font-medium dark:text-white flex items-center gap-2">
          <Trophy size={14} className="text-[#65B300]" /> {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'designation',
      header: 'Achieved Rank',
      cell: (info) => <span className="text-gray-600 dark:text-gray-300 font-medium">{info.getValue()}</span>,
    },
    {
      accessorKey: 'reward',
      header: 'Reward Item',
      cell: (info) => <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D]">{info.getValue()}</span>,
    },
    {
      accessorKey: 'date',
      header: 'Date Achieved',
    },
    {
      accessorKey: 'status',
      header: 'Delivery Status',
      cell: (info) => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
        if (status === 'Delivered') color = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
        if (status === 'Processing') color = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';

        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
            {status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status !== 'Delivered' && (
            <button
              onClick={() => handleMarkDelivered(row.original.id, row.original.user)}
              title="Mark Delivered"
              className="px-2.5 py-1 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <CheckCircle size={13} />
              Delivered
            </button>
          )}
          <button
            onClick={() => handleOpenEdit(row.original)}
            title="Edit Reward"
            className="p-1.5 text-gray-500 hover:text-[#65B300] dark:text-gray-400 dark:hover:text-[#8CD83D] rounded hover:bg-gray-100 dark:hover:bg-[#0A4D45] transition-colors cursor-pointer"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => handleDeleteReward(row.original.id, row.original.user)}
            title="Delete Reward"
            className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ),
    },
  ], []);

  const pendingCount = rewards.filter((r) => r.status !== 'Delivered').length;
  const deliveredCount = rewards.filter((r) => r.status === 'Delivered').length;

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Gift className="text-[#65B300]" />
            Rewards Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Track member rank achievements, dispatch physical rewards, and log settlements.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download size={16} /> Export CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 cursor-pointer"
          >
            <Plus size={16} /> Add Reward Claim
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Rewards Issued" value={rewards.length.toString()} icon={Gift} delay={0.1} />
        <StatCard title="Delivered Rewards" value={deliveredCount.toString()} icon={CheckCircle} delay={0.2} />
        <StatCard title="Pending Deliveries" value={pendingCount.toString()} icon={Gift} delay={0.3} />
        <StatCard title="Bikes & Cars Dispatched" value="14" icon={Trophy} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={rewards} columns={columns} />
      </div>

      {/* Add / Edit Reward Modal */}
      {(isAddModalOpen || editModalReward) && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditModalReward(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              {editModalReward ? `Edit Reward: ${editModalReward.id}` : 'Log New Reward Dispatch'}
            </h2>
            <form onSubmit={editModalReward ? handleSaveEdit : handleCreateReward} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase mb-1">Achiever Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                  placeholder="e.g. Vikram Verma"
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white text-xs outline-none focus:ring-2 focus:ring-[#65B300]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase mb-1">Designation Rank</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white text-xs outline-none focus:ring-2 focus:ring-[#65B300]"
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Chairman">Chairman</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white text-xs outline-none focus:ring-2 focus:ring-[#65B300]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase mb-1">Reward Item</label>
                <input
                  type="text"
                  required
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                  placeholder="e.g. Smartphone, Luxury Watch, Motorbike"
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white text-xs outline-none focus:ring-2 focus:ring-[#65B300]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-300 uppercase mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white text-xs outline-none focus:ring-2 focus:ring-[#65B300]"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditModalReward(null);
                  }}
                  className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-md"
                >
                  {editModalReward ? 'Save Changes' : 'Log Reward'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
