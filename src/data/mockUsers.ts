import type { User, Permission } from '../types/user';

export const permissions: Permission[] = [
  // الأصول
  { id: 'assets.view', name: 'عرض الأصول', description: 'عرض قائمة الأصول وتفاصيلها', module: 'assets' },
  { id: 'assets.create', name: 'إضافة أصول', description: 'إضافة أصول جديدة', module: 'assets' },
  { id: 'assets.edit', name: 'تعديل الأصول', description: 'تعديل بيانات الأصول', module: 'assets' },
  { id: 'assets.delete', name: 'حذف الأصول', description: 'حذف الأصول من النظام', module: 'assets' },
  
  // المخزون
  { id: 'inventory.view', name: 'عرض المخزون', description: 'عرض حالة المخزون', module: 'inventory' },
  { id: 'inventory.manage', name: 'إدارة المخزون', description: 'إدارة المخزون وتعديله', module: 'inventory' },
  { id: 'inventory.transfer', name: 'تحويل المخزون', description: 'تحويل المخزون بين المستودعات', module: 'inventory' },
  
  // أوامر العمل
  { id: 'workorders.view', name: 'عرض أوامر العمل', description: 'عرض أوامر العمل', module: 'workorders' },
  { id: 'workorders.create', name: 'إنشاء أوامر عمل', description: 'إنشاء أوامر عمل جديدة', module: 'workorders' },
  { id: 'workorders.manage', name: 'إدارة أوامر العمل', description: 'إدارة وتحديث أوامر العمل', module: 'workorders' },
  
  // التقارير
  { id: 'reports.view', name: 'عرض التقارير', description: 'عرض التقارير', module: 'reports' },
  { id: 'reports.export', name: 'تصدير التقارير', description: 'تصدير التقارير', module: 'reports' },
  
  // المستخدمين
  { id: 'users.view', name: 'عرض المستخدمين', description: 'عرض قائمة المستخدمين', module: 'users' },
  { id: 'users.manage', name: 'إدارة المستخدمين', description: 'إدارة المستخدمين وصلاحياتهم', module: 'users' },
];

export const mockUsers: User[] = [
  {
    id: 'U001',
    username: 'admin',
    password: '123456',
    employeeId: 'EMP001',
    fullName: 'أحمد محمد',
    email: 'admin@example.com',
    phone: '+966501234567',
    role: 'super_admin',
    permissions: permissions.map(p => p.id),
    isActive: true,
    lastLogin: '2024-03-20T10:30:00',
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: 'U002',
    username: 'branch_manager',
    password: '123456',
    employeeId: 'EMP002',
    fullName: 'خالد عبدالله',
    email: 'branch@example.com',
    phone: '+966507654321',
    role: 'branch_manager',
    branch: 'الرياض',
    permissions: [
      'assets.view', 'inventory.view', 'workorders.view', 'reports.view'
    ],
    isActive: true,
    lastLogin: '2024-03-19T15:45:00',
    createdAt: '2024-01-02T00:00:00'
  },
  {
    id: 'U003',
    username: 'warehouse_manager',
    password: '123456',
    employeeId: 'EMP003',
    fullName: 'محمد علي',
    email: 'warehouse@example.com',
    phone: '+966509876543',
    role: 'warehouse_manager',
    warehouse: 'مستودع أ',
    permissions: [
      'inventory.view', 'inventory.manage', 'workorders.view', 'reports.view'
    ],
    isActive: true,
    lastLogin: '2024-03-20T09:15:00',
    createdAt: '2024-01-03T00:00:00'
  }
];

export const getRoleText = (role: User['role']): string => {
  switch (role) {
    case 'super_admin':
      return 'مدير النظام';
    case 'branch_manager':
      return 'مدير فرع';
    case 'area_manager':
      return 'مدير منطقة';
    case 'warehouse_manager':
      return 'مدير مستودع';
    case 'inventory_manager':
      return 'مدير مخزون';
    case 'maintenance_manager':
      return 'مدير صيانة';
    case 'driver':
      return 'سائق';
    case 'employee':
      return 'موظف';
    default:
      return role;
  }
};