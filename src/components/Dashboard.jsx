import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Brain, Bell, BarChart3, Globe, Wifi, Shield } from 'lucide-react';
import { theme } from '../theme';

const Dashboard = ({ userRole }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 pt-32 pb-20 overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
              AI-Powered Rural
              <br />
              <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Healthcare Continuity</span>
              <br />
              System
            </h1>
            
            <p className="text-xl text-white/70 mb-10 max-w-xl">
              Telemedicine + AI Symptom Check + Vaccination Reminders + Health Dashboards
            </p>
            
            <div className={`${theme.glass.card} ${theme.glass.strong} rounded-3xl p-6 inline-block shadow-2xl`}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/telemedicine"
                  className={`${theme.button.primary} px-8 py-4 rounded-full font-medium`}
                >
                  Start Teleconsultation
                </Link>
                <Link
                  to="/ai-assistant"
                  className={`${theme.button.secondary} px-8 py-4 rounded-full font-medium`}
                >
                  AI Symptom Check
                </Link>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-3xl blur-2xl"></div>
              <div className={`${theme.glass.card} ${theme.glass.strong} rounded-3xl p-8 h-full flex items-center justify-center`}>
                <Activity className="w-48 h-48 text-white/80" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`${theme.glass.card} ${theme.glass.cardHover} p-8`}>
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">AI Telemedicine</h3>
              <p className="text-white/60">Connect with doctors remotely through AI-powered video consultations and instant triage.</p>
            </div>
            
            <div className={`${theme.glass.card} ${theme.glass.cardHover} p-8`}>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">AI Diagnostic Assistant</h3>
              <p className="text-white/60">Advanced symptom analysis with emergency detection and multilingual voice support.</p>
            </div>
            
            <div className={`${theme.glass.card} ${theme.glass.cardHover} p-8`}>
              <div className="bg-gradient-to-br from-cyan-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Smart Reminders</h3>
              <p className="text-white/60">Automated vaccination schedules, medication alerts, and follow-up notifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light text-white text-center mb-16">
            Why <span className="font-semibold">Healthconnect-Rural</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className={`${theme.glass.card} ${theme.glass.strong} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Brain className="w-10 h-10 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">AI-based Triage</h4>
              <p className="text-white/60 text-sm">Intelligent patient assessment and prioritization</p>
            </div>
            
            <div className="text-center">
              <div className={`${theme.glass.card} ${theme.glass.strong} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Globe className="w-10 h-10 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Multilingual Voice</h4>
              <p className="text-white/60 text-sm">Support in Hindi, Telugu, Tamil & more</p>
            </div>
            
            <div className="text-center">
              <div className={`${theme.glass.card} ${theme.glass.strong} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Wifi className="w-10 h-10 text-cyan-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Offline Mode</h4>
              <p className="text-white/60 text-sm">Works without internet in remote areas</p>
            </div>
            
            <div className="text-center">
              <div className={`${theme.glass.card} ${theme.glass.strong} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <BarChart3 className="w-10 h-10 text-teal-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Health Dashboard</h4>
              <p className="text-white/60 text-sm">Real-time monitoring and analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 px-6 md:px-16 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/telemedicine" className="hover:text-white transition-colors">Telemedicine</Link>
            <Link to="/ai-assistant" className="hover:text-white transition-colors">AI Check</Link>
            <Link to="/monitoring" className="hover:text-white transition-colors">Dashboard</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="text-center text-white/40 text-sm">
            © 2025 Healthconnect-Rural. AI-Powered Healthcare for All.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;