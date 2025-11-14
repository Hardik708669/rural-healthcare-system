import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { theme } from '../theme';

const HealthMonitoring = ({ userRole }) => {
  if (userRole !== 'authority' && userRole !== 'health_worker') {
    return (
      <div className="min-h-screen flex items-center justify-center px-16 pt-32">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-white/60 mx-auto mb-4" />
          <h2 className="text-3xl font-light text-white mb-2">Access Restricted</h2>
          <p className="text-white/60">This section is only available for health authorities and workers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center px-16 pt-32">
      <div className="max-w-2xl">
        <h1 className="text-7xl font-light text-white mb-8 leading-tight">
          Building the future of
          <span className="text-white/60"> healthcare</span>
        </h1>
        
        <p className="text-white/80 mb-6 max-w-lg">
          We're a collective of healthcare professionals, technologists, and innovators obsessed with crafting exceptional rural healthcare experiences.
        </p>
        
        <p className="text-white/80 mb-12 max-w-lg">
          Every intervention is an opportunity to explore new possibilities and push healthcare boundaries.
        </p>
        
        <div className="flex space-x-4">
          <button className={`${theme.button.primary} px-8 py-3 rounded-full font-medium`}>
            Allocate Resources
          </button>
          <button className="text-white hover:text-white/80 px-8 py-3 font-medium transition-all">
            View Analytics
          </button>
        </div>
      </div>
      
      <div className="ml-auto space-y-12">
        <div className="text-right">
          <div className="text-6xl font-light text-white mb-2">12</div>
          <div className="text-white/60 text-sm">Villages<br />Under monitoring</div>
        </div>
        
        <div className="text-right">
          <div className="text-6xl font-light text-white mb-2">24h</div>
          <div className="text-white/60 text-sm">Response Time<br />Emergency alerts</div>
        </div>
        
        <div className="text-right">
          <div className="text-6xl font-light text-white mb-2">92%</div>
          <div className="text-white/60 text-sm">Coverage Rate<br />Immunization program</div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoring;