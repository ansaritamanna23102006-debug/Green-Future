'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Bell, Plus, Edit2, Trash2, Megaphone, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const dummyAnnouncements = [
  { id: 'ANN-001', title: 'System Maintenance Scheduled', type: 'System Alert', priority: 'Critical', date: '2026-06-25', status: 'Active' },
  { id: 'ANN-002', title: 'New Package Launch', type: 'Dashboard Notice', priority: 'Important', date: '2026-06-20', status: 'Active' },
  { id: 'ANN-003', title: 'Weekly Meeting Update', type: 'Popup Announcement', priority: 'Normal', date: '2026-06-18', status: 'Inactive' },
];

export default function AnnouncementsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Announcement Title',
      cell: info => <span className="font-bold text-gray-800 dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: info => <span className="text-sm px-2.5 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded border border-gray-200 dark:border-[#0A4D45]/50 text-gray-700 dark:text-gray-300">{info.getValue()}</span>
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: info => {
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
      }
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
        let color = 'bg-gray-100 text-gray-800';
        if (status === 'Active') color = 'bg-green-100 text-green-800';
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
            {status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors tooltip-trigger" title="Edit">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors tooltip-trigger" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ], []);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Bell className="text-[#65B300]" />
            Announcements
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Broadcast messages and alerts to all users.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20"
        >
          <Plus size={16} />
          Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Announcements" value="12" icon={Megaphone} delay={0.1} />
        <StatCard title="Active Now" value="2" icon={Bell} delay={0.2} />
        <StatCard title="Critical Alerts" value="1" icon={ShieldAlert} delay={0.3} />
        <StatCard title="Read Rate" value="85%" icon={Info} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={dummyAnnouncements} columns={columns} />
      </div>

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
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold"
              >✕</button>
            </div>
            
            <div className="p-6">
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Announcement Title</label>
                  <input type="text" placeholder="e.g. Scheduled Maintenance" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                    <select className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none">
                      <option>Popup Announcement</option>
                      <option>Dashboard Notice</option>
                      <option>System Alert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                    <select className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none">
                      <option>Normal</option>
                      <option>Important</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Body</label>
                  <textarea placeholder="Write the announcement details..." rows="4" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"></textarea>
                </div>
                
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mt-2">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#65B300] focus:ring-[#65B300] bg-white dark:bg-[#0A4D45]/50" defaultChecked />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Publish immediately</span>
                  </label>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors">Cancel</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2">
                    <Megaphone size={18} /> Broadcast
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
