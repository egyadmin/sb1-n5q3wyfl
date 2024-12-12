```typescript
import { BaseRepository } from './baseRepository';
import type { Asset } from '../../../types';
import { logger } from '../../utils/logger';

export class AssetRepository extends BaseRepository<Asset> {
  async findAll(): Promise<Asset[]> {
    const result = await this.executeQuery<Asset[]>(
      `SELECT * FROM wms_assets WHERE is_deleted = 0 ORDER BY last_updated DESC`
    );

    if (!result.success) {
      logger.error('Failed to fetch assets:', result.error);
      throw result.error;
    }

    return result.data || [];
  }

  async findById(id: string): Promise<Asset | null> {
    const result = await this.executeQuery<Asset>(
      `SELECT * FROM wms_assets WHERE id = :id AND is_deleted = 0`,
      [id]
    );

    if (!result.success) {
      logger.error('Failed to fetch asset:', result.error);
      throw result.error;
    }

    return result.data || null;
  }

  async create(asset: Omit<Asset, 'id'>): Promise<string> {
    const result = await this.executeQuery<{ id: string }>(
      `INSERT INTO wms_assets (
        name, serial_number, category, location, status,
        specifications, purchase_date, warranty_end,
        value, department, coordinates
      ) VALUES (
        :name, :serialNumber, :category, :location, :status,
        :specifications, :purchaseDate, :warrantyEnd,
        :value, :department, :coordinates
      ) RETURNING id INTO :id`,
      {
        name: asset.name,
        serialNumber: asset.serialNumber,
        category: asset.category,
        location: asset.location,
        status: asset.status,
        specifications: JSON.stringify(asset.specifications),
        purchaseDate: asset.purchaseDate,
        warrantyEnd: asset.warrantyEnd,
        value: asset.value,
        department: asset.department,
        coordinates: JSON.stringify(asset.coordinates)
      }
    );

    if (!result.success) {
      logger.error('Failed to create asset:', result.error);
      throw result.error;
    }

    return result.data?.id || '';
  }
}
```