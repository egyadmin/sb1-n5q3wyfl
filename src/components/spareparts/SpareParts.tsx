import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Settings } from 'lucide-react';
import SparePartsList from './SparePartsList';
import SparePartForm from './SparePartForm';
import { useLanguage } from '../../contexts/LanguageContext';
import type { SparePart } from '../../types';

export default function SpareParts() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { t } = useLanguage();

  const handleAddSparePart = (data: Omit<SparePart, 'id' | 'status'>) => {
    console.log('Adding spare part:', data);
    setShowForm(false);
  };

  const handleExport = () => {
    console.log('Exporting spare parts data');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">قطع الغيار</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة قطع غيار المعدات وتتبع المخزون
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة قطعة غيار
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في قطع الغيار..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="appearance-none pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">جميع الفئات</option>
                  <option value="mechanical">ميكانيكي</option>
                  <option value="electrical">كهربائي</option>
                  <option value="hydraulic">هيدروليكي</option>
                  <option value="pneumatic">هوائي</option>
                  <option value="other">أخرى</option>
                </select>
                <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        <SparePartsList searchTerm={searchTerm} filterCategory={filterCategory} />
      </div>

      {showForm && (
        <SparePartForm onSubmit={handleAddSparePart} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}