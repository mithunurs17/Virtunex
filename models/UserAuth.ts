import { Schema, model, models, InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserAuthSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  fullName: { type: String, default: '' },
  role: { type: String, enum: ['STUDENT', 'MENTOR', 'ADMIN'], default: 'STUDENT' },
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'INACTIVE'], default: 'ACTIVE' },
  profileImage: { type: String, default: '' },
  phone: { type: String, default: '' },
  lastLoginAt: { type: Date },
}, { timestamps: true });

export type UserAuth = InferSchemaType<typeof UserAuthSchema> & { _id: string };

// Hash password before saving
UserAuthSchema.pre('save', async function (next) {
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
UserAuthSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserAuthModel = models.UserAuth || model('UserAuth', UserAuthSchema);
