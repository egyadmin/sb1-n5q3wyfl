export interface Crusher {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  capacity: number;
  currentProduction: number;
  location: string;
  status: 'active' | 'maintenance' | 'inactive';
  maintenanceSchedule: {
    lastMaintenance: string;
    nextMaintenance: string;
  };
  fuelConsumption?: {
    hourly: number;
    daily: number;
    supplier: string;
  };
}

export type MaterialSize = 
  | '40mm'  // للأساسات الكبيرة وصب الطرق
  | '20mm'  // للخرسانة المسلحة
  | '10mm'  // للخرسانة الدقيقة
  | '5mm'   // للطبقات السطحية
  | 'fine'  // رمل ناعم
  | 'coarse' // رمل خشن
  | 'dust'  // غبار حجري
;

export type MaterialType = 
  | 'crushed-rock'  // الركام الخشن
  | 'sand'         // الركام الناعم
  | 'stone-dust'   // الغبار الحجري
  | 'granular'     // مواد التربة الحبيبية
  | 'cement'       // الأسمنت
  | 'admixture'    // الإضافات الخرسانية
  | 'fiber'        // الألياف
;

export type CementType = 
  | 'OPC'  // الأسمنت البورتلاندي العادي
  | 'SRC'  // الأسمنت المقاوم للكبريتات
  | 'PPC'  // الأسمنت البوزولاني
;

export type FiberType = 
  | 'steel'     // ألياف فولاذية
  | 'plastic'   // ألياف بلاستيكية
  | 'glass'     // ألياف زجاجية
;

export type ConcreteType = 
  | 'normal'    // خرسانة عادية
  | 'reinforced' // خرسانة مسلحة
  | 'high-strength' // خرسانة عالية المقاومة
  | 'self-compacting' // خرسانة ذاتية الدمك
  | 'lightweight' // خرسانة خفيفة الوزن
;

export interface ProductionMaterial {
  id: string;
  name: string;
  type: MaterialType;
  size?: MaterialSize;
  density: number;
  stockQuantity: number;
  unit: string;
  location: string;
  specifications?: {
    cementType?: CementType;
    fiberType?: FiberType;
    concreteType?: ConcreteType;
    grade?: string;
    strength?: string;
    composition?: string;
    mixRatio?: string;
    waterContent?: string;
    additives?: string[];
  };
}

export interface FuelConsumption {
  crusherId: string;
  date: string;
  hourlyConsumption: number;
  dailyConsumption: number;
  efficiency: number;
  supplier: string;
  cost: number;
}