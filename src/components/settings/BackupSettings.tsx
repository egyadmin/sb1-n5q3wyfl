import React, { useState } from 'react';
import { Database, Download, Upload, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface BackupStatus {
  lastBackup: string;
  nextBackup: string;
  status: 'success' | 'pending' | 'error';
  size: string;
}

export default function BackupSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [backupStatus, setBackupStatus] = useState<BackupStatus>({
    lastBackup: '2024-03-15 14:30',
    nextBackup: '2024-03-16 14:30',
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
        lastBackup: new Date().toLocaleString('ar-SA'),
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

  const getStatusColor = (status: BackupStatus['status']) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
    }
  };

  const getStatusIcon = (status: BackupStatus['status']) => {
    switch (status) {
      case 'success':
        return CheckCircle;
      case 'pending':
        return RefreshCw;
      case 'error':
        return AlertCircle;
    }
  };

  const StatusIcon = getStatusIcon(backupStatus.status);

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">النسخ الاحتياطي</h3>
              <p className="text-sm text-gray-500">إدارة النسخ الاحتياطي للبيانات</p>
            </div>
          </div>
          <StatusIcon className={`w-6 h-6 ${getStatusColor(backupStatus.status)}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">آخر نسخة احتياطية</p>
            <p className="font-medium">{backupStatus.lastBackup}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">النسخة التالية</p>
            <p className="font-medium">{backupStatus.nextBackup}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">حجم البيانات</p>
            <p className="font-medium">{backupStatus.size}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">الحالة</p>
            <p className={`font-medium ${getStatusColor(backupStatus.status)}`}>
              {backupStatus.status === 'success' && 'تم النسخ بنجاح'}
              {backupStatus.status === 'pending' && 'قيد التنفيذ'}
              {backupStatus.status === 'error' && 'حدث خطأ'}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleBackup}
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <Download className="w-4 h-4 ml-2" />
          نسخ احتياطي الآن
        </button>
        <button
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          <Upload className="w-4 h-4 ml-2" />
          استعادة نسخة
        </button>
        <button
          disabled={isLoading}
          className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
        >
          <RefreshCw className="w-4 h-4 ml-2" />
          جدولة تلقائية
        </button>
      </div>

      {/* History */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h4 className="font-medium">سجل النسخ الاحتياطي</h4>
        </div>
        <div className="divide-y">
          {[
            { date: '2024-03-15 14:30', status: 'success', size: '2.5 GB' },
            { date: '2024-03-14 14:30', status: 'success', size: '2.4 GB' },
            { date: '2024-03-13 14:30', status: 'error', size: '2.4 GB' },
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
    </div>
  );
}