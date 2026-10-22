import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
  var lastMongoError: string | null | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export function getLastMongoError(): string | null {
  return global.lastMongoError || null;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    global.lastMongoError = "MONGODB_URI environment variable is missing or empty.";
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log("Connected to MongoDB successfully.");
      global.lastMongoError = null;
      return mongooseInstance;
    }).catch((err) => {
      const errMsg = err?.message || String(err);
      console.error("MongoDB connection failed:", errMsg);
      global.lastMongoError = errMsg;
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e: any) {
    global.lastMongoError = e?.message || String(e);
    cached.promise = null;
    return null;
  }

  return cached.conn;
}
