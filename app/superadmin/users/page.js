'use client';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/admin/DataTable';
import { UserPlus, Eye, Edit, Trash2, Ban, CheckCircle, X } from 'lucide-react';

export default function UsersManagement() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit modal states
  const [editModalUser, setEditModalUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', mobile: '', rank: '' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("gft_token");
      const res = await fetch("http://localhost:5000/api/v1/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success") {
        const mapped = data.data.users.map(u => ({
          id: u.userId,
          name: u.name,
          email: u.email,
          mobile: u.mobile,
          sponsorId: u.sponsorId,
          package: u.activePackage?.name || "None",
          status: u.status === "active" ? "Active" : u.status === "suspended" ? "Suspended" : "Inactive",
          joinDate: new Date(u.createdAt).toISOString().split("T")[0],
          rank: u.rank
        }));
        setUsers(mapped);
      }
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem("gft_token");
      const nextStatus = currentStatus === "Active" ? "suspended" : "active";
      const res = await fetch("http://localhost:5000/api/v1/admin/users/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, status: nextStatus })
      });
      const data = await res.json();
      if (data.status === "success") {
        fetchUsers();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm(`Are you sure you want to permanently delete user ${userId}?`)) return;
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`http://localhost:5000/api/v1/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.status === "success") {
        fetchUsers();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenEdit = (user) => {
    setEditModalUser(user);
    setEditForm({
      name: user.name,
      mobile: user.mobile,
      rank: user.rank || 'none'
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("gft_token");
      const res = await fetch(`http://localhost:5000/api/v1/admin/users/${editModalUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      if (data.status === "success") {
        setEditModalUser(null);
        fetchUsers();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'User ID',
      cell: info => <span className="font-medium text-[#65B300]">{info.getValue()}</span>
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => (
        <div>
          <p className="font-medium dark:text-white">{info.getValue()}</p>
          <p className="text-xs text-gray-500">{info.row.original.email}</p>
        </div>
      )
    },
    {
      accessorKey: 'mobile',
      header: 'Mobile',
    },
    {
      accessorKey: 'sponsorId',
      header: 'Sponsor ID',
    },
    {
      accessorKey: 'package',
      header: 'Package',
      cell: info => (
        <span className="px-2 py-1 bg-[#0A4D45]/10 text-[#0A4D45] dark:text-[#8CD83D] rounded-md text-xs font-medium border border-[#0A4D45]/20">
          {info.getValue()}
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
        if (status === 'Suspended') color = 'bg-rose-100 text-rose-800 border-rose-200';
        if (status === 'Inactive') color = 'bg-red-100 text-red-800 border-red-200';
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
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
            title="Edit"
          >
            <Edit size={16} />
          </button>
          {row.original.status === 'Active' ? (
            <button 
              onClick={() => handleToggleStatus(row.original.id, row.original.status)}
              className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors cursor-pointer"
              title="Suspend"
            >
              <Ban size={16} />
            </button>
          ) : (
            <button 
              onClick={() => handleToggleStatus(row.original.id, row.original.status)}
              className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors cursor-pointer"
              title="Activate"
            >
              <CheckCircle size={16} />
            </button>
          )}
          <button 
            onClick={() => handleDeleteUser(row.original.id)}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors cursor-pointer"
            title="Delete"
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
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and view all registered GFT members.</p>
        </div>
        <button 
          onClick={() => router.push("/register")}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
        >
          <UserPlus size={16} />
          Add New User
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-sm text-gray-500">Loading user profiles...</div>
      ) : (
        <DataTable data={users} columns={columns} />
      )}

      {/* Edit User Modal */}
      {editModalUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 relative border border-gray-100 shadow-xl">
            <button 
              onClick={() => setEditModalUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Edit Profile: {editModalUser.id}</h2>
            <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg p-2.5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Mobile Number</label>
                <input 
                  type="text" 
                  value={editForm.mobile}
                  onChange={(e) => setEditForm(prev => ({ ...prev, mobile: e.target.value }))}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg p-2.5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Designation Rank</label>
                <select 
                  value={editForm.rank}
                  onChange={(e) => setEditForm(prev => ({ ...prev, rank: e.target.value }))}
                  className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg p-2.5 text-sm"
                >
                  <option value="none">None</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                  <option value="emerald">Emerald</option>
                  <option value="platinum">Platinum</option>
                  <option value="diamond">Diamond</option>
                  <option value="ruby">Ruby</option>
                  <option value="chairman">Chairman</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="bg-[#65B300] hover:bg-[#8CD83D] text-white p-3 rounded-lg font-bold text-sm mt-2 transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
