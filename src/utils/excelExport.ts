import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import type { StockItem } from '../types';

export const exportStockCountToExcel = (items: StockItem[]) => {
  // Prepare data for export
  const data = items.map(item => ({
    'رقم المادة': item.id,
    'اسم المادة': item.name,
    'العدد المتوقع': item.expected,
    'العدد الفعلي': item.actual,
    'الفرق': item.actual - item.expected,
    'الموقع': item.location,
    'آخر جرد': format(new Date(item.lastCount), 'PPP', { locale: ar }),
    'الحالة': getStatusText(item.status)
  }));

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data, { 
    header: [
      'رقم المادة',
      'اسم المادة',
      'العدد المتوقع',
      'العدد الفعلي',
      'الفرق',
      'الموقع',
      'آخر جرد',
      'الحالة'
    ]
  });

  // Set RTL
  ws['!dir'] = 'rtl';

  // Auto-size columns
  const colWidths = data.reduce((widths: { [key: string]: number }, row) => {
    Object.entries(row).forEach(([key, value]) => {
      const width = Math.max(
        key.toString().length,
        value?.toString().length || 0
      );
      widths[key] = Math.max(widths[key] || 0, width);
    });
    return widths;
  }, {});

  ws['!cols'] = Object.values(colWidths).map(width => ({ width }));

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'جرد المخزون');

  // Generate filename with current date
  const filename = `جرد_المخزون_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;

  // Save file
  XLSX.writeFile(wb, filename);
};

const getStatusText = (status: StockItem['status']) => {
  switch (status) {
    case 'pending':
      return 'قيد الانتظار';
    case 'in-progress':
      return 'قيد التنفيذ';
    case 'completed':
      return 'مكتمل';
    default:
      return status;
  }
};