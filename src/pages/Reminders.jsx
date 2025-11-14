import { Bell, Calendar, Activity, Baby, Pill, Syringe, Heart, Clock, CheckCircle } from 'lucide-react';
import { theme } from '../theme';

export default function Reminders() {
  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          Health Reminders
        </h1>
        <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          Never miss important health schedules and appointments. Our smart reminder system 
          sends timely notifications to keep you and your family healthy.
        </p>
      </div>

      {/* Reminder Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { 
            icon: Calendar, 
            title: 'Vaccination Reminders', 
            desc: 'Immunization schedules',
            color: 'from-purple-500 to-indigo-600',
            count: '12'
          },
          { 
            icon: Activity, 
            title: 'Medicine Reminders', 
            desc: 'Daily medication alerts',
            color: 'from-teal-500 to-green-600',
            count: '8'
          },
          { 
            icon: Baby, 
            title: 'Prenatal Reminders', 
            desc: 'Maternal health checks',
            color: 'from-pink-500 to-rose-600',
            count: '5'
          },
          { 
            icon: Heart, 
            title: 'Health Checkups', 
            desc: 'Regular health screenings',
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
              Manage {category.title.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>

      {/* Upcoming Reminders */}
      <div className={`${theme.glass.heavy} rounded-3xl p-6 mb-12`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Upcoming Reminders</h2>
          <button className={`${theme.button.outline} px-4 py-2`}>
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {[
            { 
              title: 'Polio Vaccination', 
              time: 'Tomorrow, 9:00 AM', 
              type: 'Vaccination',
              icon: Syringe,
              color: 'purple'
            },
            { 
              title: 'Blood Pressure Medication', 
              time: 'Today, 8:00 AM', 
              type: 'Medicine',
              icon: Pill,
              color: 'teal'
            },
            { 
              title: 'Prenatal Checkup', 
              time: 'Dec 15, 2025, 10:00 AM', 
              type: 'Appointment',
              icon: Baby,
              color: 'pink'
            },
            { 
              title: 'Annual Health Checkup', 
              time: 'Dec 20, 2025, 2:00 PM', 
              type: 'Checkup',
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
        <h2 className="text-2xl font-bold text-white mb-6">Add New Reminder</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Reminder Title</label>
            <input
              type="text"
              placeholder="e.g., Take Vitamin D"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Date</label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Time</label>
              <input
                type="time"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Reminder Type</label>
            <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
              <option>Medicine</option>
              <option>Vaccination</option>
              <option>Appointment</option>
              <option>Checkup</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Repeat</label>
            <div className="grid grid-cols-4 gap-2">
              {['Once', 'Daily', 'Weekly', 'Monthly'].map((repeat, i) => (
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
            Add Reminder
          </button>
        </form>
      </div>
      
      {/* Reminder Tips */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-12`}>
        <h2 className="text-3xl font-bold text-white text-center mb-4">Reminder Tips</h2>
        <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Maximize the effectiveness of your health reminders with these best practices
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Be Specific',
              desc: 'Include exact medication names and dosages in your reminders',
              icon: Bell
            },
            {
              title: 'Set Multiple Alerts',
              desc: 'Create reminders at different times to ensure you don\'t miss important health tasks',
              icon: Clock
            },
            {
              title: 'Track Completion',
              desc: 'Mark reminders as complete to build healthy habits and track your progress',
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