'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function SuperAdminLayout({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#041f1e] overflow-hidden">
      <AdminSidebar 
        role="superadmin" 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar onToggleMobileMenu={() => setIsMobileOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-4 md:p-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
