import type { Warehouse } from '../types/warehouse';

export const mockWarehouses: Warehouse[] = [
  {
    id: 'WH001',
    name: 'مستودع أ',
    location: 'الرياض - المنطقة الصناعية',
    capacity: 10000,
    usedCapacity: 6500,
    coordinates: {
      lat: 24.7136,
      lng: 46.6753
    },
    sections: [
      {
        id: 'S001',
        name: 'منطقة التخزين الرئيسية',
        type: 'storage',
        capacity: 5000,
        usedCapacity: 3500,
        items: []
      },
      {
        id: 'S002',
        name: 'منطقة الاستلام',
        type: 'receiving',
        capacity: 2000,
        usedCapacity: 1500,
        items: []
      },
      {
        id: 'S003',
        name: 'منطقة الشحن',
        type: 'shipping',
        capacity: 2000,
        usedCapacity: 1000,
        items: []
      }
    ],
    assets: [],
    inventory: [
      {
        id: 'INV001',
        name: 'قطع غيار محركات',
        quantity: 150,
        minimumStock: 50,
        location: 'رف A1',
        category: 'spare-parts'
      },
      {
        id: 'INV002',
        name: 'مواد خام',
        quantity: 300,
        minimumStock: 100,
        location: 'رف B2',
        category: 'raw-materials'
      }
    ]
  },
  {
    id: 'WH002',
    name: 'مستودع ب',
    location: 'جدة - المنطقة الصناعية',
    capacity: 8000,
    usedCapacity: 4500,
    coordinates: {
      lat: 21.5433,
      lng: 39.1728
    },
    sections: [
      {
        id: 'S001',
        name: 'منطقة التخزين الرئيسية',
        type: 'storage',
        capacity: 4000,
        usedCapacity: 2500,
        items: []
      },
      {
        id: 'S002',
        name: 'منطقة الاستلام والشحن',
        type: 'receiving',
        capacity: 3000,
        usedCapacity: 1500,
        items: []
      }
    ],
    assets: [],
    inventory: [
      {
        id: 'INV003',
        name: 'مواد تغليف',
        quantity: 200,
        minimumStock: 75,
        location: 'رف C1',
        category: 'packaging'
      }
    ]
  },
  {
    id: 'WH003',
    name: 'مستودع ج',
    location: 'الدمام - المنطقة الصناعية الثانية',
    capacity: 6000,
    usedCapacity: 3200,
    coordinates: {
      lat: 26.3927,
      lng: 50.1810
    },
    sections: [
      {
        id: 'S001',
        name: 'منطقة التخزين الرئيسية',
        type: 'storage',
        capacity: 3000,
        usedCapacity: 1800,
        items: []
      },
      {
        id: 'S002',
        name: 'منطقة الاستلام',
        type: 'receiving',
        capacity: 1500,
        usedCapacity: 800,
        items: []
      },
      {
        id: 'S003',
        name: 'منطقة الصيانة',
        type: 'maintenance',
        capacity: 1500,
        usedCapacity: 600,
        items: []
      }
    ],
    assets: [],
    inventory: [
      {
        id: 'INV004',
        name: 'قطع غيار معدات',
        quantity: 120,
        minimumStock: 40,
        location: 'رف D1',
        category: 'spare-parts'
      }
    ]
  }
];