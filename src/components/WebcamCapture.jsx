import React, { useState, useRef } from 'react';
import { Camera, X, Check } from 'lucide-react';

const WebcamCapture = ({ onCapture, onClose }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access the camera. Please make sure you have given permission and that your camera is working.');
    }
  };

  // Stop the camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Capture image from video stream
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
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
  };

  // Cleanup resources
  const cleanup = () => {
    stopCamera();
    if (onClose) onClose();
  };

  // Handle component unmount
  React.useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {capturedImage ? 'Confirm Photo' : cameraActive ? 'Take Photo' : 'Camera'}
          </h3>
          <button 
            onClick={cleanup}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {!cameraActive && !capturedImage && (
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
            </div>
          )}
          
          {cameraActive && !capturedImage && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={captureImage}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-green-600 text-white flex items-center justify-center shadow-lg hover:from-teal-600 hover:to-green-700 transition-all focus:ring-4 focus:ring-teal-300"
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
          
          {capturedImage && (
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