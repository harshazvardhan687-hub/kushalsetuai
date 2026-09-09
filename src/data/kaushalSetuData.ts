import {
  WorkflowStageMeta,
  Problem,
  Mission,
  MissionMatch,
  StudentProfile,
  MentorStepGuide,
  MentorChatMessage,
  SolutionSubmissionData,
  QualityEvaluation,
  SkillProofResult,
  ClientMentorVerification,
  ImpactProofData,
  WorkProofPassportData,
  JobRecommendation,
} from '../types';

export const WORKFLOW_STAGES: WorkflowStageMeta[] = [
  {
    stepNumber: 1,
    id: 'problem_submission',
    title: '1. Problem Submission',
    shortTitle: 'Problem Input',
    description: 'Local organization submits a real-world operational bottleneck via text or Telugu voice.',
  },
  {
    stepNumber: 2,
    id: 'problem_readiness',
    title: '2. Problem Readiness AI',
    shortTitle: 'Readiness AI',
    description: 'AI analyzes problem clarity, safety, solvability, and measurability to compute readiness.',
  },
  {
    stepNumber: 3,
    id: 'mission_generator',
    title: '3. AI Mission Generator',
    shortTitle: 'Mission Generator',
    description: 'Converts raw operational challenges into structured, measurable student missions.',
  },
  {
    stepNumber: 4,
    id: 'growth_matching',
    title: '4. Growth Matching',
    shortTitle: 'Growth Matching',
    description: 'Matches students using 70-80% existing skills + 20-30% learnable growth gap.',
  },
  {
    stepNumber: 5,
    id: 'mentor_chat',
    title: '5. Adaptive AI Mentor',
    shortTitle: 'AI Mentor',
    description: 'Step-by-step guidance, concept explanations, and bilingual assistance for the student.',
  },
  {
    stepNumber: 6,
    id: 'solution_submission',
    title: '6. Solution Submission',
    shortTitle: 'Solution Upload',
    description: 'Student uploads work deliverables, digital files, screenshots, and live demo link.',
  },
  {
    stepNumber: 7,
    id: 'quality_evaluation',
    title: '7. AI Quality Evaluation',
    shortTitle: 'Quality AI',
    description: 'AI assesses task completion, accuracy, documentation, and technical quality.',
  },
  {
    stepNumber: 8,
    id: 'skill_proof',
    title: '8. SkillProof',
    shortTitle: 'SkillProof',
    description: 'Interactive verification testing if the student genuinely understands their submitted work.',
  },
  {
    stepNumber: 9,
    id: 'client_verification',
    title: '9. Client / Mentor Verification',
    shortTitle: 'Verification',
    description: 'Real client review and mentor rating confirming practical real-world utility.',
  },
  {
    stepNumber: 10,
    id: 'impact_proof',
    title: '10. ImpactProof',
    shortTitle: 'ImpactProof',
    description: 'Before vs. After metric transformation demonstrating measurable business impact.',
  },
  {
    stepNumber: 11,
    id: 'workproof_passport',
    title: '11. WorkProof Passport',
    shortTitle: 'Passport',
    description: 'Cryptographically verifiable digital passport packaging real evidence for employers.',
  },
  {
    stepNumber: 12,
    id: 'employment_recommendations',
    title: '12. Employment Recommendations',
    shortTitle: 'Jobs & Internships',
    description: 'Verified skill matching with real industry internships and entry-level career openings.',
  },
];

