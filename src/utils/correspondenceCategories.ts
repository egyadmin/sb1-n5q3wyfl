import type { CorrespondenceCategory } from '../types/correspondence';

export const categories: Array<{
  id: CorrespondenceCategory;
  name: string;
  description: string;
  color: string;
}> = [
  {
    id: 'inventory_request',
    name: 'طلب مخزون',
    description: 'طلب مواد أو قطع غيار من المخزون',
    color: 'blue'
  },
  {
    id: 'maintenance_request',
    name: 'طلب صيانة',
    description: 'طلب صيانة للمعدات أو المرافق',
    color: 'green'
  },
  {
    id: 'transfer_request',
    name: 'طلب نقل',
    description: 'طلب نقل مواد بين المستودعات',
    color: 'purple'
  },
  {
    id: 'report',
    name: 'تقرير',
    description: 'تقارير دورية أو خاصة',
    color: 'yellow'
  },
  {
    id: 'approval',
    name: 'موافقة',
    description: 'طلب موافقة أو اعتماد',
    color: 'red'
  },
  {
    id: 'inquiry',
    name: 'استفسار',
    description: 'استفسار عن مواد أو إجراءات',
    color: 'orange'
  },
  {
    id: 'other',
    name: 'أخرى',
    description: 'مراسلات أخرى',
    color: 'gray'
  }
];

export const getCategoryColor = (category: CorrespondenceCategory): string => {
  const categoryInfo = categories.find(c => c.id === category);
  return categoryInfo?.color || 'gray';
};

export const getCategoryName = (category: CorrespondenceCategory): string => {
  const categoryInfo = categories.find(c => c.id === category);
  return categoryInfo?.name || 'غير محدد';
};

export const getCategoryBadgeClasses = (category: CorrespondenceCategory): string => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    gray: 'bg-gray-100 text-gray-800'
  };

  const color = getCategoryColor(category);
  return colorMap[color] || colorMap.gray;
};