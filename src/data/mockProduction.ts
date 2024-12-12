import type { Crusher, ProductionMaterial, FuelConsumption } from '../types/production';

export const mockCrushers: Crusher[] = [
  {
    id: 'CR001',
    name: 'كسارة 1',
    model: 'HP-400',
    manufacturer: 'Metso',
    capacity: 250,
    currentProduction: 220,
    location: 'موقع الإنتاج الرئيسي',
    status: 'active',
    maintenanceSchedule: {
      lastMaintenance: '2024-03-01',
      nextMaintenance: '2024-04-01'
    },
    fuelConsumption: {
      hourly: 45,
      daily: 1080,
      supplier: 'شركة أرامكو السعودية'
    }
  },
  {
    id: 'CR002',
    name: 'كسارة 2',
    model: 'C160',
    manufacturer: 'Sandvik',
    capacity: 300,
    currentProduction: 280,
    location: 'موقع الإنتاج الشرقي',
    status: 'active',
    maintenanceSchedule: {
      lastMaintenance: '2024-03-05',
      nextMaintenance: '2024-04-05'
    },
    fuelConsumption: {
      hourly: 50,
      daily: 1200,
      supplier: 'شركة أرامكو السعودية'
    }
  }
];

export const productionMaterials: ProductionMaterial[] = [
  {
    id: 'PM001',
    name: 'بحص مقاس 3/4',
    type: 'crushed-rock',
    size: '3/4 inch',
    density: 1.6,
    stockQuantity: 2500,
    unit: 'طن',
    location: 'ساحة التخزين أ'
  },
  {
    id: 'PM002',
    name: 'بحص مقاس 3/8',
    type: 'crushed-rock',
    size: '3/8 inch',
    density: 1.6,
    stockQuantity: 1800,
    unit: 'طن',
    location: 'ساحة التخزين ب'
  },
  {
    id: 'PM003',
    name: 'أسفلت',
    type: 'asphalt',
    density: 2.4,
    stockQuantity: 1200,
    unit: 'طن',
    location: 'مستودع الأسفلت',
    specifications: {
      grade: '60/70',
      composition: 'Bitumen 5.2%'
    }
  },
  {
    id: 'PM004',
    name: 'بيتومين',
    type: 'bitumen',
    density: 1.02,
    stockQuantity: 800,
    unit: 'طن',
    location: 'خزان البيتومين',
    specifications: {
      grade: 'PG 64-22'
    }
  },
  {
    id: 'PM005',
    name: 'اسمنت بورتلاندي',
    type: 'cement',
    density: 1.5,
    stockQuantity: 3000,
    unit: 'طن',
    location: 'صوامع الاسمنت',
    specifications: {
      strength: 'Type I/II'
    }
  },
  {
    id: 'PM006',
    name: 'خرسانة جاهزة',
    type: 'concrete',
    density: 2.4,
    stockQuantity: 0,
    unit: 'متر مكعب',
    location: 'محطة الخرسانة',
    specifications: {
      strength: '30 MPa'
    }
  }
];

export const fuelConsumption: FuelConsumption[] = [
  {
    crusherId: 'CR001',
    date: '2024-03-15',
    hourlyConsumption: 45,
    dailyConsumption: 1080,
    efficiency: 92,
    supplier: 'شركة أرامكو السعودية',
    cost: 2160
  },
  {
    crusherId: 'CR002',
    date: '2024-03-15',
    hourlyConsumption: 50,
    dailyConsumption: 1200,
    efficiency: 94,
    supplier: 'شركة أرامكو السعودية',
    cost: 2400
  }
];