import mongoose, { ObjectId, Schema } from "mongoose";
import {} from "./userModel";

export interface Resource {
  missileId: ObjectId;
  amount: number;
}
export const ResourceSchema = new Schema<Resource>({
  missileId: Schema.Types.ObjectId,
  amount: Number,
});

export interface Organization extends mongoose.Document {
  _id: ObjectId;
  name: string;
  resources: Resource[];
  budget: 8000000;
}

export const OrganizationSchema = new Schema<Organization>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  budget: {
    type: Number,
    min: 0,
  },
  resources: [ResourceSchema],
});

export default mongoose.model<Organization>("Organization", OrganizationSchema);
