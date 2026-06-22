'use client';
import { useState } from 'react';
import { Settings, Save, Globe, Mail, CreditCard, Shield, Database, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsManagement() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General Info', icon: Globe },
    { id: 'smtp', label: 'Email / SMTP', icon: Mail },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'security', label: 'Security & 2FA', icon: Shield },
    { id: 'system', label: 'System Preferences', icon: Database },
    { id: 'notifications', label: 'Notification Rules', icon: Bell },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Settings className="text-[#65B300]" />
            System Settings
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Configure global platform configurations and rules.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 disabled:opacity-70"
        >
          {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save size={16} />}
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
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
                      "flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm transition-colors",
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                  <input type="text" defaultValue="Green Future Tech" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Support Email</label>
                    <input type="email" defaultValue="support@gft.com" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Number</label>
                    <input type="text" defaultValue="+1 234 567 8900" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Office Address</label>
                  <textarea rows="3" defaultValue="123 Green Ave, Sustainability Block, New York, NY 10001" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2.5 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"></textarea>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-[#0A4D45]">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-[#0A4D45] flex items-center justify-center font-bold text-[#65B300] border border-gray-200 dark:border-[#65B300]/30">GFT</div>
                    <button className="px-4 py-2 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors">Change Logo</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6 max-w-2xl">
                <div className="bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-xl border border-gray-200 dark:border-[#0A4D45]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2"><CreditCard size={18} className="text-blue-500"/> Stripe Integration</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#65B300]"></div>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <input type="text" placeholder="Publishable Key" defaultValue="pk_test_xxxxxxxxxxxxxxxxxxxxxxxx" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-sm" />
                    <input type="password" placeholder="Secret Key" defaultValue="stripe_secret_key_placeholder" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-sm" />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-xl border border-gray-200 dark:border-[#0A4D45]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">Crypto Payment Gateway</h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#65B300]"></div>
                    </label>
                  </div>
                  <div className="space-y-3">
                    <input type="text" placeholder="USDT (TRC20) Wallet Address" defaultValue="Txxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for other tabs */}
            {['smtp', 'security', 'system', 'notifications'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Settings size={48} className="text-gray-300 dark:text-[#0A4D45] mb-4" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Settings for {activeTab}</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-2">These settings are loaded dynamically based on your environment configuration.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
