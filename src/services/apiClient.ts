/**
 * KhetLink API Client
 * Seamlessly interfaces with the FastAPI backend (http://localhost:8000)
 * with automatic fallback to local state for 100% offline resilience.
 */

const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchBackendHealth(): Promise<{ status: string; platform: string; version: string } | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    if (res.ok) return await res.json();
  } catch {
    // Backend offline or unreachable
  }
  return null;
}

export async function fetchBackendMarketPrices() {
  try {
    const res = await fetch(`${API_BASE_URL}/market-prices`);
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

export async function requestBackendPricePredict(payload: {
  crop: string;
  location: string;
  quantityKg: number;
  currentPrice: number;
  expectedSellingDays: number;
  storageAvailability: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/price-ai/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

export async function requestBackendQualityAnalyze(cropType: string, customImageUrl?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/quality-ai/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cropType, customImageUrl })
    });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

export async function requestBackendBuyerMatch(lotId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/buyer-match?lot_id=${encodeURIComponent(lotId)}`, {
      method: 'POST'
    });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}

export async function resetBackendDemo() {
  try {
    const res = await fetch(`${API_BASE_URL}/demo/reset`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch {}
  return null;
}
