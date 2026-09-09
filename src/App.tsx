import React, { useState, useEffect } from 'react';
import {
  WorkflowStepId,
  UserRole,
  SupportedLanguage,
  Problem,
  Mission,
  MissionMatch,
  MentorStepGuide,
  MentorChatMessage,
  SolutionSubmissionData,
  QualityEvaluation,
  SkillProofResult,
  ClientMentorVerification,
  ImpactProofData,
  WorkProofPassportData,
  JobRecommendation,
} from './types';
import {
  INITIAL_VIZIANAGARAM_PROBLEM,
  INITIAL_KIRANA_MISSION,
  INITIAL_STUDENT_MATCHES,
  INITIAL_MENTOR_GUIDES,
  INITIAL_MENTOR_CHAT,
  INITIAL_SOLUTION_SUBMISSION,
  INITIAL_QUALITY_EVALUATION,
  INITIAL_SKILLPROOF,
  INITIAL_DUAL_VERIFICATION,
  INITIAL_IMPACT_PROOF,
  INITIAL_WORKPROOF_PASSPORT,
  INITIAL_JOB_RECOMMENDATIONS,
  WORKFLOW_STAGES,
} from './data/kaushalSetuData';

import { KaushalSetuHeader } from './components/KaushalSetuHeader';
import { LandingHeroView } from './components/LandingHeroView';
import { Step1ProblemSubmission } from './components/Step1ProblemSubmission';
import { Step2ProblemReadinessAI } from './components/Step2ProblemReadinessAI';
import { Step3AIMissionGenerator } from './components/Step3AIMissionGenerator';
import { Step4GrowthMatching } from './components/Step4GrowthMatching';
import { Step5AdaptiveAIMentor } from './components/Step5AdaptiveAIMentor';
import { Step6SolutionSubmission } from './components/Step6SolutionSubmission';
import { Step7AIQualityEvaluation } from './components/Step7AIQualityEvaluation';
import { Step8SkillProof } from './components/Step8SkillProof';
import { Step9ClientMentorVerification } from './components/Step9ClientMentorVerification';
import { Step10ImpactProof } from './components/Step10ImpactProof';
import { Step11WorkProofPassport } from './components/Step11WorkProofPassport';
import { Step12EmploymentRecommendations } from './components/Step12EmploymentRecommendations';
import { speechController } from './utils/speech';

