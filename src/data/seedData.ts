import {
  FarmerProfile,
  BuyerProfile,
  MarketPriceRecord,
  DigitalLot,
  Offer,
  Transaction,
  LogisticsDetails,
  NotificationItem
} from '../types';

export const INITIAL_FARMER: FarmerProfile = {
  id: 'FARM-PUN-001',
  name: 'Demo Farmer',
  phone: '+91 98230 45678',
  location: 'Khed, Pune District',
  district: 'Pune',
  state: 'Maharashtra',
  crops: ['Tomato', 'Onion', 'Potato'],
  totalTransactions: 12,
  totalSalesValue: 182400, // ₹1.82 Lakh
  rating: 4.8,
  completionRate: 98,
  kycVerified: true,
  memberSince: 'Oct 2024'
};

export const INITIAL_BUYERS: BuyerProfile[] = [
  {
    id: 'BUY-FM-01',
    name: 'FreshMart Foods',
    businessType: 'Organized Retail & Quick Commerce',
    location: 'Hadapsar, Pune',
    district: 'Pune',
    state: 'Maharashtra',
    rating: 4.8,
    kycVerified: true,
    successfulTransactions: 125,
    onTimePaymentRate: 98,
    currentDemandCrop: 'Tomato',
    currentDemandQuantityKg: 500,
    expectedPriceRange: { min: 3100, max: 3250 },
    distanceKm: 28,
    preferredGrades: ['Grade A', 'Grade B']
  },
  {
    id: 'BUY-GH-02',
    name: 'GreenHarvest Traders',
    businessType: 'Mandi Commission & Wholesale Distribution',
    location: 'Pimpalgaon, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    rating: 4.6,
    kycVerified: true,
    successfulTransactions: 89,
    onTimePaymentRate: 95,
    currentDemandCrop: 'Tomato',
    currentDemandQuantityKg: 1000,
    expectedPriceRange: { min: 3000, max: 3120 },
    distanceKm: 41,
    preferredGrades: ['Grade A', 'Grade B']
  },
  {
    id: 'BUY-SA-03',
    name: 'Shree Agro Foods',
    businessType: 'Pulp & Puree Processing Unit',
    location: 'MIDC Supa, Ahmednagar',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    rating: 4.4,
    kycVerified: true,
    successfulTransactions: 64,
    onTimePaymentRate: 92,
    currentDemandCrop: 'Tomato',
    currentDemandQuantityKg: 2000,
    expectedPriceRange: { min: 2950, max: 3050 },
    distanceKm: 55,
    preferredGrades: ['Grade A', 'Grade B', 'Grade C']
  },
  {
    id: 'BUY-KS-04',
    name: 'KisanSetu Wholesale Hub',
    businessType: 'Inter-state Bulk Aggregator',
    location: 'Sanwer Road, Indore',
    district: 'Indore',
    state: 'Madhya Pradesh',
    rating: 4.7,
    kycVerified: true,
    successfulTransactions: 142,
    onTimePaymentRate: 97,
    currentDemandCrop: 'Onion',
    currentDemandQuantityKg: 1500,
    expectedPriceRange: { min: 2400, max: 2500 },
    distanceKm: 210,
    preferredGrades: ['Grade A']
  }
];

