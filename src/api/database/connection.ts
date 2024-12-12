```typescript
import oracledb from 'oracledb';
import { DB_CONFIG, getConnectionString } from './config';
import { logger } from '../utils/logger';

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: oracledb.Pool | null = null;

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async initialize(): Promise<void> {
    try {
      // Register Oracle driver
      await oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_PATH });
      
      // Configure connection pool
      this.pool = await oracledb.createPool({
        user: DB_CONFIG.username,
        password: DB_CONFIG.password,
        connectString: getConnectionString(),
        poolMin: DB_CONFIG.connectionPool.min,
        poolMax: DB_CONFIG.connectionPool.max,
        poolIncrement: DB_CONFIG.connectionPool.increment
      });

      logger.info('Database connection pool initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize database connection:', error);
      throw new Error('Database connection failed');
    }
  }

  public async getConnection(): Promise<oracledb.Connection> {
    try {
      if (!this.pool) {
        throw new Error('Database pool not initialized');
      }
      return await this.pool.getConnection();
    } catch (error) {
      logger.error('Failed to get database connection:', error);
      throw new Error('Unable to get database connection');
    }
  }

  public async closePool(): Promise<void> {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        logger.info('Database connection pool closed');
      }
    } catch (error) {
      logger.error('Error closing database pool:', error);
      throw new Error('Failed to close database pool');
    }
  }
}

export const db = DatabaseConnection.getInstance();
```