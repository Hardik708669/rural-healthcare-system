import React, { useState } from 'react';
import { 
  Users, Activity, AlertTriangle, Calendar, Brain, MapPin, Settings, FileText, 
  Download, Plus, Edit, Trash2, Phone, Bell, TrendingUp, Search, Filter, 
  Eye, CheckCircle, XCircle, User, Heart, Stethoscope
} from 'lucide-react';
import { theme } from '../theme';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'symptoms', label: 'AI Symptom Reports', icon: Brain },
    { id: 'telemedicine', label: 'Telemedicine', icon: Phone },
    { id: 'vaccination', label: 'Vaccination', icon: Calendar },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'analytics', label: 'Village Analytics', icon: MapPin },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const summaryCards = [
    { title: 'Total Patients', value: '1,247', icon: Users, color: 'teal' },
    { title: "Today's Teleconsultations", value: '34', icon: Phone, color: 'blue' },
    { title: 'High-Risk Cases', value: '18', icon: AlertTriangle, color: 'red' },
    { title: 'Vaccinations Due Today', value: '56', icon: Calendar, color: 'purple' },
    { title: 'AI Symptom Checks Today', value: '89', icon: Brain, color: 'indigo' },
    { title: 'Villages Monitored', value: '12', icon: MapPin, color: 'green' }
  ];

  const users = [
    { id: 1, name: 'Dr. Priya Sharma', role: 'Doctor', status: 'active', lastActive: '2 hours ago', avatar: 'PS' },
    { id: 2, name: 'Sunita Devi', role: 'Health Worker', status: 'active', lastActive: '30 mins ago', avatar: 'SD' },
    { id: 3, name: 'Ramesh Kumar', role: 'Patient', status: 'active', lastActive: '1 day ago', avatar: 'RK' },
    { id: 4, name: 'Dr. Rajesh Patel', role: 'Doctor', status: 'inactive', lastActive: '5 days ago', avatar: 'RP' },
    { id: 5, name: 'Anita Sharma', role: 'Patient', status: 'active', lastActive: '3 hours ago', avatar: 'AS' }
  ];

  const symptomReports = [
    { id: 1, patient: 'Sita Devi', symptoms: 'Fever + Vomiting', risk: 'High', time: '10:30 AM', status: 'pending' },
    { id: 2, patient: 'Ramesh Kumar', symptoms: 'Body Pain', risk: 'Low', time: '11:15 AM', status: 'resolved' },
    { id: 3, patient: 'Anita Sharma', symptoms: 'Chest Pain', risk: 'Critical', time: '09:45 AM', status: 'pending' },
    { id: 4, patient: 'Rajesh Patel', symptoms: 'Headache + Dizziness', risk: 'Medium', time: '08:20 AM', status: 'in-progress' }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-300">Manage healthcare system operations</p>
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
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { text: 'New patient registered: Sita Devi', time: '5 mins ago', icon: Users },
                    { text: 'Teleconsultation completed with Dr. Patel', time: '15 mins ago', icon: Phone },
                    { text: 'High-risk case detected in Birgaon village', time: '30 mins ago', icon: AlertTriangle },
                    { text: 'Vaccination drive scheduled for tomorrow', time: '1 hour ago', icon: Calendar },
                    { text: 'AI symptom check completed for 5 patients', time: '2 hours ago', icon: Brain }
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
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Add User', icon: Plus },
                    { label: 'Export Report', icon: Download },
                    { label: 'View Analytics', icon: TrendingUp },
                    { label: 'Settings', icon: Settings }
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
              <h2 className="text-2xl font-bold text-white">User Management</h2>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <button className={`${theme.button.primary} px-4 py-2 rounded-lg flex items-center gap-2`}>
                  <Plus className="w-4 h-4" />Add New User
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Last Active</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Actions</th>
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
                          user.status === 'active' 
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
              <h2 className="text-2xl font-bold text-white">AI Symptom Reports</h2>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>All Risk Levels</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <button className={`${theme.button.primary} px-4 py-2 rounded-lg flex items-center gap-2`}>
                  <Download className="w-4 h-4" />Export
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
                          report.risk === 'Critical' 
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                            : report.risk === 'High' 
                              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' 
                              : report.risk === 'Medium' 
                                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                                : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {report.risk} Risk
                        </span>
                        <span className="text-xs text-gray-400">{report.time}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'pending' 
                            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                            : report.status === 'in-progress' 
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-green-500/90 border border-green-500 text-white rounded text-xs font-medium hover:shadow-lg">
                        Mark Resolved
                      </button>
                      <button className="px-3 py-1 bg-primary/90 border border-primary text-white rounded text-xs font-medium hover:shadow-lg">
                        Assign Doctor
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
            <h2 className="text-2xl font-bold text-white mb-6">Settings & Configuration</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">App Theme</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary">
                    <option>Light</option>
                    <option>Dark</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Language Settings</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-primary">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Notification Preferences</label>
                  <div className="space-y-3">
                    {[
                      { label: 'Email Notifications', enabled: true },
                      { label: 'SMS Alerts', enabled: true },
                      { label: 'Push Notifications', enabled: false }
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
                  <label className="block text-sm font-medium text-white mb-2">Data Privacy</label>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">GDPR Compliance</div>
                        <div className="text-sm text-gray-400">All data is encrypted and stored securely</div>
                      </div>
                    </div>
                    <button className={`${theme.button.outline} w-full py-2`}>
                      View Privacy Policy
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">System Information</label>
                  <div className="space-y-3">
                    {[
                      { label: 'Version', value: 'v2.1.4' },
                      { label: 'Last Update', value: 'Nov 14, 2025' },
                      { label: 'Uptime', value: '99.8%' }
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
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;