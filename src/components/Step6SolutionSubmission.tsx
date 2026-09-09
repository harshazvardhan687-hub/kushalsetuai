import React, { useState } from 'react';
import { SolutionSubmissionData, Mission } from '../types';
import {
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  FileSpreadsheet,
  Image as ImageIcon,
  Paperclip,
} from 'lucide-react';

interface Step6Props {
  submission: SolutionSubmissionData;
  mission: Mission;
  onUpdateSubmission: (updated: Partial<SolutionSubmissionData>) => void;
  onSubmitForEvaluation: () => void;
  onBackToMentor: () => void;
  isEvaluating: boolean;
}

export const Step6SolutionSubmission: React.FC<Step6Props> = ({
  submission,
  mission,
  onUpdateSubmission,
  onSubmitForEvaluation,
  onBackToMentor,
  isEvaluating,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 6 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Deliverable Submission</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">6. Solution Submission</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Student packages digital artifacts, spreadsheet models, and explanation for AI quality evaluation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200">
            Mission: <strong>{mission.title}</strong>
          </span>
        </div>
      </div>

      {/* Submission Form Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Deliverables Checklist Banner */}
        <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                All 5 Mission Tasks Completed
              </h4>
              <p className="text-xs text-slate-600">
                Product database, initial counts, safety levels, alerts, and weekly report prepared.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full w-fit">
            Ready for AI Review
          </span>
        </div>

        {/* Uploaded Files Manifest */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Attached Deliverables & Project Files (3 files)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {submission.files.map((f, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-900 truncate block">
                    {f.name}
                  </span>
                  <span className="text-[11px] text-slate-500">{f.size} • {f.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Explanation */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Student Technical & Operational Explanation
          </label>
          <textarea
            rows={4}
            value={submission.explanation}
            onChange={(e) => onUpdateSubmission({ explanation: e.target.value })}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
          />
          <p className="text-[11px] text-slate-500">
            Clear explanations help the AI Quality Evaluator and SkillProof formulate deep contextual questions.
          </p>
        </div>

        {/* Live Demo Link */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Live Prototype / Google Sheet Viewer Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={submission.demo_link}
              onChange={(e) => onUpdateSubmission({ demo_link: e.target.value })}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
            <a
              href={submission.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-200"
            >
              <span>Test Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToMentor}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to AI Mentor Workspace
          </button>

          <button
            id="submit-for-eval-btn"
            type="button"
            onClick={onSubmitForEvaluation}
            disabled={isEvaluating}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isEvaluating ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Evaluating Submission with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Submit for Evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
