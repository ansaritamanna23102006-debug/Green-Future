'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Files, UploadCloud, Download, FileText, Trash2, ShieldCheck, FileKey, CheckCircle, Clock } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const dummyDocuments = [
  { id: 'DOC-01', name: 'GFT Business Plan 2026', type: 'PDF', category: 'Company Documents', uploadDate: '2026-06-01', status: 'Active' },
  { id: 'DOC-02', name: 'Certificate of Incorporation', type: 'PDF', category: 'Certificates', uploadDate: '2026-05-15', status: 'Active' },
  { id: 'DOC-03', name: 'Terms and Conditions', type: 'DOCX', category: 'Policies', uploadDate: '2026-06-10', status: 'Active' },
  { id: 'DOC-04', name: 'Marketing Presentation', type: 'PPTX', category: 'Marketing', uploadDate: '2026-06-20', status: 'Pending Review' },
];

export default function DocumentsManagement() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Document Name',
      cell: info => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText size={16} />
          </div>
          <span className="font-bold text-gray-800 dark:text-white">{info.getValue()}</span>
        </div>
      )
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => <span className="text-sm px-2.5 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded-full text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#0A4D45]/50">{info.getValue()}</span>
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: info => <span className="font-mono text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded dark:bg-[#062F2D] border border-gray-200 dark:border-gray-700">{info.getValue()}</span>
    },
    {
      accessorKey: 'uploadDate',
      header: 'Upload Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: info => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        let Icon = Clock;
        
        if (status === 'Active') {
          color = 'bg-green-100 text-green-800 border-green-200';
          Icon = CheckCircle;
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
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors tooltip-trigger" title="Download">
            <Download size={16} />
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
            <Files className="text-[#65B300]" />
            Document Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Upload and manage downloadable assets for members.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20"
        >
          <UploadCloud size={16} />
          Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Documents" value="24" icon={Files} delay={0.1} />
        <StatCard title="Company Docs" value="5" icon={ShieldCheck} delay={0.2} />
        <StatCard title="Certificates" value="3" icon={FileKey} delay={0.3} />
        <StatCard title="Total Downloads" value="1,245" icon={Download} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={dummyDocuments} columns={columns} />
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <UploadCloud size={18} className="text-[#65B300]" />
                Upload New Document
              </h3>
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold"
              >✕</button>
            </div>
            
            <div className="p-6">
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Title</label>
                  <input type="text" placeholder="e.g. Legal Disclaimer 2026" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none">
                    <option>Company Documents</option>
                    <option>Certificates</option>
                    <option>Policies</option>
                    <option>Marketing</option>
                    <option>Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#0A4D45] rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0A4D45]/20 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0A4D45]/40 transition-colors">
                    <UploadCloud size={40} className="text-[#65B300] mb-3" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Drag & drop or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, DOCX, PPTX (Max 20MB)</p>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <button type="button" onClick={() => setIsUploadModalOpen(false)} className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors">Cancel</button>
                  <button type="button" onClick={() => setIsUploadModalOpen(false)} className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2">
                    <UploadCloud size={18} /> Upload
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
