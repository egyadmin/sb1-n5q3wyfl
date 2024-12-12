import type { TruckRoute } from '../types/tracking';

export const mockRoutes: TruckRoute[] = [
  {
    id: 'TR001',
    truckId: 'شاحنة-001',
    driverName: 'أحمد محمد',
    driverPhone: '+966501234567',
    driverEmail: 'ahmed@example.com',
    shipmentType: 'incoming',
    status: 'en-route',
    startLocation: 'جدة',
    endLocation: 'الرياض',
    currentLocation: { lat: 24.2, lng: 45.6 },
    startCoordinates: { lat: 21.5433, lng: 39.1728 },
    endCoordinates: { lat: 24.7136, lng: 46.6753 },
    estimatedArrival: '2024-03-20 15:30',
    departureTime: '2024-03-20 08:00',
    cargo: {
      type: 'مواد خام',
      quantity: 2000,
      weight: 15000,
      temperature: 25
    },
    lastUpdate: '2024-03-20 12:30'
  },
  {
    id: 'TR002',
    truckId: 'شاحنة-002',
    driverName: 'خالد عبدالله',
    driverPhone: '+966507654321',
    driverEmail: 'khaled@example.com',
    shipmentType: 'outgoing',
    status: 'en-route',
    startLocation: 'الرياض',
    endLocation: 'الدمام',
    currentLocation: { lat: 25.8, lng: 47.1 },
    startCoordinates: { lat: 24.7136, lng: 46.6753 },
    endCoordinates: { lat: 26.3927, lng: 50.1810 },
    estimatedArrival: '2024-03-20 16:45',
    departureTime: '2024-03-20 09:30',
    cargo: {
      type: 'منتجات نهائية',
      quantity: 1500,
      weight: 12000,
      temperature: 22
    },
    lastUpdate: '2024-03-20 12:30'
  }
];