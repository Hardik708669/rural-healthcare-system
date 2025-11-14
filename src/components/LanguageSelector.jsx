import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={selectorRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-300"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'HI'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 backdrop-blur-xl bg-white/15 border border-white/25 rounded-xl shadow-xl z-50">
          <div className="py-2">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-3 ${
                language === 'en' 
                  ? 'bg-teal-500/30 text-white' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🇺🇸</span>
              <span>{translations[language].english}</span>
            </button>
            <button
              onClick={() => handleLanguageChange('hi')}
              className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-3 ${
                language === 'hi' 
                  ? 'bg-teal-500/30 text-white' 
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>🇮🇳</span>
              <span>{translations[language].hindi}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;