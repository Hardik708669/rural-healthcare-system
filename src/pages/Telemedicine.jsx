import { Video, User, Calendar, Phone, Clock, Monitor, Shield, X } from 'lucide-react';
import { theme } from '../theme';
import { useState } from 'react';
import VideoCall from '../components/VideoCall';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

export default function Telemedicine() {
  const { language } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);

  const doctors = [
    { 
      id: 1,
      name: translations[language].drRajeshKumar, 
      specialty: translations[language].generalPhysician, 
      experience: translations[language].experience,
      rating: 4.8,
      avatar: 'RK'
    },
    { 
      id: 2,
      name: translations[language].drSunitaDevi, 
      specialty: translations[language].pediatrics, 
      experience: translations[language].experience,
      rating: 4.9,
      avatar: 'SD'
    },
    { 
      id: 3,
      name: translations[language].drAnilPatel, 
      specialty: translations[language].cardiologist, 
      experience: translations[language].experience,
      rating: 4.7,
      avatar: 'AP'
    }
  ];

  const timeSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:30 PM', '6:00 PM'];

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedTime) {
      // In a real app, this would book the appointment
      alert(`${translations[language].appointmentBookedWith} ${selectedDoctor.name} ${translations[language].at} ${selectedTime}`);
    } else {
      alert(translations[language].selectDoctorAndTime);
    }
  };

  const startVideoCall = () => {
    if (selectedDoctor) {
      setShowVideoCall(true);
    } else {
      alert(translations[language].selectDoctorFirst);
    }
  };

  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          {translations[language].telemedicineConsultation}
        </h1>
        <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          {translations[language].connectWithDoctors}
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Doctor Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">{translations[language].selectDoctor}</h2>
            </div>
            
            <div className="space-y-4">
              {doctors.map((doctor, i) => (
                <div 
                  key={doctor.id} 
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100} ${
                    selectedDoctor && selectedDoctor.id === doctor.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    {doctor.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{doctor.name}</div>
                    <div className="text-gray-400 text-sm">{doctor.specialty} • {doctor.experience}</div>
                  </div>
                  <div className="text-yellow-400 text-sm font-medium">
                    ★ {doctor.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Features Card */}
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <h3 className="text-xl font-bold text-white mb-4">{translations[language].whyTelemedicine}</h3>
            <div className="space-y-4">
              {[
                { icon: Monitor, text: translations[language].highQualityVideo },
                { icon: Shield, text: translations[language].endToEndEncryption },
                { icon: Clock, text: translations[language].availability247 }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Middle Column - Appointment Booking */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">{translations[language].bookAppointment}</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-4">
                <div className="text-white font-medium">{translations[language].today}</div>
                <div className="text-gray-400 text-sm">November 14, 2025</div>
              </div>
              
              <div>
                <h3 className="text-gray-300 mb-3">{translations[language].availableTimeSlots}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedTime(time)}
                      className={`px-3 py-2 rounded-xl text-white text-sm transition-all ${
                        selectedTime === time 
                          ? 'bg-gradient-to-r from-teal-500 to-green-600' 
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleBookAppointment}
                className={`${theme.button.primary} w-full py-3`}
                disabled={!selectedDoctor || !selectedTime}
              >
                {translations[language].confirmBooking}
              </button>
            </div>
          </div>
          
          {/* Upcoming Appointments */}
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <h3 className="text-xl font-bold text-white mb-4">{translations[language].upcomingAppointments}</h3>
            <div className="space-y-4">
              {[
                { doctor: translations[language].drSunitaDevi, time: translations[language].tomorrow10AM, type: translations[language].pediatricCheckup },
                { doctor: translations[language].drRajeshKumar, time: 'Dec 15, 2025, 3:00 PM', type: translations[language].generalConsultation }
              ].map((appointment, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <div className="text-white font-medium">{appointment.doctor}</div>
                    <div className="text-gray-400 text-sm">{appointment.time}</div>
                  </div>
                  <div className="text-sm text-primary">{appointment.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column - Video Consultation */}
        <div className="lg:col-span-1">
          <div className={`${theme.glass.heavy} rounded-3xl p-6 h-full`}>
            <div className="flex items-center gap-3 mb-6">
              <Video className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">{translations[language].videoConsultation}</h2>
            </div>
            
            {selectedDoctor ? (
              <>
                <div className="flex flex-col items-center justify-center h-80 bg-black/30 rounded-2xl mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-green-600/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-white font-medium">{selectedDoctor.name}</div>
                    <div className="text-gray-300 text-sm mt-1">{selectedDoctor.specialty}</div>
                    <div className="text-gray-400 text-sm mt-2">{translations[language].readyForVideoConsultation}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/80 hover:bg-red-600 rounded-xl text-white font-medium transition-all">
                    <Phone className="w-5 h-5" />
                    {translations[language].voiceCall}
                  </button>
                  <button 
                    onClick={startVideoCall}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 rounded-xl text-white font-medium transition-all shadow-lg"
                  >
                    <Video className="w-5 h-5" />
                    {translations[language].videoCall}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 bg-black/30 rounded-2xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-green-600/10"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                    <Video className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-gray-300">
                    <div className="font-medium text-white">{translations[language].readyToConnect}</div>
                    <div className="text-sm mt-1">{translations[language].selectDoctorToBegin}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-12`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">{translations[language].howTelemedicineWorks}</h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {translations[language].gettingMedicalCare}
        </p>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: translations[language].selectDoctor, desc: translations[language].chooseFromNetwork },
            { step: '02', title: translations[language].bookAppointment, desc: translations[language].pickConvenientTime },
            { step: '03', title: translations[language].connect, desc: translations[language].joinVideoCall },
            { step: '04', title: translations[language].getCare, desc: translations[language].receiveProfessionalAdvice }
          ].map((item, i) => (
            <div 
              key={i} 
              className={`text-center p-6 rounded-2xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Video Call Modal */}
      {showVideoCall && (
        <VideoCall 
          onClose={() => setShowVideoCall(false)} 
          doctorName={selectedDoctor ? selectedDoctor.name : translations[language].doctor}
        />
      )}
    </div>
  );
}