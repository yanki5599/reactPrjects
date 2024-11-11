import mongoose, { model, ObjectId, Schema } from "mongoose";

export interface ICandidate extends mongoose.Document {
  _id: string;
  name: string;
}

export const CandidateSchema = new Schema<ICandidate>({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
    minlength: 8,
    maxlength: 30,
  },
});

export default model<ICandidate>("Candidate", CandidateSchema);
