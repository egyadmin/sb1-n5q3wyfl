import React from 'react';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

interface Category {
  title: string;
  target: number;
  items: Array<{
    name: string;
    details: string;
  }>;
  regulations: string[];
  notes?: string;
}

interface Props {
  categories: Category[];
  expandedCategories: string[];
  onToggleCategory: (title: string) => void;
}

export default function MandatoryListCategories({ categories, expandedCategories, onToggleCategory }: Props) {
  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const isExpanded = expandedCategories.includes(category.title);
        
        return (
          <div key={category.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => onToggleCategory(category.title)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{category.title}</h3>
                  <p className="text-sm text-gray-500">
                    النسبة المستهدفة: {category.target}%
                  </p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="px-6 pb-6">
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المادة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          التفاصيل
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {category.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.details}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">الضوابط والمتطلبات</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {category.regulations.map((regulation, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 ml-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{regulation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {category.notes && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">{category.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}