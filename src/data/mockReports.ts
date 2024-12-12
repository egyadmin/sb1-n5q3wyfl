// Mock data for Traffic Violations
export const trafficViolations = [
  {
    id: 'TV001',
    violationId: 'V2024-001',
    equipmentNumber: 'EQ-2024-001',
    operatorNumber: 'OP-001',
    date: '2024-03-15',
    location: 'طريق الملك فهد - الرياض',
    type: 'تجاوز السرعة',
    fine: 500,
    status: 'pending'
  },
  {
    id: 'TV002',
    violationId: 'V2024-002',
    equipmentNumber: 'EQ-2024-002',
    operatorNumber: 'OP-002',
    date: '2024-03-14',
    location: 'طريق الدمام - الخبر',
    type: 'وقوف خاطئ',
    fine: 300,
    status: 'paid'
  }
];

// Mock data for Employee Custody
export const employeeCustodies = [
  {
    seq: 1,
    custodyType: 'معدات',
    cirNumber: 'CIR-2024-001',
    cirDate: '2024-03-15',
    itemNumber: 'ITEM-001',
    description: 'لابتوب HP EliteBook',
    unit: 'قطعة',
    serialNumber: 'SN123456',
    unitPrice: 4500,
    quantity: 1,
    remarks: 'حالة ممتازة'
  },
  {
    seq: 2,
    custodyType: 'أجهزة',
    cirNumber: 'CIR-2024-002',
    cirDate: '2024-03-14',
    itemNumber: 'ITEM-002',
    description: 'طابعة HP LaserJet',
    unit: 'قطعة',
    serialNumber: 'SN789012',
    unitPrice: 1200,
    quantity: 1,
    remarks: 'تحتاج صيانة'
  }
];

// Mock data for Equipment Inquiry
export const equipmentRecords = [
  {
    equipmentNo: 'EQ-001',
    description: 'رافعة شوكية تويوتا',
    regNoEng: 'FL-2024-001',
    regNoArb: 'ش-٢٠٢٤-٠٠١',
    status: 'working',
    operatorNumber: 'OP-001',
    operatorName: 'أحمد محمد',
    project: 'مستودع الرياض',
    location: 'المنطقة الصناعية',
    custodyDate: '2024-01-01',
    attachments: ['maintenance.pdf', 'inspection.pdf']
  },
  {
    equipmentNo: 'EQ-002',
    description: 'شاحنة نقل مرسيدس',
    regNoEng: 'TR-2024-002',
    regNoArb: 'ش-٢٠٢٤-٠٠٢',
    status: 'standby',
    operatorNumber: 'OP-002',
    operatorName: 'خالد عبدالله',
    project: 'مستودع جدة',
    location: 'المنطقة الصناعية الثانية',
    custodyDate: '2024-02-01',
    attachments: ['registration.pdf']
  }
];