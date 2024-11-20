import axios from "axios";
import { IPost } from "../types/IPost";
import PostService from "./postService";
import { IUser } from "../types/IUser";
import UserService from "./userService";
import { IPostWithUser } from "../types/IPostWithUser";

jest.mock("axios");
describe("API Fetch mock", () => {
  afterEach(() => jest.clearAllMocks());

  test("fetch posts from api", async () => {
    const staticPostList: IPost[] = [
      {
        id: 1,
        userId: 1,
        title: "post 1",
        body: "body 1",
      },
      {
        id: 2,
        userId: 2,
        title: "post 2",
        body: "body 2",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValue({ data: staticPostList });
    const posts: IPost[] = await PostService.fetchPosts();

    expect(posts).toEqual(staticPostList);
  });

  test("fetch user from api", async () => {
    const staticUser: IUser = {
      name: "user 1",
      username: "username 1",
      id: 1,
      email: "example@gmail.com",
      address: {
        city: "",
        geo: { lat: "", lng: "" },
        street: "",
        suite: "",
        zipcode: "",
      },
    };

    (axios.get as jest.Mock).mockResolvedValue({ data: staticUser });
    const user: IUser = await UserService.fetchUser(1);

    expect(user).toEqual(staticUser);
  });

  test("fetch postWithUser from api", async () => {
    const staticPostWithUser: IPostWithUser = {
      user: {
        name: "user 1",
        username: "username 1",
        id: 1,
        email: "example@gmail.com",
        address: {
          city: "",
          geo: { lat: "", lng: "" },
          street: "",
          suite: "",
          zipcode: "",
        },
      },
      post: {
        id: 1,
        userId: 1,
        title: "post 1",
        body: "body 1",
      },
    };

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({ data: staticPostWithUser.post })
      .mockResolvedValueOnce({ data: staticPostWithUser.user });
    const postWithUser: IPostWithUser = await PostService.getPostWithUser(1);

    expect(postWithUser).toEqual(staticPostWithUser);
  });
});
