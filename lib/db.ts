import mongoose from 'mongoose';

// Hardcoded MongoDB URL per user request
const MONGODB_URI = 'mongodb+srv://upksilleo:upksilleo@cluster0.bt9ohww.mongodb.net/virtunex?retryWrites=true&w=majority&appName=Cluster0';

type MongooseGlobal = typeof globalThis & {
  _mongooseConn?: Promise<typeof mongoose>;
};

let cached = (global as MongooseGlobal)._mongooseConn;

if (!cached) {
  (global as MongooseGlobal)._mongooseConn = mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000 as number,
  } as any);
  cached = (global as MongooseGlobal)._mongooseConn;
}

export async function dbConnect(): Promise<typeof mongoose> {
  if (!cached) {
    cached = mongoose.connect(MONGODB_URI);
    (global as MongooseGlobal)._mongooseConn = cached;
  }
  return cached;
}


