import mongoose from "mongoose";

const databaseConfig: { "<username>": string; "<password>": string } = {
  "<username>": process.env.DATABASE_USER || "",
  "<password>": process.env.DATABASE_PASS || "",
};

const MONGODB_URI = (process.env.MONGODB_URI || "").replace(
  /<username>|<password>/gi,
  (matched) => {
    return databaseConfig[matched as keyof typeof databaseConfig];
  }
);

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
