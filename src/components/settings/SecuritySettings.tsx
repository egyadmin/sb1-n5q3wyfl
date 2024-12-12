import React, { useState } from 'react';
import { Shield, Key, Lock, Eye, EyeOff, AlertTriangle, CheckCircle2, History } from 'lucide-react';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  loginNotifications: boolean;
  sessionTimeout: number;
  ipRestrictions: string[];
  failedLoginAttempts: number;
}

export default function SecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    passwordLastChanged: '2024-03-01',
    loginNotifications: true,
    sessionTimeout: 30,
    ipRestrictions: [],
    failedLoginAttempts: 3
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    calculatePasswordStrength(e.target.value);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <div className="mr-3">
              <h3 className="text-lg font-medium">تغيير كلمة المرور</h3>
              <p className="text-sm text-gray-500">آخر تغيير: {settings.passwordLastChanged}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">كلمة المرور الحالية</label>
            <div className="mt-1 relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                className="block w-full pr-10 pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
            <div className="mt-1 relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                onChange={handlePasswordChange}
                className="block w-full pr-10 pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full transition-all ${getStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز خاص
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="mr-3">
              <h3 className="text-lg font-medium">المصادقة الثنائية</h3>
              <p className="text-sm text-gray-500">تأمين إضافي لحسابك</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className={`text-sm ${settings.twoFactorEnabled ? 'text-green-600' : 'text-gray-500'}`}>
              {settings.twoFactorEnabled ? 'مفعل' : 'غير مفعل'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer mr-3">
              <input
                type="checkbox"
                checked={settings.twoFactorEnabled}
                onChange={(e) => setSettings({ ...settings, twoFactorEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Login Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Lock className="w-6 h-6 text-purple-600" />
          </div>
          <div className="mr-3">
            <h3 className="text-lg font-medium">إعدادات تسجيل الدخول</h3>
            <p className="text-sm text-gray-500">تخصيص إعدادات الأمان لتسجيل الدخول</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">إشعارات تسجيل الدخول</label>
              <p className="text-sm text-gray-500">تلقي إشعار عند تسجيل الدخول من جهاز جديد</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.loginNotifications}
                onChange={(e) => setSettings({ ...settings, loginNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">مهلة الجلسة (بالدقائق)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
              min="5"
              max="120"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">عدد محاولات تسجيل الدخول الفاشلة</label>
            <select
              value={settings.failedLoginAttempts}
              onChange={(e) => setSettings({ ...settings, failedLoginAttempts: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value={3}>3 محاولات</option>
              <option value={5}>5 محاولات</option>
              <option value={10}>10 محاولات</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <History className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="mr-3">
            <h3 className="text-lg font-medium">النشاط الأخير</h3>
            <p className="text-sm text-gray-500">آخر عمليات تسجيل الدخول والتغييرات الأمنية</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', text: 'تسجيل دخول ناجح', time: 'قبل 2 ساعة', location: 'الرياض، المملكة العربية السعودية' },
            { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100', text: 'محاولة تسجيل دخول فاشلة', time: 'قبل 1 يوم', location: 'لندن، المملكة المتحدة' },
            { icon: Key, color: 'text-blue-600', bg: 'bg-blue-100', text: 'تغيير كلمة المرور', time: 'قبل 5 أيام', location: 'الرياض، المملكة العربية السعودية' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className={`p-2 rounded-lg ${activity.bg} mt-1`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="mr-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                <p className="text-sm text-gray-500">{activity.location}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}