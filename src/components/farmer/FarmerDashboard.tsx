import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  BrainCircuit,
  Package,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Clock,
  ChevronRight,
  CheckCircle2,
  Users,
  PlusCircle,
  Tag
} from 'lucide-react';
import { RECENT_ACTIVITIES } from '../../data/seedData';

export const FarmerDashboard: React.FC = () => {
  const {
    farmer,
    lots,
    offers,
    transactions,
    setCurrentView,
    setSelectedLotId,
    t
  } = useApp();

  const tomatoLot = lots.find((l) => l.crop === 'Tomato') || lots[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
              {t.welcomeFarmer}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
              ✓ Verified Farmer
            </span>
          </div>
          <p className="text-sm text-gov-muted mt-1">
            {t.farmerSubtitle} ({farmer.location})
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="dash-quick-price-ai"
            onClick={() => setCurrentView('price-ai')}
            className="px-3 py-2 rounded bg-gov-lightBlue text-gov-primary hover:bg-blue-100 text-xs font-semibold border border-gov-secondary/30 flex items-center space-x-1.5 transition"
          >
            <BrainCircuit className="w-4 h-4 text-gov-secondary" />
            <span>Price AI Advisory</span>
          </button>
          <button
            id="dash-quick-quality-scan"
            onClick={() => setCurrentView('quality-ai')}
            className="px-3 py-2 rounded bg-gov-lightGreen text-gov-agri hover:bg-green-100 text-xs font-semibold border border-gov-agri/30 flex items-center space-x-1.5 transition"
          >
            <Sparkles className="w-4 h-4 text-gov-agri" />
            <span>Scan Produce</span>
          </button>
          <button
            id="dash-quick-create-lot"
            onClick={() => setCurrentView('create-lot')}
            className="px-3.5 py-2 rounded bg-gov-primary text-white hover:bg-gov-secondary text-xs font-bold shadow-sm flex items-center space-x-1.5 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Digital Lot</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Price */}
        <div
          onClick={() => setCurrentView('market-prices')}
          className="bg-white p-5 rounded-lg border border-gov-border shadow-gov hover:border-gov-secondary transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gov-muted uppercase">
            <span>{t.todaysPrice}</span>
            <span className="text-gov-agri bg-gov-lightGreen px-1.5 py-0.5 rounded text-[11px] font-bold flex items-center">
              +8.4% <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-extrabold text-gov-primary">₹2,850 <span className="text-sm font-medium text-gov-muted">/ q</span></div>
            <p className="text-xs text-gov-text font-medium mt-1">Tomato • Pune APMC</p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-gov-border/60 flex items-center justify-between text-[11px] text-gov-secondary group-hover:underline">
            <span>View 7-day Mandi curve</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: AI Recommendation */}
        <div
          onClick={() => setCurrentView('price-ai')}
          className="bg-white p-5 rounded-lg border border-gov-border shadow-gov hover:border-gov-accent transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gov-muted uppercase">
            <span>{t.aiRecommendation}</span>
            <span className="text-white bg-gov-accent px-1.5 py-0.5 rounded text-[10px] font-bold">
              82% CONF
            </span>
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-extrabold text-gov-accent">HOLD</div>
            <p className="text-xs text-gov-text font-medium mt-1">Expected ₹3,050–₹3,150 / q</p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-gov-border/60 flex items-center justify-between text-[11px] text-gov-accent font-medium group-hover:underline">
            <span>HOLD for 2–3 Days advisory</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Active Lots */}
        <div
          onClick={() => setCurrentView('my-lots')}
          className="bg-white p-5 rounded-lg border border-gov-border shadow-gov hover:border-gov-primary transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gov-muted uppercase">
            <span>{t.activeLots}</span>
            <Package className="w-4 h-4 text-gov-primary" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-extrabold text-gov-primary">{lots.length}</div>
            <p className="text-xs text-gov-text font-medium mt-1">
              {offers.filter((o) => o.status === 'Pending').length} awaiting buyer response
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-gov-border/60 flex items-center justify-between text-[11px] text-gov-secondary group-hover:underline">
            <span>Manage listings & matches</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: Active Deal */}
        <div
          onClick={() => setCurrentView('logistics')}
          className="bg-white p-5 rounded-lg border border-gov-border shadow-gov hover:border-gov-agri transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-gov-muted uppercase">
            <span>{t.activeDeal}</span>
            <Truck className="w-4 h-4 text-gov-agri" />
          </div>
          <div className="mt-2.5">
            <div className="text-2xl font-extrabold text-gov-agri">1</div>
            <p className="text-xs text-gov-text font-medium mt-1">Delivery in progress (MH-12-AB-1234)</p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-gov-border/60 flex items-center justify-between text-[11px] text-gov-agri font-medium group-hover:underline">
            <span>Live route telematics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Market Snapshot & Featured Lot Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Snapshot (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-lg border border-gov-border shadow-gov space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gov-border">
            <div>
              <h2 className="text-base font-bold text-gov-primary">{t.marketSnapshot}</h2>
              <p className="text-xs text-gov-muted">Real-time modal mandi rates across key agricultural hubs</p>
            </div>
            <button
              onClick={() => setCurrentView('market-prices')}
              className="text-xs font-semibold text-gov-secondary hover:underline"
            >
              Full Price Board →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Tomato */}
            <div className="p-3 rounded border border-gov-border bg-gov-bg hover:bg-gov-lightBlue/30 transition">
              <div className="text-lg">🍅</div>
              <div className="text-xs font-bold text-gov-primary mt-1">Tomato</div>
              <div className="text-sm font-extrabold text-gov-text mt-0.5">₹2,850/q</div>
              <div className="text-[11px] font-semibold text-gov-agri flex items-center mt-1">
                +8.4% <ArrowUpRight className="w-3 h-3" />
              </div>
              <div className="text-[10px] text-gov-muted mt-0.5">Pune Mandi</div>
            </div>

            {/* Onion */}
            <div className="p-3 rounded border border-gov-border bg-gov-bg hover:bg-gov-lightBlue/30 transition">
              <div className="text-lg">🧅</div>
              <div className="text-xs font-bold text-gov-primary mt-1">Onion</div>
              <div className="text-sm font-extrabold text-gov-text mt-0.5">₹2,420/q</div>
              <div className="text-[11px] font-semibold text-gov-agri flex items-center mt-1">
                +4.1% <ArrowUpRight className="w-3 h-3" />
              </div>
              <div className="text-[10px] text-gov-muted mt-0.5">Lasalgaon</div>
            </div>

            {/* Potato */}
            <div className="p-3 rounded border border-gov-border bg-gov-bg hover:bg-gov-lightBlue/30 transition">
              <div className="text-lg">🥔</div>
              <div className="text-xs font-bold text-gov-primary mt-1">Potato</div>
              <div className="text-sm font-extrabold text-gov-text mt-0.5">₹2,180/q</div>
              <div className="text-[11px] font-semibold text-red-600 flex items-center mt-1">
                -1.8% <ArrowDownRight className="w-3 h-3" />
              </div>
              <div className="text-[10px] text-gov-muted mt-0.5">Agra Mandi</div>
            </div>

            {/* Wheat */}
            <div className="p-3 rounded border border-gov-border bg-gov-bg hover:bg-gov-lightBlue/30 transition">
              <div className="text-lg">🌾</div>
              <div className="text-xs font-bold text-gov-primary mt-1">Wheat</div>
              <div className="text-sm font-extrabold text-gov-text mt-0.5">₹2,560/q</div>
              <div className="text-[11px] font-semibold text-gov-agri flex items-center mt-1">
                +2.6% <ArrowUpRight className="w-3 h-3" />
              </div>
              <div className="text-[10px] text-gov-muted mt-0.5">Indore Hub</div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-3 rounded bg-gov-lightBlue/50 border border-gov-secondary/20 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-gov-primary">
              <BrainCircuit className="w-4 h-4 text-gov-secondary flex-shrink-0" />
              <span>Tomato wholesale prices are rising due to 18% lower arrivals in western corridors.</span>
            </div>
            <button
              onClick={() => setCurrentView('price-ai')}
              className="text-gov-secondary font-bold hover:underline ml-2 flex-shrink-0"
            >
              Analyze Harvest
            </button>
          </div>
        </div>

        {/* Featured Tomato Lot & Smart Match Shortcut (1 col) */}
        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gov-border">
              <span className="text-xs font-bold text-gov-primary uppercase tracking-wider">Spotlight Lot</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-lightOrange text-gov-accent border border-gov-accent/30">
                OFFER RECEIVED
              </span>
            </div>

            <div className="mt-3 flex items-start space-x-3">
              <img
                src={tomatoLot.imageUrl}
                alt="Tomato"
                className="w-16 h-16 rounded object-cover border border-gov-border flex-shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-gov-text">Tomato (Hybrid Red)</h4>
                <p className="text-xs text-gov-muted">Lot ID: {tomatoLot.id}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs font-bold text-gov-primary">500 kg</span>
                  <span className="text-xs text-gov-muted">•</span>
                  <span className="text-xs font-bold text-gov-agri">Grade A (91/100)</span>
                </div>
              </div>
            </div>

            <div className="mt-3 bg-gov-bg p-2.5 rounded border border-gov-border text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gov-muted">Your Ask:</span>
                <span className="font-semibold text-gov-text">₹3,100 / q</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gov-muted">Top Buyer Offer:</span>
                <span className="font-bold text-gov-agri">₹3,200 / q (FreshMart)</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              id="dash-view-offers-btn"
              onClick={() => {
                setSelectedLotId(tomatoLot.id);
                setCurrentView('offers');
              }}
              className="w-full py-2 px-3 rounded bg-gov-agri hover:bg-green-800 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition shadow-xs"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Review ₹3,200/q Offer (Accept / Counter)</span>
            </button>
            <button
              id="dash-find-buyers-btn"
              onClick={() => {
                setSelectedLotId(tomatoLot.id);
                setCurrentView('buyer-matching');
              }}
              className="w-full py-2 px-3 rounded bg-gov-lightBlue hover:bg-blue-100 text-gov-primary text-xs font-semibold flex items-center justify-center space-x-1.5 border border-gov-secondary/30 transition"
            >
              <Users className="w-3.5 h-3.5 text-gov-secondary" />
              <span>Run Smart Buyer Matching (94% Match)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
        <div className="flex items-center justify-between pb-3 border-b border-gov-border">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gov-primary" />
            <h3 className="text-sm font-bold text-gov-primary">{t.recentActivity}</h3>
          </div>
          <span className="text-xs text-gov-muted">Verified timestamped trail</span>
        </div>

        <div className="divide-y divide-gov-border/60 mt-2">
          {RECENT_ACTIVITIES.map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="w-7 h-7 rounded-full bg-gov-lightBlue flex items-center justify-center text-gov-primary">
                  <CheckCircle2 className="w-4 h-4 text-gov-agri" />
                </div>
                <span className="font-medium text-gov-text">{act.text}</span>
              </div>
              <span className="text-gov-muted text-[11px] whitespace-nowrap pl-2">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
