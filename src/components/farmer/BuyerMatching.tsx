import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Sparkles,
  ShieldCheck,
  Star,
  MapPin,
  TrendingUp,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Tag,
  Eye,
  X,
  Loader2
} from 'lucide-react';
import { calculateBuyerMatches } from '../../services/matchingService';
import { BuyerMatchResult } from '../../types';

export const BuyerMatching: React.FC = () => {
  const {
    lots,
    buyers,
    selectedLotId,
    setSelectedLotId,
    setSelectedBuyerId,
    setCurrentView,
    t
  } = useApp();

  const currentLot = lots.find((l) => l.id === selectedLotId) || lots[0];

  const [isMatching, setIsMatching] = useState(false);
  const [matchStep, setMatchStep] = useState(0);
  const [matches, setMatches] = useState<BuyerMatchResult[]>([]);
  const [activeBreakdown, setActiveBreakdown] = useState<BuyerMatchResult | null>(null);

  const matchSteps = [
    'ANALYSING LOT PARAMETERS',
    'CALCULATING PRICE AFFINITY (30%)',
    'CHECKING QUALITY GRADE COMPLIANCE (20%)',
    'AGGREGATING BUYER DEMAND SIGNALS (15%)',
    'MAPPING LOGISTICS DISPATCH RADIUS (10%)',
    'COMPUTING FINAL COMPOSITE MATCH SCORE'
  ];

  const runMatching = () => {
    setIsMatching(true);
    setMatchStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step < matchSteps.length) {
        setMatchStep(step);
      } else {
        clearInterval(interval);
        const results = calculateBuyerMatches(currentLot, buyers);
        setMatches(results);
        setIsMatching(false);
      }
    }, 200);
  };

  useEffect(() => {
    if (currentLot) {
      const results = calculateBuyerMatches(currentLot, buyers);
      setMatches(results);
    }
  }, [currentLot, buyers]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-gov-primary" />
              <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
                {t.smartMatching}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                HERO FEATURE
              </span>
            </div>
            <p className="text-sm text-gov-muted mt-1">
              Find verified institutional buyers matched on price, quality grade, quantity, demand urgency, and farmgate proximity.
            </p>
          </div>

          {/* Active Target Lot Selector */}
          <div className="flex items-center space-x-2 bg-gov-bg p-2 rounded border border-gov-border text-xs">
            <span className="text-gov-muted font-medium">Matching Lot:</span>
            <select
              id="matching-lot-select"
              value={currentLot?.id}
              onChange={(e) => {
                setSelectedLotId(e.target.value);
              }}
              className="bg-white text-gov-primary font-bold border border-gov-border rounded px-2 py-1 focus:outline-none"
            >
              {lots.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.id} — {l.crop} ({l.quantityKg} kg, {l.grade})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Matching Trigger / Banner */}
      <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gov-lightBlue flex items-center justify-center text-gov-primary flex-shrink-0">
            <Sparkles className="w-5 h-5 text-gov-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gov-primary">Prototype Smart Matching Engine</h3>
            <p className="text-xs text-gov-muted">
              Weighted matrix evaluation: Price (30%) + Quality (20%) + Quantity (20%) + Demand (15%) + Logistics (10%) + Trust (5%)
            </p>
          </div>
        </div>

        <button
          id="re-run-buyer-matching-btn"
          onClick={runMatching}
          disabled={isMatching}
          className="px-5 py-2.5 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition whitespace-nowrap disabled:opacity-50"
        >
          {isMatching ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{matchSteps[matchStep]}...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-gov-accent" />
              <span>Find Best Buyers</span>
            </>
          )}
        </button>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gov-primary">
            Best Buyer Matches for {currentLot?.crop} ({currentLot?.quantityKg} kg, {currentLot?.grade})
          </h2>
          <span className="text-xs text-gov-muted">Ranked by composite compatibility</span>
        </div>

        <div className="space-y-4">
          {matches.map((item, index) => {
            const { buyer, matchScore, offeredPricePerQuintal, scoreBreakdown } = item;
            const isTopMatch = index === 0;

            return (
              <div
                key={buyer.id}
                className={`bg-white rounded-lg border transition shadow-gov p-5 ${
                  isTopMatch
                    ? 'border-gov-secondary ring-1 ring-gov-secondary/30'
                    : 'border-gov-border hover:border-gov-secondary/60'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Buyer Identity & Rank */}
                  <div className="flex items-start space-x-3.5">
                    <div
                      className={`w-9 h-9 rounded font-black text-sm flex items-center justify-center flex-shrink-0 ${
                        isTopMatch
                          ? 'bg-gov-accent text-white shadow-xs'
                          : 'bg-gov-lightBlue text-gov-primary border border-gov-border'
                      }`}
                    >
                      #{index + 1}
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-bold text-gov-primary">{buyer.name}</h3>
                        {buyer.kycVerified && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                            ✓ KYC Verified
                          </span>
                        )}
                        <span className="flex items-center text-[11px] font-bold text-amber-600">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                          {buyer.rating} / 5
                        </span>
                      </div>
                      <p className="text-xs text-gov-muted mt-0.5">{buyer.businessType} • {buyer.location}</p>
                    </div>
                  </div>

                  {/* Big Match Score Gauge */}
                  <div className="flex items-center space-x-4 self-start md:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gov-muted uppercase block">Match Score</span>
                      <div className="text-2xl font-black text-gov-agri flex items-center justify-end">
                        {matchScore}%
                      </div>
                    </div>

                    <div className="h-10 w-px bg-gov-border"></div>

                    <button
                      id={`why-match-btn-${index}`}
                      onClick={() => setActiveBreakdown(item)}
                      className="text-xs font-semibold text-gov-secondary hover:underline flex items-center space-x-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Why this match?</span>
                    </button>
                  </div>
                </div>

                {/* Compatibility Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-gov-border/60 text-xs">
                  <div className="p-2 rounded bg-gov-bg border border-gov-border/60">
                    <span className="text-gov-muted text-[11px] block">Offered / Budget Price</span>
                    <span className="font-extrabold text-gov-primary mt-0.5 block">
                      ₹{offeredPricePerQuintal.toLocaleString('en-IN')} / q
                    </span>
                  </div>
                  <div className="p-2 rounded bg-gov-bg border border-gov-border/60">
                    <span className="text-gov-muted text-[11px] block">Required Quantity</span>
                    <span className="font-extrabold text-gov-text mt-0.5 block">
                      {buyer.currentDemandQuantityKg} kg
                    </span>
                  </div>
                  <div className="p-2 rounded bg-gov-bg border border-gov-border/60">
                    <span className="text-gov-muted text-[11px] block">Demand Urgency</span>
                    <span className="font-bold text-gov-agri mt-0.5 block">{item.demandUrgency}</span>
                  </div>
                  <div className="p-2 rounded bg-gov-bg border border-gov-border/60">
                    <span className="text-gov-muted text-[11px] block">Distance / Transit</span>
                    <span className="font-bold text-gov-text mt-0.5 block">{buyer.distanceKm} km direct</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-end space-x-2.5">
                  <button
                    id={`view-buyer-btn-${index}`}
                    onClick={() => {
                      setSelectedBuyerId(buyer.id);
                      setCurrentView('buyer-profile');
                    }}
                    className="px-3.5 py-1.5 rounded bg-white hover:bg-gov-lightBlue text-gov-secondary text-xs font-semibold border border-gov-border transition flex items-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Buyer Profile</span>
                  </button>

                  <button
                    id={`make-offer-btn-${index}`}
                    onClick={() => {
                      setSelectedBuyerId(buyer.id);
                      setCurrentView('offers');
                    }}
                    className="px-4 py-1.5 rounded bg-gov-primary hover:bg-gov-secondary text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    <span>Review / Negotiate Offer →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* "Why this match?" Detailed Breakdown Modal */}
      {activeBreakdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-lg border border-gov-border shadow-gov-lg max-w-xl w-full overflow-hidden">
            <div className="bg-gov-primary px-5 py-3.5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight">
                  Smart Match Breakdown — {activeBreakdown.buyer.name}
                </h3>
                <p className="text-[11px] text-gov-lightBlue/80">
                  Total Score: {activeBreakdown.matchScore}/100 • Prototype Scoring Engine
                </p>
              </div>
              <button
                onClick={() => setActiveBreakdown(null)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <p className="text-xs text-gov-muted leading-relaxed">
                KhetLink evaluates multi-factor compatibility between your certified lot and institutional buyer requisitions:
              </p>

              <div className="space-y-3">
                {/* 1. Price */}
                <div className="p-3 rounded border border-gov-border bg-gov-bg">
                  <div className="flex items-center justify-between text-xs font-bold text-gov-primary">
                    <span>Price Compatibility (Weight: 30%)</span>
                    <span className="text-gov-agri font-black">
                      {activeBreakdown.scoreBreakdown.priceCompatibility.score} / 30
                    </span>
                  </div>
                  <p className="text-[11px] text-gov-muted mt-1">
                    {activeBreakdown.scoreBreakdown.priceCompatibility.note}
                  </p>
                </div>

                {/* 2. Quality */}
                <div className="p-3 rounded border border-gov-border bg-gov-bg">
                  <div className="flex items-center justify-between text-xs font-bold text-gov-primary">
                    <span>Quality & Grade Compatibility (Weight: 20%)</span>
                    <span className="text-gov-agri font-black">
                      {activeBreakdown.scoreBreakdown.qualityCompatibility.score} / 20
                    </span>
                  </div>
                  <p className="text-[11px] text-gov-muted mt-1">
                    {activeBreakdown.scoreBreakdown.qualityCompatibility.note}
                  </p>
                </div>

                {/* 3. Quantity */}
                <div className="p-3 rounded border border-gov-border bg-gov-bg">
                  <div className="flex items-center justify-between text-xs font-bold text-gov-primary">
                    <span>Quantity Fit (Weight: 20%)</span>
                    <span className="text-gov-agri font-black">
                      {activeBreakdown.scoreBreakdown.quantityCompatibility.score} / 20
                    </span>
                  </div>
                  <p className="text-[11px] text-gov-muted mt-1">
                    {activeBreakdown.scoreBreakdown.quantityCompatibility.note}
                  </p>
                </div>

                {/* 4. Demand */}
                <div className="p-3 rounded border border-gov-border bg-gov-bg">
                  <div className="flex items-center justify-between text-xs font-bold text-gov-primary">
                    <span>Buyer Demand Urgency (Weight: 15%)</span>
                    <span className="text-gov-agri font-black">
                      {activeBreakdown.scoreBreakdown.buyerDemandUrgency.score} / 15
                    </span>
                  </div>
                  <p className="text-[11px] text-gov-muted mt-1">
                    {activeBreakdown.scoreBreakdown.buyerDemandUrgency.note}
                  </p>
                </div>

                {/* 5. Location */}
                <div className="p-3 rounded border border-gov-border bg-gov-bg">
                  <div className="flex items-center justify-between text-xs font-bold text-gov-primary">
                    <span>Logistics & Proximity (Weight: 10%)</span>
                    <span className="text-gov-agri font-black">
                      {activeBreakdown.scoreBreakdown.logisticsDistance.score} / 10
                    </span>
                  </div>
                  <p className="text-[11px] text-gov-muted mt-1">
                    {activeBreakdown.scoreBreakdown.logisticsDistance.note}
                  </p>
                </div>

                {/* 6. Trust */}
                <div className="p-3 rounded border border-gov-border bg-gov-bg">
                  <div className="flex items-center justify-between text-xs font-bold text-gov-primary">
                    <span>Buyer Trust & Payment Reliability (Weight: 5%)</span>
                    <span className="text-gov-agri font-black">
                      {activeBreakdown.scoreBreakdown.buyerTrust.score} / 5
                    </span>
                  </div>
                  <p className="text-[11px] text-gov-muted mt-1">
                    {activeBreakdown.scoreBreakdown.buyerTrust.note}
                  </p>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="p-3 rounded bg-gov-lightGreen border border-gov-agri/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-gov-agri uppercase">TOTAL MATCH SCORE</span>
                  <p className="text-[11px] text-gov-muted">Mathematically synthesized compatibility index</p>
                </div>
                <div className="text-2xl font-black text-gov-agri">
                  {activeBreakdown.matchScore} / 100
                </div>
              </div>
            </div>

            <div className="bg-gov-bg px-5 py-3 border-t border-gov-border flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedBuyerId(activeBreakdown.buyer.id);
                  setActiveBreakdown(null);
                  setCurrentView('buyer-profile');
                }}
                className="px-4 py-1.5 rounded bg-gov-primary text-white text-xs font-bold hover:bg-gov-secondary"
              >
                Inspect Buyer Profile →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
