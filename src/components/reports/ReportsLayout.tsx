import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ReportsLayoutProps {
  children: React.ReactNode;
}

export default function ReportsLayout({ children }: ReportsLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isRootPath = location.pathname === '/reports';

  const getReportTitle = () => {
    switch (location.pathname) {
      case '/reports/inventory':
        return 'تقرير المخزون';
      case '/reports/maintenance':
        return 'تقرير الصيانة';
      case '/reports/expiry':
        return 'تقرير الصلاحية';
      case '/reports/movement':
        return 'تقرير الحركة';
      case '/reports/traffic-violation':
        return 'تقرير مخالفات المرور';
      case '/reports/employee-custody':
        return 'تقرير عهدة الموظف';
      default:
        return 'التقارير';
    }
  };

  return (
    <div className="space-y-6">
      {!isRootPath && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/reports')}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowRight className="w-4 h-4 ml-1" />
                عودة للتقارير
              </button>
              <span className="mx-3 text-gray-400">/</span>
              <h2 className="text-lg font-medium text-gray-900">{getReportTitle()}</h2>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                طباعة
              </button>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                رجوع
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}