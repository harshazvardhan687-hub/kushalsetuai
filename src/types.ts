export type SupportedLanguage = 'en' | 'te' | 'hi';

export type UserRole = 'student' | 'organization' | 'mentor';

export type WorkflowStepId =
  | 'landing'
  | 'problem_submission'
  | 'problem_readiness'
  | 'mission_generator'
  | 'growth_matching'
  | 'mentor_chat'
  | 'solution_submission'
  | 'quality_evaluation'
  | 'skill_proof'
  | 'client_verification'
  | 'impact_proof'
  | 'workproof_passport'
  | 'employment_recommendations';

export interface WorkflowStageMeta {
  stepNumber: number;
  id: WorkflowStepId;
  title: string;
  shortTitle: string;
  description: string;
}

export interface User {
  user_id: string;
  name: string;
  role: UserRole;
  language: SupportedLanguage;
  location: string;
  avatar?: string;
}

export interface StudentProfile {
  student_id: string;
  name: string;
  college: string;
  location: string;
  skills: string[];
  career_interest: string;
  available_time: string;
  completed_missions: number;
  skill_scores: Record<string, number>;
  bio: string;
  avatar: string;
}

export interface Organization {
  organization_id: string;
  organization_name: string;
  organization_type: string;
  location: string;
  contact_person: string;
  contact_information: string;
  language_preference: SupportedLanguage;
}

export interface Problem {
  problem_id: string;
  organization_id: string;
  organization_name: string;
  location: string;
  title: string;
  problem_description: string;
  telugu_description?: string;
  category: string;
  input_method: 'text' | 'voice' | 'image';
  readiness_score: number;
  clarity_score: number;
  safety_score: number;
  solvability_score: number;
  measurability_score: number;
  clarification_needed: boolean;
  clarification_questions: string[];
  clarification_answers?: Record<string, string>;
  status: 'submitted' | 'clarifying' | 'ready' | 'mission_generated';
  submitted_at: string;
}

export interface MissionTask {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'locked';
}

export interface Mission {
  mission_id: string;
  problem_id: string;
  title: string;
  organization_name: string;
  location: string;
  tasks: MissionTask[];
  required_skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_time: string;
  deliverables: string[];
  expected_outcome: string;
  created_at: string;
}

export interface MissionMatch {
  match_id: string;
  mission_id: string;
  student: StudentProfile;
  growth_match_score: number;
  existing_skill_score: number;
  learnable_skill_gap: number;
  matching_rationale: string;
  is_selected?: boolean;
}

export interface MentorStepGuide {
  stepId: number;
  title: string;
  status: 'completed' | 'current' | 'locked';
  instruction: string;
  concept_explanation: string;
  resource_link: string;
  template_snippet?: string;
}

export interface MentorChatMessage {
  id: string;
  sender?: 'student' | 'mentor' | 'system' | 'user' | 'assistant';
  role?: 'student' | 'mentor' | 'system' | 'user' | 'assistant';
  message?: string;
  content?: string;
  telugu_message?: string;
  timestamp: string;
  codeSnippet?: string;
  audioText?: string;
  audioSummary?: string;
  suggestedFollowUps?: string[];
}

export type MentorMessage = MentorChatMessage;

export interface SolutionSubmissionData {
  submission_id: string;
  mission_id: string;
  student_id: string;
  files: { name: string; size: string; type: string }[];
  screenshots: string[];
  explanation: string;
  demo_link: string;
  submitted_at: string;
  submission_status: 'submitted' | 'evaluated';
}

export interface QualityEvaluation {
  evaluation_id: string;
  submission_id: string;
  task_completion: number;
  solution_quality: number;
  accuracy: number;
  documentation: number;
  overall_score: number;
  summary_feedback: string;
  key_strengths: string[];
  refinement_areas: string[];
}

export interface SkillProofQuestion {
  id: string;
  question: string;
  componentTested: string;
  studentAnswer: string;
  options?: string[];
  correctOptionIndex?: number;
  selectedOptionIndex?: number;
  aiEvaluation: string;
  score: number;
}

