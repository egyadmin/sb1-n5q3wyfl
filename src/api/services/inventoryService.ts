```typescript
import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { InventoryItem } from '../../types';

export const inventoryService = {
  async getInventory(): Promise<InventoryItem[]> {
    const response = await apiClient.get(API_ENDPOINTS.INVENTORY);
    return response.data;
  },

  async getItem(id: string): Promise<InventoryItem> {
    const response = await apiClient.get(`${API_ENDPOINTS.INVENTORY}/${id}`);
    return response.data;
  },

  async createItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const response = await apiClient.post(API_ENDPOINTS.INVENTORY, item);
    return response.data;
  },

  async updateItem(id: string, item: Partial<InventoryItem>): Promise<InventoryItem> {
    const response = await apiClient.put(`${API_ENDPOINTS.INVENTORY}/${id}`, item);
    return response.data;
  },

  async deleteItem(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.INVENTORY}/${id}`);
  },

  async getLowStock(): Promise<InventoryItem[]> {
    const response = await apiClient.get(API_ENDPOINTS.LOW_STOCK);
    return response.data;
  },

  async performStockCount(data: any): Promise<void> {
    await apiClient.post(API_ENDPOINTS.STOCK_COUNT, data);
  },

  async createTransfer(data: any): Promise<void> {
    await apiClient.post(API_ENDPOINTS.TRANSFERS, data);
  }
};
```