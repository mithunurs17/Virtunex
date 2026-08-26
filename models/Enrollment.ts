import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const EnrollmentSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  picture: { type: String, default: '' },
  whatsapp: { type: String, required: true, trim: true },
  college: { type: String, required: true, trim: true },
  yop: { type: String, required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
  payment: { type: String, enum: ['partial', 'full'], required: true },
  certificateDistributedAt: { type: Date },
}, { timestamps: true });

export type Enrollment = InferSchemaType<typeof EnrollmentSchema> & { _id: string };

export const EnrollmentModel: Model<Enrollment> = mongoose.models.Enrollment || mongoose.model<Enrollment>('Enrollment', EnrollmentSchema);


