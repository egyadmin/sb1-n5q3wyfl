import React from 'react';
import { Book, Users, Truck, Scale, Info } from 'lucide-react';

export default function MandatoryListInfo() {
  const mandatoryInfo = [
    {
      title: 'تعريف القائمة الإلزامية',
      content: [
        'القائمة الإلزامية هي قائمة المنتجات والخدمات التي يجب شراؤها من موردين محليين معتمدين.',
        'تم إعداد هذه القائمة من قبل هيئة المحتوى المحلي والمشتريات الحكومية لتعزيز المحتوى المحلي في المملكة العربية السعودية وتحقيق أهداف رؤية 2030.'
      ],
      icon: Book,
      color: 'blue'
    },
    {
      title: 'دور الأطراف المعنية',
      content: [
        'الجهات الحكومية:',
        '• مراقبة الامتثال للقائمة الإلزامية',
        '• التحقق من شهادات المنشأ',
        '• تطبيق العقوبات على المخالفين',
        '',
        'الموردون المحليون:',
        '• توفير المنتجات والخدمات وفق المعايير المطلوبة',
        '• الحصول على الشهادات اللازمة',
        '• الالتزام بمتطلبات الجودة',
        '',
        'المشترون:',
        '• الالتزام بالشراء من الموردين المحليين المعتمدين',
        '• توثيق عمليات الشراء',
        '• تقديم التقارير الدورية'
      ],
      icon: Users,
      color: 'green'
    },
    {
      title: 'تعليمات تسليم المنتجات الوطنية',
      content: [
        '1. التحقق من شهادات المنشأ السعودي',
        '2. مطابقة المواصفات الفنية المطلوبة',
        '3. توثيق سلسلة التوريد بالكامل',
        '4. الاحتفاظ بسجلات المنشأ والجودة',
        '5. تقديم تقارير الامتثال الدورية',
        '6. الالتزام بمعايير التغليف والشحن'
      ],
      icon: Truck,
      color: 'purple'
    },
    {
      title: 'ضوابط الاستثناء من القائمة الإلزامية',
      content: [
        'يمكن طلب استثناء في الحالات التالية:',
        '• عدم توفر المنتج محلياً',
        '• عدم مطابقة المواصفات الفنية المطلوبة',
        '• حالات الطوارئ والقوة القاهرة',
        '• وجود فرق سعري يتجاوز 25%',
        '• عدم قدرة الموردين المحليين على تلبية الطلب'
      ],
      icon: Scale,
      color: 'yellow'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {mandatoryInfo.map((info, index) => {
        const Icon = info.icon;
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
              <div className={`p-2 bg-${info.color}-50 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${info.color}-600`} />
              </div>
              <h3 className="text-lg font-medium">{info.title}</h3>
            </div>
            <div className="space-y-2">
              {info.content.map((line, i) => (
                <p 
                  key={i} 
                  className={`text-sm ${
                    line.startsWith('•') || line.startsWith('1') ? 'text-gray-600' : 
                    line.endsWith(':') ? 'font-medium text-gray-700 mt-2' : 'text-gray-600'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}