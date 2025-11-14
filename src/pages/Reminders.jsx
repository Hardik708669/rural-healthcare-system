import { Bell, Calendar, Activity, Baby, Pill, Syringe, Heart, Clock, CheckCircle } from 'lucide-react';
import { theme } from '../theme';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

export default function Reminders() {
  const { language } = useLanguage();
  
  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          {translations[language].healthReminders}
        </h1>
        <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          {translations[language].neverMissHealthSchedules}
        </p>
      </div>

      {/* Reminder Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { 
            icon: Calendar, 
            title: translations[language].vaccinationReminders, 
            desc: translations[language].immunizationSchedules,
            color: 'from-purple-500 to-indigo-600',
            count: '12'
          },
          { 
            icon: Activity, 
            title: translations[language].medicineReminders, 
            desc: translations[language].dailyMedicationAlerts,
            color: 'from-teal-500 to-green-600',
            count: '8'
          },
          { 
            icon: Baby, 
            title: translations[language].prenatalReminders, 
            desc: translations[language].maternalHealthChecks,
            color: 'from-pink-500 to-rose-600',
            count: '5'
          },
          { 
            icon: Heart, 
            title: translations[language].healthCheckups, 
            desc: translations[language].regularHealthScreenings,
            color: 'from-blue-500 to-cyan-600',
            count: '3'
          }
        ].map((category, i) => (
          <div 
            key={i} 
            className={`${theme.glass.heavy} rounded-3xl p-6 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white/10 rounded-full px-3 py-1 text-sm font-medium">
                {category.count}
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{category.title}</h2>
            <p className="text-gray-300 mb-4">{category.desc}</p>
            <button className={`${theme.button.ghost} w-full`}>
              {translations[language].manage} {category.title.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>

      {/* Upcoming Reminders */}
      <div className={`${theme.glass.heavy} rounded-3xl p-6 mb-12`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{translations[language].upcomingReminders}</h2>
          <button className={`${theme.button.outline} px-4 py-2`}>
            {translations[language].viewAll}
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { 
              title: translations[language].polioVaccination, 
              time: translations[language].tomorrow9AM, 
              type: translations[language].vaccination,
              icon: Syringe,
              color: 'purple'
            },
            { 
              title: translations[language].bloodPressureMedication, 
              time: translations[language].today8AM, 
              type: translations[language].medicine,
              icon: Pill,
              color: 'teal'
            },
            { 
              title: translations[language].prenatalCheckup, 
              time: 'Dec 15, 2025, 10:00 AM', 
              type: translations[language].appointment,
              icon: Baby,
              color: 'pink'
            },
            { 
              title: translations[language].annualHealthCheckup, 
              time: 'Dec 20, 2025, 2:00 PM', 
              type: translations[language].checkup,
              icon: Heart,
              color: 'blue'
            }
          ].map((reminder, i) => (
            <div 
              key={i} 
              className={`flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${reminder.color}-500 to-${reminder.color}-600 rounded-lg flex items-center justify-center`}>
                  <reminder.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{reminder.title}</div>
                  <div className="text-gray-400 text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {reminder.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 bg-${reminder.color}/20 border border-${reminder.color}/30 rounded-full text-${reminder.color} text-sm`}>
                  {reminder.type}
                </span>
                <button className="p-2 text-green-400 hover:bg-green-500/20 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Reminder Form */}
      <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
        <h2 className="text-2xl font-bold text-white mb-6">{translations[language].addNewReminder}</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].reminderTitle}</label>
            <input
              type="text"
              placeholder={translations[language].takeVitaminD}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">{translations[language].date}</label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">{translations[language].time}</label>
              <input
                type="time"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].reminderType}</label>
            <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>{translations[language].medicine}</option>
              <option>{translations[language].vaccination}</option>
              <option>{translations[language].appointment}</option>
              <option>{translations[language].checkup}</option>
              <option>{translations[language].other}</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">{translations[language].repeat}</label>
            <div className="grid grid-cols-4 gap-2">
              {[translations[language].once, translations[language].daily, translations[language].weekly, translations[language].monthly].map((repeat, i) => (
                <button
                  key={i}
                  type="button"
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    i === 0 
                      ? 'bg-gradient-to-r from-teal-500 to-green-600 text-white' 
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {repeat}
                </button>
              ))}
            </div>
          </div>
          
          <button type="submit" className={`${theme.button.primary} w-full py-3`}>
            {translations[language].addReminder}
          </button>
        </form>
      </div>
      
      {/* Reminder Tips */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-12`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">{translations[language].reminderTips}</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          {translations[language].maximizeEffectiveness}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: translations[language].beSpecific,
              desc: translations[language].includeExactMedication,
              icon: Bell
            },
            {
              title: translations[language].setMultipleAlerts,
              desc: translations[language].createRemindersAtDifferentTimes,
              icon: Clock
            },
            {
              title: translations[language].trackCompletion,
              desc: translations[language].markRemindersAsComplete,
              icon: CheckCircle
            }
          ].map((tip, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <tip.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{tip.title}</h3>
              <p className="text-gray-300">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}