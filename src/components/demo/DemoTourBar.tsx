import React from 'react';
import { useApp } from '../../context/AppContext';
import { ChevronLeft, ChevronRight, Play, CheckCircle2, RotateCcw, X, Info } from 'lucide-react';
import { AppView } from '../../context/AppContext';

interface TourStepInfo {
  step: number;
  title: string;
  summary: string;
  targetView: AppView;
}

export const DEMO_STEPS: TourStepInfo[] = [
  {
    step: 1,
    title: 'Farmer Dashboard',
    summary: 'Farmer opens KhetLink and reviews morning market intelligence cards and active farm lots.',
    targetView: 'dashboard'
  },
  {
    step: 2,
    title: 'Tomato Market Price Check',
    summary: 'Farmer inspects Pune Mandi Tomato prices (₹2,850/q, +8.4% surge, 142T arrivals).',
    targetView: 'market-prices'
  },
  {
    step: 3,
    title: 'Open Price AI',
    summary: 'Farmer accesses algorithmic price forecasting to evaluate selling timing vs holding.',
    targetView: 'price-ai'
  },
  {
    step: 4,
    title: 'Generate HOLD Recommendation',
    summary: 'AI analyzes declining mandi arrivals and forecasts +7% to +10% gain (HOLD FOR 2–3 DAYS).',
    targetView: 'price-ai'
  },
  {
    step: 5,
    title: 'Open Quality AI',
    summary: 'Farmer accesses computer vision produce grading to objectively certify quality.',
    targetView: 'quality-ai'
  },
  {
    step: 6,
    title: 'Select Tomato Sample Image',
    summary: 'Produce image is analyzed for skin defects, color uniformity, and size calibration.',
    targetView: 'quality-ai'
  },
  {
    step: 7,
    title: 'Grade A Assessment Result',
    summary: 'AI assigns Grade A (Score: 91/100, High freshness, Low defects, Premium Export tier).',
    targetView: 'quality-ai'
  },
  {
    step: 8,
    title: 'Create 500 kg Digital Lot',
    summary: 'Assessment details pre-populate digital lot KHL-TOM-1024 at ₹3,100/q base price.',
    targetView: 'create-lot'
  },
  {
    step: 9,
    title: 'Run Smart Buyer Matching',
    summary: 'Multi-factor prototype matching engine computes compatibility across price, grade, and logistics.',
    targetView: 'buyer-matching'
  },
  {
    step: 10,
    title: 'FreshMart Foods Match (94%)',
    summary: 'FreshMart Foods identified as #1 match with 94% composite compatibility score.',
    targetView: 'buyer-matching'
  },
  {
    step: 11,
    title: 'Inspect Buyer Profile',
    summary: 'Farmer verifies KYC credentials, 4.8 rating, and 98% on-time settlement record.',
    targetView: 'buyer-profile'
  },
  {
    step: 12,
    title: 'Receive Premium Offer (₹3,200/q)',
    summary: 'FreshMart submits a formal digital purchase order offering ₹3,200/q for 500 kg (Total: ₹16,000).',
    targetView: 'offers'
  },
  {
    step: 13,
    title: 'Farmer Accepts Offer',
    summary: 'Farmer clicks "ACCEPT OFFER", initiating smart contract lock and digital escrow.',
    targetView: 'offers'
  },
  {
    step: 14,
    title: 'Transaction Confirmed',
    summary: 'Instant legal electronic settlement KHL-TXN-2026-1024 with digital receipt created.',
    targetView: 'transactions'
  },
  {
    step: 15,
    title: 'Track Logistics & Reefer Transit',
    summary: 'Farmgate dispatch assigned to Reefer Vehicle MH-12-AB-1234 with cold-chain tracking.',
    targetView: 'logistics'
  },
  {
    step: 16,
    title: 'Digital Trust Record Built',
    summary: 'Successful transaction updates verified trading history supporting future creditworthiness.',
    targetView: 'profile'
  }
];

export const DemoTourBar: React.FC = () => {
  const {
    demoStep,
    setDemoStep,
    isDemoModeActive,
    setIsDemoModeActive,
    setCurrentView,
    resetDemoData
  } = useApp();

  if (!isDemoModeActive) return null;

  const currentStepInfo = DEMO_STEPS.find((s) => s.step === demoStep) || DEMO_STEPS[0];

  const handleStepChange = (targetStep: number) => {
    setDemoStep(targetStep);
    const stepData = DEMO_STEPS.find((s) => s.step === targetStep);
    if (stepData) {
      setCurrentView(stepData.targetView);
    }
  };

  return (
    <div className="bg-[#123B63] text-white border-b border-gov-secondary/40 shadow-gov-md px-4 py-3 sticky top-16 z-30 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Step Badge & Narrative */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 bg-gov-accent text-white px-2.5 py-1 rounded text-xs font-bold tracking-wide">
            STEP {currentStepInfo.step} OF 16
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-white tracking-tight">
                {currentStepInfo.title}
              </h3>
              <span className="text-[11px] text-gov-lightBlue/80 hidden sm:inline">
                (Interactive Walkthrough)
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5 line-clamp-1 max-w-2xl">
              {currentStepInfo.summary}
            </p>
          </div>
        </div>

        {/* Right: Interactive Navigation Controls */}
        <div className="flex items-center space-x-2 self-end md:self-auto">
          {/* Direct Step Selector */}
          <select
            id="demo-step-dropdown"
            value={demoStep}
            onChange={(e) => handleStepChange(Number(e.target.value))}
            className="bg-gov-primary text-white text-xs border border-gov-border/40 rounded px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-gov-accent"
          >
            {DEMO_STEPS.map((s) => (
              <option key={s.step} value={s.step}>
                Step {s.step}: {s.title}
              </option>
            ))}
          </select>

          {/* Prev Button */}
          <button
            id="demo-step-prev-btn"
            onClick={() => handleStepChange(Math.max(1, demoStep - 1))}
            disabled={demoStep === 1}
            className="px-2.5 py-1.5 rounded bg-gov-secondary/60 hover:bg-gov-secondary text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Next Button */}
          <button
            id="demo-step-next-btn"
            onClick={() => handleStepChange(Math.min(16, demoStep + 1))}
            disabled={demoStep === 16}
            className="px-3 py-1.5 rounded bg-gov-accent hover:bg-amber-600 text-white text-xs font-bold shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            <span>{demoStep === 16 ? 'Completed' : 'Next Step'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Reset Demo */}
          <button
            onClick={resetDemoData}
            title="Reset to initial state"
            className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-gov-secondary/40 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Close Tour Bar */}
          <button
            onClick={() => setIsDemoModeActive(false)}
            title="Exit Demo Mode"
            className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-gov-secondary/40 text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Step Progress Bar */}
      <div className="mt-2.5 w-full bg-gov-primary/80 h-1.5 rounded-full overflow-hidden flex">
        {DEMO_STEPS.map((s) => (
          <div
            key={s.step}
            onClick={() => handleStepChange(s.step)}
            className={`flex-1 cursor-pointer transition-all border-r border-gov-primary/40 ${
              s.step < demoStep
                ? 'bg-gov-agri'
                : s.step === demoStep
                ? 'bg-gov-accent animate-pulse'
                : 'bg-slate-700/60 hover:bg-slate-600'
            }`}
            title={`Step ${s.step}: ${s.title}`}
          />
        ))}
      </div>
    </div>
  );
};
