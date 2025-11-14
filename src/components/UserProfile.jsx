import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Camera, Webcam } from 'lucide-react';
import { theme } from '../theme';
import { logout, getUserProfile } from '../utils/auth';
import WebcamCapture from './WebcamCapture';

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getUserProfile());
  const [showWebcam, setShowWebcam] = useState(false);
  const profileRef = useRef(null);

  // Load user avatar from localStorage if available
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setUser(prevUser => ({ ...prevUser, avatar: savedAvatar }));
    }
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
      reader.onload = (e) => {
        setUser({ ...user, avatar: e.target.result });
        // Save to localStorage
        localStorage.setItem('userAvatar', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWebcamCapture = (imageData) => {
    if (imageData) {
      setUser({ ...user, avatar: imageData });
      // Save to localStorage
      localStorage.setItem('userAvatar', imageData);
    }
    setShowWebcam(false);
  };

  const openWebcam = () => {
    // Check if browser supports media devices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Your browser does not support camera access. Please try a different browser.');
      return;
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
                    className="bg-teal-500 rounded-full p-1 cursor-pointer"
                  >
                    <Webcam className="w-4 h-4 text-white" />
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
          onClose={() => setShowWebcam(false)} 
        />
      )}
    </div>
  );
};

export default UserProfile;