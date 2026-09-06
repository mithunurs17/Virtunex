const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ MONGODB_URI environment variable is not set');
  process.exit(1);
}

console.log('Testing MongoDB connection...');
console.log('URI:', mongoUri.replace(/:[^:]*@/, ':****@')); // Hide password

mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('✅ MongoDB connection successful!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('Error details:', err);
    process.exit(1);
  });
