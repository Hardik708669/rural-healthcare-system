import React from 'react';
import { theme } from '../theme';

const Reminders = () => {
  const followUps = [
    { id: '01', title: 'Vaccination Schedule - Village Rampur', subtitle: 'Immunization Campaign', year: '2024' },
    { id: '02', title: 'Prenatal Care Follow-up - Ms. Shanti', subtitle: 'Maternal Health', year: '2024' },
    { id: '03', title: 'Chronic Disease Management - Diabetes', subtitle: 'Medication Adherence', year: '2023' }
  ];

  return (
    <div className="min-h-screen px-16 pt-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-7xl font-light text-white mb-4">
          Follow-ups
        </h1>
        <p className="text-white/60 text-xl mb-16">
          / Scheduled patient adherence
        </p>
        
        <div className="space-y-12">
          {followUps.map((item, index) => (
            <div key={item.id} className="border-b border-white/20 pb-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-white/40 text-sm mb-2">{item.id}</div>
                  <h3 className="text-3xl font-light text-white mb-2">{item.title}</h3>
                  <p className="text-white/60">{item.subtitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-white/40 text-lg">{item.year}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-light text-white mb-2">92%</div>
            <div className="text-white/60 text-sm">Adherence Rate<br />This month</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-white mb-2">24</div>
            <div className="text-white/60 text-sm">Active Patients<br />Under care</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-light text-white mb-2">8</div>
            <div className="text-white/60 text-sm">Villages<br />Monitored</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;