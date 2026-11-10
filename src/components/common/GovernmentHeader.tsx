import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Mic,
  RotateCcw,
  Globe,
  UserCheck,
  ShoppingBag,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Language } from '../../types';

interface HeaderProps {
  onOpenVoice: () => void;
  onOpenNotifications: () => void;
}

export const GovernmentHeader: React.FC<HeaderProps> = ({ onOpenVoice, onOpenNotifications }) => {
  const {
    language,
    setLanguage,
    t,
    userRole,
    setUserRole,
    setCurrentView,
    resetDemoData,
    unreadCount,
    isDemoModeActive,
    setIsDemoModeActive
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-gov-card border-b border-gov-border shadow-gov">
      {/* Top Institutional Tri-color Accent Bar */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#E88919]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#2E7D32]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-10 h-10 rounded bg-gov-primary flex items-center justify-center text-white font-bold text-xl shadow-sm border border-gov-secondary/40">
              <span className="text-white tracking-wider">K</span>
              <span className="text-gov-accent text-sm ml-0.5">L</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gov-primary tracking-tight">{t.appName}</span>
              </div>
              <p className="text-xs text-gov-muted hidden sm:block font-medium">
                AI-Powered Agricultural Market Linkage Platform
              </p>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Demo Mode Toggle Button */}
            <button
              id="demo-tour-toggle-btn"
              onClick={() => setIsDemoModeActive(!isDemoModeActive)}
              className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors border ${
                isDemoModeActive
                  ? 'bg-gov-accent text-white border-gov-accent shadow-sm'
                  : 'bg-amber-50 text-gov-accent border-amber-300 hover:bg-amber-100'
              }`}
              title="Toggle interactive 16-step demo walkthrough"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{isDemoModeActive ? 'DEMO ACTIVE' : 'START DEMO'}</span>
            </button>

            {/* Voice Assistant 'Ask KhetLink' */}
            <button
              id="voice-assistant-btn"
              onClick={onOpenVoice}
              className="p-2 rounded text-gov-primary hover:bg-gov-lightBlue border border-transparent hover:border-gov-border transition flex items-center space-x-1 text-xs font-medium"
              title="Ask KhetLink Voice Assistant"
            >
              <Mic className="w-4 h-4 text-gov-agri" />
              <span className="hidden md:inline">{t.voiceAssistant}</span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-select-dropdown"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 rounded text-xs font-medium text-gov-text bg-gov-bg hover:bg-gov-lightBlue border border-gov-border flex items-center space-x-1.5 transition"
              >
                <Globe className="w-3.5 h-3.5 text-gov-muted" />
                <span>{languages.find((l) => l.code === language)?.native}</span>
                <ChevronDown className="w-3 h-3 text-gov-muted" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white rounded border border-gov-border shadow-gov-md py-1 z-50">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-gov-lightBlue ${
                        language === l.code ? 'font-semibold text-gov-primary bg-gov-lightBlue' : 'text-gov-text'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-gov-muted uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Role Switcher (Farmer / Buyer) */}
            <div className="relative">
              <button
                id="role-switch-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="px-2.5 py-1.5 rounded text-xs font-medium text-gov-primary bg-gov-lightBlue border border-gov-secondary/30 flex items-center space-x-1.5"
              >
                {userRole === 'farmer' ? (
                  <UserCheck className="w-3.5 h-3.5 text-gov-agri" />
                ) : (
                  <ShoppingBag className="w-3.5 h-3.5 text-gov-secondary" />
                )}
                <span className="capitalize">{userRole === 'farmer' ? 'Role: Farmer' : 'Role: Buyer'}</span>
                <ChevronDown className="w-3 h-3 text-gov-muted" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded border border-gov-border shadow-gov-md py-1 z-50">
                  <div className="px-3 py-1 text-[11px] text-gov-muted font-medium uppercase border-b border-gov-border">
                    Switch Demo Persona
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('farmer');
                      setCurrentView('dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 hover:bg-gov-lightBlue ${
                      userRole === 'farmer' ? 'font-semibold text-gov-primary bg-gov-lightBlue' : 'text-gov-text'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-gov-agri" />
                    <div>
                      <p className="font-semibold">Demo Farmer</p>
                      <p className="text-[10px] text-gov-muted">Khed, Pune • Tomato grower</p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('buyer');
                      setCurrentView('buyer-dashboard');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2 hover:bg-gov-lightBlue ${
                      userRole === 'buyer' ? 'font-semibold text-gov-primary bg-gov-lightBlue' : 'text-gov-text'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-gov-secondary" />
                    <div>
                      <p className="font-semibold">FreshMart Foods</p>
                      <p className="text-[10px] text-gov-muted">Procurement • Retail chain</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              id="notifications-toggle-btn"
              onClick={onOpenNotifications}
              className="relative p-2 rounded text-gov-text hover:bg-gov-bg border border-gov-border transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-gov-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* 1-Click Reset Demo Data Button */}
            <button
              id="reset-demo-data-btn"
              onClick={resetDemoData}
              className="p-2 rounded text-gov-muted hover:text-red-700 hover:bg-red-50 border border-gov-border transition"
              title={t.resetDemo}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
