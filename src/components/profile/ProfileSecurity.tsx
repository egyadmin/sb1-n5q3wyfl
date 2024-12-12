import React, { useState } from 'react';
import { Key, Shield, Smartphone, History } from 'lucide-react';

export default function ProfileSecurity() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="border-b pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">كلمة المرور</h3>
              <p className="text-sm text-gray-500">تغيير كلمة المرور الخاصة بك</p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
          >
            تغيير كلمة المرور
          </button>
        </div>

        {showPasswordForm && (
          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">كلمة المرور الحالية</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                حفظ التغييرات
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-b pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-green-50 rounded-lg">
              <Smartphone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">المصادقة الثنائية</h3>
              <p className="text-sm text-gray-500">تأمين إضافي لحسابك</p>
            </div>
          </div>
          <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200">
            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
          </button>
        </div>
      </div>

      {/* Login History */}
      <div>
        <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <History className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium">سجل تسجيل الدخول</h3>
            <p className="text-sm text-gray-500">آخر عمليات تسجيل الدخول لحسابك</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { device: 'Chrome على Windows', location: 'الرياض، المملكة العربية السعودية', time: 'قبل 2 ساعة' },
            { device: 'Safari على iPhone', location: 'جدة، المملكة العربية السعودية', time: 'قبل 1 يوم' },
            { device: 'Firefox على MacOS', location: 'الدمام، المملكة العربية السعودية', time: 'قبل 3 أيام' }
          ].map((session, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{session.device}</p>
                <p className="text-sm text-gray-500">{session.location}</p>
              </div>
              <div className="text-sm text-gray-500">{session.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}