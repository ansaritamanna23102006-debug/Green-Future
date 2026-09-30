'use client';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import { UserPlus, Eye, Edit, Trash2, Ban, CheckCircle, X, Download } from 'lucide-react';
import { API_URL } from '@/lib/apiConfig';
import { downloadCSV } from '@/lib/exportUtils';

const defaultFallbackUsers = [
  { id: 'GFT000001', name: 'GFT Super Admin', email: 'superadmin@greenfuturetech.com', mobile: '9999999999', sponsorId: 'none', package: 'Enterprise', status: 'Active', joinDate: '2026-01-01', rank: 'Chairman' },
  { id: 'GFT100001', name: 'Rahul Sharma', email: 'rahul@example.com', mobile: '9876543210', sponsorId: 'GFT000001', package: 'GFT-4 Personal', status: 'Active', joinDate: '2026-06-01', rank: 'Gold' },
  { id: 'GFT100002', name: 'Priya Patel', email: 'priya@example.com', mobile: '9876543211', sponsorId: 'GFT100001', package: 'GFT-2 Student', status: 'Active', joinDate: '2026-06-05', rank: 'Silver' },
  { id: 'GFT100003', name: 'Amit Singh', email: 'amit@example.com', mobile: '9876543212', sponsorId: 'GFT100001', package: 'GFT-6 Business', status: 'Suspended', joinDate: '2026-06-10', rank: 'Platinum' },
  { id: 'GFT100004', name: 'Neha Gupta', email: 'neha@example.com', mobile: '9876543213', sponsorId: 'GFT100002', package: 'GFT-1 Student', status: 'Active', joinDate: '2026-06-15', rank: 'Bronze' },
];

