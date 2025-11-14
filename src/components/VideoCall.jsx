import React, { useState, useRef, useEffect } from 'react';
import { Phone, Video, Mic, MicOff, CameraOff, PhoneOff, Monitor, Users } from 'lucide-react';
import { theme } from '../theme';

const VideoCall = ({ onClose, doctorName }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, active, ended
  const [callDuration, setCallDuration] = useState(0);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const callTimerRef = useRef(null);

  // Initialize the video call
  useEffect(() => {
    initializeCall();
    
    return () => {
      cleanupCall();
    };
  }, []);

  // Start call timer
  useEffect(() => {
    if (callStatus === 'active') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    }
    
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [callStatus]);

  const initializeCall = async () => {
    try {
      // In a real app, this would connect to a signaling server
      // For demo purposes, we'll just show the local camera
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      });
      
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Simulate connection establishment
      setTimeout(() => {
        setCallStatus('active');
      }, 2000);
      
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setCallStatus('error');
    }
  };

  const cleanupCall = () => {
    // Stop all tracks
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }
    
    // Clear timer
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    setCallStatus('ended');
    cleanupCall();
    
    // Close the call after a delay
    setTimeout(() => {
      if (onClose) onClose();
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/20 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-white">
              {callStatus === 'connecting' ? 'Connecting...' : 
               callStatus === 'active' ? `In call with ${doctorName || 'Doctor'}` : 
               callStatus === 'ended' ? 'Call Ended' : 'Video Call'}
            </h3>
            {callStatus === 'active' && (
              <p className="text-sm text-gray-400">{formatTime(callDuration)}</p>
            )}
          </div>
          <button 
            onClick={endCall}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
        
        {/* Video Area */}
        <div className="flex-1 relative bg-black overflow-hidden">
          {callStatus === 'connecting' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                  <Video className="w-12 h-12 text-white" />
                </div>
                <p className="text-white text-lg">Connecting to {doctorName || 'doctor'}...</p>
                <p className="text-gray-400 mt-2">Please wait while we establish the connection</p>
              </div>
            </div>
          )}
          
          {callStatus === 'active' && (
            <>
              {/* Remote Video (simulated) */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-green-900/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-white text-xl font-medium">{doctorName || 'Doctor'}</p>
                    <p className="text-gray-400 mt-1">General Physician</p>
                  </div>
                </div>
              </div>
              
              {/* Local Video */}
              <div className="absolute bottom-4 right-4 w-1/4 h-1/4 rounded-lg overflow-hidden border-2 border-white/30">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${isVideoOff ? 'hidden' : ''}`}
                />
                {isVideoOff && (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <CameraOff className="w-12 h-12 text-gray-500" />
                  </div>
                )}
              </div>
            </>
          )}
          
          {callStatus === 'ended' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <PhoneOff className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-white text-lg">Call with {doctorName || 'doctor'} has ended</p>
                <p className="text-gray-400 mt-2">Duration: {formatTime(callDuration)}</p>
              </div>
            </div>
          )}
          
          {callStatus === 'error' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Monitor className="w-12 h-12 text-red-500" />
                </div>
                <p className="text-white text-lg">Unable to establish video call</p>
                <p className="text-gray-400 mt-2">Please check your camera and microphone permissions</p>
                <button
                  onClick={initializeCall}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg font-medium hover:from-teal-600 hover:to-green-700 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Controls */}
        {callStatus === 'active' && (
          <div className="p-6 bg-dark/80 backdrop-blur-xl">
            <div className="flex justify-center items-center gap-6">
              <button
                onClick={toggleMute}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isMuted 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isMuted ? (
                  <MicOff className="w-6 h-6 text-white" />
                ) : (
                  <Mic className="w-6 h-6 text-white" />
                )}
              </button>
              
              <button
                onClick={toggleVideo}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isVideoOff 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {isVideoOff ? (
                  <CameraOff className="w-6 h-6 text-white" />
                ) : (
                  <Video className="w-6 h-6 text-white" />
                )}
              </button>
              
              <button
                onClick={endCall}
                className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
              >
                <PhoneOff className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;