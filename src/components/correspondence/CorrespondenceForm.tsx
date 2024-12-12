import React, { useState } from 'react';
import { X, Calendar, Clock, FileText } from 'lucide-react';
import type { CorrespondenceType, CorrespondenceCategory } from '../../types/correspondence';
import { categories } from '../../utils/correspondenceCategories';
import { mockWarehouses } from '../../data/mockWarehouses';
import TagManager from './TagManager';

interface CorrespondenceFormProps {
  type: CorrespondenceType;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function CorrespondenceForm({ type, onSubmit, onClose }: CorrespondenceFormProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CorrespondenceCategory>('other');
  const [selectedWarehouse, setSelectedWarehouse] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const senderWarehouse = mockWarehouses.find(w => w.id === (type === 'outgoing' ? selectedWarehouse : formData.get('sender')));
    const recipientWarehouse = mockWarehouses.find(w => w.id === (type === 'incoming' ? selectedWarehouse : formData.get('recipient')));
    
    onSubmit({
      subject: formData.get('subject'),
      type,
      category: selectedCategory,
      status: 'new',
      priority: formData.get('priority'),
      sender: {
        warehouseId: senderWarehouse?.id || '',
        warehouseName: senderWarehouse?.name || '',
      },
      recipient: {
        warehouseId: recipientWarehouse?.id || '',
        warehouseName: recipientWarehouse?.name || '',
      },
      date: new Date().toISOString(),
      dueDate: formData.get('dueDate') || undefined,
      tags,
      notes: formData.get('notes')
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {type === 'incoming' ? 'إضافة مراسلة واردة' : 'إنشاء مراسلة صادرة'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">الموضوع</label>
            <input
              type="text"
              name="subject"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">التصنيف</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CorrespondenceCategory)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الأولوية</label>
              <select
                name="priority"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="low">منخفضة</option>
                <option value="medium">متوسطة</option>
                <option value="high">عالية</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {type === 'incoming' ? 'المرسل' : 'المستودع المرسل'}
              </label>
              <select
                name="sender"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={type === 'outgoing' ? selectedWarehouse : undefined}
                onChange={(e) => type === 'outgoing' && setSelectedWarehouse(e.target.value)}
              >
                <option value="">اختر المستودع</option>
                {mockWarehouses.map(warehouse => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {type === 'outgoing' ? 'المرسل إليه' : 'المستودع المستلم'}
              </label>
              <select
                name="recipient"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={type === 'incoming' ? selectedWarehouse : undefined}
                onChange={(e) => type === 'incoming' && setSelectedWarehouse(e.target.value)}
              >
                <option value="">اختر المستودع</option>
                {mockWarehouses.map(warehouse => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">تاريخ الاستحقاق</label>
            <input
              type="date"
              name="dueDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التصنيفات</label>
            <TagManager 
              tags={tags} 
              onTagsChange={setTags}
              suggestedTags={[
                'طلب مواد',
                'طلب صيانة',
                'تقرير مخزون',
                'موافقة إدارية',
                'متابعة طلب',
                'تحويل مخزون'
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ملاحظات</label>
            <textarea
              name="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
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
              {type === 'incoming' ? 'إضافة المراسلة' : 'إنشاء المراسلة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}