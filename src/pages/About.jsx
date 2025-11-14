import { Heart, Target, Eye, Zap, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="p-6 mt-20 animate-fadeInUp">
      <h1 className="text-3xl font-bold text-white">About Healthconnect-Rural</h1>
      <p className="text-gray-300 mt-2">
        Empowering rural communities with AI-driven healthcare solutions.
      </p>

      {/* Mission and Vision */}
      <div className="grid md:grid-cols-2 gap-6 mt-8 staggered-animation">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-xl font-semibold text-white">Our Mission</h2>
          </div>
          <p className="text-gray-300">
            To provide uninterrupted healthcare access to underserved rural communities through 
            innovative AI-powered solutions, telemedicine, and smart health reminders.
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 glass-card">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-purple" />
            <h2 className="text-xl font-semibold text-white">Our Vision</h2>
          </div>
          <p className="text-gray-300">
            A world where geographic barriers do not determine healthcare access, and every 
            individual receives timely, quality medical care regardless of their location.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-6 staggered-animation">
          {[
            { icon: Heart, title: 'AI Symptom Checker', desc: 'Instant triage and diagnosis assistance' },
            { icon: Users, title: 'Telemedicine', desc: 'Remote doctor consultations via video' },
            { icon: Zap, title: 'Smart Reminders', desc: 'Vaccination and medication alerts' },
            { icon: Globe, title: 'Offline-First', desc: 'Works without internet connectivity' },
            { icon: Target, title: 'Emergency Detection', desc: 'Automatic critical symptom alerts' },
            { icon: Heart, title: 'Multilingual Support', desc: 'Available in local languages' }
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
        <h2 className="text-2xl font-bold text-white mb-4">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { value: '12+', label: 'Villages Served' },
            { value: '1,247', label: 'Patients Helped' },
            { value: '92%', label: 'Vaccination Coverage' }
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