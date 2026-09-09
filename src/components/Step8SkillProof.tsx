import React, { useState } from 'react';
import { SkillProofResult, Mission } from '../types';
import {
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Zap,
} from 'lucide-react';

interface Step8Props {
  skillProof: SkillProofResult;
  mission: Mission;
  onProceedToVerification: () => void;
  onBackToQuality: () => void;
}

export const Step8SkillProof: React.FC<Step8Props> = ({
  skillProof,
  mission,
  onProceedToVerification,
  onBackToQuality,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({
    'sp-q1': 0,
    'sp-q2': 1,
    'sp-q3': 1,
  });

  const [isAnswered, setIsAnswered] = useState<boolean>(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 8 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Authenticity Verification</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">8. SkillProof</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            SkillProof tests whether the student genuinely understands the architectural decisions in their submitted solution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-purple-950 text-purple-300 text-xs font-semibold border border-purple-800">
            Personalized Defense
          </span>
        </div>
      </div>

      {/* Main SkillProof Results & Score Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Competency Result
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              SKILLPROOF SCORE: {skillProof.overall_score} / 100
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {skillProof.verification_verdict}
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200">
            <div className="h-20 w-20 rounded-2xl bg-slate-900 text-cyan-400 flex flex-col items-center justify-center shadow-md">
              <span className="text-3xl font-black">{skillProof.overall_score}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">/ 100</span>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                ✓ Proven Mastery
              </span>
              <span className="text-xs text-slate-600 block">
                Plagiarism Risk: <strong>0% (Defended)</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Skill Breakdown Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {skillProof.skill_breakdown.map((sb, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800">{sb.skill}</span>
                <span className="text-xs font-black text-cyan-700">{sb.score}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-600 h-full rounded-full transition-all"
                  style={{ width: `${sb.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* The 3 Deep-Dive Questions and Student Responses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-600" />
              Personalized Implementation Questions (Ravi Kumar Defense)
            </h4>
            <span className="text-xs text-slate-500">3 of 3 Answered Correctly</span>
          </div>

          <div className="space-y-4">
            {skillProof.questions.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                  <span className="text-xs font-bold text-slate-900">
                    Question {qIdx + 1}: {q.question}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {q.componentTested}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800">
                  <strong className="text-slate-900 block mb-1">Ravi's Live Defense:</strong>
                  <p className="leading-relaxed italic">"{q.studentAnswer}"</p>
                </div>

                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">AI Verification: </strong>
                    <span>{q.aiEvaluation} (Score: {q.score}/100)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToQuality}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to Quality Audit
          </button>

          <button
            id="proceed-to-verification-btn"
            type="button"
            onClick={onProceedToVerification}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Proceed to Client / Mentor Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
