export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface ProblemPreset {
  id: string;
  title: Record<SupportedLanguage, string>;
  domain: Record<SupportedLanguage, string>;
  enterpriseType: Record<SupportedLanguage, string>;
  summary: Record<SupportedLanguage, string>;
  defaultProblemText: Record<SupportedLanguage, string>;
  audioScript: Record<SupportedLanguage, string>;
  defaultMetrics: {
    monthlyTurnover: number;
    supplierCreditDays: number;
    deadStockPercentage: number;
    workingCapitalGap: number;
  };
}

export interface ActionPlanStep {
  phase: string;
  title: string;
  steps: string[];
  expectedOutcome: string;
}

export interface DiagnosticReport {
  executiveSummary: string;
  rootCauseAnalysis: string[];
  financialImpact: {
    cashFlowImpact: string;
    projectedRecovery: string;
    roiTimeline: string;
  };
  actionPlan: ActionPlanStep[];
  negotiationScript: string;
  audioSummaryText: string;
  engineUsed: string;
  generatedAt: string;
}

export interface MentorMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  audioSummary?: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  language?: SupportedLanguage;
}

export interface ChallengeOption {
  id: string;
  text: string;
  financialScore: number;
  riskScore: number;
  relationshipScore: number;
  explanation: string;
}

export interface SkillProofChallenge {
  id: string;
  title: Record<SupportedLanguage, string>;
  domain: Record<SupportedLanguage, string>;
  difficulty: 'Foundation' | 'Operational' | 'Executive';
  scenario: Record<SupportedLanguage, string>;
  financialContext: {
    availableCash: string;
    creditOwed: string;
    weeklyTurnover: string;
    inventoryAtRisk: string;
  };
  options: ChallengeOption[];
  bestOptionId: string;
  executiveDebrief: Record<SupportedLanguage, string>;
}

export interface SkillProofCredential {
  id: string;
  certificateNumber: string;
  merchantName: string;
  enterpriseName: string;
  issueDate: string;
  score: number;
  domain: string;
  level: string;
  verificationHash: string;
}

export interface StoreProfile {
  storeName: string;
  merchantName: string;
  enterpriseCategory: 'General Merchandise Store' | 'Retail Provisions Emporium' | 'Wholesale & Semi-Urban Hub' | 'Community NGO Enterprise' | 'Consumer Packaged Goods Outlet';
  monthlyRevenue: string;
  primaryLocation: string;
}
