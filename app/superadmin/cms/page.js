'use client';
import { useState } from 'react';
import { LayoutDashboard, Save, Type, Image as ImageIcon, Link as LinkIcon, MonitorPlay, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CMSManagement() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: MonitorPlay },
    { id: 'about', label: 'About Us', icon: Type },
    { id: 'packages', label: 'Packages List', icon: LayoutDashboard },
    { id: 'income', label: 'Income Plans', icon: LayoutDashboard },
    { id: 'offers', label: 'Offers & Promos', icon: ImageIcon },
    { id: 'footer', label: 'Footer Links', icon: LinkIcon },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Optional: Show success toast here
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-120px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <LayoutDashboard className="text-[#65B300]" />
            Content Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage public website content directly from here.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 disabled:opacity-70"
        >
          {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save size={16} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-[#062F2D] rounded-xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30">
              <h3 className="font-bold dark:text-white">Website Sections</h3>
            </div>
            <div className="p-2 flex flex-col gap-1">
              {sections.map(section => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors",
                      isActive 
                        ? "bg-[#65B300]/10 text-[#65B300] dark:bg-[#0A4D45] dark:text-[#8CD83D] font-bold" 
                        : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-[#0A4D45]/50"
                    )}
                  >
                    <Icon size={16} />
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex-1 bg-white dark:bg-[#062F2D] rounded-xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30 flex justify-between items-center">
            <h3 className="font-bold dark:text-white flex items-center gap-2">
              <Type size={18} className="text-[#65B300]" />
              Editing: {sections.find(s => s.id === activeSection)?.label}
            </h3>
            <span className="text-xs text-green-600 dark:text-[#8CD83D] flex items-center gap-1 font-medium bg-green-50 dark:bg-[#0A4D45] px-2 py-1 rounded-md">
              <CheckCircle size={12} /> All changes saved
            </span>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Hero Title</label>
                  <input type="text" defaultValue="Empowering Your Green Future" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-lg font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Hero Subtitle</label>
                  <textarea rows="3" defaultValue="Join the revolution of sustainable investments and grow your wealth with our transparent ecosystem." className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Primary Button Text</label>
                    <input type="text" defaultValue="Get Started Now" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Primary Button Link</label>
                    <input type="text" defaultValue="/register" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none" />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'about' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Section Heading</label>
                  <input type="text" defaultValue="About Green Future Tech" className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-lg font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Main Content (HTML Supported)</label>
                  <div className="border border-gray-300 dark:border-[#0A4D45] rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-[#0A4D45]/50 border-b border-gray-300 dark:border-[#0A4D45] p-2 flex gap-2">
                      <button className="px-2 py-1 text-sm bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded font-bold">B</button>
                      <button className="px-2 py-1 text-sm bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded italic">I</button>
                      <button className="px-2 py-1 text-sm bg-white dark:bg-[#062F2D] border border-gray-200 dark:border-[#0A4D45] rounded underline">U</button>
                    </div>
                    <textarea rows="8" defaultValue="Green Future Tech is dedicated to building sustainable investment platforms for everyone." className="w-full px-4 py-3 bg-white dark:bg-[#0A4D45]/20 dark:text-white focus:outline-none resize-none"></textarea>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Featured Image</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-[#0A4D45] rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0A4D45]/20 cursor-pointer">
                    <ImageIcon size={32} className="text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Change Image</p>
                  </div>
                </div>
              </div>
            )}

            {/* Fallback for other tabs */}
            {['packages', 'income', 'offers', 'footer'].includes(activeSection) && (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <LayoutDashboard size={48} className="text-gray-300 dark:text-[#0A4D45] mb-4" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Editing options for {activeSection}</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-2">The editor fields for this section are loaded dynamically based on the schema.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
