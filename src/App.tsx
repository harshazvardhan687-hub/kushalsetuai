import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  StoreProfile,
  DiagnosticReport,
} from './types';
import { Header } from './components/Header';
import { ProblemSubmission } from './components/ProblemSubmission';
import { AnalysisReportView } from './components/AnalysisReportView';
import { MentorChat } from './components/MentorChat';
import { SkillProofChallenges } from './components/SkillProofChallenges';
import { ProfileModal } from './components/ProfileModal';
import { runSimulationDiagnosis } from './data/simulationEngine';
import { speechController } from './utils/speech';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'mentor' | 'skillproof'>('diagnostics');
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Default Store Profile
  const [storeProfile, setStoreProfile] = useState<StoreProfile>({
    storeName: 'Sri Venkateswara General Store & Provisions',
    merchantName: 'K. Harsha Vardhan',
    enterpriseCategory: 'General Merchandise Store',
    monthlyRevenue: '₹4,80,000 / mo',
    primaryLocation: 'Guntur Commercial Center, AP',
  });

  // Diagnostic State
  const [currentReport, setCurrentReport] = useState<DiagnosticReport | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [activeContextForMentor, setActiveContextForMentor] = useState<string>('');

  // Check health on load
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data?.hasGeminiKey) {
          setHasGeminiKey(true);
        }
      })
      .catch(() => {
        // Dev server or fallback
      });

    const handleSpeechStateChange = (speaking: boolean) => {
      setIsSpeaking(speaking);
    };
    speechController.addListener(handleSpeechStateChange);

    return () => {
      speechController.removeListener(handleSpeechStateChange);
    };
  }, []);

  const handleRunDiagnosis = async (
    title: string,
    description: string,
    metrics: {
      monthlyTurnover: number;
      supplierCreditDays: number;
      deadStockPercentage: number;
      workingCapitalGap: number;
    }
  ) => {
    setIsLoadingAnalysis(true);
    setActiveContextForMentor(`${title}: ${description}`);

    try {
      // Call server-side endpoint
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: title,
          businessType: storeProfile.enterpriseCategory,
          description,
          metrics,
          language: currentLanguage,
        }),
      });

      const data = await res.json();

      if (data?.success && data?.data?.executiveSummary) {
        setCurrentReport({
          ...data.data,
          engineUsed: 'Gemini 3.8 Flash (Live Universal LLM Engine)',
          generatedAt: new Date().toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        });
      } else {
        // Responsive Smart Simulation Engine
        const simulated = runSimulationDiagnosis(
          title,
          storeProfile.enterpriseCategory,
          description,
          metrics,
          currentLanguage
        );
        setCurrentReport(simulated);
      }
    } catch (err) {
      const simulated = runSimulationDiagnosis(
        title,
        storeProfile.enterpriseCategory,
        description,
        metrics,
        currentLanguage
      );
      setCurrentReport(simulated);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const handleConsultMentorFromReport = (initialQuery?: string) => {
    setActiveTab('mentor');
  };

  const handleResetAnalysis = () => {
    setCurrentReport(null);
  };

  const handleStopGlobalSpeech = () => {
    speechController.stop();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasGeminiKey={hasGeminiKey}
        storeProfile={storeProfile}
        onEditProfileClick={() => setIsProfileModalOpen(true)}
        isSpeaking={isSpeaking}
        onStopSpeech={handleStopGlobalSpeech}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'diagnostics' && (
          <div>
            {!currentReport ? (
              <ProblemSubmission
                currentLanguage={currentLanguage}
                storeProfile={storeProfile}
                onSubmitProblem={handleRunDiagnosis}
                isLoading={isLoadingAnalysis}
              />
            ) : (
              <AnalysisReportView
                report={currentReport}
                currentLanguage={currentLanguage}
                onConsultMentor={handleConsultMentorFromReport}
                onResetAnalysis={handleResetAnalysis}
              />
            )}
          </div>
        )}

        {activeTab === 'mentor' && (
          <MentorChat
            currentLanguage={currentLanguage}
            storeProfile={storeProfile}
            initialContext={activeContextForMentor}
            hasGeminiKey={hasGeminiKey}
          />
        )}

        {activeTab === 'skillproof' && (
          <SkillProofChallenges
            currentLanguage={currentLanguage}
            storeProfile={storeProfile}
            hasGeminiKey={hasGeminiKey}
          />
        )}
      </main>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={storeProfile}
        onSaveProfile={setStoreProfile}
      />

      {/* Dignified Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Retail Enterprise Advisory & SkillProof Hub</span>
            <span>•</span>
            <span>Independent Retail & Community Co-operative Support</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>English • తెలుగు (Telugu) • हिंदी (Hindi)</span>
            <span>•</span>
            <span>Bilingual Audio Enabled</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
