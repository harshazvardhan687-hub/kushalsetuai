import React, { useState, useRef, useEffect } from 'react';
import { Mission, MentorStepGuide, MentorChatMessage, StudentProfile, SupportedLanguage } from '../types';
import {
  Sparkles,
  ArrowRight,
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  Lock,
  ExternalLink,
  Code2,
  Clock,
  BookOpen,
} from 'lucide-react';
import { speechController, startSpeechRecognition } from '../utils/speech';

interface Step5Props {
  mission: Mission;
  student: StudentProfile;
  stepGuides: MentorStepGuide[];
  chatMessages: MentorChatMessage[];
  onSendMessage: (msgText: string) => Promise<void>;
  isSending: boolean;
  onProceedToSolution: () => void;
  onBackToMatching: () => void;
  language: SupportedLanguage;
}

export const Step5AdaptiveAIMentor: React.FC<Step5Props> = ({
  mission,
  student,
  stepGuides,
  chatMessages,
  onSendMessage,
  isSending,
  onProceedToSolution,
  onBackToMatching,
  language,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;
    setInputText('');
    await onSendMessage(text);
  };

  const handleToggleVoice = () => {
    if (isRecording) {
      speechController.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      startSpeechRecognition(
        language,
        (transcript) => {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        },
        () => setIsRecording(false),
        () => setIsRecording(false)
      );
    }
  };

  const handleSpeak = (msgId: string, text: string) => {
    if (activeSpeakingId === msgId) {
      speechController.stop();
      setActiveSpeakingId(null);
    } else {
      setActiveSpeakingId(msgId);
      speechController.speak(text, language, () => {
        setActiveSpeakingId(null);
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Title Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Module 5 of 12
            </span>
            <span className="text-xs text-slate-400 font-medium">Student Mission Workspace</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">5. Adaptive AI Mentor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step guidance, spreadsheet formula help, and bilingual Telugu/English support for student {student.name}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200">
            Student: <strong>{student.name}</strong> (MVGR Vizianagaram)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Step Roadmap */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-600" />
                Mission Roadmap
              </h3>
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">
                Step 3 of 5
              </span>
            </div>

            <div className="space-y-3">
              {stepGuides.map((guide) => {
                const isDone = guide.status === 'completed';
                const isCurrent = guide.status === 'current';
                const isLocked = guide.status === 'locked';

                return (
                  <div
                    key={guide.stepId}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-cyan-50/80 border-cyan-400 shadow-xs ring-1 ring-cyan-300'
                        : isDone
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-slate-50/40 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-cyan-500 text-slate-950'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {isDone ? '✓' : isLocked ? <Lock className="w-2.5 h-2.5" /> : guide.stepId}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">{guide.title}</h4>
                          <span
                            className={`text-[10px] font-bold uppercase ${
                              isDone
                                ? 'text-emerald-700'
                                : isCurrent
                                ? 'text-cyan-700'
                                : 'text-slate-400'
                            }`}
                          >
                            {isDone ? 'Done' : isCurrent ? 'Active' : 'Locked'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          {guide.instruction}
                        </p>

                        {isCurrent && guide.template_snippet && (
                          <div className="mt-2 p-2 bg-slate-900 text-cyan-300 font-mono text-[10px] rounded-lg">
                            {guide.template_snippet}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive AI Mentor Chat */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col h-[640px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ask KaushalSetu AI Mentor</h3>
                <p className="text-[11px] text-slate-400">
                  Guiding Ravi Kumar on Sri Lakshmi Kirana Inventory
                </p>
              </div>
            </div>

            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
              Telugu & English Ready
            </span>
          </div>

          {/* Dialogue Feed */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50">
            {chatMessages.map((msg) => {
              const isMentor = msg.sender === 'mentor';
              const isSpeaking = activeSpeakingId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMentor ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMentor
                        ? 'bg-white border border-slate-200 text-slate-900'
                        : 'bg-cyan-600 text-white font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {isMentor ? 'KaushalSetu Mentor' : 'Ravi Kumar'}
                      </span>
                      <span className="text-[10px] opacity-70">{msg.timestamp}</span>
                    </div>

                    <p className="whitespace-pre-line leading-relaxed">{msg.message}</p>

                    {msg.telugu_message && (
                      <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-700 bg-cyan-50/60 p-2 rounded-lg leading-relaxed">
                        <strong className="text-cyan-800 font-bold block mb-0.5">తెలుగు:</strong>
                        {msg.telugu_message}
                      </div>
                    )}

                    {msg.codeSnippet && (
                      <div className="mt-2 p-2 bg-slate-900 text-cyan-300 font-mono text-[11px] rounded-lg overflow-x-auto">
                        <pre>{msg.codeSnippet}</pre>
                      </div>
                    )}

                    {isMentor && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleSpeak(msg.id, msg.audioText || msg.message)}
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                            isSpeaking
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <Volume2 className={`w-3 h-3 ${isSpeaking ? 'animate-bounce text-amber-700' : ''}`} />
                          <span>{isSpeaking ? 'Stop Audio' : 'Listen Voice'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-500 w-fit">
                <span className="w-3.5 h-3.5 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></span>
                <span>Mentor is formulating advice...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-slate-100 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
            {[
              'How to structure 4 FMCG categories?',
              'Formula for 3-day buffer alert',
              'తెలుగులో షీట్ ప్రింట్ చేయడం ఎలా?',
            ].map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(qp)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 border border-slate-200 whitespace-nowrap cursor-pointer transition-colors"
              >
                + {qp}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
              title="Voice Query (Telugu / English)"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-cyan-700" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask mentor a formula question or debugging help..."
              className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={isSending || !inputText.trim()}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Action to proceed to Solution Submission */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200">
        <button
          type="button"
          onClick={onBackToMatching}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          ← Back to Growth Matching
        </button>

        <button
          id="proceed-to-solution-btn"
          type="button"
          onClick={onProceedToSolution}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Complete Mission & Submit Solution</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
