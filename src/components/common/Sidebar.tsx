import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  Package,
  Users,
  Tag,
  Receipt,
  Truck,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  LogOut,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { AppView } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    userRole,
    setUserRole,
    t,
    offers,
    lots
  } = useApp();

  const pendingOffersCount = offers.filter((o) => o.status === 'Pending').length;

  const farmerNavItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'market-prices', label: t.marketPrices, icon: TrendingUp },
    { id: 'price-ai', label: t.priceAI, icon: BrainCircuit },
    { id: 'quality-ai', label: t.qualityAI, icon: Sparkles },
    { id: 'create-lot', label: t.createLot, icon: PlusCircle },
    { id: 'my-lots', label: t.myLots, icon: Package, badge: lots.length },
    { id: 'buyer-matching', label: t.findBuyers, icon: Users },
    { id: 'offers', label: t.offers, icon: Tag, badge: pendingOffersCount },
    { id: 'transactions', label: t.transactions, icon: Receipt },
    { id: 'logistics', label: t.logistics, icon: Truck },
    { id: 'profile', label: t.profile, icon: ShieldCheck }
  ];

  const buyerNavItems: { id: AppView; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'buyer-dashboard', label: 'Procurement Dashboard', icon: LayoutDashboard },
    { id: 'my-lots', label: 'Browse Produce Lots', icon: Package },
    { id: 'market-prices', label: 'Mandi Rates', icon: TrendingUp },
    { id: 'offers', label: 'Sent Offers', icon: Tag },
    { id: 'transactions', label: 'Purchase Invoices', icon: Receipt },
    { id: 'logistics', label: 'Inbound Logistics', icon: Truck }
  ];

  const navItems = userRole === 'farmer' ? farmerNavItems : buyerNavItems;

  return (
    <aside className="w-64 bg-gov-card border-r border-gov-border hidden lg:flex flex-col justify-between min-h-[calc(100vh-4rem)] flex-shrink-0">
      {/* Upper Navigation Links */}
      <div className="p-4 space-y-1">
        <div className="px-3 py-2 mb-2 bg-gov-bg rounded border border-gov-border/60">
          <div className="text-[11px] font-semibold text-gov-muted uppercase tracking-wider">
            {userRole === 'farmer' ? 'FARMER PORTAL' : 'BUYER PROCUREMENT'}
          </div>
          <div className="text-xs font-bold text-gov-primary truncate mt-0.5">
            {userRole === 'farmer' ? 'Demo Farmer (Pune)' : 'FreshMart Foods Hub'}
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gov-primary text-white shadow-sm font-semibold'
                    : 'text-gov-text hover:bg-gov-bg hover:text-gov-primary'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gov-secondary'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive
                        ? 'bg-gov-accent text-white'
                        : 'bg-gov-lightBlue text-gov-primary border border-gov-border'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Institutional Disclaimer & Utility */}
      <div className="p-4 border-t border-gov-border space-y-3 bg-[#FAFBFD]">
        <div className="bg-gov-lightGreen border border-gov-agri/20 rounded p-2.5">
          <div className="flex items-center space-x-1.5 text-gov-agri font-semibold text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Govt e-Market Ready</span>
          </div>
          <p className="text-[11px] text-gov-muted mt-1 leading-snug">
            Standardized digital lots interoperable with ENAM and state APMC networks.
          </p>
        </div>

        <div className="space-y-1 pt-1">
          <button
            onClick={() => setCurrentView('landing')}
            className="w-full flex items-center space-x-2 px-3 py-1.5 rounded text-xs text-gov-muted hover:text-gov-primary hover:bg-gov-bg transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Platform Overview</span>
          </button>
          <button
            onClick={() => {
              setUserRole(userRole === 'farmer' ? 'buyer' : 'farmer');
              setCurrentView(userRole === 'farmer' ? 'buyer-dashboard' : 'dashboard');
            }}
            className="w-full flex items-center space-x-2 px-3 py-1.5 rounded text-xs text-gov-secondary hover:underline transition font-medium"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Switch to {userRole === 'farmer' ? 'Buyer Mode' : 'Farmer Mode'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
