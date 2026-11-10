import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Package,
  TrendingUp,
  Tag,
  CheckCircle2,
  Clock,
  Send,
  Star,
  ShieldCheck,
  Filter,
  Eye,
  X,
  Plus
} from 'lucide-react';
import { DigitalLot } from '../../types';
import { getProduceImage } from '../../data/seedData';

export const BuyerDashboard: React.FC = () => {
  const {
    lots,
    makeOffer,
    setCurrentView,
    setSelectedLotId,
    buyers,
    offers,
    t
  } = useApp();

  const buyer = buyers[0]; // FreshMart Foods
  const [activeOfferModalLot, setActiveOfferModalLot] = useState<DigitalLot | null>(null);
  const [offerPrice, setOfferPrice] = useState<number>(3200);
  const [offerQty, setOfferQty] = useState<number>(500);
  const [pickupMsg, setPickupMsg] = useState<string>('Can arrange cold-chain pickup tomorrow at 10 AM directly from your farm cluster.');

  const handleOpenOfferModal = (lot: DigitalLot) => {
    setActiveOfferModalLot(lot);
    setOfferPrice(lot.expectedPricePerQuintal > 3000 ? 3200 : lot.expectedPricePerQuintal + 50);
    setOfferQty(lot.quantityKg);
  };

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOfferModalLot) return;

    makeOffer({
      lotId: activeOfferModalLot.id,
      crop: activeOfferModalLot.crop,
      buyerId: buyer.id,
      buyerName: buyer.name,
      buyerRating: buyer.rating,
      buyerKycVerified: buyer.kycVerified,
      offeredPricePerQuintal: offerPrice,
      quantityKg: offerQty,
      pickupMessage: pickupMsg
    });

    setActiveOfferModalLot(null);
    setCurrentView('offers');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-6 h-6 text-gov-secondary" />
            <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
              Buyer Procurement Dashboard
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
              Procuring Entity: {buyer.name}
            </span>
          </div>
          <p className="text-sm text-gov-muted mt-1">
            Discover verified farmgate produce lots, issue electronic purchase offers, and coordinate direct farm dispatches.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentView('offers')}
            className="px-3 py-2 rounded bg-gov-lightBlue text-gov-primary hover:bg-blue-100 font-semibold text-xs border border-gov-secondary/30 transition"
          >
            Manage Active Bids ({offers.length})
          </button>
        </div>
      </div>

      {/* 4 Procurement Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Active Requirements</div>
          <div className="text-2xl font-extrabold text-gov-primary mt-1">12</div>
          <p className="text-[11px] text-gov-muted mt-1">Weekly procurement targets</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Offers Sent</div>
          <div className="text-2xl font-extrabold text-gov-secondary mt-1">8</div>
          <p className="text-[11px] text-gov-muted mt-1">Pending farmer acceptance</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Pending Orders</div>
          <div className="text-2xl font-extrabold text-gov-accent mt-1">4</div>
          <p className="text-[11px] text-gov-muted mt-1">Awaiting vehicle dispatch</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Completed Purchases</div>
          <div className="text-2xl font-extrabold text-gov-agri mt-1">37</div>
          <p className="text-[11px] text-gov-muted mt-1">Direct farmgate settled</p>
        </div>
      </div>

      {/* Section: Recommended Produce Lots */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gov-primary">Recommended Certified Farm Lots</h2>
            <p className="text-xs text-gov-muted">AI-graded lots matching your quality specifications and procurement radius</p>
          </div>
          <span className="text-xs font-semibold text-gov-secondary">
            {lots.length} Available Listings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lots.map((lot) => (
            <div
              key={lot.id}
              className="bg-white rounded-lg border border-gov-border shadow-gov overflow-hidden hover:border-gov-secondary transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 bg-gov-bg">
                  <img
                    src={getProduceImage(lot.crop, lot.imageUrl)}
                    alt={lot.crop}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-gov-agri text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
                      {lot.grade} ({lot.qualityScore}/100)
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white font-mono text-[10px] px-1.5 py-0.5 rounded">
                    {lot.id}
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gov-primary">{lot.crop}</h3>
                      <p className="text-xs text-gov-muted">{lot.location}, {lot.state}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gov-muted">Farmer Rating</div>
                      <div className="flex items-center text-xs font-bold text-amber-600 justify-end">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                        4.8 / 5
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gov-border/60">
                    <div>
                      <span className="text-gov-muted text-[11px] block">Available Volume</span>
                      <span className="font-bold text-gov-text">{lot.quantityKg.toLocaleString('en-IN')} kg</span>
                    </div>
                    <div>
                      <span className="text-gov-muted text-[11px] block">Asking Price</span>
                      <span className="font-black text-gov-primary">₹{lot.expectedPricePerQuintal.toLocaleString('en-IN')} / q</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-gov-bg border-t border-gov-border flex items-center gap-2">
                <button
                  id={`buyer-make-offer-${lot.id}`}
                  onClick={() => handleOpenOfferModal(lot)}
                  className="flex-1 py-2 px-3 rounded bg-gov-primary hover:bg-gov-secondary text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Offer (₹3,200/q)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Make Offer Modal */}
      {activeOfferModalLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg border border-gov-border shadow-gov-lg max-w-md w-full overflow-hidden">
            <div className="bg-gov-primary px-5 py-3.5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Issue Formal Purchase Offer</h3>
                <p className="text-[11px] text-gov-lightBlue/80">Lot ID: {activeOfferModalLot.id} • {activeOfferModalLot.crop}</p>
              </div>
              <button onClick={() => setActiveOfferModalLot(null)} className="text-white/80 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendOffer} className="p-5 space-y-4">
              <div className="p-3 rounded bg-gov-bg border border-gov-border text-xs flex justify-between">
                <div>
                  <span className="text-gov-muted block">Farmer Ask:</span>
                  <span className="font-bold text-gov-text">₹{activeOfferModalLot.expectedPricePerQuintal}/q</span>
                </div>
                <div className="text-right">
                  <span className="text-gov-muted block">Quality Certified:</span>
                  <span className="font-bold text-gov-agri">{activeOfferModalLot.grade} ({activeOfferModalLot.qualityScore}/100)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Your Offered Rate (₹ / quintal)</label>
                <input
                  type="number"
                  required
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(Number(e.target.value))}
                  className="w-full text-xs font-bold bg-gov-bg border border-gov-border rounded p-2.5 text-gov-primary focus:outline-none focus:border-gov-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Procurement Quantity (kg)</label>
                <input
                  type="number"
                  required
                  value={offerQty}
                  onChange={(e) => setOfferQty(Number(e.target.value))}
                  className="w-full text-xs font-bold bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text focus:outline-none focus:border-gov-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Pickup Commitment & Logistics Note</label>
                <textarea
                  rows={2}
                  value={pickupMsg}
                  onChange={(e) => setPickupMsg(e.target.value)}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text focus:outline-none focus:border-gov-primary"
                />
              </div>

              <div className="p-3 rounded bg-gov-lightBlue/30 border border-gov-secondary/30 flex justify-between items-center text-xs">
                <span className="text-gov-primary font-bold">Total Deal Commitment:</span>
                <span className="text-base font-black text-gov-primary">
                  ₹{Math.round((offerPrice / 100) * offerQty).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveOfferModalLot(null)}
                  className="px-4 py-2 rounded bg-white text-gov-muted text-xs font-semibold border border-gov-border hover:bg-gov-bg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-gov-primary hover:bg-gov-secondary text-white text-xs font-bold transition shadow-xs flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>SEND OFFER</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
