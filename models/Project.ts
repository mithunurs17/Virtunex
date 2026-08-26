import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const ProjectSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  branches: [{ type: Schema.Types.ObjectId, ref: 'Branch' }],
}, { timestamps: true });

export type Project = InferSchemaType<typeof ProjectSchema> & { _id: string };

export const ProjectModel: Model<Project> = mongoose.models.Project || mongoose.model('Project', ProjectSchema);


