import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const MentorAssignmentSchema = new Schema({
  mentorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true, index: true },
  assignedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true, index: true },
}, { timestamps: true });

// Compound index for common queries
MentorAssignmentSchema.index({ mentorId: 1, active: 1 });
MentorAssignmentSchema.index({ studentId: 1, batchId: 1 });

export type MentorAssignment = InferSchemaType<typeof MentorAssignmentSchema> & { _id: string };

export const MentorAssignmentModel: Model<MentorAssignment> = mongoose.models.MentorAssignment || mongoose.model<MentorAssignment>('MentorAssignment', MentorAssignmentSchema);
