import React, { useState } from 'react';
import { Camera, Mic } from 'lucide-react';
import { theme } from '../theme';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const AIAssistant = () => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    // This would integrate with speech recognition functionality
    alert(language === 'hi' 
      ? 'आवाज पहचान सुविधा यहाँ जल्द ही उपलब्ध होगी' 
      : 'Voice recognition feature coming soon here');
  };

  return (
    <div className="min-h-screen px-16 pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-7xl font-light text-white mb-4">
          Capabilities
        </h1>
        <p className="text-white/60 text-xl mb-16">
          / What we see and recommend
        </p>
        
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="border-b border-white/20 pb-8">
              <div className="text-white/40 text-sm mb-2">01</div>
              <h3 className="text-3xl font-light text-white mb-4">Vision Check</h3>
              <p className="text-white/70 mb-6">
                Capture Image for wound/skin analysis using advanced AI diagnostics
              </p>
              <button className={`${theme.button.secondary} flex items-center space-x-2`}>
                <Camera className="h-5 w-5" />
                <span>Capture Image</span>
              </button>
            </div>
            
            <div className="border-b border-white/20 pb-8">
              <div className="text-white/40 text-sm mb-2">03</div>
              <h3 className="text-3xl font-light text-white mb-4">
                {language === 'hi' ? 'आवाज सहायक' : 'Voice Assistant'}
              </h3>
              <p className="text-white/70 mb-6">
                {language === 'hi' 
                  ? 'हिंदी, तेलुगु, तमिल में बहुभाषी आवाज समर्थन ग्रामीण पहुंच के लिए' 
                  : 'Multilingual voice support in Hindi, Telugu, Tamil for rural accessibility'}
              </p>
              <button 
                onClick={handleVoiceInput}
                className={`${theme.button.secondary} flex items-center space-x-2 ${isListening ? 'animate-pulse' : ''}`}
              >
                <Mic className="h-5 w-5" />
                <span>
                  {isListening 
                    ? (language === 'hi' ? 'रोकें' : 'Stop') 
                    : (language === 'hi' ? 'आवाज चैट प्रारंभ करें' : 'Start Voice Chat')}
                </span>
                {isListening && (
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="border-b border-white/20 pb-8">
              <div className="text-white/40 text-sm mb-2">02</div>
              <h3 className="text-3xl font-light text-white mb-4">Symptom Check</h3>
              <p className="text-white/70 mb-6">
                AI-powered triage with emergency detection and care recommendations
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['Fever', 'Cough', 'Headache', 'Chest Pain'].map(symptom => (
                  <button
                    key={symptom}
                    className="p-3 bg-white/10 backdrop-blur border border-white/20 rounded text-white text-sm hover:bg-white/20 transition-all"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-b border-white/20 pb-8">
              <div className="text-white/40 text-sm mb-2">04</div>
              <h3 className="text-3xl font-light text-white mb-4">Risk Assessment</h3>
              <p className="text-white/70 mb-6">
                Real-time health risk evaluation with emergency protocol activation
              </p>
              <div className="bg-white/5 backdrop-blur border border-white/20 rounded-lg p-6">
                <div className="text-4xl font-light text-white mb-2">03</div>
                <div className="text-white/60 text-sm">High Risk<br />Immediate attention required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;