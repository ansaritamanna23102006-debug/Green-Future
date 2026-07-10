'use client';
import { useState } from 'react';
import { LayoutDashboard, Save, Type, Image as ImageIcon, Link as LinkIcon, MonitorPlay, CheckCircle, Plus, Trash2, ShieldAlert, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/lib/context/AppContext';

export default function CMSManagement() {
  const { 
    cmsContent, updateCMSContent, 
    studentPackages, updateStudentPackages,
    personalPackages, updatePersonalPackages,
    businessPackages, updateBusinessPackages,
    ranks, updateRanks
  } = useApp();

  const [activeSection, setActiveSection] = useState('hero');
  const [isSaving, setIsSaving] = useState(false);

  // Form states initialized from context
  const [heroForm, setHeroForm] = useState({
    title: cmsContent?.hero?.title || '',
    subtitle: cmsContent?.hero?.subtitle || '',
    primaryBtn: cmsContent?.hero?.primaryBtn || '',
    primaryBtnLink: cmsContent?.hero?.primaryBtnLink || '',
    secondaryBtn: cmsContent?.hero?.secondaryBtn || '',
    secondaryBtnLink: cmsContent?.hero?.secondaryBtnLink || ''
  });

  const [aboutForm, setAboutForm] = useState({
    heading: cmsContent?.about?.heading || '',
    description: cmsContent?.about?.description || '',
    vision: cmsContent?.about?.vision || '',
    mission: cmsContent?.about?.mission || ''
  });

  const [popupForm, setPopupForm] = useState({
    title: cmsContent?.popup?.title || '',
    message: cmsContent?.popup?.message || ''
  });

  // Package lists
  const [studentPkgs, setStudentPkgs] = useState(studentPackages);
  const [personalPkgs, setPersonalPkgs] = useState(personalPackages);
  const [businessPkgs, setBusinessPkgs] = useState(businessPackages);

  // Ranks
  const [rankList, setRankList] = useState(ranks);

  // Posters (Promotional Images)
  const [posters, setPosters] = useState(cmsContent?.posters || []);
  const [newPoster, setNewPoster] = useState({ title: '', image: '', category: 'Offers' });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // Save Hero & About & Popup & Posters to general CMS Content
      updateCMSContent({
        ...cmsContent,
        hero: heroForm,
        about: aboutForm,
        popup: popupForm,
        posters: posters
      });

      // Save Packages
      updateStudentPackages(studentPkgs);
      updatePersonalPackages(personalPkgs);
      updateBusinessPackages(businessPkgs);

      // Save Ranks
      updateRanks(rankList);

      setIsSaving(false);
      alert('CMS Changes Saved Successfully!');
    }, 800);
  };

  const handlePackageChange = (category, index, key, value) => {
    let numVal = value;
    if (key === 'amount' || key === 'roi' || key === 'tokens') {
      numVal = Number(value);
    }
    
    if (category === 'student') {
      const updated = [...studentPkgs];
      updated[index][key] = numVal;
      if (key === 'amount' || key === 'roi') {
        // Recalculate monthly Return: amount * (roi/100)
        updated[index].monthlyReturn = Math.round(updated[index].amount * (updated[index].roi / 100));
      }
      setStudentPkgs(updated);
    } else if (category === 'personal') {
      const updated = [...personalPkgs];
      updated[index][key] = numVal;
      if (key === 'amount' || key === 'roi') {
        updated[index].monthlyReturn = Math.round(updated[index].amount * (updated[index].roi / 100));
      }
      setPersonalPkgs(updated);
    } else {
      const updated = [...businessPkgs];
      updated[index][key] = numVal;
      if (key === 'amount' || key === 'roi') {
        updated[index].monthlyReturn = Math.round(updated[index].amount * (updated[index].roi / 100));
      }
      setBusinessPkgs(updated);
    }
  };

  const handleRankChange = (index, key, value) => {
    const updated = [...rankList];
    if (key === 'matchedTurnover' || key === 'turnover' || key === 'cashAlternative') {
      updated[index][key] = Number(value);
    } else {
      updated[index][key] = value;
    }
    setRankList(updated);
  };

  const addPosterItem = () => {
    if (!newPoster.title || !newPoster.image) return;
    const item = {
      id: Date.now(),
      title: newPoster.title,
      image: newPoster.image,
      category: newPoster.category,
      status: 'Active'
    };
    setPosters([...posters, item]);
    setNewPoster({ title: '', image: '', category: 'Offers' });
  };

  const deletePosterItem = (id) => {
    setPosters(posters.filter(p => p.id !== id));
  };

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: MonitorPlay },
    { id: 'about', label: 'About & Vision', icon: Type },
    { id: 'popup', label: 'Popup Notices', icon: ShieldAlert },
    { id: 'packages', label: 'Eco Packages', icon: LayoutDashboard },
    { id: 'ranks', label: 'Ranks & Rewards', icon: Award },
    { id: 'offers', label: 'Offers & Posters', icon: ImageIcon },
  ];

  return (
    <div className="flex flex-col gap-6 h-full min-h-[calc(100vh-120px)] p-6 bg-gray-50 dark:bg-black/5 flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <LayoutDashboard className="text-[#65B300]" />
            GFT Content Management System
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Configure layout, packages, milestone rewards, and active promo posters dynamically.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 disabled:opacity-70 cursor-pointer"
        >
          {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Save size={16} />}
          {isSaving ? 'Publishing Changes...' : 'Save & Publish'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden sticky top-24">
            <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30">
              <h3 className="font-bold dark:text-white">CMS Sections</h3>
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
                      "flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer",
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
        <div className="flex-1 bg-white dark:bg-[#062F2D] rounded-2xl shadow-sm border border-gray-200 dark:border-[#0A4D45] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30 flex justify-between items-center">
            <h3 className="font-bold dark:text-white flex items-center gap-2">
              Editing: {sections.find(s => s.id === activeSection)?.label}
            </h3>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto max-h-[60vh] scrollbar-thin">
            {/* HERO SECTION */}
            {activeSection === 'hero' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Hero Section Title</label>
                  <input 
                    type="text" 
                    value={heroForm.title} 
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Hero Description Subtitle</label>
                  <textarea 
                    rows="3" 
                    value={heroForm.subtitle} 
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-sm leading-relaxed"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Primary Button Name</label>
                    <input 
                      type="text" 
                      value={heroForm.primaryBtn} 
                      onChange={(e) => setHeroForm({ ...heroForm, primaryBtn: e.target.value })}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Primary Button Link</label>
                    <input 
                      type="text" 
                      value={heroForm.primaryBtnLink} 
                      onChange={(e) => setHeroForm({ ...heroForm, primaryBtnLink: e.target.value })}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Secondary Button Name</label>
                    <input 
                      type="text" 
                      value={heroForm.secondaryBtn} 
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryBtn: e.target.value })}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Secondary Button Link</label>
                    <input 
                      type="text" 
                      value={heroForm.secondaryBtnLink} 
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryBtnLink: e.target.value })}
                      className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs" 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT US SECTION */}
            {activeSection === 'about' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">About Company Heading</label>
                  <input 
                    type="text" 
                    value={aboutForm.heading} 
                    onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">About Description Text</label>
                  <textarea 
                    rows="4" 
                    value={aboutForm.description} 
                    onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs leading-relaxed"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Our Corporate Vision</label>
                  <textarea 
                    rows="3" 
                    value={aboutForm.vision} 
                    onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs leading-relaxed"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Our Corporate Mission</label>
                  <textarea 
                    rows="3" 
                    value={aboutForm.mission} 
                    onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs leading-relaxed"
                  ></textarea>
                </div>
              </div>
            )}

            {/* POPUP NOTICES SECTION */}
            {activeSection === 'popup' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Notice Dialog Title</label>
                  <input 
                    type="text" 
                    value={popupForm.title} 
                    onChange={(e) => setPopupForm({ ...popupForm, title: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Notice Dialog Message</label>
                  <textarea 
                    rows="5" 
                    value={popupForm.message} 
                    onChange={(e) => setPopupForm({ ...popupForm, message: e.target.value })}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-4 py-3 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none text-xs leading-relaxed"
                  ></textarea>
                </div>
              </div>
            )}

            {/* ECO PACKAGES SECTION */}
            {activeSection === 'packages' && (
              <div className="space-y-8 text-black dark:text-white">
                {/* Student packages */}
                <div>
                  <h3 className="font-bold border-b border-gray-200 dark:border-[#0A4D45] pb-2 text-sm text-[#65B300]">Student Tier Packages</h3>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {studentPkgs.map((pkg, idx) => (
                      <div key={pkg.id} className="grid grid-cols-4 gap-3 bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-xl items-center border border-gray-250 dark:border-transparent">
                        <span className="font-bold text-xs">{pkg.name}</span>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">Amount (₹)</label>
                          <input type="number" value={pkg.amount} onChange={(e) => handlePackageChange('student', idx, 'amount', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">ROI %</label>
                          <input type="number" step="0.1" value={pkg.roi} onChange={(e) => handlePackageChange('student', idx, 'roi', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold text-gft-primary" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">GFT Tokens</label>
                          <input type="number" value={pkg.tokens} onChange={(e) => handlePackageChange('student', idx, 'tokens', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold text-gft-accent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personal packages */}
                <div>
                  <h3 className="font-bold border-b border-gray-200 dark:border-[#0A4D45] pb-2 text-sm text-[#65B300]">Personal Tier Packages</h3>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {personalPkgs.map((pkg, idx) => (
                      <div key={pkg.id} className="grid grid-cols-4 gap-3 bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-xl items-center border border-gray-250 dark:border-transparent">
                        <span className="font-bold text-xs">{pkg.name}</span>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">Amount (₹)</label>
                          <input type="number" value={pkg.amount} onChange={(e) => handlePackageChange('personal', idx, 'amount', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">ROI %</label>
                          <input type="number" step="0.1" value={pkg.roi} onChange={(e) => handlePackageChange('personal', idx, 'roi', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold text-gft-primary" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">GFT Tokens</label>
                          <input type="number" value={pkg.tokens} onChange={(e) => handlePackageChange('personal', idx, 'tokens', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold text-gft-accent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Business packages */}
                <div>
                  <h3 className="font-bold border-b border-gray-200 dark:border-[#0A4D45] pb-2 text-sm text-[#65B300]">Business Tier Packages</h3>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {businessPkgs.map((pkg, idx) => (
                      <div key={pkg.id} className="grid grid-cols-4 gap-3 bg-gray-50 dark:bg-[#0A4D45]/30 p-4 rounded-xl items-center border border-gray-250 dark:border-transparent">
                        <span className="font-bold text-xs">{pkg.name}</span>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">Amount (₹)</label>
                          <input type="number" value={pkg.amount} onChange={(e) => handlePackageChange('business', idx, 'amount', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">ROI %</label>
                          <input type="number" step="0.1" value={pkg.roi} onChange={(e) => handlePackageChange('business', idx, 'roi', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold text-gft-primary" />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-500 uppercase">GFT Tokens</label>
                          <input type="number" value={pkg.tokens} onChange={(e) => handlePackageChange('business', idx, 'tokens', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold text-gft-accent" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* RANKS & REWARDS SECTION */}
            {activeSection === 'ranks' && (
              <div className="space-y-6 text-black dark:text-white">
                {rankList.map((rankItem, idx) => (
                  <div key={rankItem.id} className="bg-gray-50 dark:bg-[#0A4D45]/20 p-5 rounded-2xl border border-gray-200 dark:border-[#0A4D45] flex flex-col gap-4">
                    <span className="font-black text-sm text-[#65B300]">{rankItem.name} Designation</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase">Matched Turnover (₹)</label>
                        <input type="number" value={rankItem.matchedTurnover} onChange={(e) => handleRankChange(idx, 'matchedTurnover', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase">Reward Fund</label>
                        <input type="text" value={rankItem.fund} onChange={(e) => handleRankChange(idx, 'fund', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase">Cash Alternative (₹)</label>
                        <input type="number" value={rankItem.cashAlternative || 0} onChange={(e) => handleRankChange(idx, 'cashAlternative', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1 bg-white dark:bg-[#0A4D45] text-xs font-bold" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase">Travel Benefit</label>
                        <input type="text" value={rankItem.travel} onChange={(e) => handleRankChange(idx, 'travel', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1.5 bg-white dark:bg-[#0A4D45] text-xs" />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase">Physical Gift Rewards</label>
                        <input type="text" value={rankItem.rewards} onChange={(e) => handleRankChange(idx, 'rewards', e.target.value)} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-1.5 bg-white dark:bg-[#0A4D45] text-xs" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* OFFERS & POSTERS SECTION */}
            {activeSection === 'offers' && (
              <div className="space-y-6 text-black dark:text-white">
                <div className="bg-gray-50 dark:bg-[#0A4D45]/30 p-5 rounded-2xl border border-gray-200 dark:border-[#0A4D45] flex flex-col gap-4">
                  <span className="font-bold text-xs">Add New Banner Poster</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Poster Title</label>
                      <input type="text" value={newPoster.title} onChange={(e) => setNewPoster({ ...newPoster, title: e.target.value })} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-2 bg-white dark:bg-[#0A4D45] text-xs" placeholder="e.g. Thailand Offer" />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Image URL</label>
                      <input type="text" value={newPoster.image} onChange={(e) => setNewPoster({ ...newPoster, image: e.target.value })} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-2 bg-white dark:bg-[#0A4D45] text-xs" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase">Category</label>
                      <select value={newPoster.category} onChange={(e) => setNewPoster({ ...newPoster, category: e.target.value })} className="w-full border border-gray-300 dark:border-[#0A4D45] rounded p-2 bg-white dark:bg-[#0A4D45] text-xs font-bold text-[#65B300]">
                        <option value="Offers">Offers</option>
                        <option value="Announcements">Announcements</option>
                        <option value="Rank">Rank Posters</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={addPosterItem} className="w-full bg-[#65B300] hover:bg-[#8CD83D] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer">
                    <Plus size={14}/> Add Poster Item
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {posters.map((poster) => (
                    <div key={poster.id} className="bg-white dark:bg-[#0A4D45]/10 border border-gray-200 dark:border-[#0A4D45] p-4 rounded-2xl flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={poster.image} alt={poster.title} className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                        <div>
                          <h4 className="font-bold text-xs">{poster.title}</h4>
                          <span className="text-[9px] font-bold uppercase text-[#65B300]">{poster.category}</span>
                        </div>
                      </div>
                      <button onClick={() => deletePosterItem(poster.id)} className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer">
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
