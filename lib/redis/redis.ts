import { createClient, RedisClientType, RedisDefaultModules, RedisFunctions, RedisModules, RedisScripts } from 'redis';

type RedisConnection = {
  client: RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts> | null
}

let cached: RedisConnection = (global as any).redis

if (!cached) {
  cached = (global as any).redis = {
    client: null
  }
}

export const connectToRedis = async (): Promise<RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>> => {
  if (cached.client && cached.client.isOpen) return cached.client;

  if (cached.client && !cached.client.isOpen) {
    await cached.client.connect()
    return cached.client;
  }

  if (!process.env.REDIS_URL) throw new Error('Missing REDIS_URL');

  cached.client = createClient({
    password: process.env.REDIS_PW,
    socket: {
      host: process.env.REDIS_URL,
      port: 17721
    }
  });

  cached.client.on('error', (err: any) => console.log(err));

  return cached.client
}