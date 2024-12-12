import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Penalty {
  violation: string;
  penalty: string;
  details: string;
}

interface Props {
  penalties: Penalty[];
}

export default function MandatoryListPenalties({ penalties }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-6">الغرامات والعقوبات</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {penalties.map((item, index) => (
          <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 ml-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-900">{item.violation}</h4>
                <p className="mt-1 text-sm text-red-700">{item.penalty}</p>
                <p className="mt-1 text-xs text-red-600">{item.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}