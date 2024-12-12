export type Module = 
  | 'dashboard'
  | 'assets'
  | 'workOrders'
  | 'inventory'
  | 'reports'
  | 'activities'
  | 'warehouses'
  | 'attendance'
  | 'users'
  | 'correspondence'
  | 'production'
  | 'suppliers'
  | 'local-content';

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  category: AssetCategory;
  location: string;
  status: 'active' | 'maintenance' | 'inactive';
  lastUpdated: string;
  specifications?: Record<string, string>;
  purchaseDate?: string;
  warrantyEnd?: string;
  value?: number;
  department?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minimumStock: number;
  location: string;
  category: 'spare-parts' | 'raw-materials' | 'packaging';
  supplier?: string;
  price?: number;
  consumed?: number;
}

export interface WorkOrder {
  id: string;
  type: 'maintenance' | 'repair' | 'inspection' | 'installation' | 'upgrade';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assetId: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo: string[];
  resources: string[];
  notes?: string;
  location: string;
  department: string;
}

export interface MaintenanceEvent {
  id: string;
  assetId: string;
  type: 'preventive' | 'corrective';
  title: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  technician: string;
  duration: number;
  notes?: string;
}

export interface StockItem {
  id: string;
  name: string;
  expected: number;
  actual: number;
  location: string;
  lastCount: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface Shipment {
  id: string;
  type: 'incoming' | 'outgoing';
  status: 'pending' | 'in-transit' | 'delivered';
  origin: string;
  destination: string;
  items: Array<{
    id: string;
    quantity: number;
  }>;
  departureDate?: string;
  arrivalDate?: string;
  trackingNumber?: string;
}