import React, { useState } from 'react';
import {
  SkillProofChallenge,
  SkillProofCredential,
  SupportedLanguage,
  StoreProfile,
} from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRECONFIGURED_CHALLENGES } from '../data/simulationEngine';
import { AudioPlayerWidget } from './AudioPlayerWidget';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Printer,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Briefcase,
  Layers,
} from 'lucide-react';

interface SkillProofChallengesProps {
  currentLanguage: SupportedLanguage;
  storeProfile: StoreProfile;
  hasGeminiKey: boolean;
}

export const SkillProofChallenges: React.FC<SkillProofChallengesProps> = ({
  currentLanguage,
  storeProfile,
  hasGeminiKey,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [earnedCredential, setEarnedCredential] = useState<SkillProofCredential | null>(null);
  const [isGeneratingCustom, setIsGeneratingCustom] = useState<boolean>(false);
  const [activeChallengeList, setActiveChallengeList] = useState<SkillProofChallenge[]>(PRECONFIGURED_CHALLENGES);

  const currentChallenge = activeChallengeList[challengeIndex] || PRECONFIGURED_CHALLENGES[0];

  const handleSelectOption = (optId: string) => {
    if (isEvaluated) return;
    setSelectedOptionId(optId);
  };

  const handleEvaluate = () => {
    if (!selectedOptionId) return;
    setIsEvaluated(true);

    const chosenOption = currentChallenge.options.find((o) => o.id === selectedOptionId);
    if (chosenOption) {
      const compositeScore = Math.round(
        (chosenOption.financialScore * 0.45) +
        (chosenOption.riskScore * 0.3) +
        (chosenOption.relationshipScore * 0.25)
      );

      if (compositeScore >= 70) {
        const cred: SkillProofCredential = {
          id: `cred-${Date.now()}`,
          certificateNumber: `SP-${Math.floor(100000 + Math.random() * 900000)}`,
          merchantName: storeProfile.merchantName,
          enterpriseName: storeProfile.storeName,
          issueDate: new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          score: compositeScore,
          domain: currentChallenge.domain[currentLanguage],
          level: compositeScore >= 90 ? 'Executive Mastery (Gold)' : 'Commercial Competence (Silver)',
          verificationHash: `0x${Array.from({ length: 16 }, () =>
            Math.floor(Math.random() * 16).toString(16)
          ).join('')}`,
        };
        setEarnedCredential(cred);
      }
    }
  };

  const handleNextChallenge = () => {
    setSelectedOptionId(null);
    setIsEvaluated(false);
    setEarnedCredential(null);
    setChallengeIndex((prev) => (prev + 1) % activeChallengeList.length);
  };

  const handleGenerateAIChallenge = async () => {
    setIsGeneratingCustom(true);
    try {
      const res = await fetch('/api/gemini/generate-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'High-Stakes Working Capital & Supplier Syndicate Strategy',
          difficulty: 'Executive',
          language: currentLanguage,
        }),
      });
      const data = await res.json();
      if (data?.success && data?.data) {
        const newChallenge: SkillProofChallenge = {
          id: data.data.id || `custom-${Date.now()}`,
          title: {
            en: data.data.title,
            te: data.data.title,
            hi: data.data.title,
          },
          domain: {
            en: data.data.domain,
            te: data.data.domain,
            hi: data.data.domain,
          },
          difficulty: 'Executive',
          scenario: {
            en: data.data.scenario,
            te: data.data.scenario,
            hi: data.data.scenario,
          },
          financialContext: data.data.financialContext || {
            availableCash: '₹1,50,000',
            creditOwed: '₹80,000',
            weeklyTurnover: '₹1,30,000',
            inventoryAtRisk: '₹90,000',
          },
          options: data.data.options,
          bestOptionId: data.data.bestOptionId,
          executiveDebrief: {
            en: data.data.executiveDebrief,
            te: data.data.executiveDebrief,
            hi: data.data.executiveDebrief,
          },
        };
        setActiveChallengeList((prev) => [newChallenge, ...prev]);
        setChallengeIndex(0);
        setSelectedOptionId(null);
        setIsEvaluated(false);
        setEarnedCredential(null);
      }
    } catch (e) {
      console.warn('Challenge generation fallback');
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const selectedOpt = currentChallenge.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-800/60">
              {currentChallenge.difficulty} Level Simulation
            </span>
            <span className="text-xs text-slate-400">
              Challenge {challengeIndex + 1} of {activeChallengeList.length}
            </span>
          </div>
          <h2 className="text-lg font-bold mt-1 text-white">
            {currentChallenge.title[currentLanguage]}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Competency Domain: {currentChallenge.domain[currentLanguage]}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="generate-ai-challenge-btn"
            type="button"
            onClick={handleGenerateAIChallenge}
            disabled={isGeneratingCustom}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>{isGeneratingCustom ? 'Synthesizing...' : 'New AI Scenario'}</span>
          </button>

          <button
            id="next-challenge-btn"
            type="button"
            onClick={handleNextChallenge}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            <span>{t.nextChallenge}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scenario Narration & Audio Briefing */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            {t.scenarioTitle}
          </h3>
          <span className="text-xs text-emerald-700 font-semibold">
            Real-World Retail Scenario
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">
          {currentChallenge.scenario[currentLanguage]}
        </p>

        {/* Audio Briefing widget for the challenge */}
        <AudioPlayerWidget
          textToSpeak={currentChallenge.scenario[currentLanguage]}
          language={currentLanguage}
          label="Listen to Commercial Challenge Audio"
        />

        {/* Financial Context Pill Bar */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            {t.financialSnapshot}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block">{t.availableCash}</span>
              <span className="text-sm font-bold text-slate-900">
                {currentChallenge.financialContext.availableCash}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block">{t.creditOwed}</span>
              <span className="text-sm font-bold text-rose-700">
                {currentChallenge.financialContext.creditOwed}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block">{t.weeklyTurnover}</span>
              <span className="text-sm font-bold text-emerald-700">
                {currentChallenge.financialContext.weeklyTurnover}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 block">Inventory Volume</span>
              <span className="text-sm font-bold text-indigo-900">
                {currentChallenge.financialContext.inventoryAtRisk}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Options */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          {t.chooseStrategy}
        </h3>

        <div className="space-y-3">
          {currentChallenge.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isBest = isEvaluated && opt.id === currentChallenge.bestOptionId;

            return (
              <div
                key={opt.id}
                id={`challenge-option-${opt.id}`}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? isEvaluated
                      ? isBest
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400'
                        : 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-emerald-50/80 border-emerald-600 ring-1 ring-emerald-500'
                    : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.id}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                      {opt.text}
                    </p>

                    {/* Show Rubric & Explanation if Evaluated */}
                    {isEvaluated && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2">
                        <div className="flex flex-wrap gap-4 text-xs font-semibold">
                          <span className="text-emerald-700">
                            Financial Health: {opt.financialScore}/100
                          </span>
                          <span className="text-amber-700">
                            Risk Control: {opt.riskScore}/100
                          </span>
                          <span className="text-indigo-700">
                            Partner Trust: {opt.relationshipScore}/100
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {opt.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Evaluation Trigger Button */}
        {!isEvaluated ? (
          <div className="pt-2 flex justify-end">
            <button
              id="evaluate-challenge-btn"
              type="button"
              disabled={!selectedOptionId}
              onClick={handleEvaluate}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm text-white shadow-sm transition-all cursor-pointer ${
                selectedOptionId
                  ? 'bg-emerald-700 hover:bg-emerald-600'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {t.evaluateDecisionBtn}
            </button>
          </div>
        ) : (
          <div className="pt-2 flex items-center justify-between">
            <button
              id="retry-challenge-btn"
              type="button"
              onClick={() => {
                setIsEvaluated(false);
                setSelectedOptionId(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Decision</span>
            </button>

            <button
              id="continue-next-challenge-btn"
              type="button"
              onClick={handleNextChallenge}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-lg bg-emerald-700 text-white hover:bg-emerald-600 cursor-pointer"
            >
              <span>{t.nextChallenge}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Executive Debrief */}
      {isEvaluated && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            {t.debriefTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentChallenge.executiveDebrief[currentLanguage]}
          </p>
        </div>
      )}

      {/* Official SkillProof Credential Certificate */}
      {earnedCredential && (
        <div
          id="skillproof-certificate-card"
          className="relative bg-linear-to-b from-amber-50 via-white to-amber-50/40 border-2 border-amber-400/80 rounded-3xl p-8 shadow-xl text-slate-900 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-300/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-700">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                  Official Credential
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                  SkillProof™ Certificate of Commercial Retail Excellence
                </h3>
              </div>
            </div>

            <button
              id="print-certificate-btn"
              type="button"
              onClick={handlePrintCertificate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-colors cursor-pointer w-fit"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>{t.downloadCertificate}</span>
            </button>
          </div>

          <div className="text-center space-y-2 py-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              This credential formally certifies that
            </p>
            <h4 className="text-2xl font-black text-slate-900 tracking-tight">
              {earnedCredential.merchantName}
            </h4>
            <p className="text-sm font-semibold text-emerald-800">
              Operating: {earnedCredential.enterpriseName}
            </p>
            <p className="text-xs text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
              Has demonstrated verified executive-level competence in{' '}
              <span className="font-bold text-slate-900">{earnedCredential.domain}</span>{' '}
              with a verified performance score of{' '}
              <span className="font-bold text-emerald-700">{earnedCredential.score}/100</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-amber-200/80 text-center">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Certificate ID</span>
              <span className="text-xs font-mono font-bold text-slate-900">{earnedCredential.certificateNumber}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Classification</span>
              <span className="text-xs font-bold text-amber-800">{earnedCredential.level}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Issue Date</span>
              <span className="text-xs font-bold text-slate-900">{earnedCredential.issueDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Cryptographic Hash</span>
              <span className="text-[10px] font-mono text-slate-500 truncate block">{earnedCredential.verificationHash}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