export const INITIAL_MARKET_PRICES: MarketPriceRecord[] = [
  {
    id: 'MP-TOM-PUN',
    crop: 'Tomato',
    cropIcon: '🍅',
    state: 'Maharashtra',
    district: 'Pune',
    mandi: 'Pune APMC (Gultekdi)',
    modalPrice: 2850,
    minPrice: 2600,
    maxPrice: 3100,
    dailyChangePercent: 8.4,
    arrivalsTonnes: 142,
    demandLevel: 'HIGH',
    trend: 'up',
    lastUpdated: 'Today, 10:30 AM',
    historical7Days: [
      { day: 'Day 1', date: '28 Aug', price: 2520, arrivals: 190 },
      { day: 'Day 2', date: '29 Aug', price: 2580, arrivals: 185 },
      { day: 'Day 3', date: '30 Aug', price: 2610, arrivals: 175 },
      { day: 'Day 4', date: '31 Aug', price: 2650, arrivals: 165 },
      { day: 'Day 5', date: '01 Sep', price: 2700, arrivals: 155 },
      { day: 'Day 6', date: '02 Sep', price: 2780, arrivals: 148 },
      { day: 'Today', date: '03 Sep', price: 2850, arrivals: 142 }
    ]
  },
  {
    id: 'MP-ONI-LAS',
    crop: 'Onion',
    cropIcon: '🧅',
    state: 'Maharashtra',
    district: 'Nashik',
    mandi: 'Lasalgaon APMC',
    modalPrice: 2420,
    minPrice: 2200,
    maxPrice: 2600,
    dailyChangePercent: 4.1,
    arrivalsTonnes: 380,
    demandLevel: 'HIGH',
    trend: 'up',
    lastUpdated: 'Today, 10:30 AM',
    historical7Days: [
      { day: 'Day 1', date: '28 Aug', price: 2250, arrivals: 420 },
      { day: 'Day 2', date: '29 Aug', price: 2280, arrivals: 410 },
      { day: 'Day 3', date: '30 Aug', price: 2310, arrivals: 400 },
      { day: 'Day 4', date: '31 Aug', price: 2340, arrivals: 395 },
      { day: 'Day 5', date: '01 Sep', price: 2360, arrivals: 390 },
      { day: 'Day 6', date: '02 Sep', price: 2390, arrivals: 385 },
      { day: 'Today', date: '03 Sep', price: 2420, arrivals: 380 }
    ]
  },
  {
    id: 'MP-POT-AGR',
    crop: 'Potato',
    cropIcon: '🥔',
    state: 'Uttar Pradesh',
    district: 'Agra',
    mandi: 'Agra APMC',
    modalPrice: 2180,
    minPrice: 1950,
    maxPrice: 2300,
    dailyChangePercent: -1.8,
    arrivalsTonnes: 510,
    demandLevel: 'MEDIUM',
    trend: 'down',
    lastUpdated: 'Today, 10:30 AM',
    historical7Days: [
      { day: 'Day 1', date: '28 Aug', price: 2280, arrivals: 460 },
      { day: 'Day 2', date: '29 Aug', price: 2260, arrivals: 470 },
      { day: 'Day 3', date: '30 Aug', price: 2240, arrivals: 485 },
      { day: 'Day 4', date: '31 Aug', price: 2220, arrivals: 495 },
      { day: 'Day 5', date: '01 Sep', price: 2210, arrivals: 500 },
      { day: 'Day 6', date: '02 Sep', price: 2200, arrivals: 505 },
      { day: 'Today', date: '03 Sep', price: 2180, arrivals: 510 }
    ]
  },
  {
    id: 'MP-WHE-IND',
    crop: 'Wheat',
    cropIcon: '🌾',
    state: 'Madhya Pradesh',
    district: 'Indore',
    mandi: 'Indore APMC (Chhawani)',
    modalPrice: 2560,
    minPrice: 2420,
    maxPrice: 2700,
    dailyChangePercent: 2.6,
    arrivalsTonnes: 260,
    demandLevel: 'HIGH',
    trend: 'up',
    lastUpdated: 'Today, 10:30 AM',
    historical7Days: [
      { day: 'Day 1', date: '28 Aug', price: 2480, arrivals: 290 },
      { day: 'Day 2', date: '29 Aug', price: 2490, arrivals: 285 },
      { day: 'Day 3', date: '30 Aug', price: 2510, arrivals: 280 },
      { day: 'Day 4', date: '31 Aug', price: 2520, arrivals: 275 },
      { day: 'Day 5', date: '01 Sep', price: 2535, arrivals: 270 },
      { day: 'Day 6', date: '02 Sep', price: 2545, arrivals: 265 },
      { day: 'Today', date: '03 Sep', price: 2560, arrivals: 260 }
    ]
  },
  {
    id: 'MP-SOY-NAG',
    crop: 'Soybean',
    cropIcon: '🌱',
    state: 'Maharashtra',
    district: 'Nagpur',
    mandi: 'Nagpur APMC (Kalamna)',
    modalPrice: 4650,
    minPrice: 4400,
    maxPrice: 4850,
    dailyChangePercent: 1.2,
    arrivalsTonnes: 180,
    demandLevel: 'MEDIUM',
    trend: 'up',
    lastUpdated: 'Today, 10:30 AM',
    historical7Days: [
      { day: 'Day 1', date: '28 Aug', price: 4580, arrivals: 200 },
      { day: 'Day 2', date: '29 Aug', price: 4590, arrivals: 195 },
      { day: 'Day 3', date: '30 Aug', price: 4600, arrivals: 190 },
      { day: 'Day 4', date: '31 Aug', price: 4615, arrivals: 188 },
      { day: 'Day 5', date: '01 Sep', price: 4630, arrivals: 185 },
      { day: 'Day 6', date: '02 Sep', price: 4640, arrivals: 182 },
      { day: 'Today', date: '03 Sep', price: 4650, arrivals: 180 }
    ]
  },
  {
    id: 'MP-COT-SOL',
    crop: 'Cotton',
    cropIcon: '☁️',
    state: 'Maharashtra',
    district: 'Solapur',
    mandi: 'Solapur APMC',
    modalPrice: 7120,
    minPrice: 6900,
    maxPrice: 7350,
    dailyChangePercent: 3.5,
    arrivalsTonnes: 95,
    demandLevel: 'HIGH',
    trend: 'up',
    lastUpdated: 'Today, 10:30 AM',
    historical7Days: [
      { day: 'Day 1', date: '28 Aug', price: 6850, arrivals: 120 },
      { day: 'Day 2', date: '29 Aug', price: 6900, arrivals: 115 },
      { day: 'Day 3', date: '30 Aug', price: 6960, arrivals: 110 },
      { day: 'Day 4', date: '31 Aug', price: 7010, arrivals: 105 },
      { day: 'Day 5', date: '01 Sep', price: 7050, arrivals: 100 },
      { day: 'Day 6', date: '02 Sep', price: 7080, arrivals: 98 },
      { day: 'Today', date: '03 Sep', price: 7120, arrivals: 95 }
    ]
  }
];

