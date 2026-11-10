import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GovernmentHeader } from '../components/common/GovernmentHeader';
import { Sidebar } from '../components/common/Sidebar';
import { MobileNavigation } from '../components/common/MobileNavigation';
import { DemoTourBar } from '../components/demo/DemoTourBar';
import { VoiceModal } from '../components/common/VoiceModal';
import { NotificationPanel } from '../components/common/NotificationPanel';
import { ToastContainer } from '../components/common/ToastContainer';

// Farmer Views
import { FarmerDashboard } from '../components/farmer/FarmerDashboard';
import { MarketPrices } from '../components/farmer/MarketPrices';
import { PriceAI } from '../components/farmer/PriceAI';
import { QualityAI } from '../components/farmer/QualityAI';
import { CreateLot } from '../components/farmer/CreateLot';
import { MyLots } from '../components/farmer/MyLots';
import { BuyerMatching } from '../components/farmer/BuyerMatching';

// Buyer & Shared Views
import { BuyerProfileView } from '../components/buyer/BuyerProfileView';
import { BuyerDashboard } from '../components/buyer/BuyerDashboard';
import { OfferNegotiation } from '../components/transaction/OfferNegotiation';
import { TransactionConfirmed } from '../components/transaction/TransactionConfirmed';
import { LogisticsTracker } from '../components/transaction/LogisticsTracker';
import { FarmerTrustProfile } from '../components/trust/FarmerTrustProfile';

export const MainAppContainer: React.FC = () => {
  const { currentView } = useApp();

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <FarmerDashboard />;
      case 'market-prices':
        return <MarketPrices />;
      case 'price-ai':
        return <PriceAI />;
      case 'quality-ai':
        return <QualityAI />;
      case 'create-lot':
        return <CreateLot />;
      case 'my-lots':
        return <MyLots />;
      case 'buyer-matching':
        return <BuyerMatching />;
      case 'buyer-profile':
        return <BuyerProfileView />;
      case 'offers':
        return <OfferNegotiation />;
      case 'transactions':
        return <TransactionConfirmed />;
      case 'logistics':
        return <LogisticsTracker />;
      case 'profile':
        return <FarmerTrustProfile />;
      case 'buyer-dashboard':
        return <BuyerDashboard />;
      default:
        return <FarmerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gov-bg flex flex-col">
      {/* Institutional Top Header */}
      <GovernmentHeader
        onOpenVoice={() => setVoiceOpen(true)}
        onOpenNotifications={() => setNotifsOpen(true)}
      />

      {/* Interactive 16-Step Tour Navigator */}
      <DemoTourBar />

      {/* Main App Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-8">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation />

      {/* Modals & Alerts */}
      <VoiceModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
      <NotificationPanel isOpen={notifsOpen} onClose={() => setNotifsOpen(false)} />
      <ToastContainer />
    </div>
  );
};
