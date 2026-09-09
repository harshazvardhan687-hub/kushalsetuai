import React, { useState } from 'react';
import { Mission, MissionMatch } from '../types';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Award,
  GraduationCap,
  MapPin,
  Clock,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
} from 'lucide-react';

interface Step4Props {
  mission: Mission;
  matches: MissionMatch[];
  selectedMatchId: string;
  onSelectStudent: (matchId: string) => void;
  onAcceptMission: () => void;
  onBackToMissionGen: () => void;
}

export const Step4GrowthMatching: React.FC<Step4Props> = ({
  mission,
  matches,
  selectedMatchId,
  onSelectStudent,
  onAcceptMission,
  onBackToMissionGen,
}) => {
  const activeMatch = matches.find((m) => m.match_id === selectedMatchId) || matches[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 4 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Core Innovation</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">4. Growth Matching</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Matching students based on existing competence plus learnable growth gap, not obsolete 100% prior experience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-800">
            3 College Candidates Matched
          </span>
        </div>
      </div>

      {/* The Innovation Formula Card */}
      <div className="p-5 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-2">
          The KaushalSetu Growth Match Formula
        </span>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-slate-200">
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300">
            70–80% Existing Skills
          </span>
          <span>+</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-purple-300">
            20–30% Learnable Gap
          </span>
          <span>+</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-300">
            Career Relevance
          </span>
          <span>=</span>
          <span className="px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-black shadow-md">
            Growth Match Score
          </span>
        </div>
      </div>

      {/* The Three Matched Student Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
          Ranked Candidate Matches for Vizianagaram Kirana Mission:
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {matches.map((match) => {
            const isSelected = match.match_id === selectedMatchId;
            const stu = match.student;

            return (
              <div
                key={match.match_id}
                id={`student-card-${stu.student_id}`}
                onClick={() => onSelectStudent(match.match_id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-50/70 border-cyan-500 shadow-md ring-2 ring-cyan-400'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Student Basic Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={stu.avatar}
                      alt={stu.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-200 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-900">{stu.name}</h4>
                        {isSelected && (
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-cyan-600 text-white">
                            Selected
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5 font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                        {stu.college}
                      </p>

                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {stu.location} • Available: {stu.available_time}
                      </p>
                    </div>
                  </div>

                  {/* Growth Match Score Cluster */}
                  <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs self-start sm:self-auto">
                    <div className="text-center px-2 border-r border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">
                        Growth Match
                      </span>
                      <span className="text-2xl font-black text-cyan-600">
                        {match.growth_match_score}%
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-600">
                      <div>
                        Existing: <strong className="text-slate-900">{match.existing_skill_score}%</strong>
                      </div>
                      <div>
                        Learnable Gap: <strong className="text-purple-700">+{match.learnable_skill_gap}%</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Rationale */}
                <div className="mt-4 pt-4 border-t border-slate-200/70 space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 mr-1">Skills:</span>
                    {stu.skills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-800"
                      >
                        {sk}
                      </span>
                    ))}
                    <span className="text-xs text-slate-400 mx-2">|</span>
                    <span className="text-xs font-semibold text-slate-500">Career Goal:</span>
                    <span className="text-xs font-bold text-slate-800">{stu.career_interest}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-100/60 p-2.5 rounded-xl">
                    "{match.matching_rationale}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToMissionGen}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to Mission Specification
          </button>

          <button
            id="assign-mission-btn"
            type="button"
            onClick={onAcceptMission}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Assign to {activeMatch.student.name} & Open AI Mentor</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
