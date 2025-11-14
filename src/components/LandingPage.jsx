import React from 'react';
import { ArrowRight, Activity, Brain, Bell, Video, Shield, Globe, CheckCircle, Star, MessageSquare, Calendar, Stethoscope, Users, BarChart3, Wifi, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { theme } from '../theme';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-navy">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-hero pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={theme.animation.fadeInLeft}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                AI-Powered Rural Healthcare Continuity System
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Providing Telemedicine, AI Diagnosis & Smart Health Reminders
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/telemedicine" className={`${theme.button.primary} ${theme.animation.scaleIn}`}>
                  Start Teleconsultation <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/symptoms" className={`${theme.button.secondary} ${theme.animation.scaleIn} ${theme.animation.delay100}`}>
                  AI Symptom Check
                </Link>
              </div>
            </div>
            <div className={`${theme.glass.card} ${theme.glass.strong} shadow-2xl ${theme.animation.fadeInRight}`}>
              <div className="space-y-4">
                {[
                  { icon: Video, title: 'Telemedicine', desc: 'Remote doctor support' },
                  { icon: Brain, title: 'AI Diagnosis', desc: 'Instant triage assistance' },
                  { icon: Bell, title: 'Smart Reminders', desc: 'Vaccination & medicine alerts' }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-4 p-4 ${theme.glass.card} ${theme.glass.strong} glass-card`}>
                    <div className="w-12 h-12 bg-gradient-teal rounded-xl flex items-center justify-center shadow-lg animate-float">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-gray-300 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Features Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-xl text-gray-300">Complete healthcare continuity solution</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Video, title: 'AI Telemedicine', desc: 'Real-time remote doctor support', gradient: 'gradient-teal' },
              { icon: Brain, title: 'AI Symptom Checker', desc: 'Instant triage & diagnosis assistance', gradient: 'gradient-purple' },
              { icon: Bell, title: 'Smart Reminders', desc: 'Vaccination, medicine & follow-up alerts', gradient: 'gradient-teal' }
            ].map((feature, i) => (
              <div key={i} className={`group ${theme.glass.card} ${theme.glass.strong} hover:shadow-2xl transition-all hover:-translate-y-2 glass-card`}>
                <div className={`w-16 h-16 bg-${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Healthconnect-Rural */}
      <section className="py-20 bg-navy-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Healthconnect-Rural?</h2>
            <p className="text-xl text-gray-300">Built for rural healthcare continuity</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'AI-Powered Triage', desc: 'Smart patient prioritization' },
              { icon: MessageSquare, title: 'Multilingual Voice Assistant', desc: 'Hindi, Telugu, Tamil support' },
              { icon: Users, title: 'Designed for Rural Users', desc: 'Simple & accessible interface' },
              { icon: Wifi, title: 'Offline-First Technology', desc: 'Works without internet' },
              { icon: BarChart3, title: 'Government-Ready Dashboards', desc: 'Real-time health metrics' },
              { icon: Lock, title: 'Secure & Privacy-Focused', desc: 'End-to-end encryption' }
            ].map((item, i) => (
              <div key={i} className={`flex gap-4 p-6 ${theme.glass.card} ${theme.glass.strong} hover:shadow-lg transition-all hover:bg-white/15 glass-card`}>
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg hover:rotate-12 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Telemedicine Workflow */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Telemedicine Workflow</h2>
              <p className="text-gray-300 mb-8">Simple 3-step process for remote healthcare</p>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'User Describes Symptoms', desc: 'Patient or health worker inputs symptoms' },
                  { step: '2', title: 'AI Gives Triage Level', desc: 'System prioritizes urgency automatically' },
                  { step: '3', title: 'Doctor Teleconsults if Needed', desc: 'Connect with specialist via video' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-teal text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${theme.glass.card} ${theme.glass.strong} p-12 flex items-center justify-center h-96`}>
              <Stethoscope className="w-32 h-32 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI Symptom Check Section */}
      <section className="py-20 bg-navy-dark">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`${theme.glass.card} ${theme.glass.strong} p-12 relative`}>
              <div className="absolute top-8 left-8 w-4 h-4 bg-purple rounded-full animate-ping"></div>
              <div className={`${theme.glass.card} ${theme.glass.strong} p-6 shadow-lg`}>
                <div className="flex items-start gap-3 mb-4">
                  <Brain className="w-8 h-8 text-purple" />
                  <div>
                    <div className="font-semibold text-white mb-2">AI Analysis</div>
                    <div className="text-sm text-gray-300">"Fever + headache detected"</div>
                  </div>
                </div>
                <div className={`${theme.glass.card} bg-purple/20 border border-purple/30 rounded-lg p-4 text-sm text-gray-200`}>
                  Possible conditions: Viral infection, Malaria
                  <br />
                  Urgency: Medium
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">AI Symptom Checker</h2>
              <p className="text-gray-300 mb-6">
                Our AI-powered symptom checker provides instant triage and diagnosis assistance for patients and health workers.
              </p>
              <div className="space-y-4">
                {['Instant symptom analysis', 'Emergency detection', 'Multilingual support', 'Works offline'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Smart Reminder Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Smart Reminder System</h2>
            <p className="text-xl text-gray-300">Never miss important health schedules</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: 'Vaccination Reminder', desc: 'Next dose: Polio - 15 Jan 2025', color: 'blue' },
              { icon: Activity, title: 'Prenatal Checkup', desc: 'Scheduled: 20 Jan 2025, 10 AM', color: 'pink' },
              { icon: Bell, title: 'Medicine Time', desc: 'Take BP medication at 8:00 AM', color: 'green' }
            ].map((item, i) => (
              <div key={i} className={`${theme.glass.card} ${theme.glass.strong} hover:shadow-lg transition-all hover:bg-white/15 glass-card hover:scale-105`}>
                <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4 shadow-lg animate-float">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Dashboard Preview */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Health Authority Dashboard</h2>
            <p className="text-xl text-gray-300">Real-time monitoring for government officials</p>
          </div>
          <div className={`${theme.glass.card} ${theme.glass.strong} p-8`}>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Villages Monitored', value: '12', icon: Users },
                { label: 'Active Patients', value: '1,247', icon: Activity },
                { label: 'Vaccination Coverage', value: '92%', icon: CheckCircle },
                { label: 'Active Alerts', value: '3', icon: Bell }
              ].map((stat, i) => (
                <div key={i} className={`${theme.glass.card} ${theme.glass.strong} text-center hover:bg-white/15 transition-all glass-card hover:scale-105`}>
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 animate-float" />
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-20 bg-navy-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What People Say</h2>
            <p className="text-xl text-gray-300">Trusted by healthcare workers and patients</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sunita Devi', role: 'Village Health Worker', text: 'This system helped us continue care during the strike. Essential for rural areas.' },
              { name: 'Dr. Rajesh Kumar', role: 'Telemedicine Doctor', text: 'I can now reach patients in remote tribal regions easily through this platform.' },
              { name: 'Ramesh Patel', role: 'Patient', text: 'Got my vaccination reminder on time. No need to travel 50km to the clinic.' }
            ].map((testimonial, i) => (
              <div key={i} className={`${theme.glass.card} ${theme.glass.strong} hover:bg-white/15 transition-all glass-card hover:scale-105`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-200 mb-4">"{testimonial.text}"</p>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-300">Have questions? We're here to help</p>
            </div>
            <div className={`${theme.glass.card} ${theme.glass.strong} shadow-xl hover:bg-white/15 transition-all`}>
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully! Our team will contact you soon.'); }} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                <button type="submit" className={`${theme.button.primary} w-full`}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-navy-dark text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/telemedicine" className="hover:text-primary transition-colors">Telemedicine</Link>
            <Link to="/symptoms" className="hover:text-primary transition-colors">AI Check</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="text-center text-sm text-gray-400">
            © 2025 Healthconnect-Rural — AI for Healthcare Continuity
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;