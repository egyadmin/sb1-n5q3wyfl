export type CorrespondenceType = 'incoming' | 'outgoing';

export type CorrespondenceStatus = 'new' | 'in-progress' | 'completed' | 'archived';

export type CorrespondencePriority = 'low' | 'medium' | 'high';

export type CorrespondenceCategory = 
  | 'inventory_request'    // طلب مخزون
  | 'maintenance_request'  // طلب صيانة
  | 'transfer_request'     // طلب نقل
  | 'report'              // تقرير
  | 'approval'            // موافقة
  | 'inquiry'             // استفسار
  | 'other';              // أخرى

export interface TrackingEvent {
  location: string;
  date: string;
  action: string;
  user: string;
  notes?: string;
  status?: CorrespondenceStatus;
}

export interface CorrespondenceTracking {
  currentLocation: string;
  history: TrackingEvent[];
}

export interface Correspondence {
  id: string;
  subject: string;
  type: CorrespondenceType;
  category: CorrespondenceCategory;
  status: CorrespondenceStatus;
  priority: CorrespondencePriority;
  sender: {
    warehouseId: string;
    warehouseName: string;
    departmentId?: string;
    departmentName?: string;
  };
  recipient: {
    warehouseId: string;
    warehouseName: string;
    departmentId?: string;
    departmentName?: string;
  };
  date: string;
  dueDate?: string;
  attachments?: string[];
  tags?: string[];
  notes?: string;
  tracking: CorrespondenceTracking;
}