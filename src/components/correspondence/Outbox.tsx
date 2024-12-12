import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Calendar, Tag, Paperclip } from 'lucide-react';
import type { Correspondence } from '../../types';
import CorrespondenceForm from './CorrespondenceForm';
import { generateCorrespondenceId, filterCorrespondence } from '../../utils/correspondence';

const mockOutbox: Correspondence[] = [
  {
    id: 'COR002',
    subject: 'تقرير حالة المخزون الشهري',
    type: 'outgoing',
    status: 'completed',
    priority: 'medium',
    sender: 'إدارة المستودعات',
    recipient: 'الإدارة العامة',
    date: '2024-03-19',
    tags: ['تقارير', 'مخزون'],
    tracking: {
      currentLocation: 'الإدارة العامة',
      history: [
        {
          location: 'إدارة المستودعات',
          date: '2024-03-19',
          action: 'إرسال',
          user: 'محمد خالد'
        }
      ]
    }
  }
];

export default function Outbox() {
  const [correspondence, setCorrespondence] = useState<Correspondence[]>(mockOutbox);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const handleAddCorrespondence = (data: Omit<Correspondence, 'id' | 'tracking'>) => {
    const newCorrespondence: Correspondence = {
      id: generateCorrespondenceId('outgoing'),
      ...data,
      tracking: {
        currentLocation: 'إدارة المستودعات',
        history: [
          {
            location: 'إدارة المستودعات',
            date: new Date().toISOString(),
            action: 'إنشاء',
            user: 'المستخدم الحالي'
          }
        ]
      }
    };

    setCorrespondence([newCorrespondence, ...correspondence]);
    setShowForm(false);
  };

  const filteredCorrespondence = filterCorrespondence(correspondence, searchTerm, {
    status: filterStatus
  });

  const getStatusColor = (status: Correspondence['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Correspondence['status']) => {
    switch (status) {
      case 'new':
        return 'جديد';
      case 'in-progress':
        return 'قيد المعالجة';
      case 'completed':
        return 'مكتمل';
      case 'archived':
        return 'مؤرشف';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">البريد الصادر</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومتابعة المراسلات الصادرة
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          إنشاء مراسلة
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في المراسلات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">جميع الحالات</option>
                <option value="new">جديد</option>
                <option value="in-progress">قيد المعالجة</option>
                <option value="completed">مكتمل</option>
                <option value="archived">مؤرشف</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredCorrespondence.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.subject}
                    </h3>
                    <p className="text-sm text-gray-500">
                      إلى: {item.recipient}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>

              <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-1" />
                  {item.date}
                </div>
                {item.tags && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Tag className="w-4 h-4" />
                    {item.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {item.attachments && (
                  <div className="flex items-center">
                    <Paperclip className="w-4 h-4 ml-1" />
                    {item.attachments.length} مرفقات
                  </div>
                )}
              </div>

              {item.tracking && (
                <div className="mt-4 text-sm">
                  <p className="text-gray-600">
                    الموقع الحالي: {item.tracking.currentLocation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <CorrespondenceForm
          type="outgoing"
          onSubmit={handleAddCorrespondence}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}