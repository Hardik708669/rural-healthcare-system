import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Check, AlertCircle } from 'lucide-react';

const WebcamCapture = ({ onCapture, onClose }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Check for camera devices
  const getCameraDevices = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = allDevices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        return videoDevices;
      }
    } catch (err) {
      console.warn('Could not enumerate devices:', err);
    }
    return [];
  };

  // Start the camera
  const startCamera = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if mediaDevices is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support camera access. Please try a different browser.');
      }

      // Stop any existing stream first
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => {
          try {
            track.stop();
          } catch (err) {
            console.warn('Error stopping track:', err);
          }
        });
        streamRef.current = null;
      }

      // Get available cameras
      const cameras = await getCameraDevices();
      
      // If no cameras found
      if (cameras.length === 0) {
        // Try with default constraints
        console.warn('No cameras found, trying default constraints');
      }

      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      };

      // If we have specific cameras, try to use the first one
      if (cameras.length > 0) {
        constraints.video.deviceId = { exact: cameras[0].deviceId };
      }

      console.log('Requesting camera with constraints:', constraints);
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Handle video play event
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          setLoading(false);
          setCameraActive(true);
        };
        
        // Handle video play event
        videoRef.current.onplay = () => {
          console.log('Video playing');
        };
        
        // Handle video error
        videoRef.current.onerror = (e) => {
          console.error('Video error:', e);
          setError('Error playing video stream');
          setLoading(false);
        };
      } else {
        console.warn('No video ref available');
        setLoading(false);
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setLoading(false);
      
      let errorMessage = 'Could not access the camera. Please make sure you have given permission and that your camera is working.';
      
      // Provide more specific error messages
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Camera access was denied. Please allow camera access in your browser settings and try again.';
      } else if (err.name === 'NotFoundError' || err.name === 'OverconstrainedError') {
        errorMessage = 'No camera found or camera not supported. Please check your camera connection.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera is already in use by another application. Please close other applications using the camera.';
      } else if (err.name === 'AbortError') {
        errorMessage = 'Camera access was aborted. Please try again.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      console.error('Camera error details:', {
        name: err.name,
        message: err.message,
        constraint: err.constraint,
        toString: err.toString()
      });
      
      setError(errorMessage);
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        try {
          track.stop();
        } catch (err) {
          console.warn('Error stopping track:', err);
        }
      });
      streamRef.current = null;
    }
    setCameraActive(false);
    setLoading(false);
  };

  // Capture image from video stream
  const captureImage = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        
        // Draw the video frame to canvas
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
      } catch (err) {
        console.error('Error capturing image:', err);
        setError('Failed to capture image. Please try again.');
      }
    } else {
      setError('Video is not ready. Please wait a moment and try again.');
    }
  };

  // Confirm and use the captured image
  const confirmImage = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage);
      cleanup();
    }
  };

  // Retake the photo
  const retakePhoto = () => {
    setCapturedImage(null);
    setError(null);
  };

  // Cleanup resources
  const cleanup = () => {
    stopCamera();
    setCapturedImage(null);
    setError(null);
    if (onClose) onClose();
  };

  // Handle component unmount
  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {error ? 'Camera Error' : capturedImage ? 'Confirm Photo' : cameraActive ? 'Take Photo' : 'Camera'}
          </h3>
          <button 
            onClick={cleanup}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <p className="text-red-600 text-center text-sm">
                {error}
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => {
                    setError(null);
                    startCamera();
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-green-700 transition-all shadow-lg"
                >
                  Try Again
                </button>
                <button
                  onClick={cleanup}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {loading && !error && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600">Accessing camera...</p>
              <p className="text-gray-400 text-sm text-center">Make sure to allow camera access when prompted by your browser</p>
            </div>
          )}
          
          {!error && !loading && !cameraActive && !capturedImage && (
            <div className="flex flex-col items-center gap-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-center">
                Take a photo for your profile picture using your camera
              </p>
              <button
                onClick={startCamera}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Open Camera
              </button>
              <p className="text-gray-400 text-sm text-center">
                You'll need to allow camera access when prompted by your browser
              </p>
            </div>
          )}
          
          {!error && !loading && cameraActive && !capturedImage && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={captureImage}
                disabled={!cameraActive}
                className={`w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-green-600 text-white flex items-center justify-center shadow-lg hover:from-teal-600 hover:to-green-700 transition-all focus:ring-4 focus:ring-teal-300 ${!cameraActive ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="w-12 h-12 rounded-full border-4 border-white"></div>
              </button>
              <button
                onClick={stopCamera}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          )}
          
          {!error && !loading && capturedImage && (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={retakePhoto}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Retake
                </button>
                <button
                  onClick={confirmImage}
                  className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Use Photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebcamCapture;