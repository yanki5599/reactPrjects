import mongoose, { ObjectId, Schema } from "mongoose";

export enum MissileStatus {
  Launched = "Launched",
  Hit = "Hit",
  Intercepted = "Intercepted",
}

export interface AttackingMissile extends mongoose.Document {
  _id: ObjectId;
  attackerId: ObjectId;
  destination: string;
  status: MissileStatus;
  eta: number;
}

export const AttackingMissileSchema = new Schema<AttackingMissile>({
  attackerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destination: String,
  status: String,
  eta: { type: Number, min: 0 },
});

export default mongoose.model<AttackingMissile>(
  "AttackingMissile",
  AttackingMissileSchema
);
