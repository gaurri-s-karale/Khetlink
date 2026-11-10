import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Loader2
} from 'lucide-react';
import { SAMPLE_PRODUCE, analyzeProduceQuality } from '../../services/qualityAiService';
import { QualityAssessment } from '../../types';

export const QualityAI: React.FC = () => {
  const { setCurrentView, t } = useApp();

  const [selectedProduceType, setSelectedProduceType] = useState<'tomato' | 'onion' | 'potato' | 'soybean' | 'custom'>('tomato');
  const [previewImage, setPreviewImage] = useState<string>(SAMPLE_PRODUCE.tomato.imageUrl);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessment, setAssessment] = useState<QualityAssessment | null>(null);

  // Initial analysis on load
  React.useEffect(() => {
    handleAnalyze('tomato');
  }, []);

  const handleAnalyze = async (type: 'tomato' | 'onion' | 'potato' | 'soybean' | 'custom', customImg?: string) => {
    setSelectedProduceType(type);
    if (customImg) {
      setPreviewImage(customImg);
    } else if (type !== 'custom') {
      setPreviewImage(SAMPLE_PRODUCE[type].imageUrl);
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeProduceQuality(type, customImg || previewImage);
      setAssessment(result);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const dataUrl = uploadEvent.target?.result as string;
        handleAnalyze('custom', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-lg border border-gov-border shadow-gov">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-gov-agri" />
              <h1 className="text-2xl font-bold text-gov-primary tracking-tight">
                {t.qualityAI}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-lightGreen text-gov-agri border border-gov-agri/30">
                Prototype AI Assessment
              </span>
            </div>
            <p className="text-sm text-gov-muted mt-1">
              Assess produce quality, grading, and surface defect levels using computer vision inference.
            </p>
          </div>

          <div className="text-xs text-gov-muted bg-gov-bg p-2.5 rounded border border-gov-border">
            <span>Standardized grading benchmarks aligned with AGMARK & retail procurement norms</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Upload & Preset Samples (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-lg border border-gov-border shadow-gov space-y-4">
          <div className="border-b border-gov-border pb-3">
            <h2 className="text-base font-bold text-gov-primary">Produce Image Input</h2>
            <p className="text-xs text-gov-muted">Upload a photo of your harvest or test with calibrated samples</p>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <span className="text-[11px] font-bold text-gov-muted uppercase tracking-wider block mb-2">
              Test with Calibrated Crop Samples:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                id="sample-tomato-btn"
                type="button"
                onClick={() => handleAnalyze('tomato')}
                className={`p-2.5 rounded border text-xs font-bold flex flex-col items-center justify-center transition ${
                  selectedProduceType === 'tomato'
                    ? 'border-gov-primary bg-gov-lightBlue text-gov-primary ring-1 ring-gov-primary'
                    : 'border-gov-border hover:bg-gov-bg text-gov-text'
                }`}
              >
                <span className="text-xl">🍅</span>
                <span className="mt-1">Sample Tomato</span>
              </button>

              <button
                id="sample-onion-btn"
                type="button"
                onClick={() => handleAnalyze('onion')}
                className={`p-2.5 rounded border text-xs font-bold flex flex-col items-center justify-center transition ${
                  selectedProduceType === 'onion'
                    ? 'border-gov-primary bg-gov-lightBlue text-gov-primary ring-1 ring-gov-primary'
                    : 'border-gov-border hover:bg-gov-bg text-gov-text'
                }`}
              >
                <span className="text-xl">🧅</span>
                <span className="mt-1">Sample Onion</span>
              </button>

              <button
                id="sample-potato-btn"
                type="button"
                onClick={() => handleAnalyze('potato')}
                className={`p-2.5 rounded border text-xs font-bold flex flex-col items-center justify-center transition ${
                  selectedProduceType === 'potato'
                    ? 'border-gov-primary bg-gov-lightBlue text-gov-primary ring-1 ring-gov-primary'
                    : 'border-gov-border hover:bg-gov-bg text-gov-text'
                }`}
              >
                <span className="text-xl">🥔</span>
                <span className="mt-1">Sample Potato</span>
              </button>

              <button
                id="sample-soybean-btn"
                type="button"
                onClick={() => handleAnalyze('soybean')}
                className={`p-2.5 rounded border text-xs font-bold flex flex-col items-center justify-center transition ${
                  selectedProduceType === 'soybean'
                    ? 'border-gov-primary bg-gov-lightBlue text-gov-primary ring-1 ring-gov-primary'
                    : 'border-gov-border hover:bg-gov-bg text-gov-text'
                }`}
              >
                <span className="text-xl">🌱</span>
                <span className="mt-1">Sample Soybean</span>
              </button>
            </div>
          </div>

          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-gov-border rounded-lg p-6 text-center hover:border-gov-secondary transition relative bg-gov-bg/50">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              title="Upload Produce Photo"
            />
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gov-lightBlue flex items-center justify-center text-gov-primary mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-gov-primary">
                Drag & Drop Produce Image or <span className="text-gov-secondary underline">Browse File</span>
              </p>
              <p className="text-[11px] text-gov-muted mt-1">Supports JPG, PNG from phone camera or field scan</p>
            </div>
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-gov-muted uppercase">Image Preview & Inspection Grid:</span>
              <div className="relative rounded-lg overflow-hidden border border-gov-border max-h-56">
                <img
                  src={previewImage}
                  alt="Produce Preview"
                  className="w-full h-52 object-cover"
                />
                {/* Visual computer vision bounding grid overlay */}
                <div className="absolute inset-0 border-2 border-gov-agri/40 pointer-events-none grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-b border-gov-agri/30"></div>
                  <div className="border-r border-b border-gov-agri/30"></div>
                  <div className="border-b border-gov-agri/30"></div>
                  <div className="border-r border-b border-gov-agri/30"></div>
                  <div className="border-r border-b border-gov-agri/30 flex items-center justify-center">
                    <span className="text-[9px] bg-gov-agri text-white font-bold px-1 rounded shadow-xs">
                      CV REGION 1
                    </span>
                  </div>
                  <div className="border-b border-gov-agri/30"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quality Assessment Result (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-lg border border-gov-border shadow-gov">
            <div className="flex items-center justify-between pb-3 border-b border-gov-border">
              <span className="text-xs font-bold text-gov-muted uppercase tracking-wider">
                QUALITY ASSESSMENT REPORT
              </span>
              <span className="text-xs font-semibold text-gov-muted">
                Analyzed at {assessment?.timestamp || '10:30 AM'}
              </span>
            </div>

            {isAnalyzing ? (
              <div className="py-16 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-gov-agri animate-spin" />
                <p className="text-xs font-bold text-gov-primary">Running Computer Vision Model...</p>
                <p className="text-[11px] text-gov-muted">Checking skin texture, color uniformity, and blemishes</p>
              </div>
            ) : assessment ? (
              <div className="space-y-4 mt-4">
                {/* Big Grade Badge Header */}
                <div className="p-4 rounded-lg bg-gov-lightGreen border border-gov-agri/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded bg-gov-agri text-white flex items-center justify-center font-black text-xl shadow-xs">
                      {assessment.grade.replace('Grade ', '')}
                    </div>
                    <div>
                      <div className="text-base font-black text-gov-agri">{assessment.grade} Certified</div>
                      <div className="text-xs text-gov-text font-semibold">
                        Crop: {assessment.crop} • Category: {assessment.recommendedCategory}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-gov-primary">
                      {assessment.qualityScore} <span className="text-xs font-medium text-gov-muted">/ 100</span>
                    </div>
                    <div className="text-[11px] font-bold text-gov-agri">
                      Confidence: {assessment.confidencePercent}%
                    </div>
                  </div>
                </div>

                {/* Metric Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                    <span className="text-gov-muted text-[11px] block">Freshness</span>
                    <span className="font-bold text-gov-primary mt-0.5 block">{assessment.freshness}</span>
                  </div>
                  <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                    <span className="text-gov-muted text-[11px] block">Defect Level</span>
                    <span className="font-bold text-gov-primary mt-0.5 block">{assessment.defectLevel}</span>
                  </div>
                  <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                    <span className="text-gov-muted text-[11px] block">Size Caliber</span>
                    <span className="font-bold text-gov-primary mt-0.5 block">{assessment.size}</span>
                  </div>
                  <div className="p-2.5 rounded bg-gov-bg border border-gov-border">
                    <span className="text-gov-muted text-[11px] block">Target Market</span>
                    <span className="font-bold text-gov-agri mt-0.5 block truncate">{assessment.recommendedCategory}</span>
                  </div>
                </div>

                {/* Detected Issues / Observations */}
                <div className="border border-gov-border rounded-lg p-3.5 bg-white space-y-2">
                  <h4 className="text-xs font-bold text-gov-primary uppercase tracking-wider">
                    Surface & Visual Analysis Observations:
                  </h4>
                  <ul className="space-y-1 text-xs text-gov-text">
                    {assessment.detectedIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gov-agri flex-shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trust Notice */}
                <div className="p-3 rounded bg-gov-lightBlue/30 border border-gov-secondary/20 flex items-start space-x-2 text-[11px] text-gov-muted">
                  <ShieldCheck className="w-4 h-4 text-gov-secondary flex-shrink-0 mt-0.5" />
                  <span>
                    Quality verification score is digitally signed and linked with lot QR metadata to build verified buyer trust.
                  </span>
                </div>

                {/* Action Button: Create Lot with this Assessment */}
                <div className="pt-2">
                  <button
                    id="quality-ai-create-lot-btn"
                    onClick={() => setCurrentView('create-lot')}
                    className="w-full py-3 px-4 rounded bg-gov-primary hover:bg-gov-secondary text-white font-bold text-xs tracking-wider uppercase transition flex items-center justify-center space-x-2 shadow-gov"
                  >
                    <span>Create Lot with This Assessment ({assessment.grade})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
