import { MongoClient, Db } from 'mongodb';

const MONGODB_URL = process.env.MONGODB_URL;

type MongoConnection = {
  db: Db | null;
  client: MongoClient | null;
}

let cached: MongoConnection = (global as any).mongo;

if (!cached) {
  cached = (global as any).mongo = {
    db: null,
    client: null
  };
}

export const connectToDatabase = async (): Promise<Db> => {
  if (cached.db) return cached.db;

  if (!process.env.MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.client = cached.client || new MongoClient(process.env.MONGODB_URL);

  await cached.client.connect();

  cached.db = cached.client.db(process.env.DB_NAME)

  return cached.db;
};
