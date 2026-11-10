import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BrainCircuit,
  TrendingUp,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { runPriceAIPrediction } from '../../services/priceAiService';
import { PricePredictionInput, PricePredictionResult } from '../../types';

export const PriceAI: React.FC = () => {
  const { setCurrentView, t } = useApp();

  const [formData, setFormData] = useState<PricePredictionInput>({
    crop: 'Tomato',
    location: 'Pune APMC (Gultekdi)',
    quantityKg: 500,
    currentPrice: 2850,
    expectedSellingDays: 3,
    storageAvailability: 'Cold Storage'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PricePredictionResult>(() =>
    runPriceAIPrediction(formData)
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const pred = runPriceAIPrediction(formData);
      setResult(pred);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <BrainCircuit className="w-6 h-6 text-gov-primary" />
              <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
                {t.priceAI}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                Decision Support Engine
              </span>
            </div>
            <p className="text-sm text-gov-muted mt-1">
              Get an algorithmic, AI-assisted recommendation on whether to sell immediately or hold for optimal returns.
            </p>
          </div>

          <div className="text-xs text-gov-muted bg-gov-bg p-2.5 rounded border border-gov-border flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-gov-accent flex-shrink-0" />
            <span>Advisory only • Based on arrivals and price volatility patterns</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-gov-border shadow-gov space-y-4">
          <div className="border-b border-gov-border pb-3">
            <h2 className="text-base font-bold text-gov-primary">Harvest & Storage Parameters</h2>
            <p className="text-xs text-gov-muted">Input your lot details for targeted price projections</p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Crop */}
            <div>
              <label className="block text-xs font-bold text-gov-text mb-1">Crop Type</label>
              <select
                id="price-ai-crop-select"
                value={formData.crop}
                onChange={(e) => {
                  const crop = e.target.value;
                  const price = crop === 'Tomato' ? 2850 : crop === 'Onion' ? 2420 : 2180;
                  setFormData({ ...formData, crop, currentPrice: price });
                }}
                className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
              >
                <option value="Tomato">Tomato (Hybrid Red)</option>
                <option value="Onion">Onion (Garwa / Rabi)</option>
                <option value="Potato">Potato (Kufri Jyoti)</option>
                <option value="Wheat">Wheat (Sharbati)</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gov-text mb-1">Primary Mandi / Cluster</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
              />
            </div>

            {/* Quantity & Current Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  value={formData.quantityKg}
                  onChange={(e) => setFormData({ ...formData, quantityKg: Number(e.target.value) })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Current Price (₹/q)</label>
                <input
                  type="number"
                  value={formData.currentPrice}
                  onChange={(e) => setFormData({ ...formData, currentPrice: Number(e.target.value) })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>
            </div>

            {/* Expected Selling Window */}
            <div>
              <label className="block text-xs font-bold text-gov-text mb-1">Evaluation Window</label>
              <select
                value={formData.expectedSellingDays}
                onChange={(e) => setFormData({ ...formData, expectedSellingDays: Number(e.target.value) })}
                className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
              >
                <option value={3}>Next 2–3 Days (Short term)</option>
                <option value={7}>Next 5–7 Days (Medium term)</option>
                <option value={14}>Next 14 Days (Extended hold)</option>
              </select>
            </div>

            {/* Storage Availability */}
            <div>
              <label className="block text-xs font-bold text-gov-text mb-1">Post-Harvest Storage Facility</label>
              <select
                value={formData.storageAvailability}
                onChange={(e) => setFormData({ ...formData, storageAvailability: e.target.value as any })}
                className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
              >
                <option value="Cold Storage">Cold Storage Unit (Controlled Temp)</option>
                <option value="Warehouse / Dry Godown">Warehouse / Dry Ventilated Godown</option>
                <option value="Farm Storage (Ambient)">Farm Storage (Crates / Ambient)</option>
              </select>
            </div>

            <button
              id="price-ai-submit-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs tracking-wider uppercase transition flex items-center justify-center space-x-2 shadow-gov"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>ANALYZING MARKET ARRIVALS...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-gov-accent" />
                  <span>{t.generateRecommendation}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: AI Recommendation & Chart (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Recommendation Card */}
          <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
            <div className="flex items-center justify-between pb-3 border-b border-gov-border">
              <span className="text-xs font-bold text-gov-muted uppercase tracking-wider">AI RECOMMENDATION</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                Confidence: {result.confidencePercent}%
              </span>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-gov-lightOrange/30 border border-gov-accent/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-gov-accent uppercase tracking-wider">Recommended Action</span>
                <div className="text-2xl font-black text-gov-accent tracking-tight mt-0.5">
                  {result.recommendationDuration}
                </div>
                <p className="text-xs text-gov-text font-medium mt-1">
                  Optimal selling window based on simulated supply-side contractions.
                </p>
              </div>

              <div className="bg-white p-3 rounded border border-gov-border text-right min-w-[150px]">
                <div className="text-[11px] text-gov-muted">Expected Price</div>
                <div className="text-lg font-black text-gov-primary mt-0.5">
                  ₹{result.expectedPriceMin}–₹{result.expectedPriceMax} <span className="text-xs font-normal text-gov-muted">/q</span>
                </div>
                <div className="text-xs font-bold text-gov-agri mt-0.5">
                  Expected Gain: {result.expectedMovementPercent}
                </div>
              </div>
            </div>

            {/* Why This Recommendation? */}
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-bold text-gov-primary uppercase tracking-wider">Why this advisory?</h4>
              <ul className="space-y-1.5 text-xs text-gov-text">
                {result.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gov-agri flex-shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Forecast Chart */}
            <div className="mt-5 pt-4 border-t border-gov-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gov-primary">Historical vs Projected Price Band</span>
                <div className="flex items-center space-x-3 text-[11px]">
                  <span className="flex items-center space-x-1 text-gov-secondary font-medium">
                    <span className="w-3 h-0.5 bg-gov-secondary inline-block"></span>
                    <span>Historical</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gov-agri font-bold">
                    <span className="w-3 h-0.5 bg-gov-agri border-b border-dashed inline-block"></span>
                    <span>AI Forecast</span>
                  </span>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.historicalSeries} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748B' }} />
                    <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip
                      formatter={(val: any) => [typeof val === 'number' ? `₹${val.toLocaleString('en-IN')}/q` : (val ?? ''), 'Price']}
                      contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <ReferenceLine x="Today" stroke="#E88919" strokeDasharray="3 3" label={{ value: 'Today', fill: '#E88919', fontSize: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#1E5AA8"
                      strokeWidth={2.5}
                      dot={{ r: 3, fill: '#1E5AA8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Disclaimer & Next Step CTA */}
            <div className="mt-4 pt-3 border-t border-gov-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-[11px] text-gov-muted italic flex items-center">
                <ShieldAlert className="w-3.5 h-3.5 mr-1 text-gov-muted flex-shrink-0" />
                {result.marketAdvisoryNote}
              </p>
              <button
                id="price-ai-proceed-quality-btn"
                onClick={() => setCurrentView('quality-ai')}
                className="px-4 py-2 rounded bg-gov-agri hover:bg-green-800 text-white font-bold flex items-center space-x-1.5 transition whitespace-nowrap shadow-xs"
              >
                <span>Assess Produce Quality →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
