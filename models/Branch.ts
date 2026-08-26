import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const BranchSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
}, { timestamps: true });

export type Branch = InferSchemaType<typeof BranchSchema> & { _id: string };

export const BranchModel: Model<Branch> = mongoose.models.Branch || mongoose.model('Branch', BranchSchema);


