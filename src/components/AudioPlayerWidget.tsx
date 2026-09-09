import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { speechController } from '../utils/speech';
import { SupportedLanguage } from '../types';

interface AudioPlayerWidgetProps {
  textToSpeak: string;
  language: SupportedLanguage;
  label?: string;
  autoPlay?: boolean;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({
  textToSpeak,
  language,
  label,
  autoPlay = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleStateChange = (speaking: boolean) => {
      setIsPlaying(speaking);
    };

    speechController.addListener(handleStateChange);

    if (autoPlay && textToSpeak) {
      speechController.speak(textToSpeak, language);
    }

    return () => {
      speechController.removeListener(handleStateChange);
    };
  }, [textToSpeak, language, autoPlay]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      speechController.stop();
      setIsPlaying(false);
    } else {
      speechController.speak(textToSpeak, language, () => {
        setIsPlaying(false);
      });
    }
  };

  const handleReplay = () => {
    speechController.stop();
    speechController.speak(textToSpeak, language, () => {
      setIsPlaying(false);
    });
  };

  const languageNames: Record<SupportedLanguage, string> = {
    en: 'English Indian Accented Voice',
    te: 'తెలుగు వాయిస్ మార్గదర్శకత్వం (Telugu Voice)',
    hi: 'हिंदी वॉयस मार्गदर्शन (Hindi Voice)',
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-700/80 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          id="audio-widget-play-btn"
          onClick={handleTogglePlay}
          className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
            isPlaying
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30'
          }`}
          aria-label={isPlaying ? 'Pause audio briefing' : 'Play audio briefing'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">
              {label || 'Audio Guidance Briefing'}
            </span>
            {isPlaying && (
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                Speaking...
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400">{languageNames[language]}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Animated wave bars when speaking */}
        {isPlaying ? (
          <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded-md">
            <span className="w-1 bg-amber-400 h-3 animate-bounce rounded-full" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1 bg-amber-400 h-5 animate-bounce rounded-full" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1 bg-amber-400 h-2 animate-bounce rounded-full" style={{ animationDelay: '300ms' }}></span>
            <span className="w-1 bg-amber-400 h-4 animate-bounce rounded-full" style={{ animationDelay: '75ms' }}></span>
          </div>
        ) : null}

        <button
          id="audio-widget-replay-btn"
          onClick={handleReplay}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Replay from beginning"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {isPlaying && (
          <button
            id="audio-widget-stop-btn"
            onClick={() => speechController.stop()}
            className="p-2 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Stop audio"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
