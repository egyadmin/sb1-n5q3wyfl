import React, { useState } from 'react';
import { X, Plus, Minus, User, Phone, Mail, Wrench, Calendar } from 'lucide-react';

interface MaintenanceTeamFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function MaintenanceTeamForm({ onSubmit, onClose }: MaintenanceTeamFormProps) {
  const [members, setMembers] = useState<string[]>(['']);
  const [skills, setSkills] = useState<string[]>(['']);

  const handleAddMember = () => {
    setMembers([...members, '']);
  };

  const handleRemoveMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name'),
      specialization: formData.get('specialization'),
      members: members.filter(Boolean),
      skills: skills.filter(Boolean),
      availability: formData.get('availability'),
      contact: {
        phone: formData.get('phone'),
        email: formData.get('email')
      },
      workingHours: {
        start: formData.get('workStart'),
        end: formData.get('workEnd')
      },
      location: formData.get('location')
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">إضافة فريق صيانة جديد</h2>
            <p className="mt-1 text-sm text-gray-500">إدخال بيانات فريق الصيانة الجديد</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم الفريق</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="مثال: فريق الصيانة الميكانيكية"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">التخصص</label>
              <select
                name="specialization"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">اختر التخصص</option>
                <option value="mechanical">ميكانيكا</option>
                <option value="electrical">كهرباء</option>
                <option value="hvac">تكييف وتبريد</option>
                <option value="plumbing">سباكة</option>
                <option value="general">صيانة عامة</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">أعضاء الفريق</label>
              <button
                type="button"
                onClick={handleAddMember}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="w-4 h-4 ml-1" />
                إضافة عضو
              </button>
            </div>
            <div className="space-y-3">
              {members.map((member, index) => (
                <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) => {
                          const newMembers = [...members];
                          newMembers[index] = e.target.value;
                          setMembers(newMembers);
                        }}
                        className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="اسم العضو"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">المهارات والكفاءات</label>
              <button
                type="button"
                onClick={handleAddSkill}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="w-4 h-4 ml-1" />
                إضافة مهارة
              </button>
            </div>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...skills];
                          newSkills[index] = e.target.value;
                          setSkills(newSkills);
                        }}
                        className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="المهارة أو الكفاءة"
                      />
                      <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  {skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
              <div className="mt-1 relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="05xxxxxxxx"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  required
                  className="block w-full pr-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="example@domain.com"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">ساعات العمل</label>
              <div className="mt-1 grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="time"
                    name="workStart"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    type="time"
                    name="workEnd"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الحالة</label>
              <select
                name="availability"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="available">متاح</option>
                <option value="busy">مشغول</option>
                <option value="off">خارج الدوام</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">موقع العمل</label>
            <select
              name="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">اختر الموقع</option>
              <option value="مستودع أ">مستودع أ</option>
              <option value="مستودع ب">مستودع ب</option>
              <option value="مستودع ج">مستودع ج</option>
              <option value="ورشة الصيانة">ورشة الصيانة</option>
            </select>
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
              إضافة الفريق
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}