from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

app = FastAPI(
    title="KhetLink API",
    description="AI-Powered Agricultural Market Linkage Platform API",
    version="1.0.0"
)

# Enable CORS for local React/Vite development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# PYDANTIC DATA MODELS
# ==========================================

class PricePredictionRequest(BaseModel):
    crop: str
    location: str
    quantityKg: float
    currentPrice: float
    expectedSellingDays: int
    storageAvailability: str

class QualityAnalysisRequest(BaseModel):
    cropType: str
    customImageUrl: Optional[str] = None

class CreateLotRequest(BaseModel):
    crop: str
    quantityKg: float
    grade: str
    qualityScore: int
    location: str
    state: str
    expectedPricePerQuintal: float
    harvestDate: str
    availableFrom: str
    storageType: str
    imageUrl: Optional[str] = None

class CreateOfferRequest(BaseModel):
    lotId: str
    crop: str
    buyerId: str
    buyerName: str
    buyerRating: float
    buyerKycVerified: bool
    offeredPricePerQuintal: float
    quantityKg: float
    pickupMessage: str

class UpdateOfferRequest(BaseModel):
    status: str # "Accepted", "Countered", "Declined"
    counterPricePerQuintal: Optional[float] = None

class CreateTransactionRequest(BaseModel):
    offerId: str

# ==========================================
# IN-MEMORY SEED STATE
# ==========================================

