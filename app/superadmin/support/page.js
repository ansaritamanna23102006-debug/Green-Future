'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ticketsData } from '@/lib/adminDummyData';
import { LifeBuoy, MessageSquare, CheckCircle, Clock, Send, User } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

export default function SupportManagement() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Ticket ID',
      cell: info => <span className="font-mono text-sm text-[#0A4D45] dark:text-[#8CD83D]">{info.getValue()}</span>
    },
    {
      accessorKey: 'user',
      header: 'User',
      cell: info => <span className="font-medium dark:text-white">{info.getValue()}</span>
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: info => <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-[#0A4D45] rounded text-gray-700 dark:text-gray-300">{info.getValue()}</span>
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
      }
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button 
          onClick={() => setSelectedTicket(row.original)}
          className="px-3 py-1.5 bg-[#65B300] text-white rounded-md hover:bg-[#8CD83D] transition-colors flex items-center gap-1.5 text-xs font-medium"
        >
          <MessageSquare size={14} /> Reply
        </button>
      )
    }
  ], []);

  return (
    <div className="flex flex-col gap-6 relative h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <LifeBuoy className="text-[#65B300]" />
            Support Center
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage member queries and support tickets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Tickets" value="124" icon={LifeBuoy} delay={0.1} />
        <StatCard title="Open Tickets" value="12" icon={MessageSquare} delay={0.2} />
        <StatCard title="In Progress" value="8" icon={Clock} delay={0.3} />
        <StatCard title="Resolved" value="104" icon={CheckCircle} delay={0.4} />
      </div>

      <div className={`transition-all duration-300 flex flex-col lg:flex-row gap-6 ${selectedTicket ? 'h-[600px]' : ''}`}>
        <div className={`bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden transition-all duration-300 ${selectedTicket ? 'w-full lg:w-1/2' : 'w-full'}`}>
          <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30">
            <h3 className="font-bold dark:text-white">Ticket Queue</h3>
          </div>
          <DataTable data={ticketsData} columns={columns} />
        </div>

        {/* Ticket Chat UI */}
        {selectedTicket && (
          <div className="w-full lg:w-1/2 bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm flex flex-col h-full animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/30">
              <div>
                <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                  {selectedTicket.id}
                </h3>
                <p className="text-xs text-gray-500 mt-1">From: {selectedTicket.user} | Category: {selectedTicket.category}</p>
              </div>
              <button 
                onClick={() => setSelectedTicket(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold"
              >✕</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-transparent">
              {/* Dummy Chat Messages */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <User size={16} className="text-blue-600" />
                </div>
                <div>
                  <div className="bg-white dark:bg-[#0A4D45] p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-[#0A4D45] shadow-sm text-sm text-gray-700 dark:text-gray-200">
                    Hello, I am having trouble understanding the new compensation plan regarding the matching bonus. Could you please clarify?
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 ml-1">Yesterday, 10:24 AM</span>
                </div>
              </div>

              <div className="flex gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-[#65B300] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">SA</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-[#65B300]/10 dark:bg-[#65B300]/20 p-3 rounded-2xl rounded-tr-none border border-[#65B300]/20 shadow-sm text-sm text-gray-800 dark:text-gray-200">
                    Hi {selectedTicket.user.split(' ')[0]}, sure! The matching bonus is calculated based on the lesser leg volume...
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 mr-1">Yesterday, 11:05 AM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <User size={16} className="text-blue-600" />
                </div>
                <div>
                  <div className="bg-white dark:bg-[#0A4D45] p-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-[#0A4D45] shadow-sm text-sm text-gray-700 dark:text-gray-200">
                    Got it, thanks! And when does the cutoff happen?
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 ml-1">Today, 09:12 AM</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-[#0A4D45] bg-white dark:bg-[#062F2D]">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your reply here..." 
                  className="flex-1 border border-gray-300 dark:border-[#0A4D45] rounded-full px-4 py-2 text-sm bg-gray-50 dark:bg-[#0A4D45]/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#65B300]"
                />
                <button className="w-10 h-10 rounded-full bg-[#65B300] hover:bg-[#8CD83D] flex items-center justify-center text-white transition-colors shrink-0">
                  <Send size={16} className="ml-1" />
                </button>
              </div>
              <div className="flex justify-between items-center mt-3 px-2">
                <div className="flex gap-2">
                  <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium">Attach File</button>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <button className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium">Insert Template</button>
                </div>
                <button className="text-xs text-green-600 dark:text-[#8CD83D] font-medium flex items-center gap-1 hover:underline">
                  <CheckCircle size={12} /> Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
