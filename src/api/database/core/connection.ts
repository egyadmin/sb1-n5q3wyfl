```typescript
import oracledb from 'oracledb';
import { DB_CONFIG, getConnectionString } from '../config/connection';
import { validatePoolConfig } from '../config/pool';
import { logger } from '../../utils/logger';
import type { DBConnection } from '../types';

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: oracledb.Pool | null = null;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async initialize(config = DB_CONFIG): Promise<void> {
    try {
      if (this.pool) {
        logger.info('Database pool already initialized');
        return;
      }

      await oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_PATH });
      
      this.pool = await oracledb.createPool({
        user: config.username,
        password: config.password,
        connectString: getConnectionString(config),
        ...validatePoolConfig(config.poolConfig)
      });

      logger.info('Database connection pool initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize database connection:', error);
      throw new Error('Database connection failed');
    }
  }

  public async getConnection(): Promise<DBConnection> {
    try {
      if (!this.pool) {
        throw new Error('Database pool not initialized');
      }
      const connection = await this.pool.getConnection();
      return {
        connection,
        async release() {
          try {
            await connection.close();
          } catch (error) {
            logger.error('Error releasing connection:', error);
          }
        }
      };
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

  public async testConnection(): Promise<boolean> {
    let connection: DBConnection | null = null;
    try {
      connection = await this.getConnection();
      await connection.connection.execute('SELECT 1 FROM DUAL');
      return true;
    } catch (error) {
      logger.error('Test connection failed:', error);
      return false;
    } finally {
      if (connection) {
        await connection.release();
      }
    }
  }
}

export const db = DatabaseConnection.getInstance();
```