def get_initial_state():
    return {
        "market_prices": [
            {
                "id": "MP-TOM-PUN",
                "crop": "Tomato",
                "cropIcon": "🍅",
                "state": "Maharashtra",
                "district": "Pune",
                "mandi": "Pune APMC (Gultekdi)",
                "modalPrice": 2850,
                "minPrice": 2600,
                "maxPrice": 3100,
                "dailyChangePercent": 8.4,
                "arrivalsTonnes": 142,
                "demandLevel": "HIGH",
                "trend": "up",
                "lastUpdated": "Today, 10:30 AM"
            },
            {
                "id": "MP-ONI-LAS",
                "crop": "Onion",
                "cropIcon": "🧅",
                "state": "Maharashtra",
                "district": "Nashik",
                "mandi": "Lasalgaon APMC",
                "modalPrice": 2420,
                "minPrice": 2200,
                "maxPrice": 2600,
                "dailyChangePercent": 4.1,
                "arrivalsTonnes": 380,
                "demandLevel": "HIGH",
                "trend": "up",
                "lastUpdated": "Today, 10:30 AM"
            },
            {
                "id": "MP-POT-AGR",
                "crop": "Potato",
                "cropIcon": "🥔",
                "state": "Uttar Pradesh",
                "district": "Agra",
                "mandi": "Agra APMC",
                "modalPrice": 2180,
                "minPrice": 1950,
                "maxPrice": 2300,
                "dailyChangePercent": -1.8,
                "arrivalsTonnes": 510,
                "demandLevel": "MEDIUM",
                "trend": "down",
                "lastUpdated": "Today, 10:30 AM"
            },
            {
                "id": "MP-WHE-IND",
                "crop": "Wheat",
                "cropIcon": "🌾",
                "state": "Madhya Pradesh",
                "district": "Indore",
                "mandi": "Indore APMC (Chhawani)",
                "modalPrice": 2560,
                "minPrice": 2420,
                "maxPrice": 2700,
                "dailyChangePercent": 2.6,
                "arrivalsTonnes": 260,
                "demandLevel": "HIGH",
                "trend": "up",
                "lastUpdated": "Today, 10:30 AM"
            }
        ],
        "buyers": [
            {
                "id": "BUY-FM-01",
                "name": "FreshMart Foods",
                "businessType": "Organized Retail & Quick Commerce",
                "location": "Hadapsar, Pune",
                "district": "Pune",
                "state": "Maharashtra",
                "rating": 4.8,
                "kycVerified": True,
                "successfulTransactions": 125,
                "onTimePaymentRate": 98,
                "currentDemandCrop": "Tomato",
                "currentDemandQuantityKg": 500,
                "expectedPriceRange": {"min": 3100, "max": 3250},
                "distanceKm": 28,
                "preferredGrades": ["Grade A", "Grade B"]
            },
            {
                "id": "BUY-GH-02",
                "name": "GreenHarvest Traders",
                "businessType": "Mandi Commission & Wholesale Distribution",
                "location": "Pimpalgaon, Nashik",
                "district": "Nashik",
                "state": "Maharashtra",
                "rating": 4.6,
                "kycVerified": True,
                "successfulTransactions": 89,
                "onTimePaymentRate": 95,
                "currentDemandCrop": "Tomato",
                "currentDemandQuantityKg": 1000,
                "expectedPriceRange": {"min": 3000, "max": 3120},
                "distanceKm": 41,
                "preferredGrades": ["Grade A", "Grade B"]
            },
            {
                "id": "BUY-SA-03",
                "name": "Shree Agro Foods",
                "businessType": "Pulp & Puree Processing Unit",
                "location": "MIDC Supa, Ahmednagar",
                "district": "Ahmednagar",
                "state": "Maharashtra",
                "rating": 4.4,
                "kycVerified": True,
                "successfulTransactions": 64,
                "onTimePaymentRate": 92,
                "currentDemandCrop": "Tomato",
                "currentDemandQuantityKg": 2000,
                "expectedPriceRange": {"min": 2950, "max": 3050},
                "distanceKm": 55,
                "preferredGrades": ["Grade A", "Grade B", "Grade C"]
            }
        ],
        "lots": [
            {
                "id": "KHL-TOM-1024",
                "farmerId": "FARM-PUN-001",
                "farmerName": "Demo Farmer",
                "crop": "Tomato",
                "quantityKg": 500,
                "grade": "Grade A",
                "qualityScore": 91,
                "location": "Khed, Pune",
                "state": "Maharashtra",
                "expectedPricePerQuintal": 3100,
                "harvestDate": "2026-09-03",
                "availableFrom": "2026-09-04",
                "storageType": "Covered Shade / Plastic Crates",
                "status": "Offer Received",
                "buyerMatchesCount": 3,
                "createdAt": "2026-09-03T08:30:00Z",
                "imageUrl": "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
            }
        ],
        "offers": [
            {
                "id": "OFF-1024-FM",
                "lotId": "KHL-TOM-1024",
                "crop": "Tomato",
                "buyerId": "BUY-FM-01",
                "buyerName": "FreshMart Foods",
                "buyerRating": 4.8,
                "buyerKycVerified": True,
                "offeredPricePerQuintal": 3200,
                "quantityKg": 500,
                "totalAmount": 16000,
                "status": "Pending",
                "pickupMessage": "Can arrange cold-chain pickup tomorrow at 10 AM directly from your farm cluster.",
                "createdAt": "2026-09-03T11:15:00Z"
            }
        ],
        "transactions": [
            {
                "id": "KHL-TXN-2026-0891",
                "lotId": "KHL-ONI-0891",
                "offerId": "OFF-0891-GH",
                "crop": "Onion",
                "quantityKg": 1000,
                "finalPricePerQuintal": 2350,
                "totalAmount": 23500,
                "farmerId": "FARM-PUN-001",
                "farmerName": "Demo Farmer",
                "farmerLocation": "Khed, Pune",
                "buyerId": "BUY-GH-02",
                "buyerName": "GreenHarvest Traders",
                "buyerLocation": "Pimpalgaon, Nashik",
                "grade": "Grade A",
                "qualityScore": 89,
                "status": "Completed",
                "createdAt": "2026-08-24T16:00:00Z",
                "paymentEscrowStatus": "Released to Farmer",
                "digitalReceiptId": "RCP-PUN-2026-0891"
            }
        ],
        "logistics": {
            "id": "LOG-TXN-1024",
            "transactionId": "KHL-TXN-2026-1024",
            "crop": "Tomato",
            "quantityKg": 500,
            "currentStatus": "In Transit",
            "vehicleNumber": "MH-12-AB-1234",
            "driverName": "Suresh Gaikwad",
            "driverPhone": "+91 94220 78123",
            "originCluster": "Pune Farm Cluster (Khed APMC Yard)",
            "destinationWarehouse": "FreshMart Regional Distribution Center, Hadapsar",
            "departureTime": "Today, 11:30 AM",
            "estimatedDeliveryTime": "Tomorrow, 4:00 PM",
            "currentGpsLocation": "Bhosari Bypass, NH-60 (Km 18/28)",
            "distanceKmTotal": 28,
            "distanceKmCovered": 18,
            "temperatureControlled": True,
            "timeline": [
                {"status": "Order Confirmed", "timestamp": "Today, 09:15 AM", "completed": True, "locationNote": "Smart contract settled on KhetLink"},
                {"status": "Vehicle Assigned", "timestamp": "Today, 10:00 AM", "completed": True, "locationNote": "Eicher Reefer MH-12-AB-1234 allocated"},
                {"status": "Picked Up", "timestamp": "Today, 11:15 AM", "completed": True, "locationNote": "Produce loaded & digital weighment slip verified"},
                {"status": "In Transit", "timestamp": "Today, 11:45 AM", "completed": True, "locationNote": "En-route via Pune Ring Road (Real-time IoT Telematics active)"},
                {"status": "Delivered", "timestamp": "Expected Tomorrow, 4:00 PM", "completed": False, "locationNote": "Awaiting warehouse inspection gate entry"}
            ]
        },
        "notifications": [
            {
                "id": "NOTIF-01",
                "type": "price_alert",
                "title": "Tomato Price Surge",
                "message": "Tomato price in Pune Mandi increased by +8.4% to ₹2,850/q.",
                "timestamp": "15 mins ago",
                "read": False,
                "actionTarget": "market-prices"
            },
            {
                "id": "NOTIF-02",
                "type": "buyer_offer",
                "title": "New Offer Received",
                "message": "FreshMart Foods offered ₹3,200/q for your 500 kg Tomato lot.",
                "timestamp": "1 hour ago",
                "read": False,
                "actionTarget": "offers"
            }
        ]
    }

