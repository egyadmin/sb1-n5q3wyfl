import React from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface ReportPrintViewProps {
  title: string;
  data: any[];
  columns: string[];
}

export default function ReportPrintView({ title, data, columns }: ReportPrintViewProps) {
  return (
    <div className="print-only hidden" dir="rtl">
      <div className="p-8">
        {/* Report Header */}
        <div className="text-center mb-8 print-break-inside-avoid">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-gray-500">
            تاريخ التقرير: {format(new Date(), 'PPP', { locale: ar })}
          </p>
        </div>

        {/* Report Table */}
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 print-break-inside-avoid">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-right text-sm font-medium text-gray-700 border"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="print-break-inside-avoid">
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-sm text-gray-900 border"
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Report Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 print-break-inside-avoid">
          <p>نظام إدارة المستودعات - جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}