import { Heart, Target, Eye, Zap, Users, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

export default function About() {
  const { language } = useLanguage();
  
  return (
    <div className="p-6 mt-20 animate-fadeInUp">
      <h1 className="text-3xl font-bold text-white">{translations[language].aboutHealthconnectRural}</h1>
      <p className="text-gray-300 mt-2">
        {translations[language].empoweringRuralCommunities}
      </p>

      {/* Mission and Vision */}
      <div className="grid md:grid-cols-2 gap-6 mt-8 staggered-animation">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold text-white">{translations[language].ourMission}</h2>
          </div>
          <p className="text-gray-300">
            {translations[language].ourMissionDesc}
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-purple" />
            <h2 className="text-xl font-semibold text-white">{translations[language].ourVision}</h2>
          </div>
          <p className="text-gray-300">
            {translations[language].ourVisionDesc}
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">{translations[language].keyFeatures}</h2>
        <div className="grid md:grid-cols-3 gap-6 staggered-animation">
          {[
            { icon: Heart, title: translations[language].aiSymptomChecker, desc: translations[language].instantTriage },
            { icon: Users, title: translations[language].telemedicine, desc: translations[language].remoteConsultations },
            { icon: Zap, title: translations[language].smartReminders, desc: translations[language].vaccinationAlerts },
            { icon: Globe, title: translations[language].offlineFirst, desc: translations[language].worksOffline },
            { icon: Target, title: translations[language].emergencyDetection, desc: translations[language].criticalSymptomAlerts },
            { icon: Heart, title: translations[language].multilingualSupport, desc: translations[language].availableInLocalLanguages }
          ].map((feature, i) => (
            <div key={i} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 glass-card hover:bg-white/15 transition-all">
              <div className="w-12 h-12 bg-gradient-teal rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card animate-fadeInUp">
        <h2 className="text-2xl font-bold text-white mb-4">{translations[language].ourImpact}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: translations[language].villagesServed, label: translations[language].villagesServedLabel },
            { value: translations[language].patientsHelped, label: translations[language].patientsHelpedLabel },
            { value: translations[language].vaccinationCoverage, label: translations[language].vaccinationCoverageLabel }
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 backdrop-blur-xl bg-white/5 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}