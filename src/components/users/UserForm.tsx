import React, { useState } from 'react';
import { X, Shield, Building2, MapPin, Warehouse } from 'lucide-react';
import type { User } from '../../types/user';
import { permissions, getRoleText } from '../../data/mockUsers';

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function UserForm({ user, onSubmit, onClose }: UserFormProps) {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'employee');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    user?.permissions || []
  );

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
      isActive: formData.get('isActive') === 'true'
    });
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {user ? 'تعديل مستخدم' : 'إضافة مستخدم جديد'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                اسم المستخدم
              </label>
              <input
                type="text"
                name="username"
                defaultValue={user?.username}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                required={!user}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الرقم الوظيفي
              </label>
              <input
                type="text"
                name="employeeId"
                defaultValue={user?.employeeId}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                الاسم الكامل
              </label>
              <input
                type="text"
                name="fullName"
                defaultValue={user?.fullName}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                رقم الجوال
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={user?.phone}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              الوظيفة
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as User['role'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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

          <div className="grid grid-cols-3 gap-6">
            {selectedRole === 'branch_manager' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  الفرع
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="branch"
                    defaultValue={user?.branch}
                    required
                    className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            )}

            {selectedRole === 'area_manager' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  المنطقة
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="area"
                    defaultValue={user?.area}
                    required
                    className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            )}

            {selectedRole === 'warehouse_manager' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  المستودع
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="warehouse"
                    defaultValue={user?.warehouse}
                    required
                    className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Warehouse className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              الصلاحيات
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {permissions.map((permission) => (
                <label
                  key={permission.id}
                  className="relative flex items-start p-4 rounded-lg border hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1 text-sm">
                    <div className="font-medium text-gray-700">
                      {permission.name}
                    </div>
                    <p className="text-gray-500">{permission.description}</p>
                  </div>
                  <div className="mr-3 flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => togglePermission(permission.id)}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={user?.isActive ?? true}
              value="true"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="mr-2 block text-sm text-gray-900">
              حساب نشط
            </label>
          </div>

          <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
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
              {user ? 'حفظ التغييرات' : 'إضافة المستخدم'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}