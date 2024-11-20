import axios from "axios";
import { IUser } from "../types/IUser";

class UserService {
  static BASE_URL: string = (process.env.BASE_URL as string) + "users";

  //   static async fetchUsers(): Promise<IUser[]> {
  //     const response = await axios.get<IUser[]>(UserService.BASE_URL);
  //     const users: IUser[] = response.data;

  //     return users;
  //   }
  static async fetchUser(userId: number): Promise<IUser> {
    const response = await axios.get<IUser>(
      `${UserService.BASE_URL}/${userId}`
    );
    const user: IUser = response.data;

    return user;
  }
}

export default UserService;
