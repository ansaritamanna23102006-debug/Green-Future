'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { 
  LayoutDashboard, Users, FileCheck, Package, DollarSign, Coins, 
  Network, Award, Gift, ArrowDownToLine, ReceiptText, Tags, 
  Files, Bell, LifeBuoy, Settings, ShieldCheck, ChevronLeft, ChevronRight, Menu, LogOut 
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

export default function AdminSidebar({ role = 'superadmin' }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);
  
  const links = role === 'superadmin' ? superAdminLinks : adminLinks;

  useEffect(() => {
    // Optional entrance animation
    gsap.fromTo(sidebarRef.current, 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  return (
    <div 
      ref={sidebarRef}
      className={cn(
        "bg-[#062F2D] border-r border-[#0A4D45] text-white flex flex-col transition-all duration-300 relative z-20 h-screen overflow-y-auto hidden md:flex",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-[#0A4D45] sticky top-0 bg-[#062F2D] z-10">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 rounded-full bg-[#65B300] flex items-center justify-center font-bold">G</div>
            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-[#8CD83D] to-[#65B300] bg-clip-text text-transparent">
              GFT {role === 'superadmin' ? 'Super Admin' : 'Admin'}
            </span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded-full bg-[#65B300] flex items-center justify-center font-bold">G</div>
          </div>
        )}
      </div>

      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 bg-[#0A4D45] rounded-full p-1 border border-[#062F2D] hover:bg-[#65B300] transition-colors z-20"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="flex-1 py-4 flex flex-col gap-1 px-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);
          
          return (
            <Link 
              key={link.href} 
              href={link.href}
              title={collapsed ? link.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group relative",
                isActive 
                  ? "bg-[#0A4D45] text-[#8CD83D]" 
                  : "text-gray-300 hover:bg-[#0A4D45]/50 hover:text-white"
              )}
            >
              <Icon size={20} className={cn("min-w-[20px]", isActive ? "text-[#8CD83D]" : "text-gray-400 group-hover:text-white")} />
              
              {!collapsed && (
                <span className="whitespace-nowrap">{link.label}</span>
              )}
              
              {isActive && !collapsed && (
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
            "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all group text-gray-300 hover:bg-red-500/10 hover:text-red-400",
            collapsed ? "justify-center" : ""
          )}
          title="Sign Out"
        >
          <LogOut size={20} className="min-w-[20px]" />
          {!collapsed && <span className="whitespace-nowrap font-medium">Sign Out</span>}
        </button>

        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-[#0A4D45] flex items-center justify-center border border-[#65B300] shrink-0">
            <span className="text-xs font-bold text-[#8CD83D]">{role === 'superadmin' ? 'SA' : 'A'}</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium whitespace-nowrap text-white">Admin User</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{role}@gft.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
