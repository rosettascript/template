import { createClient, RedisClientType } from 'redis';
import { config } from '../config';
import { logger } from '../utils/logger';

class CacheService {
  private client: RedisClientType;
  private static instance: CacheService;
  private isConnected = false;

  private constructor() {
    this.client = createClient({
      socket: {
        host: config.redis.host,
        port: config.redis.port,
      },
      password: config.redis.password || undefined,
      database: config.redis.db,
    });

    this.client.on('error', (err) => {
      logger.error('Redis Client Error', err);
      this.isConnected = false;
    });

    this.client.on('connect', () => {
      logger.info('Redis Client Connected');
      this.isConnected = true;
    });

    this.client.on('ready', () => {
      logger.info('Redis Client Ready');
    });

    this.client.on('end', () => {
      logger.info('Redis Client Disconnected');
      this.isConnected = false;
    });
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      try {
        await this.client.connect();
      } catch (error) {
        logger.error('Failed to connect to Redis', error);
        throw error;
      }
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.quit();
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Redis GET error', { key, error });
      return null;
    }
  }

  public async set(key: string, value: any, ttlSeconds?: number): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      const serializedValue = JSON.stringify(value);
      if (ttlSeconds) {
        await this.client.setEx(key, ttlSeconds, serializedValue);
      } else {
        await this.client.set(key, serializedValue);
      }
      return true;
    } catch (error) {
      logger.error('Redis SET error', { key, error });
      return false;
    }
  }

  public async del(key: string): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      await this.client.del(key);
      return true;
    } catch (error) {
      logger.error('Redis DEL error', { key, error });
      return false;
    }
  }

  public async exists(key: string): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Redis EXISTS error', { key, error });
      return false;
    }
  }

  public async flushAll(): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      await this.client.flushAll();
      return true;
    } catch (error) {
      logger.error('Redis FLUSHALL error', { error });
      return false;
    }
  }

  public async getStats(): Promise<any> {
    try {
      if (!this.isConnected) {
        await this.connect();
      }
      const info = await this.client.info();
      return {
        connected: this.isConnected,
        info: info.split('\r\n').reduce((acc, line) => {
          const [key, value] = line.split(':');
          if (key && value) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, string>)
      };
    } catch (error) {
      logger.error('Redis STATS error', { error });
      return { connected: false, error: error.message };
    }
  }
}

export const cacheService = CacheService.getInstance();