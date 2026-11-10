import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  PlusCircle,
  Users,
  Tag,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  Eye,
  X
} from 'lucide-react';
import { DigitalLot, LotStatus } from '../../types';
import { getProduceImage } from '../../data/seedData';

export const MyLots: React.FC = () => {
  const { lots, setCurrentView, setSelectedLotId, t } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [inspectLot, setInspectLot] = useState<DigitalLot | null>(null);

  const filteredLots = lots.filter((lot) => {
    if (filterStatus === 'All') return true;
    return lot.status === filterStatus;
  });

  const getStatusBadge = (status: LotStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-gov-lightGreen text-gov-agri border-gov-agri/30';
      case 'Offer Received':
        return 'bg-gov-lightOrange text-gov-accent border-gov-accent/30 animate-pulse';
      case 'Sold':
        return 'bg-gov-lightBlue text-gov-primary border-gov-secondary/30';
      case 'Completed':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Package className="w-6 h-6 text-gov-primary" />
            <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
              {t.myLots}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gov-lightBlue text-gov-primary border border-gov-border">
              {lots.length} Active & Past Lots
            </span>
          </div>
          <p className="text-sm text-gov-muted mt-1">
            Manage your digital produce listings, view quality grades, and inspect buyer matches.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('create-lot')}
          className="px-4 py-2 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Digital Lot</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {['All', 'Active', 'Offer Received', 'Sold', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === status
                ? 'bg-gov-primary text-white shadow-xs'
                : 'bg-white text-gov-muted hover:text-gov-primary border border-gov-border'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Lots Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLots.map((lot) => (
          <div
            key={lot.id}
            className="bg-white rounded-lg border border-gov-border shadow-gov overflow-hidden hover:border-gov-secondary transition flex flex-col justify-between"
          >
            <div>
              {/* Lot Image & Status Badge */}
              <div className="relative h-40 bg-gov-bg">
                <img
                  src={getProduceImage(lot.crop, lot.imageUrl)}
                  alt={lot.crop}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border ${getStatusBadge(lot.status)}`}>
                    {lot.status.toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[11px] font-mono">
                  {lot.id}
                </div>
              </div>

              {/* Lot Details */}
              <div className="p-4 space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gov-primary">{lot.crop}</h3>
                    <p className="text-xs text-gov-muted">{lot.location}, {lot.state}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gov-agri bg-gov-lightGreen px-1.5 py-0.5 rounded border border-gov-agri/30">
                      {lot.grade} ({lot.qualityScore}/100)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-gov-border/60">
                  <div>
                    <span className="text-gov-muted text-[11px] block">Quantity</span>
                    <span className="font-extrabold text-gov-text">{lot.quantityKg.toLocaleString('en-IN')} kg</span>
                  </div>
                  <div>
                    <span className="text-gov-muted text-[11px] block">Expected Price</span>
                    <span className="font-extrabold text-gov-primary">₹{lot.expectedPricePerQuintal.toLocaleString('en-IN')} / q</span>
                  </div>
                </div>

                <div className="text-[11px] text-gov-muted bg-gov-bg p-2 rounded border border-gov-border/60 flex items-center justify-between">
                  <span>Storage: {lot.storageType}</span>
                  <span className="font-bold text-gov-secondary">{lot.buyerMatchesCount} Buyers Matched</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-3 bg-gov-bg/50 border-t border-gov-border flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedLotId(lot.id);
                  setCurrentView('buyer-matching');
                }}
                className="flex-1 py-1.5 px-3 rounded bg-gov-primary hover:bg-gov-secondary text-white text-xs font-bold flex items-center justify-center space-x-1 transition"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Find Buyers</span>
              </button>

              <button
                onClick={() => setInspectLot(lot)}
                className="p-1.5 rounded bg-white hover:bg-gov-lightBlue text-gov-secondary border border-gov-border text-xs"
                title="View Lot Specification"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lot Inspection Modal */}
      {inspectLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg border border-gov-border shadow-gov-lg max-w-lg w-full overflow-hidden">
            <div className="bg-gov-primary px-5 py-3.5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Lot Specification — {inspectLot.id}</h3>
                <p className="text-[11px] text-gov-lightBlue/80">Certified Digital Produce Record</p>
              </div>
              <button onClick={() => setInspectLot(null)} className="text-white/80 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                  <span className="text-gov-muted block">Crop & Variety</span>
                  <span className="font-bold text-gov-primary mt-0.5 block">{inspectLot.crop}</span>
                </div>
                <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                  <span className="text-gov-muted block">Available Quantity</span>
                  <span className="font-bold text-gov-primary mt-0.5 block">{inspectLot.quantityKg} kg</span>
                </div>
                <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                  <span className="text-gov-muted block">Quality Certified</span>
                  <span className="font-bold text-gov-agri mt-0.5 block">{inspectLot.grade} ({inspectLot.qualityScore}/100)</span>
                </div>
                <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                  <span className="text-gov-muted block">Base Asking Price</span>
                  <span className="font-bold text-gov-primary mt-0.5 block">₹{inspectLot.expectedPricePerQuintal} / q</span>
                </div>
                <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                  <span className="text-gov-muted block">Harvest Date</span>
                  <span className="font-medium text-gov-text mt-0.5 block">{inspectLot.harvestDate}</span>
                </div>
                <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                  <span className="text-gov-muted block">Dispatch Window</span>
                  <span className="font-medium text-gov-text mt-0.5 block">From {inspectLot.availableFrom}</span>
                </div>
              </div>

              <div className="p-3 bg-gov-lightBlue/30 rounded border border-gov-secondary/30 text-xs">
                <span className="font-bold text-gov-primary block mb-1">Electronic Provenance:</span>
                <p className="text-gov-muted text-[11px] font-mono break-all">
                  SHA256: 9b2d8f7e2c65a10984cf... Verified via KhetLink Decentralized Mandi Registry.
                </p>
              </div>
            </div>

            <div className="bg-gov-bg px-5 py-3 border-t border-gov-border flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedLotId(inspectLot.id);
                  setInspectLot(null);
                  setCurrentView('buyer-matching');
                }}
                className="px-4 py-1.5 rounded bg-gov-primary text-white text-xs font-bold hover:bg-gov-secondary"
              >
                Match with Buyers →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
