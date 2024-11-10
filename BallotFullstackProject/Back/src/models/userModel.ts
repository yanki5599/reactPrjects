import mongoose, { model, ObjectId, Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedForId: ObjectId | null;
}

export const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
    minlength: 8,
    maxlength: 20,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  hasVoted: {
    type: Boolean,
    default: false,
    required: true,
  },
  votedForId: {
    type: mongoose.Types.ObjectId,
    ref: "Candidate",
    default: null,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
