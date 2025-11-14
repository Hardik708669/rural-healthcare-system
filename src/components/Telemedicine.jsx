import React, { useState } from 'react';
import { Video, Phone, Mail } from 'lucide-react';
import { theme } from '../theme';

const Telemedicine = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <div className="min-h-screen flex items-center px-16 pt-32">
      <div className="max-w-2xl">
        <h1 className="text-7xl font-light text-white mb-8 leading-tight">
          Let's
          <br />
          talk
        </h1>
        <p className="text-white/60 text-xl mb-12">
          / Get in touch
        </p>
        
        <div className="space-y-8 text-white/80">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm text-white/60">Email</span>
            </div>
            <div className="text-lg">hello@healthconnect.rural</div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm text-white/60">Location</span>
            </div>
            <div className="text-lg">Rural India, Nationwide</div>
          </div>
          
          <div className="text-sm text-white/60 space-x-4">
            <span>WhatsApp</span>
            <span>Telegram</span>
            <span>Emergency</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
      
      <div className="ml-auto max-w-md w-full">
        <div className="space-y-6">
          <div>
            <label className="block text-white/60 text-sm mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-3 focus:outline-none focus:border-white/60"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-white/60 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-3 focus:outline-none focus:border-white/60"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-white/60 text-sm mb-2">Message</label>
            <textarea
              placeholder="Tell us about your health needs..."
              rows={4}
              className="w-full bg-transparent border-b border-white/20 text-white placeholder-white/40 py-3 resize-none focus:outline-none focus:border-white/60"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          
          <button className={`${theme.button.primary} w-full`}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Telemedicine;