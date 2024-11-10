import userModel, { IUser } from "../models/userModel";
import { UserDto } from "../types/dto/userDto";
import ErrorResponse from "../utils/ErrorResponse";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export default class AuthService {
  public static authenticate = async (
    userDto: UserDto
  ): Promise<IUser | undefined> => {
    this.checkCredentials(userDto);

    const user: IUser | undefined | null = await userModel.findOne({
      username: userDto.username,
    });

    if (!user || !(await bcrypt.compare(userDto.password, user.password)))
      if (!user) throw new ErrorResponse("invalid credentials", 401);

    return user;
  };

  private static checkCredentials(userDto: UserDto): void {
    if (!userDto || !userDto.username.trim() || !userDto.password)
      throw new ErrorResponse("missing credentials", 400);
  }

  public static addUser = async (userDto: UserDto): Promise<IUser> => {
    this.checkCredentials(userDto);

    if (await this.isUsernameExist(userDto.username))
      throw new ErrorResponse("username already exist", 409);

    const hashedPassword = await bcrypt.hash(userDto.password, SALT_ROUNDS);
    const added = await userModel.create({
      username: userDto.username,
      password: hashedPassword,
    });

    return added;
  };

  private static async isUsernameExist(username: string): Promise<boolean> {
    return (await userModel.findOne({ username })) != undefined;
  }
}
