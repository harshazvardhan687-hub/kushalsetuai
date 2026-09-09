import { SupportedLanguage } from '../types';

class SpeechController {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private onStateChangeListeners: Array<(isSpeaking: boolean) => void> = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public addListener(listener: (isSpeaking: boolean) => void) {
    this.onStateChangeListeners.push(listener);
  }

  public removeListener(listener: (isSpeaking: boolean) => void) {
    this.onStateChangeListeners = this.onStateChangeListeners.filter((l) => l !== listener);
  }

  private notify(speaking: boolean) {
    this.isSpeaking = speaking;
    this.onStateChangeListeners.forEach((fn) => fn(speaking));
  }

  public speak(text: string, language: SupportedLanguage, onEnd?: () => void) {
    if (!this.synth) {
      console.warn('Speech synthesis not available in this environment.');
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Language selection
    if (language === 'te') {
      utterance.lang = 'te-IN';
      utterance.rate = 0.95;
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
    } else {
      utterance.lang = 'en-IN';
      utterance.rate = 1.0;
    }

    // Try to pick appropriate regional voice if available
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find((v) => {
      if (language === 'te') return v.lang.startsWith('te');
      if (language === 'hi') return v.lang.startsWith('hi');
      return v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en');
    });

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.notify(true);
    };

    utterance.onend = () => {
      this.notify(false);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error/interruption:', e);
      this.notify(false);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
      this.currentUtterance = null;
    }
  }

  public getSpeakingState(): boolean {
    return this.isSpeaking;
  }
}

export const speechController = new SpeechController();

// Voice Recognition (Speech-to-Text)
export interface VoiceRecognitionSession {
  stop: () => void;
}

export function startSpeechRecognition(
  language: SupportedLanguage,
  onResult: (transcript: string) => void,
  onError: (errorMsg: string) => void,
  onEnd: () => void
): VoiceRecognitionSession {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('Browser speech recognition API not supported. Using simulation fallback.');
    // Simulated speech fallback
    const simulatedTexts: Record<SupportedLanguage, string> = {
      en: 'Our general retail store needs to negotiate 35-day credit terms with FMCG distributors and recover ₹1,80,000 in customer credit ledgers.',
      te: 'మా జనరల్ స్టోర్‌లో సప్లయర్ క్రెడిట్ గడువును 30 రోజులకు పెంచాలి మరియు నిలిచిపోయిన స్టాక్‌ను త్వరగా నగదుగా మార్చాలి.',
      hi: 'हमारे जनरल स्टोर में सप्लायर से 35 दिनों की क्रेडिट अवधि लेनी है और पुरानी उधारी को डिजिटल तरीके से सुलझाना है।',
    };
    setTimeout(() => {
      onResult(simulatedTexts[language]);
      onEnd();
    }, 1500);

    return {
      stop: () => {},
    };
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;

    if (language === 'te') {
      recognition.lang = 'te-IN';
    } else if (language === 'hi') {
      recognition.lang = 'hi-IN';
    } else {
      recognition.lang = 'en-IN';
    }

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        onResult(finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      onError(`Speech recognition note: ${event.error || 'Speech not detected'}`);
    };

    recognition.onend = () => {
      onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {}
      },
    };
  } catch (err: any) {
    onError('Speech recognition initialization error.');
    onEnd();
    return {
      stop: () => {},
    };
  }
}
