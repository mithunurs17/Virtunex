import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const MentorProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  employeeId: { type: String, default: '' }, designation: { type: String, default: '' }, expertise: { type: [String], default: [] },
  bio: { type: String, default: '' }, experience: { type: String, default: '' }, phone: { type: String, default: '' }, active: { type: Boolean, default: true },
}, { timestamps: true });

export type MentorProfile = InferSchemaType<typeof MentorProfileSchema> & { _id: string };
export const MentorProfileModel: Model<MentorProfile> = mongoose.models.MentorProfile || mongoose.model<MentorProfile>('MentorProfile', MentorProfileSchema);