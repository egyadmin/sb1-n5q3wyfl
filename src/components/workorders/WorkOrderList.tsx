import React, { useState } from 'react';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Calendar as CalendarIcon,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import type { WorkOrder } from '../../types';
import WorkOrderForm from './WorkOrderForm';

const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO001',
    type: 'maintenance',
    status: 'pending',
    assetId: 'A1234',
    description: 'صيانة دورية للرافعة الشوكية',
    startDate: '2024-03-20',
    endDate: '2024-03-21',
    priority: 'medium',
    assignedTo: ['أحمد محمد'],
    resources: ['فلتر زيت', 'زيت محرك'],
    location: 'مستودع أ',
    department: 'الصيانة'
  },
  {
    id: 'WO002',
    type: 'repair',
    status: 'in-progress',
    assetId: 'A1235',
    description: 'إصلاح عطل في نظام التبريد',
    startDate: '2024-03-19',
    endDate: '2024-03-22',
    priority: 'high',
    assignedTo: ['خالد عبدالله', 'محمد علي'],
    resources: ['وحدة تبريد', 'مواد تبريد'],
    location: 'مستودع ب',
    department: 'التشغيل'
  }
];

export default function WorkOrderList() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleAddWorkOrder = (data: Omit<WorkOrder, 'id'>) => {
    const newWorkOrder: WorkOrder = {
      id: `WO${workOrders.length + 1}`.padStart(5, '0'),
      ...data
    };
    setWorkOrders([...workOrders, newWorkOrder]);
    setShowForm(false);
  };

  const getStatusIcon = (status: WorkOrder['status']) => {
    switch (status) {
      case 'pending':
        return Clock;
      case 'in-progress':
        return Wrench;
      case 'completed':
        return CheckCircle2;
      case 'cancelled':
        return AlertTriangle;
    }
  };

  const getStatusColor = (status: WorkOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: WorkOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'in-progress':
        return 'قيد التنفيذ';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
    }
  };

  const getPriorityColor = (priority: WorkOrder['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityText = (priority: WorkOrder['priority']) => {
    switch (priority) {
      case 'low':
        return 'منخفضة';
      case 'medium':
        return 'متوسطة';
      case 'high':
        return 'عالية';
    }
  };

  const filteredWorkOrders = workOrders.filter(order => {
    const matchesSearch = 
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">أوامر العمل</h2>
          <p className="mt-1 text-sm text-gray-500">
            إدارة ومتابعة أوامر العمل والصيانة
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <button
            onClick={() => navigate('/work-orders/calendar')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <CalendarIcon className="w-4 h-4 ml-2" />
            عرض التقويم
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 ml-2" />
            أمر عمل جديد
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="بحث في أوامر العمل..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد الانتظار</option>
                <option value="in-progress">قيد التنفيذ</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغي</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم الأمر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع والوصف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الأولوية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التواريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفنيين
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredWorkOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.type === 'maintenance' && 'صيانة'}
                        {order.type === 'repair' && 'إصلاح'}
                        {order.type === 'inspection' && 'فحص'}
                        {order.type === 'installation' && 'تركيب'}
                        {order.type === 'upgrade' && 'تحديث'}
                      </div>
                      <div className="text-sm text-gray-500">{order.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                        {getPriorityText(order.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        من: {format(new Date(order.startDate), 'PPP', { locale: ar })}
                      </div>
                      <div className="text-sm text-gray-500">
                        إلى: {format(new Date(order.endDate), 'PPP', { locale: ar })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <StatusIcon className="w-4 h-4 ml-1" />
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {order.assignedTo.map((technician, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {technician}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <WorkOrderForm
          onSubmit={handleAddWorkOrder}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}