STATE = get_initial_state()

# ==========================================
# REST API ENDPOINTS (SECTION 29)
# ==========================================

@app.get("/api/health")
def health_check():
    return {"status": "ok", "platform": "KhetLink", "version": "1.0.0"}

# 1. GET /api/market-prices
@app.get("/api/market-prices")
def get_market_prices():
    return STATE["market_prices"]

# 2. GET /api/market-prices/{crop}
@app.get("/api/market-prices/{crop}")
def get_market_price_by_crop(crop: str):
    matches = [p for p in STATE["market_prices"] if p["crop"].lower() == crop.lower()]
    if not matches:
        raise HTTPException(status_code=404, detail="Crop price not found")
    return matches[0]

# 3. POST /api/price-ai/predict
@app.post("/api/price-ai/predict")
def predict_price(req: PricePredictionRequest):
    if req.crop.lower() == "tomato":
        return {
            "crop": "Tomato",
            "recommendation": "HOLD",
            "recommendationDuration": "HOLD FOR 2–3 DAYS",
            "currentPrice": req.currentPrice,
            "expectedPriceMin": 3050,
            "expectedPriceMax": 3150,
            "expectedMovementPercent": "+7% to +10%",
            "confidencePercent": 82,
            "reasons": [
                "Urban retail and quick-commerce demand is surging (+14% WoW).",
                "Recent mandi arrivals dropped by 18% due to localized rains in southern supply belts.",
                "Short-term price velocity indicates strong upward price resistance breach at ₹3,000/q."
            ],
            "marketAdvisoryNote": "Advisory disclaimer: AI recommendation is an algorithmic advisory estimation based on historical mandi arrivals, weather events, and demand signals. Final selling decision remains with the farmer."
        }
    return {
        "crop": req.crop,
        "recommendation": "SELL NOW",
        "recommendationDuration": "SELL WITHIN 24–48 HOURS",
        "currentPrice": req.currentPrice,
        "expectedPriceMin": int(req.currentPrice * 0.96),
        "expectedPriceMax": int(req.currentPrice * 1.01),
        "expectedMovementPercent": "-2% to +1%",
        "confidencePercent": 75,
        "reasons": [
            "Arrival volumes expected to surge in terminal mandis over next 48 hours.",
            "Storage costs diminish net margin beyond 2 days."
        ],
        "marketAdvisoryNote": "Advisory disclaimer: AI recommendation is advisory. Final selling decision remains with the farmer."
    }

