import React from 'react';
import { FileText, Download, Calendar, BarChart2, ClipboardList, Users } from 'lucide-react';

function ReportTemplates() {
  const templates = [
    {
      id: 'monthly-report',
      title: 'التقرير الشهري',
      description: 'نموذج التقرير الشهري للمحتوى المحلي',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 'performance-report',
      title: 'تقرير الأداء',
      description: 'نموذج تقرير أداء المحتوى المحلي',
      icon: BarChart2,
      color: 'green'
    },
    {
      id: 'compliance-report',
      title: 'تقرير الامتثال',
      description: 'نموذج تقرير الامتثال للقائمة الإلزامية',
      icon: ClipboardList,
      color: 'purple'
    },
    {
      id: 'workforce-report',
      title: 'تقرير القوى العاملة',
      description: 'نموذج تقرير توطين الوظائف',
      icon: Users,
      color: 'orange'
    }
  ];

  const downloadTemplate = (templateId: string) => {
    // Implement download functionality
    console.log('Downloading template:', templateId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-green-50 rounded-lg">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">نماذج التقارير</h2>
            <p className="text-sm text-gray-500">نماذج تقارير المحتوى المحلي المعتمدة</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className={`p-2 bg-${template.color}-50 rounded-lg`}>
                  <template.icon className={`w-6 h-6 text-${template.color}-600`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{template.title}</h3>
                  <p className="text-sm text-gray-500">{template.description}</p>
                </div>
              </div>
              <button
                onClick={() => downloadTemplate(template.id)}
                className={`p-2 text-${template.color}-600 hover:bg-${template.color}-50 rounded-lg transition-colors`}
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">Excel</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">PDF</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">Word</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportTemplates;