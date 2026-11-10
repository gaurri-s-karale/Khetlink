import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Filter,
  Search,
  Calendar,
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit,
  Info
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

export const MarketPrices: React.FC = () => {
  const { marketPrices, setCurrentView, t } = useApp();

  const [selectedCropFilter, setSelectedCropFilter] = useState('All');
  const [selectedStateFilter, setSelectedStateFilter] = useState('All');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('All');
  const [activeChartCrop, setActiveChartCrop] = useState(marketPrices[0]);

  // Filtered prices
  const filtered = marketPrices.filter((record) => {
    if (selectedCropFilter !== 'All' && record.crop !== selectedCropFilter) return false;
    if (selectedStateFilter !== 'All' && record.state !== selectedStateFilter) return false;
    if (selectedDistrictFilter !== 'All' && record.district !== selectedDistrictFilter) return false;
    return true;
  });

  const crops = ['All', 'Tomato', 'Onion', 'Potato', 'Wheat', 'Soybean', 'Cotton'];
  const states = ['All', 'Maharashtra', 'Madhya Pradesh', 'Uttar Pradesh'];
  const districts = ['All', 'Pune', 'Nashik', 'Agra', 'Indore', 'Nagpur', 'Solapur'];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-gov-primary" />
            <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
              Market Price Intelligence
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-lightBlue text-gov-primary border border-gov-border">
              Demo market data
            </span>
          </div>
          <p className="text-sm text-gov-muted mt-1">
            Real-time modal mandi rates, arrival volumes, and 7-day trade trends across APMC markets.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="text-right">
            <span className="text-gov-muted block">Last updated:</span>
            <span className="font-bold text-gov-text">Today, 10:30 AM</span>
          </div>
          <button
            onClick={() => setCurrentView('price-ai')}
            className="px-3 py-2 rounded bg-gov-accent hover:bg-amber-600 text-white font-bold flex items-center space-x-1.5 shadow-sm transition"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Open Price AI</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-gov-border shadow-gov grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Crop Filter */}
        <div>
          <label className="block text-[11px] font-bold text-gov-muted uppercase mb-1">Crop</label>
          <select
            value={selectedCropFilter}
            onChange={(e) => setSelectedCropFilter(e.target.value)}
            className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2 text-gov-text focus:outline-none focus:border-gov-primary"
          >
            {crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-[11px] font-bold text-gov-muted uppercase mb-1">State</label>
          <select
            value={selectedStateFilter}
            onChange={(e) => setSelectedStateFilter(e.target.value)}
            className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2 text-gov-text focus:outline-none focus:border-gov-primary"
          >
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* District Filter */}
        <div>
          <label className="block text-[11px] font-bold text-gov-muted uppercase mb-1">District</label>
          <select
            value={selectedDistrictFilter}
            onChange={(e) => setSelectedDistrictFilter(e.target.value)}
            className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2 text-gov-text focus:outline-none focus:border-gov-primary"
          >
            {districts.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Date / Mandi Filter indicator */}
        <div>
          <label className="block text-[11px] font-bold text-gov-muted uppercase mb-1">Reporting Date</label>
          <div className="flex items-center text-xs bg-gov-bg border border-gov-border rounded p-2 text-gov-text">
            <Calendar className="w-3.5 h-3.5 text-gov-muted mr-2" />
            <span>03 Sept 2026 (Live)</span>
          </div>
        </div>
      </div>

      {/* 7-Day Trend Chart for Selected Crop */}
      <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gov-border gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{activeChartCrop.cropIcon}</span>
              <h2 className="text-base font-bold text-gov-primary">
                {activeChartCrop.crop} 7-Day Mandi Price Curve — {activeChartCrop.mandi}
              </h2>
            </div>
            <p className="text-xs text-gov-muted mt-0.5">
              Current Modal Rate: <span className="font-bold text-gov-text">₹{activeChartCrop.modalPrice.toLocaleString('en-IN')}/q</span> (Daily Movement: {activeChartCrop.dailyChangePercent > 0 ? '+' : ''}{activeChartCrop.dailyChangePercent}%)
            </p>
          </div>

          {/* Switch Chart Crop */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {marketPrices.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveChartCrop(p)}
                className={`px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap transition ${
                  activeChartCrop.id === p.id
                    ? 'bg-gov-primary text-white'
                    : 'bg-gov-bg text-gov-muted hover:text-gov-primary border border-gov-border'
                }`}
              >
                {p.crop}
              </button>
            ))}
          </div>
        </div>

        {/* Recharts Line Chart */}
        <div className="h-64 mt-4 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activeChartCrop.historical7Days} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(val) => `₹${val}`} />
              <Tooltip
                formatter={(val: any) => [typeof val === 'number' ? `₹${val.toLocaleString('en-IN')}/q` : (val ?? ''), 'Modal Price']}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ backgroundColor: '#123B63', color: '#fff', borderRadius: '4px', fontSize: '12px', border: 'none' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#1E5AA8"
                strokeWidth={3}
                dot={{ r: 4, fill: '#1E5AA8' }}
                activeDot={{ r: 6, fill: '#2E7D32' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Prices Table */}
      <div className="bg-white rounded-lg border border-gov-border shadow-gov overflow-hidden">
        <div className="p-4 border-b border-gov-border flex items-center justify-between">
          <h3 className="text-sm font-bold text-gov-primary">Wholesale Mandi Table</h3>
          <span className="text-xs text-gov-muted">{filtered.length} Mandis Reporting</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gov-bg border-b border-gov-border text-[11px] font-bold text-gov-muted uppercase tracking-wider">
                <th className="p-3.5">Crop</th>
                <th className="p-3.5">Mandi / Market</th>
                <th className="p-3.5">Modal Price</th>
                <th className="p-3.5">Min / Max</th>
                <th className="p-3.5">Daily Change</th>
                <th className="p-3.5">Daily Arrivals</th>
                <th className="p-3.5">Demand</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-border text-xs">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gov-lightBlue/20 transition">
                  <td className="p-3.5 font-bold text-gov-primary flex items-center space-x-2">
                    <span className="text-base">{item.cropIcon}</span>
                    <span>{item.crop}</span>
                  </td>
                  <td className="p-3.5 text-gov-text font-medium">
                    <div>{item.mandi}</div>
                    <div className="text-[10px] text-gov-muted">{item.district}, {item.state}</div>
                  </td>
                  <td className="p-3.5 font-extrabold text-gov-primary">
                    ₹{item.modalPrice.toLocaleString('en-IN')}<span className="text-[10px] font-normal text-gov-muted">/q</span>
                  </td>
                  <td className="p-3.5 text-gov-muted">
                    ₹{item.minPrice} – ₹{item.maxPrice}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`inline-flex items-center font-bold ${
                        item.dailyChangePercent >= 0 ? 'text-gov-agri' : 'text-red-600'
                      }`}
                    >
                      {item.dailyChangePercent >= 0 ? (
                        <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                      )}
                      {item.dailyChangePercent > 0 ? '+' : ''}{item.dailyChangePercent}%
                    </span>
                  </td>
                  <td className="p-3.5 text-gov-text font-medium">
                    {item.arrivalsTonnes} Tonnes
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.demandLevel === 'HIGH'
                          ? 'bg-gov-lightGreen text-gov-agri border border-gov-agri/30'
                          : 'bg-gov-lightBlue text-gov-secondary border border-gov-secondary/30'
                      }`}
                    >
                      {item.demandLevel}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setActiveChartCrop(item);
                        setCurrentView('price-ai');
                      }}
                      className="px-2.5 py-1 rounded bg-gov-lightBlue hover:bg-blue-100 text-gov-primary font-semibold text-[11px] border border-gov-secondary/30 transition"
                    >
                      Analyze AI →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
