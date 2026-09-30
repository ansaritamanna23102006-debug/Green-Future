'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Files, UploadCloud, Download, FileText, Trash2, ShieldCheck, FileKey, CheckCircle, Clock, X } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadTextReport } from '@/lib/exportUtils';

const initialDocuments = [
  { id: 'DOC-01', name: 'GFT Business Plan 2026', type: 'PDF', category: 'Company Documents', uploadDate: '2026-06-01', status: 'Active' },
  { id: 'DOC-02', name: 'Certificate of Incorporation', type: 'PDF', category: 'Certificates', uploadDate: '2026-05-15', status: 'Active' },
  { id: 'DOC-03', name: 'Terms and Conditions', type: 'DOCX', category: 'Policies', uploadDate: '2026-06-10', status: 'Active' },
  { id: 'DOC-04', name: 'Marketing Presentation', type: 'PPTX', category: 'Marketing', uploadDate: '2026-06-20', status: 'Pending Review' },
];

export default function DocumentsManagement() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Company Documents');
  const [newType, setNewType] = useState('PDF');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleDownload = (doc) => {
    downloadTextReport(`GFT_${doc.id}_${doc.name.replace(/\s+/g, '_')}`, doc.name, [
      {
        title: 'Document Metadata',
        data: {
          'Document ID': doc.id,
          'Name': doc.name,
          'Category': doc.category,
          'File Format': doc.type,
          'Upload Date': doc.uploadDate,
          'Status': doc.status,
          'Security Hash': 'SHA256-GFT-VERIFIED-CORP-DOC',
        },
      },
      {
        title: 'Document Contents',
        data: [
          'Official Green Future Tech verified legal corporate document.',
          'Authorized for digital compliance and member distribution under MLM bylaws.',
          'Double-entry compliance checksum: VALID.',
        ],
      },
    ]);
    setStatusMessage(`Document ${doc.name} downloaded successfully.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleDelete = (docId, docName) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${docName}"?`)) return;
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
    setStatusMessage(`Document "${docName}" deleted.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('Please enter a document title');
      return;
    }

    const newDoc = {
      id: `DOC-0${documents.length + 1}`,
      name: newTitle.trim(),
      type: newType,
      category: newCategory,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setIsUploadModalOpen(false);
    setNewTitle('');
    setStatusMessage(`Document "${newDoc.name}" uploaded successfully.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Document Name',
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText size={16} />
          </div>
          <span className="font-bold text-gray-800 dark:text-white">{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: (info) => (
        <span className="text-sm px-2.5 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded-full text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#0A4D45]/50">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (info) => (
        <span className="font-mono text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded dark:bg-[#062F2D] border border-gray-200 dark:border-gray-700">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'uploadDate',
      header: 'Upload Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
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
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDownload(row.original)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors cursor-pointer"
            title="Download Document"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id, row.original.name)}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors cursor-pointer"
            title="Delete Document"
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
            <Files className="text-[#65B300]" />
            Document Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Upload, download, and manage downloadable corporate assets for members.
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 cursor-pointer"
        >
          <UploadCloud size={16} />
          Upload Document
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in">
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Documents" value={documents.length.toString()} icon={Files} delay={0.1} />
        <StatCard title="Company Docs" value={documents.filter((d) => d.category === 'Company Documents').length.toString()} icon={ShieldCheck} delay={0.2} />
        <StatCard title="Certificates" value={documents.filter((d) => d.category === 'Certificates').length.toString()} icon={FileKey} delay={0.3} />
        <StatCard title="Active Files" value={documents.filter((d) => d.status === 'Active').length.toString()} icon={CheckCircle} delay={0.4} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={documents} columns={columns} />
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
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleUploadSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Document Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Legal Disclaimer 2026"
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                    >
                      <option>Company Documents</option>
                      <option>Certificates</option>
                      <option>Policies</option>
                      <option>Marketing</option>
                      <option>Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">File Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value)}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOCX">DOCX</option>
                      <option value="PPTX">PPTX</option>
                      <option value="XLSX">XLSX</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attachment</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#0A4D45] rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0A4D45]/20 hover:bg-gray-100 dark:hover:bg-[#0A4D45]/40 transition-colors">
                    <UploadCloud size={32} className="text-[#65B300] mb-2" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">File ready for registration</p>
                    <p className="text-xs text-gray-400 mt-0.5">Will be saved to documents library</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="flex-1 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors flex justify-center items-center gap-2 cursor-pointer shadow-md"
                  >
                    <UploadCloud size={18} /> Confirm Upload
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
