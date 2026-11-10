import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  Language,
  FarmerProfile,
  BuyerProfile,
  MarketPriceRecord,
  DigitalLot,
  Offer,
  Transaction,
  LogisticsDetails,
  NotificationItem,
  LotStatus
} from '../types';
import {
  INITIAL_FARMER,
  INITIAL_BUYERS,
  INITIAL_MARKET_PRICES,
  INITIAL_LOTS,
  INITIAL_OFFERS,
  INITIAL_TRANSACTIONS,
  INITIAL_LOGISTICS,
  INITIAL_NOTIFICATIONS,
  getProduceImage
} from '../data/seedData';
import { TRANSLATIONS, Translations } from '../i18n/translations';

export type AppView =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'market-prices'
  | 'price-ai'
  | 'quality-ai'
  | 'create-lot'
  | 'my-lots'
  | 'buyer-matching'
  | 'buyer-profile'
  | 'offers'
  | 'transactions'
  | 'logistics'
  | 'profile'
  | 'buyer-dashboard'
  | 'admin';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedLotId: string | null;
  setSelectedLotId: (id: string | null) => void;
  selectedBuyerId: string | null;
  setSelectedBuyerId: (id: string | null) => void;
  farmer: FarmerProfile;
  buyers: BuyerProfile[];
  marketPrices: MarketPriceRecord[];
  lots: DigitalLot[];
  offers: Offer[];
  transactions: Transaction[];
  logistics: LogisticsDetails;
  notifications: NotificationItem[];
  unreadCount: number;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  markNotificationAsRead: (id: string) => void;
  addLot: (newLot: Omit<DigitalLot, 'id' | 'farmerId' | 'farmerName' | 'buyerMatchesCount' | 'createdAt'>) => DigitalLot;
  updateLotStatus: (lotId: string, status: LotStatus) => void;
  makeOffer: (offerData: { lotId: string; crop: string; buyerId: string; buyerName: string; buyerRating: number; buyerKycVerified: boolean; offeredPricePerQuintal: number; quantityKg: number; pickupMessage: string }) => Offer;
  acceptOffer: (offerId: string) => Transaction;
  counterOffer: (offerId: string, counterPrice: number) => void;
  declineOffer: (offerId: string) => void;
  resetDemoData: () => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoModeActive: boolean;
  setIsDemoModeActive: (active: boolean) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'khetlink_v1_';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedLotId, setSelectedLotId] = useState<string | null>('KHL-TOM-1024');
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | null>('BUY-FM-01');

  // Interactive 16-step demo state
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isDemoModeActive, setIsDemoModeActive] = useState<boolean>(false);

  // Notifications & Toast
  const [toast, setToast] = useState<ToastState | null>(null);

  // Entities stored in state
  const [farmer, setFarmer] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}farmer`);
    return saved ? JSON.parse(saved) : INITIAL_FARMER;
  });

  const [buyers] = useState<BuyerProfile[]>(INITIAL_BUYERS);
  const [marketPrices] = useState<MarketPriceRecord[]>(INITIAL_MARKET_PRICES);

  const [lots, setLots] = useState<DigitalLot[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}lots`);
    if (saved) {
      try {
        const parsed: DigitalLot[] = JSON.parse(saved);
        return parsed.map((lot) => ({
          ...lot,
          imageUrl: getProduceImage(lot.crop, lot.imageUrl)
        }));
      } catch {
        return INITIAL_LOTS;
      }
    }
    return INITIAL_LOTS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}offers`);
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}transactions`);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [logistics, setLogistics] = useState<LogisticsDetails>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}logistics`);
    return saved ? JSON.parse(saved) : INITIAL_LOGISTICS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}farmer`, JSON.stringify(farmer));
  }, [farmer]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}lots`, JSON.stringify(lots));
  }, [lots]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}offers`, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}transactions`, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}logistics`, JSON.stringify(logistics));
  }, [logistics]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 4000);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addLot = (newLotData: Omit<DigitalLot, 'id' | 'farmerId' | 'farmerName' | 'buyerMatchesCount' | 'createdAt'>): DigitalLot => {
    const nextId = `KHL-${newLotData.crop.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdLot: DigitalLot = {
      ...newLotData,
      imageUrl: getProduceImage(newLotData.crop, newLotData.imageUrl),
      id: nextId,
      farmerId: farmer.id,
      farmerName: farmer.name,
      buyerMatchesCount: 3,
      createdAt: new Date().toISOString()
    };
    setLots((prev) => [createdLot, ...prev]);
    showToast(`Digital lot ${createdLot.id} created successfully!`, 'success');

    // Add activity notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: 'buyer_match',
      title: 'Digital Lot Created',
      message: `${createdLot.crop} lot (${createdLot.quantityKg} kg, ${createdLot.grade}) matched with 3 buyers.`,
      timestamp: 'Just now',
      read: false,
      actionTarget: 'buyer-matching'
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setSelectedLotId(createdLot.id);
    return createdLot;
  };

  const updateLotStatus = (lotId: string, status: LotStatus) => {
    setLots((prev) =>
      prev.map((lot) => (lot.id === lotId ? { ...lot, status } : lot))
    );
  };

  const makeOffer = (offerData: {
    lotId: string;
    crop: string;
    buyerId: string;
    buyerName: string;
    buyerRating: number;
    buyerKycVerified: boolean;
    offeredPricePerQuintal: number;
    quantityKg: number;
    pickupMessage: string;
  }): Offer => {
    const totalAmount = Math.round((offerData.offeredPricePerQuintal / 100) * offerData.quantityKg);
    const newOffer: Offer = {
      id: `OFF-${Date.now().toString().slice(-4)}-${offerData.buyerName.substring(0, 2).toUpperCase()}`,
      lotId: offerData.lotId,
      crop: offerData.crop,
      buyerId: offerData.buyerId,
      buyerName: offerData.buyerName,
      buyerRating: offerData.buyerRating,
      buyerKycVerified: offerData.buyerKycVerified,
      offeredPricePerQuintal: offerData.offeredPricePerQuintal,
      quantityKg: offerData.quantityKg,
      totalAmount,
      status: 'Pending',
      pickupMessage: offerData.pickupMessage,
      createdAt: new Date().toISOString()
    };

    setOffers((prev) => [newOffer, ...prev]);
    updateLotStatus(offerData.lotId, 'Offer Received');
    showToast(`Offer of ₹${offerData.offeredPricePerQuintal}/q sent for Lot ${offerData.lotId}`, 'success');

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: 'buyer_offer',
      title: 'New Offer Received',
      message: `${offerData.buyerName} placed an offer of ₹${offerData.offeredPricePerQuintal}/q for Lot ${offerData.lotId}.`,
      timestamp: 'Just now',
      read: false,
      actionTarget: 'offers'
    };
    setNotifications((prev) => [notif, ...prev]);

    return newOffer;
  };

  const acceptOffer = (offerId: string): Transaction => {
    const targetOffer = offers.find((o) => o.id === offerId);
    if (!targetOffer) {
      throw new Error('Offer not found');
    }

    // Mark offer accepted
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'Accepted' } : o))
    );

    // Update lot status
    updateLotStatus(targetOffer.lotId, 'Sold');

    // Create confirmed transaction
    const txnId = `KHL-TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTxn: Transaction = {
      id: txnId,
      lotId: targetOffer.lotId,
      offerId: targetOffer.id,
      crop: targetOffer.crop,
      quantityKg: targetOffer.quantityKg,
      finalPricePerQuintal: targetOffer.offeredPricePerQuintal,
      totalAmount: targetOffer.totalAmount,
      farmerId: farmer.id,
      farmerName: farmer.name,
      farmerLocation: farmer.location,
      buyerId: targetOffer.buyerId,
      buyerName: targetOffer.buyerName,
      buyerLocation: 'Hadapsar, Pune',
      grade: 'Grade A',
      qualityScore: 91,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      paymentEscrowStatus: 'Deposited in Escrow',
      digitalReceiptId: `RCP-PUN-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setTransactions((prev) => [newTxn, ...prev]);

    // Update farmer trust stats
    setFarmer((prev) => ({
      ...prev,
      totalTransactions: prev.totalTransactions + 1,
      totalSalesValue: prev.totalSalesValue + newTxn.totalAmount
    }));

    // Update logistics tracking with transaction details
    setLogistics((prev) => ({
      ...prev,
      transactionId: newTxn.id,
      crop: newTxn.crop,
      quantityKg: newTxn.quantityKg,
      currentStatus: 'Order Confirmed',
      timeline: [
        {
          status: 'Order Confirmed',
          timestamp: 'Just now',
          completed: true,
          locationNote: 'Smart settlement locked on KhetLink'
        },
        {
          status: 'Vehicle Assigned',
          timestamp: 'Scheduled in 30 mins',
          completed: false,
          locationNote: 'Eicher Reefer MH-12-AB-1234 on standby'
        },
        {
          status: 'Picked Up',
          timestamp: 'Pending loading',
          completed: false,
          locationNote: 'Farm cluster gate pickup'
        },
        {
          status: 'In Transit',
          timestamp: 'Estimated 2h transit',
          completed: false,
          locationNote: 'Cold-chain telematics enabled'
        },
        {
          status: 'Delivered',
          timestamp: 'Tomorrow, 4:00 PM',
          completed: false,
          locationNote: 'FreshMart Central Hub'
        }
      ]
    }));

    showToast(`✓ Deal Confirmed! Transaction ${newTxn.id} generated.`, 'success');

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: 'logistics',
      title: 'Deal Confirmed & Escrow Funded',
      message: `Transaction ${newTxn.id} confirmed for ₹${newTxn.totalAmount.toLocaleString('en-IN')}. Logistics assigned.`,
      timestamp: 'Just now',
      read: false,
      actionTarget: 'transactions'
    };
    setNotifications((prev) => [notif, ...prev]);

    return newTxn;
  };

  const counterOffer = (offerId: string, counterPrice: number) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? {
              ...o,
              status: 'Countered',
              counterPricePerQuintal: counterPrice,
              totalAmount: Math.round((counterPrice / 100) * o.quantityKg)
            }
          : o
      )
    );
    showToast(`Counter offer of ₹${counterPrice}/q sent to buyer.`, 'info');
  };

  const declineOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: 'Declined' } : o))
    );
    showToast('Offer declined.', 'warning');
  };

  const resetDemoData = () => {
    localStorage.removeItem(`${STORAGE_PREFIX}farmer`);
    localStorage.removeItem(`${STORAGE_PREFIX}lots`);
    localStorage.removeItem(`${STORAGE_PREFIX}offers`);
    localStorage.removeItem(`${STORAGE_PREFIX}transactions`);
    localStorage.removeItem(`${STORAGE_PREFIX}logistics`);
    localStorage.removeItem(`${STORAGE_PREFIX}notifications`);

    setFarmer(INITIAL_FARMER);
    setLots(INITIAL_LOTS);
    setOffers(INITIAL_OFFERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setLogistics(INITIAL_LOGISTICS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSelectedLotId('KHL-TOM-1024');
    setSelectedBuyerId('BUY-FM-01');
    setUserRole('farmer');
    setCurrentView('dashboard');
    setDemoStep(1);
    setIsDemoModeActive(false);

    showToast('Demo data restored to initial state!', 'info');
  };

  // Demo step navigation logic
  const demoStepViews: Record<number, AppView> = {
    1: 'dashboard',
    2: 'market-prices',
    3: 'price-ai',
    4: 'price-ai',
    5: 'quality-ai',
    6: 'quality-ai',
    7: 'quality-ai',
    8: 'create-lot',
    9: 'buyer-matching',
    10: 'buyer-matching',
    11: 'buyer-profile',
    12: 'offers',
    13: 'offers',
    14: 'transactions',
    15: 'logistics',
    16: 'profile'
  };

  const nextDemoStep = () => {
    if (demoStep < 16) {
      const next = demoStep + 1;
      setDemoStep(next);
      if (demoStepViews[next]) {
        setCurrentView(demoStepViews[next]);
      }
    }
  };

  const prevDemoStep = () => {
    if (demoStep > 1) {
      const prev = demoStep - 1;
      setDemoStep(prev);
      if (demoStepViews[prev]) {
        setCurrentView(demoStepViews[prev]);
      }
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        language,
        setLanguage,
        t,
        currentView,
        setCurrentView,
        selectedLotId,
        setSelectedLotId,
        selectedBuyerId,
        setSelectedBuyerId,
        farmer,
        buyers,
        marketPrices,
        lots,
        offers,
        transactions,
        logistics,
        notifications,
        unreadCount,
        toast,
        showToast,
        markNotificationAsRead,
        addLot,
        updateLotStatus,
        makeOffer,
        acceptOffer,
        counterOffer,
        declineOffer,
        resetDemoData,
        demoStep,
        setDemoStep,
        isDemoModeActive,
        setIsDemoModeActive,
        nextDemoStep,
        prevDemoStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
