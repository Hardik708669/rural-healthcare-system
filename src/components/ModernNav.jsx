import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '../theme';
import { Menu, X, User } from 'lucide-react';
import NotificationIcon from './NotificationIcon';
import UserProfile from './UserProfile';

const ModernNav = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Telemedicine', path: '/telemedicine' },
    { name: 'AI Symptom', path: '/symptoms' },
    { name: 'Reminders', path: '/reminders' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' }
  ];

  // Check authentication status
  const checkAuthStatus = () => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  };

  // For demo purposes, we'll simulate authentication state
  // In a real app, this would come from your auth context or state management
  useEffect(() => {
    // Check initial auth status
    checkAuthStatus();
    
    // Listen for storage changes (when user logs in/out in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'isAuthenticated') {
        checkAuthStatus();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom auth events (when user logs in/out in same tab)
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-dark/90 border-b border-white/20 shadow-xl ${theme.animation.fadeInDown}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${theme.animation.scaleIn} hover:scale-110 transition-transform duration-300`}>
              H
            </div>
            <span className={`text-white font-bold text-xl ${theme.animation.fadeIn} transition-colors duration-300 hover:text-primary`}>Healthconnect</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-gray-300 text-sm font-medium">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`hover:text-primary transition-colors duration-300 transform hover:scale-105 ${isActive(item.path) ? 'text-primary font-semibold' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Auth Buttons and Notification Icon */}
          <div className="hidden md:flex items-center gap-4">
            <NotificationIcon />
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <>
                <Link to="/login" className={`px-4 py-2 text-white hover:text-primary transition-colors duration-300 transform hover:scale-105`}>
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className={`px-4 py-2 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg text-sm font-semibold hover:from-teal-600 hover:to-green-700 transition-all duration-300 shadow-lg ${theme.animation.scaleIn} hover:shadow-xl transform hover:scale-105 active:scale-95`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 transform transition-transform duration-300 hover:scale-110 active:scale-95"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`py-2 ${isActive(item.path) ? 'text-primary font-semibold' : 'text-gray-300'} transition-colors duration-300 transform hover:scale-105`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex gap-3 pt-4">
                {isAuthenticated ? (
                  <div className="w-full text-center py-2 text-white">
                    <UserProfile />
                  </div>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="flex-1 px-4 py-2 text-center text-white border border-white/30 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      className="flex-1 px-4 py-2 text-center bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNav;