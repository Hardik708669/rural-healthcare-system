import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react';
import { login, saveUserProfile } from '../utils/auth';

const Signup = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: '',
    role: 'Patient' // Default role is Patient
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      // Create user object
      const newUser = {
        id: 'user-' + Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role, // Use selected role
        avatar: null,
        createdAt: new Date().toISOString()
      };
      
      // Save user to IndexedDB
      await saveUserProfile(newUser);
      
      // Set authentication status in localStorage
      login();
      
      // Save user data to localStorage
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // Redirect to home page after signup
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create account. Please try again.');
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
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-300">Join Healthconnect today to access healthcare services</p>
        </div>

        {/* Signup Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-8 glass-card">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Type Selection */}
            <div className="animate-fadeInUp animate-delay-100">
              <label className="block text-sm font-medium text-white mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'Patient'})}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                    formData.role === 'Patient'
                      ? 'bg-teal-500/30 border-teal-500 text-white'
                      : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>User</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'Admin'})}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                    formData.role === 'Admin'
                      ? 'bg-purple-500/30 border-purple-500 text-white'
                      : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="animate-fadeInUp animate-delay-200">
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="animate-fadeInUp animate-delay-300">
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="animate-fadeInUp animate-delay-400">
              <label className="block text-sm font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
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

            {/* Confirm Password */}
            <div className="animate-fadeInUp animate-delay-500">
              <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start animate-fadeInUp animate-delay-600">
              <input 
                type="checkbox" 
                className="w-4 h-4 mt-1 text-primary border-gray-300 rounded focus:ring-primary bg-white/10" 
                required
              />
              <label className="ml-2 text-sm text-gray-300">
                I agree to the <a href="#" className="text-primary hover:text-teal-300">Terms of Service</a> and <a href="#" className="text-primary hover:text-teal-300">Privacy Policy</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-3 backdrop-blur-xl bg-gradient-teal border border-white/30 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg animate-scaleIn"
            >
              Create {formData.role} Account <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center animate-fadeInUp animate-delay-700">
            <p className="text-sm text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-teal-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center animate-fadeInUp animate-delay-800">
          <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center justify-center">
            <ArrowRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;