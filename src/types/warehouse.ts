// Previous imports remain the same...

export interface SupplierContract {
  id: string;
  file: File;
  fileName: string;
  uploadDate: string;
  type: 'pdf' | 'doc' | 'docx';
  size: number;
  terms?: {
    startDate: string;
    endDate: string;
    value?: number;
    paymentTerms?: string;
    deliveryTerms?: string;
  };
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  type: 'local' | 'international';
  status: 'active' | 'inactive';
  paymentTerms?: string;
  balance: number;
  transactions: SupplierTransaction[];
  contracts?: SupplierContract[];
}

// Rest of the types remain the same...