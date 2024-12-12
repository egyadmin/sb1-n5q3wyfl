export type UserRole = 
  | 'super_admin'    // مدير النظام
  | 'branch_manager' // مدير فرع
  | 'area_manager'   // مدير منطقة
  | 'warehouse_manager' // مدير مستودع
  | 'inventory_manager' // مدير مخزون
  | 'maintenance_manager' // مدير صيانة
  | 'driver'        // سائق
  | 'employee'      // موظف
;

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  branch?: string;
  area?: string;
  warehouse?: string;
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}