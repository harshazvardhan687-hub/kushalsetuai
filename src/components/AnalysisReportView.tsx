import React, { useState } from 'react';
import { DiagnosticReport, SupportedLanguage } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { AudioPlayerWidget } from './AudioPlayerWidget';
import {
  TrendingUp,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Building,
} from 'lucide-react';

interface AnalysisReportViewProps {
  report: DiagnosticReport;
  currentLanguage: SupportedLanguage;
  onConsultMentor: (initialQuery?: string) => void;
  onResetAnalysis: () => void;
}

export const AnalysisReportView: React.FC<AnalysisReportViewProps> = ({
  report,
  currentLanguage,
  onConsultMentor,
  onResetAnalysis,
}) => {
  const t = TRANSLATIONS[currentLanguage];
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const handleCopyScript = () => {
    navigator.clipboard.writeText(report.negotiationScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header & Reset */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Verified Analysis
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Generated: {report.generatedAt}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {t.diagnosticReportHeader}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Engine: {report.engineUsed}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="report-retest-btn"
            type="button"
            onClick={onResetAnalysis}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Diagnostic</span>
          </button>

          <button
            id="report-consult-mentor-btn"
            type="button"
            onClick={() => onConsultMentor()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t.askMentorAboutThis}</span>
          </button>
        </div>
      </div>

      {/* Audio Playback Bar */}
      <div className="space-y-2">
        <AudioPlayerWidget
          textToSpeak={report.audioSummaryText}
          language={currentLanguage}
          label={`${t.audioBriefingLabel} (${currentLanguage.toUpperCase()})`}
          autoPlay={false}
        />
      </div>

      {/* Executive Summary Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
          {t.executiveSummaryTitle}
        </h3>
        <p className="text-sm sm:text-base text-slate-900 font-medium leading-relaxed">
          {report.executiveSummary}
        </p>
      </div>

      {/* Financial Health & Recovery Projection (3 Metric Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-rose-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.cashFlowImpact}
            </span>
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-rose-700">
            {report.financialImpact.cashFlowImpact}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Estimated capital compression requiring structural intervention.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.projectedRecovery}
            </span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-emerald-800">
            {report.financialImpact.projectedRecovery}
          </div>
          <p className="text-[11px] text-emerald-700 mt-2">
            Actionable liquidity liberated through structured phased turnover.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.roiTimeline}
            </span>
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-lg font-bold text-indigo-900">
            {report.financialImpact.roiTimeline}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Estimated timeframe to reach sustainable cash equilibrium.
          </p>
        </div>
      </div>

      {/* Systemic Bottlenecks */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          {t.rootCausesTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {report.rootCauseAnalysis.map((cause, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-3"
            >
              <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{cause}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phased Action Roadmap with Checklists */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            {t.actionRoadmapTitle}
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Interactive Operational Checklist
          </span>
        </div>

        <div className="space-y-4">
          {report.actionPlan.map((phase, pIdx) => (
            <div key={pIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded border border-emerald-200 w-fit">
                  {phase.phase}
                </span>
                <span className="text-sm font-bold text-slate-900">{phase.title}</span>
              </div>

              <div className="space-y-2">
                {phase.steps.map((step, sIdx) => {
                  const stepId = `step-${pIdx}-${sIdx}`;
                  const isDone = Boolean(completedSteps[stepId]);
                  return (
                    <div
                      key={sIdx}
                      id={`action-item-${pIdx}-${sIdx}`}
                      onClick={() => toggleStep(stepId)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 text-xs sm:text-sm ${
                        isDone
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 line-through opacity-80'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleStep(stepId)}
                        className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] font-medium text-slate-600 bg-slate-100 p-2 rounded-md">
                <strong className="text-slate-900">Milestone: </strong>
                {phase.expectedOutcome}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Distributor Negotiation Script */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-400" />
              {t.negotiationScriptTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Professional, respectful dialogue designed to expand credit terms without conflict.
            </p>
          </div>

          <button
            id="copy-negotiation-script-btn"
            type="button"
            onClick={handleCopyScript}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer w-fit"
          >
            {copiedScript ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t.copiedScript}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyScript}</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm font-medium text-slate-200 leading-relaxed italic">
          "{report.negotiationScript}"
        </div>
      </div>
    </div>
  );
};
