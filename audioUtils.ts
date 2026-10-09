/**
 * Web Speech API helper for natural Spanish pronunciation (es-ES)
 */
export function playSpanishTTS(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }

  try {
    window.speechSynthesis.cancel();
    // Clean text of speaker markers
    const cleanText = text
      .replace(/^[—–\-]\s*/, '')
      .replace(/[«»]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.93; // Natural conversational rate
    utterance.pitch = 1.0;

    // Try finding an es-ES voice if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(
      (v) => v.lang.startsWith('es-ES') || v.lang.startsWith('es')
    );
    if (esVoice) {
      utterance.voice = esVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('TTS error:', err);
    if (onEnd) onEnd();
  }
}
