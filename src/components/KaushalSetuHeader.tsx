import React from 'react';
import { WorkflowStepId, UserRole, SupportedLanguage } from '../types';
import { WORKFLOW_STAGES } from '../data/kaushalSetuData';
import {
  Sparkles,
  MapPin,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  User,
  Store,
  GraduationCap,
  Globe,
  Award,
} from 'lucide-react';

interface KaushalSetuHeaderProps {
  currentStepId: WorkflowStepId;
  onSelectStep: (stepId: WorkflowStepId) => void;
  userRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  language: SupportedLanguage;
  onToggleLanguage: () => void;
  onResetDemo: () => void;
  hasGeminiKey: boolean;
}

export const KaushalSetuHeader: React.FC<KaushalSetuHeaderProps> = ({
  currentStepId,
  onSelectStep,
  userRole,
  onSelectRole,
  language,
  onToggleLanguage,
  onResetDemo,
  hasGeminiKey,
}) => {
  const currentStageMeta =
    WORKFLOW_STAGES.find((s) => s.id === currentStepId) || WORKFLOW_STAGES[0];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-md">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 ring-1 ring-white/20 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                KAUSHALSETU <span className="text-cyan-400 font-extrabold">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                Problem-to-Employment
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              From Local Problems to Proven Skills and Real Employment
            </p>
          </div>
        </div>

        {/* Pilot Hub, Role Selector, Language & Reset */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Vizianagaram Pilot Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-xs font-semibold text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Vizianagaram, AP Pilot</span>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold">
            <button
              id="role-student-btn"
              type="button"
              onClick={() => onSelectRole('student')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                userRole === 'student'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              id="role-organization-btn"
              type="button"
              onClick={() => onSelectRole('organization')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                userRole === 'organization'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Local Org</span>
            </button>
            <button
              id="role-mentor-btn"
              type="button"
              onClick={() => onSelectRole('mentor')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                userRole === 'mentor'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Mentor</span>
            </button>
          </div>

          {/* Bilingual Language Switcher */}
          <button
            id="toggle-language-btn"
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
          </button>

          {/* Reset Demo Journey */}
          <button
            id="reset-demo-btn"
            type="button"
            onClick={onResetDemo}
            title="Restart the connected Vizianagaram Kirana demo journey"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 hover:border-rose-800 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Connected 12-Step Horizontal Workflow Stepper */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-2.5 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 min-w-[1000px]">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isCurrent = stage.id === currentStepId;
            const isPassed = stage.stepNumber < currentStageMeta.stepNumber;

            return (
              <React.Fragment key={stage.id}>
                <button
                  id={`nav-step-${stage.stepNumber}`}
                  type="button"
                  onClick={() => onSelectStep(stage.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 ring-1 ring-cyan-300'
                      : isPassed
                      ? 'bg-slate-800 text-cyan-300 hover:bg-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-slate-950 text-cyan-400'
                        : isPassed
                        ? 'bg-cyan-900 text-cyan-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isPassed ? '✓' : stage.stepNumber}
                  </span>
                  <span>{stage.shortTitle}</span>
                </button>
                {idx < WORKFLOW_STAGES.length - 1 && (
                  <span className="text-slate-700 text-[10px] font-bold">›</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </header>
  );
};
