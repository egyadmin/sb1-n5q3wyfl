import React, { useState } from 'react';
import { Search, Building2, MapPin, User, Package, DollarSign } from 'lucide-react';

interface EmployeeInventoryItem {
  employeeNumber: string;
  name: string;
  job: string;
  items: Array<{
    itemNumber: string;
    description: string;
    unitPrice: number;
    totalQty: number;
    transferRemarks?: string;
  }>;
}

const mockData: EmployeeInventoryItem[] = [
  {
    employeeNumber: '17618',
    name: 'ALATAWI, FARIS',
    job: 'Junior Technical Support',
    items: [
      {
        itemNumber: '00D4103M283FDW',
        description: 'PRINTER HP COLOR LASERJET PRO MFP M283FDW',
        unitPrice: 2250,
        totalQty: 1
      }
    ]
  },
  {
    employeeNumber: '19059',
    name: 'ALANAZI, DANA',
    job: 'Junior Technical Support',
    items: [
      {
        itemNumber: '00D1102MD2721',
        description: 'MONITOR DELL 27" LED',
        unitPrice: 900,
        totalQty: 1
      }
    ]
  },
  {
    employeeNumber: '2443',
    name: 'ELGOHARY, TAMER',
    job: 'IT Area Manager',
    items: [
      {
        itemNumber: '00D6111L745',
        description: 'LAPTOP "TOSHIBA" SAT-L745',
        unitPrice: 3000,
        totalQty: 1
      }
    ]
  }
];

export default function EmployeesInventoryReport() {
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching with:', { location, department, searchTerm });
  };

  const handleClear = () => {
    setLocation('');
    setDepartment('');
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تقرير جرد الموظفين</h2>
          <p className="mt-1 text-sm text-gray-500">Employees Inventory Report</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الموقع
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Northern Central Location"
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
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Information Technology Department - Tabuk Central Location"
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
                رقم الموظف
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الاسم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الوظيفة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رقم العنصر
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وصف العنصر
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                سعر الوحدة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                إجمالي الكمية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ملاحظات النقل
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockData.map((employee) => (
              employee.items.map((item, itemIndex) => (
                <tr key={`${employee.employeeNumber}-${itemIndex}`} className="hover:bg-gray-50">
                  {itemIndex === 0 && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap" rowSpan={employee.items.length}>
                        <div className="flex items-center">
                          <User className="w-5 h-5 text-gray-400 ml-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {employee.employeeNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" rowSpan={employee.items.length}>
                        <span className="text-sm text-gray-900">{employee.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" rowSpan={employee.items.length}>
                        <span className="text-sm text-gray-500">{employee.job}</span>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900">{item.itemNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{item.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-400 ml-1" />
                      <span className="text-sm text-gray-900">{item.unitPrice}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.totalQty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.transferRemarks || '-'}
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}