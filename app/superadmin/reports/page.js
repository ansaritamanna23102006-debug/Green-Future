'use client';
import { useState } from 'react';
import { FileText, Download, FileSpreadsheet, FileIcon, ChevronDown, CheckCircle } from 'lucide-react';
import { downloadCSV, downloadTextReport } from '@/lib/exportUtils';

export default function ReportsManagement() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedType, setSelectedType] = useState('user');
  const [format, setFormat] = useState('csv');
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-06-30');

  const reportTypes = [
    { id: 'user', name: 'User Report', desc: 'Complete list of all registered members with their details and rank status.' },
    { id: 'income', name: 'Income Report', desc: 'Detailed breakdown of all distributed incomes and payouts.' },
    { id: 'kyc', name: 'KYC Report', desc: 'Status report of all KYC submissions and their verification state.' },
    { id: 'withdrawal', name: 'Withdrawal Report', desc: 'Records of all processed and pending withdrawal requests.' },
    { id: 'token', name: 'Token Report', desc: 'Analytics and logs of all token distributions and reserves.' },
    { id: 'revenue', name: 'Revenue Report', desc: 'Overall company revenue, turnover, and package sales data.' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setSuccess(false);

    setTimeout(() => {
      const timestamp = new Date().toISOString().split('T')[0];

      if (selectedType === 'user') {
        const headers = ['User ID', 'Name', 'Email', 'Role', 'Status', 'Sponsor ID', 'Join Date'];
        const data = [
          ['GFT000001', 'GFT Super Admin', 'superadmin@greenfuturetech.com', 'superadmin', 'Active', 'none', '2026-01-01'],
          ['GFT100001', 'Rahul Sharma', 'rahul@example.com', 'user', 'Active', 'GFT000001', '2026-06-01'],
          ['GFT100002', 'Priya Patel', 'priya@example.com', 'user', 'Active', 'GFT100001', '2026-06-05'],
          ['GFT100003', 'Amit Singh', 'amit@example.com', 'user', 'Suspended', 'GFT100001', '2026-06-10'],
        ];
        if (format === 'pdf') {
          downloadTextReport(`GFT_User_Report_${timestamp}`, 'User Registry Statement', [
            { title: 'Parameters', data: { 'From': startDate, 'To': endDate, 'Total Users': data.length } },
            { title: 'Member Records', data: data.map((d) => d.join(' | ')) },
          ]);
        } else {
          downloadCSV(`GFT_User_Report_${timestamp}`, headers, data);
        }
      } else if (selectedType === 'income') {
        const headers = ['TXN ID', 'User', 'Income Type', 'Amount (USD)', 'Status', 'Date'];
        const data = [
          ['INC-1001', 'Rahul Sharma', 'Direct Income', '50.00', 'Credited', '2026-06-20'],
          ['INC-1002', 'Priya Patel', 'Level Income', '25.00', 'Credited', '2026-06-20'],
          ['INC-1003', 'Rahul Sharma', 'Bonus Income', '100.00', 'Credited', '2026-06-19'],
        ];
        if (format === 'pdf') {
          downloadTextReport(`GFT_Income_Report_${timestamp}`, 'Income Payout Statement', [
            { title: 'Parameters', data: { 'From': startDate, 'To': endDate } },
            { title: 'Payout Logs', data: data.map((d) => d.join(' | ')) },
          ]);
        } else {
          downloadCSV(`GFT_Income_Report_${timestamp}`, headers, data);
        }
      } else if (selectedType === 'withdrawal') {
        const headers = ['Withdrawal ID', 'User ID', 'Amount', 'Currency', 'Method', 'Status', 'Requested At'];
        const data = [
          ['WTH-8801', 'GFT100001', '250.00', 'USDT', 'TRC20', 'APPROVED', '2026-06-21'],
          ['WTH-8802', 'GFT100002', '120.00', 'INR', 'Bank Transfer', 'UNDER_REVIEW', '2026-06-22'],
          ['WTH-8803', 'GFT100003', '500.00', 'USDT', 'BEP20', 'REQUESTED', '2026-06-23'],
        ];
        if (format === 'pdf') {
          downloadTextReport(`GFT_Withdrawal_Report_${timestamp}`, 'Withdrawals Audit Statement', [
            { title: 'Summary', data: { 'Total Processed': '$870.00', 'Gate': 'Phase 8 State Machine' } },
            { title: 'Records', data: data.map((d) => d.join(' | ')) },
          ]);
        } else {
          downloadCSV(`GFT_Withdrawal_Report_${timestamp}`, headers, data);
        }
      } else {
        // Default / Revenue / KYC / Token
        const headers = ['Item ID', 'Category', 'Volume / Value', 'Status', 'Timestamp'];
        const data = [
          ['REV-01', 'Package Purchases', '$1,250,000.00', 'Verified', timestamp],
          ['REV-02', 'Network Turnover Matching', '$450,000.00', 'Calculated', timestamp],
          ['REV-03', 'Reserve Token Backing', '5,000,000 GFT', 'Locked', timestamp],
        ];
        downloadCSV(`GFT_${selectedType.toUpperCase()}_Report_${timestamp}`, headers, data);
      }

      setIsGenerating(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <FileText className="text-[#65B300]" />
            Reports & Analytics
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Generate and export comprehensive double-entry audited system reports.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden p-6">
        <h3 className="font-bold text-lg dark:text-white border-b border-gray-200 dark:border-[#0A4D45] pb-4 mb-6">
          Report Generator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Report Type Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Report Type</label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#0A4D45]/30 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none transition-colors cursor-pointer"
              >
                {reportTypes.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    {rt.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Select the type of data you wish to export.</p>
          </div>

          {/* Date Range - Start */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#0A4D45]/30 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none transition-colors"
            />
          </div>

          {/* Date Range - End */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-gray-50 dark:bg-[#0A4D45]/30 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none transition-colors"
            />
          </div>

          {/* Format Selection */}
          <div className="flex flex-col gap-2 lg:col-span-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Format</label>
            <div className="flex gap-4 max-w-md">
              <label
                className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-3 cursor-pointer transition-colors ${
                  format === 'csv'
                    ? 'border-[#65B300] bg-[#65B300]/10 text-[#65B300] font-bold'
                    : 'border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45]/50 text-gray-600 dark:text-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  className="hidden"
                  checked={format === 'csv'}
                  onChange={() => setFormat('csv')}
                />
                <FileText size={18} /> CSV
              </label>

              <label
                className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-3 cursor-pointer transition-colors ${
                  format === 'excel'
                    ? 'border-[#65B300] bg-[#65B300]/10 text-[#65B300] font-bold'
                    : 'border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45]/50 text-gray-600 dark:text-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  value="excel"
                  className="hidden"
                  checked={format === 'excel'}
                  onChange={() => setFormat('excel')}
                />
                <FileSpreadsheet size={18} /> Excel
              </label>

              <label
                className={`flex-1 flex items-center justify-center gap-2 border rounded-lg py-3 cursor-pointer transition-colors ${
                  format === 'pdf'
                    ? 'border-[#65B300] bg-[#65B300]/10 text-[#65B300] font-bold'
                    : 'border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45]/50 text-gray-600 dark:text-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="format"
                  value="pdf"
                  className="hidden"
                  checked={format === 'pdf'}
                  onChange={() => setFormat('pdf')}
                />
                <FileIcon size={18} /> PDF / Text
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#0A4D45] flex items-center gap-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-[#65B300] hover:bg-[#8CD83D] disabled:bg-[#65B300]/50 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-[#65B300]/20 flex items-center gap-2 min-w-[200px] justify-center cursor-pointer"
          >
            {isGenerating ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : success ? (
              <>
                <CheckCircle size={18} /> Downloaded!
              </>
            ) : (
              <>
                <Download size={18} /> Generate & Download
              </>
            )}
          </button>
          {success && (
            <span className="text-sm font-medium text-[#65B300] animate-in fade-in flex items-center gap-1.5">
              <CheckCircle size={16} />
              Report successfully generated and downloaded to your device!
            </span>
          )}
        </div>
      </div>

      {/* Available Reports Overview */}
      <h3 className="font-bold text-gray-800 dark:text-white mt-4">Available Report Types</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((rt) => (
          <div
            key={rt.id}
            onClick={() => setSelectedType(rt.id)}
            className={`border p-5 rounded-xl transition-all cursor-pointer ${
              selectedType === rt.id
                ? 'bg-[#65B300]/10 border-[#65B300]'
                : 'bg-white dark:bg-[#062F2D] border-gray-200 dark:border-[#0A4D45] hover:shadow-md'
            }`}
          >
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
