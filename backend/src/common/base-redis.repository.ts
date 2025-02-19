import Redis, { ClientContext, Result } from 'ioredis';

export abstract class BaseRedisRepository {
  constructor(private readonly _redisClient: Redis) {}

  async get<Data>(key: string): Promise<Data | null> {
    return JSON.parse(
      await this._redisClient.get(key),
    ) as unknown as Promise<Data | null>;
  }

  async set(
    key: string,
    value: any,
    ...args: any[]
  ): Promise<Result<'OK', ClientContext>> {
    return await this._redisClient.set(key, JSON.stringify(value), ...args);
  }

  async delete(key: string): Promise<number> {
    return await this._redisClient.del(key);
  }

  async add(key: string, value: any): Promise<number> {
    return await this._redisClient.sadd(key, value);
  }

  async remove(key: string, value: any): Promise<number> {
    return await this._redisClient.srem(key, value);
  }

  async isMember(key: string, value: any): Promise<boolean> {
    return !!(await this._redisClient.sismember(key, value));
  }
}
