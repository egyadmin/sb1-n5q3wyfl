import React, { useState } from 'react';
import { User, Mail, Phone, Building2, MapPin, Shield, Key, Camera, Save, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockUsers } from '../../data/mockUsers';
import { getRoleText } from '../../data/mockUsers';
import ProfileSecurity from './ProfileSecurity';
import ProfileActivity from './ProfileActivity';

export default function ProfilePage() {
  const [user] = useState(mockUsers[0]); // Using first user as example
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'activity'>('profile');
  const { language } = useLanguage();

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="absolute -bottom-12 right-8 flex items-end space-x-4 rtl:space-x-reverse">
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-lg shadow-lg p-1">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
              <p className="text-blue-100">{getRoleText(user.role)}</p>
            </div>
          </div>
        </div>
        
        <div className="pt-16 px-8 pb-6">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                الملف الشخصي
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === 'security' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                الأمان
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                  activeTab === 'activity' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                النشاط
              </button>
            </div>
            {activeTab === 'profile' && (
              <div>
                {isEditing ? (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    تعديل الملف الشخصي
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
                <div className="mt-1 relative rounded-lg">
                  <input
                    type="text"
                    value={editedUser.fullName}
                    onChange={(e) => setEditedUser({ ...editedUser, fullName: e.target.value })}
                    disabled={!isEditing}
                    className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                <div className="mt-1 relative rounded-lg">
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    disabled={!isEditing}
                    className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">رقم الجوال</label>
                <div className="mt-1 relative rounded-lg">
                  <input
                    type="tel"
                    value={editedUser.phone}
                    onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                    disabled={!isEditing}
                    className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                    dir="ltr"
                  />
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">الرقم الوظيفي</label>
                <div className="mt-1 relative rounded-lg">
                  <input
                    type="text"
                    value={editedUser.employeeId}
                    disabled
                    className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                  <Building2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">الوظيفة</label>
                <div className="mt-1 relative rounded-lg">
                  <input
                    type="text"
                    value={getRoleText(editedUser.role)}
                    disabled
                    className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                  <Shield className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {editedUser.warehouse && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">المستودع</label>
                  <div className="mt-1 relative rounded-lg">
                    <input
                      type="text"
                      value={editedUser.warehouse}
                      disabled
                      className="block w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'security' && <ProfileSecurity />}
        {activeTab === 'activity' && <ProfileActivity />}
      </div>
    </div>
  );
}