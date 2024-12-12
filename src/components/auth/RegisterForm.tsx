import React, { useState } from 'react';
import { User, Mail, Lock, Building2, MapPin, Shield, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { permissions } from '../../data/mockUsers';
import type { UserRole } from '../../types/user';

interface RegisterFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function RegisterForm({ onSubmit, onClose }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('employee');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      username: formData.get('username'),
      password: formData.get('password'),
      employeeId: formData.get('employeeId'),
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      role: selectedRole,
      branch: formData.get('branch'),
      area: formData.get('area'),
      warehouse: formData.get('warehouse'),
      permissions: selectedPermissions,
      isActive: true
    });
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const getPermissionsByModule = () => {
    const modules = new Map<string, typeof permissions>();
    permissions.forEach(permission => {
      const existing = modules.get(permission.module) || [];
      modules.set(permission.module, [...existing, permission]);
    });
    return modules;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <div>
            <h2 className="text-xl font-semibold text-white">تسجيل مستخدم جديد</h2>
            <p className="mt-1 text-sm text-blue-100">إنشاء حساب جديد مع تحديد الصلاحيات</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم المستخدم</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="username"
                  required
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الرقم الوظيفي</label>
              <input
                type="text"
                name="employeeId"
                required
                className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
              <input
                type="text"
                name="fullName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">رقم الجوال</label>
              <input
                type="tel"
                name="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                dir="ltr"
              />
            </div>
          </div>

          {/* Role and Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوظيفة</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="super_admin">مدير النظام</option>
              <option value="branch_manager">مدير فرع</option>
              <option value="area_manager">مدير منطقة</option>
              <option value="warehouse_manager">مدير مستودع</option>
              <option value="inventory_manager">مدير مخزون</option>
              <option value="maintenance_manager">مدير صيانة</option>
              <option value="driver">سائق</option>
              <option value="employee">موظف</option>
            </select>
          </div>

          {/* Conditional Location Fields */}
          <div className="grid grid-cols-3 gap-6">
            {selectedRole === 'branch_manager' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">الفرع</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="branch"
                    required
                    className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Building2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            )}

            {selectedRole === 'area_manager' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">المنطقة</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="area"
                    required
                    className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            )}

            {selectedRole === 'warehouse_manager' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">المستودع</label>
                <select
                  name="warehouse"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">اختر المستودع</option>
                  <option value="مستودع أ">مستودع أ</option>
                  <option value="مستودع ب">مستودع ب</option>
                  <option value="مستودع ج">مستودع ج</option>
                </select>
              </div>
            )}
          </div>

          {/* Permissions Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              الصلاحيات
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from(getPermissionsByModule()).map(([module, modulePermissions]) => (
                <div key={module} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">{module}</h4>
                  <div className="space-y-2">
                    {modulePermissions.map((permission) => (
                      <label
                        key={permission.id}
                        className="flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {permission.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {permission.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              تسجيل المستخدم
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}