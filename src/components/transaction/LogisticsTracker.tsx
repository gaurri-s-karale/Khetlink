import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Thermometer,
  ShieldCheck,
  Navigation,
  ExternalLink
} from 'lucide-react';

export const LogisticsTracker: React.FC = () => {
  const { logistics, setCurrentView, t } = useApp();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Truck className="w-6 h-6 text-gov-primary" />
            <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
              {t.logistics} & Farmgate Fleet
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
              Live Telematics Active
            </span>
          </div>
          <p className="text-sm text-gov-muted mt-1">
            End-to-end multi-modal dispatch tracking from farmgate loading dock to buyer regional warehouse.
          </p>
        </div>

        <div className="text-xs text-gov-muted bg-gov-bg p-2.5 rounded border border-gov-border">
          <span>Consignment ID: {logistics.id} • Transaction: {logistics.transactionId}</span>
        </div>
      </div>

      {/* Main Tracking Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Dispatch & Vehicle Telematics (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-gov-border shadow-gov space-y-4">
          <div className="border-b border-gov-border pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gov-primary">Assigned Transport Vehicle</h3>
              <p className="text-xs text-gov-muted">Cold-chain insulated reefer carrier</p>
            </div>
            <span className="font-mono text-xs font-black bg-gov-lightBlue text-gov-primary px-2.5 py-1 rounded border border-gov-border">
              {logistics.vehicleNumber}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded bg-gov-bg border border-gov-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gov-muted">Driver:</span>
                <span className="font-bold text-gov-text">{logistics.driverName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gov-muted">Driver Contact:</span>
                <span className="font-bold text-gov-primary flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  {logistics.driverPhone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gov-muted">IoT Sensor Temp:</span>
                <span className="font-bold text-gov-agri flex items-center">
                  <Thermometer className="w-3.5 h-3.5 mr-0.5 text-gov-agri" />
                  12.4°C (Optimized for Tomato shelf life)
                </span>
              </div>
            </div>

            <div className="p-3 rounded bg-gov-bg border border-gov-border space-y-2">
              <div>
                <span className="text-[11px] font-bold text-gov-muted uppercase block">Origin Loading Cluster:</span>
                <span className="font-semibold text-gov-text block mt-0.5">{logistics.originCluster}</span>
              </div>
              <div className="pt-2 border-t border-gov-border/60">
                <span className="text-[11px] font-bold text-gov-muted uppercase block">Destination Warehouse:</span>
                <span className="font-semibold text-gov-text block mt-0.5">{logistics.destinationWarehouse}</span>
              </div>
              <div className="pt-2 border-t border-gov-border/60 flex justify-between">
                <span className="text-gov-muted">Estimated Hub Arrival:</span>
                <span className="font-bold text-gov-primary">{logistics.estimatedDeliveryTime}</span>
              </div>
            </div>

            {/* Distance Progress */}
            <div className="p-3 rounded bg-gov-lightBlue/30 border border-gov-secondary/20 space-y-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-gov-primary">Route Progress:</span>
                <span className="font-bold text-gov-primary">{logistics.distanceKmCovered} km / {logistics.distanceKmTotal} km</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gov-agri h-full rounded-full transition-all"
                  style={{ width: `${Math.round((logistics.distanceKmCovered / logistics.distanceKmTotal) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-gov-muted block">
                Current GPS: {logistics.currentGpsLocation}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Map Simulation & Milestone Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Simulated Route Visualizer */}
          <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gov-primary uppercase tracking-wider">
                Corridor GPS Telematics (Simulated)
              </span>
              <span className="text-[10px] text-gov-agri font-bold flex items-center">
                <span className="w-2 h-2 rounded-full bg-gov-agri animate-ping mr-1.5" />
                Live GPS Feed
              </span>
            </div>

            {/* SVG Visual Map Box */}
            <div className="h-44 w-full bg-[#E2E8F0]/60 rounded border border-gov-border relative overflow-hidden flex items-center justify-center p-4">
              <svg className="w-full h-full" viewBox="0 0 400 120">
                {/* Route line background */}
                <path d="M 40 60 Q 150 20 220 70 T 360 60" fill="none" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
                {/* Route line traversed */}
                <path d="M 40 60 Q 150 20 220 70" fill="none" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round" />

                {/* Point Origin */}
                <circle cx="40" cy="60" r="7" fill="#123B63" stroke="#fff" strokeWidth="2" />
                <text x="25" y="85" fontSize="9" fontWeight="bold" fill="#123B63">Farm Cluster</text>

                {/* Truck Current Position */}
                <g transform="translate(220, 70)">
                  <circle cx="0" cy="0" r="10" fill="#E88919" stroke="#fff" strokeWidth="2" />
                  <circle cx="0" cy="0" r="18" fill="none" stroke="#E88919" strokeWidth="1.5" opacity="0.5" className="animate-ping" />
                  <text x="-15" y="-14" fontSize="9" fontWeight="bold" fill="#E88919">MH-12 (Km 18)</text>
                </g>

                {/* Point Destination */}
                <circle cx="360" cy="60" r="7" fill="#1E5AA8" stroke="#fff" strokeWidth="2" />
                <text x="315" y="85" fontSize="9" fontWeight="bold" fill="#1E5AA8">FreshMart Hub</text>
              </svg>
            </div>
          </div>

          {/* 5-Step Milestone Timeline */}
          <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
            <h3 className="text-xs font-bold text-gov-primary uppercase tracking-wider mb-4">
              Consignment Milestones & Chain of Custody
            </h3>

            <div className="space-y-4">
              {logistics.timeline.map((step, idx) => {
                const isCurrent = step.status === logistics.currentStatus;
                return (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.completed
                            ? 'bg-gov-agri text-white shadow-xs'
                            : isCurrent
                            ? 'bg-gov-accent text-white ring-4 ring-amber-100 animate-pulse'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {step.completed ? '✓' : idx + 1}
                      </div>
                      {idx < logistics.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-8 mt-1 ${
                            step.completed ? 'bg-gov-agri' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-gov-primary">{step.status}</h4>
                        <span className="text-[10px] text-gov-muted">{step.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-gov-muted mt-0.5">{step.locationNote}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
