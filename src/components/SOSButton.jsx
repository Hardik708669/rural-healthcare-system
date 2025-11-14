import React, { useState, useEffect } from 'react';
import { Phone, MapPin, AlertTriangle, Heart, Wind, Droplets, Car, Baby, Zap, Clock, Thermometer } from 'lucide-react';

const SOSButton = () => {
  const [showSOSPanel, setShowSOSPanel] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [location, setLocation] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showTimer, setShowTimer] = useState(false);

  // Emergency contacts (in a real app, these would come from user settings)
  const emergencyContacts = [
    { name: 'ASHA Worker', number: '9876543210' },
    { name: 'Health Center', number: '0123456789' },
    { name: 'Ambulance 108', number: '108' },
    { name: 'Family Contact', number: '9999999999' }
  ];

  // Critical symptoms options
  const symptoms = [
    { id: 'chest_pain', name: 'Chest Pain', icon: Heart },
    { id: 'breathing', name: 'Breathing Problem', icon: Wind },
    { id: 'bleeding', name: 'Bleeding', icon: Droplets },
    { id: 'fever', name: 'High Fever', icon: Thermometer },
    { id: 'accident', name: 'Accident', icon: Car },
    { id: 'snake_bite', name: 'Snake Bite', icon: Zap },
    { id: 'pregnancy', name: 'Pregnancy Emergency', icon: Baby }
  ];

  // Get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback location
          setLocation({ latitude: 28.6139, longitude: 77.2090 }); // Delhi coordinates
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocation({ latitude: 28.6139, longitude: 77.2090 }); // Delhi coordinates
    }
  };

  // Toggle symptom selection
  const toggleSymptom = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  // Start SOS emergency
  const triggerSOS = () => {
    setShowTimer(true);
    setTimer(10);
    
    // Get location when SOS is triggered
    getLocation();
  };

  // Cancel SOS
  const cancelSOS = () => {
    setShowTimer(false);
    setTimer(10);
  };

  // Confirm SOS after timer
  const confirmSOS = () => {
    setIsCalling(true);
    setShowTimer(false);
    
    // In a real app, this would make actual calls and send messages
    console.log('SOS triggered!');
    console.log('Selected symptoms:', selectedSymptoms);
    console.log('Location:', location);
    
    // Send alerts
    sendAlerts();
    
    // Play alert sound
    playAlertSound();
    
    // Flashlight effect
    triggerFlashlight();
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      setIsCalling(false);
      setShowSOSPanel(false);
    }, 5000);
  };

  // Send alerts to contacts
  const sendAlerts = () => {
    // In a real app, this would send SMS/WhatsApp messages
    const selectedSymptomNames = symptoms
      .filter(s => selectedSymptoms.includes(s.id))
      .map(s => s.name)
      .join(', ');
    
    const message = `Emergency! I need help. My location: ${location ? `https://maps.google.com/?q=${location.latitude},${location.longitude}` : 'Unknown'}. Symptoms: ${selectedSymptomNames || 'Not specified'}.`;
    
    console.log('Sending alerts:', message);
    console.log('To contacts:', emergencyContacts);
    
    // Simulate sending alerts
    emergencyContacts.forEach(contact => {
      console.log(`Sending to ${contact.name} (${contact.number}): ${message}`);
    });
  };

  // Play alert sound
  const playAlertSound = () => {
    // In a real app, this would play an actual alert sound
    console.log('Playing alert sound...');
  };

  // Trigger flashlight effect
  const triggerFlashlight = () => {
    // In a real app, this would trigger flashlight/flash effects
    console.log('Triggering flashlight effect...');
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (showTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      confirmSOS();
    }
    return () => clearInterval(interval);
  }, [showTimer, timer]);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {/* Main SOS Button */}
      <button
        onClick={() => {
          setShowSOSPanel(!showSOSPanel);
          if (!showSOSPanel) {
            getLocation();
          }
        }}
        className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110 active:scale-95"
        style={{ animation: 'pulse 2s infinite' }}
      >
        <div className="flex flex-col items-center">
          <Phone className="w-8 h-8 text-white" />
          <span className="text-white text-xs font-bold mt-1">SOS</span>
        </div>
      </button>

      {/* SOS Panel */}
      {showSOSPanel && (
        <div className="backdrop-blur-2xl bg-white/15 border border-white/25 rounded-2xl p-6 w-80 absolute bottom-24 right-0 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Emergency SOS</h3>
            <button 
              onClick={() => setShowSOSPanel(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Location Info */}
          <div className="flex items-center gap-2 mb-4 p-3 bg-white/10 rounded-lg">
            <MapPin className="w-5 h-5 text-red-400" />
            <div>
              <div className="text-white text-sm font-medium">Location Detected</div>
              <div className="text-gray-300 text-xs">
                {location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Detecting...'}
              </div>
            </div>
          </div>

          {/* Critical Symptoms */}
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Select Symptoms</h4>
            <div className="grid grid-cols-2 gap-2">
              {symptoms.map((symptom) => {
                const Icon = symptom.icon;
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'bg-red-500/30 border border-red-500'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-white">{symptom.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Call Button */}
          <button
            onClick={triggerSOS}
            className="w-full py-4 bg-red-500 rounded-xl flex items-center justify-center gap-2 font-bold text-white hover:bg-red-600 transition-colors"
          >
            <Phone className="w-5 h-5" />
            CALL NOW
          </button>

          {/* Safety Instructions */}
          {selectedSymptoms.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <h4 className="text-yellow-300 font-medium mb-2">Safety Tips</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                {selectedSymptoms.includes('chest_pain') && (
                  <li>• If prescribed, take aspirin</li>
                )}
                {selectedSymptoms.includes('snake_bite') && (
                  <li>• Do NOT tie cloth above bite</li>
                )}
                {selectedSymptoms.includes('bleeding') && (
                  <li>• Apply direct pressure to wound</li>
                )}
                {selectedSymptoms.includes('pregnancy') && (
                  <li>• Lie on your left side</li>
                )}
                {selectedSymptoms.some(s => ['breathing', 'accident'].includes(s)) && (
                  <li>• Stay calm and still</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* SOS Timer Modal */}
      {showTimer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-red-500 rounded-2xl p-8 text-center animate-pulse">
            <AlertTriangle className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">EMERGENCY SOS</h2>
            <p className="text-white mb-6">Calling emergency services in</p>
            <div className="text-4xl font-bold text-white mb-6">{timer}s</div>
            <button
              onClick={cancelSOS}
              className="px-6 py-3 bg-white text-red-500 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* Calling Screen */}
      {isCalling && (
        <div className="fixed inset-0 bg-red-500 flex flex-col items-center justify-center z-50">
          <div className="animate-pulse">
            <Phone className="w-24 h-24 text-white mb-6" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">EMERGENCY CALL</h2>
          <p className="text-white text-xl mb-8">Connecting to emergency services...</p>
          <div className="text-white text-lg mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <span>Response time: 2-5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Location shared with responders</span>
            </div>
          </div>
          <button
            onClick={() => setIsCalling(false)}
            className="px-6 py-3 bg-white text-red-500 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            DISMISS
          </button>
        </div>
      )}
    </div>
  );
};

export default SOSButton;