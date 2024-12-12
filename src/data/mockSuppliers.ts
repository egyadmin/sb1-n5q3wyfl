import type { Supplier } from '../types/warehouse';

export const mockSuppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: 'شركة التوريدات الأولى',
    code: 'SP-2024-001',
    contactPerson: 'أحمد محمد',
    phone: '0501234567',
    email: 'info@supplier1.com',
    address: 'الرياض - المنطقة الصناعية',
    type: 'local',
    status: 'active',
    paymentTerms: 'صافي 30 يوم',
    balance: 50000,
    transactions: []
  },
  {
    id: 'SUP002',
    name: 'شركة أرامكو السعودية',
    code: 'SP-2024-002',
    contactPerson: 'خالد العتيبي',
    phone: '0502345678',
    email: 'support@aramco.com',
    address: 'الظهران - المنطقة الشرقية',
    type: 'local',
    status: 'active',
    paymentTerms: 'صافي 45 يوم',
    balance: 150000,
    transactions: []
  }
];