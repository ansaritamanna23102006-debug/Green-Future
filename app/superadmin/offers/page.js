'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Tags, Plus, Image as ImageIcon, Edit2, Trash2, Globe, EyeOff } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const dummyOffers = [
  { id: 'OFF-01', title: 'Summer Bonanza', startDate: '2026-06-01', endDate: '2026-06-30', status: 'Published' },
  { id: 'OFF-02', title: 'Direct Sponsor 2x', startDate: '2026-06-15', endDate: '2026-06-25', status: 'Draft' },
  { id: 'OFF-03', title: 'New Year Special', startDate: '2026-01-01', endDate: '2026-01-31', status: 'Expired' },
];

export default function OffersManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Offer Title',
      cell: info => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 dark:bg-[#0A4D45] rounded border border-gray-200 dark:border-[#0A4D45]/50 flex items-center justify-center text-gray-400">
            <ImageIcon size={18} />
          </div>
          <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D]">{info.getValue()}</span>
        </div>
      )
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        let color = 'bg-gray-100 text-gray-800';
        if (status === 'Published') color = 'bg-green-100 text-green-800';
        if (status === 'Draft') color = 'bg-yellow-100 text-yellow-800';
        
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
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === 'Published' ? (
            <button className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors tooltip-trigger" title="Unpublish">
              <EyeOff size={16} />
            </button>
          ) : (
            <button className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors tooltip-trigger" title="Publish">
              <Globe size={16} />
            </button>
          )}
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
            <Tags className="text-[#65B300]" />
            Offer Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create and manage promotional offers and banners.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20"
        >
          <Plus size={16} />
          Create Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Offers" value="12" icon={Tags} delay={0.1} />
        <StatCard title="Active Offers" value="1" icon={Globe} delay={0.2} />
        <StatCard title="Drafts" value="1" icon={Edit2} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={dummyOffers} columns={columns} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <Tags size={18} className="text-[#65B300]" />
                Create Promotional Offer
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold"
              >✕</button>
            </div>
            
            <div className="p-6">
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Offer Title</label>
                  <input type="text" placeholder="e.g. Diwali Special" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                    <input type="date" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none [color-scheme:light_dark]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                    <input type="date" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none [color-scheme:light_dark]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Offer Banner</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#0A4D45] rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0A4D45]/20 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0A4D45]/40 transition-colors">
                    <ImageIcon size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Click to upload image</p>
                    <p className="text-xs text-gray-400 mt-1">Recommended size: 1200x400px (JPG, PNG)</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea placeholder="Describe the offer details and terms..." rows="3" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"></textarea>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors">Save as Draft</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors">Publish Offer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
