// Speech recognition utility for Hindi and English
export const initSpeechRecognition = (onResult, onError, onEnd, language = 'en-US') => {
  // Check if speech recognition is supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error('Speech recognition not supported in this browser');
    return null;
  }

  const recognition = new SpeechRecognition();
  
  // Configure recognition settings
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';
  
  // Set up event handlers
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    
    console.log('Speech recognition result:', transcript);
    onResult(transcript);
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    onError(event.error);
  };
  
  recognition.onend = () => {
    console.log('Speech recognition ended');
    onEnd();
  };
  
  return recognition;
};