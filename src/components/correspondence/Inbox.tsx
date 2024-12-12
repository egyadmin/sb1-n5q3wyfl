import React, { useState } from 'react';
import { Search, Filter, Plus, Mail, Calendar, Tag, Paperclip, Clock } from 'lucide-react';
import type { Correspondence } from '../../types';
import CorrespondenceForm from './CorrespondenceForm';
import { generateCorrespondenceId, filterCorrespondence } from '../../utils/correspondence';
import { mockWarehouses } from '../../data/mockWarehouses';

const mockInbox: Correspondence[] = [
  {
    id: 'COR001',
    subject: 'طلب توريد معدات جديدة',
    type: 'incoming',
    status: 'new',
    priority: 'high',
    sender: {
      warehouseId: 'WH001',
      warehouseName: 'مستودع أ'
    },
    recipient: {
      warehouseId: 'WH002',
      warehouseName: 'مستودع ب'
    },
    date: '2024-03-20',
    dueDate: '2024-03-25',
    tags: ['توريدات', 'معدات'],
    tracking: {
      currentLocation: 'مستودع ب',
      history: [
        {
          location: 'مستودع أ',
          date: '2024-03-20',
          action: 'إنشاء',
          user: 'أحمد محمد'
        }
      ]
    }
  }
];

export default function Inbox() {
  const [correspondence, setCorrespondence] = useState<Correspondence[]>(mockInbox);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);

  const handleAddCorrespondence = (data: Omit<Correspondence, 'id' | 'tracking'>) => {
    const newCorrespondence: Correspondence = {
      id: generateCorrespondenceId('incoming'),
      ...data,
      tracking: {
        currentLocation: data.recipient.warehouseName,
        history: [
          {
            location: data.sender.warehouseName,
            date: new Date().toISOString(),
            action: 'استلام',
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">البريد الوارد</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومتابعة المراسلات الواردة
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة مراسلة
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
                      من: {item.sender.warehouseName}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.priority === 'high' ? 'bg-red-100 text-red-800' :
                  item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.priority === 'high' ? 'عالية' :
                   item.priority === 'medium' ? 'متوسطة' :
                   'منخفضة'}
                </span>
              </div>

              <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-1" />
                  {item.date}
                </div>
                {item.dueDate && (
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 ml-1" />
                    تاريخ الاستحقاق: {item.dueDate}
                  </div>
                )}
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
          type="incoming"
          onSubmit={handleAddCorrespondence}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}