import { createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';

type RedisConnection = {
  client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts> | null
}

let redisCached: RedisConnection = (global as any).redis

if (!redisCached) {
  redisCached = (global as any).redis = {
    client: null
  }
}

export const connectToRedis = async (): Promise<RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>> => {
  if (redisCached.client && redisCached.client.isOpen) return redisCached.client;

  if (redisCached.client && !redisCached.client.isOpen) {
    await redisCached.client.connect()
    return redisCached.client;
  }

  if (!process.env.REDIS_URL) throw new Error('Missing REDIS_URL');

  redisCached.client = createClient({
    password: process.env.REDIS_PW,
    socket: {
      host: process.env.REDIS_URL,
      port: 17721
    }
  });

  if(!redisCached.client.isOpen) await redisCached.client.connect()

  redisCached.client.on('error', (err: any) => console.log(err));

  return redisCached.client
}