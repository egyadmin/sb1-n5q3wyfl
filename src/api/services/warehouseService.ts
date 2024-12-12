```typescript
import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { Warehouse } from '../../types/warehouse';

export const warehouseService = {
  async getWarehouses(): Promise<Warehouse[]> {
    const response = await apiClient.get(API_ENDPOINTS.WAREHOUSES);
    return response.data;
  },

  async getWarehouse(id: string): Promise<Warehouse> {
    const response = await apiClient.get(`${API_ENDPOINTS.WAREHOUSES}/${id}`);
    return response.data;
  },

  async createWarehouse(warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse> {
    const response = await apiClient.post(API_ENDPOINTS.WAREHOUSES, warehouse);
    return response.data;
  },

  async updateWarehouse(id: string, warehouse: Partial<Warehouse>): Promise<Warehouse> {
    const response = await apiClient.put(`${API_ENDPOINTS.WAREHOUSES}/${id}`, warehouse);
    return response.data;
  },

  async deleteWarehouse(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.WAREHOUSES}/${id}`);
  },

  async getWarehouseInventory(id: string): Promise<any[]> {
    const response = await apiClient.get(
      API_ENDPOINTS.WAREHOUSE_INVENTORY.replace(':id', id)
    );
    return response.data;
  }
};
```