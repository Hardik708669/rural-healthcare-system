import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff } from 'lucide-react';
import { theme } from '../theme';

const OfflineSync = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${theme.animation.fadeInLeft}`}>
      <div className={`${theme.glass.card} ${theme.glass.strong} p-4 max-w-sm shadow-lg`}>
        <div className="flex items-center space-x-2 mb-2">
          <CloudOff className="h-4 w-4 text-white" />
          <span className="text-sm font-medium text-white">Offline Mode</span>
        </div>
        
        <p className="text-xs text-white">
          You're offline. Basic features available locally.
        </p>
      </div>
    </div>
  );
};

export default OfflineSync;