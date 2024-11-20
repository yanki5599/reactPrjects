import axios from "axios";
import { IPost } from "../types/IPost";
import { IPostWithUser } from "../types/IPostWithUser";
import UserService from "./userService";
import { IUser } from "../types/IUser";

class PostService {
  static BASE_URL: string = (process.env.BASE_URL as string) + "posts";

  static async fetchPosts(): Promise<IPost[]> {
    const response = await axios.get<IPost[]>(PostService.BASE_URL);
    const posts: IPost[] = response.data;

    return posts;
  }
  static async getPostWithUser(postId: number): Promise<IPostWithUser> {
    const response = await axios.get<IPost>(
      `${PostService.BASE_URL}/${postId}`
    );
    const post: IPost = response.data;
    const userId: number = post.userId;
    const user: IUser = await UserService.fetchUser(userId);

    return { user, post };
  }
}

export default PostService;
