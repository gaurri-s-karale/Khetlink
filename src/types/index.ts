export type UserRole = 'farmer' | 'buyer' | 'admin';

export type Language = 'en' | 'hi' | 'mr';

export type QualityGrade = 'Grade A' | 'Grade B' | 'Grade C';

export type LotStatus = 'Draft' | 'Active' | 'Offer Received' | 'Sold' | 'Completed';

export type OfferStatus = 'Pending' | 'Accepted' | 'Countered' | 'Declined';

export type TransactionStatus = 'Confirmed' | 'In Transit' | 'Completed' | 'Cancelled';

export type LogisticsStatus = 'Order Confirmed' | 'Vehicle Assigned' | 'Picked Up' | 'In Transit' | 'Delivered';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  location: string;
  state: string;
  district: string;
  crops: string[];
  totalTransactions: number;
  totalSalesValue: number; // in INR
  rating: number;
  completionRate: number; // percentage
  kycVerified: boolean;
  memberSince: string;
}

export interface BuyerProfile {
  id: string;
  name: string;
  businessType: string; // e.g. "Retail Chain Procurement", "Wholesale Mandi Trader", "Agro Processing Unit"
  location: string;
  state: string;
  district: string;
  rating: number;
  kycVerified: boolean;
  successfulTransactions: number;
  onTimePaymentRate: number; // percentage e.g. 98%
  currentDemandCrop: string;
  currentDemandQuantityKg: number;
  expectedPriceRange: { min: number; max: number };
  distanceKm: number;
  preferredGrades: QualityGrade[];
}

export interface MarketPriceRecord {
  id: string;
  crop: string;
  cropIcon: string;
  state: string;
  district: string;
  mandi: string;
  modalPrice: number; // INR per quintal
  minPrice: number;
  maxPrice: number;
  dailyChangePercent: number;
  arrivalsTonnes: number;
  demandLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  historical7Days: { day: string; date: string; price: number; arrivals: number }[];
}

export interface PricePredictionInput {
  crop: string;
  location: string;
  quantityKg: number;
  currentPrice: number;
  expectedSellingDays: number; // e.g. 2, 3, 7
  storageAvailability: 'Cold Storage' | 'Warehouse / Dry Godown' | 'Farm Storage (Ambient)';
}

export interface PricePredictionResult {
  crop: string;
  recommendation: 'HOLD' | 'SELL NOW' | 'SELL PARTIAL';
  recommendationDuration: string; // e.g. "HOLD FOR 2–3 DAYS"
  currentPrice: number;
  expectedPriceMin: number;
  expectedPriceMax: number;
  expectedMovementPercent: string; // e.g. "+7% to +10%"
  confidencePercent: number; // e.g. 82
  reasons: string[];
  historicalSeries: { day: string; price: number; type: 'historical' | 'forecast' }[];
  marketAdvisoryNote: string;
}

export interface QualityAssessment {
  id: string;
  crop: string;
  imagePreviewUrl: string;
  grade: QualityGrade;
  qualityScore: number; // e.g. 91 / 100
  freshness: 'High' | 'Medium' | 'Standard';
  defectLevel: 'Low' | 'Moderate' | 'High';
  size: 'Large' | 'Medium' | 'Small';
  confidencePercent: number;
  detectedIssues: string[];
  recommendedCategory: 'Premium Export' | 'Premium Domestic' | 'Standard Mandi' | 'Processing Grade';
  timestamp: string;
}

export interface DigitalLot {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: string;
  quantityKg: number;
  grade: QualityGrade;
  qualityScore: number;
  location: string;
  state: string;
  expectedPricePerQuintal: number;
  harvestDate: string;
  availableFrom: string;
  storageType: string;
  status: LotStatus;
  buyerMatchesCount: number;
  createdAt: string;
  imageUrl?: string;
}

export interface BuyerMatchBreakdown {
  priceCompatibility: { score: number; max: number; note: string };
  qualityCompatibility: { score: number; max: number; note: string };
  quantityCompatibility: { score: number; max: number; note: string };
  buyerDemandUrgency: { score: number; max: number; note: string };
  logisticsDistance: { score: number; max: number; note: string };
  buyerTrust: { score: number; max: number; note: string };
}

export interface BuyerMatchResult {
  buyer: BuyerProfile;
  matchScore: number; // 0-100
  offeredPricePerQuintal: number;
  requiredQuantityKg: number;
  demandUrgency: 'HIGH' | 'MEDIUM' | 'LOW';
  distanceKm: number;
  scoreBreakdown: BuyerMatchBreakdown;
}

export interface Offer {
  id: string;
  lotId: string;
  crop: string;
  buyerId: string;
  buyerName: string;
  buyerRating: number;
  buyerKycVerified: boolean;
  offeredPricePerQuintal: number;
  quantityKg: number;
  totalAmount: number;
  status: OfferStatus;
  pickupMessage: string;
  createdAt: string;
  counterPricePerQuintal?: number;
}

export interface Transaction {
  id: string;
  lotId: string;
  offerId: string;
  crop: string;
  quantityKg: number;
  finalPricePerQuintal: number;
  totalAmount: number;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  buyerId: string;
  buyerName: string;
  buyerLocation: string;
  grade: QualityGrade;
  qualityScore: number;
  status: TransactionStatus;
  createdAt: string;
  paymentEscrowStatus: 'Deposited in Escrow' | 'Released to Farmer' | 'Pending';
  digitalReceiptId: string;
}

export interface LogisticsDetails {
  id: string;
  transactionId: string;
  crop: string;
  quantityKg: number;
  currentStatus: LogisticsStatus;
  vehicleNumber: string;
  driverName: string;
  driverPhone: string;
  originCluster: string;
  destinationWarehouse: string;
  estimatedDeliveryTime: string;
  departureTime: string;
  currentGpsLocation: string;
  distanceKmTotal: number;
  distanceKmCovered: number;
  temperatureControlled: boolean;
  timeline: {
    status: LogisticsStatus;
    timestamp: string;
    completed: boolean;
    locationNote: string;
  }[];
}

export interface NotificationItem {
  id: string;
  type: 'price_alert' | 'buyer_offer' | 'buyer_match' | 'logistics';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionTarget?: string;
}
