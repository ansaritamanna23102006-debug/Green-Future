'use client';
import { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Tags, Plus, Image as ImageIcon, Edit2, Trash2, Globe, EyeOff, X, CheckCircle } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';

const initialOffers = [
  { id: 'OFF-01', title: 'Summer Bonanza', startDate: '2026-06-01', endDate: '2026-06-30', status: 'Published', description: 'Double rewards on direct sponsor recruitments during June 2026.' },
  { id: 'OFF-02', title: 'Direct Sponsor 2x', startDate: '2026-06-15', endDate: '2026-06-25', status: 'Draft', description: 'Accelerated matching point booster for newly registered builders.' },
  { id: 'OFF-03', title: 'New Year Special', startDate: '2026-01-01', endDate: '2026-01-31', status: 'Expired', description: 'Founding member special allocation bonus.' },
];

export default function OffersManagement() {
  const [offers, setOffers] = useState(initialOffers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOffer, setEditOffer] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formStart, setFormStart] = useState('2026-07-01');
  const [formEnd, setFormEnd] = useState('2026-07-31');
  const [formDesc, setFormDesc] = useState('');

  const handleToggleStatus = (offerId) => {
    setOffers((prev) =>
      prev.map((off) => {
        if (off.id === offerId) {
          const newStatus = off.status === 'Published' ? 'Draft' : 'Published';
          setStatusMessage(`Offer "${off.title}" status changed to ${newStatus}.`);
          setTimeout(() => setStatusMessage(null), 3000);
          return { ...off, status: newStatus };
        }
        return off;
      })
    );
  };

  const handleDelete = (offerId, title) => {
    if (!window.confirm(`Are you sure you want to delete offer "${title}"?`)) return;
    setOffers((prev) => prev.filter((off) => off.id !== offerId));
    setStatusMessage(`Offer "${title}" deleted successfully.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleOpenEdit = (offer) => {
    setEditOffer(offer);
    setFormTitle(offer.title);
    setFormStart(offer.startDate);
    setFormEnd(offer.endDate);
    setFormDesc(offer.description || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    setOffers((prev) =>
      prev.map((off) =>
        off.id === editOffer.id
          ? { ...off, title: formTitle.trim(), startDate: formStart, endDate: formEnd, description: formDesc }
          : off
      )
    );
    setStatusMessage(`Offer "${formTitle}" updated.`);
    setEditOffer(null);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleCreateOffer = (asPublished = false) => {
    if (!formTitle.trim()) {
      alert('Please provide an offer title');
      return;
    }

    const newOff = {
      id: `OFF-0${offers.length + 1}`,
      title: formTitle.trim(),
      startDate: formStart,
      endDate: formEnd,
      status: asPublished ? 'Published' : 'Draft',
      description: formDesc || 'Special promotional member package.',
    };

    setOffers((prev) => [newOff, ...prev]);
    setIsModalOpen(false);
    setFormTitle('');
    setFormDesc('');
    setStatusMessage(`Offer "${newOff.title}" created as ${newOff.status}.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'title',
      header: 'Offer Title',
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 dark:bg-[#0A4D45] rounded border border-gray-200 dark:border-[#0A4D45]/50 flex items-center justify-center text-gray-400">
            <ImageIcon size={18} />
          </div>
          <div>
            <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D] block">{info.getValue()}</span>
            <span className="text-xs text-gray-400">{info.row.original.description}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const status = info.getValue();
        let color = 'bg-gray-100 text-gray-800';
        if (status === 'Published') color = 'bg-green-100 text-green-800';
        if (status === 'Draft') color = 'bg-yellow-100 text-yellow-800';

        return (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
            {status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === 'Published' ? (
            <button
              onClick={() => handleToggleStatus(row.original.id)}
              className="p-1.5 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100 transition-colors cursor-pointer"
              title="Unpublish (Convert to Draft)"
            >
              <EyeOff size={16} />
            </button>
          ) : (
            <button
              onClick={() => handleToggleStatus(row.original.id)}
              className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors cursor-pointer"
              title="Publish Live"
            >
              <Globe size={16} />
            </button>
          )}
          <button
            onClick={() => handleOpenEdit(row.original)}
            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors cursor-pointer"
            title="Edit Offer"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original.id, row.original.title)}
            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors cursor-pointer"
            title="Delete Offer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Tags className="text-[#65B300]" />
            Offer Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Create, publish, edit, and manage promotional offers and incentive banners.
          </p>
        </div>
        <button
          onClick={() => {
            setFormTitle('');
            setFormDesc('');
            setIsModalOpen(true);
          }}
          className="bg-[#65B300] hover:bg-[#8CD83D] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-lg shadow-[#65B300]/20 cursor-pointer"
        >
          <Plus size={16} />
          Create Offer
        </button>
      </div>

      {statusMessage && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm font-medium animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600" />
          {statusMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Offers" value={offers.length.toString()} icon={Tags} delay={0.1} />
        <StatCard title="Active Offers" value={offers.filter((o) => o.status === 'Published').length.toString()} icon={Globe} delay={0.2} />
        <StatCard title="Drafts" value={offers.filter((o) => o.status === 'Draft').length.toString()} icon={Edit2} delay={0.3} />
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <DataTable data={offers} columns={columns} />
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <Tags size={18} className="text-[#65B300]" />
                Create Promotional Offer
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Offer Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Diwali Special Reward Bonus"
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description / Rules</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Describe the offer details, qualifying turnover, and benefits..."
                  rows={3}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => handleCreateOffer(false)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateOffer(true)}
                  className="flex-1 py-2.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md"
                >
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#062F2D] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-[#0A4D45]">
            <div className="p-4 border-b border-gray-100 dark:border-[#0A4D45] flex justify-between items-center bg-gray-50 dark:bg-[#0A4D45]/50">
              <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                <Edit2 size={18} className="text-[#65B300]" />
                Edit Offer: {editOffer.id}
              </h3>
              <button
                onClick={() => setEditOffer(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white font-bold cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                    className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 dark:border-[#0A4D45] rounded-lg px-3 py-2 bg-white dark:bg-[#0A4D45]/50 dark:text-white focus:ring-2 focus:ring-[#65B300] outline-none resize-none"
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditOffer(null)}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-[#0A4D45]/80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#65B300] hover:bg-[#8CD83D] text-white rounded-lg font-medium transition-colors cursor-pointer shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
