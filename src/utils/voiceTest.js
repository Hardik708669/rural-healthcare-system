// Comprehensive test for Hindi voice functionality
export const testHindiVoice = () => {
  console.log('Testing Hindi voice functionality...');
  
  // Test 1: Check if speech synthesis is supported
  if ('speechSynthesis' in window) {
    console.log('✓ Speech synthesis is supported');
  } else {
    console.log('✗ Speech synthesis is not supported');
    return false;
  }
  
  // Test 2: Check if speech recognition is supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    console.log('✓ Speech recognition is supported');
  } else {
    console.log('⚠ Speech recognition is not supported (optional feature)');
  }
  
  // Test 3: Test Hindi text-to-speech
  try {
    const utterance = new SpeechSynthesisUtterance('नमस्ते, यह एक परीक्षण है');
    utterance.lang = 'hi-IN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Get available voices
    const voices = speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang.includes('hi'));
    
    if (hindiVoice) {
      utterance.voice = hindiVoice;
      console.log('✓ Found Hindi voice:', hindiVoice.name);
    } else {
      console.log('⚠ No specific Hindi voice found, using default');
    }
    
    // Test speaking
    speechSynthesis.speak(utterance);
    console.log('✓ Hindi text-to-speech test initiated');
    
    return true;
  } catch (error) {
    console.error('✗ Error in Hindi text-to-speech test:', error);
    return false;
  }
};

// Test function for English voice as well
export const testEnglishVoice = () => {
  console.log('Testing English voice functionality...');
  
  try {
    const utterance = new SpeechSynthesisUtterance('Hello, this is a test');
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Get available voices
    const voices = speechSynthesis.getVoices();
    const englishVoice = voices.find(voice => voice.lang.includes('en'));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
      console.log('✓ Found English voice:', englishVoice.name);
    } else {
      console.log('⚠ No specific English voice found, using default');
    }
    
    // Test speaking
    speechSynthesis.speak(utterance);
    console.log('✓ English text-to-speech test initiated');
    
    return true;
  } catch (error) {
    console.error('✗ Error in English text-to-speech test:', error);
    return false;
  }
};