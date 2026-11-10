import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  CheckCircle2,
  Share2,
  Users,
  Eye,
  PlusCircle,
  Calendar,
  MapPin,
  Tag,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DigitalLot, QualityGrade } from '../../types';
import { CROP_DEFAULT_IMAGES, getProduceImage } from '../../data/seedData';

export const CreateLot: React.FC = () => {
  const { addLot, setCurrentView, setSelectedLotId, farmer, t } = useApp();

  const [formData, setFormData] = useState({
    crop: 'Tomato',
    quantityKg: 500,
    grade: 'Grade A' as QualityGrade,
    qualityScore: 91,
    location: 'Khed, Pune',
    state: 'Maharashtra',
    expectedPricePerQuintal: 3100,
    harvestDate: '2026-09-03',
    availableFrom: '2026-09-04',
    storageType: 'Covered Shade / Plastic Crates',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80'
  });

  const [createdLot, setCreatedLot] = useState<DigitalLot | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLot = addLot({
      crop: formData.crop,
      quantityKg: formData.quantityKg,
      grade: formData.grade,
      qualityScore: formData.qualityScore,
      location: formData.location,
      state: formData.state,
      expectedPricePerQuintal: formData.expectedPricePerQuintal,
      harvestDate: formData.harvestDate,
      availableFrom: formData.availableFrom,
      storageType: formData.storageType,
      status: 'Active',
      imageUrl: formData.imageUrl
    });
    setCreatedLot(newLot);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov">
        <div className="flex items-center space-x-2">
          <PlusCircle className="w-6 h-6 text-gov-primary" />
          <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
            {t.createLot}
          </h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-lightBlue text-gov-primary border border-gov-border">
            Standardized Listing
          </span>
        </div>
        <p className="text-sm text-gov-muted mt-1">
          Create an interoperable digital produce lot with pre-verified quality grades and price expectations.
        </p>
      </div>

      {createdLot ? (
        /* Success State */
        <div className="bg-white p-8 rounded-lg border border-gov-agri/30 shadow-gov text-center max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-gov-lightGreen text-gov-agri flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-gov-agri uppercase tracking-wider">SUCCESS</span>
            <h2 className="text-2xl font-black text-gov-primary mt-1">Digital lot created successfully.</h2>
            <p className="text-xs text-gov-muted mt-1">
              Your produce listing is now indexed and live on the KhetLink discovery network.
            </p>
          </div>

          {/* Lot Summary Card */}
          <div className="bg-gov-bg p-5 rounded-lg border border-gov-border text-left space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gov-border">
              <span className="text-xs font-bold text-gov-muted">LOT IDENTIFIER:</span>
              <span className="text-sm font-black text-gov-primary bg-white px-2.5 py-0.5 rounded border border-gov-border">
                {createdLot.id}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-gov-muted block">Crop:</span>
                <span className="font-bold text-gov-primary">{createdLot.crop}</span>
              </div>
              <div>
                <span className="text-gov-muted block">Quantity:</span>
                <span className="font-bold text-gov-primary">{createdLot.quantityKg} kg</span>
              </div>
              <div>
                <span className="text-gov-muted block">Quality Grade:</span>
                <span className="font-bold text-gov-agri">{createdLot.grade} ({createdLot.qualityScore}/100)</span>
              </div>
              <div>
                <span className="text-gov-muted block">Expected Price:</span>
                <span className="font-bold text-gov-primary">₹{createdLot.expectedPricePerQuintal.toLocaleString('en-IN')}/q</span>
              </div>
            </div>

            <div className="text-xs text-gov-muted pt-1">
              <span>Location: {createdLot.location}, {createdLot.state} • Available From: {createdLot.availableFrom}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="lot-created-find-buyers-btn"
              onClick={() => {
                setSelectedLotId(createdLot.id);
                setCurrentView('buyer-matching');
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded bg-gov-agri hover:bg-green-800 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition"
            >
              <Users className="w-4 h-4" />
              <span>Find Best Buyers Now →</span>
            </button>

            <button
              onClick={() => {
                setSelectedLotId(createdLot.id);
                setCurrentView('my-lots');
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded bg-gov-lightBlue text-gov-primary hover:bg-blue-100 font-semibold text-xs flex items-center justify-center space-x-1.5 border border-gov-secondary/30 transition"
            >
              <Eye className="w-4 h-4 text-gov-secondary" />
              <span>View in My Lots</span>
            </button>

            <button
              onClick={() => setCreatedLot(null)}
              className="w-full sm:w-auto px-4 py-2.5 rounded bg-white text-gov-text hover:bg-gov-bg font-semibold text-xs border border-gov-border transition"
            >
              Create Another Lot
            </button>
          </div>
        </div>
      ) : (
        /* Input Form */
        <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Crop */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Crop</label>
                <select
                  value={formData.crop}
                  onChange={(e) => {
                    const selectedCrop = e.target.value;
                    setFormData({
                      ...formData,
                      crop: selectedCrop,
                      imageUrl: CROP_DEFAULT_IMAGES[selectedCrop] || formData.imageUrl
                    });
                  }}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                >
                  <option value="Tomato">Tomato (Hybrid Red)</option>
                  <option value="Onion">Onion (Garwa)</option>
                  <option value="Potato">Potato (Kufri)</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Cotton">Cotton</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  required
                  value={formData.quantityKg}
                  onChange={(e) => setFormData({ ...formData, quantityKg: Number(e.target.value) })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>

              {/* Quality Grade */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Quality Grade (Verified by AI)</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value as QualityGrade })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                >
                  <option value="Grade A">Grade A (Premium Quality)</option>
                  <option value="Grade B">Grade B (Standard Market)</option>
                  <option value="Grade C">Grade C (Processing Tier)</option>
                </select>
              </div>

              {/* Quality Score */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Quality Score (/100)</label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={formData.qualityScore}
                  onChange={(e) => setFormData({ ...formData, qualityScore: Number(e.target.value) })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>

              {/* Expected Price */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Expected Price (₹ / quintal)</label>
                <input
                  type="number"
                  required
                  value={formData.expectedPricePerQuintal}
                  onChange={(e) => setFormData({ ...formData, expectedPricePerQuintal: Number(e.target.value) })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>

              {/* Farm Location */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Farm / Mandi Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>

              {/* Harvest Date */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Harvest Date</label>
                <input
                  type="date"
                  value={formData.harvestDate}
                  onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>

              {/* Available From */}
              <div>
                <label className="block text-xs font-bold text-gov-text mb-1">Available For Dispatch From</label>
                <input
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                  className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
                />
              </div>
            </div>

            {/* Storage Type */}
            <div>
              <label className="block text-xs font-bold text-gov-text mb-1">Storage Condition & Packaging</label>
              <input
                type="text"
                value={formData.storageType}
                onChange={(e) => setFormData({ ...formData, storageType: e.target.value })}
                className="w-full text-xs bg-gov-bg border border-gov-border rounded p-2.5 text-gov-text font-medium focus:outline-none focus:border-gov-primary"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-gov-border flex justify-end">
              <button
                id="create-digital-lot-btn"
                type="submit"
                className="px-6 py-3 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 transition shadow-gov"
              >
                <Package className="w-4 h-4" />
                <span>CREATE LOT</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
