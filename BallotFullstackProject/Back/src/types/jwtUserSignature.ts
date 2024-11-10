import { ObjectId } from "mongoose";

export interface JwtEncryptedUser {
  _id: ObjectId;
  isAdmin: Boolean;
}
