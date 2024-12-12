```typescript
import { db } from '../connection';
import type { Asset } from '../../../types';
import { logger } from '../../utils/logger';

export const assetQueries = {
  async getAllAssets(): Promise<Asset[]> {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT 
          id, name, serial_number, category, location, status, 
          last_updated, specifications, purchase_date, warranty_end, 
          value, department, coordinates
         FROM wms_assets 
         WHERE is_deleted = 0
         ORDER BY last_updated DESC`,
        [],
        { outFormat: db.OBJECT }
      );

      return result.rows?.map(row => ({
        id: row.ID,
        name: row.NAME,
        serialNumber: row.SERIAL_NUMBER,
        category: row.CATEGORY,
        location: row.LOCATION,
        status: row.STATUS,
        lastUpdated: row.LAST_UPDATED,
        specifications: JSON.parse(row.SPECIFICATIONS || '{}'),
        purchaseDate: row.PURCHASE_DATE,
        warrantyEnd: row.WARRANTY_END,
        value: row.VALUE,
        department: row.DEPARTMENT,
        coordinates: JSON.parse(row.COORDINATES || '{}')
      })) || [];

    } catch (error) {
      logger.error('Error fetching assets:', error);
      throw new Error('Failed to fetch assets');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          logger.error('Error closing connection:', error);
        }
      }
    }
  },

  async createAsset(asset: Omit<Asset, 'id'>): Promise<string> {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `INSERT INTO wms_assets (
          name, serial_number, category, location, status, 
          specifications, purchase_date, warranty_end, 
          value, department, coordinates
        ) VALUES (
          :name, :serialNumber, :category, :location, :status,
          :specifications, :purchaseDate, :warrantyEnd,
          :value, :department, :coordinates
        ) RETURNING id INTO :insertedId`,
        {
          name: asset.name,
          serialNumber: asset.serialNumber,
          category: asset.category,
          location: asset.location,
          status: asset.status,
          specifications: JSON.stringify(asset.specifications || {}),
          purchaseDate: asset.purchaseDate,
          warrantyEnd: asset.warrantyEnd,
          value: asset.value,
          department: asset.department,
          coordinates: JSON.stringify(asset.coordinates || {}),
          insertedId: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
        }
      );

      await connection.commit();
      return result.outBinds.insertedId;

    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      logger.error('Error creating asset:', error);
      throw new Error('Failed to create asset');
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          logger.error('Error closing connection:', error);
        }
      }
    }
  }
};
```