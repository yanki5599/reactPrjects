import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: ObjectId;
        isAdmin: Boolean;
      };
    }
  }
}

export interface JwtEncryptedUser {
  _id: ObjectId;
  isAdmin: Boolean;
}
