import React from 'react';
import { Clock, Users, Calendar, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export default function AttendanceDashboard() {
  const handleOpenAttendanceSystem = () => {
    window.open('https://attendance-1.netlify.app/', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">نظام الحضور</h2>
          <p className="mt-1 text-sm text-gray-500">
            متابعة وإدارة حضور وانصراف الموظفين
          </p>
        </div>
        <button
          onClick={handleOpenAttendanceSystem}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4 ml-2" />
          فتح نظام الحضور
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleOpenAttendanceSystem}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-green-600">+12</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">الموظفين الحاضرين</h3>
          <p className="text-2xl font-semibold mt-1">45</p>
        </div>

        <div 
          className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleOpenAttendanceSystem}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm font-medium text-red-600">-3</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">الغياب</h3>
          <p className="text-2xl font-semibold mt-1">5</p>
        </div>

        <div 
          className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleOpenAttendanceSystem}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm font-medium text-yellow-600">+2</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">التأخير</h3>
          <p className="text-2xl font-semibold mt-1">3</p>
        </div>

        <div 
          className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleOpenAttendanceSystem}
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">98%</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">نسبة الحضور</h3>
          <p className="text-2xl font-semibold mt-1">98%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={handleOpenAttendanceSystem}
          className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02]"
        >
          <Clock className="w-6 h-6 ml-3" />
          <div className="text-right">
            <h3 className="font-semibold">تسجيل الحضور</h3>
            <p className="text-sm opacity-90">تسجيل حضور الموظفين</p>
          </div>
        </button>

        <button
          onClick={handleOpenAttendanceSystem}
          className="flex items-center justify-center p-6 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-[1.02]"
        >
          <Calendar className="w-6 h-6 ml-3" />
          <div className="text-right">
            <h3 className="font-semibold">جدول الدوام</h3>
            <p className="text-sm opacity-90">عرض جدول الدوام</p>
          </div>
        </button>

        <button
          onClick={handleOpenAttendanceSystem}
          className="flex items-center justify-center p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-[1.02]"
        >
          <Users className="w-6 h-6 ml-3" />
          <div className="text-right">
            <h3 className="font-semibold">إدارة الموظفين</h3>
            <p className="text-sm opacity-90">إدارة بيانات الموظفين</p>
          </div>
        </button>
      </div>

      {/* Integration Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <ExternalLink className="w-5 h-5 text-blue-600 ml-3" />
          <div>
            <h4 className="font-medium text-blue-900">نظام الحضور متكامل</h4>
            <p className="text-sm text-blue-700">انقر على أي من العناصر أعلاه للانتقال إلى نظام الحضور المتكامل</p>
          </div>
        </div>
        <button
          onClick={handleOpenAttendanceSystem}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          فتح النظام
        </button>
      </div>
    </div>
  );
}