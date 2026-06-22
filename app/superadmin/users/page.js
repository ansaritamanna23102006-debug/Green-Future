'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { usersData } from '@/lib/adminDummyData';
import DataTable from '@/components/admin/DataTable';
import { UserPlus, Eye, Edit, Trash2, Ban, CheckCircle } from 'lucide-react';

export default function UsersManagement() {
  const router = useRouter();

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
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors tooltip-trigger"
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <button className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200 transition-colors" title="Edit">
            <Edit size={16} />
          </button>
          {row.original.status === 'Active' ? (
            <button className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors" title="Suspend">
              <Ban size={16} />
            </button>
          ) : (
            <button className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors" title="Activate">
              <CheckCircle size={16} />
            </button>
          )}
          <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors" title="Delete">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ], [router]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and view all registered members.</p>
        </div>
        <button className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <UserPlus size={16} />
          Add New User
        </button>
      </div>

      <DataTable data={usersData} columns={columns} />
    </div>
  );
}
