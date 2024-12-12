import React, { useState } from 'react';
import { Database, Table, RefreshCw, Server } from 'lucide-react';
import DatabaseConnection from './DatabaseConnection';
import DatabaseSchema from './DatabaseSchema';
import DatabaseSync from './DatabaseSync';

export default function SajcoPage() {
  const [activeTab, setActiveTab] = useState<'connection' | 'schema' | 'sync'>('connection');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">SAJCO نظام إدارة المستودعات</h1>
            <p className="mt-2 text-red-100">
              System for Developing the Utilization of Warehouses, Production Crushers, and Assets
            </p>
          </div>
          <img 
            src="https://www2.0zz0.com/2024/11/20/07/988856043.png" 
            alt="SAJCO Logo" 
            className="h-16 w-auto"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 rtl:space-x-reverse px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('connection')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'connection'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Server className="w-5 h-5 ml-2" />
              إعدادات الاتصال
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'schema'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Table className="w-5 h-5 ml-2" />
              مخطط قاعدة البيانات
            </button>
            <button
              onClick={() => setActiveTab('sync')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'sync'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <RefreshCw className="w-5 h-5 ml-2" />
              تزامن البيانات
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'connection' && <DatabaseConnection />}
          {activeTab === 'schema' && <DatabaseSchema />}
          {activeTab === 'sync' && <DatabaseSync />}
        </div>
      </div>
    </div>
  );
}