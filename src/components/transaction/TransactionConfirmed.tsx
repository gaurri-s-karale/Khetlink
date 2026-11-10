import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  CheckCircle2,
  Truck,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  DollarSign,
  ArrowRight,
  Filter,
  Eye,
  X
} from 'lucide-react';
import { Transaction, TransactionStatus } from '../../types';

export const TransactionConfirmed: React.FC = () => {
  const { transactions, setCurrentView, t } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [activeReceipt, setActiveReceipt] = useState<Transaction | null>(null);

  // Latest transaction is top
  const latestTxn = transactions[0];

  const filteredTxns = transactions.filter((t) => {
    if (filterStatus === 'All') return true;
    return t.status === filterStatus;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Receipt className="w-6 h-6 text-gov-primary" />
            <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
              {t.transactions} & Digital Settlements
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
              Escrow Secured
            </span>
          </div>
          <p className="text-sm text-gov-muted mt-1">
            Standardized legally binding trade contracts, weighment slips, and tax invoices.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('logistics')}
          className="px-4 py-2 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs flex items-center space-x-2 shadow-sm transition"
        >
          <Truck className="w-4 h-4" />
          <span>Track Active Delivery →</span>
        </button>
      </div>

      {/* Latest Transaction Highlight Card */}
      {latestTxn && (
        <div className="bg-white rounded-lg border border-gov-agri/40 shadow-gov p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gov-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gov-lightGreen text-gov-agri flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gov-agri uppercase tracking-wider">LATEST SETTLED CONTRACT</span>
                <h2 className="text-lg font-black text-gov-primary">
                  Transaction ID: {latestTxn.id}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded text-xs font-bold bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                STATUS: {latestTxn.status.toUpperCase()}
              </span>
              <button
                onClick={() => setActiveReceipt(latestTxn)}
                className="px-3 py-1 rounded bg-gov-bg hover:bg-gov-lightBlue text-gov-primary text-xs font-semibold border border-gov-border flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>View Receipt</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded bg-gov-bg border border-gov-border">
              <span className="text-gov-muted text-[11px] block">Commodity & Grade</span>
              <span className="font-extrabold text-gov-primary text-sm mt-0.5 block">
                {latestTxn.crop} • {latestTxn.grade}
              </span>
            </div>
            <div className="p-3 rounded bg-gov-bg border border-gov-border">
              <span className="text-gov-muted text-[11px] block">Quantity Dispatched</span>
              <span className="font-extrabold text-gov-text text-sm mt-0.5 block">
                {latestTxn.quantityKg.toLocaleString('en-IN')} kg (5 Quintals)
              </span>
            </div>
            <div className="p-3 rounded bg-gov-bg border border-gov-border">
              <span className="text-gov-muted text-[11px] block">Agreed Final Rate</span>
              <span className="font-black text-gov-agri text-sm mt-0.5 block">
                ₹{latestTxn.finalPricePerQuintal.toLocaleString('en-IN')} / q
              </span>
            </div>
            <div className="p-3 rounded bg-gov-lightBlue border border-gov-secondary/30">
              <span className="text-gov-primary font-bold text-[11px] block">Total Trade Amount</span>
              <span className="font-black text-gov-primary text-base mt-0.5 block">
                ₹{latestTxn.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="p-3 rounded bg-gov-lightGreen/30 border border-gov-agri/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <div className="flex items-center space-x-2 text-gov-agri font-medium">
              <ShieldCheck className="w-4 h-4 text-gov-agri flex-shrink-0" />
              <span>Buyer Escrow Deposit: ₹{latestTxn.totalAmount.toLocaleString('en-IN')} locked in smart contract. Will release upon farmgate weighment & gate inspection.</span>
            </div>
            <button
              id="txn-track-delivery-btn"
              onClick={() => setCurrentView('logistics')}
              className="px-3.5 py-1.5 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs flex items-center space-x-1.5 transition whitespace-nowrap"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Delivery Timeline</span>
            </button>
          </div>
        </div>
      )}

      {/* Transaction History Filter & Table */}
      <div className="bg-white rounded-lg border border-gov-border shadow-gov overflow-hidden">
        <div className="p-4 border-b border-gov-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-gov-primary">My Transaction History</h3>
            <p className="text-xs text-gov-muted">Immutable ledger of completed and in-progress farm sales</p>
          </div>

          <div className="flex items-center space-x-1.5">
            {['All', 'Confirmed', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                  filterStatus === st
                    ? 'bg-gov-primary text-white'
                    : 'bg-gov-bg text-gov-muted hover:text-gov-primary border border-gov-border'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gov-bg border-b border-gov-border text-[11px] font-bold text-gov-muted uppercase tracking-wider">
                <th className="p-3.5">Transaction ID</th>
                <th className="p-3.5">Crop</th>
                <th className="p-3.5">Buyer</th>
                <th className="p-3.5">Quantity</th>
                <th className="p-3.5">Price</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-border text-xs">
              {filteredTxns.map((tx) => (
                <tr key={tx.id} className="hover:bg-gov-lightBlue/20 transition">
                  <td className="p-3.5 font-mono font-bold text-gov-primary">{tx.id}</td>
                  <td className="p-3.5 font-bold text-gov-text">{tx.crop}</td>
                  <td className="p-3.5 text-gov-muted">{tx.buyerName}</td>
                  <td className="p-3.5 text-gov-text">{tx.quantityKg} kg</td>
                  <td className="p-3.5 text-gov-muted">₹{tx.finalPricePerQuintal}/q</td>
                  <td className="p-3.5 font-extrabold text-gov-primary">
                    ₹{tx.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-gov-muted">
                    {new Date(tx.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.status === 'Confirmed'
                          ? 'bg-gov-lightOrange text-gov-accent border border-gov-accent/30'
                          : 'bg-gov-lightGreen text-gov-agri border border-gov-agri/30'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setActiveReceipt(tx)}
                      className="px-2.5 py-1 rounded bg-white hover:bg-gov-lightBlue text-gov-secondary font-semibold text-[11px] border border-gov-border"
                    >
                      Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg border border-gov-border shadow-gov-lg max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gov-primary px-5 py-3 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Standardized Electronic Trade Receipt</h3>
                <p className="text-[11px] text-gov-lightBlue/80">KhetLink Digital Clearing House</p>
              </div>
              <button onClick={() => setActiveReceipt(null)} className="text-white/80 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable Receipt Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between items-start pb-3 border-b border-gov-border">
                <div>
                  <h4 className="text-base font-black text-gov-primary">KHETLINK ESCROW RECEIPT</h4>
                  <p className="text-[11px] text-gov-muted">Digital Agri-Mandi Trade Protocol</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-gov-primary font-bold">{activeReceipt.digitalReceiptId}</span>
                  <p className="text-[10px] text-gov-muted">Date: {new Date(activeReceipt.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 border-b border-gov-border">
                <div>
                  <span className="text-[10px] font-bold text-gov-muted uppercase block">SELLER / FARMER</span>
                  <p className="font-bold text-gov-text mt-0.5">{activeReceipt.farmerName}</p>
                  <p className="text-[11px] text-gov-muted">{activeReceipt.farmerLocation}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gov-muted uppercase block">BUYER / REQUISITIONER</span>
                  <p className="font-bold text-gov-text mt-0.5">{activeReceipt.buyerName}</p>
                  <p className="text-[11px] text-gov-muted">{activeReceipt.buyerLocation}</p>
                </div>
              </div>

              <div className="space-y-2 py-2 border-b border-gov-border">
                <div className="flex justify-between">
                  <span className="text-gov-muted">Commodity:</span>
                  <span className="font-bold text-gov-text">{activeReceipt.crop} ({activeReceipt.grade})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gov-muted">Certified Weight:</span>
                  <span className="font-bold text-gov-text">{activeReceipt.quantityKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gov-muted">Settlement Price:</span>
                  <span className="font-bold text-gov-text">₹{activeReceipt.finalPricePerQuintal} / quintal</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-gov-border/60">
                  <span className="font-bold text-gov-primary">Total Gross Value:</span>
                  <span className="font-black text-gov-agri">₹{activeReceipt.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-gov-bg p-2.5 rounded border border-gov-border text-[11px] text-gov-muted space-y-1">
                <div className="flex justify-between">
                  <span>Escrow Account:</span>
                  <span className="font-mono text-gov-text font-bold">STATE_MANDI_ESCROW_0091</span>
                </div>
                <div className="flex justify-between">
                  <span>Settlement Status:</span>
                  <span className="text-gov-agri font-bold">{activeReceipt.paymentEscrowStatus}</span>
                </div>
              </div>
            </div>

            <div className="bg-gov-bg px-5 py-3 border-t border-gov-border flex justify-end space-x-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded bg-white text-gov-primary border border-gov-border text-xs font-semibold hover:bg-gov-lightBlue flex items-center space-x-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
              <button
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-1.5 rounded bg-gov-primary text-white text-xs font-bold hover:bg-gov-secondary"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
