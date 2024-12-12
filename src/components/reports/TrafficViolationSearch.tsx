import React, { useState } from 'react';
import { Search, X, FileText, Calendar, DollarSign } from 'lucide-react';

interface SearchForm {
  violationId: string;
  equipmentNumber: string;
  operatorNumber: string;
}

export default function TrafficViolationSearch() {
  const [searchForm, setSearchForm] = useState<SearchForm>({
    violationId: '',
    equipmentNumber: '',
    operatorNumber: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching with:', searchForm);
  };

  const handleClear = () => {
    setSearchForm({
      violationId: '',
      equipmentNumber: '',
      operatorNumber: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">بحث عن مخالفة</h2>
          <p className="mt-1 text-sm text-gray-500">Search Violation</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Violation ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم المخالفة
                </label>
                <input
                  type="text"
                  value={searchForm.violationId}
                  onChange={(e) => setSearchForm({ ...searchForm, violationId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Equipment Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم المعدة
                </label>
                <input
                  type="text"
                  value={searchForm.equipmentNumber}
                  onChange={(e) => setSearchForm({ ...searchForm, equipmentNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Operator Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم المشغل
                </label>
                <input
                  type="text"
                  value={searchForm.operatorNumber}
                  onChange={(e) => setSearchForm({ ...searchForm, operatorNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                مسح التصفية
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                بحث في السجلات
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Q
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                لم يتم العثور على بيانات
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}