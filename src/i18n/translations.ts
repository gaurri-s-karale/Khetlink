import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  prototypeNotice: string;
  home: string;
  howItWorks: string;
  marketPrices: string;
  forFarmers: string;
  forBuyers: string;
  login: string;
  dashboard: string;
  priceAI: string;
  qualityAI: string;
  digitalLot: string;
  createLot: string;
  myLots: string;
  findBuyers: string;
  smartMatching: string;
  offers: string;
  transactions: string;
  logistics: string;
  profile: string;
  help: string;
  logout: string;
  startDemo: string;
  resetDemo: string;
  welcomeFarmer: string;
  farmerSubtitle: string;
  todaysPrice: string;
  aiRecommendation: string;
  activeLots: string;
  activeDeal: string;
  marketSnapshot: string;
  recentActivity: string;
  sellHoldAdvisory: string;
  generateRecommendation: string;
  prototypeEngineNotice: string;
  acceptOffer: string;
  counterOffer: string;
  declineOffer: string;
  trackDelivery: string;
  viewReceipt: string;
  voiceAssistant: string;
  languageSelect: string;
  whyThisMatch: string;
  matchScore: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'KhetLink',
    tagline: 'Smarter Markets. Better Decisions. Stronger Farmers.',
    prototypeNotice: 'AI-Powered Agricultural Market Linkage Platform',
    home: 'Home',
    howItWorks: 'How It Works',
    marketPrices: 'Market Prices',
    forFarmers: 'For Farmers',
    forBuyers: 'For Buyers',
    login: 'Login',
    dashboard: 'Dashboard',
    priceAI: 'Price AI',
    qualityAI: 'Quality AI',
    digitalLot: 'Digital Lot',
    createLot: 'Create Digital Lot',
    myLots: 'My Lots',
    findBuyers: 'Find Best Buyers',
    smartMatching: 'Smart Buyer Matching',
    offers: 'Offers & Negotiations',
    transactions: 'Transactions',
    logistics: 'Logistics Tracking',
    profile: 'Farmer Trust Profile',
    help: 'Help & Guidelines',
    logout: 'Logout',
    startDemo: 'START DEMO',
    resetDemo: 'Reset Demo Data',
    welcomeFarmer: 'Namaste, Demo Farmer',
    farmerSubtitle: 'Here is your market intelligence for today.',
    todaysPrice: "Today's Price",
    aiRecommendation: 'AI Recommendation',
    activeLots: 'Active Lots',
    activeDeal: 'Active Deal',
    marketSnapshot: 'Market Snapshot',
    recentActivity: 'Your Recent Activity',
    sellHoldAdvisory: 'Sell / Hold Recommendation',
    generateRecommendation: 'GENERATE RECOMMENDATION',
    prototypeEngineNotice: 'Prototype Smart Matching Engine • Simulated Advisory Data',
    acceptOffer: 'ACCEPT OFFER',
    counterOffer: 'COUNTER OFFER',
    declineOffer: 'DECLINE',
    trackDelivery: 'Track Delivery',
    viewReceipt: 'View Receipt',
    voiceAssistant: 'Ask KhetLink',
    languageSelect: 'Select Language',
    whyThisMatch: 'Why this match?',
    matchScore: 'Match Score'
  },
  hi: {
    appName: 'खेतलिंक',
    tagline: 'समझदार बाज़ार. बेहतर निर्णय. सशक्त किसान.',
    prototypeNotice: 'कृषि बाज़ार लिंकेज प्लेटफॉर्म',
    home: 'होम',
    howItWorks: 'यह कैसे काम करता है',
    marketPrices: 'बाज़ार भाव',
    forFarmers: 'किसानों के लिए',
    forBuyers: 'व्यापारियों के लिए',
    login: 'लॉग इन',
    dashboard: 'डैशबोर्ड',
    priceAI: 'प्राइस AI',
    qualityAI: 'क्वालिटी AI',
    digitalLot: 'डिजिटल लॉट',
    createLot: 'नया लॉट बनाएं',
    myLots: 'मेरे लॉट',
    findBuyers: 'सर्वश्रेष्ठ खरीदार खोजें',
    smartMatching: 'स्मार्ट बायर मैचिंग',
    offers: 'प्रस्ताव और बातचीत',
    transactions: 'लेन-देन',
    logistics: 'परिवहन ट्रैकिंग',
    profile: 'किसान विश्वसनीयता प्रोफाइल',
    help: 'सहायता व दिशा-निर्देश',
    logout: 'लॉग आउट',
    startDemo: 'डेमो शुरू करें',
    resetDemo: 'डेमो रीसेट करें',
    welcomeFarmer: 'नमस्ते, डेमो किसान',
    farmerSubtitle: 'यह रहा आज का आपका कृषि बाज़ार विश्लेषण।',
    todaysPrice: 'आज का भाव',
    aiRecommendation: 'AI सुझाव',
    activeLots: 'सक्रिय लॉट',
    activeDeal: 'सक्रिय सौदा',
    marketSnapshot: 'मंडी स्थिति',
    recentActivity: 'हाल की गतिविधियां',
    sellHoldAdvisory: 'बेचें / रोककर रखें सुझाव',
    generateRecommendation: 'सुझाव प्राप्त करें',
    prototypeEngineNotice: 'प्रोटोटाइप मैचिंग इंजन • सिमुलेटेड सलाह डेटा',
    acceptOffer: 'प्रस्ताव स्वीकारें',
    counterOffer: 'जवाबी प्रस्ताव',
    declineOffer: 'अस्वीकार करें',
    trackDelivery: 'डिलीवरी ट्रैक करें',
    viewReceipt: 'रसीद देखें',
    voiceAssistant: 'खेतलिंक से पूछें',
    languageSelect: 'भाषा चुनें',
    whyThisMatch: 'यह खरीदार क्यों उपयुक्त है?',
    matchScore: 'मैच स्कोर'
  },
  mr: {
    appName: 'खेतलिंक',
    tagline: 'हुशार बाजार. योग्य निर्णय. सक्षम शेतकरी.',
    prototypeNotice: 'कृषी बाजार लिंकेज प्लॅटफॉर्म',
    home: 'मुख्यपृष्ठ',
    howItWorks: 'कसे चालते',
    marketPrices: 'बाजार भाव',
    forFarmers: 'शेतकऱ्यांसाठी',
    forBuyers: 'खरेदीदारांसाठी',
    login: 'लॉगिन',
    dashboard: 'डॅशबोर्ड',
    priceAI: 'किंमत AI',
    qualityAI: 'गुणवत्ता AI',
    digitalLot: 'डिजिटल लॉट',
    createLot: 'नवीन लॉट तयार करा',
    myLots: 'माझे लॉट',
    findBuyers: 'योग्य खरेदीदार शोधा',
    smartMatching: 'स्मार्ट बायर मॅचिंग',
    offers: 'ऑफर आणि वाटाघाटी',
    transactions: 'व्यवहार',
    logistics: 'वाहतूक ट्रॅकिंग',
    profile: 'शेतकरी विश्वास प्रोफाइल',
    help: 'मदत व मार्गदर्शक',
    logout: 'लॉगआउट',
    startDemo: 'डेमो सुरू करा',
    resetDemo: 'डेमो रीसेट करा',
    welcomeFarmer: 'नमस्ते, डेमो शेतकरी',
    farmerSubtitle: 'तुमच्या भागातील आजची सविस्तर बाजार माहिती.',
    todaysPrice: 'आजचा भाव',
    aiRecommendation: 'AI सल्ला',
    activeLots: 'सक्रिय लॉट',
    activeDeal: 'सक्रिय व्यवहार',
    marketSnapshot: 'बाजार आढावा',
    recentActivity: 'नुकत्याच झालेल्या हालचाली',
    sellHoldAdvisory: 'विक्री / थांबण्याचा सल्ला',
    generateRecommendation: 'सल्ला मिळवा',
    prototypeEngineNotice: 'प्रोटोटाइप मॅचिंग इंजिन • सिम्युलेटेड सल्ला माहिती',
    acceptOffer: 'ऑफर स्वीकारा',
    counterOffer: 'काऊंटर ऑफर',
    declineOffer: 'नाकारा',
    trackDelivery: 'डिलिव्हरी ट्रॅक करा',
    viewReceipt: 'पावती पहा',
    voiceAssistant: 'खेतलिंकला विचारा',
    languageSelect: 'भाषा निवडा',
    whyThisMatch: 'हा खरेदीदार का योग्य?',
    matchScore: 'मॅच स्कोअर'
  }
};
