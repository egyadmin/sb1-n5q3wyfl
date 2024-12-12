```typescript
import type { DBConnection } from '../types';
import { logger } from '../../utils/logger';

export class QueryExecutor {
  private connection: DBConnection;

  constructor(connection: DBConnection) {
    this.connection = connection;
  }

  async execute<T>(query: string, params: any[] = [], options: any = {}): Promise<T> {
    try {
      const result = await this.connection.connection.execute(query, params, options);
      return result as T;
    } catch (error) {
      logger.error('Query execution failed:', error);
      throw error;
    }
  }

  async executeMany<T>(
    query: string, 
    binds: any[][], 
    options: any = {}
  ): Promise<T[]> {
    try {
      const result = await this.connection.connection.executeMany(query, binds, options);
      return result as T[];
    } catch (error) {
      logger.error('Batch query execution failed:', error);
      throw error;
    }
  }

  async getOne<T>(query: string, params: any[] = []): Promise<T | null> {
    try {
      const result = await this.execute<T[]>(query, params, { maxRows: 1 });
      return result?.[0] || null;
    } catch (error) {
      logger.error('Get one query failed:', error);
      throw error;
    }
  }

  async getMany<T>(query: string, params: any[] = []): Promise<T[]> {
    try {
      return await this.execute<T[]>(query, params);
    } catch (error) {
      logger.error('Get many query failed:', error);
      throw error;
    }
  }
}
```