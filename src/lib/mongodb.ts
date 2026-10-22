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

function sanitizeMongoUri(raw: string | undefined): string | null {
  if (!raw) return null;
  let uri = raw.trim();

  // Strip wrapping quotes (e.g. "..." or '...')
  if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
    uri = uri.slice(1, -1).trim();
  }

  // Strip 'mongosh ' prefix if copied from MongoDB Atlas Shell modal
  if (uri.startsWith("mongosh ")) {
    uri = uri.replace(/^mongosh\s+/, "").trim();
    if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
      uri = uri.slice(1, -1).trim();
    }
  }

  // Strip 'MONGODB_URI=' or 'URI=' if user copied the full key-value line
  if (uri.toLowerCase().startsWith("mongodb_uri=")) {
    uri = uri.slice("mongodb_uri=".length).trim();
  } else if (uri.toLowerCase().startsWith("uri=")) {
    uri = uri.slice("uri=".length).trim();
  }

  // Strip wrapping quotes again after prefix removal
  if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
    uri = uri.slice(1, -1).trim();
  }

  // Auto-prepend mongodb+srv:// if user provided only username:pass@cluster...
  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    if (uri.includes("@") && (uri.includes(".mongodb.net") || uri.includes("mongodb"))) {
      uri = `mongodb+srv://${uri}`;
    }
  }

  return uri;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = sanitizeMongoUri(process.env.MONGODB_URI);

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
