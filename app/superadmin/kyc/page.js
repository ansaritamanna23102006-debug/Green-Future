'use client';
import { useMemo, useState } from 'react';
import { kycData } from '@/lib/adminDummyData';
import DataTable from '@/components/admin/DataTable';
import { FileCheck, FileSearch, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function KYCManagement() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Request ID',
      cell: info => <span className="font-medium text-gray-700 dark:text-gray-300">{info.getValue()}</span>
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: info => <span className="font-medium dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'docType',
      header: 'Document Type',
    },
    {
      accessorKey: 'date',
      header: 'Submitted On',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        let Icon = Clock;
        
        if (status === 'Approved') {
          color = 'bg-green-100 text-green-800 border-green-200';
          Icon = CheckCircle;
        }
        if (status === 'Rejected') {
          color = 'bg-red-100 text-red-800 border-red-200';
          Icon = XCircle;
        }
        
        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit ${color}`}>
            <Icon size={12} />
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
          <button 
            onClick={() => setSelectedDoc(row.original)}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1.5 text-sm font-medium"
          >
            <FileSearch size={14} />
            Review
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
            <FileCheck className="text-[#65B300]" />
            KYC Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Review and process user KYC documents.</p>
        </div>
      </div>

      <DataTable data={kycData} columns={columns} />

      {/* Document Review Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]">
              <h3 className="font-bold text-lg dark:text-white">Review Document: {selectedDoc.docType}</h3>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-[#062F2D]"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-gray-100 dark:bg-[#0A4D45] rounded-xl aspect-[4/3] flex items-center justify-center border border-gray-200 dark:border-[#062F2D] overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium">Preview dummy image</span>
                  </div>
                  <FileSearch size={64} className="text-gray-300 dark:text-gray-600" />
                </div>
                
                <div className="w-full md:w-64 flex flex-col gap-4">
                  <div className="bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-xl border border-gray-100 dark:border-[#0A4D45]">
                    <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider mb-1">User Info</p>
                    <p className="font-bold dark:text-white">{selectedDoc.user}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">ID: {selectedDoc.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Submitted: {selectedDoc.date}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    <button 
                      onClick={() => setSelectedDoc(null)}
                      className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                      <CheckCircle size={18} /> Approve
                    </button>
                    <button 
                      onClick={() => setSelectedDoc(null)}
                      className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                      <XCircle size={18} /> Reject
                    </button>
                    <button 
                      onClick={() => setSelectedDoc(null)}
                      className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                      <Clock size={18} /> Hold
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
