import { theme } from '../theme';
import { Users, Activity, AlertTriangle, Calendar, Brain, MapPin, TrendingUp, Eye, FileText, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import SkeletonLoader from '../components/SkeletonLoader';
import HealthTrendsChart from '../components/HealthTrendsChart';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

export default function Dashboard() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="p-6 mt-20">
        <div className="mb-8">
          <div className="h-10 w-64 skeleton rounded mb-2"></div>
          <div className="h-6 w-96 skeleton rounded"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className={`${theme.glass.heavy} rounded-3xl p-6 lg:col-span-2`}>
            <div className="h-8 w-48 skeleton rounded mb-6"></div>
            <div className="h-80 skeleton rounded-2xl"></div>
          </div>
          
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="h-8 w-48 skeleton rounded mb-6"></div>
            <SkeletonLoader type="list" />
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="h-8 w-48 skeleton rounded mb-6"></div>
            <SkeletonLoader type="list" />
          </div>
          
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="h-8 w-48 skeleton rounded mb-6"></div>
            <SkeletonLoader type="list" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 mt-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl font-bold text-white mb-2 ${theme.animation.fadeInUp}`}>
          {translations[language].healthAuthorityDashboard}
        </h1>
        <p className={`text-xl text-gray-300 ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          {translations[language].monitorVillageHealth}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: translations[language].totalPatients, value: '1,247', icon: Users, color: 'teal' },
          { title: translations[language].todaysTeleconsultations, value: '34', icon: Activity, color: 'blue' },
          { title: translations[language].highRiskCases, value: '18', icon: AlertTriangle, color: 'red' },
          { title: translations[language].vaccinationsDueToday, value: '56', icon: Calendar, color: 'purple' }
        ].map((card, i) => (
          <div 
            key={i} 
            className={`${theme.glass.heavy} rounded-3xl p-6 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                <div className="text-sm text-gray-300">{card.title}</div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br from-${card.color}-500 to-${card.color}-600 rounded-lg flex items-center justify-center`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Health Trends Chart */}
        <div className={`${theme.glass.heavy} rounded-3xl p-6 lg:col-span-2`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{translations[language].healthTrends}</h2>
            <button className={`${theme.button.ghost} px-4 py-2`}>
              <Download className="w-4 h-4 mr-2 inline" />
              {translations[language].export}
            </button>
          </div>
          
          <HealthTrendsChart />
        </div>
        
        {/* Village Health Status */}
        <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
          <h2 className="text-2xl font-bold text-white mb-6">{translations[language].villageHealthStatus}</h2>
          
          <div className="space-y-4">
            {[
              { name: translations[language].kharora, status: translations[language].good, patients: '142' },
              { name: translations[language].birgaon, status: translations[language].critical, patients: '89' },
              { name: translations[language].dhamtari, status: translations[language].stable, patients: '210' },
              { name: translations[language].mahasamund, status: translations[language].good, patients: '176' },
              { name: translations[language].balod, status: translations[language].warning, patients: '134' }
            ].map((village, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <div>
                  <div className="text-white font-medium">{village.name}</div>
                  <div className="text-sm text-gray-400">{village.patients} {translations[language].patients}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  village.status === translations[language].good 
                    ? 'bg-green-500/20 text-green-300' 
                    : village.status === translations[language].stable 
                      ? 'bg-blue-500/20 text-blue-300' 
                      : village.status === translations[language].warning 
                        ? 'bg-yellow-500/20 text-yellow-300' 
                        : 'bg-red-500/20 text-red-300'
                }`}>
                  {village.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity and AI Reports */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
          <h2 className="text-2xl font-bold text-white mb-6">{translations[language].recentActivity}</h2>
          
          <div className="space-y-4">
            {[
              { text: translations[language].newPatientRegistered, time: translations[language].minsAgo5, icon: Users },
              { text: translations[language].teleconsultationCompleted, time: translations[language].minsAgo15, icon: Activity },
              { text: translations[language].highRiskCaseDetected, time: translations[language].minsAgo30, icon: AlertTriangle },
              { text: translations[language].vaccinationDriveScheduled, time: translations[language].hourAgo1, icon: Calendar },
              { text: translations[language].aiSymptomCheckCompleted, time: translations[language].hoursAgo2, icon: Brain }
            ].map((activity, i) => (
              <div 
                key={i} 
                className={`flex items-start gap-3 p-3 rounded-xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center mt-1">
                  <activity.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm">{activity.text}</div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Symptom Reports */}
        <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{translations[language].aiSymptomReports}</h2>
            <button className={`${theme.button.ghost} px-4 py-2`}>
              {translations[language].viewAll}
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { patient: translations[language].sitaDevi, symptoms: translations[language].feverVomiting, risk: translations[language].high, time: '10:30 AM' },
              { patient: translations[language].rameshKumar, symptoms: translations[language].bodyPain, risk: translations[language].low, time: '11:15 AM' },
              { patient: translations[language].anitaSharma, symptoms: translations[language].chestPain, risk: translations[language].critical, time: '09:45 AM' },
              { patient: translations[language].rajeshPatel, symptoms: translations[language].headacheDizziness, risk: translations[language].medium, time: '08:20 AM' }
            ].map((report, i) => (
              <div 
                key={i} 
                className={`p-4 rounded-xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-white mb-1">{report.patient}</div>
                    <div className="text-sm text-gray-300 mb-2">{report.symptoms}</div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        report.risk === translations[language].critical 
                          ? 'bg-red-500/20 text-red-300' 
                          : report.risk === translations[language].high 
                            ? 'bg-orange-500/20 text-orange-300' 
                            : report.risk === translations[language].medium 
                              ? 'bg-yellow-500/20 text-yellow-300' 
                              : 'bg-green-500/20 text-green-300'
                      }`}>
                        {report.risk} {translations[language].risk}
                      </span>
                      <span className="text-xs text-gray-400">{report.time}</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-primary/90 text-white rounded text-xs font-medium hover:shadow-lg">
                    {translations[language].viewDetails}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mt-8`}>
        <h2 className="text-3xl font-bold text-white text-center mb-6">{translations[language].quickActions}</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: translations[language].addPatient, icon: Users },
            { label: translations[language].scheduleVaccination, icon: Calendar },
            { label: translations[language].assignDoctor, icon: Activity },
            { label: translations[language].generateReport, icon: FileText }
          ].map((action, i) => (
            <button 
              key={i} 
              className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <action.icon className="w-8 h-8 text-primary mb-3" />
              <span className="text-white font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}