import React, { useState } from 'react';
import { RefreshCw, Database, CheckCircle2, AlertTriangle, Clock, ArrowDownUp } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface SyncStatus {
  lastSync: string;
  status: 'idle' | 'syncing' | 'success' | 'error';
  message: string;
  progress: number;
  details?: {
    tablesProcessed: number;
    totalTables: number;
    recordsSynced: number;
  };
}

export default function DatabaseSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: '',
    status: 'idle',
    message: 'جاهز للتزامن',
    progress: 0
  });

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' }
  });

  const startSync = async () => {
    setSyncStatus({
      lastSync: '',
      status: 'syncing',
      message: 'جاري التزامن...',
      progress: 0,
      details: {
        tablesProcessed: 0,
        totalTables: 10,
        recordsSynced: 0
      }
    });

    // محاكاة عملية التزامن
    for (let i = 1; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSyncStatus(prev => ({
        ...prev,
        progress: i * 10,
        details: {
          tablesProcessed: i,
          totalTables: 10,
          recordsSynced: i * 100
        }
      }));
    }

    setSyncStatus({
      lastSync: format(new Date(), 'PPpp', { locale: ar }),
      status: 'success',
      message: 'تم التزامن بنجاح',
      progress: 100,
      details: {
        tablesProcessed: 10,
        totalTables: 10,
        recordsSynced: 1000
      }
    });
  };

  return (
    <animated.div style={fadeIn} className="space-y-6">
      {/* Status Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ArrowDownUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">تزامن قاعدة البيانات</h3>
              <p className="text-sm text-gray-500">مزامنة البيانات مع Oracle</p>
            </div>
          </div>
          {syncStatus.status === 'syncing' && (
            <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
          )}
          {syncStatus.status === 'success' && (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          )}
          {syncStatus.status === 'error' && (
            <AlertTriangle className="w-6 h-6 text-red-600" />
          )}
        </div>

        {/* Progress Bar */}
        {syncStatus.status === 'syncing' && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">جاري التزامن...</span>
              <span className="text-gray-900 font-medium">{syncStatus.progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${syncStatus.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Sync Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">آخر تزامن</p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="w-4 h-4 text-gray-400" />
              <p className="font-medium">
                {syncStatus.lastSync || 'لم يتم التزامن بعد'}
              </p>
            </div>
          </div>
          {syncStatus.details && (
            <>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">الجداول المعالجة</p>
                <p className="font-medium">
                  {syncStatus.details.tablesProcessed} / {syncStatus.details.totalTables}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">السجلات المتزامنة</p>
                <p className="font-medium">{syncStatus.details.recordsSynced}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 rtl:space-x-reverse">
        <button
          onClick={startSync}
          disabled={syncStatus.status === 'syncing'}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ml-2 ${syncStatus.status === 'syncing' ? 'animate-spin' : ''}`} />
          {syncStatus.status === 'syncing' ? 'جاري التزامن...' : 'بدء التزامن'}
        </button>
      </div>

      {/* Sync Log */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h4 className="font-medium">سجل التزامن</h4>
        </div>
        <div className="divide-y">
          {[
            { message: 'اكتمل تزامن جدول الأصول', status: 'success', time: '14:30' },
            { message: 'اكتمل تزامن جدول المخزون', status: 'success', time: '14:28' },
            { message: 'اكتمل تزامن جدول أوامر العمل', status: 'success', time: '14:25' }
          ].map((log, index) => (
            <div key={index} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`p-1 rounded-full ${
                  log.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {log.status === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className="text-sm">{log.message}</span>
              </div>
              <span className="text-sm text-gray-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </animated.div>
  );
}