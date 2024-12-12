import React, { useState } from 'react';
import { Search, Filter, Archive as ArchiveIcon, Calendar, Tag } from 'lucide-react';
import type { Correspondence } from '../../types';

const mockArchive: Correspondence[] = [
  {
    id: 'COR003',
    subject: 'تقرير الجرد السنوي 2023',
    type: 'outgoing',
    status: 'archived',
    priority: 'medium',
    sender: 'إدارة المستودعات',
    recipient: 'الإدارة المالية',
    date: '2023-12-31',
    tags: ['تقارير', 'جرد', '2023'],
    tracking: {
      currentLocation: 'الأرشيف',
      history: [
        {
          location: 'إدارة المستودعات',
          date: '2023-12-31',
          action: 'أرشفة',
          user: 'سعيد أحمد'
        }
      ]
    }
  }
];

export default function Archive() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">الأرشيف</h2>
          <p className="mt-1 text-sm text-gray-500">
            أرشيف المراسلات والمستندات
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في الأرشيف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">جميع السنوات</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {mockArchive.map((correspondence) => (
            <div key={correspondence.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <ArchiveIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {correspondence.subject}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="ml-2">من: {correspondence.sender}</span>
                      <span className="mx-2">|</span>
                      <span>إلى: {correspondence.recipient}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 ml-1" />
                  {correspondence.date}
                </div>
                {correspondence.tags && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Tag className="w-4 h-4" />
                    {correspondence.tags.map((tag) => (
                      <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {correspondence.tracking && (
                <div className="mt-4 text-sm">
                  <p className="text-gray-600">
                    تاريخ الأرشفة: {correspondence.tracking.history[0].date}
                  </p>
                  <p className="text-gray-600">
                    تم الأرشفة بواسطة: {correspondence.tracking.history[0].user}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}