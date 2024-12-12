```typescript
import { DBConnection, QueryResult } from '../types';
import { logger } from '../../utils/logger';

export class QueryExecutor {
  static async execute<T>(
    dbConnection: DBConnection,
    query: string,
    params: any[] = [],
    options: any = {}
  ): Promise<QueryResult<T>> {
    try {
      const result = await dbConnection.connection.execute(query, params, options);
      return { success: true, data: result as T };
    } catch (error) {
      logger.error('Query execution error:', error);
      return { success: false, error: error as Error };
    }
  }

  static async executeTransaction<T>(
    dbConnection: DBConnection,
    operations: (() => Promise<any>)[]
  ): Promise<QueryResult<T>> {
    try {
      for (const operation of operations) {
        await operation();
      }
      await dbConnection.connection.commit();
      return { success: true };
    } catch (error) {
      await dbConnection.connection.rollback();
      logger.error('Transaction error:', error);
      return { success: false, error: error as Error };
    }
  }
}
```