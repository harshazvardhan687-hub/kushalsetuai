import React, { useState } from 'react';
import { WorkProofPassportData } from '../types';
import {
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Printer,
  ExternalLink,
  QrCode,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
} from 'lucide-react';

interface Step11Props {
  passport: WorkProofPassportData;
  onProceedToEmployment: () => void;
  onBackToImpact: () => void;
}

export const Step11WorkProofPassport: React.FC<Step11Props> = ({
  passport,
  onProceedToEmployment,
  onBackToImpact,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(passport.verification_hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 11 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Verified Credential</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">11. WorkProof Passport</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            A tamper-proof credential containing mission outcomes, SkillProof defense score, client rating, and real impact.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* The Master Digital WorkProof Passport Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-slate-900 via-slate-900 to-indigo-950 border-2 border-cyan-500/40 text-white shadow-2xl p-6 sm:p-10 space-y-8">
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        {/* Passport Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/20">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">
                  KAUSHALSETU WORKPROOF PASSPORT
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Universal Cryptographic Credential for Practical Experience
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">
              Passport Certificate ID
            </span>
            <span className="font-mono text-sm font-bold text-cyan-400">
              {passport.passport_id}
            </span>
          </div>
        </div>

        {/* Student & Mission Profile Strip */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt={passport.student_name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-cyan-500/60 shrink-0"
            />
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">{passport.student_name}</h3>
              <p className="text-xs text-slate-300 font-medium">{passport.college}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Role: {passport.role}
                </span>
                <span className="text-slate-400">Issued: {passport.issue_date}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-800/80 rounded-2xl p-4 border border-slate-700/80 text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Composite SkillProof Score
            </span>
            <span className="text-4xl font-black text-cyan-400">{passport.skill_proof_score}</span>
            <span className="text-[10px] text-slate-400 block">/ 100 Authentic Mastery</span>
          </div>
        </div>

        {/* Completed Mission Overview */}
        <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/70 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
            Verified Project Mission
          </span>
          <h4 className="text-lg font-bold text-white">{passport.mission_title}</h4>
          <p className="text-xs text-slate-300 font-medium">
            Organization: <strong>{passport.organization_name}</strong> ({passport.location})
          </p>
          <div className="text-xs text-slate-400 leading-relaxed pt-1">
            <strong>Verified Impact:</strong> {passport.impact_summary}
          </div>
        </div>

        {/* Verified Skills Grid */}
        <div className="space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Evidence-Backed Competencies
          </span>
          <div className="flex flex-wrap gap-2">
            {passport.skills_verified.map((sk, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-950/80 border border-cyan-700/80 text-cyan-300 shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* 4 Verification Sign-off Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {passport.verifications.map((v, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-center space-y-1"
            >
              <div className="h-6 w-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 flex items-center justify-center mx-auto text-xs font-bold">
                ✓
              </div>
              <span className="text-[11px] font-bold text-white block">{v.type}</span>
              <span className="text-[10px] text-slate-400 block truncate">{v.verifier}</span>
              <span className="text-[9px] text-emerald-400 font-semibold uppercase block">
                {v.status}
              </span>
            </div>
          ))}
        </div>

        {/* Cryptographic Hash & Verification Link */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-mono">HASH:</span>
            <span className="font-mono text-cyan-400 truncate max-w-xs sm:max-w-md">
              {passport.verification_hash}
            </span>
            <button
              type="button"
              onClick={handleCopyHash}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              title="Copy verification hash"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span>Powered by</span>
            <strong className="text-white">KaushalSetu AI Protocol</strong>
          </div>
        </div>
      </div>

      {/* Action to proceed to Employment Recommendations */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToImpact}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          ← Back to ImpactProof
        </button>

        <button
          id="proceed-to-employment-btn"
          type="button"
          onClick={onProceedToEmployment}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>View Employment Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
