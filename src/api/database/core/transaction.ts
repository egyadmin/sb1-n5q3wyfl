```typescript
import type { DBConnection } from '../types';
import { logger } from '../../utils/logger';

export class TransactionManager {
  private connection: DBConnection;

  constructor(connection: DBConnection) {
    this.connection = connection;
  }

  async executeTransaction<T>(operations: (() => Promise<T>)[]): Promise<T[]> {
    try {
      const results: T[] = [];
      for (const operation of operations) {
        const result = await operation();
        results.push(result);
      }
      await this.connection.connection.commit();
      return results;
    } catch (error) {
      await this.connection.connection.rollback();
      logger.error('Transaction failed:', error);
      throw error;
    }
  }

  async withTransaction<T>(operation: () => Promise<T>): Promise<T> {
    try {
      const result = await operation();
      await this.connection.connection.commit();
      return result;
    } catch (error) {
      await this.connection.connection.rollback();
      logger.error('Transaction failed:', error);
      throw error;
    }
  }
}
```