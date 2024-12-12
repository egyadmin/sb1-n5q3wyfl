import React, { useState } from 'react';
import { Search, X, FileText, User, Building2, MapPin, Users } from 'lucide-react';

interface SearchForm {
  employeeNumber: string;
  custodyType: string;
  job: string;
  location: string;
  department: string;
}

export default function EmployeeCustodyDetail() {
  const [searchForm, setSearchForm] = useState<SearchForm>({
    employeeNumber: '',
    custodyType: 'all',
    job: '',
    location: '',
    department: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching with:', searchForm);
  };

  const handleClear = () => {
    setSearchForm({
      employeeNumber: '',
      custodyType: 'all',
      job: '',
      location: '',
      department: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تفاصيل عهدة الموظف</h2>
          <p className="mt-1 text-sm text-gray-500">Employee Custody Detail</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Employee Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الموظف
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchForm.employeeNumber}
                    onChange={(e) => setSearchForm({ ...searchForm, employeeNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Custody Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع العهدة
                </label>
                <select
                  value={searchForm.custodyType}
                  onChange={(e) => setSearchForm({ ...searchForm, custodyType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">الكل</option>
                  <option value="equipment">معدات</option>
                  <option value="devices">أجهزة</option>
                  <option value="furniture">أثاث</option>
                </select>
              </div>

              {/* Job */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوظيفة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchForm.job}
                    onChange={(e) => setSearchForm({ ...searchForm, job: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Users className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الموقع
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchForm.location}
                    onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  القسم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchForm.department}
                    onChange={(e) => setSearchForm({ ...searchForm, department: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
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
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التسلسل
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                نوع العهدة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم CIR
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاريخ CIR
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم العنصر
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الوصف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الوحدة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الرقم التسلسلي
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                سعر الوحدة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الكمية المصروفة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ملاحظات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td colSpan={11} className="px-6 py-4 text-center text-sm text-gray-500">
                لم يتم العثور على بيانات
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}