# 4. POST /api/quality-ai/analyze
@app.post("/api/quality-ai/analyze")
def analyze_quality(req: QualityAnalysisRequest):
    crop = req.cropType.lower()
    if crop == "tomato":
        return {
            "id": f"QA-{int(datetime.now().timestamp())}",
            "crop": "Tomato",
            "grade": "Grade A",
            "qualityScore": 91,
            "freshness": "High",
            "defectLevel": "Low",
            "size": "Medium",
            "confidencePercent": 93,
            "detectedIssues": ["Minor superficial skin mark (non-pathogenic)", "Uniform carotenoid color indexing"],
            "recommendedCategory": "Premium Export"
        }
    elif crop == "onion":
        return {
            "id": f"QA-{int(datetime.now().timestamp())}",
            "crop": "Onion",
            "grade": "Grade A",
            "qualityScore": 88,
            "freshness": "High",
            "defectLevel": "Low",
            "size": "Large",
            "confidencePercent": 91,
            "detectedIssues": ["Intact dry outer tunic/skin", "Minimal neck thickness"],
            "recommendedCategory": "Premium Domestic"
        }
    return {
        "id": f"QA-{int(datetime.now().timestamp())}",
        "crop": req.cropType.capitalize(),
        "grade": "Grade B",
        "qualityScore": 82,
        "freshness": "Medium",
        "defectLevel": "Moderate",
        "size": "Medium",
        "confidencePercent": 88,
        "detectedIssues": ["Slight surface dust adherence"],
        "recommendedCategory": "Standard Mandi"
    }

# 5. POST /api/lots
@app.post("/api/lots")
def create_lot(req: CreateLotRequest):
    lot_id = f"KHL-{req.crop[:3].upper()}-{uuid.uuid4().hex[:4].upper()}"
    new_lot = {
        "id": lot_id,
        "farmerId": "FARM-PUN-001",
        "farmerName": "Demo Farmer",
        "crop": req.crop,
        "quantityKg": req.quantityKg,
        "grade": req.grade,
        "qualityScore": req.qualityScore,
        "location": req.location,
        "state": req.state,
        "expectedPricePerQuintal": req.expectedPricePerQuintal,
        "harvestDate": req.harvestDate,
        "availableFrom": req.availableFrom,
        "storageType": req.storageType,
        "status": "Active",
        "buyerMatchesCount": 3,
        "createdAt": datetime.now().isoformat(),
        "imageUrl": req.imageUrl or "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80"
    }
    STATE["lots"].insert(0, new_lot)
    return new_lot

# 6. GET /api/lots
@app.get("/api/lots")
def get_lots():
    return STATE["lots"]

# 7. GET /api/lots/{id}
@app.get("/api/lots/{id}")
def get_lot_by_id(id: str):
    for lot in STATE["lots"]:
        if lot["id"] == id:
            return lot
    raise HTTPException(status_code=404, detail="Lot not found")

# 8. GET /api/buyers
@app.get("/api/buyers")
def get_buyers():
    return STATE["buyers"]

# 9. GET /api/buyers/{id}
@app.get("/api/buyers/{id}")
def get_buyer_by_id(id: str):
    for b in STATE["buyers"]:
        if b["id"] == id:
            return b
    raise HTTPException(status_code=404, detail="Buyer not found")

