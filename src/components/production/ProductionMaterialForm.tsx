import React, { useState } from 'react';
import { X, Package, Scale, Ruler, Plus, Beaker, Flask, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { ProductionMaterial, MaterialType, MaterialSize, CementType, FiberType, ConcreteType } from '../../types/production';

interface ProductionMaterialFormProps {
  onSubmit: (data: Omit<ProductionMaterial, 'id'>) => void;
  onClose: () => void;
}

export default function ProductionMaterialForm({ onSubmit, onClose }: ProductionMaterialFormProps) {
  const [selectedType, setSelectedType] = useState<MaterialType>('crushed-rock');
  const [additives, setAdditives] = useState<Array<{
    type: string;
    name: string;
    purpose: string;
    dosage: string;
  }>>([]);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    specifications: true,
    additives: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddAdditive = () => {
    setAdditives([
      ...additives,
      { type: '', name: '', purpose: '', dosage: '' }
    ]);
  };

  const handleRemoveAdditive = (index: number) => {
    setAdditives(additives.filter((_, i) => i !== index));
  };

  const handleAdditiveChange = (index: number, field: keyof typeof additives[0], value: string) => {
    const newAdditives = [...additives];
    newAdditives[index] = {
      ...newAdditives[index],
      [field]: value
    };
    setAdditives(newAdditives);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const specifications: ProductionMaterial['specifications'] = {};
    
    if (selectedType === 'cement') {
      specifications.cementType = formData.get('cementType') as CementType;
      specifications.strength = formData.get('strength') as string;
    }
    
    if (selectedType === 'fiber') {
      specifications.fiberType = formData.get('fiberType') as FiberType;
    }
    
    if (selectedType === 'admixture') {
      specifications.additives = additives;
    }

    if (formData.get('concreteType')) {
      specifications.concreteType = formData.get('concreteType') as ConcreteType;
    }

    onSubmit({
      name: formData.get('name') as string,
      type: selectedType,
      size: formData.get('size') as MaterialSize,
      density: Number(formData.get('density')),
      stockQuantity: Number(formData.get('stockQuantity')),
      unit: formData.get('unit') as string,
      location: formData.get('location') as string,
      specifications: Object.keys(specifications).length > 0 ? specifications : undefined
    });
  };

  const renderSectionHeader = (title: string, section: keyof typeof expandedSections, icon: React.ReactNode) => (
    <div 
      className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg cursor-pointer"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {icon}
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="mr-3">
              <h2 className="text-xl font-semibold text-white">إضافة منتج جديد</h2>
              <p className="text-sm text-blue-100">إضافة منتج جديد إلى مخزون الإنتاج</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white rounded-lg border">
            {renderSectionHeader('المعلومات الأساسية', 'basic', 
              <Package className="w-5 h-5 text-blue-600" />
            )}
            
            {expandedSections.basic && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">النوع</label>
                    <select
                      name="type"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as MaterialType)}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="crushed-rock">الركام الخشن</option>
                      <option value="sand">الركام الناعم</option>
                      <option value="stone-dust">الغبار الحجري</option>
                      <option value="granular">مواد التربة الحبيبية</option>
                      <option value="cement">الأسمنت</option>
                      <option value="admixture">الإضافات الخرسانية</option>
                      <option value="fiber">الألياف</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">الكمية</label>
                    <input
                      type="number"
                      name="stockQuantity"
                      required
                      min="0"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">وحدة القياس</label>
                    <select
                      name="unit"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="طن">طن</option>
                      <option value="متر مكعب">متر مكعب</option>
                      <option value="كيلوجرام">كيلوجرام</option>
                      <option value="لتر">لتر</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">موقع التخزين</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Specifications Section */}
          <div className="bg-white rounded-lg border">
            {renderSectionHeader('المواصفات الفنية', 'specifications',
              <Ruler className="w-5 h-5 text-blue-600" />
            )}
            
            {expandedSections.specifications && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">المقاس</label>
                    <select
                      name="size"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">اختر المقاس</option>
                      <option value="40mm">40 مم - للأساسات</option>
                      <option value="20mm">20 مم - للخرسانة المسلحة</option>
                      <option value="10mm">10 مم - للخرسانة الدقيقة</option>
                      <option value="5mm">5 مم - للطبقات السطحية</option>
                      <option value="fine">رمل ناعم</option>
                      <option value="coarse">رمل خشن</option>
                      <option value="dust">غبار حجري</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">الكثافة (جم/سم³)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        name="density"
                        required
                        step="0.1"
                        min="0"
                        className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Scale className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {selectedType === 'cement' && (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">نوع الأسمنت</label>
                      <select
                        name="cementType"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="OPC">بورتلاندي عادي</option>
                        <option value="SRC">مقاوم للكبريتات</option>
                        <option value="PPC">بوزولاني</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">المقاومة</label>
                      <input
                        type="text"
                        name="strength"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="مثال: 42.5N"
                      />
                    </div>
                  </div>
                )}

                {selectedType === 'fiber' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">نوع الألياف</label>
                    <select
                      name="fiberType"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="steel">فولاذية</option>
                      <option value="plastic">بلاستيكية</option>
                      <option value="glass">زجاجية</option>
                    </select>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Concrete Mix Additives Section */}
          {selectedType === 'admixture' && (
            <div className="bg-white rounded-lg border">
              {renderSectionHeader('إضافات الخلطة الخرسانية', 'additives',
                <Beaker className="w-5 h-5 text-blue-600" />
              )}
              
              {expandedSections.additives && (
                <div className="p-4 space-y-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleAddAdditive}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      إضافة مادة جديدة
                    </button>
                  </div>

                  <div className="space-y-4">
                    {additives.map((additive, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-sm font-medium text-gray-900">
                            إضافة رقم {index + 1}
                          </h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveAdditive(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">نوع الإضافة</label>
                            <select
                              value={additive.type}
                              onChange={(e) => handleAdditiveChange(index, 'type', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="">اختر النوع</option>
                              <option value="mineral">إضافات معدنية</option>
                              <option value="chemical">إضافات كيميائية</option>
                              <option value="fiber">ألياف</option>
                              <option value="water-control">مواد التحكم في الماء</option>
                              <option value="special">إضافات خاصة</option>
                              <option value="natural">إضافات طبيعية</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">اسم المادة</label>
                            <input
                              type="text"
                              value={additive.name}
                              onChange={(e) => handleAdditiveChange(index, 'name', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="مثال: سيليكا فيوم"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">الغرض</label>
                            <input
                              type="text"
                              value={additive.purpose}
                              onChange={(e) => handleAdditiveChange(index, 'purpose', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="مثال: تحسين مقاومة الضغط"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">الجرعة</label>
                            <input
                              type="text"
                              value={additive.dosage}
                              onChange={(e) => handleAdditiveChange(index, 'dosage', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              placeholder="مثال: 5-10% من وزن الأسمنت"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {additives.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <Beaker className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد إضافات</h3>
                        <p className="mt-1 text-sm text-gray-500">اضغط على زر إضافة مادة جديدة لإضافة مواد للخلطة</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              إضافة المنتج
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}