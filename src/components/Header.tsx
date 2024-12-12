import React, { useState } from 'react';
import { Search, User, Settings, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { authService } from '../api/services/authService';
import { useNavigate } from 'react-router-dom';
import SettingsModal from './settings/SettingsModal';
import NotificationCenter from './notifications/NotificationCenter';

export default function Header() {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="بحث..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <NotificationCenter />
          
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 rtl:space-x-reverse p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="text-right">
                <p className="text-sm font-medium text-red-600">Admin User</p>
                <p className="text-xs text-red-500">مدير النظام</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={handleProfileClick}
                  className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  الملف الشخصي
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  الإعدادات
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="w-4 h-4 ml-2" />
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSettings && (
        <SettingsModal 
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </header>
  );
}