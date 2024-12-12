import { 
  LayoutDashboard,
  Box,
  Wrench,
  PackageSearch,
  FileBarChart,
  Activity,
  Building2,
  Users,
  Clock,
  Percent,
  Factory,
  Building,
  TruckIcon,
  Fuel,
  Warehouse,
  Briefcase
} from 'lucide-react';
import type { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    id: 'sajco',
    icon: Briefcase,
    label: 'SAJCO',
    path: 'https://www.sajco.com',
    isExternal: true,
    color: 'bg-red-50 text-red-600'
  },
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    label: 'لوحة التحكم',
    path: '/'
  },
  {
    id: 'production',
    icon: Factory,
    label: 'الإنتاج والكسارات',
    path: '/production',
    subItems: [
      { id: 'production-dashboard', label: 'لوحة الإنتاج', path: '/production' },
      { id: 'crushers', label: 'الكسارات', path: '/production/crushers' },
      { id: 'production-inventory', label: 'مخزون الإنتاج', path: '/production/inventory' },
      { id: 'fuel-consumption', label: 'استهلاك الوقود', path: '/production/fuel' }
    ]
  },
  {
    id: 'suppliers',
    icon: Building,
    label: 'الموردين',
    path: '/suppliers',
    subItems: [
      { id: 'suppliers-list', label: 'قائمة الموردين', path: '/suppliers' },
      { id: 'transactions', label: 'المعاملات', path: '/suppliers/transactions' }
    ]
  },
  {
    id: 'local-content',
    icon: Percent,
    label: 'المحتوى المحلي',
    path: '/local-content',
    subItems: [
      { id: 'local-content-dashboard', label: 'لوحة التحكم', path: '/local-content' },
      { id: 'local-content-analysis', label: 'تحليل المحتوى', path: '/local-content/analysis' },
      { id: 'mandatory-list', label: 'القائمة الإلزامية', path: '/local-content/mandatory-list' }
    ]
  },
  {
    id: 'assets',
    icon: Box,
    label: 'الأصول',
    path: '/assets',
    subItems: [
      { id: 'assets-list', label: 'قائمة الأصول', path: '/assets' },
      { id: 'maintenance-schedule', label: 'جدول الصيانة', path: '/assets/maintenance' },
      { id: 'asset-locations', label: 'مواقع الأصول', path: '/assets/locations' }
    ]
  },
  {
    id: 'workOrders',
    icon: Wrench,
    label: 'أوامر العمل',
    path: '/work-orders',
    subItems: [
      { id: 'work-orders-list', label: 'قائمة أوامر العمل', path: '/work-orders' },
      { id: 'work-orders-calendar', label: 'التقويم', path: '/work-orders/calendar' },
      { id: 'maintenance-teams', label: 'فرق الصيانة', path: '/work-orders/teams' }
    ]
  },
  {
    id: 'inventory',
    icon: PackageSearch,
    label: 'المخزون',
    path: '/inventory',
    subItems: [
      { id: 'inventory-dashboard', label: 'لوحة المخزون', path: '/inventory' },
      { id: 'inventory-list', label: 'قائمة المخزون', path: '/inventory/list' },
      { id: 'stock-count', label: 'جرد المخزون', path: '/inventory/stock-count' },
      { id: 'low-stock', label: 'المواد المنخفضة', path: '/inventory/low-stock' },
      { id: 'transfers', label: 'التحويلات', path: '/inventory/transfers' }
    ]
  },
  {
    id: 'warehouses',
    icon: Warehouse,
    label: 'المستودعات',
    path: '/warehouses',
    subItems: [
      { id: 'warehouses-list', label: 'قائمة المستودعات', path: '/warehouses' },
      { id: 'truck-tracking', label: 'تتبع الشاحنات', path: '/warehouses/tracking' }
    ]
  },
  {
    id: 'attendance',
    icon: Clock,
    label: 'الحضور والانصراف',
    path: '/attendance'
  },
  {
    id: 'reports',
    icon: FileBarChart,
    label: 'التقارير',
    path: '/reports'
  },
  {
    id: 'activities',
    icon: Activity,
    label: 'النشاطات',
    path: '/activities'
  },
  {
    id: 'users',
    icon: Users,
    label: 'المستخدمين',
    path: '/users'
  }
];