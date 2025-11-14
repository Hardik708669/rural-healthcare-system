import Card from "../components/Card";
import ChatbotWidget from "../components/ChatbotWidget";
import { theme } from "../theme";
import { Brain, Video, Bell, Activity, MapPin, Users } from 'lucide-react';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/translations";

export default function Home() {
  const { language } = useLanguage();
  
  return (
    <div className="px-6 mt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900 p-8 md:p-12">
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {translations[language].aiPoweredRuralHealthcare.split(' ')[0]} <span className="bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">{translations[language].aiPoweredRuralHealthcare.split(' ')[1]}</span> {translations[language].aiPoweredRuralHealthcare.split(' ').slice(2).join(' ')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            {translations[language].bridgingHealthcareGaps}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/50">
              {translations[language].getStarted}
            </button>
            <button className="px-8 py-4 border-2 border-white/30 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
              {translations[language].learnMore}
            </button>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          {translations[language].empoweringRuralHealthcare}
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          {translations[language].ourComprehensivePlatform}
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: Video, 
              title: translations[language].telemedicine, 
              desc: translations[language].connectWithDoctors, 
              to: "/telemedicine" 
            },
            { 
              icon: Brain, 
              title: translations[language].aiSymptom, 
              desc: "Describe symptoms and get AI-powered health insights", 
              to: "/symptoms" 
            },
            { 
              icon: Bell, 
              title: translations[language].reminders, 
              desc: "Never miss important health schedules and appointments", 
              to: "/reminders" 
            },
            { 
              icon: Activity, 
              title: translations[language].dashboard, 
              desc: "Monitor village health metrics and manage resources", 
              to: "/dashboard" 
            },
            { 
              icon: MapPin, 
              title: "Village Analytics", 
              desc: "Real-time health data visualization for authorities", 
              to: "/dashboard" 
            },
            { 
              icon: Users, 
              title: "Community Care", 
              desc: "Support for health workers and patients alike", 
              to: "/about" 
            }
          ].map((feature, i) => (
            <Card 
              key={i}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              to={feature.to}
            />
          ))}
        </div>
      </div>

      {/* Statistics Dashboard Preview */}
      <div className="backdrop-blur-2xl bg-white/15 border border-white/25 rounded-3xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          {translations[language].realTimeHealthImpact}
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { value: "16,000+", label: translations[language].healthWorkersSupported },
            { value: "12", label: translations[language].villagesMonitored },
            { value: "98%", label: translations[language].serviceUptime },
            { value: "24/7", label: translations[language].aiAvailability }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl font-bold text-teal-400 mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          {translations[language].trustedByHealthcareProfessionals}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "This platform has revolutionized how we deliver healthcare in remote areas. The AI symptom checker is incredibly accurate.",
              author: "Dr. Priya Sharma",
              role: "Rural Health Director"
            },
            {
              quote: "During the health worker strike, this system kept essential services running. A true lifesaver for our community.",
              author: "Ramesh Kumar",
              role: "Village Health Worker"
            },
            {
              quote: "The telemedicine feature connects us with specialists we never had access to before. Game-changing technology.",
              author: "Sunita Devi",
              role: "Community Health Nurse"
            }
          ].map((testimonial, i) => (
            <div 
              key={i} 
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
            >
              <div className="text-teal-400 text-5xl mb-4">"</div>
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="backdrop-blur-2xl bg-white/15 border border-white/25 rounded-3xl p-8 md:p-12 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {translations[language].readyToTransformRuralHealthcare}
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {translations[language].joinThousands}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/50">
            {translations[language].startFreeTrial}
          </button>
          <button className="px-8 py-4 border-2 border-teal-500 text-teal-400 font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300">
            {translations[language].scheduleDemo}
          </button>
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}