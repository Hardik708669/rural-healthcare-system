import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User } from 'lucide-react';
import { login, findUserByEmail } from '../utils/auth';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';

const Login = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError(translations[language].enterEmailAndPassword);
      return;
    }
    
    try {
      // In a real app, this would validate against IndexedDB or an API
      // For demo purposes, we'll just check if the user exists in IndexedDB
      const user = await findUserByEmail(email);
      
      // For demo, we'll allow login with any email/password
      // In a real app, you would validate the password
      
      // Set authentication status in localStorage
      login();
      
      // Save user data to localStorage
      const userData = user || {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        role: userType === 'admin' ? 'Admin' : 'Patient',
        avatar: null
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Redirect based on user type
      if (userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(translations[language].invalidEmailOrPassword);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-dark-green">
      <div className="max-w-md w-full animate-fadeInUp">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeInUp animate-delay-100">
          <div className="w-16 h-16 bg-gradient-teal rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 animate-scaleIn">
            H
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{translations[language].welcomeBack}</h1>
          <p className="text-gray-300">{translations[language].loginToContinue}</p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-8 glass-card">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="animate-fadeInUp animate-delay-200">
              <label className="block text-sm font-medium text-white mb-3">{translations[language].signInAs}</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('user')}
                  className={`p-3 rounded-xl font-medium transition-all ${
                    userType === 'user'
                      ? 'bg-gradient-teal text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  👤 {translations[language].user}
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('admin')}
                  className={`p-3 rounded-xl font-medium transition-all ${
                    userType === 'admin'
                      ? 'bg-gradient-teal text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  🔐 {translations[language].admin}
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="animate-fadeInUp animate-delay-300">
              <label className="block text-sm font-medium text-white mb-2">{translations[language].email}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="animate-fadeInUp animate-delay-400">
              <label className="block text-sm font-medium text-white mb-2">{translations[language].password}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between animate-fadeInUp animate-delay-500">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary bg-white/10" 
                />
                <span className="ml-2 text-sm text-gray-300">{translations[language].rememberMe}</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-teal-300">{translations[language].forgotPassword}</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-3 backdrop-blur-xl bg-gradient-teal border border-white/30 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg animate-scaleIn"
            >
              {translations[language].loginBtn} <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center animate-fadeInUp animate-delay-600">
            <p className="text-sm text-gray-300">
              {translations[language].dontHaveAccount}{' '}
              <Link to="/signup" className="text-primary hover:text-teal-300 font-semibold">
                {translations[language].signUpHere}
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center animate-fadeInUp animate-delay-700">
          <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center justify-center">
            <ArrowRight className="w-4 h-4 rotate-180 mr-1" /> {translations[language].backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;