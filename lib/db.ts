import mongoose from 'mongoose';

type MongooseGlobal = typeof globalThis & {
  _mongooseConn?: Promise<typeof mongoose>;
};

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is required to connect to MongoDB');
  return uri;
};

export async function dbConnect(): Promise<typeof mongoose> {
  const state = globalThis as MongooseGlobal;
  if (!state._mongooseConn) {
    state._mongooseConn = mongoose.connect(getMongoUri(), { serverSelectionTimeoutMS: 15000 });
  }
  try {
    await state._mongooseConn;
  } catch (error) {
    state._mongooseConn = undefined;
    throw error;
  }
  return mongoose;
}


