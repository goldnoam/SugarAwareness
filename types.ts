
export type Theme = 'dark' | 'bright' | 'colorful';
export type FontSize = 'small' | 'medium' | 'large';
export type Language = 'en' | 'he' | 'zh' | 'hi' | 'de' | 'es' | 'fr';

export interface FoodItem {
  name: string;
  sugarContent: string;
  description: string;
  image: string;
}

export interface HealthySwap {
  original: string;
  swap: string;
  benefit: string;
  image: string;
}

export interface TranslationSet {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  dangersTitle: string;
  consequencesTitle: string;
  healthySwapsTitle: string;
  footerText: string;
  feedbackLink: string;
  clearInput: string;
  exportSearch: string;
  ttsButton: string;
  amputationWarning: string;
  sugarExamples: string[];
  diabetesSymptoms: string[];
  healthTerms: string[];
  statsTitle: string;
  consumptionChart: string;
  prevalenceChart: string;
  yearLabel: string;
  gramsLabel: string;
  percentageLabel: string;
  ageGroupLabel: string;
  shareText: string;
  shareTitle: string;
  disclaimer: string;
  prevention: string;
  foodItems: FoodItem[];
  healthySwaps: HealthySwap[];
  chartTooltips: {
    sugarLimit: string;
    riskHigh: string;
    riskMedium: string;
    riskLow: string;
  };
}

export interface ChartDataItem {
  name: string;
  value: number;
}
