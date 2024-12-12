```typescript
import { DBConfig } from './types';

export const DB_CONFIG: DBConfig = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  port: Number(import.meta.env.VITE_DB_PORT) || 1521,
  sid: import.meta.env.VITE_DB_SID || 'ORCL',
  username: import.meta.env.VITE_DB_USERNAME || 'system',
  password: import.meta.env.VITE_DB_PASSWORD || 'password',
  poolConfig: {
    poolMin: Number(import.meta.env.VITE_DB_POOL_MIN) || 5,
    poolMax: Number(import.meta.env.VITE_DB_POOL_MAX) || 50,
    poolIncrement: Number(import.meta.env.VITE_DB_POOL_INCREMENT) || 5
  }
};
```