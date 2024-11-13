import { ObjectId } from "mongoose";
import userModel, { IUser } from "../models/userModel";
import { AddUserDto } from "../types/dtos/userDto";
import ErrorResponse from "../utils/ErrorResponse";
import bcrypt from "bcrypt";
import organizationModel from "../models/organizationModel";

const SALT_ROUNDS = 10;

export default class AuthService {
  public static authenticate = async (userDto: {
    username: string;
    password: string;
  }): Promise<IUser | undefined> => {
    this.checkCredentials(userDto);

    const user: IUser | undefined | null = await userModel.findOne({
      username: userDto.username,
    });

    if (!user || !(await bcrypt.compare(userDto.password, user.password)))
      if (!user) throw new ErrorResponse("invalid credentials", 401);

    return user;
  };

  private static async checkCredentials(userDto: AddUserDto): Promise<void> {
    if (!userDto || !userDto.username?.trim() || !userDto.password)
      throw new ErrorResponse("missing credentials", 400);
  }

  public static addUser = async (userDto: AddUserDto): Promise<IUser> => {
    await this.checkCredentials(userDto);

    if (await userModel.findOne({ name: userDto.username }))
      throw new ErrorResponse("username already exist", 409);

    const org = await organizationModel.findOne({ name: userDto.organization });
    if (!org) new ErrorResponse("organization not exist", 400);

    const hashedPassword = await bcrypt.hash(userDto.password, SALT_ROUNDS);
    const added = await userModel.create({
      username: userDto.username,
      password: hashedPassword,
      organizationId: org?.id,
      arsenal: { budget: org?.budget, resources: org?.resources },
    });

    return added;
  };
}
