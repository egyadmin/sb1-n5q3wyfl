```typescript
import type { PoolAttributes, Connection } from 'oracledb';

export interface DBConfig {
  host: string;
  port: number;
  sid: string;
  username: string;
  password: string;
  poolConfig: PoolAttributes;
}

export interface DBConnection {
  connection: Connection;
  release(): Promise<void>;
}

export interface QueryResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
}
```