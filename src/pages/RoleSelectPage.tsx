import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, ShoppingBag, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const RoleSelectPage: React.FC = () => {
  const { setUserRole, setCurrentView, setIsDemoModeActive, setDemoStep } = useApp();

  const handleSelectFarmer = () => {
    setUserRole('farmer');
    setCurrentView('dashboard');
    setIsDemoModeActive(true);
    setDemoStep(1);
  };

  const handleSelectBuyer = () => {
    setUserRole('buyer');
    setCurrentView('buyer-dashboard');
  };

  return (
    <div className="min-h-screen bg-gov-bg flex flex-col justify-center items-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Top Return link & Badge */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('landing')}
            className="text-xs font-semibold text-gov-secondary hover:underline flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-gov-lightBlue text-gov-primary border border-gov-border">
            Demo Portal
          </span>
        </div>

        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-gov-primary text-white font-black text-2xl flex items-center justify-center mx-auto shadow-gov">
            <span>K</span><span className="text-gov-accent text-sm ml-0.5">L</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gov-primary tracking-tight">
            Welcome to KhetLink
          </h1>
          <p className="text-xs sm:text-sm text-gov-muted max-w-md mx-auto">
            Choose your demo persona to explore the agricultural market linkage system.
          </p>
        </div>

        {/* Two Large Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Farmer Card */}
          <div className="bg-white rounded-lg border border-gov-border hover:border-gov-primary shadow-gov p-6 space-y-4 flex flex-col justify-between transition group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-gov-lightGreen text-gov-agri flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gov-agri uppercase tracking-wider">PRODUCER / FPO</span>
                <h2 className="text-xl font-bold text-gov-primary mt-0.5">FARMER</h2>
                <p className="text-xs text-gov-muted mt-1 leading-relaxed">
                  "Sell smarter and reach better buyers."
                </p>
              </div>

              <ul className="text-[11px] text-gov-text space-y-1 pt-1">
                <li>• Real-time APMC mandi prices</li>
                <li>• AI sell / hold harvest advisories</li>
                <li>• Computer vision produce grading</li>
                <li>• Instant high-fit buyer matching</li>
              </ul>
            </div>

            <button
              id="role-select-farmer-btn"
              onClick={handleSelectFarmer}
              className="w-full py-3 px-4 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Continue as Farmer</span>
              <ArrowRight className="w-4 h-4 text-gov-accent" />
            </button>
          </div>

          {/* Buyer Card */}
          <div className="bg-white rounded-lg border border-gov-border hover:border-gov-secondary shadow-gov p-6 space-y-4 flex flex-col justify-between transition group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-gov-lightBlue text-gov-secondary flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gov-secondary uppercase tracking-wider">PROCUREMENT / TRADER</span>
                <h2 className="text-xl font-bold text-gov-primary mt-0.5">BUYER</h2>
                <p className="text-xs text-gov-muted mt-1 leading-relaxed">
                  "Source quality produce directly from farmers."
                </p>
              </div>

              <ul className="text-[11px] text-gov-text space-y-1 pt-1">
                <li>• AI-certified lot specifications</li>
                <li>• Transparent electronic bidding</li>
                <li>• Direct farmgate pickup logistics</li>
                <li>• Secure smart contract settlement</li>
              </ul>
            </div>

            <button
              id="role-select-buyer-btn"
              onClick={handleSelectBuyer}
              className="w-full py-3 px-4 rounded bg-gov-secondary hover:bg-gov-primary text-white font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center space-x-2"
            >
              <span>Continue as Buyer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Privacy / Security Notice */}
        <div className="bg-gov-lightBlue/30 border border-gov-secondary/20 rounded p-3 text-center text-[11px] text-gov-muted flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-gov-secondary flex-shrink-0" />
          <span>
            Prototype Mode: Instant demo login enabled without real OTP or identity credentials. No sensitive personal data requested.
          </span>
        </div>
      </div>
    </div>
  );
};
