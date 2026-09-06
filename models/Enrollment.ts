import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const EnrollmentSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  programId: { type: Schema.Types.ObjectId, ref: 'InternshipProgram', required: true, index: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'Batch', index: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
  status: { type: String, enum: ['APPLIED', 'APPROVED', 'ACTIVE', 'COMPLETED', 'REJECTED', 'WITHDRAWN'], default: 'APPLIED', index: true },
  paymentStatus: { type: String, enum: ['pending', 'partial', 'full'], default: 'pending' },
  enrollmentDate: { type: Date, default: Date.now },
  internshipStartDate: { type: Date },
  internshipEndDate: { type: Date },
  completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  internshipReadinessScore: { type: Number, default: 0, min: 0, max: 100 },
  certificateEligible: { type: Boolean, default: false },
  certificateId: { type: String, default: '' },
}, { timestamps: true });

// Compound indexes for common queries
EnrollmentSchema.index({ studentId: 1, programId: 1 });
EnrollmentSchema.index({ studentId: 1, status: 1 });
EnrollmentSchema.index({ batchId: 1, status: 1 });

export type Enrollment = InferSchemaType<typeof EnrollmentSchema> & { _id: string };

export const EnrollmentModel: Model<Enrollment> = mongoose.models.Enrollment || mongoose.model<Enrollment>('Enrollment', EnrollmentSchema);


