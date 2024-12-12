import React from 'react';
import { Server, Shield, Database, Save, TestTube } from 'lucide-react';
import type { DBConfig } from '../../types/database';

interface ConnectionFormProps {
  onSubmit: (config: DBConfig) => void;
  onTest: () => void;
  isConnecting: boolean;
  isTestingConnection: boolean;
}

export default function ConnectionForm({ 
  onSubmit, 
  onTest, 
  isConnecting, 
  isTestingConnection 
}: ConnectionFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const config: DBConfig = {
      host: formData.get('host') as string,
      port: Number(formData.get('port')),
      sid: formData.get('sid') as string,
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      poolConfig: {
        poolMin: Number(formData.get('poolMin')),
        poolMax: Number(formData.get('poolMax')),
        poolIncrement: Number(formData.get('poolIncrement'))
      }
    };

    onSubmit(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6">
      {/* Server Settings */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Server className="w-5 h-5 ml-2 text-blue-600" />
          إعدادات الخادم
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">عنوان الخادم</label>
            <input
              type="text"
              name="host"
              defaultValue="localhost"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">المنفذ</label>
            <input
              type="number"
              name="port"
              defaultValue="1521"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SID</label>
            <input
              type="text"
              name="sid"
              defaultValue="ORCL"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Shield className="w-5 h-5 ml-2 text-blue-600" />
          بيانات الاعتماد
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">اسم المستخدم</label>
            <input
              type="text"
              name="username"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Pool Configuration */}
      <div>
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Database className="w-5 h-5 ml-2 text-blue-600" />
          إعدادات تجمع الاتصالات
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">الحد الأدنى</label>
            <input
              type="number"
              name="poolMin"
              defaultValue="5"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">الحد الأقصى</label>
            <input
              type="number"
              name="poolMax"
              defaultValue="50"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">معدل الزيادة</label>
            <input
              type="number"
              name="poolIncrement"
              defaultValue="5"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 rtl:space-x-reverse">
        <button
          type="button"
          onClick={onTest}
          disabled={isTestingConnection || isConnecting}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <TestTube className={`w-4 h-4 ml-2 ${isTestingConnection ? 'animate-spin' : ''}`} />
          اختبار الاتصال
        </button>
        <button
          type="submit"
          disabled={isConnecting || isTestingConnection}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 ml-2" />
          حفظ الإعدادات
        </button>
      </div>
    </form>
  );
}