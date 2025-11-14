import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Camera, Webcam, AlertCircle } from 'lucide-react';
import { theme } from '../theme';
import { logout, getUserProfile, saveUserProfile } from '../utils/auth';
import WebcamCapture from './WebcamCapture';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ id: 'default-user', name: 'John Doe', email: 'john.doe@example.com', role: 'Patient', avatar: null });
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamError, setWebcamError] = useState(null);
  const profileRef = useRef(null);

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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
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
      {isOpen && (
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