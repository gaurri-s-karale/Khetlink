import { BuyerProfile, DigitalLot, BuyerMatchResult } from '../types';

export function calculateBuyerMatches(lot: DigitalLot, buyers: BuyerProfile[]): BuyerMatchResult[] {
  const matches = buyers.map((buyer) => {
    // 1. Price Compatibility (30 pts max)
    // Lot expected price vs buyer expected max price
    const buyerMaxPrice = buyer.expectedPriceRange.max;
    const priceDiffRatio = (buyerMaxPrice - lot.expectedPricePerQuintal) / lot.expectedPricePerQuintal;
    let priceScore = 20;
    if (priceDiffRatio >= 0.03) {
      priceScore = 28; // Buyer can pay more than farmer asks
    } else if (priceDiffRatio >= 0) {
      priceScore = 26; // Exact match
    } else if (priceDiffRatio >= -0.05) {
      priceScore = 22; // Small 5% gap
    } else {
      priceScore = 16;
    }

    // 2. Quality Compatibility (20 pts max)
    const gradeMatch = buyer.preferredGrades.includes(lot.grade);
    let qualityScore = gradeMatch ? 19 : 12;
    if (lot.qualityScore >= 90) qualityScore = Math.min(20, qualityScore + 1);

    // 3. Quantity Compatibility (20 pts max)
    const qtyRatio = Math.min(lot.quantityKg, buyer.currentDemandQuantityKg) / Math.max(lot.quantityKg, buyer.currentDemandQuantityKg);
    const quantityScore = Math.round(qtyRatio * 20);

    // 4. Buyer Demand Urgency (15 pts max)
    let demandScore = 14;
    let demandUrgency: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
    if (buyer.businessType.includes('Quick Commerce') || buyer.businessType.includes('Retail')) {
      demandScore = 14;
      demandUrgency = 'HIGH';
    } else if (buyer.businessType.includes('Wholesale')) {
      demandScore = 12;
      demandUrgency = 'HIGH';
    } else {
      demandScore = 10;
      demandUrgency = 'MEDIUM';
    }

    // 5. Logistics / Location (10 pts max)
    let locationScore = 8;
    if (buyer.distanceKm <= 30) locationScore = 9;
    else if (buyer.distanceKm <= 60) locationScore = 7;
    else if (buyer.distanceKm <= 120) locationScore = 5;
    else locationScore = 3;

    // 6. Buyer Trust / Rating (5 pts max)
    const trustScore = Math.round((buyer.rating / 5) * 5);

    const totalScore = priceScore + qualityScore + quantityScore + demandScore + locationScore + trustScore;

    // Projected offer price based on buyer profile
    const offeredPricePerQuintal = buyer.expectedPriceRange.max >= lot.expectedPricePerQuintal 
      ? Math.max(lot.expectedPricePerQuintal, buyer.expectedPriceRange.max - 50)
      : buyer.expectedPriceRange.min;

    return {
      buyer,
      matchScore: Math.min(99, Math.max(50, totalScore)),
      offeredPricePerQuintal,
      requiredQuantityKg: buyer.currentDemandQuantityKg,
      demandUrgency,
      distanceKm: buyer.distanceKm,
      scoreBreakdown: {
        priceCompatibility: {
          score: priceScore,
          max: 30,
          note: `Buyer budget (₹${buyer.expectedPriceRange.min}–₹${buyer.expectedPriceRange.max}/q) aligns with your ask of ₹${lot.expectedPricePerQuintal}/q`
        },
        qualityCompatibility: {
          score: qualityScore,
          max: 20,
          note: `Buyer requires ${buyer.preferredGrades.join(', ')}. Your lot is certified ${lot.grade} (${lot.qualityScore}/100)`
        },
        quantityCompatibility: {
          score: quantityScore,
          max: 20,
          note: `Buyer demand (${buyer.currentDemandQuantityKg} kg) matches your lot (${lot.quantityKg} kg)`
        },
        buyerDemandUrgency: {
          score: demandScore,
          max: 15,
          note: `${buyer.name} has active weekly replenishment demand with rapid dispatch requirements`
        },
        logisticsDistance: {
          score: locationScore,
          max: 10,
          note: `Distance is ${buyer.distanceKm} km. Within direct same-day farmgate pickup radius`
        },
        buyerTrust: {
          score: trustScore,
          max: 5,
          note: `Verified KYC with ${buyer.rating}/5 rating and ${buyer.onTimePaymentRate}% on-time settlement rate`
        }
      }
    };
  });

  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
