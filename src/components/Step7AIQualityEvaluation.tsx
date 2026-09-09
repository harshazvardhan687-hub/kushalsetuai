import React from 'react';
import { QualityEvaluation, Mission } from '../types';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  FileCheck,
  TrendingUp,
} from 'lucide-react';

interface Step7Props {
  evaluation: QualityEvaluation;
  mission: Mission;
  onProceedToSkillProof: () => void;
  onBackToSubmission: () => void;
}

export const Step7AIQualityEvaluation: React.FC<Step7Props> = ({
  evaluation,
  mission,
  onProceedToSkillProof,
  onBackToSubmission,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 7 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Quality Audit</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">7. AI Quality Evaluation</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated evaluation of task completion, solution accuracy, code/formula cleanliness, and client documentation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800">
            Passed Technical Quality
          </span>
        </div>
      </div>

      {/* Main Score & 4 Pillars Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Technical Audit Verdict
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              QUALITY EVALUATION: HIGH PASS
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Verified for <strong className="text-slate-800">{mission.title}</strong>
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200">
            <div className="h-20 w-20 rounded-2xl bg-slate-900 text-cyan-400 flex flex-col items-center justify-center shadow-md">
              <span className="text-3xl font-black">{evaluation.overall_score}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-block mb-1">
                ✓ Ready for SkillProof
              </span>
              <span className="text-xs text-slate-600 block">
                Deliverables: <strong>All Verified</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Dimension Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Task Completion
            </span>
            <span className="text-2xl font-black text-emerald-700">
              {evaluation.task_completion}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">5 of 5 delivered</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Solution Quality
            </span>
            <span className="text-2xl font-black text-cyan-700">
              {evaluation.solution_quality}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">Clean formulas</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Data Accuracy
            </span>
            <span className="text-2xl font-black text-indigo-700">
              {evaluation.accuracy}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">Safe thresholds</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Documentation
            </span>
            <span className="text-2xl font-black text-purple-700">
              {evaluation.documentation}%
            </span>
            <span className="text-[10px] text-slate-500 block mt-1">Telugu user guide</span>
          </div>
        </div>

        {/* AI Qualitative Feedback */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              AI Evaluator Executive Summary
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            "{evaluation.summary_feedback}"
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase block">
                Key Strengths
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {evaluation.key_strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase block">
                Refinement Opportunity
              </span>
              <ul className="space-y-1 text-xs text-slate-700">
                {evaluation.refinement_areas.map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToSubmission}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to Submission
          </button>

          <button
            id="proceed-to-skillproof-btn"
            type="button"
            onClick={onProceedToSkillProof}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Start SkillProof Challenge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
