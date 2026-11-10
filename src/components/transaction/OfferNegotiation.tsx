import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tag,
  CheckCircle2,
  XCircle,
  MessageSquare,
  DollarSign,
  Truck,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Offer, OfferStatus } from '../../types';

export const OfferNegotiation: React.FC = () => {
  const {
    offers,
    acceptOffer,
    counterOffer,
    declineOffer,
    setCurrentView,
    lots,
    userRole,
    setUserRole,
    t
  } = useApp();

  const [counterInputId, setCounterInputId] = useState<string | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(3250);

  const handleAccept = (offerId: string) => {
    acceptOffer(offerId);
    // Navigate to transaction confirmation
    setCurrentView('transactions');
  };

  const handleCounterSubmit = (offerId: string) => {
    counterOffer(offerId, counterPrice);
    setCounterInputId(null);
  };

  const getStatusBadge = (status: OfferStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-gov-lightOrange text-gov-accent border-gov-accent/30';
      case 'Accepted':
        return 'bg-gov-lightGreen text-gov-agri border-gov-agri/30';
      case 'Countered':
        return 'bg-gov-lightBlue text-gov-secondary border-gov-secondary/30';
      case 'Declined':
        return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Tag className="w-6 h-6 text-gov-primary" />
            <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
              {userRole === 'buyer' ? 'Sent Procurement Offers' : t.offers}
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
              {userRole === 'buyer' ? 'Outbound Bids' : 'Incoming Bids'}
            </span>
          </div>
          <p className="text-sm text-gov-muted mt-1">
            {userRole === 'buyer'
              ? 'Track the status of purchase offers submitted to farmers, review counter-offers, and track settlements.'
              : 'Review incoming purchase bids, negotiate counter-offers, and accept legally binding digital trade contracts.'}
          </p>
        </div>

        <div className="text-xs text-gov-muted bg-gov-bg p-2.5 rounded border border-gov-border">
          <span>Escrow-backed trades with automated T+0 payment settlement</span>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg border border-gov-border text-gov-muted text-xs">
            No offers currently on record.
          </div>
        ) : (
          offers.map((offer) => {
            const isPending = offer.status === 'Pending';
            const isAccepted = offer.status === 'Accepted';

            return (
              <div
                key={offer.id}
                className={`bg-white rounded-lg border transition shadow-gov p-5 space-y-4 ${
                  isPending
                    ? 'border-gov-accent ring-1 ring-gov-accent/30'
                    : 'border-gov-border'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-gov-lightBlue text-gov-primary font-black flex items-center justify-center text-sm border border-gov-border">
                      {offer.buyerName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-gov-primary">{offer.buyerName}</h3>
                        {offer.buyerKycVerified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                            ✓ Verified
                          </span>
                        )}
                        <span className="flex items-center text-xs font-bold text-amber-600">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                          {offer.buyerRating} / 5
                        </span>
                      </div>
                      <span className="text-xs text-gov-muted">Offer ID: {offer.id} • Lot: {offer.lotId}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold border ${getStatusBadge(offer.status)}`}>
                      {offer.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-gov-muted">{new Date(offer.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Offer Economics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded bg-gov-bg border border-gov-border">
                    <span className="text-gov-muted text-[11px] block">Commodity</span>
                    <span className="font-extrabold text-gov-primary text-sm mt-0.5 block">{offer.crop}</span>
                  </div>
                  <div className="p-3 rounded bg-gov-bg border border-gov-border">
                    <span className="text-gov-muted text-[11px] block">Procurement Volume</span>
                    <span className="font-extrabold text-gov-text text-sm mt-0.5 block">{offer.quantityKg} kg</span>
                  </div>
                  <div className="p-3 rounded bg-gov-lightGreen border border-gov-agri/30">
                    <span className="text-gov-agri font-bold text-[11px] block">Offered Rate</span>
                    <span className="font-black text-gov-agri text-base mt-0.5 block">
                      ₹{offer.offeredPricePerQuintal.toLocaleString('en-IN')} <span className="text-xs font-normal">/ q</span>
                    </span>
                  </div>
                  <div className="p-3 rounded bg-gov-lightBlue border border-gov-secondary/30">
                    <span className="text-gov-primary font-bold text-[11px] block">Total Deal Value</span>
                    <span className="font-black text-gov-primary text-base mt-0.5 block">
                      ₹{offer.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Buyer's Message / Logistics Term */}
                <div className="p-3 rounded bg-gov-bg border border-gov-border text-xs flex items-start space-x-2">
                  <Truck className="w-4 h-4 text-gov-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gov-primary">Pickup & Delivery Commitment: </span>
                    <span className="text-gov-text">{offer.pickupMessage}</span>
                  </div>
                </div>

                {/* Counter Offer Input Row */}
                {counterInputId === offer.id && (
                  <div className="p-4 rounded bg-gov-lightBlue/30 border border-gov-secondary/40 space-y-3 animate-in fade-in duration-150">
                    <span className="text-xs font-bold text-gov-primary block">Specify Your Counter Asking Rate:</span>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <span className="absolute left-2.5 top-2 text-xs font-bold text-gov-muted">₹</span>
                        <input
                          type="number"
                          value={counterPrice}
                          onChange={(e) => setCounterPrice(Number(e.target.value))}
                          className="pl-6 pr-3 py-1.5 text-xs font-bold bg-white border border-gov-border rounded w-36 focus:outline-none focus:border-gov-primary"
                        />
                      </div>
                      <span className="text-xs text-gov-muted">/ quintal (Total: ₹{Math.round((counterPrice / 100) * offer.quantityKg).toLocaleString('en-IN')})</span>
                      <button
                        onClick={() => handleCounterSubmit(offer.id)}
                        className="px-3 py-1.5 rounded bg-gov-secondary text-white text-xs font-bold hover:bg-gov-primary transition"
                      >
                        Submit Counter
                      </button>
                      <button
                        onClick={() => setCounterInputId(null)}
                        className="px-3 py-1.5 rounded bg-white text-gov-muted text-xs font-semibold border border-gov-border hover:bg-gov-bg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Controls for Farmer when Pending */}
                {userRole === 'farmer' && isPending && (
                  <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-gov-border/60">
                    <button
                      id={`decline-offer-btn-${offer.id}`}
                      onClick={() => declineOffer(offer.id)}
                      className="px-4 py-2 rounded bg-white hover:bg-red-50 text-red-700 text-xs font-bold border border-red-200 transition"
                    >
                      {t.declineOffer}
                    </button>

                    <button
                      id={`counter-offer-btn-${offer.id}`}
                      onClick={() => setCounterInputId(offer.id)}
                      className="px-4 py-2 rounded bg-gov-lightBlue hover:bg-blue-100 text-gov-primary text-xs font-bold border border-gov-secondary/30 transition"
                    >
                      {t.counterOffer}
                    </button>

                    <button
                      id={`accept-offer-btn-${offer.id}`}
                      onClick={() => handleAccept(offer.id)}
                      className="px-6 py-2 rounded bg-gov-agri hover:bg-green-800 text-white text-xs font-bold shadow-sm transition flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.acceptOffer}</span>
                    </button>
                  </div>
                )}

                {/* Farmer View when Countered */}
                {userRole === 'farmer' && offer.status === 'Countered' && (
                  <div className="flex items-center justify-between pt-2 border-t border-gov-border/60 text-xs">
                    <span className="font-semibold text-gov-secondary flex items-center">
                      <RotateCcw className="w-4 h-4 mr-1 text-gov-secondary" />
                      Counter asking rate of ₹{offer.counterPricePerQuintal}/q sent to buyer • Awaiting buyer response
                    </span>
                  </div>
                )}

                {/* Action Controls for Buyer when Pending */}
                {userRole === 'buyer' && isPending && (
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-gov-border/60">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1.5 rounded border border-amber-200">
                      <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                      <span>Offer Submitted to Farmer • Awaiting Farmer Review & Acceptance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => declineOffer(offer.id)}
                        className="px-3 py-1.5 rounded bg-white hover:bg-red-50 text-red-700 text-xs font-bold border border-red-200 transition"
                      >
                        Withdraw Bid
                      </button>
                      <button
                        onClick={() => {
                          setUserRole('farmer');
                          setCurrentView('offers');
                        }}
                        className="px-3.5 py-1.5 rounded bg-gov-primary hover:bg-gov-secondary text-white text-xs font-bold transition flex items-center space-x-1 shadow-xs"
                        title="Switch to Farmer persona to accept this offer"
                      >
                        <span>Switch to Farmer to Accept →</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Buyer View when Countered by Farmer */}
                {userRole === 'buyer' && offer.status === 'Countered' && (
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-gov-border/60">
                    <span className="text-xs font-bold text-gov-secondary flex items-center">
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Farmer Proposed Counter Asking Rate: ₹{offer.counterPricePerQuintal}/q (Total: ₹{offer.totalAmount.toLocaleString('en-IN')})
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => declineOffer(offer.id)}
                        className="px-3 py-1.5 rounded bg-white hover:bg-red-50 text-red-700 text-xs font-bold border border-red-200 transition"
                      >
                        Decline Counter
                      </button>
                      <button
                        onClick={() => handleAccept(offer.id)}
                        className="px-4 py-1.5 rounded bg-gov-agri hover:bg-green-800 text-white text-xs font-bold shadow-sm transition flex items-center space-x-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept Counter & Confirm</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Both Views when Accepted */}
                {isAccepted && (
                  <div className="flex items-center justify-between pt-2 border-t border-gov-border/60">
                    <span className="text-xs font-bold text-gov-agri flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      ✓ OFFER ACCEPTED — Transferred to Confirmed Transactions
                    </span>
                    <button
                      onClick={() => setCurrentView('transactions')}
                      className="px-4 py-1.5 rounded bg-gov-primary text-white text-xs font-bold hover:bg-gov-secondary transition"
                    >
                      {userRole === 'buyer' ? 'View Purchase Invoice & Order →' : 'View Transaction & Invoice →'}
                    </button>
                  </div>
                )}

                {/* Declined State */}
                {offer.status === 'Declined' && (
                  <div className="pt-2 border-t border-gov-border/60 text-xs text-red-600 font-medium">
                    {userRole === 'buyer'
                      ? '✕ Offer withdrawn or declined by farmer. You may browse other farm lots.'
                      : '✕ Offer declined.'}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
