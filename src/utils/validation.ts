import { z } from 'zod';

export const assetSchema = z.object({
  name: z.string().min(3, 'اسم الأصل يجب أن يكون 3 أحرف على الأقل'),
  serialNumber: z.string().min(1, 'الرقم التسلسلي مطلوب'),
  location: z.string().min(1, 'الموقع مطلوب'),
  status: z.enum(['active', 'maintenance', 'inactive']),
});

export const workOrderSchema = z.object({
  type: z.enum(['maintenance', 'repair', 'inspection']),
  assetId: z.string().min(1, 'الأصل مطلوب'),
  description: z.string().min(10, 'الوصف يجب أن يكون 10 أحرف على الأقل'),
  startDate: z.string().min(1, 'تاريخ البدء مطلوب'),
  endDate: z.string().min(1, 'تاريخ الانتهاء مطلوب'),
  resources: z.array(z.string()).min(1, 'يجب تحديد مورد واحد على الأقل'),
});

export const inventoryItemSchema = z.object({
  name: z.string().min(3, 'اسم المادة يجب أن يكون 3 أحرف على الأقل'),
  quantity: z.number().min(0, 'الكمية يجب أن تكون 0 أو أكثر'),
  minimumStock: z.number().min(0, 'الحد الأدنى يجب أن يكون 0 أو أكثر'),
  location: z.string().min(1, 'الموقع مطلوب'),
  supplier: z.string().min(1, 'المورد مطلوب'),
});