// 1. DEFAULT VIZIANAGARAM KIRANA PROBLEM
export const INITIAL_VIZIANAGARAM_PROBLEM: Problem = {
  problem_id: 'prob-vzm-001',
  organization_id: 'org-vzm-kirana-01',
  organization_name: 'Sri Lakshmi Kirana & General Store',
  location: 'Kothagraharam Main Road, Vizianagaram, AP',
  title: 'Notebook-based Inventory & Out-of-Stock Tracking',
  problem_description:
    'My shop stock is written in a notebook. I do not know which products are running out or when to reorder from distributors in Vizianagaram.',
  telugu_description:
    'నా కిరాణా దుకాణం స్టాక్ అంతా నోట్‌బుక్‌లో రాసి ఉంటుంది. ఏ సరుకులు అయిపోతున్నాయో, ఎప్పుడు ఆర్డర్ చేయాలో నాకు సమయానికి తెలియడం లేదు.',
  category: 'Retail & Inventory Management',
  input_method: 'text',
  readiness_score: 92,
  clarity_score: 95,
  safety_score: 100,
  solvability_score: 94,
  measurability_score: 90,
  clarification_needed: false,
  clarification_questions: [
    'Approximately how many distinct product categories (FMCG, pulses, oils, packaged snacks) do you stock?',
    'Do you have an Android smartphone or shop desktop where a digital spreadsheet can be viewed daily?',
  ],
  clarification_answers: {
    q0: 'About 180 to 200 items in daily rotation (rice, pulses, spices, oil, soap).',
    q1: 'Yes, I have an Android phone with 4G and my son has a shop laptop.',
  },
  status: 'ready',
  submitted_at: 'Today, 10:15 AM',
};
export const DEFAULT_PROBLEM = INITIAL_VIZIANAGARAM_PROBLEM;

// 2. MISSION
export const INITIAL_KIRANA_MISSION: Mission = {
  mission_id: 'msn-vzm-kirana-101',
  problem_id: 'prob-vzm-001',
  title: 'Digital Inventory Setup for a Local Kirana Shop',
  organization_name: 'Sri Lakshmi Kirana & General Store',
  location: 'Vizianagaram, AP',
  tasks: [
    {
      id: 1,
      title: 'Create a product database',
      description: 'Categorize 200 items into Pulses, Edible Oils, Spices, and Packaged FMCG.',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Add available stock quantities',
      description: 'Record baseline unit counts and purchase prices from ledger notes.',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Set minimum stock levels',
      description: 'Calculate 3-day safety threshold for each fast-moving SKU.',
      status: 'completed',
    },
    {
      id: 4,
      title: 'Create low-stock alerts',
      description: 'Implement automated color-coded conditional rules when units fall below safety level.',
      status: 'in_progress',
    },
    {
      id: 5,
      title: 'Generate a weekly stock report',
      description: 'Design a one-click printable summary for weekly distributor reordering.',
      status: 'locked',
    },
  ],
  required_skills: ['Excel', 'Data Management', 'Basic Data Analysis'],
  difficulty: 'Beginner',
  estimated_time: '3–5 Hours',
  deliverables: [
    'Inventory file (.xlsx / Google Sheets)',
    'Low-stock alert conditional system',
    'Weekly reorder report template',
    'Screenshots and shop deployment photos',
    'Short explanation guide in Telugu & English',
  ],
  expected_outcome:
    'Eliminate stockouts of top 50 staple items and save 45 minutes of manual notebook tallying every morning.',
  created_at: '2026-09-09',
};
export const DEFAULT_MISSION = INITIAL_KIRANA_MISSION;

