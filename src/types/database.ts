export interface DBConfig {
  host: string;
  port: number;
  sid: string;
  username: string;
  password: string;
  poolConfig: {
    poolMin: number;
    poolMax: number;
    poolIncrement: number;
  };
}