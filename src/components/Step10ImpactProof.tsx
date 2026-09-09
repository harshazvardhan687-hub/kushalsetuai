import React from 'react';
import { ImpactProofData, Mission } from '../types';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface Step10Props {
  impact: ImpactProofData;
  mission: Mission;
  onProceedToPassport: () => void;
  onBackToVerification: () => void;
}

export const Step10ImpactProof: React.FC<Step10Props> = ({
  impact,
  mission,
  onProceedToPassport,
  onBackToVerification,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 10 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Real-World Evidence</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">10. ImpactProof</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Measuring tangible operational before-and-after change in Sri Lakshmi Kirana, Vizianagaram.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-800">
            Real Impact Verified
          </span>
        </div>
      </div>

      {/* Main Impact Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Tangible Operational Transformation
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              MEASURABLE BUSINESS IMPACT
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Client: <strong className="text-slate-900">{impact.organization_name}</strong> • Location: Vizianagaram
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Field Verified by Merchant</span>
          </div>
        </div>

        {/* Before vs After Visual Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-4 uppercase tracking-wider text-xs">Operational Dimension</th>
                <th className="p-4 uppercase tracking-wider text-xs text-rose-300">
                  Before KaushalSetu
                </th>
                <th className="p-4 uppercase tracking-wider text-xs text-cyan-300">
                  After Student Solution
                </th>
                <th className="p-4 uppercase tracking-wider text-xs text-emerald-300">
                  Net Gain / Impact
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {impact.metrics.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{m.dimension}</td>
                  <td className="p-4 text-rose-700 font-semibold bg-rose-50/50">
                    {m.before}
                  </td>
                  <td className="p-4 text-cyan-800 font-bold bg-cyan-50/50">
                    {m.after}
                  </td>
                  <td className="p-4 text-emerald-700 font-bold bg-emerald-50/50">
                    {m.impact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Highlight Stats Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-cyan-50/60 border border-cyan-200 text-center">
            <span className="text-xs font-bold uppercase text-slate-600 block mb-1">
              Products Digitized
            </span>
            <span className="text-3xl font-black text-cyan-700">200+</span>
            <span className="text-xs text-slate-500 block mt-1">From handwritten ledger</span>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center">
            <span className="text-xs font-bold uppercase text-slate-600 block mb-1">
              Daily Time Saved
            </span>
            <span className="text-3xl font-black text-emerald-700">40 Min</span>
            <span className="text-xs text-slate-500 block mt-1">45 min reduced to 5 min</span>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 text-center">
            <span className="text-xs font-bold uppercase text-slate-600 block mb-1">
              Stockout Reduction
            </span>
            <span className="text-3xl font-black text-purple-700">100%</span>
            <span className="text-xs text-slate-500 block mt-1">Zero unexpected runouts</span>
          </div>
        </div>

        {/* Narrative Summary */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Impact Verification Summary
          </span>
          <p className="leading-relaxed font-medium">
            "{impact.summary}"
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToVerification}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ← Back to Dual Verification
          </button>

          <button
            id="issue-passport-btn"
            type="button"
            onClick={onProceedToPassport}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Issue Digital WorkProof Passport</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
