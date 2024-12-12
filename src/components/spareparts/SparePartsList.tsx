import React from 'react';
import { Edit, Trash2, AlertTriangle, MoreVertical, Settings } from 'lucide-react';
import type { SparePart } from '../../types';

const mockSpareParts: SparePart[] = [
  {
    id: 'SP001',
    name: 'محرك كهربائي 3 فاز',
    partNumber: 'EM-2024-001',
    category: 'electrical',
    compatibleAssets: ['A1234', 'A1235'],
    quantity: 5,
    minimumStock: 2,
    supplier: 'المورد الأول للمعدات',
    location: 'مستودع أ - رف 3',
    lastUsed: '2024-03-15',
    price: 1500,
    specifications: {
      power: '5.5 kW',
      speed: '1450 RPM',
      voltage: '380V',
    },
    status: 'in-stock',
  },
  {
    id: 'SP002',
    name: 'مضخة هيدروليكية',
    partNumber: 'HP-2024-002',
    category: 'hydraulic',
    compatibleAssets: ['A1236'],
    quantity: 1,
    minimumStock: 2,
    supplier: 'المورد الثاني للمعدات',
    location: 'مستودع ب - رف 2',
    lastUsed: '2024-03-10',
    price: 2500,
    specifications: {
      flow: '100 L/min',
      pressure: '250 bar',
    },
    status: 'low-stock',
  },
];

interface SparePartsListProps {
  searchTerm: string;
  filterCategory: string;
}

export default function SparePartsList({ searchTerm, filterCategory }: SparePartsListProps) {
  const getStatusColor = (status: SparePart['status']) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: SparePart['status']) => {
    switch (status) {
      case 'in-stock':
        return 'متوفر';
      case 'low-stock':
        return 'مخزون منخفض';
      case 'out-of-stock':
        return 'غير متوفر';
    }
  };

  const getCategoryText = (category: SparePart['category']) => {
    switch (category) {
      case 'mechanical':
        return 'ميكانيكي';
      case 'electrical':
        return 'كهربائي';
      case 'hydraulic':
        return 'هيدروليكي';
      case 'pneumatic':
        return 'هوائي';
      case 'other':
        return 'أخرى';
    }
  };

  const filteredParts = mockSpareParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.partNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || part.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              القطعة
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              التفاصيل
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              المخزون
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الموقع
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              السعر
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              الإجراءات
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredParts.map((part) => (
            <tr key={part.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{part.name}</div>
                    <div className="text-sm text-gray-500">رقم: {part.partNumber}</div>
                  </div>
                  {part.quantity <= part.minimumStock && (
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{getCategoryText(part.category)}</div>
                <div className="text-sm text-gray-500">
                  متوافق مع: {part.compatibleAssets.join(', ')}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{part.quantity} قطعة</div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(part.status)}`}>
                  {getStatusText(part.status)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{part.location}</div>
                <div className="text-sm text-gray-500">
                  آخر استخدام: {part.lastUsed ? new Date(part.lastUsed).toLocaleDateString('ar-SA') : '-'}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {part.price.toLocaleString('ar-SA')} ريال
                </div>
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}