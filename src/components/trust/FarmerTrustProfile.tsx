import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Star,
  Award,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Calendar,
  DollarSign,
  FileText,
  Lock,
  Building2,
  Info
} from 'lucide-react';

export const FarmerTrustProfile: React.FC = () => {
  const { farmer, transactions, t } = useApp();

  const formattedSales = (farmer.totalSalesValue / 100000).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full bg-gov-lightGreen text-gov-agri flex items-center justify-center font-black text-2xl border-2 border-gov-agri/40 shadow-sm flex-shrink-0">
              DF
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
                  {farmer.name}
                </h1>
                {farmer.kycVerified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    KYC Verified
                  </span>
                )}
              </div>
              <p className="text-sm text-gov-muted flex items-center mt-0.5">
                <MapPin className="w-3.5 h-3.5 mr-1 text-gov-muted" />
                {farmer.location}, {farmer.state} • Registered Member since {farmer.memberSince}
              </p>
              <div className="flex items-center space-x-1.5 mt-2">
                {farmer.crops.map((crop) => (
                  <span
                    key={crop}
                    className="px-2 py-0.5 rounded text-[11px] font-semibold bg-gov-bg text-gov-text border border-gov-border"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="text-right self-start md:self-auto bg-gov-bg p-3 rounded border border-gov-border">
            <span className="text-[11px] text-gov-muted uppercase font-bold block">Digital Mandi ID</span>
            <span className="text-xs font-mono font-bold text-gov-primary">{farmer.id}</span>
          </div>
        </div>
      </div>

      {/* 4 Trust Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Successful Transactions</div>
          <div className="text-2xl font-extrabold text-gov-primary mt-1">
            {farmer.totalTransactions} Trades
          </div>
          <p className="text-[11px] text-gov-muted mt-1">Verified on electronic escrow</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Total Settled Sales</div>
          <div className="text-2xl font-extrabold text-gov-agri mt-1">
            ₹{formattedSales} Lakh
          </div>
          <p className="text-[11px] text-gov-muted mt-1">Direct to bank clearance</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Buyer Satisfaction Rating</div>
          <div className="flex items-center space-x-1.5 mt-1">
            <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
            <span className="text-2xl font-extrabold text-gov-text">{farmer.rating} / 5</span>
          </div>
          <p className="text-[11px] text-gov-muted mt-1">Quality consistency score</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
          <div className="text-[11px] font-bold text-gov-muted uppercase">Contract Completion Rate</div>
          <div className="text-2xl font-extrabold text-gov-primary mt-1">
            {farmer.completionRate}%
          </div>
          <p className="text-[11px] text-gov-agri font-semibold mt-1">Zero default record</p>
        </div>
      </div>

      {/* Digital Market Profile & Credit Readiness Card */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-gov-border">
          <Building2 className="w-5 h-5 text-gov-primary" />
          <h2 className="text-base font-bold text-gov-primary">
            Digital Trade Ledger & Institutional Credit Readiness
          </h2>
        </div>

        <p className="text-xs text-gov-text leading-relaxed">
          Your transparent transaction history helps build a trusted digital market profile. By eliminating informal non-receipt cash deals, every quintal sold on KhetLink is digitally documented with quality certification, weight slip, and bank escrow payment timestamps.
        </p>

        {/* Regulatory & Credit Disclaimer */}
        <div className="p-4 rounded-lg bg-gov-lightBlue/40 border border-gov-secondary/30 flex items-start space-x-3 text-xs">
          <Info className="w-5 h-5 text-gov-secondary flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-gov-primary block mb-0.5">Statutory Credit Advisory:</span>
            <p className="text-gov-muted leading-relaxed">
              Transaction records may support future credit assessment, subject to lender policies. KhetLink does not issue credit or guarantee loan approvals. Data sharing with licensed NABARD/RBI financial institutions requires explicit farmer consent.
            </p>
          </div>
        </div>
      </div>

      {/* Verified Transaction History Snapshot */}
      <div className="bg-white rounded-lg border border-gov-border shadow-gov p-5">
        <h3 className="text-sm font-bold text-gov-primary mb-3">Verified Trade Log</h3>
        <div className="space-y-2.5">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="p-3 rounded bg-gov-bg border border-gov-border/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-gov-agri flex-shrink-0" />
                <div>
                  <span className="font-bold text-gov-text">{t.crop} ({t.quantityKg} kg, {t.grade})</span>
                  <span className="text-gov-muted ml-2">Sold to {t.buyerName}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-mono text-gov-muted">{t.id}</span>
                <span className="font-black text-gov-primary">₹{t.totalAmount.toLocaleString('en-IN')}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-lightGreen text-gov-agri">
                  {t.paymentEscrowStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
