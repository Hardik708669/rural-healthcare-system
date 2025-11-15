import { Target, Eye, Heart, Users, Globe } from 'lucide-react';
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

      {/* Our Approach */}
      <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card animate-fadeInUp">
        <h2 className="text-2xl font-bold text-white mb-4">{translations[language].ourApproach}</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-4">
            {translations[language].ourApproachDesc}
          </p>
          <p className="text-gray-300 mb-4">
            {translations[language].ourApproachDesc2}
          </p>
          <p className="text-gray-300">
            {translations[language].ourApproachDesc3}
          </p>
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

      {/* Community Focus */}
      <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card animate-fadeInUp">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-8 h-8 text-teal-400" />
          <h2 className="text-2xl font-bold text-white">{translations[language].communityCentricDesign}</h2>
        </div>
        <p className="text-gray-300">
          {translations[language].communityCentricDesignDesc}
        </p>
      </div>

      {/* Technology for Good */}
      <div className="mt-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card animate-fadeInUp">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-8 h-8 text-green-400" />
          <h2 className="text-2xl font-bold text-white">{translations[language].technologyForGood}</h2>
        </div>
        <p className="text-gray-300">
          {translations[language].technologyForGoodDesc}
        </p>
      </div>

      {/* Call to Action */}
      <div className="mt-8 backdrop-blur-xl bg-gradient-to-r from-teal-500/20 to-green-600/20 border border-white/20 rounded-2xl shadow-lg p-6 glass-card animate-fadeInUp text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{translations[language].joinOurMission}</h2>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          {translations[language].joinOurMissionDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/signup" 
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-green-700 transition-all shadow-lg transform hover:scale-105"
          >
            {translations[language].getStartedToday}
          </a>
          <a 
            href="/contact" 
            className="px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
          >
            {translations[language].contactUs}
          </a>
        </div>
      </div>
    </div>
  );
}