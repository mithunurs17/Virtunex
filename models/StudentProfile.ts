import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const StudentProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  usn: { type: String, default: '' }, collegeName: { type: String, default: '' }, university: { type: String, default: '' },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch' }, semester: { type: Number }, graduationYear: { type: Number },
  city: { type: String, default: '' }, state: { type: String, default: '' }, githubUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' }, portfolioUrl: { type: String, default: '' }, skills: { type: [String], default: [] },
  preferredProgram: { type: String, default: '' }, preferredTrack: { type: String, default: '' },
  onboardingCompleted: { type: Boolean, default: false }, internshipReady: { type: Boolean, default: false },
}, { timestamps: true });

export type StudentProfile = InferSchemaType<typeof StudentProfileSchema> & { _id: string };
export const StudentProfileModel: Model<StudentProfile> = mongoose.models.StudentProfile || mongoose.model<StudentProfile>('StudentProfile', StudentProfileSchema);