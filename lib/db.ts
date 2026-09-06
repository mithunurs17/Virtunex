import mongoose from 'mongoose';

type MongooseGlobal = typeof globalThis & {
  _mongooseConn?: Promise<typeof mongoose>;
  _mongooseConnError?: Error;
};

const getMongoUri = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is required to connect to MongoDB');
  return uri;
};

export async function dbConnect(): Promise<typeof mongoose> {
  const state = globalThis as MongooseGlobal;
  
  if (!state._mongooseConn) {
    state._mongooseConn = mongoose.connect(getMongoUri(), { 
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });
  }
  
  try {
    await state._mongooseConn;
  } catch (error) {
    state._mongooseConn = undefined;
    state._mongooseConnError = error instanceof Error ? error : new Error('Unknown database connection error');
    
    // Log the error for debugging
    console.error('[dbConnect] MongoDB connection error:', {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
      uri: getMongoUri().replace(/\/\/(.*?)@/, '//***:***@'), // Hide credentials
    });
    
    throw error;
  }
  
  return mongoose;
}



