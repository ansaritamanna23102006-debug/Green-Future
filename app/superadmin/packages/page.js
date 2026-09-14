'use client';

import React, { useMemo } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Package, ShieldAlert, Zap, Clock, Info, CheckCircle2 } from 'lucide-react';
import { DISPLAY_PACKAGES } from '@/lib/businessPlanRules';

export default function PackagesManagement() {
  const columns = useMemo(() => [
    {
      accessorKey: 'packageId',
      header: 'Package Key',
      cell: info => <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{info.getValue()}</span>
    },
    {
      accessorKey: 'name',
      header: 'Package Name',
      cell: info => (
        <span className="font-bold text-[#0A4D45] dark:text-[#8CD83D] flex items-center gap-2">
          <Zap size={15} className="text-[#65B300]"/>
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: 'category',
      header: 'Tier Category',
      cell: info => (
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 dark:bg-[#0A4D45] text-gray-700 dark:text-gray-300">
          {info.getValue()}
        </span>
      )
    },
    {
      accessorKey: 'officialPrice',
      header: 'Plan PDF Price',
      cell: info => <span className="font-bold text-gray-900 dark:text-white">₹{info.getValue()?.toLocaleString()}</span>
    },
    {
      accessorKey: 'prototypePrice',
      header: 'UI Draft Price',
      cell: info => <span className="text-gray-500 dark:text-gray-400">₹{info.getValue()?.toLocaleString()}</span>
    },
    {
      accessorKey: 'monthlyPercentage',
      header: 'Monthly ROI %',
      cell: info => <span className="font-bold text-[#65B300]">{info.getValue()}% / mo</span>
    },
    {
      accessorKey: 'durationMonths',
      header: 'Tenure',
      cell: info => <span className="text-xs text-gray-500">{info.getValue()} Months</span>
    },
    {
      accessorKey: 'confirmationStatus',
      header: 'Governance Status',
      cell: info => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock size={12} />
          Pending Confirmation
        </span>
      )
    }
  ], []);

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <Package className="text-[#65B300]" />
            Package Catalog (Authoritative Specifications)
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Authoritative package specifications and discrepancy matrix under Phase 0 governance.
          </p>
        </div>
      </div>

      {/* Governance Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3 shadow-sm">
        <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block font-bold text-sm">Package Mutations Gated</strong>
          <p>
            The 8 GFT Startup Packages are strictly governed by Phase 0 backend configuration. Creation, arbitrary price alterations, and ad-hoc financial mutations are disabled to maintain immutable ledger integrity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {DISPLAY_PACKAGES.slice(0, 4).map((pkg) => (
          <div key={pkg.packageId} className="bg-white dark:bg-[#062F2D] p-5 rounded-2xl border border-gray-200 dark:border-[#0A4D45] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-base dark:text-white flex items-center gap-1.5">
                  <Zap size={16} className="text-[#65B300]" />
                  {pkg.name} ({pkg.category})
                </h3>
              </div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">
                ₹{pkg.officialPrice?.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Draft: ₹{pkg.prototypePrice?.toLocaleString()}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-[#0A4D45] flex justify-between items-center text-xs">
              <span className="text-gray-500">Monthly ROI</span>
              <span className="font-bold text-[#65B300]">{pkg.monthlyPercentage}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#062F2D] rounded-xl border border-gray-200 dark:border-[#0A4D45] shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-[#0A4D45] bg-gray-50 dark:bg-[#0A4D45]/30">
          <h3 className="font-bold dark:text-white text-sm">Authoritative 8 GFT Startup Packages Catalog</h3>
        </div>
        <DataTable data={DISPLAY_PACKAGES} columns={columns} searchable={false} />
      </div>
    </div>
  );
}
