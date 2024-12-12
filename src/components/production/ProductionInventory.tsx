import React, { useState } from 'react';
import { Search, Filter, Package, ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import { productionMaterials } from '../../data/mockProduction';
import type { ProductionMaterial } from '../../types/production';
import ProductionMaterialForm from './ProductionMaterialForm';

export default function ProductionInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [materials, setMaterials] = useState<ProductionMaterial[]>(productionMaterials);

  const handleAddMaterial = (data: Omit<ProductionMaterial, 'id'>) => {
    const newMaterial: ProductionMaterial = {
      id: `PM${materials.length + 1}`.padStart(5, '0'),
      ...data
    };
    setMaterials([...materials, newMaterial]);
    setShowForm(false);
  };

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || material.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">مخزون الإنتاج</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومتابعة مخزون المواد المنتجة
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-4 h-4 ml-2" />
          إضافة منتج جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في المواد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">جميع الأنواع</option>
                <option value="crushed-rock">بحص</option>
                <option value="gravel">صلبوخ</option>
                <option value="sand">رمل</option>
                <option value="asphalt">أسفلت</option>
                <option value="concrete">خرسانة</option>
                <option value="cement">اسمنت</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="mr-3">
                      <h3 className="text-lg font-medium text-gray-900">{material.name}</h3>
                      <p className="text-sm text-gray-500">{material.size || material.type}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">المخزون الحالي</span>
                    <span className="font-medium">{material.stockQuantity} {material.unit}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">الكثافة</span>
                    <span className="font-medium">{material.density} جم/سم³</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <ArrowUpRight className="w-4 h-4 ml-1 text-green-500" />
                        <span>وارد اليوم: 150 {material.unit}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ArrowDownRight className="w-4 h-4 ml-1 text-red-500" />
                        <span>صادر اليوم: 80 {material.unit}</span>
                      </div>
                    </div>
                  </div>

                  {material.specifications && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">المواصفات</h4>
                      {Object.entries(material.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-500">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <ProductionMaterialForm
          onSubmit={handleAddMaterial}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}