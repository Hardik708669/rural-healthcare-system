import Card from "../components/Card";
import ChatbotWidget from "../components/ChatbotWidget";
import { theme } from "../theme";
import { Brain, Video, Bell, Activity, MapPin, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="px-6 mt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mb-16">
        {/* Background Elements */}
        <div className={`${theme.blur.large} -top-40 -left-40`}></div>
        <div className={`${theme.blur.medium} -bottom-40 -right-40`}></div>
        
        <div className={`${theme.glass.heavy} p-8 md:p-12 backdrop-blur-2xl`}>
          <div className="relative z-10 max-w-4xl">
            <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 ${theme.animation.fadeInUp}`}>
              AI-Powered Rural <span className={theme.colors.gradientText}>Healthcare</span>
            </h1>
            <p className={`text-xl text-gray-300 mb-8 max-w-2xl ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
              Bridging healthcare gaps in underserved communities with cutting-edge AI technology, telemedicine, and real-time health monitoring.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 ${theme.animation.fadeInUp} ${theme.animation.delay200}`}>
              <button className={`${theme.button.primary} px-8 py-4`}>
                Get Started
              </button>
              <button className={`${theme.button.outline} px-8 py-4`}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="mb-16">
        <h2 className={`text-3xl font-bold text-white text-center mb-4 ${theme.animation.fadeInUp}`}>
          Empowering Rural Healthcare
        </h2>
        <p className={`text-gray-300 text-center mb-12 max-w-2xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
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
              delay={`animate-delay-${(i + 1) * 100}`}
            />
          ))}
        </div>
      </div>

      {/* Statistics Dashboard Preview */}
      <div className={`${theme.glass.heavy} rounded-3xl p-8 mb-16`}>
        <h2 className={`text-3xl font-bold text-white text-center mb-12 ${theme.animation.fadeInUp}`}>
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
              className={`text-center p-6 rounded-2xl bg-white/5 border border-white/10 ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <h2 className={`text-3xl font-bold text-white text-center mb-12 ${theme.animation.fadeInUp}`}>
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
              className={`${theme.glass.medium} p-6 rounded-2xl ${theme.animation.fadeInUp} animate-delay-${(i + 1) * 100}`}
            >
              <div className="text-primary text-5xl mb-4">"</div>
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
      <div className={`${theme.glass.heavy} rounded-3xl p-8 md:p-12 text-center mb-16`}>
        <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 ${theme.animation.fadeInUp}`}>
          Ready to Transform Rural Healthcare?
        </h2>
        <p className={`text-xl text-gray-300 mb-8 max-w-2xl mx-auto ${theme.animation.fadeInUp} ${theme.animation.delay100}`}>
          Join thousands of healthcare professionals and communities already using our platform.
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${theme.animation.fadeInUp} ${theme.animation.delay200}`}>
          <button className={`${theme.button.primary} px-8 py-4`}>
            Start Free Trial
          </button>
          <button className={`${theme.button.outline} px-8 py-4`}>
            Schedule Demo
          </button>
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}