export interface SkillProofResult {
  skillproof_id: string;
  submission_id: string;
  overall_score: number;
  skill_breakdown: {
    skill: string;
    score: number;
  }[];
  questions: SkillProofQuestion[];
  verification_verdict: string;
}

export interface ClientMentorVerification {
  verification_id: string;
  mission_id: string;
  client: {
    owner_name: string;
    organization_name: string;
    location: string;
    problem_solved: boolean;
    solution_useful: boolean;
    feedback: string;
    telugu_feedback?: string;
    rating: number;
    verified_date: string;
  };
  mentor: {
    mentor_name: string;
    designation: string;
    organization: string;
    technical_soundness: string;
    remarks: string;
    rating: number;
    verified_date: string;
  };
}

export interface ImpactMetric {
  dimension: string;
  before: string;
  after: string;
  impact: string;
}

export interface ImpactProofData {
  impact_id: string;
  mission_id: string;
  organization_name: string;
  summary: string;
  metrics: ImpactMetric[];
}

export interface WorkProofPassportData {
  passport_id: string;
  student_name: string;
  college: string;
  role: string;
  mission_title: string;
  organization_name: string;
  location: string;
  skills_verified: string[];
  skill_proof_score: number;
  impact_summary: string;
  evidence_files: string[];
  verifications: {
    type: string;
    verifier: string;
    status: string;
  }[];
  verification_hash: string;
  issue_date: string;
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  stipend: string;
  match_score: number;
  why_matched: string;
  skills_matched: string[];
}

export type EmploymentRecommendation = JobRecommendation;

// Compatibility & Support Types for Existing Helper Components
export interface StoreProfile {
  storeName: string;
  merchantName: string;
  enterpriseCategory: string;
  monthlyRevenue: string;
  primaryLocation: string;
}

export interface DiagnosticReport {
  executiveSummary: string;
  rootCauseAnalysis: string[];
  financialImpact: {
    cashFlowImpact: string;
    projectedRecovery: string;
    roiTimeline: string;
  };
  actionPlan: {
    phase: string;
    title: string;
    steps: string[];
    expectedOutcome: string;
  }[];
  negotiationScript: string;
  audioSummaryText: string;
  engineUsed?: string;
  generatedAt?: string;
}

export interface ProblemPreset {
  id: string;
  title: Record<SupportedLanguage, string> | string;
  domain?: Record<SupportedLanguage, string> | string;
  enterpriseType?: Record<SupportedLanguage, string> | string;
  summary?: Record<SupportedLanguage, string> | string;
  defaultProblemText: Record<SupportedLanguage, string> | string;
  audioScript?: Record<SupportedLanguage, string> | string;
  defaultMetrics: {
    monthlyTurnover: number;
    supplierCreditDays: number;
    deadStockPercentage: number;
    workingCapitalGap: number;
  };
}

export interface SkillProofChallenge {
  id: string;
  title: Record<SupportedLanguage, string> | string;
  domain: Record<SupportedLanguage, string> | string;
  difficulty?: string;
  scenario: Record<SupportedLanguage, string> | string;
  financialContext: {
    availableCash: string;
    creditOwed: string;
    weeklyTurnover: string;
    inventoryAtRisk?: string;
  };
  options: {
    id: string;
    text: string;
    financialScore: number;
    riskScore: number;
    relationshipScore: number;
    explanation: string;
  }[];
  bestOptionId?: string;
  executiveDebrief?: Record<SupportedLanguage, string> | string;
}

export interface SkillProofCredential {
  id?: string;
  credentialId?: string;
  certificateNumber?: string;
  challengeTitle?: string;
  merchantName: string;
  storeName?: string;
  enterpriseName?: string;
  score: number;
  level?: string;
  domain: string;
  issuedAt?: string;
  issueDate?: string;
  verificationHash: string;
}
