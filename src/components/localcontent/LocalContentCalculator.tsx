import React, { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { calculateLocalContent } from '../../utils/localContentCalculator';
import { mockSuppliers } from '../../data/mockSuppliers';
import { productionMaterials } from '../../data/mockProduction';

export default function LocalContentCalculator() {
  const [result, setResult] = useState<any>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const handleCalculate = () => {
    const calculationResult = calculateLocalContent(
      mockSuppliers,
      productionMaterials,
      [], // TODO: Add employees data
      []  // TODO: Add services data
    );
    setResult(calculationResult);
    setExpandedCategories([calculationResult.categoryBreakdown[0].category]);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">حاسبة المحتوى المحلي</h3>
          <p className="text-sm text-gray-500">احتساب نسب المحتوى المحلي حسب متطلبات الهيئة</p>
        </div>
        <button
          onClick={handleCalculate}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Calculator className="w-4 h-4 ml-2" />
          احتساب النسب
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          {/* Total Percentage */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-blue-900">إجمالي المحتوى المحلي</h4>
                <p className="text-sm text-blue-700">النسبة الإجمالية المحققة</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  {result.totalPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            {result.categoryBreakdown.map((category: any) => (
              <div key={category.category} className="border rounded-lg">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleCategory(category.category)}
                >
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {category.status === 'compliant' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <h4 className="font-medium">{category.category}</h4>
                      <p className="text-sm text-gray-500">
                        النسبة المستهدفة: {category.target}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="text-right">
                      <p className={`text-lg font-semibold ${
                        category.status === 'compliant' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {category.current}%
                      </p>
                    </div>
                    {expandedCategories.includes(category.category) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedCategories.includes(category.category) && (
                  <div className="p-4 border-t bg-gray-50">
                    <div className="space-y-3">
                      {category.details.map((detail: any, index: number) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{detail.item}</span>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <span className="text-sm text-gray-500">
                              المساهمة: {detail.contribution}%
                            </span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600"
                                style={{ width: `${detail.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">
                              {detail.percentage.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">التوصيات</h4>
              </div>
              <ul className="space-y-2">
                {result.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 ml-2">•</span>
                    <span className="text-sm text-yellow-800">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}