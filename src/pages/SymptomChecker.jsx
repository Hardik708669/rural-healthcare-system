import React, { useState } from 'react';
import { Brain, Mic, Camera, MessageSquare, FileText, AlertTriangle, Heart, Thermometer, Stethoscope } from 'lucide-react';
import { theme } from '../theme';

export default function SymptomChecker() {
  const [symptomsInput, setSymptomsInput] = useState('');
  const [severity, setSeverity] = useState('mild');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Function to send symptoms to backend
  const sendSymptoms = async () => {
    if (!symptomsInput.trim()) {
      alert('Please enter your symptoms');
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
      alert('Error analyzing symptoms. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          AI Symptom Checker
        </h1>
        <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          Describe your symptoms and get instant AI-powered health insights. Our advanced algorithm 
          analyzes your input to provide accurate health assessments and recommendations.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Symptom Input Methods */}
        <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
          <h2 className="text-2xl font-bold text-white mb-6">How would you like to describe your symptoms?</h2>
          
          <div className="space-y-4">
            {[
              { 
                icon: MessageSquare, 
                title: 'Text Input', 
                desc: 'Type your symptoms in detail',
                color: 'from-teal-500 to-green-600'
              },
              { 
                icon: Mic, 
                title: 'Voice Input', 
                desc: 'Speak your symptoms naturally',
                color: 'from-purple-500 to-indigo-600'
              },
              { 
                icon: Camera, 
                title: 'Image Upload', 
                desc: 'Upload photos of visible symptoms',
                color: 'from-blue-500 to-cyan-600'
              },
              { 
                icon: FileText, 
                title: 'Chat Interface', 
                desc: 'Chat with our AI health assistant',
                color: 'from-pink-500 to-rose-600'
              }
            ].map((method, i) => (
              <button 
                key={i} 
                className={`w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all text-left ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{method.title}</div>
                  <div className="text-gray-400 text-sm">{method.desc}</div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Text Input Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Describe Your Symptoms</h3>
            <textarea
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              placeholder="Please describe your symptoms in detail..."
              className="w-full h-32 p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            
            <div className="mt-4">
              <label className="text-white font-medium mb-2 block">Severity Level</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
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
                  Analyzing...
                </span>
              ) : (
                'Analyze Symptoms'
              )}
            </button>
          </div>
        </div>
        
        {/* Right Column - AI Analysis Preview */}
        <div className="space-y-6">
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <h2 className="text-2xl font-bold text-white mb-4">AI Analysis Preview</h2>
            
            <div className="bg-white/5 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <Brain className="w-8 h-8 text-purple mt-1" />
                <div>
                  <div className="font-semibold text-white mb-2">AI Analysis</div>
                  <div className="text-gray-300 text-sm">
                    {analysisResult ? (
                      <div>
                        <p>{analysisResult.analysis || "Based on your symptoms: fever, headache, and body aches, possible conditions include viral infection or malaria. Urgency level: Medium. Recommendation: Consult a doctor within 24 hours and stay hydrated."}</p>
                        {analysisResult.recommendations && (
                          <div className="mt-2">
                            <strong>Recommendations:</strong>
                            <ul className="list-disc pl-5 mt-1">
                              {analysisResult.recommendations.map((rec, i) => (
                                <li key={i}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      "Based on your symptoms: fever, headache, and body aches, possible conditions include viral infection or malaria. Urgency level: Medium. Recommendation: Consult a doctor within 24 hours and stay hydrated."
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple/20 border border-purple/30 rounded-xl p-3">
                <div className="text-purple font-medium">Urgency</div>
                <div className="text-white">
                  {analysisResult?.urgency || "Medium"}
                </div>
              </div>
              <div className="bg-teal/20 border border-teal/30 rounded-xl p-3">
                <div className="text-teal font-medium">Confidence</div>
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
              <h2 className="text-2xl font-bold text-white">Emergency Detection</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Our AI system automatically detects emergency symptoms and provides immediate guidance.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {['Chest pain', 'Difficulty breathing', 'Severe bleeding', 'High fever', 'Loss of consciousness', 'Severe headache'].map((symptom, i) => (
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
        <h2 className="text-3xl font-bold text-white text-center mb-4">Common Symptoms</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Select from common symptoms to quickly get started with our AI symptom checker
        </p>
        
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: Thermometer, symptom: 'Fever' },
            { icon: Heart, symptom: 'Chest Pain' },
            { icon: Stethoscope, symptom: 'Cough' },
            { icon: AlertTriangle, symptom: 'Headache' },
            { icon: Brain, symptom: 'Dizziness' },
            { icon: Heart, symptom: 'Fatigue' }
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
        <h2 className="text-3xl font-bold text-white text-center mb-4">Health Tips</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          General health advice to keep you and your community healthy
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Stay Hydrated',
              desc: 'Drink at least 8 glasses of water daily to maintain good health',
              icon: Thermometer
            },
            {
              title: 'Balanced Diet',
              desc: 'Include fruits, vegetables, and whole grains in your daily meals',
              icon: Heart
            },
            {
              title: 'Regular Exercise',
              desc: 'Engage in at least 30 minutes of physical activity daily',
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