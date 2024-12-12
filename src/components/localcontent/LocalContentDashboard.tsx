import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, TrendingUp, Building2, Package, Percent, Book, FileText, CheckSquare } from 'lucide-react';
import { calculateLocalContent } from '../../utils/localContent';
import { mockSuppliers } from '../../data/mockSuppliers';
import { productionMaterials } from '../../data/mockProduction';

function LocalContentDashboard() {
  const navigate = useNavigate();
  const localContentStats = calculateLocalContent(mockSuppliers, productionMaterials);

  const additionalResources = [
    {
      id: 'compliance-guide',
      title: 'دليل الامتثال',
      icon: Book,
      path: '/local-content/compliance-guide',
      color: 'blue'
    },
    {
      id: 'report-templates',
      title: 'نماذج التقارير',
      icon: FileText,
      path: '/local-content/report-templates',
      color: 'green'
    },
    {
      id: 'checklist',
      title: 'قائمة التحقق',
      icon: CheckSquare,
      path: '/local-content/checklist',
      color: 'purple'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">المحتوى المحلي</h2>
          <p className="mt-1 text-sm text-gray-500">
            تحليل وتتبع نسب المحتوى المحلي
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Percent className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">
              {localContentStats.totalLocalContent}%
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium">إجمالي المحتوى المحلي</h3>
          <p className="text-sm text-gray-500">النسبة الإجمالية للمحتوى المحلي</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <Building2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">
              {localContentStats.localSuppliersPercentage}%
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium">الموردين المحليين</h3>
          <p className="text-sm text-gray-500">نسبة الموردين المحليين</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">
              {localContentStats.localMaterialsPercentage}%
            </span>
          </div>
          <h3 className="mt-4 text-lg font-medium">المواد المحلية</h3>
          <p className="text-sm text-gray-500">نسبة المواد المحلية</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">+5.2%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">نمو المحتوى المحلي</h3>
          <p className="text-sm text-gray-500">معدل النمو السنوي</p>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {additionalResources.map((resource) => {
          const Icon = resource.icon;
          return (
            <button
              key={resource.id}
              onClick={() => navigate(resource.path)}
              className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-right`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 bg-${resource.color}-50 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${resource.color}-600`} />
                </div>
              </div>
              <h3 className="text-lg font-medium">{resource.title}</h3>
              <p className="mt-2 text-sm text-gray-500">
                عرض المزيد من المعلومات
              </p>
            </button>
          );
        })}
      </div>

      {/* Material Analysis */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-6">تحليل المواد</h3>
        <div className="space-y-4">
          {localContentStats.materialAnalysis.map((material, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Package className="w-5 h-5 text-blue-600 ml-3" />
                <div>
                  <h4 className="font-medium">{material.name}</h4>
                  <p className="text-sm text-gray-500">{material.origin}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{material.localContent}%</p>
                <p className="text-xs text-gray-500">محتوى محلي</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocalContentDashboard;