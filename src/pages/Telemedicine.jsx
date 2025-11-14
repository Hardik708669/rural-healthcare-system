import { Video, User, Calendar, Phone, Clock, Monitor, Shield, X } from 'lucide-react';
import { theme } from '../theme';
import { useState } from 'react';
import VideoCall from '../components/VideoCall';

export default function Telemedicine() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showVideoCall, setShowVideoCall] = useState(false);

  const doctors = [
    { 
      id: 1,
      name: 'Dr. Rajesh Kumar', 
      specialty: 'General Physician', 
      experience: '15 years',
      rating: 4.8,
      avatar: 'RK'
    },
    { 
      id: 2,
      name: 'Dr. Sunita Devi', 
      specialty: 'Pediatrics', 
      experience: '12 years',
      rating: 4.9,
      avatar: 'SD'
    },
    { 
      id: 3,
      name: 'Dr. Anil Patel', 
      specialty: 'Cardiologist', 
      experience: '20 years',
      rating: 4.7,
      avatar: 'AP'
    }
  ];

  const timeSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:30 PM', '6:00 PM'];

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedTime) {
      // In a real app, this would book the appointment
      alert(`Appointment booked with ${selectedDoctor.name} at ${selectedTime}`);
    } else {
      alert('Please select both a doctor and a time slot');
    }
  };

  const startVideoCall = () => {
    if (selectedDoctor) {
      setShowVideoCall(true);
    } else {
      alert('Please select a doctor first');
    }
  };

  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          Telemedicine Consultations
        </h1>
        <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          Connect with healthcare professionals remotely through secure video consultations, 
          available 24/7 for all your medical needs.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Doctor Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-white">Select Doctor</h2>
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
            <h3 className="text-xl font-bold text-white mb-4">Why Telemedicine?</h3>
            <div className="space-y-4">
              {[
                { icon: Monitor, text: 'High-quality video calls' },
                { icon: Shield, text: 'End-to-end encryption' },
                { icon: Clock, text: '24/7 availability' }
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
              <h2 className="text-2xl font-bold text-white">Book Appointment</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-4">
                <div className="text-white font-medium">Today</div>
                <div className="text-gray-400 text-sm">November 14, 2025</div>
              </div>
              
              <div>
                <h3 className="text-gray-300 mb-3">Available Time Slots</h3>
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
                Confirm Booking
              </button>
            </div>
          </div>
          
          {/* Upcoming Appointments */}
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <h3 className="text-xl font-bold text-white mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {[
                { doctor: 'Dr. Sunita Devi', time: 'Tomorrow, 10:00 AM', type: 'Pediatric Checkup' },
                { doctor: 'Dr. Rajesh Kumar', time: 'Dec 15, 2025, 3:00 PM', type: 'General Consultation' }
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
              <h2 className="text-2xl font-bold text-white">Video Consultation</h2>
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
                    <div className="text-gray-400 text-sm mt-2">Ready for video consultation</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500/80 hover:bg-red-600 rounded-xl text-white font-medium transition-all">
                    <Phone className="w-5 h-5" />
                    Voice Call
                  </button>
                  <button 
                    onClick={startVideoCall}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 rounded-xl text-white font-medium transition-all shadow-lg"
                  >
                    <Video className="w-5 h-5" />
                    Video Call
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
                    <div className="font-medium text-white">Ready to Connect</div>
                    <div className="text-sm mt-1">Select a doctor to begin video consultation</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-12`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">How Telemedicine Works</h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Getting medical care has never been easier. Follow these simple steps to connect with a healthcare professional.
        </p>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '01', title: 'Select Doctor', desc: 'Choose from our network of qualified professionals' },
            { step: '02', title: 'Book Appointment', desc: 'Pick a convenient time slot for your consultation' },
            { step: '03', title: 'Connect', desc: 'Join your video call at the scheduled time' },
            { step: '04', title: 'Get Care', desc: 'Receive professional medical advice and follow-up' }
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
          doctorName={selectedDoctor ? selectedDoctor.name : 'Doctor'}
        />
      )}
    </div>
  );
}