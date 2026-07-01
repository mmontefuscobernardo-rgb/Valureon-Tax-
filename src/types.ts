export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'precatorio' | 'tributario' | 'mei' | 'geral';
}

export interface SolutionCard {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  ctaText: string;
  iconName: string;
}

export interface PrecatórioCalculationResult {
  faceValue: number;
  type: 'federal' | 'estadual' | 'municipal';
  action: 'sell' | 'buy';
  estimatedCashoutMin: number;
  estimatedCashoutMax: number;
  discountPercentage: number;
  timeframe: string;
  yieldEstimation?: string;
}

export interface TaxSavingResult {
  regime: 'simples' | 'presumido' | 'real';
  revenue: number;
  segment: string;
  estimatedAnnualSavingsMin: number;
  estimatedAnnualSavingsMax: number;
  successRate: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  service: 'precatorio_venda' | 'precatorio_compra' | 'consultoria_tributaria' | 'solucoes_mei' | 'outros';
  message: string;
  value?: number;
}
