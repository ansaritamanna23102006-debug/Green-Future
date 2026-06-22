'use client';
import { Bell, Search, User, Menu } from 'lucide-react';

export default function AdminTopbar() {
  return (
    <header className="h-16 bg-white dark:bg-[#062F2D] border-b border-gray-200 dark:border-[#0A4D45] flex items-center justify-between px-6 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle could go here if needed */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-[#0A4D45]/50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#65B300] dark:text-white w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 dark:text-gray-300 hover:text-[#65B300] dark:hover:text-[#8CD83D] transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-[#0A4D45]/50">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#062F2D]"></span>
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-[#0A4D45]/50 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-[#65B300] to-[#0A4D45] rounded-full flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-medium text-gray-700 dark:text-white leading-tight">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
