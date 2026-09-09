import React from 'react';
import { Mission } from '../types';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Briefcase,
  CheckCircle2,
  FileSpreadsheet,
  Target,
  Layers,
  Award,
  Users,
} from 'lucide-react';

interface Step3Props {
  mission: Mission;
  onProceedToGrowthMatching: () => void;
  onBackToReadiness: () => void;
}

export const Step3AIMissionGenerator: React.FC<Step3Props> = ({
  mission,
  onProceedToGrowthMatching,
  onBackToReadiness,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 3 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Mission Engineering</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">3. AI Mission Generator</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Converts vague, messy local problems into clear, structured, and measurable student work missions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-purple-950/80 border border-purple-800 text-xs font-semibold text-purple-300">
            Structured & Verified
          </span>
        </div>
      </div>

      {/* Mission Specification Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        {/* Mission Header */}
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800">
              {mission.difficulty} Difficulty
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {mission.estimated_time}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Client: <strong className="text-slate-800">{mission.organization_name}</strong> ({mission.location})
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {mission.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            <strong>Expected Business Outcome:</strong> {mission.expected_outcome}
          </p>
        </div>

        {/* Required Skills & Student Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Skills */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Required Skills
            </span>
            <div className="flex flex-wrap gap-2">
              {mission.required_skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-800 shadow-2xs"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Students do not need 100% prior mastery. 70-80% existing + 20% learnable gap is optimal.
            </p>
          </div>

          {/* Student Deliverables */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
              Tangible Deliverables
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
              {mission.deliverables.map((del, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-700 font-bold">•</span>
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The 5 Sequential Student Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600" />
              Structured Student Tasks (Step-by-Step)
            </h4>
            <span className="text-xs text-slate-500">5 Clear Milestones</span>
          </div>

          <div className="space-y-3">
            {mission.tasks.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start gap-3.5"
              >
                <div className="h-7 w-7 rounded-lg bg-slate-900 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {task.id}
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-slate-900">{task.title}</h5>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToReadiness}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to Readiness Score
          </button>

          <button
            id="proceed-to-growth-matching-btn"
            type="button"
            onClick={onProceedToGrowthMatching}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Find Suitable Students (Growth Matching)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
