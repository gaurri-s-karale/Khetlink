import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, TrendingUp, Package, Users, ShieldCheck } from 'lucide-react';
import { AppView } from '../../context/AppContext';

export const MobileNavigation: React.FC = () => {
  const { currentView, setCurrentView, t } = useApp();

  const mobileNav = [
    { id: 'dashboard' as AppView, label: t.home, icon: LayoutDashboard },
    { id: 'market-prices' as AppView, label: 'Prices', icon: TrendingUp },
    { id: 'my-lots' as AppView, label: 'Lots', icon: Package },
    { id: 'buyer-matching' as AppView, label: 'Buyers', icon: Users },
    { id: 'profile' as AppView, label: 'Profile', icon: ShieldCheck }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-gov-card border-t border-gov-border shadow-gov-lg flex items-center justify-around py-2 px-1">
      {mobileNav.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition ${
              isActive ? 'text-gov-primary font-bold' : 'text-gov-muted hover:text-gov-text'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-gov-primary' : 'text-gov-muted'}`} />
            <span className="text-[10px] mt-1 truncate max-w-[64px]">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
