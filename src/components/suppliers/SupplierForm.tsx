import React, { useState, useRef } from 'react';
import { X, Save, Building2, Phone, Mail, MapPin, Banknote, Upload, File, Trash2 } from 'lucide-react';
import type { Supplier, SupplierContract } from '../../types/warehouse';

interface SupplierFormProps {
  onSubmit: (data: Omit<Supplier, 'id' | 'transactions'>) => void;
  onClose: () => void;
  initialData?: Supplier;
}

export default function SupplierForm({ onSubmit, onClose, initialData }: SupplierFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    contactPerson: initialData?.contactPerson || '',
    phone: initialData?.phone || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    type: initialData?.type || 'local',
    status: initialData?.status || 'active',
    paymentTerms: initialData?.paymentTerms || '',
    balance: initialData?.balance || 0
  });

  const [contracts, setContracts] = useState<SupplierContract[]>(initialData?.contracts || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('يرجى اختيار ملف بصيغة PDF أو Word فقط');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('حجم الملف يجب أن لا يتجاوز 10 ميجابايت');
      return;
    }

    const newContract: SupplierContract = {
      id: `CNT${contracts.length + 1}`.padStart(5, '0'),
      file,
      fileName: file.name,
      uploadDate: new Date().toISOString(),
      type: file.type.includes('pdf') ? 'pdf' : 'docx',
      size: file.size,
      terms: {
        startDate: '',
        endDate: '',
        value: 0,
        paymentTerms: '',
        deliveryTerms: ''
      }
    };

    setContracts([...contracts, newContract]);
  };

  const handleRemoveContract = (contractId: string) => {
    setContracts(contracts.filter(c => c.id !== contractId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      contracts
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Building2 className="w-6 h-6 text-blue-600 ml-2" />
            <div>
              <h2 className="text-xl font-semibold">
                {initialData ? 'تعديل بيانات المورد' : 'إضافة مورد جديد'}
              </h2>
              <p className="text-sm text-gray-500">إدارة بيانات الموردين</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم المورد</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">رقم المورد</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">الشخص المسؤول</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">العنوان</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <div className="absolute top-3 right-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">نوع المورد</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'local' | 'international' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="local">محلي</option>
                <option value="international">دولي</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الحالة</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">شروط الدفع</label>
              <input
                type="text"
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="مثال: صافي 30 يوم"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">الرصيد الحالي</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) })}
                  className="block w-full pr-10 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  readOnly={!!initialData}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Banknote className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Contract Upload Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">العقود والمستندات</h3>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 ml-2" />
                رفع ملف
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </div>

            <div className="space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <File className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-gray-900">
                        {contract.fileName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(contract.size)} • تم الرفع {new Date(contract.uploadDate).toLocaleDateString('ar-SA')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveContract(contract.id)}
                    className="p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {contracts.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">
                    قم برفع ملفات العقود والمستندات
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    يدعم PDF و Word فقط، الحد الأقصى 10 ميجابايت
                  </p>
                </div>
              )}
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
              <Save className="w-4 h-4 ml-2 inline-block" />
              {initialData ? 'حفظ التغييرات' : 'إضافة المورد'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}