export const CROP_DEFAULT_IMAGES: Record<string, string> = {
  Tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
  Onion: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
  Potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
  Soybean: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80',
  Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
  Cotton: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&auto=format&fit=crop&q=80'
};

export const getProduceImage = (crop: string, imageUrl?: string): string => {
  const defaultTomatoUrl = CROP_DEFAULT_IMAGES.Tomato;
  if (!imageUrl || (imageUrl === defaultTomatoUrl && crop !== 'Tomato')) {
    return CROP_DEFAULT_IMAGES[crop] || defaultTomatoUrl;
  }
  return imageUrl;
};

export const INITIAL_LOTS: DigitalLot[] = [
  {
    id: 'KHL-TOM-1024',
    farmerId: 'FARM-PUN-001',
    farmerName: 'Demo Farmer',
    crop: 'Tomato',
    quantityKg: 500,
    grade: 'Grade A',
    qualityScore: 91,
    location: 'Khed, Pune',
    state: 'Maharashtra',
    expectedPricePerQuintal: 3100,
    harvestDate: '2026-09-03',
    availableFrom: '2026-09-04',
    storageType: 'Covered Shade / Plastic Crates',
    status: 'Offer Received',
    buyerMatchesCount: 3,
    createdAt: '2026-09-03T08:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'KHL-ONI-0982',
    farmerId: 'FARM-PUN-001',
    farmerName: 'Demo Farmer',
    crop: 'Onion',
    quantityKg: 1200,
    grade: 'Grade A',
    qualityScore: 88,
    location: 'Khed, Pune',
    state: 'Maharashtra',
    expectedPricePerQuintal: 2450,
    harvestDate: '2026-09-01',
    availableFrom: '2026-09-02',
    storageType: 'Ventilated Godown',
    status: 'Active',
    buyerMatchesCount: 2,
    createdAt: '2026-09-01T11:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'KHL-POT-0845',
    farmerId: 'FARM-PUN-001',
    farmerName: 'Demo Farmer',
    crop: 'Potato',
    quantityKg: 800,
    grade: 'Grade B',
    qualityScore: 82,
    location: 'Khed, Pune',
    state: 'Maharashtra',
    expectedPricePerQuintal: 2150,
    harvestDate: '2026-08-28',
    availableFrom: '2026-08-29',
    storageType: 'Cold Storage (Tier 2)',
    status: 'Active',
    buyerMatchesCount: 1,
    createdAt: '2026-08-28T14:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'OFF-1024-FM',
    lotId: 'KHL-TOM-1024',
    crop: 'Tomato',
    buyerId: 'BUY-FM-01',
    buyerName: 'FreshMart Foods',
    buyerRating: 4.8,
    buyerKycVerified: true,
    offeredPricePerQuintal: 3200,
    quantityKg: 500,
    totalAmount: 16000,
    status: 'Pending',
    pickupMessage: 'Can arrange cold-chain pickup tomorrow at 10 AM directly from your farm cluster.',
    createdAt: '2026-09-03T11:15:00Z'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'KHL-TXN-2026-0891',
    lotId: 'KHL-ONI-0891',
    offerId: 'OFF-0891-GH',
    crop: 'Onion',
    quantityKg: 1000,
    finalPricePerQuintal: 2350,
    totalAmount: 23500,
    farmerId: 'FARM-PUN-001',
    farmerName: 'Demo Farmer',
    farmerLocation: 'Khed, Pune',
    buyerId: 'BUY-GH-02',
    buyerName: 'GreenHarvest Traders',
    buyerLocation: 'Pimpalgaon, Nashik',
    grade: 'Grade A',
    qualityScore: 89,
    status: 'Completed',
    createdAt: '2026-08-24T16:00:00Z',
    paymentEscrowStatus: 'Released to Farmer',
    digitalReceiptId: 'RCP-PUN-2026-0891'
  },
  {
    id: 'KHL-TXN-2026-0742',
    lotId: 'KHL-TOM-0742',
    offerId: 'OFF-0742-SA',
    crop: 'Tomato',
    quantityKg: 800,
    finalPricePerQuintal: 2700,
    totalAmount: 21600,
    farmerId: 'FARM-PUN-001',
    farmerName: 'Demo Farmer',
    farmerLocation: 'Khed, Pune',
    buyerId: 'BUY-SA-03',
    buyerName: 'Shree Agro Foods',
    buyerLocation: 'Ahmednagar',
    grade: 'Grade B',
    qualityScore: 84,
    status: 'Completed',
    createdAt: '2026-08-15T12:30:00Z',
    paymentEscrowStatus: 'Released to Farmer',
    digitalReceiptId: 'RCP-PUN-2026-0742'
  }
];

