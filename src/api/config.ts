// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  
  // Assets
  ASSETS: '/assets',
  ASSET_LOCATIONS: '/assets/locations',
  MAINTENANCE_SCHEDULE: '/assets/maintenance',
  
  // Work Orders
  WORK_ORDERS: '/work-orders',
  MAINTENANCE_TEAMS: '/work-orders/teams',
  
  // Inventory
  INVENTORY: '/inventory',
  STOCK_COUNT: '/inventory/stock-count',
  LOW_STOCK: '/inventory/low-stock',
  TRANSFERS: '/inventory/transfers',
  
  // Warehouses
  WAREHOUSES: '/warehouses',
  WAREHOUSE_INVENTORY: '/warehouses/:id/inventory',
  
  // Reports
  REPORTS: '/reports',
  TRAFFIC_VIOLATIONS: '/reports/traffic-violations',
  EMPLOYEE_CUSTODY: '/reports/employee-custody',
  EQUIPMENT_INQUIRY: '/reports/equipment-inquiry',
  EMPLOYEES_INVENTORY: '/reports/employees-inventory',
  STATISTICS: '/reports/statistics',
};

export const API_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};