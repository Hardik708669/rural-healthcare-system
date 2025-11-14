import Card from "../components/Card";
import ChatbotWidget from "../components/ChatbotWidget";
import { theme } from "../theme";
import { Brain, Video, Bell, Activity, MapPin, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="px-6 mt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mb-16 bg-gradient-to-br from-green-900 via-teal-900 to-emerald-900 p-8 md:p-12">
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI-Powered Rural <span className="bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">Healthcare</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Bridging healthcare gaps in underserved communities with cutting-edge AI technology, telemedicine, and real-time health monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/50">
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-white/30 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Empowering Rural Healthcare
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Our comprehensive platform provides essential healthcare services even in the most remote locations.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              icon: Video, 
              title: "Telemedicine", 
              desc: "Connect with doctors remotely via secure video consultations", 
              to: "/telemedicine" 
            },
            { 
              icon: Brain, 
              title: "AI Symptom Checker", 
              desc: "Describe symptoms and get AI-powered health insights", 
              to: "/symptoms" 
            },
            { 
              icon: Bell, 
              title: "Health Reminders", 
              desc: "Never miss important health schedules and appointments", 
              to: "/reminders" 
            },
            { 
              icon: Activity, 
              title: "Health Dashboard", 
              desc: "Monitor village health metrics and manage resources", 
              to: "/dashboard" 
            },
            { 
              icon: MapPin, 
              title: "Village Analytics", 
              desc: "Real-time health data visualization for authorities", 
              to: "/dashboard" 
            },
            { 
              icon: Users, 
              title: "Community Care", 
              desc: "Support for health workers and patients alike", 
              to: "/about" 
            }
          ].map((feature, i) => (
            <Card 
              key={i}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              to={feature.to}
            />
          ))}
        </div>
      </div>

      {/* Statistics Dashboard Preview */}
      <div className="backdrop-blur-2xl bg-white/15 border border-white/25 rounded-3xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Real-Time Health Impact
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { value: "16,000+", label: "Health Workers Supported" },
            { value: "12", label: "Villages Monitored" },
            { value: "98%", label: "Service Uptime" },
            { value: "24/7", label: "AI Availability" }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="text-3xl font-bold text-teal-400 mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Trusted by Healthcare Professionals
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "This platform has revolutionized how we deliver healthcare in remote areas. The AI symptom checker is incredibly accurate.",
              author: "Dr. Priya Sharma",
              role: "Rural Health Director"
            },
            {
              quote: "During the health worker strike, this system kept essential services running. A true lifesaver for our community.",
              author: "Ramesh Kumar",
              role: "Village Health Worker"
            },
            {
              quote: "The telemedicine feature connects us with specialists we never had access to before. Game-changing technology.",
              author: "Sunita Devi",
              role: "Community Health Nurse"
            }
          ].map((testimonial, i) => (
            <div 
              key={i} 
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
            >
              <div className="text-teal-400 text-5xl mb-4">"</div>
              <p className="text-gray-300 mb-6">{testimonial.quote}</p>
              <div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="backdrop-blur-2xl bg-white/15 border border-white/25 rounded-3xl p-8 md:p-12 text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Rural Healthcare?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of healthcare professionals and communities already using our platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/50">
            Start Free Trial
          </button>
          <button className="px-8 py-4 border-2 border-teal-500 text-teal-400 font-semibold rounded-xl hover:bg-teal-500/10 transition-all duration-300">
            Schedule Demo
          </button>
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}