export interface StockItem {
  id: string;
  name: string;
  expected: number;
  actual: number;
  location: string;
  lastCount: string;
  status: 'pending' | 'in-progress' | 'completed';
  qrCode?: string;
  image?: string;
  notes?: string;
}

export interface StockCount {
  id: string;
  date: string;
  items: StockItem[];
  status: 'pending' | 'in-progress' | 'completed';
  counters: string[];
  notes?: string;
}