export default function App() {
  const [currentStepId, setCurrentStepId] = useState<WorkflowStepId>('landing');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);

  // 12-Step Connected State Data
  const [problem, setProblem] = useState<Problem>(INITIAL_VIZIANAGARAM_PROBLEM);
  const [mission, setMission] = useState<Mission>(INITIAL_KIRANA_MISSION);
  const [matches, setMatches] = useState<MissionMatch[]>(INITIAL_STUDENT_MATCHES);
  const [selectedMatchId, setSelectedMatchId] = useState<string>('match-ravi-01');
  const [stepGuides, setStepGuides] = useState<MentorStepGuide[]>(INITIAL_MENTOR_GUIDES);
  const [chatMessages, setChatMessages] = useState<MentorChatMessage[]>(INITIAL_MENTOR_CHAT);
  const [solution, setSolution] = useState<SolutionSubmissionData>(INITIAL_SOLUTION_SUBMISSION);
  const [qualityEval, setQualityEval] = useState<QualityEvaluation>(INITIAL_QUALITY_EVALUATION);
  const [skillProof, setSkillProof] = useState<SkillProofResult>(INITIAL_SKILLPROOF);
  const [verification, setVerification] = useState<ClientMentorVerification>(INITIAL_DUAL_VERIFICATION);
  const [impact, setImpact] = useState<ImpactProofData>(INITIAL_IMPACT_PROOF);
  const [passport, setPassport] = useState<WorkProofPassportData>(INITIAL_WORKPROOF_PASSPORT);
  const [jobRecs, setJobRecs] = useState<JobRecommendation[]>(INITIAL_JOB_RECOMMENDATIONS);

  // Async loading spinners
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [isSendingMentorMessage, setIsSendingMentorMessage] = useState<boolean>(false);
  const [isEvaluatingSolution, setIsEvaluatingSolution] = useState<boolean>(false);

  // Health check on boot
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data?.hasGeminiKey) {
          setHasGeminiKey(true);
        }
      })
      .catch(() => {});
  }, []);

  // Reset entire demo back to fresh initial state
  const handleResetDemo = () => {
    speechController.stop();
    setProblem(INITIAL_VIZIANAGARAM_PROBLEM);
    setMission(INITIAL_KIRANA_MISSION);
    setMatches(INITIAL_STUDENT_MATCHES);
    setSelectedMatchId('match-ravi-01');
    setStepGuides(INITIAL_MENTOR_GUIDES);
    setChatMessages(INITIAL_MENTOR_CHAT);
    setSolution(INITIAL_SOLUTION_SUBMISSION);
    setQualityEval(INITIAL_QUALITY_EVALUATION);
    setSkillProof(INITIAL_SKILLPROOF);
    setVerification(INITIAL_DUAL_VERIFICATION);
    setImpact(INITIAL_IMPACT_PROOF);
    setPassport(INITIAL_WORKPROOF_PASSPORT);
    setJobRecs(INITIAL_JOB_RECOMMENDATIONS);
    setCurrentStepId('landing');
  };

  // Step 1: Analyze problem and transition to Step 2
  const handleAnalyzeProblem = async () => {
    setIsLoadingAnalysis(true);
    try {
      const res = await fetch('/api/gemini/problem-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemDescription: problem.problem_description,
          organizationType: problem.category,
          location: problem.location,
          language: currentLanguage,
        }),
      });
      const data = await res.json();
      if (data?.success && data?.data) {
        setProblem((prev) => ({
          ...prev,
          readiness_score: data.data.readiness_score ?? prev.readiness_score,
          clarity_score: data.data.clarity_score ?? prev.clarity_score,
          safety_score: data.data.safety_score ?? prev.safety_score,
          solvability_score: data.data.solvability_score ?? prev.solvability_score,
          measurability_score: data.data.measurability_score ?? prev.measurability_score,
          category: data.data.category ?? prev.category,
          clarification_questions:
            data.data.clarification_questions ?? prev.clarification_questions,
        }));
      }
    } catch (err) {
      // Seamlessly retain rich verified default model
    } finally {
      setIsLoadingAnalysis(false);
      setCurrentStepId('problem_readiness');
    }
  };

  // Step 2 -> Step 3: Convert to structured student mission
  const handleProceedToMissionGen = async () => {
    try {
      const res = await fetch('/api/gemini/mission-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemDescription: problem.problem_description,
          organizationName: problem.organization_name,
          location: problem.location,
          category: problem.category,
        }),
      });
      const data = await res.json();
      if (data?.success && data?.data) {
        setMission((prev) => ({
          ...prev,
          title: data.data.title ?? prev.title,
          difficulty: data.data.difficulty ?? prev.difficulty,
          estimated_time: data.data.estimated_time ?? prev.estimated_time,
          required_skills: data.data.required_skills ?? prev.required_skills,
          tasks: data.data.tasks ?? prev.tasks,
          deliverables: data.data.deliverables ?? prev.deliverables,
          expected_outcome: data.data.expected_outcome ?? prev.expected_outcome,
        }));
      }
    } catch (err) {
      // Retain rich structured mission
    }
    setCurrentStepId('mission_generator');
  };

  // Step 5: AI Mentor Chat interaction
  const handleSendMentorMessage = async (msgText: string) => {
    const studentMsg: MentorChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      message: msgText,
      timestamp: 'Just now',
    };

    const newHistory = [...chatMessages, studentMsg];
    setChatMessages(newHistory);
    setIsSendingMentorMessage(true);

    try {
      const res = await fetch('/api/gemini/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          currentContext: {
            missionTitle: mission.title,
            organizationName: mission.organization_name,
            location: mission.location,
          },
          language: currentLanguage,
        }),
      });

      const data = await res.json();
      if (data?.success && data?.data) {
        const mentorReply: MentorChatMessage = {
          id: `msg-rep-${Date.now()}`,
          sender: 'mentor',
          message: data.data.message || 'I have analyzed your query and structured the next formula for you.',
          telugu_message: data.data.telugu_message,
          codeSnippet: data.data.codeSnippet,
          audioText: data.data.audioText,
          timestamp: 'Just now',
        };
        setChatMessages((prev) => [...prev, mentorReply]);
      } else {
        // High quality fallback simulation
        const fallbackReply: MentorChatMessage = {
          id: `msg-rep-${Date.now()}`,
          sender: 'mentor',
          message: `Great question, Ravi! To highlight items nearing zero stock, select your Current Stock column and add Conditional Formatting:
Formula: =C2<=D2
Highlight: Soft Red.
This ensures Ramana Rao garu can spot out-of-stock items in under 3 seconds on his phone.`,
          telugu_message:
            'రవి గారూ, సరుకు అయిపోతున్నప్పుడు ఎరుపు రంగులో హెచ్చరిక వచ్చేలా కండిషనల్ ఫార్మాటింగ్ =C2<=D2 ఉపయోగించండి. దీనివల్ల రమణారావు గారు వెంటనే గుర్తించగలరు.',
          codeSnippet: '=IF(C2<=D2, "REORDER", "OPTIMAL")',
          audioText: 'Use conditional formatting formula C2 less than or equal to D2 to trigger instant reorder alerts.',
          timestamp: 'Just now',
        };
        setChatMessages((prev) => [...prev, fallbackReply]);
      }
    } catch (err) {
      const fallbackReply: MentorChatMessage = {
        id: `msg-rep-${Date.now()}`,
        sender: 'mentor',
        message: 'To calculate 3-day buffer stock, use: =AVERAGE(DailySales_30Days) * 3.',
        codeSnippet: '=C2*3',
        timestamp: 'Just now',
      };
      setChatMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsSendingMentorMessage(false);
    }
  };

  // Step 6 -> Step 7: Submit solution for AI evaluation
  const handleSubmitSolutionForEval = async () => {
    setIsEvaluatingSolution(true);
    try {
      const res = await fetch('/api/gemini/evaluate-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          missionTitle: mission.title,
          explanation: solution.explanation,
          files: solution.files,
          deliverables: mission.deliverables,
        }),
      });
      const data = await res.json();
      if (data?.success && data?.data) {
        setQualityEval((prev) => ({
          ...prev,
          task_completion: data.data.task_completion ?? prev.task_completion,
          solution_quality: data.data.solution_quality ?? prev.solution_quality,
          accuracy: data.data.accuracy ?? prev.accuracy,
          documentation: data.data.documentation ?? prev.documentation,
          overall_score: data.data.overall_score ?? prev.overall_score,
          summary_feedback: data.data.summary_feedback ?? prev.summary_feedback,
          key_strengths: data.data.key_strengths ?? prev.key_strengths,
          refinement_areas: data.data.refinement_areas ?? prev.refinement_areas,
        }));
      }
    } catch (err) {
      // Retain high quality precomputed evaluation
    } finally {
      setIsEvaluatingSolution(false);
      setCurrentStepId('quality_evaluation');
    }
  };

  // Active student object from selected match
  const activeMatch = matches.find((m) => m.match_id === selectedMatchId) || matches[0];
  const activeStudent = activeMatch.student;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Universal 12-Step Header Navigation */}
      <KaushalSetuHeader
        currentStepId={currentStepId}
        onSelectStep={setCurrentStepId}
        userRole={userRole}
        onSelectRole={setUserRole}
        language={currentLanguage}
        onToggleLanguage={() =>
          setCurrentLanguage((prev) => (prev === 'en' ? 'te' : 'en'))
        }
        onResetDemo={handleResetDemo}
        hasGeminiKey={hasGeminiKey}
      />

      {/* Main Content Flow Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Landing Overview */}
        {currentStepId === 'landing' && (
          <LandingHeroView onStartJourney={setCurrentStepId} />
        )}

        {/* Step 1: Problem Submission */}
        {currentStepId === 'problem_submission' && (
          <Step1ProblemSubmission
            problem={problem}
            onUpdateProblem={(up) => setProblem((prev) => ({ ...prev, ...up }))}
            onAnalyzeProblem={handleAnalyzeProblem}
            isLoading={isLoadingAnalysis}
            language={currentLanguage}
          />
        )}

        {/* Step 2: Problem Readiness AI */}
        {currentStepId === 'problem_readiness' && (
          <Step2ProblemReadinessAI
            problem={problem}
            onProceedToMissionGen={handleProceedToMissionGen}
            onBackToSubmission={() => setCurrentStepId('problem_submission')}
            onAnswerClarification={(key, ans) =>
              setProblem((prev) => ({
                ...prev,
                clarification_answers: { ...prev.clarification_answers, [key]: ans },
              }))
            }
          />
        )}

        {/* Step 3: AI Mission Generator */}
        {currentStepId === 'mission_generator' && (
          <Step3AIMissionGenerator
            mission={mission}
            onProceedToGrowthMatching={() => setCurrentStepId('growth_matching')}
            onBackToReadiness={() => setCurrentStepId('problem_readiness')}
          />
        )}

        {/* Step 4: Growth Matching */}
        {currentStepId === 'growth_matching' && (
          <Step4GrowthMatching
            mission={mission}
            matches={matches}
            selectedMatchId={selectedMatchId}
            onSelectStudent={setSelectedMatchId}
            onAcceptMission={() => setCurrentStepId('mentor_chat')}
            onBackToMissionGen={() => setCurrentStepId('mission_generator')}
          />
        )}

        {/* Step 5: Adaptive AI Mentor */}
        {currentStepId === 'mentor_chat' && (
          <Step5AdaptiveAIMentor
            mission={mission}
            student={activeStudent}
            stepGuides={stepGuides}
            chatMessages={chatMessages}
            onSendMessage={handleSendMentorMessage}
            isSending={isSendingMentorMessage}
            onProceedToSolution={() => setCurrentStepId('solution_submission')}
            onBackToMatching={() => setCurrentStepId('growth_matching')}
            language={currentLanguage}
          />
        )}

        {/* Step 6: Solution Submission */}
        {currentStepId === 'solution_submission' && (
          <Step6SolutionSubmission
            submission={solution}
            mission={mission}
            onUpdateSubmission={(up) => setSolution((prev) => ({ ...prev, ...up }))}
            onSubmitForEvaluation={handleSubmitSolutionForEval}
            onBackToMentor={() => setCurrentStepId('mentor_chat')}
            isEvaluating={isEvaluatingSolution}
          />
        )}

        {/* Step 7: AI Quality Evaluation */}
        {currentStepId === 'quality_evaluation' && (
          <Step7AIQualityEvaluation
            evaluation={qualityEval}
            mission={mission}
            onProceedToSkillProof={() => setCurrentStepId('skill_proof')}
            onBackToSubmission={() => setCurrentStepId('solution_submission')}
          />
        )}

        {/* Step 8: SkillProof */}
        {currentStepId === 'skill_proof' && (
          <Step8SkillProof
            skillProof={skillProof}
            mission={mission}
            onProceedToVerification={() => setCurrentStepId('client_verification')}
            onBackToQuality={() => setCurrentStepId('quality_evaluation')}
          />
        )}

        {/* Step 9: Client / Mentor Verification */}
        {currentStepId === 'client_verification' && (
          <Step9ClientMentorVerification
            verification={verification}
            mission={mission}
            onProceedToImpactProof={() => setCurrentStepId('impact_proof')}
            onBackToSkillProof={() => setCurrentStepId('skill_proof')}
          />
        )}

        {/* Step 10: ImpactProof */}
        {currentStepId === 'impact_proof' && (
          <Step10ImpactProof
            impact={impact}
            mission={mission}
            onProceedToPassport={() => setCurrentStepId('workproof_passport')}
            onBackToVerification={() => setCurrentStepId('client_verification')}
          />
        )}

        {/* Step 11: WorkProof Passport */}
        {currentStepId === 'workproof_passport' && (
          <Step11WorkProofPassport
            passport={passport}
            onProceedToEmployment={() => setCurrentStepId('employment_recommendations')}
            onBackToImpact={() => setCurrentStepId('impact_proof')}
          />
        )}

        {/* Step 12: Employment Recommendations */}
        {currentStepId === 'employment_recommendations' && (
          <Step12EmploymentRecommendations
            recommendations={jobRecs}
            passport={passport}
            onRestartJourney={handleResetDemo}
            onBackToPassport={() => setCurrentStepId('workproof_passport')}
          />
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">KAUSHALSETU AI</span>
            <span>•</span>
            <span>From Local Problems to Proven Skills and Real Employment</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Pilot Hub: Vizianagaram, AP</span>
            <span>•</span>
            <span>English & తెలుగు Audio Enabled</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
