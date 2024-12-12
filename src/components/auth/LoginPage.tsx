import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Warehouse, User, Lock, AlertCircle, Linkedin } from 'lucide-react';
import { authService } from '../../api/services/authService';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing auth data on login page load
    authService.clearAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.login({ username, password });
      navigate('/', { replace: true });
    } catch (error) {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')] bg-cover bg-center opacity-10"
        style={{ filter: 'blur(8px)' }}
      />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full animate-slideIn">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition-transform duration-300">
              <Warehouse className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">نظام المستودعات</h2>
            <p className="text-blue-200 text-lg">تسجيل الدخول للنظام</p>
          </div>

          {/* Login Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-lg p-4 flex items-center text-red-700 animate-fadeIn">
                  <AlertCircle className="w-5 h-5 ml-2 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-white">
                  اسم المستخدم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pr-10 pl-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                             text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             backdrop-blur-sm"
                    required
                  />
                  <User className="w-5 h-5 text-white/60 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pr-10 pl-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                             text-white placeholder-white/60 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             backdrop-blur-sm"
                    required
                  />
                  <Lock className="w-5 h-5 text-white/60 absolute right-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg
                         hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:ring-offset-2 focus:ring-offset-blue-900 transform transition-all duration-200
                         hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg shadow-blue-500/25"
              >
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </button>

              <div className="text-center text-white/60 text-sm">
                <p>اسم المستخدم: admin</p>
                <p>كلمة المرور: 123456</p>
              </div>
            </form>
          </div>

          {/* Developer Info */}
          <div className="mt-8 text-center">
            <p className="text-blue-200 text-sm mb-2">تطوير</p>
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <a 
                href="https://www.linkedin.com/in/tamer-el-gohary-3a516570/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 ml-2" />
                <div className="text-right">
                  <p className="font-medium">Tamer El Gohary</p>
                  <p className="text-xs text-blue-200">IT Area Manager Tabuk Branch</p>
                </div>
              </a>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-blue-200">
            نظام إدارة المستودعات - جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}