import React, { useState } from 'react';
import { Users, Search, Plus, UserPlus, Shield, Key, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { mockUsers, permissions, getRoleText } from '../../data/mockUsers';
import UserForm from './UserForm';
import type { User } from '../../types/user';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = (data: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      id: `U${users.length + 1}`.padStart(4, '0'),
      createdAt: new Date().toISOString(),
      ...data
    };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleEditUser = (data: Partial<User>) => {
    if (!selectedUser) return;
    
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, ...data } : user
    ));
    setSelectedUser(null);
    setShowForm(false);
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">إدارة المستخدمين</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة المستخدمين والصلاحيات
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedUser(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4 ml-2" />
          إضافة مستخدم
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="بحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوظيفة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الصلاحيات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آخر دخول
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowForm(true);
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 ml-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.employeeId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {getRoleText(user.role)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.branch || user.area || user.warehouse || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 3).map((permId) => {
                        const perm = permissions.find(p => p.id === permId);
                        return perm ? (
                          <span
                            key={perm.id}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            <Shield className="w-3 h-3 ml-1" />
                            {perm.name}
                          </span>
                        ) : null;
                      })}
                      {user.permissions.length > 3 && (
                        <span className="text-sm text-gray-500">
                          +{user.permissions.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 ml-1" />
                        {format(new Date(user.lastLogin), 'PPp', { locale: ar })}
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'نشط' : 'غير نشط'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleEditUser : handleAddUser}
          onClose={() => {
            setSelectedUser(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}