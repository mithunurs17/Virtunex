import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const UserSchema = new Schema({
  auth0Id: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  emailVerified: { type: Boolean, default: false },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  fullName: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  role: { type: String, enum: ['STUDENT', 'MENTOR', 'ADMIN'], default: 'STUDENT' },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'INACTIVE'], default: 'ACTIVE' },
  phone: { type: String, default: '' },
  lastLoginAt: { type: Date },
}, { timestamps: true });

export type User = InferSchemaType<typeof UserSchema> & { _id: string };
export const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);