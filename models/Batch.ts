import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const BatchSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  status: { type: String, enum: ['available', 'expired'], default: 'available' },
  capacity: { type: Number, default: 0, min: 0 },
  enrolled: { type: Number, default: 0, min: 0 },
  schedule: { type: String, default: '' },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

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


