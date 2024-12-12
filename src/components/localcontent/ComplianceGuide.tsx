import React from 'react';
import { Book, CheckCircle2, AlertTriangle, FileText, Download } from 'lucide-react';

function ComplianceGuide() {
  const sections = [
    {
      title: 'متطلبات الامتثال الأساسية',
      items: [
        'التسجيل في منصة اعتماد',
        'الحصول على شهادة المحتوى المحلي',
        'تقديم خطة تطوير المحتوى المحلي',
        'الالتزام بنسب المحتوى المحلي المستهدفة',
        'توثيق مصادر التوريد المحلية'
      ]
    },
    {
      title: 'المستندات المطلوبة',
      items: [
        'شهادة السجل التجاري',
        'شهادة الزكاة والدخل',
        'شهادة التأمينات الاجتماعية',
        'شهادة السعودة',
        'تراخيص مزاولة النشاط'
      ]
    },
    {
      title: 'إجراءات التحقق',
      items: [
        'التدقيق الدوري للمستندات',
        'زيارات التفتيش الميدانية',
        'مراجعة تقارير الأداء',
        'التحقق من صحة البيانات المقدمة',
        'تقييم مستوى الامتثال'
      ]
    }
  ];

  const downloadGuide = () => {
    // Implement download functionality
    console.log('Downloading compliance guide...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Book className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">دليل الامتثال</h2>
            <p className="text-sm text-gray-500">إرشادات وضوابط الامتثال للمحتوى المحلي</p>
          </div>
        </div>
        <button
          onClick={downloadGuide}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="w-4 h-4 ml-2" />
          تحميل الدليل
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start space-x-2 rtl:space-x-reverse">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">ملاحظة هامة</h4>
            <p className="mt-1 text-sm text-yellow-700">
              يجب الالتزام بجميع متطلبات الامتثال وتحديث المستندات بشكل دوري لتجنب أي غرامات أو عقوبات.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceGuide;