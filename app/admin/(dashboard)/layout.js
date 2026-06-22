import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#041f1e] overflow-hidden">
      <AdminSidebar role="admin" />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminTopbar />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