# 10. POST /api/buyer-match
@app.post("/api/buyer-match")
def match_buyers(lot_id: str = Query(..., description="Lot ID to match")):
    lot = next((l for l in STATE["lots"] if l["id"] == lot_id), None)
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found for matching")

    results = []
    for b in STATE["buyers"]:
        # Multi-factor score
        price_score = 28 if b["expectedPriceRange"]["max"] >= lot["expectedPricePerQuintal"] else 20
        quality_score = 19 if lot["grade"] in b["preferredGrades"] else 12
        qty_score = 20
        demand_score = 14
        dist_score = 8 if b["distanceKm"] <= 40 else 5
        trust_score = 5
        total = price_score + quality_score + qty_score + demand_score + dist_score + trust_score

        results.append({
            "buyer": b,
            "matchScore": total,
            "offeredPricePerQuintal": max(lot["expectedPricePerQuintal"], b["expectedPriceRange"]["max"] - 50),
            "demandUrgency": "HIGH" if b["businessType"].find("Retail") != -1 else "MEDIUM",
            "distanceKm": b["distanceKm"],
            "breakdown": {
                "price": f"{price_score}/30",
                "quality": f"{quality_score}/20",
                "quantity": f"{qty_score}/20",
                "demand": f"{demand_score}/15",
                "location": f"{dist_score}/10",
                "trust": f"{trust_score}/5"
            }
        })
    results.sort(key=lambda x: x["matchScore"], reverse=True)
    return results

# 11. POST /api/offers
@app.post("/api/offers")
def create_offer(req: CreateOfferRequest):
    offer_id = f"OFF-{uuid.uuid4().hex[:4].upper()}-{req.buyerName[:2].upper()}"
    total = int((req.offeredPricePerQuintal / 100) * req.quantityKg)
    new_offer = {
        "id": offer_id,
        "lotId": req.lotId,
        "crop": req.crop,
        "buyerId": req.buyerId,
        "buyerName": req.buyerName,
        "buyerRating": req.buyerRating,
        "buyerKycVerified": req.buyerKycVerified,
        "offeredPricePerQuintal": req.offeredPricePerQuintal,
        "quantityKg": req.quantityKg,
        "totalAmount": total,
        "status": "Pending",
        "pickupMessage": req.pickupMessage,
        "createdAt": datetime.now().isoformat()
    }
    STATE["offers"].insert(0, new_offer)
    return new_offer

# 12. PUT /api/offers/{id}
@app.put("/api/offers/{id}")
def update_offer(id: str, req: UpdateOfferRequest):
    for offer in STATE["offers"]:
        if offer["id"] == id:
            offer["status"] = req.status
            if req.counterPricePerQuintal:
                offer["counterPricePerQuintal"] = req.counterPricePerQuintal
                offer["totalAmount"] = int((req.counterPricePerQuintal / 100) * offer["quantityKg"])
            return offer
    raise HTTPException(status_code=404, detail="Offer not found")

# 13. POST /api/transactions
@app.post("/api/transactions")
def create_transaction(req: CreateTransactionRequest):
    offer = next((o for o in STATE["offers"] if o["id"] == req.offerId), None)
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found to create transaction")

    offer["status"] = "Accepted"
    txn_id = f"KHL-TXN-2026-{uuid.uuid4().hex[:4].upper()}"
    new_txn = {
        "id": txn_id,
        "lotId": offer["lotId"],
        "offerId": offer["id"],
        "crop": offer["crop"],
        "quantityKg": offer["quantityKg"],
        "finalPricePerQuintal": offer["offeredPricePerQuintal"],
        "totalAmount": offer["totalAmount"],
        "farmerId": "FARM-PUN-001",
        "farmerName": "Demo Farmer",
        "farmerLocation": "Khed, Pune",
        "buyerId": offer["buyerId"],
        "buyerName": offer["buyerName"],
        "buyerLocation": "Hadapsar, Pune",
        "grade": "Grade A",
        "qualityScore": 91,
        "status": "Confirmed",
        "createdAt": datetime.now().isoformat(),
        "paymentEscrowStatus": "Deposited in Escrow",
        "digitalReceiptId": f"RCP-PUN-2026-{uuid.uuid4().hex[:4].upper()}"
    }
    STATE["transactions"].insert(0, new_txn)
    return new_txn

# 14. GET /api/transactions
@app.get("/api/transactions")
def get_transactions():
    return STATE["transactions"]

# 15. GET /api/logistics/{id}
@app.get("/api/logistics/{id}")
def get_logistics(id: str):
    return STATE["logistics"]

# 16. GET /api/notifications
@app.get("/api/notifications")
def get_notifications():
    return STATE["notifications"]

# 17. POST /api/demo/reset
@app.post("/api/demo/reset")
def reset_demo():
    global STATE
    STATE = get_initial_state()
    return {"message": "Demo state reset successfully", "status": "reset"}
