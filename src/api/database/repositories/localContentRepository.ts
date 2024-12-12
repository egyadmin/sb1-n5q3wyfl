```typescript
import { db } from '../connection';
import type { LocalContentMetrics } from '../../../types/localContent';
import { logger } from '../../utils/logger';

export class LocalContentRepository {
  async getLatestMetrics(): Promise<LocalContentMetrics | null> {
    let connection;
    try {
      connection = await db.getConnection();
      const result = await connection.execute(
        `SELECT * FROM wms_local_content_metrics 
         ORDER BY measurement_date DESC 
         FETCH FIRST 1 ROW ONLY`
      );

      if (!result.rows?.length) {
        return null;
      }

      const row = result.rows[0];
      return {
        totalPercentage: row.TOTAL_PERCENTAGE,
        suppliersPercentage: row.SUPPLIERS_PERCENTAGE,
        materialsPercentage: row.MATERIALS_PERCENTAGE,
        growthRate: row.GROWTH_RATE,
        measurementDate: row.MEASUREMENT_DATE,
        notes: row.NOTES
      };

    } catch (error) {
      logger.error('Error fetching latest metrics:', error);
      throw new Error('Failed to fetch latest metrics');
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

  async saveMetrics(metrics: Omit<LocalContentMetrics, 'id'>): Promise<void> {
    let connection;
    try {
      connection = await db.getConnection();
      await connection.execute(
        `INSERT INTO wms_local_content_metrics (
          total_percentage, suppliers_percentage, materials_percentage,
          growth_rate, measurement_date, notes
        ) VALUES (
          :totalPercentage, :suppliersPercentage, :materialsPercentage,
          :growthRate, :measurementDate, :notes
        )`,
        {
          totalPercentage: metrics.totalPercentage,
          suppliersPercentage: metrics.suppliersPercentage,
          materialsPercentage: metrics.materialsPercentage,
          growthRate: metrics.growthRate,
          measurementDate: new Date(),
          notes: metrics.notes
        }
      );

      await connection.commit();

    } catch (error) {
      if (connection) {
        await connection.rollback();
      }
      logger.error('Error saving metrics:', error);
      throw new Error('Failed to save metrics');
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
}

export const localContentRepository = new LocalContentRepository();
```