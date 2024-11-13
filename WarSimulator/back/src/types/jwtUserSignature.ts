import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: ObjectId;
        //
      };
    }
  }
}

export interface JwtEncryptedUser {
  _id: ObjectId;
  username: string;
  organization: string;
  //
}