// 3. STUDENT MATCHES (Highlighting Ravi Kumar from MVGR College, Vizianagaram)
export const INITIAL_STUDENT_MATCHES: MissionMatch[] = [
  {
    match_id: 'match-ravi-01',
    mission_id: 'msn-vzm-kirana-101',
    student: {
      student_id: 'stu-vzm-ravi',
      name: 'Ravi Kumar',
      college: 'MVGR College of Engineering, Vizianagaram',
      location: 'Vizianagaram, AP',
      skills: ['Excel', 'Java', 'MySQL'],
      career_interest: 'Business Analytics',
      available_time: '12 hrs/week',
      completed_missions: 3,
      skill_scores: {
        Excel: 82,
        'Data Management': 78,
        'Analytical Thinking': 85,
      },
      bio: 'Final year B.Tech student passionate about retail analytics, digital supply chains, and local business digital enablement in North Coastal Andhra.',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    },
    growth_match_score: 88,
    existing_skill_score: 80,
    learnable_skill_gap: 20,
    matching_rationale:
      'Strong 80% foundational alignment in Excel and relational data schemas. 20% growth gap in real-time retail SKU thresholding perfectly expands his business analytics portfolio.',
    is_selected: true,
  },
  {
    match_id: 'match-ananya-02',
    mission_id: 'msn-vzm-kirana-101',
    student: {
      student_id: 'stu-vzm-ananya',
      name: 'Ananya Varma',
      college: 'Gayatri Vidya Parishad College of Engineering, Vizag',
      location: 'Visakhapatnam (Native: Vizianagaram)',
      skills: ['Python', 'Excel', 'Statistics'],
      career_interest: 'Data Science & Operations',
      available_time: '10 hrs/week',
      completed_missions: 2,
      skill_scores: {
        Excel: 75,
        Python: 84,
        Statistics: 80,
      },
      bio: 'Third-year student with keen interest in inventory forecasting and small merchant tech solutions.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    },
    growth_match_score: 81,
    existing_skill_score: 75,
    learnable_skill_gap: 25,
    matching_rationale:
      'Solid statistical base. Can apply basic predictive formulas to Kirana seasonal purchase cycles.',
    is_selected: false,
  },
  {
    match_id: 'match-saiteja-03',
    mission_id: 'msn-vzm-kirana-101',
    student: {
      student_id: 'stu-vzm-saiteja',
      name: 'Sai Teja Naidu',
      college: 'Raghu Engineering College, Dakamarri',
      location: 'Bhogapuram / Vizianagaram',
      skills: ['Google Sheets', 'Web Design', 'Accounting Basics'],
      career_interest: 'IT Services & ERP Consulting',
      available_time: '15 hrs/week',
      completed_missions: 1,
      skill_scores: {
        'Google Sheets': 78,
        Accounting: 72,
        Communication: 85,
      },
      bio: 'Enthusiastic student fluent in Telugu business terminology, with direct family experience in agricultural commerce.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    growth_match_score: 74,
    existing_skill_score: 70,
    learnable_skill_gap: 30,
    matching_rationale:
      'High cultural fluency in local market operations; slight growth gap in automated spreadsheet scripting.',
    is_selected: false,
  },
];
export const MATCHED_STUDENTS = INITIAL_STUDENT_MATCHES;

// 4. MENTOR ROADMAP STEPS
export const INITIAL_MENTOR_GUIDES: MentorStepGuide[] = [
  {
    stepId: 1,
    title: 'Understand Problem',
    status: 'completed',
    instruction: 'Meet Sri Lakshmi Kirana owner Ramana Rao garu; note his 4 major stock categories.',
    concept_explanation: 'Physical ledger audits reveal hidden shrinkage and unrecorded credit items.',
    resource_link: 'Article: Modern Kirana SKU Categorization Guide',
  },
  {
    stepId: 2,
    title: 'Collect Product Data',
    status: 'completed',
    instruction: 'Digitize 200 items: Name, Regional Telugu Name, Unit (kg/pkt), Cost Price, Selling Price.',
    concept_explanation: 'Clean master data prevents duplicate entries during morning rush hours.',
    resource_link: 'Template: FMCG Product Master Schema',
  },
  {
    stepId: 3,
    title: 'Create Digital Inventory',
    status: 'current',
    instruction: 'Build the master inventory sheet with automatic Stock-On-Hand and Reorder Threshold columns.',
    concept_explanation: 'Use formula: =IF(Current_Stock <= Reorder_Level, "REORDER", "HEALTHY")',
    resource_link: 'Tutorial: Excel Conditional Formatting for Store Stock',
    template_snippet: '=IF(C2<=D2, "REORDER ALERT", "IN STOCK")',
  },
  {
    stepId: 4,
    title: 'Add Low-Stock Alerts',
    status: 'locked',
    instruction: 'Apply soft red highlights to rows that need immediate phone orders to Vizianagaram wholesale mandi.',
    concept_explanation: 'Visual cues allow non-technical store clerks to instantly spot urgent orders.',
    resource_link: 'Guide: Zero-Code Alert Systems for Small Retailers',
  },
  {
    stepId: 5,
    title: 'Generate Weekly Report',
    status: 'locked',
    instruction: 'Create a single-page summary displaying top 10 fast-depleting goods and total tied-up capital.',
    concept_explanation: 'Empowers owner to negotiate volume discounts with bulk distributors.',
    resource_link: 'Template: Weekly Merchant Reorder Sheet',
  },
];
export const MENTOR_STEPS = INITIAL_MENTOR_GUIDES;

// 5. MENTOR CHAT
export const INITIAL_MENTOR_CHAT: MentorChatMessage[] = [
  {
    id: 'chat-01',
    sender: 'mentor',
    message:
      'Hello Ravi! I am your KaushalSetu Adaptive AI Mentor. Congratulations on accepting the Sri Lakshmi Kirana mission in Vizianagaram. You have completed Tasks 1 and 2. Now let us build the dynamic low-stock alert system in Step 3.',
    telugu_message:
      'నమస్కారం రవి! శ్రీ లక్ష్మి కిరాణా మిషన్‌ను ఎంచుకున్నందుకు అభినందనలు. టాస్క్ 1 & 2 పూర్తి అయ్యాయి. ఇప్పుడు స్టెప్ 3 లోని లో-స్టాక్ అలర్ట్ ఫార్ములాను పూర్తి చేద్దాం.',
    timestamp: '11:00 AM',
    codeSnippet: '=IF(E2<=F2, "⚠️ REORDER NEEDED", "✅ OPTIMAL")',
    audioText:
      'Hello Ravi! Congratulations on accepting the Sri Lakshmi Kirana mission in Vizianagaram. Let us build the dynamic low stock alert system.',
  },
  {
    id: 'chat-02',
    sender: 'student',
    message:
      'Hi Mentor! Ramana Rao garu wants alerts only when rice bags drop below 4 bags, but for sunflower oil packets, when they drop below 12 packets. How do I configure variable safety thresholds per category?',
    timestamp: '11:04 AM',
  },
  {
    id: 'chat-03',
    sender: 'mentor',
    message:
      'Great question, Ravi! Do not hardcode a single threshold. Instead, create a dedicated "Safety Stock" column (Column D). Set 4 for Rice, 12 for Edible Oils, and 6 for Spices. Then use: =IF(C2<=D2, "⚠️ REORDER", "OK"). This allows Ramana Rao to adjust thresholds anytime without breaking your formulas.',
    telugu_message:
      'మంచి ప్రశ్న రవి! ఒకటే నంబర్ పెట్టకుండా "సేఫ్టీ స్టాక్" అనే ప్రత్యేక కాలమ్ (కాలమ్ D) పెట్టండి. బియ్యానికి 4, నూనె ప్యాకెట్లకు 12 పెట్టండి.',
    timestamp: '11:06 AM',
    codeSnippet:
      '// Formula in Column E (Status):\n=IF(C2<=D2, "⚠️ REORDER: " & (D2*2 - C2) & " units", "✅ SUFFICIENT")',
  },
];

// 6. SOLUTION SUBMISSION
export const INITIAL_SOLUTION_SUBMISSION: SolutionSubmissionData = {
  submission_id: 'sub-vzm-ravi-001',
  mission_id: 'msn-vzm-kirana-101',
  student_id: 'stu-vzm-ravi',
  files: [
    {
      name: 'Sri_Lakshmi_Kirana_Inventory_v1.xlsx',
      size: '2.4 MB',
      type: 'Microsoft Excel Spreadsheet',
    },
    {
      name: 'Vizianagaram_Mandi_Supplier_Directory.csv',
      size: '140 KB',
      type: 'CSV File',
    },
    {
      name: 'Kirana_Shop_Deployment_Brief.pdf',
      size: '1.1 MB',
      type: 'PDF Document',
    },
  ],
  screenshots: [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80',
  ],
  explanation:
    'Digitized 200 staple retail products for Sri Lakshmi Kirana, Kothagraharam, Vizianagaram. Set up automated color-coded alerts when physical inventory drops below 3-day buffer levels. Provided owner Ramana Rao with a mobile-friendly view on his Android phone and trained him to log sales in under 10 seconds.',
  demo_link: 'https://view.kaushalsetu.ai/demo/kirana-vzm-inventory',
  submitted_at: 'Today, 2:30 PM',
  submission_status: 'evaluated',
};
export const DEFAULT_SUBMISSION = INITIAL_SOLUTION_SUBMISSION;

// 7. AI QUALITY EVALUATION
export const INITIAL_QUALITY_EVALUATION: QualityEvaluation = {
  evaluation_id: 'eval-vzm-001',
  submission_id: 'sub-vzm-ravi-001',
  task_completion: 100,
  solution_quality: 85,
  accuracy: 88,
  documentation: 80,
  overall_score: 88,
  summary_feedback:
    'Comprehensive and clean implementation. The variable safety stock threshold per FMCG category is well-architected for a rural/semi-urban merchant environment.',
  key_strengths: [
    'Flawless categorization of 200 items into 4 structured retail departments.',
    'Bilingual product naming (English + Telugu) makes daily lookup easy for local store helpers.',
    'Clear conditional formatting with distinct visual alerts (Red for reorder, Green for safe).',
  ],
  refinement_areas: [
    'Add an automated supplier contact lookup formula tied to each product line.',
    'Consider exporting a weekly PDF directly to WhatsApp for Vizianagaram wholesale mandi agents.',
  ],
};
export const DEFAULT_EVALUATION = INITIAL_QUALITY_EVALUATION;

// 8. SKILLPROOF QUESTIONS & SCORES
export const INITIAL_SKILLPROOF: SkillProofResult = {
  skillproof_id: 'sp-vzm-ravi-85',
  submission_id: 'sub-vzm-ravi-001',
  overall_score: 85,
  skill_breakdown: [
    { skill: 'Excel & Spreadsheet Modeling', score: 88 },
    { skill: 'Data Management & Hygiene', score: 82 },
    { skill: 'Practical Problem Solving', score: 85 },
  ],
  questions: [
    {
      id: 'sp-q1',
      question: 'How does your low-stock alert conditional rule work in column E?',
      componentTested: 'Conditional Logic & Threshold Modeling',
      studentAnswer:
        'I used the formula =IF(C2<=D2, "REORDER", "IN STOCK"). When the current stock count in C2 drops to or below the dynamic safety threshold in D2, the cell returns REORDER and conditional formatting automatically highlights the row in soft red.',
      options: [
        'It compares current inventory against the safety threshold column and triggers a conditional format rule.',
        'It connects to a paid cloud database API to send automated SMS.',
        'It counts the total number of rows in the spreadsheet.',
      ],
      correctOptionIndex: 0,
      selectedOptionIndex: 0,
      aiEvaluation:
        'High conceptual mastery. The student demonstrated deep understanding of dynamic cell referencing instead of hardcoded numbers.',
      score: 92,
    },
    {
      id: 'sp-q2',
      question: 'What happens when stock reaches zero during busy festival days?',
      componentTested: 'Edge Case & Out-of-Stock Handling',
      studentAnswer:
        'When stock hits 0, a nested IF condition flags "OUT OF STOCK - URGENT". The weekly order sheet immediately ranks that item at priority #1 so Ramana Rao orders it on the morning mandi run.',
      options: [
        'The spreadsheet freezes and throws an error #VALUE!.',
        'A nested rule elevates the priority to urgent reorder at the top of the supplier list.',
        'The item is automatically deleted from the master database.',
      ],
      correctOptionIndex: 1,
      selectedOptionIndex: 1,
      aiEvaluation:
        'Excellent practical business perspective suited to fast-paced festival sales cycles.',
      score: 85,
    },
    {
      id: 'sp-q3',
      question: 'Why did you choose this spreadsheet approach over complex ERP software for this Kirana store?',
      componentTested: 'Client Context & Feasibility Reasoning',
      studentAnswer:
        'Ramana Rao garu was hesitant with complicated billing software. A lightweight spreadsheet synced to Google Drive opens in 2 seconds on his 4G Android phone without subscription fees or specialized hardware.',
      options: [
        'Because Excel is the only tool I was taught in college.',
        'To maximize merchant adoption with zero subscription costs and native Android accessibility.',
        'Because Kirana shops cannot legally use inventory software.',
      ],
      correctOptionIndex: 1,
      selectedOptionIndex: 1,
      aiEvaluation:
        'Exemplary empathetic engineering. Prioritizing end-user adoption over unnecessary complexity.',
      score: 88,
    },
  ],
  verification_verdict:
    'VERIFIED: Ravi Kumar possesses authentic, hands-on authorship of this digital inventory solution.',
};
export const DEFAULT_SKILLPROOF = INITIAL_SKILLPROOF;

// 9. CLIENT & MENTOR DUAL VERIFICATION
export const INITIAL_DUAL_VERIFICATION: ClientMentorVerification = {
  verification_id: 'verif-vzm-101',
  mission_id: 'msn-vzm-kirana-101',
  client: {
    owner_name: 'V. Ramana Rao garu',
    organization_name: 'Sri Lakshmi Kirana & General Store',
    location: 'Kothagraharam Main Road, Vizianagaram',
    problem_solved: true,
    solution_useful: true,
    rating: 5,
    feedback:
      'Ravi’s spreadsheet makes out-of-stock items visible every evening. Saved me from searching through paper notebooks every morning. Very happy!',
    telugu_feedback:
      'రవి బాబు చేసిన ఎక్సెల్ షీట్ వల్ల ఏ సరుకు అయిపోతుందో రాత్రికి రాత్రే తెలిసిపోతుంది. ఉదయాన్నే నోట్‌బుక్‌లో వెతుక్కునే శ్రమ తప్పింది. చాలా సంతోషం!',
    verified_date: 'Sep 9, 2026',
  },
  mentor: {
    mentor_name: 'Naveen Varma',
    designation: 'Senior Retail Operations Specialist',
    organization: 'AP Rural Digital Trade Council',
    technical_soundness: 'Industry Ready',
    remarks:
      'Ravi showed remarkable initiative in translating messy paper records into a functional, dignified digital asset. His documentation is crisp and user-focused.',
    rating: 5,
    verified_date: 'Sep 9, 2026',
  },
};
export const DEFAULT_VERIFICATION = INITIAL_DUAL_VERIFICATION;

// 10. IMPACTPROOF
export const INITIAL_IMPACT_PROOF: ImpactProofData = {
  impact_id: 'imp-vzm-001',
  mission_id: 'msn-vzm-kirana-101',
  organization_name: 'Sri Lakshmi Kirana & General Store',
  summary:
    'Ravi Kumar successfully transformed paper notebook bookkeeping into a cloud-synced digital inventory system, delivering verified daily time savings of 40 minutes and eliminating out-of-stock shortages.',
  metrics: [
    {
      dimension: 'Inventory System',
      before: 'Physical Paper Notebook',
      after: 'Digital Cloud Sheet + Mobile View',
      impact: '100% Digitized',
    },
    {
      dimension: 'Cataloged Products',
      before: '0 Products Digitized',
      after: '200 Products with Units & Pricing',
      impact: '+200 SKUs',
    },
    {
      dimension: 'Low-Stock Alerts',
      before: 'None (Manual Memory)',
      after: 'Automated Soft-Red Thresholds',
      impact: 'Zero Blindspots',
    },
    {
      dimension: 'Daily Morning Audit Time',
      before: '45 Minutes Manual Tallying',
      after: '5 Minutes Glance on Mobile',
      impact: '40 Min Saved Daily',
    },
    {
      dimension: 'Out-of-Stock Incidents',
      before: '6 to 8 Items per Week',
      after: '0 Incidents during pilot',
      impact: 'Stockouts Eliminated',
    },
  ],
};
export const DEFAULT_IMPACTPROOF = INITIAL_IMPACT_PROOF;

// 11. WORKPROOF PASSPORT
export const INITIAL_WORKPROOF_PASSPORT: WorkProofPassportData = {
  passport_id: 'WP-2026-VIZ-0089',
  student_name: 'Ravi Kumar',
  college: 'MVGR College of Engineering, Vizianagaram',
  role: 'Junior Digital Operations Consultant',
  mission_title: 'Digital Inventory Setup for a Local Kirana Shop',
  organization_name: 'Sri Lakshmi Kirana & General Store',
  location: 'Vizianagaram, Andhra Pradesh',
  skills_verified: [
    'Excel & Advanced Modeling',
    'Data Management & Hygiene',
    'Inventory Threshold Modeling',
    'Client Handover & Bilingual Training',
  ],
  skill_proof_score: 85,
  impact_summary:
    'Digitized 200 products, automated low-stock reorder thresholds, eliminated stockouts, and saved 40 minutes daily for local shop owner Ramana Rao.',
  evidence_files: [
    'Sri_Lakshmi_Kirana_Inventory_v1.xlsx',
    'Vizianagaram_Mandi_Directory.csv',
    'Signed_Merchant_Handover_Receipt.pdf',
  ],
  verifications: [
    { type: 'AI Quality Audit', verifier: 'KaushalSetu Evaluator', status: 'Passed (88%)' },
    { type: 'SkillProof Defense', verifier: 'AI Probing Engine', status: 'Defended (85%)' },
    { type: 'Client Signoff', verifier: 'Ramana Rao (Owner)', status: '5/5 Stars' },
    { type: 'Industry Mentor', verifier: 'Naveen Varma (Retail Specialist)', status: '5/5 Verified' },
  ],
  verification_hash: '0x9e8a71b4c3d2e1f0a5b6c7d8e9f0123456789abc',
  issue_date: 'September 9, 2026',
};
export const DEFAULT_PASSPORT = INITIAL_WORKPROOF_PASSPORT;

// 12. EMPLOYMENT RECOMMENDATIONS
export const INITIAL_JOB_RECOMMENDATIONS: JobRecommendation[] = [
  {
    id: 'job-01',
    title: 'Operations Intern — Retail Supply Chain',
    company: 'Regional FMCG Distributor Syndicate, Vizianagaram / Vizag',
    location: 'Vizianagaram, AP',
    type: 'Hybrid Internship',
    stipend: '₹15,000 – ₹20,000 / month',
    match_score: 92,
    why_matched:
      'Verified Excel Skills (88%), hands-on Kirana inventory digitization in Vizianagaram, client sign-off, and real-world threshold modeling.',
    skills_matched: ['Excel', 'Inventory Management', 'Client Training', 'Data Verification'],
  },
  {
    id: 'job-02',
    title: 'Junior Business Analyst (Entry Level)',
    company: 'FinTech & Rural Commerce Enabler',
    location: 'Visakhapatnam, AP',
    type: 'Full-Time Graduate Role',
    stipend: '₹3.6 – ₹4.8 LPA',
    match_score: 86,
    why_matched:
      'Proven ability to translate manual bookkeeping into structured schemas. WorkProof Passport provides indisputable evidence over generic resumes.',
    skills_matched: ['Business Analytics', 'Process Digitization', 'Stakeholder Communication'],
  },
  {
    id: 'job-03',
    title: 'Data Management & Digital Transformation Trainee',
    company: 'AP State Rural Development Co-operative Agency',
    location: 'North Coastal Andhra (Vizianagaram)',
    type: 'Govt Enterprise Fellowship',
    stipend: '₹18,000 / month',
    match_score: 84,
    why_matched:
      'Bilingual proficiency (English + Telugu) in merchant technical guidance with 5/5 stars rating from local merchant in Vizianagaram.',
    skills_matched: ['Data Management', 'Field Digitization', 'Community Engagement'],
  },
];
export const DEFAULT_EMPLOYMENT_RECS = INITIAL_JOB_RECOMMENDATIONS;
