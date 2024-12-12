import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  BarChart2, 
  Calendar,
  TrendingUp, 
  Download, 
  Eye, 
  FileBarChart,
  Printer,
  Package,
  Wrench,
  AlertTriangle,
  Clock,
  Users,
  Truck
} from 'lucide-react';

interface ReportsListProps {
  onExport: (reportType: string, format: 'pdf' | 'excel') => void;
}

export default function ReportsList({ onExport }: ReportsListProps) {
  const navigate = useNavigate();
  
  const reports = [
    {
      id: 'inventory',
      title: 'تقرير المخزون',
      description: 'تحليل شامل لحالة المخزون والمواد',
      icon: Package,
      path: '/reports/inventory',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'maintenance',
      title: 'تقرير الصيانة',
      description: 'تقرير أداء الصيانة وكفاءة الفرق',
      icon: Wrench,
      path: '/reports/maintenance',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'expiry',
      title: 'تقرير الصلاحية',
      description: 'متابعة المواد المنتهية والقريبة من الانتهاء',
      icon: AlertTriangle,
      path: '/reports/expiry',
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      id: 'movement',
      title: 'تقرير الحركة',
      description: 'تحليل حركة المواد والتحويلات',
      icon: TrendingUp,
      path: '/reports/movement',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'traffic-violation',
      title: 'تقرير مخالفات المرور',
      description: 'متابعة وإدارة مخالفات المركبات',
      icon: Truck,
      path: '/reports/traffic-violation',
      color: 'bg-red-50 text-red-600'
    },
    {
      id: 'employee-custody',
      title: 'تقرير عهدة الموظف',
      description: 'تفاصيل العهد المسلمة للموظفين',
      icon: Users,
      path: '/reports/employee-custody',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  const handleExport = (reportType: string, format: 'pdf' | 'excel') => {
    if (onExport) {
      onExport(reportType, format);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">التقارير</h2>
          <p className="mt-1 text-sm text-gray-500">
            عرض وتحليل تقارير المستودع والصيانة
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${report.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <button
                    onClick={() => handleExport(report.id, 'pdf')}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="تصدير PDF"
                  >
                    <FileText className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleExport(report.id, 'excel')}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="تصدير Excel"
                  >
                    <FileBarChart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-2">{report.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{report.description}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => navigate(report.path)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Eye className="w-4 h-4 ml-1" />
                  عرض التقرير
                </button>
                <button
                  onClick={() => handleExport(report.id, 'pdf')}
                  className="inline-flex items-center text-gray-500 hover:text-gray-700"
                >
                  <Printer className="w-4 h-4 ml-1" />
                  طباعة
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BarChart2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm text-green-600">+12%</span>
          </div>
          <h4 className="mt-2 text-lg font-medium">45</h4>
          <p className="text-gray-500 text-sm">تقرير تم إنشاؤه</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-green-600">+8%</span>
          </div>
          <h4 className="mt-2 text-lg font-medium">12</h4>
          <p className="text-gray-500 text-sm">تقرير هذا الشهر</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-sm text-yellow-600">-2%</span>
          </div>
          <h4 className="mt-2 text-lg font-medium">4.2</h4>
          <p className="text-gray-500 text-sm">متوسط وقت التقرير</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm text-green-600">+15%</span>
          </div>
          <h4 className="mt-2 text-lg font-medium">128</h4>
          <p className="text-gray-500 text-sm">مرات التحميل</p>
        </div>
      </div>
    </div>
  );
}