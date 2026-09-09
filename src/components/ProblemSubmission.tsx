import React, { useState } from 'react';
import { SupportedLanguage, ProblemPreset, StoreProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { STARTER_PRESETS } from '../data/presets';
import { startSpeechRecognition, VoiceRecognitionSession } from '../utils/speech';
import {
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  FileText,
  Sliders,
  DollarSign,
  Calendar,
  Layers,
  AlertCircle,
} from 'lucide-react';

interface ProblemSubmissionProps {
  currentLanguage: SupportedLanguage;
  storeProfile: StoreProfile;
  onSubmitProblem: (
    title: string,
    description: string,
    metrics: {
      monthlyTurnover: number;
      supplierCreditDays: number;
      deadStockPercentage: number;
      workingCapitalGap: number;
    }
  ) => void;
  isLoading: boolean;
}

export const ProblemSubmission: React.FC<ProblemSubmissionProps> = ({
  currentLanguage,
  storeProfile,
  onSubmitProblem,
  isLoading,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [selectedPresetId, setSelectedPresetId] = useState<string>(STARTER_PRESETS[0].id);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);

  // Form State
  const initialPreset = STARTER_PRESETS[0];
  const [problemTitle, setProblemTitle] = useState<string>(initialPreset.title[currentLanguage]);
  const [description, setDescription] = useState<string>(initialPreset.defaultProblemText[currentLanguage]);
  const [monthlyTurnover, setMonthlyTurnover] = useState<number>(initialPreset.defaultMetrics.monthlyTurnover);
  const [supplierCreditDays, setSupplierCreditDays] = useState<number>(initialPreset.defaultMetrics.supplierCreditDays);
  const [deadStockPercentage, setDeadStockPercentage] = useState<number>(initialPreset.defaultMetrics.deadStockPercentage);
  const [workingCapitalGap, setWorkingCapitalGap] = useState<number>(initialPreset.defaultMetrics.workingCapitalGap);

  // Voice recording state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSession, setRecordingSession] = useState<VoiceRecognitionSession | null>(null);
  const [voiceNotification, setVoiceNotification] = useState<string | null>(null);

  const handleSelectPreset = (preset: ProblemPreset) => {
    setSelectedPresetId(preset.id);
    setIsCustomMode(false);
    setProblemTitle(preset.title[currentLanguage]);
    setDescription(preset.defaultProblemText[currentLanguage]);
    setMonthlyTurnover(preset.defaultMetrics.monthlyTurnover);
    setSupplierCreditDays(preset.defaultMetrics.supplierCreditDays);
    setDeadStockPercentage(preset.defaultMetrics.deadStockPercentage);
    setWorkingCapitalGap(preset.defaultMetrics.workingCapitalGap);
  };

  const handleToggleVoiceRecording = () => {
    if (isRecording) {
      if (recordingSession) {
        recordingSession.stop();
      }
      setIsRecording(false);
      setRecordingSession(null);
      setVoiceNotification('Voice recording completed.');
      setTimeout(() => setVoiceNotification(null), 3000);
    } else {
      setIsRecording(true);
      setVoiceNotification(t.recordingActive);

      const session = startSpeechRecognition(
        currentLanguage,
        (transcript) => {
          setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript));
        },
        (errorMsg) => {
          setVoiceNotification(errorMsg);
          setTimeout(() => setVoiceNotification(null), 4000);
        },
        () => {
          setIsRecording(false);
          setRecordingSession(null);
        }
      );

      setRecordingSession(session);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemTitle.trim() || !description.trim()) return;

    onSubmitProblem(problemTitle, description, {
      monthlyTurnover,
      supplierCreditDays,
      deadStockPercentage,
      workingCapitalGap,
    });
  };

  return (
    <div className="space-y-8">
      {/* Enterprise Context Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/60">
            {storeProfile.enterpriseCategory}
          </span>
          <h2 className="text-xl font-bold mt-1 text-white">
            {storeProfile.storeName} — Operational Assessment
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Location: {storeProfile.primaryLocation} • Est. Monthly Volume: {storeProfile.monthlyRevenue}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Assessment Target</span>
            <span className="text-xs font-semibold text-emerald-400">Working Capital Defense & Liquidity</span>
          </div>
        </div>
      </div>

      {/* Preset Problem Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            {t.selectPresetTitle}
          </h3>
          <button
            id="toggle-custom-challenge-btn"
            type="button"
            onClick={() => {
              setIsCustomMode(!isCustomMode);
              if (!isCustomMode) {
                setProblemTitle('');
                setDescription('');
              }
            }}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
          >
            {isCustomMode ? '← Back to Enterprise Presets' : '+ Write Custom Operational Problem'}
          </button>
        </div>

        {!isCustomMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STARTER_PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <div
                  key={preset.id}
                  id={`preset-card-${preset.id}`}
                  onClick={() => handleSelectPreset(preset)}
                  className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-sm ring-1 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {preset.domain[currentLanguage]}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {preset.title[currentLanguage]}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {preset.summary[currentLanguage]}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Turnover: ₹{(preset.defaultMetrics.monthlyTurnover / 100000).toFixed(1)}L</span>
                    <span className="text-emerald-800 font-semibold">Gap: ₹{(preset.defaultMetrics.workingCapitalGap / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
            <p>
              Custom Problem Mode: Submit any unique challenge facing your general store, FMCG retail hub, or community NGO enterprise. You can type or use the bilingual voice recording button below.
            </p>
          </div>
        )}
      </div>

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              {isCustomMode ? 'Custom Operational Problem Formulation' : 'Selected Enterprise Case Details'}
            </h3>
          </div>

          {/* Voice Input Trigger */}
          <button
            id="voice-problem-input-btn"
            type="button"
            onClick={handleToggleVoiceRecording}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-900/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
          >
            {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-700" />}
            <span>{isRecording ? t.stopRecording : t.speakProblemBtn}</span>
          </button>
        </div>

        {/* Voice Notification banner */}
        {voiceNotification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-900 flex items-center gap-2 animate-fadeIn">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
            <span>{voiceNotification}</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.problemTitleLabel}
            </label>
            <input
              id="problem-title-input"
              type="text"
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
              placeholder="e.g., Working Capital Freeze & 15-Day FMCG Distributor Terms"
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.descriptionLabel}
            </label>
            <textarea
              id="problem-description-textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your operational bottlenecks, supplier issues, customer credit disputes, or perishable shrinkage..."
              required
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Operational Metrics Sliders & Values */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-emerald-700" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Operational Baseline Calibration (Real-World Parameters)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {t.monthlyTurnoverLabel}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="metric-turnover-input"
                  type="number"
                  step="10000"
                  value={monthlyTurnover}
                  onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
                  className="w-full bg-white px-2.5 py-1.5 border border-slate-300 rounded text-sm font-semibold text-slate-900"
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                ≈ ₹{(monthlyTurnover / 100000).toFixed(2)} Lakhs / mo
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {t.creditDaysLabel}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="metric-credit-days-input"
                  type="number"
                  min="0"
                  max="90"
                  value={supplierCreditDays}
                  onChange={(e) => setSupplierCreditDays(Number(e.target.value))}
                  className="w-full bg-white px-2.5 py-1.5 border border-slate-300 rounded text-sm font-semibold text-slate-900"
                />
                <span className="text-xs text-slate-500 font-medium">Days</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Industry Target: 30-45 Days
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {t.deadStockLabel}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="metric-dead-stock-input"
                  type="number"
                  min="0"
                  max="60"
                  value={deadStockPercentage}
                  onChange={(e) => setDeadStockPercentage(Number(e.target.value))}
                  className="w-full bg-white px-2.5 py-1.5 border border-slate-300 rounded text-sm font-semibold text-slate-900"
                />
                <span className="text-xs text-slate-500 font-medium">%</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                Target: Below 6%
              </span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                {t.workingCapitalGapLabel}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="metric-working-capital-input"
                  type="number"
                  step="5000"
                  value={workingCapitalGap}
                  onChange={(e) => setWorkingCapitalGap(Number(e.target.value))}
                  className="w-full bg-white px-2.5 py-1.5 border border-slate-300 rounded text-sm font-semibold text-slate-900"
                />
              </div>
              <span className="text-[10px] text-emerald-700 font-medium mt-1 block">
                Recovery Target: 72%
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            id="run-enterprise-diagnosis-btn"
            type="submit"
            disabled={isLoading}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all cursor-pointer ${
              isLoading
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-600 shadow-emerald-900/20 active:scale-[0.99]'
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{t.analyzingText}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>{t.runDiagnosisBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
