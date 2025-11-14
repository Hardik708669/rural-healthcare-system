import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Camera, Webcam, AlertCircle, Phone } from 'lucide-react';
import { theme } from '../theme';
import { logout, getUserProfile, saveUserProfile } from '../utils/auth';
import WebcamCapture from './WebcamCapture';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ id: 'default-user', name: 'John Doe', email: 'john.doe@example.com', role: 'Patient', avatar: null });
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamError, setWebcamError] = useState(null);
  const [showSOSPanel, setShowSOSPanel] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [location, setLocation] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showTimer, setShowTimer] = useState(false);
  const profileRef = useRef(null);

  // Emergency contacts (in a real app, these would come from user settings)
  const emergencyContacts = [
    { name: 'ASHA Worker', number: '9876543210' },
    { name: 'Health Center', number: '0123456789' },
    { name: 'Ambulance 108', number: '108' },
    { name: 'Family Contact', number: '9999999999' }
  ];

  // Critical symptoms options
  const symptoms = [
    { id: 'chest_pain', name: 'Chest Pain', icon: Phone },
    { id: 'breathing', name: 'Breathing Problem', icon: Phone },
    { id: 'bleeding', name: 'Bleeding', icon: Phone },
    { id: 'fever', name: 'High Fever', icon: Phone },
    { id: 'accident', name: 'Accident', icon: Phone },
    { id: 'snake_bite', name: 'Snake Bite', icon: Phone },
    { id: 'pregnancy', name: 'Pregnancy Emergency', icon: Phone }
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
    setShowSOSPanel(false);
    setIsOpen(false);
    
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

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getUserProfile();
        // Check if there's a saved avatar in localStorage
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar && (!profile.avatar || profile.avatar !== savedAvatar)) {
          const updatedProfile = { ...profile, avatar: savedAvatar };
          setUser(updatedProfile);
        } else {
          setUser(profile);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Fallback to localStorage avatar if exists
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
          setUser(prev => ({ ...prev, avatar: savedAvatar }));
        }
      }
    };
    
    loadProfile();
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowSOSPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
    // Close SOS panel when toggling profile
    if (isOpen) {
      setShowSOSPanel(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.match('image.*')) {
        alert('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target.result;
        const updatedUser = { ...user, avatar: imageData };
        setUser(updatedUser);
        // Save to IndexedDB
        try {
          await saveUserProfile(updatedUser);
        } catch (error) {
          console.error('Error saving user profile:', error);
          // Fallback to localStorage
          localStorage.setItem('userAvatar', imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWebcamCapture = async (imageData) => {
    if (imageData) {
      const updatedUser = { ...user, avatar: imageData };
      setUser(updatedUser);
      // Save to IndexedDB
      try {
        await saveUserProfile(updatedUser);
      } catch (error) {
        console.error('Error saving user profile:', error);
        // Fallback to localStorage
        localStorage.setItem('userAvatar', imageData);
      }
    }
    setShowWebcam(false);
    setWebcamError(null);
  };

  const openWebcam = async () => {
    // Check if browser supports media devices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const errorMsg = 'Your browser does not support camera access. Please try a different browser.';
      setWebcamError(errorMsg);
      alert(errorMsg);
      return;
    }
    
    // Check for camera permissions
    try {
      // Try to check if we already have permission
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'camera' });
        console.log('Camera permission status:', permission.state);
        
        if (permission.state === 'denied') {
          setWebcamError('Camera access has been denied. Please enable camera access in your browser settings.');
        }
      }
    } catch (err) {
      console.warn('Could not check camera permissions:', err);
    }
    
    setShowWebcam(true);
    setIsOpen(false); // Close the profile dropdown
  };

  return (
    <div className="relative" ref={profileRef}>
      {/* User Avatar */}
      <button
        onClick={toggleProfile}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-green-600 text-white font-bold shadow-lg hover:scale-110 transition-transform duration-300 focus:outline-none"
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="font-bold">{user.name.charAt(0)}</span>
        )}
      </button>

      {/* Profile Dropdown */}
      {isOpen && !showSOSPanel && (
        <div className={`absolute right-0 mt-2 w-72 ${theme.glass.card} ${theme.glass.cardHover} z-50`}>
          {/* Profile Header */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="font-bold">{user.name.charAt(0)}</span>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 flex gap-1">
                  <label className="bg-teal-500 rounded-full p-1 cursor-pointer">
                    <Camera className="w-4 h-4 text-white" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                  <button 
                    onClick={openWebcam}
                    className="bg-teal-500 rounded-full p-1 cursor-pointer relative"
                  >
                    <Webcam className="w-4 h-4 text-white" />
                    {webcamError && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute -top-1 -right-1" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold">{user.name}</h3>
                <p className="text-gray-300 text-sm">{user.email}</p>
                <span className="inline-block px-2 py-1 text-xs bg-teal-500/20 text-teal-300 rounded-full mt-1">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          
          {/* Profile Menu */}
          <div className="py-2">
            <button className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <span>My Profile</span>
            </button>
            <button className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-400" />
              <span>Settings</span>
            </button>
            {/* SOS Button in Profile Menu */}
            <button 
              onClick={() => setShowSOSPanel(true)}
              className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/10 transition-colors flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              <span>Emergency SOS</span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full px-4 py-3 text-left text-red-400 hover:bg-white/10 transition-colors flex items-center gap-3"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* SOS Panel */}
      {isOpen && showSOSPanel && (
        <div className={`absolute right-0 mt-2 w-80 ${theme.glass.card} ${theme.glass.cardHover} z-50`}>
          <div className="p-4">
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
              <Phone className="w-5 h-5 text-red-400" />
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
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'bg-red-500/30 border border-red-500'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-white" />
                    <span className="text-white">{symptom.name}</span>
                  </button>
                ))}
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
          </div>
        </div>
      )}

      {/* SOS Timer Modal */}
      {showTimer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-red-500 rounded-2xl p-8 text-center animate-pulse">
            <Phone className="w-16 h-16 text-white mx-auto mb-4" />
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
              <Phone className="w-5 h-5" />
              <span>Response time: 2-5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
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

      {/* Webcam Capture Modal */}
      {showWebcam && (
        <WebcamCapture 
          onCapture={handleWebcamCapture} 
          onClose={() => {
            setShowWebcam(false);
            setWebcamError(null);
          }} 
        />
      )}
    </div>
  );
};

export default UserProfile;