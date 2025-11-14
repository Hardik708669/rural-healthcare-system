import React, { useState, useEffect, useRef } from 'react';
import { Brain, Mic, Camera, MessageSquare, FileText, AlertTriangle, Heart, Thermometer, Stethoscope, Square } from 'lucide-react';
import { theme } from '../theme';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { initSpeechRecognition } from '../utils/speechRecognition';

export default function SymptomChecker() {
  const { language } = useLanguage();
  const [symptomsInput, setSymptomsInput] = useState('');
  const [severity, setSeverity] = useState('mild');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    const speechRecognition = initSpeechRecognition(
      (transcript) => {
        setSymptomsInput(prev => prev + (prev ? ' ' : '') + transcript);
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

  // Toggle voice recognition
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

  // Function to send symptoms to backend
  const sendSymptoms = async () => {
    if (!symptomsInput.trim()) {
      alert(language === 'hi' 
        ? 'कृपया अपने लक्षण दर्ज करें' 
        : 'Please enter your symptoms');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const res = await fetch('http://localhost:4000/api/symptoms/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: symptomsInput,
          severity: severity
        })
      });
      
      const data = await res.json();
      setAnalysisResult(data);
      console.log(data);
    } catch (error) {
      console.error('Error sending symptoms:', error);
      alert(language === 'hi' 
        ? 'लक्षणों का विश्लेषण करने में त्रुटि। कृपया पुनः प्रयास करें।' 
        : 'Error analyzing symptoms. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          {translations[language].aiSymptomChecker}
        </h1>
        <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          {translations[language].describeSymptoms}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Symptom Input Methods */}
        <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
          <h2 className="text-2xl font-bold text-white mb-6">{translations[language].describeSymptoms}</h2>
          
          <div className="space-y-4">
            {[
              { 
                icon: MessageSquare, 
                title: translations[language].textInput, 
                desc: translations[language].typeSymptoms,
                color: 'from-teal-500 to-green-600'
              },
              { 
                icon: isListening ? Square : Mic, 
                title: isListening ? (language === 'hi' ? 'रोकें' : 'Stop') : translations[language].voiceInput, 
                desc: isListening ? (language === 'hi' ? 'बोलना बंद करें' : 'Stop speaking') : translations[language].speakSymptoms,
                color: isListening ? 'from-red-500 to-orange-600' : 'from-purple-500 to-indigo-600',
                action: toggleVoiceRecognition
              },
              { 
                icon: Camera, 
                title: translations[language].imageUpload, 
                desc: translations[language].uploadPhotos,
                color: 'from-blue-500 to-cyan-600'
              },
              { 
                icon: FileText, 
                title: translations[language].chatInterface, 
                desc: translations[language].chatWithAI,
                color: 'from-pink-500 to-rose-600'
              }
            ].map((method, i) => (
              <button 
                key={i} 
                onClick={method.action ? method.action : null}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100} ${method.action ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{method.title}</div>
                  <div className="text-gray-400 text-sm">{method.desc}</div>
                </div>
                {isListening && method.title === (language === 'hi' ? 'रोकें' : 'Stop') && (
                  <div className="ml-auto">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Text Input Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">{translations[language].describeSymptoms}</h3>
            <textarea
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              placeholder={translations[language].typeSymptoms}
              className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            
            <div className="mt-4">
              <label className="text-white font-medium mb-2 block">{translations[language].severity}</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="mild">{translations[language].mild}</option>
                <option value="moderate">{translations[language].moderate}</option>
                <option value="severe">{translations[language].severe}</option>
              </select>
            </div>
            
            <button
              onClick={sendSymptoms}
              disabled={isAnalyzing}
              className={`${theme.button.primary} w-full mt-4 py-3 ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {translations[language].analyzing}
                </span>
              ) : (
                translations[language].analyzeSymptoms
              )}
            </button>
          </div>
        </div>
        
        {/* Right Column - AI Analysis Preview */}
        <div className="space-y-6">
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <h2 className="text-2xl font-bold text-white mb-4">{translations[language].aiAnalysis}</h2>
            
            <div className="bg-white/5 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Brain className="w-8 h-8 text-purple mt-1" />
                <div>
                  <div className="font-semibold text-white mb-2">{translations[language].aiAnalysis}</div>
                  <div className="text-gray-300 text-sm">
                    {analysisResult ? (
                      <div>
                        <p>{analysisResult.analysis || translations[language].basedOnSymptoms}</p>
                        {analysisResult.recommendations && (
                          <div className="mt-2">
                            <strong>{translations[language].recommendations}:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {analysisResult.recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      translations[language].basedOnSymptoms
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple/20 border border-purple/30 rounded-xl p-3">
                <div className="text-purple font-medium">{translations[language].urgency}</div>
                <div className="text-white">
                  {analysisResult?.urgency || "Medium"}
                </div>
              </div>
              <div className="bg-teal/20 border border-teal/30 rounded-xl p-3">
                <div className="text-teal font-medium">{translations[language].confidence}</div>
                <div className="text-white">
                  {analysisResult?.confidence ? `${analysisResult.confidence}%` : "85%"}
                </div>
              </div>
            </div>
          </div>
          
          {/* Emergency Detection */}
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-bold text-white">{translations[language].emergencyDetection}</h2>
            </div>
            <p className="text-gray-300 mb-4">
              {translations[language].ourAISystem}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                translations[language].chestPain,
                translations[language].difficultyBreathing,
                translations[language].severeBleeding,
                translations[language].highFever,
                translations[language].lossOfConsciousness,
                translations[language].severeHeadache
              ].map((symptom, i) => (
                <div 
                  key={i} 
                  className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center text-sm"
                >
                  <div className="text-red-300 font-medium">{symptom}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Common Symptoms Section */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-12`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">{translations[language].commonSymptoms}</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          {translations[language].selectCommonSymptoms}
        </p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: Thermometer, symptom: translations[language].fever },
            { icon: Heart, symptom: translations[language].chestPain },
            { icon: Stethoscope, symptom: translations[language].cough },
            { icon: AlertTriangle, symptom: translations[language].headache },
            { icon: Brain, symptom: translations[language].dizziness },
            { icon: Heart, symptom: translations[language].fatigue }
          ].map((item, i) => (
            <button 
              key={i} 
              className={`flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <item.icon className="w-8 h-8 text-primary mb-2" />
              <span className="text-gray-300 text-sm">{item.symptom}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Health Tips Section */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-8`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">{translations[language].healthTips}</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          {translations[language].generalHealthAdvice}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: translations[language].stayHydrated,
              desc: translations[language].drinkWater,
              icon: Thermometer
            },
            {
              title: translations[language].balancedDiet,
              desc: translations[language].includeFruits,
              icon: Heart
            },
            {
              title: translations[language].regularExercise,
              desc: translations[language].engagePhysical,
              icon: Stethoscope
            }
          ].map((tip, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <tip.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{tip.title}</h3>
              <p className="text-gray-300">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}