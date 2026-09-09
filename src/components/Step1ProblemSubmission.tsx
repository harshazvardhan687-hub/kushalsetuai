import React, { useState } from 'react';
import { Problem, SupportedLanguage } from '../types';
import {
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Store,
  MapPin,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { startSpeechRecognition, VoiceRecognitionSession } from '../utils/speech';

interface Step1Props {
  problem: Problem;
  onUpdateProblem: (updated: Partial<Problem>) => void;
  onAnalyzeProblem: () => void;
  isLoading: boolean;
  language: SupportedLanguage;
}

export const Step1ProblemSubmission: React.FC<Step1Props> = ({
  problem,
  onUpdateProblem,
  onAnalyzeProblem,
  isLoading,
  language,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSession, setRecordingSession] = useState<VoiceRecognitionSession | null>(null);
  const [simulatedImageName, setSimulatedImageName] = useState<string | null>(
    'kirana_stock_notebook_page.jpg'
  );

  const handleToggleVoice = () => {
    if (isRecording) {
      if (recordingSession) recordingSession.stop();
      setIsRecording(false);
      setRecordingSession(null);
    } else {
      setIsRecording(true);
      const session = startSpeechRecognition(
        language,
        (transcript) => {
          onUpdateProblem({
            problem_description: problem.problem_description
              ? `${problem.problem_description} ${transcript}`
              : transcript,
            input_method: 'voice',
          });
        },
        () => setIsRecording(false),
        () => {
          setIsRecording(false);
          setRecordingSession(null);
        }
      );
      setRecordingSession(session);
    }
  };

  const handlePresetSelect = (type: 'kirana' | 'farmer' | 'shg') => {
    if (type === 'kirana') {
      onUpdateProblem({
        organization_name: 'Sri Lakshmi Kirana & General Store',
        location: 'Kothagraharam Main Road, Vizianagaram, AP',
        title: 'Notebook-based Inventory & Out-of-Stock Tracking',
        problem_description:
          'My shop stock is written in a notebook. I do not know which products are running out or when to reorder from distributors in Vizianagaram.',
        telugu_description:
          'నా కిరాణా దుకాణం స్టాక్ అంతా నోట్‌బుక్‌లో రాసి ఉంటుంది. ఏ సరుకులు అయిపోతున్నాయో, ఎప్పుడు ఆర్డర్ చేయాలో నాకు సమయానికి తెలియడం లేదు.',
        category: 'Retail & Inventory Management',
      });
      setSimulatedImageName('kirana_stock_notebook_page.jpg');
    } else if (type === 'farmer') {
      onUpdateProblem({
        organization_name: 'Vizianagaram Natural Growers Producer Group',
        location: 'Bhogapuram Mandi Belt, Vizianagaram, AP',
        title: 'Daily Wholesale Mandi Price Information Gap',
        problem_description:
          'Our farmers do not get real-time price updates from Visakhapatnam and Vizianagaram wholesale mandis, causing middlemen to pay 30% below market value for vegetables.',
        telugu_description:
          'మా రైతులకు రోజువారీ మార్కెట్ ధరలు సమయానికి అందకపోవడం వల్ల దళారుల వద్ద నష్టపోతున్నారు.',
        category: 'Agriculture & Supply Chain',
      });
      setSimulatedImageName('mandi_rate_receipt.jpg');
    } else {
      onUpdateProblem({
        organization_name: 'Prerana Mahila Sangham (SHG)',
        location: 'Gajapathinagaram, Vizianagaram District, AP',
        title: 'Customer Credit & Installment Ledger Tracking',
        problem_description:
          'We handcraft organic spice powders and snacks. Customer credit is tracked across loose chits. We are unable to tally weekly collections accurately.',
        telugu_description:
          'మా మహిళా సంఘం చిల్లర అప్పుల లెక్కలు కాగితాలపై రాసుకుంటున్నాము, వసూళ్లు సమయానికి తేలడం లేదు.',
        category: 'Small Business & Bookkeeping',
      });
      setSimulatedImageName('shg_credit_sheet.jpg');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Module Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 1 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Local Organization Entry</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">1. Problem Submission</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Local organizations submit their real-world operational bottlenecks via simple text, Telugu voice, or notebook photos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Vizianagaram Ground Case</span>
          </div>
        </div>
      </div>

      {/* Quick Preset Selector for Easy Demo Understanding */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            Select Real Local Case Preset:
          </span>
          <span className="text-[11px] text-slate-500">Vizianagaram pilot examples</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            id="preset-kirana-btn"
            type="button"
            onClick={() => handlePresetSelect('kirana')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              problem.category === 'Retail & Inventory Management'
                ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-200 text-slate-950 font-bold'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="text-xs block font-bold text-slate-900">
              🏪 Sri Lakshmi Kirana (Main Demo)
            </span>
            <span className="text-[11px] text-slate-500 line-clamp-1">
              Notebook stock & reorder issues
            </span>
          </button>

          <button
            id="preset-farmer-btn"
            type="button"
            onClick={() => handlePresetSelect('farmer')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              problem.category === 'Agriculture & Supply Chain'
                ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-200 text-slate-950 font-bold'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="text-xs block font-bold text-slate-900">
              🌾 Vizianagaram Natural Growers
            </span>
            <span className="text-[11px] text-slate-500 line-clamp-1">
              Mandi daily wholesale pricing gap
            </span>
          </button>

          <button
            id="preset-shg-btn"
            type="button"
            onClick={() => handlePresetSelect('shg')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              problem.category === 'Small Business & Bookkeeping'
                ? 'bg-cyan-50 border-cyan-500 ring-2 ring-cyan-200 text-slate-950 font-bold'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <span className="text-xs block font-bold text-slate-900">
              🧵 Prerana Mahila Sangham (SHG)
            </span>
            <span className="text-[11px] text-slate-500 line-clamp-1">
              Snack & spice customer credit ledger
            </span>
          </button>
        </div>
      </div>

      {/* Main Submission Form */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {problem.organization_name}
              </h3>
              <p className="text-xs text-slate-500">{problem.location}</p>
            </div>
          </div>

          {/* Voice Input Button */}
          <button
            id="voice-problem-btn"
            type="button"
            onClick={handleToggleVoice}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-900/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-cyan-600" />}
            <span>{isRecording ? 'Listening in Telugu/English...' : 'Speak Problem (Voice Input)'}</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Problem Title
            </label>
            <input
              id="problem-title-field"
              type="text"
              value={problem.title}
              onChange={(e) => onUpdateProblem({ title: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Problem Description (Describe your bottleneck in simple words)
              </label>
              <span className="text-[11px] text-slate-400">English or Telugu</span>
            </div>
            <textarea
              id="problem-desc-field"
              rows={4}
              value={problem.problem_description}
              onChange={(e) => onUpdateProblem({ problem_description: e.target.value })}
              placeholder="e.g., My shop stock is written in a notebook. I don't know which products are running out or when to reorder..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />
          </div>

          {/* Telugu translation helper box */}
          {problem.telugu_description && (
            <div className="p-3.5 bg-cyan-50/50 border border-cyan-200/80 rounded-xl text-xs text-cyan-950 flex items-start gap-2">
              <span className="font-bold text-cyan-800 whitespace-nowrap">తెలుగు వివరణ:</span>
              <p className="leading-relaxed">{problem.telugu_description}</p>
            </div>
          )}

          {/* Simulated Image / Notebook Upload */}
          <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-600">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Notebook Ledger Photo (Optional Attachment)
                </span>
                <span className="text-[11px] text-slate-500">
                  {simulatedImageName || 'Upload a photo of your paper ledger or shop register'}
                </span>
              </div>
            </div>

            <button
              id="upload-simulated-photo-btn"
              type="button"
              onClick={() => setSimulatedImageName('kirana_stock_notebook_page.jpg')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {simulatedImageName ? '✓ Attached: ' + simulatedImageName : '+ Attach Ledger Photo'}
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Next: AI checks clarity, safety, solvability, and measurability.
          </span>

          <button
            id="analyze-problem-btn"
            type="button"
            onClick={onAnalyzeProblem}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 shadow-lg transition-all cursor-pointer ${
              isLoading
                ? 'bg-slate-300 text-slate-600 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/25 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                <span>Analyzing Problem with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze My Problem with AI</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
