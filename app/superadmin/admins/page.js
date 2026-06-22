'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ShieldCheck, Plus, ShieldAlert, Edit, Trash2, ToggleLeft, ToggleRight, CheckSquare } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const dummyAdmins = [
  { id: 'ADM-01', name: 'John Doe', email: 'john@gft.com', role: 'Admin', status: 'Active', lastLogin: '2026-06-22 10:30 AM' },
  { id: 'ADM-02', name: 'Sarah Smith', email: 'sarah@gft.com', role: 'Support Admin', status: 'Active', lastLogin: '2026-06-21 04:15 PM' },
  { id: 'ADM-03', name: 'Mike Johnson', email: 'mike@gft.com', role: 'Finance Admin', status: 'Inactive', lastLogin: '2026-06-10 09:00 AM' },
];

export default function AdminsManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => (
        <div>
          <p className="font-bold text-gray-800 dark:text-white">{info.getValue()}</p>
          <p className="text-xs text-gray-500">{info.row.original.email}</p>
        </div>
      )
    },
    {
      accessorKey: 'role',
      header: 'Assigned Role',
      cell: info => (
        <span className="text-sm px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-md border border-blue-200 dark:border-blue-800 font-medium">
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
            status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
          }`}>
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
          <button className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200 transition-colors tooltip-trigger" title="Edit Permissions">
            <Edit size={16} />
          </button>
          <button className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors tooltip-trigger" title="Suspend">
            <ShieldAlert size={16} />
          </button>
          <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors tooltip-trigger" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ], []);

  const permissions = [
    'Dashboard Access', 'User Management', 'KYC Verification', 
    'Package Management', 'Income Management', 'Token Management', 
    'Genealogy View', 'Rewards Processing', 'Withdrawal Processing',
    'Content Management', 'Support System'
  ];

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <ShieldCheck className="text-[#65B300]" />
            Administrator Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create sub-admins and manage their specific route permissions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20"
        >
          <Plus size={16} />
          Create Admin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Sub Admins" value="3" icon={ShieldCheck} delay={0.1} />
        <StatCard title="Active Now" value="2" icon={CheckSquare} delay={0.2} />
        <StatCard title="Suspended" value="1" icon={ShieldAlert} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={dummyAdmins} columns={columns} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#65B300]" />
                Create Sub Administrator
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold"
              >✕</button>
            </div>
            
            <div className="p-6">
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <input type="email" placeholder="john@gft.com" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Title</label>
                    <input type="text" placeholder="e.g. Support Admin" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Module Permissions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {permissions.map((perm, idx) => (
                      <label key={idx} className="flex items-center justify-between p-3 border border-gray-200 dark:border-[#0A4D45] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0A4D45]/30 transition-colors">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{perm}</span>
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#65B300] focus:ring-[#65B300] bg-white dark:bg-[#0A4D45]/50" />
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3 pt-4 border-t border-gray-200 dark:border-[#0A4D45]">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors">Cancel</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors">Create Admin</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
