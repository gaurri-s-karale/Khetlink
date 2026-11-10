import { QualityAssessment } from '../types';

export const SAMPLE_PRODUCE = {
  tomato: {
    crop: 'Tomato',
    label: 'Sample Tomato',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    assessment: {
      grade: 'Grade A',
      qualityScore: 91,
      freshness: 'High',
      defectLevel: 'Low',
      size: 'Medium',
      confidencePercent: 93,
      detectedIssues: ['Minor superficial skin mark (non-pathogenic)', 'Uniform carotenoid color indexing (Grade 1 Red)'],
      recommendedCategory: 'Premium Export'
    } as const
  },
  onion: {
    crop: 'Onion',
    label: 'Sample Onion',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    assessment: {
      grade: 'Grade A',
      qualityScore: 88,
      freshness: 'High',
      defectLevel: 'Low',
      size: 'Large',
      confidencePercent: 91,
      detectedIssues: ['Intact dry outer tunic/skin', 'Minimal neck thickness, dry root plate'],
      recommendedCategory: 'Premium Domestic'
    } as const
  },
  potato: {
    crop: 'Potato',
    label: 'Sample Potato',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
    assessment: {
      grade: 'Grade B',
      qualityScore: 82,
      freshness: 'Medium',
      defectLevel: 'Moderate',
      size: 'Medium',
      confidencePercent: 88,
      detectedIssues: ['Slight surface dust adherence', 'Minor mechanical sorting scuff (<3%)'],
      recommendedCategory: 'Standard Mandi'
    } as const
  },
  soybean: {
    crop: 'Soybean',
    label: 'Sample Soybean',
    imageUrl: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&auto=format&fit=crop&q=80',
    assessment: {
      grade: 'Grade A',
      qualityScore: 90,
      freshness: 'High',
      defectLevel: 'Low',
      size: 'Medium',
      confidencePercent: 92,
      detectedIssues: ['Clean golden-yellow seed coat', 'Low moisture index (<10%), zero pod borer damage'],
      recommendedCategory: 'Premium Export'
    } as const
  }
};

export async function analyzeProduceQuality(
  cropType: 'tomato' | 'onion' | 'potato' | 'soybean' | 'custom',
  customImageUrl?: string
): Promise<QualityAssessment> {
  // Simulate lightweight AI inference latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (cropType !== 'custom' && SAMPLE_PRODUCE[cropType]) {
    const sample = SAMPLE_PRODUCE[cropType];
    return {
      id: `QA-${Date.now()}`,
      crop: sample.crop,
      imagePreviewUrl: sample.imageUrl,
      grade: sample.assessment.grade,
      qualityScore: sample.assessment.qualityScore,
      freshness: sample.assessment.freshness,
      defectLevel: sample.assessment.defectLevel,
      size: sample.assessment.size,
      confidencePercent: sample.assessment.confidencePercent,
      detectedIssues: [...sample.assessment.detectedIssues],
      recommendedCategory: sample.assessment.recommendedCategory,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  // Custom uploaded image
  return {
    id: `QA-${Date.now()}`,
    crop: 'Tomato',
    imagePreviewUrl: customImageUrl || SAMPLE_PRODUCE.tomato.imageUrl,
    grade: 'Grade A',
    qualityScore: 90,
    freshness: 'High',
    defectLevel: 'Low',
    size: 'Medium',
    confidencePercent: 92,
    detectedIssues: ['Clean fruit surface detected', 'Even pigmentation distribution'],
    recommendedCategory: 'Premium Domestic',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}
