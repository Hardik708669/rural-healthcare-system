import React, { useState } from 'react';
import { 
  Users, Activity, AlertTriangle, Calendar, Brain, MapPin, Settings, FileText, 
  Download, Plus, Edit, Trash2, Phone, Bell, TrendingUp, Search, Filter, 
  Eye, CheckCircle, XCircle, User, Heart, Stethoscope, Shield
} from 'lucide-react';
import { theme } from '../theme';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const AdminPanel = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'dashboard', label: translations[language].dashboard, icon: Activity },
    { id: 'users', label: translations[language].userManagement, icon: Users },
    { id: 'symptoms', label: translations[language].aiSymptomReports, icon: Brain },
    { id: 'telemedicine', label: translations[language].telemedicine, icon: Phone },
    { id: 'vaccination', label: translations[language].vaccination, icon: Calendar },
    { id: 'reminders', label: translations[language].reminders, icon: Bell },
    { id: 'analytics', label: translations[language].villageAnalytics, icon: MapPin },
    { id: 'reports', label: translations[language].reports, icon: FileText },
    { id: 'settings', label: translations[language].settings, icon: Settings }
  ];

  const summaryCards = [
    { title: translations[language].totalPatients, value: '1,247', icon: Users, color: 'teal' },
    { title: translations[language].todaysTeleconsultations, value: '34', icon: Phone, color: 'blue' },
    { title: translations[language].highRiskCases, value: '18', icon: AlertTriangle, color: 'red' },
    { title: translations[language].vaccinationsDueToday, value: '56', icon: Calendar, color: 'purple' },
    { title: translations[language].aiSymptomChecksToday, value: '89', icon: Brain, color: 'indigo' },
    { title: translations[language].villagesMonitored, value: '12', icon: MapPin, color: 'green' }
  ];

  const users = [
    { id: 1, name: translations[language].drPriyaSharma, role: translations[language].doctor, status: translations[language].active, lastActive: translations[language].hoursAgo2, avatar: 'PS' },
    { id: 2, name: translations[language].sunitaDevi, role: translations[language].healthWorker, status: translations[language].active, lastActive: translations[language].minsAgo30, avatar: 'SD' },
    { id: 3, name: translations[language].rameshKumar, role: translations[language].patient, status: translations[language].active, lastActive: translations[language].dayAgo1, avatar: 'RK' },
    { id: 4, name: translations[language].drRajeshPatel, role: translations[language].doctor, status: translations[language].inactive, lastActive: translations[language].daysAgo5, avatar: 'RP' },
    { id: 5, name: translations[language].anitaSharma, role: translations[language].patient, status: translations[language].active, lastActive: translations[language].hoursAgo3, avatar: 'AS' }
  ];

  const symptomReports = [
    { id: 1, patient: translations[language].sitaDevi, symptoms: translations[language].feverVomiting, risk: translations[language].high, time: '10:30 AM', status: translations[language].pending },
    { id: 2, patient: translations[language].rameshKumar, symptoms: translations[language].bodyPain, risk: translations[language].low, time: '11:15 AM', status: translations[language].resolved },
    { id: 3, patient: translations[language].anitaSharma, symptoms: translations[language].chestPain, risk: translations[language].critical, time: '09:45 AM', status: translations[language].pending },
    { id: 4, patient: translations[language].rajeshPatel, symptoms: translations[language].headacheDizziness, risk: translations[language].medium, time: '08:20 AM', status: translations[language].inProgress }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{translations[language].adminPanel}</h1>
          <p className="text-gray-300">{translations[language].manageHealthcareSystem}</p>
        </div>

        {/* Tabs */}
        <div className={`${theme.glass.heavy} rounded-xl shadow-lg mb-8 overflow-x-auto`}>
          <div className="flex border-b border-white/20">
            {tabs.map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)} 
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-primary border-b-2 border-primary bg-white/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />{tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {summaryCards.map((card, i) => (
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
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
                <h3 className="text-xl font-bold text-white mb-4">{translations[language].recentActivity}</h3>
                <div className="space-y-3">
                  {[
                    { text: translations[language].newPatientRegistered, time: translations[language].minsAgo5, icon: Users },
                    { text: translations[language].teleconsultationCompleted, time: translations[language].minsAgo15, icon: Phone },
                    { text: translations[language].highRiskCaseDetected, time: translations[language].minsAgo30, icon: AlertTriangle },
                    { text: translations[language].vaccinationDriveScheduled, time: translations[language].hourAgo1, icon: Calendar },
                    { text: translations[language].aiSymptomCheckCompleted, time: translations[language].hoursAgo2, icon: Brain }
                  ].map((activity, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center mt-1">
                          <activity.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-white">{activity.text}</div>
                          <div className="text-xs text-gray-400">{activity.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
                <h3 className="text-xl font-bold text-white mb-4">{translations[language].quickActions}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: translations[language].addUser, icon: Plus },
                    { label: translations[language].exportReport, icon: Download },
                    { label: translations[language].viewAnalytics, icon: TrendingUp },
                    { label: translations[language].settings, icon: Settings }
                  ].map((action, i) => (
                    <button 
                      key={i} 
                      className={`p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
                    >
                      <action.icon className="w-6 h-6 text-white mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-200">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-white">{translations[language].userManagement}</h2>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={translations[language].searchUsers}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button className={`${theme.button.primary} px-4 py-2 rounded-lg flex items-center gap-2`}>
                  <Plus className="w-4 h-4" />{translations[language].addNewUser}
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{translations[language].user}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{translations[language].role}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{translations[language].status}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{translations[language].lastActive}</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">{translations[language].actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-primary/20 border border-primary/30 text-primary rounded-full text-xs font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === translations[language].active 
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                            : 'bg-white/10 text-gray-300 border border-white/20'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{user.lastActive}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-primary hover:bg-primary/20 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-primary hover:bg-primary/20 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-400 hover:bg-red-500/20 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Symptom Reports Tab */}
        {activeTab === 'symptoms' && (
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-white">{translations[language].aiSymptomReports}</h2>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>{translations[language].allRiskLevels}</option>
                    <option>{translations[language].critical}</option>
                    <option>{translations[language].high}</option>
                    <option>{translations[language].medium}</option>
                    <option>{translations[language].low}</option>
                  </select>
                </div>
                <button className={`${theme.button.primary} px-4 py-2 rounded-lg flex items-center gap-2`}>
                  <Download className="w-4 h-4" />{translations[language].export}
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {symptomReports.map(report => (
                <div 
                  key={report.id} 
                  className={`p-4 rounded-xl bg-white/5 ${theme.animation.fadeInUp} animate-delay-${report.id * 100}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-white mb-1">{report.patient}</div>
                      <div className="text-sm text-gray-300 mb-2">{report.symptoms}</div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          report.risk === translations[language].critical 
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                            : report.risk === translations[language].high 
                              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' 
                              : report.risk === translations[language].medium 
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                                : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {report.risk} {translations[language].risk}
                        </span>
                        <span className="text-xs text-gray-400">{report.time}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === translations[language].pending 
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                            : report.status === translations[language].inProgress 
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-500/90 border border-green-500 text-white rounded text-xs font-medium hover:shadow-lg">
                        {translations[language].markResolved}
                      </button>
                      <button className="px-3 py-1 bg-primary/90 border border-primary text-white rounded text-xs font-medium hover:shadow-lg">
                        {translations[language].assignDoctor}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className={`${theme.glass.heavy} rounded-3xl p-6`}>
            <h2 className="text-2xl font-bold text-white mb-6">{translations[language].settingsConfiguration}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">{translations[language].appTheme}</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary">
                    <option>{translations[language].light}</option>
                    <option>{translations[language].dark}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">{translations[language].languageSettings}</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary">
                    <option>{translations[language].english}</option>
                    <option>{translations[language].hindi}</option>
                    <option>{translations[language].telugu}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">{translations[language].notificationPreferences}</label>
                  <div className="space-y-3">
                    {[
                      { label: translations[language].emailNotifications, enabled: true },
                      { label: translations[language].smsAlerts, enabled: true },
                      { label: translations[language].pushNotifications, enabled: false }
                    ].map((pref, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">{pref.label}</span>
                        <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${pref.enabled ? 'bg-primary' : 'bg-gray-600'}`}>
                          <div className={`bg-white w-4 h-4 rounded-full transition-transform ${pref.enabled ? 'translate-x-6' : ''}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">{translations[language].dataPrivacy}</label>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{translations[language].gdprCompliance}</div>
                        <div className="text-sm text-gray-400">{translations[language].allDataEncrypted}</div>
                      </div>
                    </div>
                    <button className={`${theme.button.outline} w-full py-2`}>
                      {translations[language].viewPrivacyPolicy}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">{translations[language].systemInformation}</label>
                  <div className="space-y-3">
                    {[
                      { label: translations[language].version, value: 'v2.1.4' },
                      { label: translations[language].lastUpdate, value: 'Nov 14, 2025' },
                      { label: translations[language].uptime, value: '99.8%' }
                    ].map((info, i) => (
                      <div key={i} className="flex justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-gray-300">{info.label}</span>
                        <span className="text-white font-medium">{info.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/20">
              <button className={`${theme.button.primary} px-6 py-3`}>
                {translations[language].saveSettings}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;