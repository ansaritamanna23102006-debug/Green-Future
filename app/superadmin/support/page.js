'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { LifeBuoy, MessageSquare, Clock, CheckCircle, Send, User, X, Download } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { downloadCSV } from '@/lib/exportUtils';

const initialTickets = [
  { id: 'TCK-501', user: 'Rahul Sharma', subject: 'Payout clarification on Level 2', category: 'Income', status: 'Open', date: '2026-06-21', replies: [
    { sender: 'User', message: 'Hello, I am having trouble understanding the payout on Level 2 direct referrals. Could you please clarify?', time: 'Yesterday, 10:24 AM' }
  ] },
  { id: 'TCK-502', user: 'Amit Singh', subject: 'PAN card document resubmission', category: 'KYC', status: 'In Progress', date: '2026-06-20', replies: [
    { sender: 'User', message: 'I have uploaded a new clear scan of my PAN card. Please review.', time: 'Yesterday, 02:15 PM' },
    { sender: 'Admin', message: 'Thank you Amit, the compliance team is reviewing your re-upload.', time: 'Yesterday, 03:00 PM' }
  ] },
  { id: 'TCK-503', user: 'Priya Patel', subject: 'USDT withdrawal destination inquiry', category: 'Withdrawal', status: 'Closed', date: '2026-06-19', replies: [
    { sender: 'User', message: 'Can I change my TRC20 wallet address for future withdrawals?', time: 'June 19, 09:00 AM' },
    { sender: 'Admin', message: 'Yes, please update it under Profile -> USDT Wallet before requesting your payout.', time: 'June 19, 09:30 AM' }
  ] },
];

export default function SupportManagement() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);

  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Member', 'Subject', 'Category', 'Status', 'Date Submitted'];
    const rows = tickets.map((t) => [t.id, t.user, t.subject, t.category, t.status, t.date]);
    downloadCSV(`GFT_Support_Tickets_${new Date().toISOString().split('T')[0]}`, headers, rows);
    setStatusMessage('Support tickets exported to CSV.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;

    const newReply = {
      sender: 'Admin',
      message: replyText.trim(),
      time: 'Just now',
    };

    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === selectedTicket.id) {
          const updated = {
            ...t,
            status: 'In Progress',
            replies: [...(t.replies || []), newReply],
          };
          setSelectedTicket(updated);
          return updated;
        }
        return t;
      })
    );

    setReplyText('');
    setStatusMessage('Support reply sent successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleToggleResolve = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const nextStatus = t.status === 'Closed' ? 'In Progress' : 'Closed';
          const updated = { ...t, status: nextStatus };
          if (selectedTicket && selectedTicket.id === ticketId) {
            setSelectedTicket(updated);
          }
          setStatusMessage(`Ticket ${ticketId} marked as ${nextStatus}.`);
          setTimeout(() => setStatusMessage(null), 3000);
          return updated;
        }
        return t;
      })
    );
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Ticket ID',
      cell: (info) => <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{info.getValue()}</span>,
    },
    {
      accessorKey: 'user',
      header: 'Member',
      cell: (info) => <span className="font-medium dark:text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
      cell: (info) => <span className="font-bold text-gray-800 dark:text-white">{info.getValue()}</span>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: (info) => (
        <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded border border-gray-200 dark:border-[#0A4D45]/50 text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        let color = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        let Icon = Clock;

        if (status === 'Open') {
          color = 'bg-red-100 text-red-800 border-red-200';
          Icon = MessageSquare;
        } else if (status === 'Closed') {
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
        <button
          onClick={() => setSelectedTicket(row.original)}
          className="px-3 py-1.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-md transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
        >
          <MessageSquare size={14} /> Open Thread
        </button>
      ),
    },
  ], []);

  const openTicketsCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Closed').length;

  return (
    <div className="flex flex-col gap-6 relative h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <LifeBuoy className="text-[#65B300]" />
            Support Center
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage member inquiries, send responses, and resolve compliance tickets.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] hover:bg-gray-50 dark:hover:bg-[#0A4D45] text-gray-700 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Download size={16} /> Export Tickets CSV
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tickets" value={tickets.length.toString()} icon={LifeBuoy} delay={0.1} />
        <StatCard title="Open Queries" value={openTicketsCount.toString()} icon={MessageSquare} delay={0.2} />
        <StatCard title="In Progress" value={inProgressCount.toString()} icon={Clock} delay={0.3} />
        <StatCard title="Resolved Tickets" value={resolvedCount.toString()} icon={CheckCircle} delay={0.4} />
      </div>

      <div className={`transition-all duration-300 flex flex-col lg:flex-row gap-6 ${selectedTicket ? 'min-h-[550px]' : ''}`}>
        <div
          className={`bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden transition-all duration-300 ${
            selectedTicket ? 'w-full lg:w-1/2' : 'w-full'
          }`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30 flex justify-between items-center">
            <h3 className="font-bold dark:text-white">Ticket Queue ({tickets.length})</h3>
            <span className="text-xs text-gray-500">Live Member Requests</span>
          </div>
          <DataTable data={tickets} columns={columns} />
        </div>

        {/* Ticket Chat UI */}
        {selectedTicket && (
          <div className="w-full lg:w-1/2 bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/30">
              <div>
                <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                  {selectedTicket.id}: {selectedTicket.subject}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Member: <strong className="text-gray-700 dark:text-gray-300">{selectedTicket.user}</strong> | Category: {selectedTicket.category} | Status:{' '}
                  <span className="font-semibold text-[#65B300]">{selectedTicket.status}</span>
                </p>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-transparent min-h-[300px]">
              {(selectedTicket.replies || []).map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.sender === 'Admin' ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === 'Admin' ? 'bg-[#65B300] text-white font-bold text-xs' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {msg.sender === 'Admin' ? 'SA' : <User size={16} />}
                  </div>
                  <div className={`flex flex-col ${msg.sender === 'Admin' ? 'items-end' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'Admin'
                          ? 'bg-[#65B300]/15 dark:bg-[#65B300]/25 rounded-tr-none border border-[#65B300]/20 text-gray-800 dark:text-gray-100'
                          : 'bg-white dark:bg-[#0A4D45] rounded-tl-none border border-gray-100 dark:border-[#0A4D45] text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {msg.message}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendReply} className="p-4 border-t border-gray-200 dark:border-[#0A4D45] bg-white dark:bg-[#062F2D]">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your official administrative reply..."
                  className="flex-1 border border-gray-300 dark:border-[#0A4D45] rounded-full px-4 py-2 text-sm bg-gray-50 dark:bg-[#0A4D45]/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#65B300]"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-[#65B300] hover:bg-[#8CD83D] flex items-center justify-center text-white transition-colors shrink-0 cursor-pointer shadow-sm"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </div>

              <div className="flex justify-between items-center mt-3 px-2">
                <span className="text-xs text-gray-400">Press Enter or click send to reply</span>
                <button
                  type="button"
                  onClick={() => handleToggleResolve(selectedTicket.id)}
                  className="text-xs text-green-600 dark:text-[#8CD83D] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <CheckCircle size={14} />
                  {selectedTicket.status === 'Closed' ? 'Reopen Ticket' : 'Mark as Resolved'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
