```typescript
import apiClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { Asset } from '../../types';

export const assetService = {
  async getAssets(): Promise<Asset[]> {
    const response = await apiClient.get(API_ENDPOINTS.ASSETS);
    return response.data;
  },

  async getAsset(id: string): Promise<Asset> {
    const response = await apiClient.get(`${API_ENDPOINTS.ASSETS}/${id}`);
    return response.data;
  },

  async createAsset(asset: Omit<Asset, 'id'>): Promise<Asset> {
    const response = await apiClient.post(API_ENDPOINTS.ASSETS, asset);
    return response.data;
  },

  async updateAsset(id: string, asset: Partial<Asset>): Promise<Asset> {
    const response = await apiClient.put(`${API_ENDPOINTS.ASSETS}/${id}`, asset);
    return response.data;
  },

  async deleteAsset(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.ASSETS}/${id}`);
  },

  async getAssetLocations(): Promise<any[]> {
    const response = await apiClient.get(API_ENDPOINTS.ASSET_LOCATIONS);
    return response.data;
  },

  async getMaintenanceSchedule(): Promise<any[]> {
    const response = await apiClient.get(API_ENDPOINTS.MAINTENANCE_SCHEDULE);
    return response.data;
  }
};
```