import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const BatchSchema = new Schema({
  programId: { type: Schema.Types.ObjectId, ref: 'InternshipProgram', required: true, index: true },
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
  status: { type: String, enum: ['UPCOMING', 'ACTIVE', 'COMPLETED', 'CANCELLED'], default: 'UPCOMING', index: true },
  capacity: { type: Number, default: 0, min: 0 },
  enrolledCount: { type: Number, default: 0, min: 0 },
  schedule: { type: String, default: '' },
  startDate: { type: Date },
  endDate: { type: Date },
  mentorIds: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Compound index for common queries
BatchSchema.index({ programId: 1, status: 1 });

export type Batch = InferSchemaType<typeof BatchSchema> & { _id: string };

// In dev with hot reload, if the existing model lacks new fields (e.g., schedule),
// drop and recompile it to pick up the updated schema.
if (mongoose.modelNames().includes('Batch')) {
  const existing = mongoose.model('Batch');
  // Narrow the type for schema inspection
  const schemaAny = (existing as unknown as { schema?: { paths?: Record<string, unknown> } })?.schema;
  const hasSchedule = Boolean(schemaAny?.paths && Object.prototype.hasOwnProperty.call(schemaAny.paths, 'schedule'));
  if (!hasSchedule) {
    mongoose.deleteModel('Batch');
  }
}

export const BatchModel: Model<Batch> = mongoose.models.Batch || mongoose.model<Batch>('Batch', BatchSchema);


