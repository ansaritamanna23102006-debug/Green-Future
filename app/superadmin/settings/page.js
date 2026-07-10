'use client';
import { useState } from 'react';
import { Settings, Save, Globe, Mail, CreditCard, Shield, Database, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/context/AppContext';

export default function SettingsManagement() {
  const { cmsContent, updateCMSContent } = useApp();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // General info state
  const [generalForm, setGeneralForm] = useState({
    companyName: 'Green Future Tech',
    email: cmsContent?.contact?.email || 'support@greenfuturetech.com',
    phone: cmsContent?.contact?.phone || '+91 98765 43210',
    address: cmsContent?.contact?.address || 'GFT Headquarters, Eco-Park Tech Centre, Sector 5, Kolkata, West Bengal, India'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Save contact details to cmsContent
      updateCMSContent({
        ...cmsContent,
        contact: {
          email: generalForm.email,
          phone: generalForm.phone,
          address: generalForm.address
        }
      });
      setIsSaving(false);
      alert('Global settings saved successfully!');
    }, 800);
  };

  const tabs = [
    { id: 'general', label: 'General Info', icon: Globe },
    { id: 'payment', label: 'Payment Channels', icon: CreditCard },
  ];

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-120px)] p-6 bg-gray-50 dark:bg-black/5 flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Settings className="text-[#65B300]" />
            Global Site Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Configure support lines and platform variables.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 disabled:opacity-70 cursor-pointer"
        >
          {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save size={16} />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 text-black dark:text-white">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-[#062F2D] rounded-xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden sticky top-24">
            <div className="p-2 flex flex-col gap-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm transition-colors cursor-pointer",
                      isActive 
                        ? "bg-[#65B300]/10 text-[#65B300] dark:bg-[#0A4D45] dark:text-[#8CD83D] font-bold" 
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#0A4D45]/50"
                    )}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="flex-1 bg-white dark:bg-[#062F2D] rounded-xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30">
            <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
              {tabs.find(t => t.id === activeTab)?.label}
            </h3>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            {activeTab === 'general' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                  <input 
                    type="text" 
                    value={generalForm.companyName} 
                    onChange={(e) => setGeneralForm({ ...generalForm, companyName: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Support Email</label>
                    <input 
                      type="email" 
                      value={generalForm.email} 
                      onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Contact Number</label>
                    <input 
                      type="text" 
                      value={generalForm.phone} 
                      onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Office Physical Address</label>
                  <textarea 
                    rows="3" 
                    value={generalForm.address} 
                    onChange={(e) => setGeneralForm({ ...generalForm, address: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none text-xs leading-relaxed"
                  ></textarea>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6 max-w-2xl">
                <div className="bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-xl border border-gray-200 dark:border-[#0A4D45]">
                  <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">Crypto Payment Gateways</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">USDT TRC-20 System Address</label>
                      <input type="text" defaultValue="TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
