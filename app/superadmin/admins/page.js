'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ShieldCheck, Plus, ShieldAlert, Edit, Trash2, CheckSquare, X, CheckCircle, Download } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadCSV } from '@/lib/exportUtils';

const allPermissionsList = [
  'Dashboard Access', 'User Management', 'KYC Verification',
  'Package Management', 'Income Management', 'Token Management',
  'Genealogy View', 'Rewards Processing', 'Withdrawal Processing',
  'Content Management', 'Support System'
];

const initialAdmins = [
  { id: 'GFT000001', name: 'Super Administrator', email: 'superadmin@gft.com', role: 'Super Admin', status: 'Active', lastLogin: 'Just now', permissions: allPermissionsList },
  { id: 'GFT000002', name: 'System Administrator', email: 'admin@gft.com', role: 'Operations Admin', status: 'Active', lastLogin: 'Today, 10:30 AM', permissions: ['Dashboard Access', 'User Management', 'KYC Verification', 'Support System', 'Genealogy View'] },
];

export default function AdminsManagement() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAdminModal, setEditAdminModal] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleExportCSV = () => {
    const headers = ['Admin ID', 'Full Name', 'Email', 'Role', 'Status', 'Last Login', 'Assigned Permissions'];
    const rows = admins.map((adm) => [
      adm.id,
      adm.name,
      adm.email,
      adm.role,
      adm.status,
      adm.lastLogin,
      (adm.permissions || []).join('; '),
    ]);
    downloadCSV(`GFT_Admins_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Administrators list exported to CSV.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Create form state
  const [createName, setCreateName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createRole, setCreateRole] = useState('Support Admin');
  const [createPerms, setCreatePerms] = useState(['Dashboard Access', 'Support System']);

  // Edit form state
  const [editRole, setEditRole] = useState('');
  const [editPerms, setEditPerms] = useState([]);

  const handleToggleSuspend = (adminId) => {
    setAdmins((prev) =>
      prev.map((adm) => {
        if (adm.id === adminId) {
          const nextStatus = adm.status === 'Active' ? 'Suspended' : 'Active';
          setStatusMessage(`Admin "${adm.name}" is now ${nextStatus}.`);
          setTimeout(() => setStatusMessage(null), 3000);
          return { ...adm, status: nextStatus };
        }
        return adm;
      })
    );
  };

  const handleDelete = (adminId, name) => {
    if (!window.confirm(`Are you sure you want to revoke and delete admin "${name}"?`)) return;
    setAdmins((prev) => prev.filter((adm) => adm.id !== adminId));
    setStatusMessage(`Admin "${name}" removed successfully.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleOpenEdit = (admin) => {
    setEditAdminModal(admin);
    setEditRole(admin.role);
    setEditPerms(admin.permissions || ['Dashboard Access']);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editRole.trim()) return;

    setAdmins((prev) =>
      prev.map((adm) =>
        adm.id === editAdminModal.id
          ? { ...adm, role: editRole.trim(), permissions: editPerms }
          : adm
      )
    );
    setStatusMessage(`Permissions updated for ${editAdminModal.name}.`);
    setEditAdminModal(null);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!createName.trim() || !createEmail.trim()) {
      alert('Please fill out all required fields');
      return;
    }

    const newAdm = {
      id: `ADM-0${admins.length + 1}`,
      name: createName.trim(),
      email: createEmail.trim(),
      role: createRole.trim(),
      status: 'Active',
      lastLogin: 'Never',
      permissions: createPerms,
    };

    setAdmins((prev) => [newAdm, ...prev]);
    setIsModalOpen(false);
    setCreateName('');
    setCreateEmail('');
    setStatusMessage(`New Administrator "${newAdm.name}" created.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const toggleCreatePerm = (perm) => {
    setCreatePerms((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const toggleEditPerm = (perm) => {
    setEditPerms((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => (
        <div>
          <p className="font-bold text-gray-800 dark:text-white">{info.getValue()}</p>
          <p className="text-xs text-gray-500">{info.row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Assigned Role',
      cell: (info) => (
        <span className="text-sm px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-md border border-blue-200 dark:border-blue-800 font-medium">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'lastLogin',
      header: 'Last Login',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              status === 'Active'
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'bg-red-100 text-red-800 border-red-200'
            }`}
          >
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
            className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200 transition-colors cursor-pointer"
            title="Edit Permissions"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleToggleSuspend(row.original.id)}
            className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors cursor-pointer"
            title={row.original.status === 'Active' ? 'Suspend Admin' : 'Activate Admin'}
          >
            <ShieldAlert size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id, row.original.name)}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors cursor-pointer"
            title="Delete Admin"
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
            <ShieldCheck className="text-[#65B300]" />
            Administrator Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Create sub-admins and manage their specific route permissions and credentials.
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
            onClick={() => setIsModalOpen(true)}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 cursor-pointer"
          >
            <Plus size={16} />
            Create Admin
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Sub Admins" value={admins.length.toString()} icon={ShieldCheck} delay={0.1} />
        <StatCard title="Active Now" value={admins.filter((a) => a.status === 'Active').length.toString()} icon={CheckSquare} delay={0.2} />
        <StatCard title="Suspended" value={admins.filter((a) => a.status === 'Suspended').length.toString()} icon={ShieldAlert} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={admins} columns={columns} />
      </div>

      {/* Create Modal */}
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
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={createEmail}
                    onChange={(e) => setCreateEmail(e.target.value)}
                    placeholder="john@gft.com"
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initial Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    defaultValue="Admin@2026"
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Title</label>
                  <input
                    type="text"
                    required
                    value={createRole}
                    onChange={(e) => setCreateRole(e.target.value)}
                    placeholder="e.g. Support Admin"
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">Module Permissions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {allPermissionsList.map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center justify-between p-2.5 border border-gray-200 dark:border-[#0A4D45] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0A4D45]/30 transition-colors"
                    >
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{perm}</span>
                      <input
                        type="checkbox"
                        checked={createPerms.includes(perm)}
                        onChange={() => toggleCreatePerm(perm)}
                        className="w-4 h-4 rounded text-[#65B300] focus:ring-[#65B300]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#0A4D45]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Permissions Modal */}
      {editAdminModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <Edit size={18} className="text-[#65B300]" />
                Edit Admin Permissions: {editAdminModal.name}
              </h3>
              <button
                onClick={() => setEditAdminModal(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-3 text-sm">Granted Modules</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allPermissionsList.map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center justify-between p-2.5 border border-gray-200 dark:border-[#0A4D45] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0A4D45]/30 transition-colors"
                    >
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{perm}</span>
                      <input
                        type="checkbox"
                        checked={editPerms.includes(perm)}
                        onChange={() => toggleEditPerm(perm)}
                        className="w-4 h-4 rounded text-[#65B300] focus:ring-[#65B300]"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-[#0A4D45]">
                <button
                  type="button"
                  onClick={() => setEditAdminModal(null)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md"
                >
                  Save Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
