'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Bell, Plus, Edit2, Trash2, Megaphone, AlertTriangle, Info, ShieldAlert, X, CheckCircle, Download } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadCSV } from '@/lib/exportUtils';

const initialAnnouncements = [
  { id: 'ANN-001', title: 'System Maintenance Scheduled', type: 'System Alert', priority: 'Critical', date: '2026-06-25', status: 'Active', message: 'Core ledger maintenance scheduled from 02:00 AM to 04:00 AM UTC.' },
  { id: 'ANN-002', title: 'New Package Launch', type: 'Dashboard Notice', priority: 'Important', date: '2026-06-20', status: 'Active', message: 'Preview catalog for GFT startup packages now available.' },
  { id: 'ANN-003', title: 'Weekly Meeting Update', type: 'Popup Announcement', priority: 'Normal', date: '2026-06-18', status: 'Inactive', message: 'Zoom leadership sync link dispatched to all Silver and Gold leaders.' },
];

export default function AnnouncementsManagement() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('Dashboard Notice');
  const [formPriority, setFormPriority] = useState('Important');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState('Active');

  const handleExportCSV = () => {
    const headers = ['Announcement ID', 'Title', 'Type', 'Priority', 'Date', 'Status', 'Message'];
    const rows = announcements.map((a) => [a.id, a.title, a.type, a.priority, a.date, a.status, a.message]);
    downloadCSV(`GFT_Announcements_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Announcements exported to CSV.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDelete = (id, title) => {
    if (!window.confirm(`Are you sure you want to delete announcement "${title}"?`)) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    setStatusMessage(`Announcement "${title}" removed.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleOpenEdit = (ann) => {
    setEditModal(ann);
    setFormTitle(ann.title);
    setFormType(ann.type);
    setFormPriority(ann.priority);
    setFormMessage(ann.message || '');
    setFormStatus(ann.status);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === editModal.id
          ? {
              ...a,
              title: formTitle.trim(),
              type: formType,
              priority: formPriority,
              message: formMessage,
              status: formStatus,
            }
          : a
      )
    );

    setStatusMessage(`Announcement "${formTitle}" updated.`);
    setEditModal(null);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Please enter an announcement title');
      return;
    }

    const newAnn = {
      id: `ANN-00${announcements.length + 1}`,
      title: formTitle.trim(),
      type: formType,
      priority: formPriority,
      date: new Date().toISOString().split('T')[0],
      status: formStatus,
      message: formMessage,
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    setIsModalOpen(false);
    setFormTitle('');
    setFormMessage('');
    setStatusMessage(`Announcement "${newAnn.title}" broadcasted successfully.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Announcement Title',
      cell: (info) => (
        <div>
          <span className="font-bold text-gray-800 dark:text-white block">{info.getValue()}</span>
          <span className="text-xs text-gray-400">{info.row.original.message}</span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (info) => (
        <span className="text-sm px-2.5 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded border border-gray-200 dark:border-[#0A4D45]/50 text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: (info) => {
        const priority = info.getValue();
        let color = 'bg-blue-100 text-blue-800 border-blue-200';
        let Icon = Info;

        if (priority === 'Critical') {
          color = 'bg-red-100 text-red-800 border-red-200';
          Icon = ShieldAlert;
        } else if (priority === 'Important') {
          color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
          Icon = AlertTriangle;
        }

        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit ${color}`}>
            <Icon size={12} />
            {priority}
          </span>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        let color = 'bg-gray-100 text-gray-800';
        if (status === 'Active') color = 'bg-green-100 text-green-800';

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
          <button
            onClick={() => handleOpenEdit(row.original)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors cursor-pointer"
            title="Edit Announcement"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id, row.original.title)}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors cursor-pointer"
            title="Delete Announcement"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Bell className="text-[#65B300]" />
            Announcements
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Broadcast messages, updates, and maintenance alerts to all users.
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
            onClick={() => {
              setFormTitle('');
              setFormMessage('');
              setIsModalOpen(true);
            }}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 cursor-pointer"
          >
            <Plus size={16} />
            Create Announcement
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
        <StatCard title="Total Announcements" value={announcements.length.toString()} icon={Megaphone} delay={0.1} />
        <StatCard title="Active Now" value={announcements.filter((a) => a.status === 'Active').length.toString()} icon={Bell} delay={0.2} />
        <StatCard title="Critical Alerts" value={announcements.filter((a) => a.priority === 'Critical').length.toString()} icon={ShieldAlert} delay={0.3} />
        <StatCard title="Read Rate" value="92%" icon={Info} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={announcements} columns={columns} />
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <Megaphone size={18} className="text-[#65B300]" />
                Create Announcement
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Scheduled Network Sync"
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  >
                    <option>Popup Announcement</option>
                    <option>Dashboard Notice</option>
                    <option>System Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  >
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Body</label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Write the announcement details..."
                  rows={4}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-md"
                >
                  <Megaphone size={18} /> Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <Edit2 size={18} className="text-[#65B300]" />
                Edit Announcement: {editModal.id}
              </h3>
              <button
                onClick={() => setEditModal(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Announcement Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  >
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Body</label>
                <textarea
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
                  className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
