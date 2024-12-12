import React, { useState } from 'react';
import { Database, Download, Upload, RefreshCw, CheckCircle, AlertCircle, Calendar, Clock, Save } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useSpring, animated } from '@react-spring/web';

interface BackupStatus {
  lastBackup: string;
  nextBackup: string;
  status: 'success' | 'pending' | 'error';
  size: string;
}

export default function BackupManager() {
  const [isLoading, setIsLoading] = useState(false);
  const [backupStatus, setBackupStatus] = useState<BackupStatus>({
    lastBackup: format(new Date(), 'yyyy-MM-dd HH:mm', { locale: ar }),
    nextBackup: format(new Date(Date.now() + 24 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm', { locale: ar }),
    status: 'success',
    size: '2.5 GB'
  });

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      // Simulate backup process
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBackupStatus(prev => ({
        ...prev,
        lastBackup: format(new Date(), 'yyyy-MM-dd HH:mm', { locale: ar }),
        status: 'success'
      }));
    } catch (error) {
      setBackupStatus(prev => ({
        ...prev,
        status: 'error'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' }
  });

  return (
    <animated.div style={fadeIn} className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">النسخ الاحتياطي لقاعدة البيانات</h3>
              <p className="text-sm text-gray-500">إدارة النسخ الاحتياطي لقاعدة بيانات Oracle</p>
            </div>
          </div>
          {backupStatus.status === 'success' && (
            <CheckCircle className="w-6 h-6 text-green-600" />
          )}
          {backupStatus.status === 'error' && (
            <AlertCircle className="w-6 h-6 text-red-600" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">آخر نسخة احتياطية</p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="font-medium">{backupStatus.lastBackup}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">النسخة التالية</p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="font-medium">{backupStatus.nextBackup}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">حجم قاعدة البيانات</p>
            <p className="font-medium">{backupStatus.size}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">الحالة</p>
            <p className={`font-medium ${
              backupStatus.status === 'success' ? 'text-green-600' :
              backupStatus.status === 'error' ? 'text-red-600' :
              'text-yellow-600'
            }`}>
              {backupStatus.status === 'success' && 'تم النسخ بنجاح'}
              {backupStatus.status === 'pending' && 'قيد التنفيذ'}
              {backupStatus.status === 'error' && 'حدث خطأ'}
            </p>
          </div>
        </div>
      </div>

      {/* Backup Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleBackup}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 ml-2" />
          )}
          نسخ احتياطي الآن
        </button>
        <button
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Upload className="w-4 h-4 ml-2" />
          استعادة نسخة
        </button>
        <button
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
        >
          <Clock className="w-4 h-4 ml-2" />
          جدولة تلقائية
        </button>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h4 className="font-medium">سجل النسخ الاحتياطي</h4>
        </div>
        <div className="divide-y">
          {[
            { date: format(new Date(), 'yyyy-MM-dd HH:mm', { locale: ar }), status: 'success', size: '2.5 GB' },
            { date: format(new Date(Date.now() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm', { locale: ar }), status: 'success', size: '2.4 GB' },
            { date: format(new Date(Date.now() - 48 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm', { locale: ar }), status: 'error', size: '2.4 GB' },
          ].map((backup, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className={`p-1.5 rounded-full ${
                  backup.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {backup.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{backup.date}</p>
                  <p className="text-sm text-gray-500">{backup.size}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                استعادة
              </button>
            </div>
          ))}
        </div>
      </div>
    </animated.div>
  );
}