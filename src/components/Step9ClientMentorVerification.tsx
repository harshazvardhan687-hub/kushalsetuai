import React from 'react';
import { ClientMentorVerification, Mission } from '../types';
import {
  ShieldCheck,
  Star,
  CheckCircle2,
  Store,
  UserCheck,
  ArrowRight,
  Sparkles,
  MapPin,
  Quote,
} from 'lucide-react';

interface Step9Props {
  verification: ClientMentorVerification;
  mission: Mission;
  onProceedToImpactProof: () => void;
  onBackToSkillProof: () => void;
}

export const Step9ClientMentorVerification: React.FC<Step9Props> = ({
  verification,
  mission,
  onProceedToImpactProof,
  onBackToSkillProof,
}) => {
  const client = verification.client;
  const mentor = verification.mentor;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 9 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Human-in-the-Loop</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">9. Client / Mentor Verification</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real human validation from the local organization owner and industry mentor ensures practical grounding.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800">
            Dual Verification Complete
          </span>
        </div>
      </div>

      {/* Dual Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Verification Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{client.owner_name}</h3>
                  <p className="text-xs text-slate-500">{client.organization_name}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Problem Solved:</span>
                <strong className="text-emerald-700">Yes (100%)</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Solution Useful:</span>
                <strong className="text-emerald-700">Yes, daily in use</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Client Rating:</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-slate-900 ml-1">5 / 5</span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2">
              <p className="italic leading-relaxed">
                "{client.feedback}"
              </p>
              {client.telugu_feedback && (
                <p className="text-slate-600 text-[11px] pt-2 border-t border-slate-200">
                  <strong className="text-slate-800">తెలుగు:</strong> {client.telugu_feedback}
                </p>
              )}
            </div>
          </div>

          <div className="pt-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Location: {client.location}</span>
            <span>Date: {client.verified_date}</span>
          </div>
        </div>

        {/* Mentor Verification Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{mentor.mentor_name}</h3>
                  <p className="text-xs text-slate-500">{mentor.designation}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Domain:</span>
                <strong className="text-slate-900">{mentor.organization}</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Technical Soundness:</span>
                <strong className="text-emerald-700">Excellent (Industry Grade)</strong>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Mentor Rating:</span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-slate-900 ml-1">5 / 5</span>
                </div>
              </div>
            </div>

            {/* Mentor Remarks */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-2">
              <p className="italic leading-relaxed">
                "{mentor.remarks}"
              </p>
            </div>
          </div>

          <div className="pt-3 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Audit Ref: KS-MENTOR-VZ-09</span>
            <span>Date: {mentor.verified_date}</span>
          </div>
        </div>
      </div>

      {/* Action to proceed to ImpactProof */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToSkillProof}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          ← Back to SkillProof Defense
        </button>

        <button
          id="proceed-to-impact-proof-btn"
          type="button"
          onClick={onProceedToImpactProof}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Verify & Generate ImpactProof</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
