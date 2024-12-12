```typescript
import { PoolAttributes } from 'oracledb';

export const DEFAULT_POOL_CONFIG: PoolAttributes = {
  poolMin: 5,
  poolMax: 50,
  poolIncrement: 5,
  poolTimeout: 60,
  queueTimeout: 60000,
  enableStatistics: true
};

export const validatePoolConfig = (config: Partial<PoolAttributes>): PoolAttributes => {
  return {
    ...DEFAULT_POOL_CONFIG,
    ...config,
    poolMin: Math.max(1, config.poolMin || DEFAULT_POOL_CONFIG.poolMin),
    poolMax: Math.min(100, config.poolMax || DEFAULT_POOL_CONFIG.poolMax)
  };
};
```