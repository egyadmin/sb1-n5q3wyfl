import React, { useState } from 'react';
import { CheckSquare, Square, Download, Upload, Save } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
}

function ComplianceChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // المتطلبات الأساسية
    {
      id: '1',
      text: 'التسجيل في منصة اعتماد',
      checked: false,
      category: 'basic'
    },
    {
      id: '2',
      text: 'تحديث بيانات المنشأة',
      checked: false,
      category: 'basic'
    },
    {
      id: '3',
      text: 'تقديم شهادة السجل التجاري',
      checked: false,
      category: 'basic'
    },
    // المتطلبات الفنية
    {
      id: '4',
      text: 'تقديم خطة تطوير المحتوى المحلي',
      checked: false,
      category: 'technical'
    },
    {
      id: '5',
      text: 'تحديد نسب المحتوى المحلي الحالية',
      checked: false,
      category: 'technical'
    },
    {
      id: '6',
      text: 'وضع أهداف تطوير المحتوى المحلي',
      checked: false,
      category: 'technical'
    },
    // متطلبات التوثيق
    {
      id: '7',
      text: 'توثيق مصادر التوريد المحلية',
      checked: false,
      category: 'documentation'
    },
    {
      id: '8',
      text: 'إعداد سجلات التدريب والتوظيف',
      checked: false,
      category: 'documentation'
    },
    {
      id: '9',
      text: 'توثيق عقود الموردين المحليين',
      checked: false,
      category: 'documentation'
    }
  ]);

  const toggleItem = (id: string) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getProgress = () => {
    const completed = checklist.filter(item => item.checked).length;
    return Math.round((completed / checklist.length) * 100);
  };

  const saveChecklist = () => {
    // Implement save functionality
    console.log('Saving checklist...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">قائمة التحقق</h2>
          <p className="text-sm text-gray-500">قائمة التحقق من متطلبات المحتوى المحلي</p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 ml-2" />
            استيراد
          </button>
          <button
            onClick={() => {}}
            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </button>
          <button
            onClick={saveChecklist}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Save className="w-4 h-4 ml-2" />
            حفظ
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">التقدم</span>
            <span className="text-sm font-medium text-blue-600">{getProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {['basic', 'technical', 'documentation'].map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="font-medium text-gray-900">
                {category === 'basic' && 'المتطلبات الأساسية'}
                {category === 'technical' && 'المتطلبات الفنية'}
                {category === 'documentation' && 'متطلبات التوثيق'}
              </h3>
              <div className="space-y-3">
                {checklist
                  .filter(item => item.category === category)
                  .map(item => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex-shrink-0 focus:outline-none"
                      >
                        {item.checked ? (
                          <CheckSquare className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <span className={`text-sm ${
                        item.checked ? 'text-gray-500 line-through' : 'text-gray-700'
                      }`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComplianceChecklist;