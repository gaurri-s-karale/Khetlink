import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  BrainCircuit,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Package,
  Truck,
  Receipt,
  FileCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setUserRole, setIsDemoModeActive, setDemoStep, t } = useApp();

  const handleStartFarmerDemo = () => {
    setUserRole('farmer');
    setCurrentView('dashboard');
    setIsDemoModeActive(true);
    setDemoStep(1);
  };

  const handleStartBuyerDemo = () => {
    setUserRole('buyer');
    setCurrentView('buyer-dashboard');
  };

  return (
    <div className="min-h-screen bg-gov-bg flex flex-col justify-between">
      {/* Landing Nav */}
      <nav className="bg-gov-card border-b border-gov-border sticky top-0 z-30 shadow-gov">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="w-9 h-9 rounded bg-gov-primary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                <span>K</span><span className="text-gov-accent text-xs">L</span>
              </div>
              <div>
                <span className="text-lg font-bold text-gov-primary">{t.appName}</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-gov-text">
              <button onClick={() => setCurrentView('landing')} className="text-gov-primary hover:underline">
                Home
              </button>
              <a href="#how-it-works" className="hover:text-gov-primary transition">
                How It Works
              </a>
              <button onClick={() => { setUserRole('farmer'); setCurrentView('market-prices'); }} className="hover:text-gov-primary transition">
                Market Prices
              </button>
              <button onClick={handleStartFarmerDemo} className="hover:text-gov-primary transition">
                For Farmers
              </button>
              <button onClick={handleStartBuyerDemo} className="hover:text-gov-primary transition">
                For Buyers
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentView('login')}
                className="px-3 py-1.5 rounded text-xs font-bold text-gov-primary bg-gov-lightBlue hover:bg-blue-100 border border-gov-secondary/30 transition"
              >
                Demo Login
              </button>
              <button
                onClick={handleStartFarmerDemo}
                className="px-3.5 py-1.5 rounded text-xs font-bold text-white bg-gov-primary hover:bg-gov-secondary transition shadow-sm"
              >
                Launch App →
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white border-b border-gov-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gov-lightGreen text-gov-agri text-xs font-bold border border-gov-agri/30">
            <span className="w-2 h-2 rounded-full bg-gov-agri animate-pulse"></span>
            <span>AGRICULTURAL MARKET LINKAGE PLATFORM</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-gov-primary tracking-tight">
              KHETLINK
            </h1>
            <p className="text-lg sm:text-2xl font-bold text-gov-agri">
              "{t.tagline}"
            </p>
            <p className="text-sm sm:text-base text-gov-muted max-w-2xl mx-auto leading-relaxed pt-1">
              An AI-powered agricultural market-linkage platform helping farmers make informed selling decisions and connect with reliable buyers.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              id="landing-hero-farmer-cta"
              onClick={handleStartFarmerDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-gov-primary hover:bg-gov-secondary text-white font-bold text-sm shadow-gov transition flex items-center justify-center space-x-2"
            >
              <span>Try Farmer Demo</span>
              <ArrowRight className="w-4 h-4 text-gov-accent" />
            </button>

            <button
              id="landing-hero-buyer-cta"
              onClick={handleStartBuyerDemo}
              className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-gov-lightBlue hover:bg-blue-100 text-gov-primary font-bold text-sm border border-gov-secondary/40 transition flex items-center justify-center space-x-2"
            >
              <span>Try Buyer Demo</span>
            </button>
          </div>

          {/* Trust Banner */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gov-muted">
            <span className="flex items-center">
              <ShieldCheck className="w-4 h-4 text-gov-agri mr-1.5" />
              Verified APMC Data
            </span>
            <span className="flex items-center">
              <BrainCircuit className="w-4 h-4 text-gov-secondary mr-1.5" />
              Algorithmic Price Forecast
            </span>
            <span className="flex items-center">
              <Sparkles className="w-4 h-4 text-gov-accent mr-1.5" />
              CV Quality Grading
            </span>
            <span className="flex items-center">
              <Lock className="w-4 h-4 text-gov-primary mr-1.5" />
              Direct Escrow Settlement
            </span>
          </div>
        </div>
      </section>

      {/* 4 Capability Cards */}
      <section className="py-12 bg-gov-bg border-b border-gov-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-gov-muted uppercase tracking-wider">CORE PILLARS</span>
            <h2 className="text-2xl font-black text-gov-primary">Integrated Digital Agriculture Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov space-y-3 hover:border-gov-secondary transition">
              <div className="w-10 h-10 rounded bg-gov-lightBlue flex items-center justify-center text-gov-primary">
                <TrendingUp className="w-5 h-5 text-gov-secondary" />
              </div>
              <h3 className="text-base font-bold text-gov-primary">LIVE PRICE DISCOVERY</h3>
              <p className="text-xs text-gov-muted leading-relaxed">
                Real-time and updated market intelligence across key agricultural mandi hubs with 7-day volatility trends.
              </p>
              <button
                onClick={() => { setUserRole('farmer'); setCurrentView('market-prices'); }}
                className="text-xs font-semibold text-gov-secondary hover:underline flex items-center pt-2"
              >
                <span>Check Mandi Rates →</span>
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov space-y-3 hover:border-gov-accent transition">
              <div className="w-10 h-10 rounded bg-gov-lightOrange flex items-center justify-center text-gov-accent">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gov-primary">PRICE AI</h3>
              <p className="text-xs text-gov-muted leading-relaxed">
                Algorithmic Sell or Hold advisory engine factoring arrivals, weather disruptions, and cold-storage economics.
              </p>
              <button
                onClick={() => { setUserRole('farmer'); setCurrentView('price-ai'); }}
                className="text-xs font-semibold text-gov-accent hover:underline flex items-center pt-2"
              >
                <span>Run Forecast Advisory →</span>
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov space-y-3 hover:border-gov-agri transition">
              <div className="w-10 h-10 rounded bg-gov-lightGreen flex items-center justify-center text-gov-agri">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gov-primary">QUALITY AI</h3>
              <p className="text-xs text-gov-muted leading-relaxed">
                AI-assisted produce quality assessment and blemish analysis providing standardized digital grade certification.
              </p>
              <button
                onClick={() => { setUserRole('farmer'); setCurrentView('quality-ai'); }}
                className="text-xs font-semibold text-gov-agri hover:underline flex items-center pt-2"
              >
                <span>Scan Produce Photo →</span>
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov space-y-3 hover:border-gov-primary transition">
              <div className="w-10 h-10 rounded bg-gov-lightBlue flex items-center justify-center text-gov-primary">
                <Users className="w-5 h-5 text-gov-primary" />
              </div>
              <h3 className="text-base font-bold text-gov-primary">SMART BUYER MATCHING</h3>
              <p className="text-xs text-gov-muted leading-relaxed">
                Multi-factor compatibility engine matching farmer lots with institutional buyers by price, grade, quantity, and radius.
              </p>
              <button
                onClick={() => { setUserRole('farmer'); setCurrentView('buyer-matching'); }}
                className="text-xs font-semibold text-gov-primary hover:underline flex items-center pt-2"
              >
                <span>Discover Buyers →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How KhetLink Works Journey Section */}
      <section id="how-it-works" className="py-14 bg-white border-b border-gov-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-gov-muted uppercase tracking-wider">END-TO-END FLOW</span>
            <h2 className="text-2xl font-black text-gov-primary">How KhetLink Connects the Agricultural Ecosystem</h2>
            <p className="text-xs sm:text-sm text-gov-muted max-w-2xl mx-auto">
              A transparent, seamless transition from harvest discovery to electronic payment clearance.
            </p>
          </div>

          {/* Linear Journey Diagram */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 text-center text-xs">
            {[
              { step: '1', title: 'Farmer', icon: '👨‍🌾' },
              { step: '2', title: 'Market Price', icon: '📈' },
              { step: '3', title: 'AI Decision', icon: '🧠' },
              { step: '4', title: 'Quality Check', icon: '🔍' },
              { step: '5', title: 'Digital Lot', icon: '📦' },
              { step: '6', title: 'Buyer Match', icon: '🤝' },
              { step: '7', title: 'Deal', icon: '📝' },
              { step: '8', title: 'Delivery', icon: '🚚' },
              { step: '9', title: 'Transaction Record', icon: '🧾' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded border border-gov-border bg-gov-bg flex flex-col items-center justify-between">
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-bold text-gov-muted mt-1 uppercase">Step {item.step}</span>
                <span className="font-bold text-gov-primary mt-0.5 text-xs">{item.title}</span>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={handleStartFarmerDemo}
              className="px-6 py-3 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs shadow-gov transition"
            >
              Start Interactive Platform Demo →
            </button>
          </div>
        </div>
      </section>

      {/* Institutional Public Service Footer */}
      <footer className="bg-gov-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-300 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-gov-secondary/40">
            <div>
              <span className="text-lg font-bold text-white tracking-tight">KHETLINK</span>
              <p className="text-[11px] text-gov-lightBlue/80">
                AI-Powered Agricultural Market Linkage Platform
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <button onClick={() => setCurrentView('login')} className="hover:text-white underline">
                Role Select
              </button>
              <button onClick={handleStartFarmerDemo} className="hover:text-white underline">
                Farmer View
              </button>
              <button onClick={handleStartBuyerDemo} className="hover:text-white underline">
                Buyer View
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>
              Advisory Notice: AI outputs and market matching are simulated demonstrations for market discovery.
            </p>
            <p>© 2026 KhetLink Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
