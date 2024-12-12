import React, { useState } from 'react';
import { X, Settings, Bell, Moon, Sun, Globe2, Shield, Database, Palette } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import BackupSettings from './BackupSettings';
import SecuritySettings from './SecuritySettings';
import DatabaseConnection from '../sajco/DatabaseConnection';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { language, setLanguage } = useLanguage();
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'backup' | 'database'>('general');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">الإعدادات</h2>
              <p className="text-sm text-gray-500">تخصيص إعدادات النظام</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'general'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            الإعدادات العامة
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'security'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            الأمان والخصوصية
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'backup'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            النسخ الاحتياطي
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'database'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            قاعدة البيانات
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Theme Settings */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-yellow-50 rounded-lg">
                      {theme === 'light' ? (
                        <Sun className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <Moon className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">المظهر</h3>
                      <p className="text-sm text-gray-500">تخصيص مظهر التطبيق</p>
                    </div>
                  </div>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="light">فاتح</option>
                    <option value="dark">داكن</option>
                    <option value="system">تلقائي</option>
                  </select>
                </div>
              </div>

              {/* Language Settings */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Globe2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">اللغة</h3>
                      <p className="text-sm text-gray-500">تغيير لغة التطبيق</p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'ar' | 'en')}
                    className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Bell className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">الإشعارات</h3>
                      <p className="text-sm text-gray-500">إدارة إعدادات الإشعارات</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'backup' && <BackupSettings />}
          {activeTab === 'database' && <DatabaseConnection />}
        </div>
      </div>
    </div>
  );
}