import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Heart, Stethoscope, Brain, Volume2, Mic } from 'lucide-react';
import { theme } from '../theme';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { initSpeechRecognition } from '../utils/speechRecognition';

const ChatbotWidget = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: translations[language].helloMessage, 
      isBot: true,
      avatar: <Bot className="w-5 h-5" />
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const utteranceRef = useRef(null);
  const recognitionRef = useRef(null);
  const hasSpokenInitialGreeting = useRef(false);

  // Reset initial greeting flag when language changes
  useEffect(() => {
    hasSpokenInitialGreeting.current = false;
    setMessages([
      { 
        id: 1, 
        text: translations[language].helloMessage, 
        isBot: true,
        avatar: <Bot className="w-5 h-5" />
      }
    ]);
  }, [language]);

  // Initialize speech recognition
  useEffect(() => {
    const speechRecognition = initSpeechRecognition(
      (transcript) => {
        setInputValue(transcript);
        setIsListening(false);
      },
      (error) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
        alert(language === 'hi' 
          ? `आवाज पहचान त्रुटि: ${error}` 
          : `Speech recognition error: ${error}`);
      },
      () => {
        setIsListening(false);
      },
      language
    );
    
    if (speechRecognition) {
      recognitionRef.current = speechRecognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      console.log('Available voices:', availableVoices);
    };

    // Load voices immediately if they're already available
    if (speechSynthesis.getVoices().length > 0) {
      loadVoices();
    } else {
      // Wait for voices to be loaded
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      speechSynthesis.onvoiceschanged = null;
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // Speak initial greeting when chat opens and voices are loaded
  useEffect(() => {
    if (isOpen && voices.length > 0 && !hasSpokenInitialGreeting.current && messages.length === 1) {
      speakText(messages[0].text);
      hasSpokenInitialGreeting.current = true;
    }
  }, [isOpen, voices, messages]);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      // Create new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Try to get a specific voice for better quality
      if (voices.length > 0) {
        let selectedVoice = null;
        if (language === 'hi') {
          // Look for Hindi voice
          selectedVoice = voices.find(voice => voice.lang.includes('hi')) || 
                         voices.find(voice => voice.lang.includes('HI')) ||
                         voices.find(voice => voice.lang.includes('Hindi'));
        } else {
          // Look for English voice
          selectedVoice = voices.find(voice => voice.lang.includes('en')) ||
                         voices.find(voice => voice.lang.includes('EN')) ||
                         voices.find(voice => voice.lang.includes('English'));
        }
        
        if (selectedVoice) {
          utterance.voice = selectedVoice;
          console.log('Selected voice:', selectedVoice);
        } else {
          console.log('No specific voice found, using default');
        }
      }
      
      // Set ref for cleanup
      utteranceRef.current = utterance;
      
      // Handle speech events
      utterance.onstart = () => {
        console.log('Speech started');
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        console.log('Speech ended');
        setIsSpeaking(false);
      };
      utterance.onerror = (event) => {
        console.error('Speech error:', event);
        setIsSpeaking(false);
      };
      
      // Speak
      console.log('Speaking text:', text);
      speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not supported in this browser');
      alert('Text-to-speech is not supported in your browser. Please try Chrome, Firefox, or Edge.');
    }
  };

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      alert(language === 'hi' 
        ? 'आपके ब्राउज़र में आवाज पहचान समर्थित नहीं है। कृपया Chrome या Edge का उपयोग करें।' 
        : 'Speech recognition is not supported in your browser. Please try Chrome or Edge.');
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert(language === 'hi' 
          ? 'आवाज पहचान प्रारंभ करने में त्रुटि। कृपया पुनः प्रयास करें।' 
          : 'Error starting voice recognition. Please try again.');
      }
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = { 
      id: messages.length + 1, 
      text: inputValue, 
      isBot: false,
      avatar: <User className="w-5 h-5" />
    };
    setMessages([...messages, userMessage]);
    
    // Clear input
    setInputValue('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const responses = [
        translations[language].response1,
        translations[language].response2,
        translations[language].response3,
        translations[language].response4
      ];
      
      const botMessage = { 
        id: messages.length + 2, 
        text: responses[Math.floor(Math.random() * responses.length)], 
        isBot: true,
        avatar: <Bot className="w-5 h-5" />
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Speak the bot response
      speakText(botMessage.text);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickActions = [
    { text: translations[language].checkSymptoms, icon: <Stethoscope className="w-4 h-4" /> },
    { text: translations[language].findNearbyClinic, icon: <Heart className="w-4 h-4" /> },
    { text: translations[language].medicationInfo, icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <>
      {isOpen ? (
        <div className={`${theme.glass.heavy} shadow-2xl z-50 fixed bottom-24 right-6 w-80 h-96 rounded-2xl flex flex-col ${theme.animation.fadeInUp} transform transition-all duration-300`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-white">{translations[language].healthAssistant}</span>
                <div className="text-xs text-green-400">{translations[language].online}</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 transform transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'} transform transition-all duration-300`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
                    {message.avatar}
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.isBot 
                      ? 'bg-white/10 text-white rounded-tl-none' 
                      : 'bg-primary text-white rounded-tr-none'
                  } transform transition-all duration-300 hover:shadow-lg relative`}
                >
                  {message.text}
                  {message.isBot && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(message.text);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-600 transition-colors active:scale-95"
                      disabled={isSpeaking}
                      title={isSpeaking ? "Speaking..." : "Speak message"}
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
                    {message.avatar}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="px-4 py-2 border-y border-white/10">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs text-gray-300 whitespace-nowrap transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  {action.icon}
                  {action.text}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={translations[language].typeYourMessage}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
              />
              <button 
                onClick={toggleVoiceRecognition}
                className={`${isListening ? 'bg-red-500 hover:bg-red-600' : theme.button.secondary} p-2 rounded-lg transform transition-all duration-300 hover:scale-110 active:scale-95`}
                title={isListening ? (language === 'hi' ? 'रोकें' : 'Stop') : (language === 'hi' ? 'बोलें' : 'Speak')}
              >
                <Mic className={`w-4 h-4 ${isListening ? 'text-white animate-pulse' : 'text-white'}`} />
              </button>
              <button 
                onClick={handleSend}
                className={`${theme.button.primary} p-2 rounded-lg transform transition-all duration-300 hover:scale-110 active:scale-95`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {isListening && (
              <div className="mt-2 text-center">
                <div className="inline-flex items-center text-sm text-gray-300">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  {language === 'hi' ? 'सुन रहे हैं... बोलना बंद करें' : 'Listening... Stop speaking'}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      
      {/* Simplified chatbot button with explicit visibility */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-green-600 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-60"
        style={{ 
          animation: 'float 3s ease-in-out infinite',
          display: 'block'
        }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>
    </>
  );
};

export default ChatbotWidget;