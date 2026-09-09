import React from 'react';
import { SupportedLanguage, StoreProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Building2, Sparkles, Volume2, ShieldCheck, Languages } from 'lucide-react';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  activeTab: 'diagnostics' | 'mentor' | 'skillproof';
  onTabChange: (tab: 'diagnostics' | 'mentor' | 'skillproof') => void;
  hasGeminiKey: boolean;
  storeProfile: StoreProfile;
  onEditProfileClick: () => void;
  isSpeaking: boolean;
  onStopSpeech: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  activeTab,
  onTabChange,
  hasGeminiKey,
  storeProfile,
  onEditProfileClick,
  isSpeaking,
  onStopSpeech,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: Brand & Language / Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-3 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">{t.appTitle}</h1>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                  SkillProof™ Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 font-normal truncate max-w-xl">{t.appSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-end">
            {/* Global Audio Indicator */}
            {isSpeaking && (
              <button
                id="stop-global-speech-btn"
                onClick={onStopSpeech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 animate-pulse hover:bg-amber-500/30 transition-colors"
                title="Audio playback is active. Click to stop."
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Playing</span>
                <span className="text-[10px] ml-1 opacity-75">✕ Stop</span>
              </button>
            )}

            {/* Engine status indicator */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/90 border border-slate-700/80 text-xs text-slate-300">
              <Sparkles className={`w-3.5 h-3.5 ${hasGeminiKey ? 'text-indigo-400' : 'text-emerald-400'}`} />
              <span className="font-medium text-slate-200">
                {hasGeminiKey ? 'Gemini 3.8 Flash' : 'Smart Simulation Engine'}
              </span>
            </div>

            {/* Store Profile badge */}
            <button
              id="header-profile-btn"
              onClick={onEditProfileClick}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-200 transition-colors cursor-pointer"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span className="font-medium truncate max-w-[130px]">{storeProfile.storeName}</span>
            </button>

            {/* Language Switcher */}
            <div className="inline-flex items-center p-0.5 rounded-md bg-slate-800 border border-slate-700">
              <Languages className="w-3.5 h-3.5 ml-2 mr-1 text-slate-400" />
              <button
                id="lang-en-btn"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
              <button
                id="lang-te-btn"
                onClick={() => onLanguageChange('te')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                  currentLanguage === 'te'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                తెలుగు
              </button>
              <button
                id="lang-hi-btn"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                  currentLanguage === 'hi'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-4 py-2 overflow-x-auto scrollbar-none">
          <button
            id="tab-btn-diagnostics"
            onClick={() => onTabChange('diagnostics')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
              activeTab === 'diagnostics'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {t.tabDiagnosis}
          </button>
          <button
            id="tab-btn-mentor"
            onClick={() => onTabChange('mentor')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
              activeTab === 'mentor'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {t.tabMentor}
          </button>
          <button
            id="tab-btn-skillproof"
            onClick={() => onTabChange('skillproof')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
              activeTab === 'skillproof'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {t.tabSkillProof}
          </button>
        </div>
      </div>
    </header>
  );
};
