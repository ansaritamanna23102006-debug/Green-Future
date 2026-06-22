'use client';
import { useState } from 'react';
import { FileText, Download, FileSpreadsheet, FileIcon, ChevronDown, CheckCircle } from 'lucide-react';

export default function ReportsManagement() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const reportTypes = [
    { id: 'user', name: 'User Report', desc: 'Complete list of all registered members with their details.' },
    { id: 'income', name: 'Income Report', desc: 'Detailed breakdown of all distributed incomes and payouts.' },
    { id: 'kyc', name: 'KYC Report', desc: 'Status report of all KYC submissions and their verification state.' },
    { id: 'withdrawal', name: 'Withdrawal Report', desc: 'Records of all processed and pending withdrawal requests.' },
    { id: 'token', name: 'Token Report', desc: 'Analytics and logs of all token distributions.' },
    { id: 'revenue', name: 'Revenue Report', desc: 'Overall company revenue, turnover and package sales data.' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FileText className="text-[#65B300]" />
            Reports & Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Generate and export comprehensive system reports.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden p-6">
        <h3 className="font-bold text-lg dark:text-white border-b border-gray-200 dark:border-[#0A4D45] pb-4 mb-6">Report Generator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Report Type Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Report Type</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#0A4D45]/30 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none transition-colors cursor-pointer">
                {reportTypes.map(rt => (
                  <option key={rt.id} value={rt.id}>{rt.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Select the type of data you wish to export.</p>
          </div>

          {/* Date Range - Start */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
            <input type="date" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#0A4D45]/30 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none transition-colors [color-scheme:light_dark]" />
          </div>

          {/* Date Range - End */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
            <input type="date" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#0A4D45]/30 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none transition-colors [color-scheme:light_dark]" />
          </div>
          
          {/* Status Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Filter (Optional)</label>
            <div className="relative">
              <select className="w-full appearance-none border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#0A4D45]/30 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none transition-colors cursor-pointer">
                <option value="all">All</option>
                <option value="active">Active / Approved</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive / Rejected</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
          
          {/* Format Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Format</label>
            <div className="flex gap-4">
              <label className="flex-1 flex items-center justify-center gap-2 border border-[#65B300] bg-[#65B300]/10 text-[#65B300] rounded-lg py-3 cursor-pointer">
                <input type="radio" name="format" value="pdf" className="hidden" defaultChecked />
                <FileIcon size={18} /> PDF
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45]/50 text-gray-600 dark:text-gray-300 rounded-lg py-3 cursor-pointer transition-colors">
                <input type="radio" name="format" value="excel" className="hidden" />
                <FileSpreadsheet size={18} /> Excel
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45]/50 text-gray-600 dark:text-gray-300 rounded-lg py-3 cursor-pointer transition-colors">
                <input type="radio" name="format" value="csv" className="hidden" />
                <FileText size={18} /> CSV
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#0A4D45] flex items-center gap-4">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#65B300] hover:bg-[#8CD83D] disabled:bg-[#65B300]/50 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-[#65B300]/20 flex items-center gap-2 min-w-[200px] justify-center"
          >
            {isGenerating ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : success ? (
              <><CheckCircle size={18} /> Generated</>
            ) : (
              <><Download size={18} /> Generate Report</>
            )}
          </button>
          {success && <span className="text-sm font-medium text-[#65B300] animate-in fade-in">Report successfully generated and downloaded!</span>}
        </div>
      </div>
      
      {/* Available Reports Overview */}
      <h3 className="font-bold text-gray-800 dark:text-white mt-4">Available Report Types</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((rt) => (
          <div key={rt.id} className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] p-5 rounded-xl hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#0A4D45]/10 dark:bg-[#0A4D45] flex items-center justify-center text-[#65B300]">
                <FileText size={20} />
              </div>
              <h4 className="font-bold text-gray-800 dark:text-white">{rt.name}</h4>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{rt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
