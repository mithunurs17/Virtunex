import mongoose from 'mongoose';
import { dbConnect } from '../lib/db';
import { UserModel } from '../models/User';

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error('Usage: npm run promote:admin -- someone@example.com');
  process.exit(1);
}

await dbConnect();
const user = await UserModel.findOne({ email });
if (!user) {
  console.error('No existing user found for that email. They must sign in first.');
  await mongoose.disconnect();
  process.exit(1);
}
user.role = 'ADMIN';
await user.save();
console.log(`Promoted ${user.email} to ADMIN.`);
await mongoose.disconnect();
