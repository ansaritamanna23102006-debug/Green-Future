'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import GFTLogo from '@/components/GFTLogo';
import { 
  LayoutDashboard, Users, FileCheck, Package, DollarSign, Coins, 
  Network, Award, Gift, ArrowDownToLine, ReceiptText, Tags, 
  Files, Bell, LifeBuoy, Settings, ShieldCheck, ChevronLeft, ChevronRight, Menu, LogOut, X 
} from 'lucide-react';

const superAdminLinks = [
  { href: '/superadmin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/superadmin/users', label: 'Users', icon: Users },
  { href: '/superadmin/kyc', label: 'KYC', icon: FileCheck },
  { href: '/superadmin/packages', label: 'Packages', icon: Package },
  { href: '/superadmin/income', label: 'Income', icon: DollarSign },
  { href: '/superadmin/tokens', label: 'Tokens', icon: Coins },
  { href: '/superadmin/genealogy', label: 'Genealogy', icon: Network },
  { href: '/superadmin/designations', label: 'Designations', icon: Award },
  { href: '/superadmin/rewards', label: 'Rewards', icon: Gift },
  { href: '/superadmin/withdrawals', label: 'Withdrawals', icon: ArrowDownToLine },
  { href: '/superadmin/transactions', label: 'Transactions', icon: ReceiptText },
  { href: '/superadmin/offers', label: 'Offers', icon: Tags },
  { href: '/superadmin/documents', label: 'Documents', icon: Files },
  { href: '/superadmin/announcements', label: 'Announcements', icon: Bell },
  { href: '/superadmin/support', label: 'Support', icon: LifeBuoy },
  { href: '/superadmin/cms', label: 'CMS', icon: LayoutDashboard },
  { href: '/superadmin/admins', label: 'Admins', icon: ShieldCheck },
  { href: '/superadmin/reports', label: 'Reports', icon: ReceiptText },
  { href: '/superadmin/settings', label: 'Settings', icon: Settings },
];

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/kyc', label: 'KYC', icon: FileCheck },
  { href: '/admin/support', label: 'Support', icon: LifeBuoy },
  { href: '/admin/offers', label: 'Offers', icon: Tags },
  { href: '/admin/documents', label: 'Documents', icon: Files },
  { href: '/admin/announcements', label: 'Announcements', icon: Bell },
];

export default function AdminSidebar({ role = 'superadmin', isMobileOpen = false, setIsMobileOpen }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  
  const links = role === 'superadmin' ? superAdminLinks : adminLinks;

  useEffect(() => {
    // Optional entrance animation
    if (sidebarRef.current) {
      gsap.fromTo(sidebarRef.current, 
        { x: -100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  const closeMobileDrawer = () => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const navContent = (isMobile = false) => (
    <>
      <div className="flex items-center justify-between p-3.5 border-b border-[#0A4D45] sticky top-0 bg-[#062F2D] z-10">
        {(!collapsed || isMobile) ? (
          <Link 
            href={role === 'superadmin' ? '/superadmin/dashboard' : '/admin/dashboard'} 
            onClick={closeMobileDrawer}
            className="flex items-center gap-2 overflow-hidden whitespace-nowrap"
          >
            <GFTLogo className="h-9 w-auto shrink-0" showText={true} light={true} />
          </Link>
        ) : (
          <Link href={role === 'superadmin' ? '/superadmin/dashboard' : '/admin/dashboard'} className="w-full flex justify-center">
            <GFTLogo className="h-8 w-auto shrink-0" showText={false} light={true} />
          </Link>
        )}

        {isMobile && (
          <button
            onClick={closeMobileDrawer}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {!isMobile && (
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 bg-[#0A4D45] rounded-full p-1 border border-[#062F2D] hover:bg-[#65B300] transition-colors z-20 cursor-pointer"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      )}

      <div className="flex-1 py-4 flex flex-col gap-1 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={closeMobileDrawer}
              title={(!isMobile && collapsed) ? link.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group relative",
                isActive 
                  ? "bg-[#0A4D45] text-[#8CD83D]" 
                  : "text-gray-300 hover:bg-[#0A4D45]/50 hover:text-white"
              )}
            >
              <Icon size={20} className={cn("min-w-[20px]", isActive ? "text-[#8CD83D]" : "text-gray-400 group-hover:text-white")} />
              
              {(isMobile || !collapsed) && (
                <span className="whitespace-nowrap text-sm font-medium">{link.label}</span>
              )}
              
              {isActive && (isMobile || !collapsed) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#65B300] rounded-r-md"></div>
              )}
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-[#0A4D45] mt-auto flex flex-col gap-4">
        <button 
          onClick={() => window.location.href = '/admin/login'}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group text-gray-300 hover:bg-red-500/10 hover:text-red-400 cursor-pointer",
            (!isMobile && collapsed) ? "justify-center" : ""
          )}
          title="Sign Out"
        >
          <LogOut size={20} className="min-w-[20px]" />
          {(isMobile || !collapsed) && <span className="whitespace-nowrap font-medium text-sm">Sign Out</span>}
        </button>

        <div className={cn("flex items-center gap-3", (!isMobile && collapsed) ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-[#0A4D45] flex items-center justify-center border border-[#65B300] shrink-0">
            <span className="text-xs font-bold text-[#8CD83D]">{role === 'superadmin' ? 'SA' : 'A'}</span>
          </div>
          {(isMobile || !collapsed) && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium whitespace-nowrap text-white">Admin User</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{role}@gft.com</span>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 bg-[#062F2D] border-r border-[#0A4D45] text-white flex flex-col transition-transform duration-300 h-screen overflow-y-auto w-[270px] md:hidden shadow-2xl",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navContent(true)}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <div 
        ref={sidebarRef}
        className={cn(
          "bg-[#062F2D] border-r border-[#0A4D45] text-white flex-col transition-all duration-300 relative z-20 h-screen overflow-y-auto hidden md:flex",
          collapsed ? "w-[80px]" : "w-[260px]"
        )}
      >
        {navContent(false)}
      </div>
    </>
  );
}
