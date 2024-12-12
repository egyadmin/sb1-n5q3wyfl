export type AssetCategory = 
  | 'equipment'    // معدات
  | 'devices'      // أجهزة
  | 'real-estate'  // عقارات
  | 'farms'        // مزارع
  | 'crushers'     // كسارات
  | 'office'       // أصول مكتبية
  | 'printers'     // طابعات
  | 'mobile'       // أجهزة محمولة
;

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
  maintenanceSchedule?: {
    lastMaintenance: string;
    nextMaintenance: string;
    frequency: number;
    type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  };
}

// Rest of the types remain the same...