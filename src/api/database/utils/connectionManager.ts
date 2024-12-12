```typescript
import oracledb from 'oracledb';
import { DBConfig, DBConnection } from '../types';
import { logger } from '../../utils/logger';

export class ConnectionManager {
  private pool: oracledb.Pool | null = null;
  private config: DBConfig;

  constructor(config: DBConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    try {
      if (!this.pool) {
        await oracledb.createPool({
          user: this.config.username,
          password: this.config.password,
          connectString: this.getConnectionString(),
          ...this.config.poolConfig
        });
        logger.info('Database pool initialized');
      }
    } catch (error) {
      logger.error('Failed to initialize connection pool:', error);
      throw error;
    }
  }

  private getConnectionString(): string {
    return `${this.config.host}:${this.config.port}/${this.config.sid}`;
  }

  async getConnection(): Promise<DBConnection> {
    try {
      const connection = await this.pool?.getConnection();
      if (!connection) {
        throw new Error('Could not get connection from pool');
      }

      return {
        connection,
        release: async () => {
          try {
            await connection.close();
          } catch (error) {
            logger.error('Error releasing connection:', error);
          }
        }
      };
    } catch (error) {
      logger.error('Error getting connection:', error);
      throw error;
    }
  }

  async closePool(): Promise<void> {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        logger.info('Connection pool closed');
      }
    } catch (error) {
      logger.error('Error closing pool:', error);
      throw error;
    }
  }
}
```