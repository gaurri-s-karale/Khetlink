import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Clock,
  Tag,
  ArrowLeft,
  DollarSign,
  Truck
} from 'lucide-react';

export const BuyerProfileView: React.FC = () => {
  const {
    buyers,
    selectedBuyerId,
    setCurrentView,
    setSelectedBuyerId,
    lots,
    selectedLotId
  } = useApp();

  const buyer = buyers.find((b) => b.id === selectedBuyerId) || buyers[0];
  const lot = lots.find((l) => l.id === selectedLotId) || lots[0];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('buyer-matching')}
          className="text-xs font-semibold text-gov-secondary hover:underline flex items-center space-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Buyer Matching</span>
        </button>

        <span className="text-xs text-gov-muted">Buyer ID: {buyer.id}</span>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-lg bg-gov-lightBlue text-gov-primary flex items-center justify-center font-black text-xl border border-gov-secondary/30 flex-shrink-0">
              {buyer.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex items-center space-x-2.5">
                <h1 className="text-2xl font-bold text-gov-primary tracking-tight">{buyer.name}</h1>
                {buyer.kycVerified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    KYC Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gov-muted mt-0.5">{buyer.businessType}</p>
              <p className="text-xs text-gov-muted flex items-center mt-1">
                <MapPin className="w-3.5 h-3.5 mr-1 text-gov-muted" />
                {buyer.location}, {buyer.district}, {buyer.state} • {buyer.distanceKm} km from your cluster
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button
              id="buyer-profile-review-offer-btn"
              onClick={() => setCurrentView('offers')}
              className="w-full sm:w-auto px-5 py-2.5 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition"
            >
              <Tag className="w-4 h-4" />
              <span>Review Incoming Offer (₹3,200/q)</span>
            </button>
          </div>
        </div>

        {/* 4 Trust & Performance Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gov-border">
          <div className="p-3 rounded bg-gov-bg border border-gov-border">
            <span className="text-[11px] font-bold text-gov-muted uppercase block">Trust Rating</span>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-lg font-black text-gov-text">{buyer.rating} / 5</span>
            </div>
            <span className="text-[10px] text-gov-muted">Based on verified trades</span>
          </div>

          <div className="p-3 rounded bg-gov-bg border border-gov-border">
            <span className="text-[11px] font-bold text-gov-muted uppercase block">Settled Transactions</span>
            <div className="text-lg font-black text-gov-primary mt-1">
              {buyer.successfulTransactions} Deals
            </div>
            <span className="text-[10px] text-gov-agri font-semibold">100% dispute-free</span>
          </div>

          <div className="p-3 rounded bg-gov-bg border border-gov-border">
            <span className="text-[11px] font-bold text-gov-muted uppercase block">On-Time Payment</span>
            <div className="text-lg font-black text-gov-agri mt-1">
              {buyer.onTimePaymentRate}%
            </div>
            <span className="text-[10px] text-gov-muted">Direct escrow settlement</span>
          </div>

          <div className="p-3 rounded bg-gov-bg border border-gov-border">
            <span className="text-[11px] font-bold text-gov-muted uppercase block">Logistics Model</span>
            <div className="text-sm font-black text-gov-text mt-1 truncate">
              Cold-Chain Farmgate
            </div>
            <span className="text-[10px] text-gov-muted">Buyer arranges transport</span>
          </div>
        </div>
      </div>

      {/* Active Requisition Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov space-y-4">
          <div className="border-b border-gov-border pb-3">
            <h3 className="text-sm font-bold text-gov-primary">Current Open Procurement Demand</h3>
            <p className="text-xs text-gov-muted">Produce specifications requested by this buyer</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-gov-border/60">
              <span className="text-gov-muted font-medium">Commodity / Crop:</span>
              <span className="font-bold text-gov-primary">{buyer.currentDemandCrop}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gov-border/60">
              <span className="text-gov-muted font-medium">Required Volume:</span>
              <span className="font-bold text-gov-text">{buyer.currentDemandQuantityKg} kg (Immediate dispatch)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gov-border/60">
              <span className="text-gov-muted font-medium">Purchase Price Band:</span>
              <span className="font-bold text-gov-agri">
                ₹{buyer.expectedPriceRange.min.toLocaleString('en-IN')} – ₹{buyer.expectedPriceRange.max.toLocaleString('en-IN')} / q
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gov-border/60">
              <span className="text-gov-muted font-medium">Acceptable Grades:</span>
              <span className="font-semibold text-gov-text">{buyer.preferredGrades.join(', ')}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gov-muted font-medium">Payment Protocol:</span>
              <span className="font-semibold text-gov-primary">Automated T+0 Mandi Escrow</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-gov-border pb-3">
              <h3 className="text-sm font-bold text-gov-primary">Match with Your Certified Produce</h3>
              <p className="text-xs text-gov-muted">Comparing against Lot {lot?.id}</p>
            </div>

            <div className="mt-4 p-3.5 bg-gov-lightGreen/30 rounded border border-gov-agri/30 text-xs space-y-2">
              <div className="flex items-center space-x-2 text-gov-agri font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>94% Mutual Fit Verified</span>
              </div>
              <p className="text-gov-text leading-relaxed">
                Your 500 kg Grade A Tomato lot completely satisfies FreshMart’s cold-store quick commerce requirement. They have already placed an offer of ₹3,200/q (above your asking rate of ₹3,100/q).
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-gov-border">
            <button
              onClick={() => setCurrentView('offers')}
              className="w-full py-2.5 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs flex items-center justify-center space-x-2 transition"
            >
              <span>Review Incoming Offer →</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
