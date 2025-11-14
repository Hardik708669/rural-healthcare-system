import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, User } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
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
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to access your healthcare dashboard</p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-xl p-8 glass-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="animate-fadeInUp animate-delay-200">
              <label className="block text-sm font-medium text-white mb-3">Sign in as</label>
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
                  👤 User
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
                  🔐 Admin
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="animate-fadeInUp animate-delay-300">
              <label className="block text-sm font-medium text-white mb-2">Email</label>
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
              <label className="block text-sm font-medium text-white mb-2">Password</label>
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
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:text-teal-300">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-3 backdrop-blur-xl bg-gradient-teal border border-white/30 text-white rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg animate-scaleIn"
            >
              Sign In <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center animate-fadeInUp animate-delay-600">
            <p className="text-sm text-gray-300">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-teal-300 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center animate-fadeInUp animate-delay-700">
          <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center justify-center">
            <ArrowRight className="w-4 h-4 rotate-180 mr-1" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;