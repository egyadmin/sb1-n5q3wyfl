import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReportsLayout from './ReportsLayout';
import ReportsList from './ReportsList';
import InventoryReport from './InventoryReport';
import MaintenanceReport from './MaintenanceReport';
import ExpiryReport from './ExpiryReport';
import MovementReport from './MovementReport';
import TrafficViolationSearch from './TrafficViolationSearch';
import EmployeeCustodyDetail from './EmployeeCustodyDetail';
import ReportPrintView from './ReportPrintView';
import { exportToPDF, exportToExcel } from '../../utils/export';
import { printReport } from '../../utils/print';

export default function Reports() {
  const handleExport = (reportType: string, format: 'pdf' | 'excel' | 'print') => {
    // Get report data based on type
    const reportData = getReportData(reportType);
    const title = getReportTitle(reportType);
    const columns = getReportColumns(reportType);

    // Export based on format
    if (format === 'pdf') {
      exportToPDF(reportData, columns, title);
    } else if (format === 'excel') {
      exportToExcel(reportData, title);
    } else if (format === 'print') {
      printReport(title, reportData, columns);
    }
  };

  return (
    <ReportsLayout>
      <Routes>
        <Route index element={<ReportsList onExport={handleExport} />} />
        <Route path="inventory" element={<InventoryReport />} />
        <Route path="maintenance" element={<MaintenanceReport />} />
        <Route path="expiry" element={<ExpiryReport />} />
        <Route path="movement" element={<MovementReport />} />
        <Route path="traffic-violation" element={<TrafficViolationSearch />} />
        <Route path="employee-custody" element={<EmployeeCustodyDetail />} />
      </Routes>
    </ReportsLayout>
  );
}

// Helper functions to get report data
function getReportData(type: string) {
  // Return mock data based on report type
  switch (type) {
    case 'inventory':
      return [
        { id: 1, name: 'Item 1', quantity: 100, value: 1000 },
        { id: 2, name: 'Item 2', quantity: 200, value: 2000 },
      ];
    case 'maintenance':
      return [
        { id: 1, asset: 'Asset 1', type: 'Preventive', date: '2024-03-01' },
        { id: 2, asset: 'Asset 2', type: 'Corrective', date: '2024-03-15' },
      ];
    default:
      return [];
  }
}

function getReportTitle(type: string): string {
  switch (type) {
    case 'inventory':
      return 'تقرير المخزون';
    case 'maintenance':
      return 'تقرير الصيانة';
    case 'expiry':
      return 'تقرير الصلاحية';
    case 'movement':
      return 'تقرير الحركة';
    case 'traffic-violation':
      return 'تقرير مخالفات المرور';
    case 'employee-custody':
      return 'تقرير عهدة الموظف';
    default:
      return 'تقرير';
  }
}

function getReportColumns(type: string): string[] {
  switch (type) {
    case 'inventory':
      return ['المعرف', 'الاسم', 'الكمية', 'القيمة'];
    case 'maintenance':
      return ['المعرف', 'الأصل', 'النوع', 'التاريخ'];
    case 'expiry':
      return ['المعرف', 'المادة', 'تاريخ الانتهاء', 'الكمية'];
    case 'movement':
      return ['المعرف', 'النوع', 'من', 'إلى', 'التاريخ'];
    default:
      return [];
  }
}