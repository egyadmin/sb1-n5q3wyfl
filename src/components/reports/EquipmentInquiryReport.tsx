import React, { useState } from 'react';
import { Search, Truck, MapPin, Wrench, Briefcase, Paperclip, Calendar } from 'lucide-react';
import { equipmentRecords } from '../../data/mockReports';

interface SearchForm {
  equipmentNumber: string;
  operatorNumber: string;
  registrationArb: string;
  location: string;
  equipmentStatus: string;
  project: string;
}

export default function EquipmentInquiryReport() {
  const [searchForm, setSearchForm] = useState<SearchForm>({
    equipmentNumber: '',
    operatorNumber: '',
    registrationArb: '',
    location: '',
    equipmentStatus: '',
    project: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching with:', searchForm);
  };

  const handleClear = () => {
    setSearchForm({
      equipmentNumber: '',
      operatorNumber: '',
      registrationArb: '',
      location: '',
      equipmentStatus: '',
      project: ''
    });
  };

  const filteredEquipment = equipmentRecords.filter(equipment => {
    return (
      (!searchForm.equipmentNumber || equipment.equipmentNo.includes(searchForm.equipmentNumber)) &&
      (!searchForm.operatorNumber || equipment.operatorNumber.includes(searchForm.operatorNumber)) &&
      (!searchForm.registrationArb || equipment.regNoArb.includes(searchForm.registrationArb)) &&
      (!searchForm.location || equipment.location.includes(searchForm.location)) &&
      (!searchForm.equipmentStatus || equipment.status === searchForm.equipmentStatus) &&
      (!searchForm.project || equipment.project.includes(searchForm.project))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">نظام تتبع المعدات SAJCO</h2>
          <p className="mt-1 text-sm text-gray-500">SAJCO Equipment Tracking System</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Equipment Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم المعدات
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchForm.equipmentNumber}
                    onChange={(e) => setSearchForm({ ...searchForm, equipmentNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Truck className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
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

              {/* Registration (Arb) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم التسجيل (بالعربي)
                </label>
                <input
                  type="text"
                  value={searchForm.registrationArb}
                  onChange={(e) => setSearchForm({ ...searchForm, registrationArb: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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

              {/* Equipment Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  حالة المعدات
                </label>
                <select
                  value={searchForm.equipmentStatus}
                  onChange={(e) => setSearchForm({ ...searchForm, equipmentStatus: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">الكل</option>
                  <option value="working">قيد العمل</option>
                  <option value="standby">وضع الاستعداد</option>
                  <option value="repair">تحت الإصلاح</option>
                  <option value="sale">مقترح للبيع</option>
                </select>
              </div>

              {/* Project */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المشروع
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchForm.project}
                    onChange={(e) => setSearchForm({ ...searchForm, project: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Briefcase className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
                رقم المعدة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الوصف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم التسجيل (بالإنجليزية)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم التسجيل (بالعربي)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم المشغل
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الاسم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المشروع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الموقع
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاريخ العهدة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المرفقات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((equipment) => (
                <tr key={equipment.equipmentNo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.equipmentNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.regNoEng}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.regNoArb}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      equipment.status === 'working' ? 'bg-green-100 text-green-800' :
                      equipment.status === 'standby' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {equipment.status === 'working' ? 'قيد العمل' :
                       equipment.status === 'standby' ? 'وضع الاستعداد' :
                       'تحت الإصلاح'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.operatorNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.operatorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.project}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {equipment.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900">{equipment.custodyDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {equipment.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => console.log('View attachment:', attachment)}
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="px-6 py-4 text-center text-sm text-gray-500">
                  لم يتم العثور على بيانات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}