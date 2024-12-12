```typescript
import { ConnectionManager } from '../utils/connectionManager';
import { QueryExecutor } from '../utils/queryExecutor';
import { QueryResult } from '../types';
import { logger } from '../../utils/logger';

export abstract class BaseRepository<T> {
  protected connectionManager: ConnectionManager;

  constructor(connectionManager: ConnectionManager) {
    this.connectionManager = connectionManager;
  }

  protected async executeQuery<R>(
    query: string,
    params: any[] = [],
    options: any = {}
  ): Promise<QueryResult<R>> {
    const dbConnection = await this.connectionManager.getConnection();
    try {
      return await QueryExecutor.execute<R>(dbConnection, query, params, options);
    } finally {
      await dbConnection.release();
    }
  }

  protected async executeTransaction<R>(
    operations: (() => Promise<any>)[]
  ): Promise<QueryResult<R>> {
    const dbConnection = await this.connectionManager.getConnection();
    try {
      return await QueryExecutor.executeTransaction<R>(dbConnection, operations);
    } finally {
      await dbConnection.release();
    }
  }
}
```