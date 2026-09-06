import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  fullName: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  role: { type: String, enum: ['STUDENT', 'MENTOR', 'ADMIN'], default: 'STUDENT' },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'INACTIVE'], default: 'ACTIVE' },
  phone: { type: String, default: '' },
  lastLoginAt: { type: Date },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export type User = InferSchemaType<typeof UserSchema> & { _id: string; comparePassword?: (pwd: string) => Promise<boolean> };
export const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);