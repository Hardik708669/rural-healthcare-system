// Test script for speech recognition functionality
export const testSpeechRecognition = () => {
  // Check if speech recognition is supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.log('Speech recognition not supported in this browser');
    return false;
  }

  console.log('Speech recognition is supported');
  
  // Test creating a recognition instance
  try {
    const recognition = new SpeechRecognition();
    console.log('Successfully created speech recognition instance');
    
    // Test setting language
    recognition.lang = 'hi-IN';
    console.log('Set language to Hindi (hi-IN)');
    
    recognition.lang = 'en-US';
    console.log('Set language to English (en-US)');
    
    return true;
  } catch (error) {
    console.error('Error creating speech recognition instance:', error);
    return false;
  }
};