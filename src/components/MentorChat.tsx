import React, { useState, useRef, useEffect } from 'react';
import { MentorMessage, SupportedLanguage, StoreProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { speechController, startSpeechRecognition, VoiceRecognitionSession } from '../utils/speech';
import { getSimulatedMentorReply } from '../data/simulationEngine';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  HelpCircle,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface MentorChatProps {
  currentLanguage: SupportedLanguage;
  storeProfile: StoreProfile;
  initialContext?: string;
  hasGeminiKey: boolean;
}

export const MentorChat: React.FC<MentorChatProps> = ({
  currentLanguage,
  storeProfile,
  initialContext,
  hasGeminiKey,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const getInitialGreeting = (lang: SupportedLanguage): string => {
    if (lang === 'te') {
      return `నమస్కారం! నేను మీ రిటైల్ బిజినెస్ ఎగ్జిక్యూటివ్ మెంటర్‌ని. మీ స్టోర్ (${storeProfile.storeName}) వర్కింగ్ క్యాపిటల్, సప్లయర్ క్రెడిట్ నిబంధనలు లేదా కస్టమర్ బకాయిల నిర్వహణపై ఎలాంటి ప్రశ్ననైనా అడగవచ్చు.`;
    }
    if (lang === 'hi') {
      return `नमस्कार! मैं आपका रिटेल व्यापार सलाहकार (Mentor) हूँ। आपके संस्थान (${storeProfile.storeName}) की कार्यशील पूंजी, सप्लायर क्रेडिट या उधारी वसूली से संबंधित किसी भी रणनीतिक प्रश्न के लिए मैं उपस्थित हूँ।`;
    }
    return `Welcome. I am your Executive Retail Strategist & Operations Advisor for ${storeProfile.storeName}. How can we strengthen your working capital, optimize supplier terms, or accelerate receivables today?`;
  };

  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: getInitialGreeting(currentLanguage),
      audioSummary: getInitialGreeting(currentLanguage),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedFollowUps:
        currentLanguage === 'te'
          ? ['సప్లయర్లతో 35 రోజుల క్రెడిట్ ఎలా సాధించాలి?', 'కస్టమర్ బకాయిలను గౌరవంగా వసూలు చేయడం ఎలా?']
          : currentLanguage === 'hi'
          ? ['सप्लायर से 35 दिनों की क्रेडिट अवधि कैसे लें?', 'ग्राहकों से सम्मानजनक तरीके से उधारी कैसे वसूलें?']
          : [
              'How to structure a 35-day credit proposal for FMCG distributors?',
              'Best protocol to recover 60-day customer ledger accounts?',
            ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSession, setRecordingSession] = useState<VoiceRecognitionSession | null>(null);
  const [activeSpeakingMsgId, setActiveSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isSending) return;

    const userMessage: MentorMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsSending(true);

    try {
      let assistantReplyText = '';
      let audioSummary = '';
      let suggestedFollowUps: string[] = [];

      // Try server-side Gemini API first
      const res = await fetch('/api/gemini/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          currentContext: { storeProfile, initialContext },
          language: currentLanguage,
        }),
      });

      const data = await res.json();

      if (data?.success && data?.data?.replyText) {
        assistantReplyText = data.data.replyText;
        audioSummary = data.data.audioSummary || assistantReplyText;
        suggestedFollowUps = data.data.suggestedFollowUps || [];
      } else {
        // High-precision simulation fallback
        const sim = getSimulatedMentorReply(query, currentLanguage);
        assistantReplyText = sim.replyText;
        audioSummary = sim.audioSummary;
        suggestedFollowUps = sim.suggestedFollowUps;
      }

      const assistantMessage: MentorMessage = {
        id: `msg-reply-${Date.now()}`,
        role: 'assistant',
        content: assistantReplyText,
        audioSummary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Automatically speak the brief audio summary for hands-free guidance
      if (audioSummary) {
        setActiveSpeakingMsgId(assistantMessage.id);
        speechController.speak(audioSummary, currentLanguage, () => {
          setActiveSpeakingMsgId(null);
        });
      }
    } catch (err) {
      const sim = getSimulatedMentorReply(query, currentLanguage);
      const assistantMessage: MentorMessage = {
        id: `msg-reply-${Date.now()}`,
        role: 'assistant',
        content: sim.replyText,
        audioSummary: sim.audioSummary,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: sim.suggestedFollowUps,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (activeSpeakingMsgId === msgId) {
      speechController.stop();
      setActiveSpeakingMsgId(null);
    } else {
      setActiveSpeakingMsgId(msgId);
      speechController.speak(text, currentLanguage, () => {
        setActiveSpeakingMsgId(null);
      });
    }
  };

  const handleToggleVoiceInput = () => {
    if (isRecording) {
      if (recordingSession) {
        recordingSession.stop();
      }
      setIsRecording(false);
      setRecordingSession(null);
    } else {
      setIsRecording(true);
      const session = startSpeechRecognition(
        currentLanguage,
        (transcript) => {
          setInputQuery((prev) => (prev ? `${prev} ${transcript}` : transcript));
        },
        () => {
          setIsRecording(false);
        },
        () => {
          setIsRecording(false);
          setRecordingSession(null);
        }
      );
      setRecordingSession(session);
    }
  };

  const quickPrompts: Record<SupportedLanguage, string[]> = {
    en: [
      'Negotiating 35-day credit terms with primary distributors',
      'Polite SMS script to recover overdue customer credit accounts',
      'Forming a neighborhood retail store buying consortium',
      'Minimizing perishable dairy and fresh goods shrinkage',
    ],
    te: [
      'డిస్ట్రిబ్యూటర్లతో 35 రోజుల క్రెడిట్ నిబంధనలు ఎలా మాట్లాడాలి?',
      'కస్టమర్ల పాత ఉధారీ వసూలుకు గౌరవప్రదమైన సందేశం',
      '5 ఇతర స్టోర్లతో కలిసి టోకు కొనుగోలు సిండికేట్ ఏర్పాటు',
      'డెయిరీ మరియు తాజా సరుకుల నష్టాన్ని నివారించడం',
    ],
    hi: [
      'डिस्ट्रीब्यूटर से 35 दिन की क्रेडिट साइकिल कैसे तय करें?',
      'पुरानी ग्राहक उधारी वसूली के लिए सम्मानजनक संदेश',
      'आस-पास के स्टोर्स के साथ थोक खरीद समूह कैसे बनाएं?',
      'डेयरी और बेकरी उत्पादों में होने वाला नुकसान कैसे रोकें?',
    ],
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[740px]">
      {/* Mentor Header */}
      <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">{t.mentorHeader}</h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Live Advisory
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{t.mentorSubheader}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <Sparkles className={`w-3.5 h-3.5 ${hasGeminiKey ? 'text-indigo-400' : 'text-emerald-400'}`} />
          <span>{hasGeminiKey ? 'Gemini 3.8 Advisory' : 'Smart Interactive Simulator'}</span>
        </div>
      </div>

      {/* Dialogue Stream */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/60">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          const isSpeakingThis = activeSpeakingMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isAssistant
                    ? 'bg-white border border-slate-200 text-slate-900'
                    : 'bg-emerald-700 text-white font-medium'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider">
                    {isAssistant ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span className="text-emerald-800">Retail Executive Advisor</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-emerald-200" />
                        <span className="text-emerald-100">{storeProfile.storeName} Merchant</span>
                      </>
                    )}
                  </div>
                  <span className={`text-[10px] ${isAssistant ? 'text-slate-400' : 'text-emerald-200'}`}>
                    {msg.timestamp}
                  </span>
                </div>

                <div className="whitespace-pre-line leading-relaxed font-normal">
                  {msg.content}
                </div>

                {/* Audio Playback button for assistant replies */}
                {isAssistant && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <button
                      id={`speak-msg-${msg.id}`}
                      type="button"
                      onClick={() => handleSpeakMessage(msg.id, msg.audioSummary || msg.content)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                        isSpeakingThis
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isSpeakingThis ? 'animate-bounce text-amber-700' : 'text-slate-600'}`} />
                      <span>{isSpeakingThis ? 'Pause Voice Guidance' : 'Play Voice Advice'}</span>
                    </button>

                    <span className="text-[10px] text-slate-400">
                      {currentLanguage.toUpperCase()} Audio Supported
                    </span>
                  </div>
                )}
              </div>

              {/* Suggested Follow-Ups */}
              {isAssistant && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 max-w-2xl">
                  {msg.suggestedFollowUps.map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      id={`follow-up-${cIdx}`}
                      type="button"
                      onClick={() => handleSendMessage(chip)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer shadow-2xs"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white p-3 rounded-xl border border-slate-200 w-fit">
            <span className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></span>
            <span>Advisor is formulating strategic counsel...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
          {t.quickQuestionsTitle}:
        </span>
        {quickPrompts[currentLanguage].map((prompt, pIdx) => (
          <button
            key={pIdx}
            id={`quick-prompt-${pIdx}`}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 whitespace-nowrap transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Mic Button */}
          <button
            id="chat-mic-btn"
            type="button"
            onClick={handleToggleVoiceInput}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-900/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
            title="Voice query in English, Telugu, or Hindi"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-700" />}
          </button>

          <input
            id="chat-query-input"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t.mentorInputPlaceholder}
            disabled={isSending}
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
          />

          <button
            id="chat-send-btn"
            type="submit"
            disabled={isSending || !inputQuery.trim()}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              isSending || !inputQuery.trim()
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-600 active:scale-[0.99]'
            }`}
          >
            <span>{t.sendBtn}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
