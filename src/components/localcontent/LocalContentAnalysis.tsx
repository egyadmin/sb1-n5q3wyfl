import React, { useState } from 'react';
import { Search, Filter, Download, Calculator } from 'lucide-react';
import LocalContentCalculator from './LocalContentCalculator';
import LocalContentCharts from './LocalContentCharts';
import { exportLocalContentAnalysis } from '../../utils/localContentExporter';
import { calculateLocalContent } from '../../utils/localContentCalculator';
import { mockSuppliers } from '../../data/mockSuppliers';
import { productionMaterials } from '../../data/mockProduction';

export default function LocalContentAnalysis() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const handleExportAnalysis = async () => {
    try {
      await exportLocalContentAnalysis({
        suppliers: mockSuppliers,
        materials: productionMaterials,
        calculationResult
      });
    } catch (error) {
      console.error('Error exporting analysis:', error);
      // TODO: Show error notification
    }
  };

  const handleCalculateContent = async () => {
    try {
      setIsCalculating(true);
      const result = await calculateLocalContent(
        mockSuppliers,
        productionMaterials,
        [], // TODO: Add employees data
        []  // TODO: Add services data
      );
      setCalculationResult(result);
    } catch (error) {
      console.error('Error calculating local content:', error);
      // TODO: Show error notification
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">تحليل المحتوى المحلي</h2>
          <p className="mt-1 text-sm text-gray-500">
            تحليل تفصيلي لنسب المحتوى المحلي حسب الفئات
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={handleExportAnalysis}
            disabled={!calculationResult}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 ml-2" />
            تصدير التحليل
          </button>
          <button
            onClick={handleCalculateContent}
            disabled={isCalculating}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Calculator className={`w-4 h-4 ml-2 ${isCalculating ? 'animate-spin' : ''}`} />
            {isCalculating ? 'جاري الاحتساب...' : 'احتساب المحتوى المحلي'}
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <LocalContentCharts data={calculationResult} />

      {/* Calculator Section */}
      <LocalContentCalculator result={calculationResult} />
    </div>
  );
}