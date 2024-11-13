import mongoose, { ObjectId, Schema } from "mongoose";

export interface Missile extends mongoose.Document {
  _id: ObjectId;
  name: string;
  description: string;
  speed: number;
  intercepts: ObjectId[];
  price: number;
}

export const MissileSchema = new Schema<Missile>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  speed: { type: Number, required: true },
  intercepts: { type: [Schema.Types.ObjectId], ref: "Missile", default: [] },
  price: { type: Number, min: 0 },
});

export default mongoose.model<Missile>("Missile", MissileSchema);
