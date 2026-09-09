import React, { useState } from 'react';
import { JobRecommendation, WorkProofPassportData } from '../types';
import {
  Briefcase,
  Sparkles,
  Award,
  CheckCircle2,
  Building,
  MapPin,
  Banknote,
  Send,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface Step12Props {
  recommendations: JobRecommendation[];
  passport: WorkProofPassportData;
  onRestartJourney: () => void;
  onBackToPassport: () => void;
}

export const Step12EmploymentRecommendations: React.FC<Step12Props> = ({
  recommendations,
  passport,
  onRestartJourney,
  onBackToPassport,
}) => {
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  const handleApply = (jobId: string) => {
    setApplyingJobId(jobId);
    setTimeout(() => {
      setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
      setApplyingJobId(null);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 12 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Full Circle: Real Employment</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">12. Employment Recommendations</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Matching Ravi Kumar's verified WorkProof Passport with real regional internships and entry-level career opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-800">
            WorkProof Attached
          </span>
        </div>
      </div>

      {/* Proof-to-Job Translation Card */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            The KaushalSetu Breakthrough
          </span>
          <h3 className="text-lg font-bold text-white">
            Experience Trap Solved for Ravi Kumar
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Employers no longer ask <em>"What prior experience do you have?"</em>.
            Your WorkProof Passport demonstrates <strong>200 products digitized</strong>, <strong>Excel formulas defended</strong>, and <strong>5/5 merchant approval</strong>.
          </p>
        </div>

        <div className="p-3 bg-slate-800/90 rounded-2xl border border-slate-700 text-center shrink-0">
          <span className="text-[10px] font-bold uppercase text-slate-400 block">
            Passport ID
          </span>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {passport.passport_id}
          </span>
        </div>
      </div>

      {/* Matched Job Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
          Top Regional & Remote Career Matches:
        </h3>

        <div className="space-y-4">
          {recommendations.map((job) => {
            const isApplied = appliedJobs[job.id];
            const isApplying = applyingJobId === job.id;

            return (
              <div
                key={job.id}
                id={`job-card-${job.id}`}
                className="bg-white border border-slate-200 hover:border-cyan-400 rounded-3xl p-6 shadow-sm transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-slate-900">{job.title}</h4>
                      <span className="text-xs font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                        {job.match_score}% Match
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        {job.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {job.location} ({job.type})
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                        {job.stipend}
                      </span>
                    </div>
                  </div>

                  {/* Apply Action */}
                  <div>
                    <button
                      id={`apply-btn-${job.id}`}
                      type="button"
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied || isApplying}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isApplied
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : isApplying
                          ? 'bg-slate-200 text-slate-600'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-[0.98]'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Application Sent with Passport!</span>
                        </>
                      ) : isApplying ? (
                        <span>Attaching Passport...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Apply with WorkProof Passport</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Match Rationale & Skills */}
                <div className="pt-3 border-t border-slate-100 text-xs space-y-2">
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed">
                    <strong className="text-slate-900">Why Matched: </strong>
                    {job.why_matched}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">
                      Matched Skills:
                    </span>
                    {job.skills_matched.map((sk, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-50 text-cyan-900 border border-cyan-200"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Actions */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToPassport}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to WorkProof Passport
          </button>

          <button
            id="restart-full-journey-btn"
            type="button"
            onClick={onRestartJourney}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>Restart Demo Journey (Vizianagaram Kirana Case)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
