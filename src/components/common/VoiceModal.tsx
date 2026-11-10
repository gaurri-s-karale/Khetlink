import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, Volume2, X, Sparkles, Send } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({ isOpen, onClose }) => {
  const { language, t } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [botResponse, setBotResponse] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Preset regional queries
  const samplePrompts = {
    en: [
      { q: "What is today's Tomato price in Pune Mandi?", a: "Today's Tomato modal price in Pune Mandi is ₹2,850 per quintal, showing an upward surge of +8.4%." },
      { q: "Should I sell or hold my Onion harvest?", a: "Price AI recommends HOLD FOR 4–5 DAYS. Mandi buffer drawdowns are steady and expected price is ₹2,550–₹2,620/q." },
      { q: "Who are the highest-rated buyers in Pune district?", a: "FreshMart Foods is currently the top-rated buyer in Pune with a 4.8/5 rating and 98% on-time payment track record." }
    ],
    hi: [
      { q: "आज पुणे मंडी में टमाटर का भाव क्या है?", a: "आज पुणे मंडी (गुलटेकड़ी) में टमाटर का मॉडल भाव ₹2,850 प्रति क्विंटल है, जिसमें +8.4% की बढ़त देखी गई है।" },
      { q: "क्या मुझे अपना प्याज अभी बेचना चाहिए या रोकना चाहिए?", a: "प्राइस AI का सुझाव है: 4-5 दिन रोककर रखें। भाव ₹2,550 से ₹2,620 प्रति क्विंटल तक पहुंचने का अनुमान है।" },
      { q: "पुणे के सबसे विश्वसनीय खरीदार कौन हैं?", a: "फ्रेशमार्ट फूड्स 4.8 रेटिंग और 98% समय पर भुगतान रिकॉर्ड के साथ सबसे भरोसेमंद खरीदार हैं।" }
    ],
    mr: [
      { q: "आज पुणे मंडईमध्ये टोमॅटोचा भाव किती आहे?", a: "आज पुणे मंडईमध्ये टोमॅटोचा सरासरी भाव ₹2,850 प्रति क्विंटल असून बाजारामध्ये +8.4% ची तेजी आहे." },
      { q: "कांदा आत्ता विकावा की काही दिवस थांबावे?", a: "किंमत AI चा सल्ला आहे: 4-5 दिवस थांबावे. अपेक्षित भाव ₹2,550 ते ₹2,620 प्रति क्विंटल जाण्याची शक्यता आहे." },
      { q: "पुण्यातील सर्वोत्तम खरेदीदार कोण आहेत?", a: "फ्रेशमार्ट फूड्स 4.8 स्टार रेटिंग आणि 98% वेळेवर पैसे देण्याच्या नोंदीसह अव्वल खरेदीदार आहेत." }
    ]
  };

  const currentSamples = samplePrompts[language] || samplePrompts.en;

  const handleRunQuery = (question: string, answer: string) => {
    setUserQuery(question);
    setBotResponse(answer);

    // If browser speech synthesis is supported, speak the response
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(answer);

        // Pick best matching native regional voice
        const availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
        let selectedVoice: SpeechSynthesisVoice | undefined;

        if (language === 'mr') {
          // 1. Try native Marathi voice
          selectedVoice = availableVoices.find((v: SpeechSynthesisVoice) =>
            v.lang.toLowerCase().replace('_', '-').includes('mr') ||
            v.name.toLowerCase().includes('marathi')
          );
          // 2. Fallback to Hindi voice (both share Devanagari phonetics)
          if (!selectedVoice) {
            selectedVoice = availableVoices.find((v: SpeechSynthesisVoice) =>
              v.lang.toLowerCase().replace('_', '-').includes('hi') ||
              v.name.toLowerCase().includes('hindi')
            );
          }
          utterance.lang = selectedVoice ? selectedVoice.lang : 'mr-IN';
        } else if (language === 'hi') {
          // Find Hindi voice
          selectedVoice = availableVoices.find((v: SpeechSynthesisVoice) =>
            v.lang.toLowerCase().replace('_', '-').includes('hi') ||
            v.name.toLowerCase().includes('hindi')
          );
          utterance.lang = selectedVoice ? selectedVoice.lang : 'hi-IN';
        } else {
          // Indian English or generic English
          selectedVoice = availableVoices.find((v: SpeechSynthesisVoice) =>
            v.lang === 'en-IN' ||
            v.name.toLowerCase().includes('india')
          ) || availableVoices.find((v: SpeechSynthesisVoice) => v.lang.startsWith('en'));
          utterance.lang = selectedVoice ? selectedVoice.lang : 'en-IN';
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        utterance.rate = 0.92;
        utterance.pitch = 1.0;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsSpeaking(false);
      }
    }
  };

  const toggleMicListening = () => {
    // Attempt Web Speech Recognition if available
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;

    if (SpeechRecognition && !isListening) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition = new (SpeechRecognition as any)();
        recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          // Match or provide relevant response
          const sample = currentSamples[0];
          handleRunQuery(transcript, sample.a);
        };
        recognition.onerror = () => {
          setIsListening(false);
          // Fallback to sample 0
          const sample = currentSamples[0];
          handleRunQuery(sample.q, sample.a);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
        return;
      } catch {
        // Ignore fallback
      }
    }

    // If already listening or no browser API, simulate voice query
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const randomSample = currentSamples[Math.floor(Math.random() * currentSamples.length)];
        handleRunQuery(randomSample.q, randomSample.a);
      }, 1500);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (!isOpen) {
      stopSpeaking();
      setUserQuery('');
      setBotResponse(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-lg border border-gov-border shadow-gov-lg max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gov-primary px-5 py-3.5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded bg-gov-secondary">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Ask KhetLink (Voice Assistant)</h3>
              <p className="text-[11px] text-gov-lightBlue/80">Regional voice & speech interface for rural farmers</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Animated Listening Visualizer */}
          <div className="bg-gov-bg border border-gov-border rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <button
              id="voice-mic-trigger"
              onClick={toggleMicListening}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-md ${
                isListening
                  ? 'bg-red-500 text-white ring-4 ring-red-200 animate-pulse'
                  : 'bg-gov-primary text-white hover:bg-gov-secondary'
              }`}
            >
              {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
            <p className="text-xs font-semibold text-gov-primary mt-3">
              {isListening ? 'Listening... Speak your question' : 'Tap microphone to speak'}
            </p>
            <p className="text-[11px] text-gov-muted mt-0.5">
              Available in English, हिंदी, and मराठी
            </p>
          </div>

          {/* Current Query & Response Box */}
          {(userQuery || botResponse) && (
            <div className="space-y-2 border border-gov-border rounded-lg p-3.5 bg-gov-lightBlue/20">
              {userQuery && (
                <div className="flex items-start space-x-2">
                  <span className="text-[11px] font-bold text-gov-muted uppercase mt-0.5">You:</span>
                  <p className="text-xs font-semibold text-gov-text">{userQuery}</p>
                </div>
              )}
              {botResponse && (
                <div className="flex items-start space-x-2 pt-2 border-t border-gov-border/60">
                  <Sparkles className="w-4 h-4 text-gov-agri flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gov-primary font-medium leading-relaxed">{botResponse}</p>
                    {isSpeaking && (
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="flex items-center space-x-1 text-[11px] text-gov-agri font-medium">
                          <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                          <span>Reading out aloud...</span>
                        </span>
                        <button
                          onClick={stopSpeaking}
                          className="text-[10px] text-gov-muted hover:underline"
                        >
                          Stop Audio
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Click Prompts */}
          <div>
            <div className="text-[11px] font-bold text-gov-muted uppercase tracking-wider mb-2">
              Try Common Voice Queries:
            </div>
            <div className="space-y-1.5">
              {currentSamples.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunQuery(sample.q, sample.a)}
                  className="w-full text-left px-3 py-2 rounded bg-white hover:bg-gov-lightBlue text-xs text-gov-text border border-gov-border flex items-center justify-between transition group"
                >
                  <span className="font-medium text-gov-primary group-hover:underline truncate pr-2">
                    "{sample.q}"
                  </span>
                  <Send className="w-3 h-3 text-gov-muted group-hover:text-gov-secondary flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gov-bg px-5 py-3 border-t border-gov-border flex items-center justify-between text-[11px] text-gov-muted">
          <span>Web Speech Engine</span>
          <button onClick={onClose} className="px-3 py-1 rounded bg-gov-border text-gov-text hover:bg-slate-300 font-medium text-xs">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
