import React, { useState } from 'react';
import { Database } from 'lucide-react';
import ConnectionForm from './ConnectionForm';
import ConnectionStatus from './ConnectionStatus';
import { useDBConnection } from '../../hooks/useDBConnection';
import type { DBConfig } from '../../types/database';

export default function DatabaseConnection() {
  const { connect, testConnection, status, isConnecting, isTestingConnection } = useDBConnection();

  const handleSubmit = async (config: DBConfig) => {
    await connect(config);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">إعدادات الاتصال بقاعدة البيانات</h2>
          <p className="mt-1 text-sm text-gray-500">
            تكوين الاتصال بقاعدة بيانات Oracle
          </p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Database className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <ConnectionStatus 
        status={status}
        isConnecting={isConnecting} 
      />

      <ConnectionForm 
        onSubmit={handleSubmit}
        onTest={testConnection}
        isConnecting={isConnecting}
        isTestingConnection={isTestingConnection}
      />
    </div>
  );
}