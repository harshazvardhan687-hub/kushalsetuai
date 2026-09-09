import React from 'react';
import { WorkflowStepId } from '../types';
import {
  Sparkles,
  ArrowRight,
  Store,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap,
  Layers,
  MapPin,
} from 'lucide-react';

interface LandingHeroViewProps {
  onStartJourney: (stepId: WorkflowStepId) => void;
}

export const LandingHeroView: React.FC<LandingHeroViewProps> = ({ onStartJourney }) => {
  return (
    <div className="space-y-12 animate-fadeIn py-4">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI-Powered Local Problem-to-Employment Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            KAUSHALSETU <span className="text-cyan-400">AI</span>
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-slate-200">
            From Local Problems to Proven Skills and Real Employment
          </p>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
            Students need experience to get jobs, but need opportunities to gain experience.
            At the same time, local organizations in places like <strong className="text-slate-200">Vizianagaram</strong>—Kirana shops, small businesses, NGOs, and clinics—have real problems that remain unsolved.
            KaushalSetu AI turns everyday bottlenecks into verified work experience.
          </p>

          {/* Philosophy Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80">
              <span className="text-xs uppercase font-bold text-rose-400 block mb-1">
                Traditional Job Portals
              </span>
              <p className="text-sm text-slate-300 italic">
                "What experience do you already have?"
              </p>
            </div>
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60">
              <span className="text-xs uppercase font-bold text-cyan-400 block mb-1">
                KaushalSetu AI
              </span>
              <p className="text-sm text-cyan-200 font-semibold">
                "What real problem can you solve today?"
              </p>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              id="hero-start-demo-btn"
              type="button"
              onClick={() => onStartJourney('problem_submission')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Vizianagaram Kirana Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-view-passport-btn"
              type="button"
              onClick={() => onStartJourney('workproof_passport')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-purple-400" />
              <span>Inspect WorkProof Passport</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Portal Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          id="cta-have-problem-card"
          onClick={() => onStartJourney('problem_submission')}
          className="group p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center border border-cyan-100 group-hover:scale-105 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                For Local Organizations
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-cyan-700 transition-colors">
                I Have a Problem
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Kirana shops, small retail stores, NGOs, clinics, and farmer groups in Vizianagaram and across Andhra Pradesh. Submit your operational challenges in English or Telugu voice to get digital solutions.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-700">
            <span>Submit a local bottleneck</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div
          id="cta-want-experience-card"
          onClick={() => onStartJourney('growth_matching')}
          className="group p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                For College Students
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1 group-hover:text-purple-700 transition-colors">
                I Want Work Experience
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Engineering, commerce, and degree students. Complete structured real-world missions with AI mentorship, earn verifiable SkillProof ratings, and build an employer-ready WorkProof Passport.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
            <span>Discover matched missions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* The 12-Stage Connected System Flow Diagram */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Complete Connected Architecture
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              The 12-Step Problem-to-Employment Journey
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Zero disconnected stages • End-to-end evidence
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { num: 1, name: 'Problem Submission', sub: 'Kirana notebook ledger' },
            { num: 2, name: 'Problem Readiness AI', sub: '92% Mission Ready' },
            { num: 3, name: 'AI Mission Generator', sub: 'Digital Inventory Setup' },
            { num: 4, name: 'Growth Matching', sub: 'Ravi Kumar (88% Match)' },
            { num: 5, name: 'Adaptive AI Mentor', sub: 'Telugu/English step guidance' },
            { num: 6, name: 'Solution Submission', sub: 'Excel + live mobile demo' },
            { num: 7, name: 'AI Quality Evaluation', sub: '88% Technical score' },
            { num: 8, name: 'SkillProof', sub: '85/100 Authentic mastery' },
            { num: 9, name: 'Client Verification', sub: 'Ramana Rao 5/5 stars' },
            { num: 10, name: 'ImpactProof', sub: '200 products digitized' },
            { num: 11, name: 'WorkProof Passport', sub: 'Cryptographic evidence' },
            { num: 12, name: 'Employment Recs', sub: 'Operations Intern (92%)' },
          ].map((item) => (
            <div
              key={item.num}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="h-5 w-5 rounded-full bg-slate-900 text-cyan-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {item.num}
                </span>
                <span className="text-xs font-bold text-slate-900 truncate">
                  {item.name}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