export const INITIAL_LOGISTICS: LogisticsDetails = {
  id: 'LOG-TXN-1024',
  transactionId: 'KHL-TXN-2026-1024',
  crop: 'Tomato',
  quantityKg: 500,
  currentStatus: 'In Transit',
  vehicleNumber: 'MH-12-AB-1234',
  driverName: 'Suresh Gaikwad',
  driverPhone: '+91 94220 78123',
  originCluster: 'Pune Farm Cluster (Khed APMC Yard)',
  destinationWarehouse: 'FreshMart Regional Distribution Center, Hadapsar',
  departureTime: 'Today, 11:30 AM',
  estimatedDeliveryTime: 'Tomorrow, 4:00 PM',
  currentGpsLocation: 'Bhosari Bypass, NH-60 (Km 18/28)',
  distanceKmTotal: 28,
  distanceKmCovered: 18,
  temperatureControlled: true,
  timeline: [
    {
      status: 'Order Confirmed',
      timestamp: 'Today, 09:15 AM',
      completed: true,
      locationNote: 'Smart contract settled on KhetLink'
    },
    {
      status: 'Vehicle Assigned',
      timestamp: 'Today, 10:00 AM',
      completed: true,
      locationNote: 'Eicher Reefer MH-12-AB-1234 allocated'
    },
    {
      status: 'Picked Up',
      timestamp: 'Today, 11:15 AM',
      completed: true,
      locationNote: 'Produce loaded & digital weighment slip verified'
    },
    {
      status: 'In Transit',
      timestamp: 'Today, 11:45 AM',
      completed: true,
      locationNote: 'En-route via Pune Ring Road (Real-time IoT Telematics active)'
    },
    {
      status: 'Delivered',
      timestamp: 'Expected Tomorrow, 4:00 PM',
      completed: false,
      locationNote: 'Awaiting warehouse inspection gate entry'
    }
  ]
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    type: 'price_alert',
    title: 'Tomato Price Surge',
    message: 'Tomato price in Pune Mandi increased by +8.4% to ₹2,850/q.',
    timestamp: '15 mins ago',
    read: false,
    actionTarget: 'market-prices'
  },
  {
    id: 'NOTIF-02',
    type: 'buyer_offer',
    title: 'New Offer Received',
    message: 'FreshMart Foods offered ₹3,200/q for your 500 kg Tomato lot.',
    timestamp: '1 hour ago',
    read: false,
    actionTarget: 'offers'
  },
  {
    id: 'NOTIF-03',
    type: 'buyer_match',
    title: 'High-Fit Buyer Match',
    message: '3 verified buyers matched with your Tomato lot KHL-TOM-1024.',
    timestamp: '3 hours ago',
    read: true,
    actionTarget: 'buyer-matching'
  },
  {
    id: 'NOTIF-04',
    type: 'logistics',
    title: 'Logistics Dispatched',
    message: 'Vehicle MH-12-AB-1234 picked up shipment from Khed Cluster.',
    timestamp: '4 hours ago',
    read: true,
    actionTarget: 'logistics'
  }
];

export const RECENT_ACTIVITIES = [
  { id: 'ACT-01', text: 'Tomato lot KHL-TOM-1024 created (500 kg, Grade A)', time: 'Today, 08:30 AM', icon: 'check-circle' },
  { id: 'ACT-02', text: 'Price alert triggered: Pune Mandi +8.4% surge', time: 'Today, 09:15 AM', icon: 'trending-up' },
  { id: 'ACT-03', text: 'Buyer offer received from FreshMart Foods (₹3,200/q)', time: 'Today, 11:15 AM', icon: 'tag' },
  { id: 'ACT-04', text: 'Logistics vehicle MH-12-AB-1234 assigned for transit', time: 'Yesterday, 04:30 PM', icon: 'truck' }
];
