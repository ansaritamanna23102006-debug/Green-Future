'use client';
import { useMemo, useState } from 'react';
import { packagesData } from '@/lib/adminDummyData';
import DataTable from '@/components/admin/DataTable';
import { Package, Plus, Edit2, Trash2, ShieldCheck, Zap } from 'lucide-react';
import gsap from 'gsap';

export default function PackagesManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Package Name',
      cell: info => <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D] flex items-center gap-2"><Zap size={16} className="text-[#65B300]"/>{info.getValue()}</span>
    },
    {
      accessorKey: 'amount',
      header: 'Amount ($)',
      cell: info => <span className="font-medium">${info.getValue()}</span>
    },
    {
      accessorKey: 'percentage',
      header: 'ROI Percentage',
      cell: info => <span className="font-medium text-gray-600 dark:text-gray-300">{info.getValue()}%</span>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => (
        <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-green-100 text-green-800 border-green-200">
          {info.getValue()}
        </span>
      )
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200 transition-colors tooltip-trigger" title="Edit Package">
            <Edit2 size={16} />
          </button>
          <button className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors" title="Delete Package">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ], []);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      gsap.fromTo('.modal-content', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }, 10);
  };

  const closeModal = () => {
    gsap.to('.modal-content', { 
      y: 50, opacity: 0, duration: 0.3, ease: 'power2.in',
      onComplete: () => setIsModalOpen(false) 
    });
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Package className="text-[#65B300]" />
            Package Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create, edit, and manage GFT investment packages.</p>
        </div>
        <button 
          onClick={openModal}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20"
        >
          <Plus size={16} />
          Create New Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
        {packagesData.map((pkg, i) => (
          <div key={pkg.id} className="bg-gradient-to-br from-white to-gray-50 dark:from-[#062F2D] dark:to-[#0A4D45] p-5 rounded-xl border border-gray-100 dark:border-[#0A4D45] shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#65B300]/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#65B300]" />
                {pkg.name}
              </h3>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wide">
                Active
              </span>
            </div>
            
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-black text-gray-800 dark:text-white">${pkg.amount}</span>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-[#0A4D45]/50">
              <span className="text-sm text-gray-500 dark:text-gray-400">Monthly ROI</span>
              <span className="font-bold text-[#65B300]">{pkg.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30">
          <h3 className="font-bold dark:text-white">All Packages List</h3>
        </div>
        <DataTable data={packagesData} columns={columns} searchable={false} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="modal-content bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white">Create New Package</h3>
              <button 
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-[#062F2D]"
              >
                <Trash2 size={20} className="opacity-0" /> {/* Spacer */}
                <span className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer" onClick={closeModal}>✕</span>
              </button>
            </div>
            
            <div className="p-6">
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Package Name</label>
                  <input type="text" placeholder="e.g. GFT-9" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount ($)</label>
                  <input type="number" placeholder="50000" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ROI Percentage (%)</label>
                  <input type="number" placeholder="18" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors">Cancel</button>
                  <button type="button" onClick={closeModal} className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors">Create Package</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
