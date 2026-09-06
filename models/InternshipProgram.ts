import mongoose, { InferSchemaType, Model, Schema } from 'mongoose';

const InternshipProgramSchema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, default: '' },
  category: { type: String, default: '' },
  durationWeeks: { type: Number, required: true, min: 1 },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  tracks: { type: [String], default: [] },
  objectives: { type: [String], default: [] },
  prerequisites: { type: [String], default: [] },
  learningOutcomes: { type: [String], default: [] },
  active: { type: Boolean, default: true, index: true },
}, { timestamps: true });

export type InternshipProgram = InferSchemaType<typeof InternshipProgramSchema> & { _id: string };

export const InternshipProgramModel: Model<InternshipProgram> = mongoose.models.InternshipProgram || mongoose.model<InternshipProgram>('InternshipProgram', InternshipProgramSchema);
