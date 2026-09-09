import React, { useState } from 'react';
import { Problem } from '../types';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Layers,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface Step2Props {
  problem: Problem;
  onProceedToMissionGen: () => void;
  onBackToSubmission: () => void;
  onAnswerClarification: (qKey: string, ans: string) => void;
}

export const Step2ProblemReadinessAI: React.FC<Step2Props> = ({
  problem,
  onProceedToMissionGen,
  onBackToSubmission,
  onAnswerClarification,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>(
    problem.clarification_answers || {
      q0: 'About 200 items in daily rotation (rice, pulses, spices, oil, soap).',
      q1: 'Yes, Android smartphone with 4G and shop laptop.',
    }
  );

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleUpdateAnswers = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
    }, 600);
  };

  const isHighReadiness = problem.readiness_score >= 80;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 2 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Validation Gate</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">2. Problem Readiness AI</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            AI audits problem clarity, safety, student solvability, and measurability before converting into a mission.
          </p>
        </div>

        <button
          id="back-to-step1-btn"
          type="button"
          onClick={onBackToSubmission}
          className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Edit Problem</span>
        </button>
      </div>

      {/* Main Readiness Score Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Audit Verdict
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              MISSION READINESS SCORE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
              Problem evaluated for <strong className="text-slate-900">{problem.organization_name}</strong> in Vizianagaram. High solvability for student digital operations.
            </p>
          </div>

          {/* Big Score Radial Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200">
            <div className="h-20 w-20 rounded-2xl bg-slate-900 text-cyan-400 flex flex-col items-center justify-center shadow-md">
              <span className="text-3xl font-black">{problem.readiness_score}%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Ready</span>
            </div>
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Mission Ready
              </span>
              <span className="text-xs text-slate-600 block">
                Category: <strong>{problem.category}</strong>
              </span>
              <span className="text-xs text-slate-600 block">
                Effort: <strong>3–5 Hours (Beginner)</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Dimension Verification Checks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">✓ Problem is Clear</h4>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {problem.clarity_score}%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Specific operational bottleneck identified: stockouts caused by lack of visual reorder thresholds.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">✓ Safe for Student</h4>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {problem.safety_score}%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                100% digital data modeling. Zero hazardous tasks, remote or safe local neighborhood onboarding.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">✓ Student Solvable</h4>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {problem.solvability_score}%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Feasible with standard spreadsheet formulas, clean data entry, and basic mobile view setup.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">✓ Measurable Result</h4>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {problem.measurability_score}%
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Direct metrics: Number of products cataloged (0 → 200), daily stock-check time (45m → 5m).
              </p>
            </div>
          </div>
        </div>

        {/* Clarification Questions Section */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-700" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                AI Clarification Questions (Pre-Answered by Ramana Rao)
              </h4>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">✓ Clarified</span>
          </div>

          <div className="space-y-3">
            {problem.clarification_questions.map((q, idx) => (
              <div key={idx} className="space-y-1">
                <label className="block text-xs font-semibold text-slate-800">
                  Q{idx + 1}: {q}
                </label>
                <input
                  type="text"
                  value={answers[`q${idx}`] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAnswers((prev) => ({ ...prev, [`q${idx}`]: val }));
                    onAnswerClarification(`q${idx}`, val);
                  }}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToSubmission}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Modify Problem Input
          </button>

          <button
            id="proceed-to-mission-gen-btn"
            type="button"
            onClick={onProceedToMissionGen}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Convert to Structured Mission</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
