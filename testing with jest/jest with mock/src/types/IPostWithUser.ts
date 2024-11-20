import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IPostWithUser {
  post: IPost;
  user: IUser;
}
