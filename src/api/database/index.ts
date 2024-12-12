```typescript
export * from './config/connection';
export * from './config/pool';
export * from './core/connection';
export * from './core/transaction';
export * from './core/query';
export * from './types';

import { db } from './core/connection';
export { db };
```