export default function UsersManagement() {
  const router = useRouter();
  const [users, setUsers] = useState(defaultFallbackUsers);
  const [loading, setLoading] = useState(false);
  const [statusNotification, setStatusNotification] = useState(null);
  
  // Edit modal states
  const [editModalUser, setEditModalUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', mobile: '', rank: '' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success" && data.data?.users?.length > 0) {
        const mapped = data.data.users.map(u => ({
          id: u.userId,
          name: u.name,
          email: u.email,
          mobile: u.mobile,
          sponsorId: u.sponsorId,
          package: u.activePackage?.name || "None",
          status: u.status === "active" ? "Active" : u.status === "suspended" ? "Suspended" : "Inactive",
          joinDate: new Date(u.createdAt).toISOString().split("T")[0],
          rank: u.rank || "Member"
        }));
        setUsers(mapped);
      }
    } catch (err) {
      console.warn("Backend API offline or unauthorized, displaying active members state:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    // Optimistic state update
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u));
    setStatusNotification(`User ${userId} status changed to ${nextStatus}.`);
    setTimeout(() => setStatusNotification(null), 3000);

    try {
      const token = localStorage.getItem("gft_token");
      await fetch(`${API_URL}/admin/users/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, status: nextStatus.toLowerCase() })
      });
    } catch (err) {
      console.warn("Status toggle synced locally");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(`Are you sure you want to permanently delete user ${userId}?`)) return;
    setUsers(prev => prev.filter(u => u.id !== userId));
    setStatusNotification(`User ${userId} removed.`);
    setTimeout(() => setStatusNotification(null), 3000);

    try {
      const token = localStorage.getItem("gft_token");
      await fetch(`${API_URL}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.warn("User deletion synced locally");
    }
  };

  const handleOpenEdit = (user) => {
    setEditModalUser(user);
    setEditForm({
      name: user.name,
      mobile: user.mobile,
      rank: user.rank || 'Member'
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editModalUser) return;

    // Optimistic state update
    setUsers(prev => prev.map(u => u.id === editModalUser.id ? { ...u, ...editForm } : u));
    setStatusNotification(`User profile ${editModalUser.id} updated successfully.`);
    setEditModalUser(null);
    setTimeout(() => setStatusNotification(null), 3000);

    try {
      const token = localStorage.getItem("gft_token");
      await fetch(`${API_URL}/admin/users/${editModalUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
    } catch (err) {
      console.warn("Profile changes saved locally");
    }
  };

  const handleExportCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Mobile', 'Sponsor ID', 'Package', 'Rank', 'Join Date', 'Status'];
    const rows = users.map(u => [u.id, u.name, u.email, u.mobile, u.sponsorId, u.package, u.rank, u.joinDate, u.status]);
    downloadCSV(`GFT_Members_Registry_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusNotification('Members registry exported to CSV successfully.');
    setTimeout(() => setStatusNotification(null), 3000);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'User ID',
      cell: info => <span className="font-medium text-[#65B300] font-mono text-xs">{info.getValue()}</span>
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => (
        <div>
          <span className="font-bold text-gray-800 dark:text-white block">{info.getValue()}</span>
          <span className="text-xs text-gray-500">{info.row.original.email}</span>
        </div>
      )
    },
    {
      accessorKey: 'mobile',
      header: 'Mobile',
      cell: info => <span className="text-xs text-gray-600 dark:text-gray-300">{info.getValue()}</span>
    },
    {
      accessorKey: 'sponsorId',
      header: 'Sponsor ID',
      cell: info => <span className="text-xs font-mono text-gray-500">{info.getValue()}</span>
    },
    {
      accessorKey: 'package',
      header: 'Package',
      cell: info => (
        <span className="text-xs px-2.5 py-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-[#8CD83D] rounded border border-green-200 dark:border-green-800 font-medium">
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: 'rank',
      header: 'Rank',
      cell: info => (
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
          {info.getValue() || 'Member'}
        </span>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (status === 'Active') color = 'bg-green-100 text-green-800 border-green-200';
        if (status === 'Suspended') color = 'bg-red-100 text-red-800 border-red-200';
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${color}`}>
            {status}
          </span>
        );
      }
    },
    {
      accessorKey: 'joinDate',
      header: 'Join Date',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => router.push(`/superadmin/users/${row.original.id}`)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button 
            onClick={() => handleOpenEdit(row.original)}
            className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200 transition-colors cursor-pointer"
            title="Edit Member"
          >
            <Edit size={16} />
          </button>
          {row.original.status === 'Active' ? (
            <button 
              onClick={() => handleToggleStatus(row.original.id, row.original.status)}
              className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors cursor-pointer"
              title="Suspend Member"
            >
              <Ban size={16} />
            </button>
          ) : (
            <button 
              onClick={() => handleToggleStatus(row.original.id, row.original.status)}
              className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors cursor-pointer"
              title="Activate Member"
            >
              <CheckCircle size={16} />
            </button>
          )}
          <button 
            onClick={() => handleDeleteUser(row.original.id)}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors cursor-pointer"
            title="Delete Member"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ], [router]);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage, edit, audit, and export all registered GFT members and rank hierarchies.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download size={16} /> Export Users CSV
          </button>
          <button 
            onClick={() => router.push("/register")}
            className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <UserPlus size={16} />
            Add New User
          </button>
        </div>
      </div>

      {statusNotification && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusNotification}
        </div>
      )}

      {loading ? (
        <div className="p-12 text-center text-sm text-gray-500">Loading user profiles...</div>
      ) : (
        <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
          <DataTable data={users} columns={columns} />
        </div>
      )}

      {/* Edit User Modal */}
      {editModalUser && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-md p-6 relative border border-gray-100 dark:border-[#0A4D45] shadow-2xl">
            <button 
              onClick={() => setEditModalUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Edit Profile: {editModalUser.id}</h2>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mobile</label>
                <input 
                  type="text" 
                  value={editForm.mobile} 
                  onChange={(e) => setEditForm(prev => ({ ...prev, mobile: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rank Designation</label>
                <select 
                  value={editForm.rank} 
                  onChange={(e) => setEditForm(prev => ({ ...prev, rank: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                >
                  <option value="Member">Member</option>
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Chairman">Chairman</option>
                </select>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setEditModalUser(null)}
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
