import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Jwt from "jsonwebtoken";
import AuthService from "../services/authService";
import { IUser } from "../models/userModel";
import ErrorResponse from "../utils/ErrorResponse";
import { createResponse } from "../utils/utils";
import { UserDto } from "../types/dto/userDto";

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: UserDto = req.body;

    const user: IUser | undefined = await AuthService.authenticate({
      username,
      password,
    });

    if (!user) throw new ErrorResponse("invalid credentials", 401);

    // JWT
    const token = Jwt.sign(
      { isAdmin: user.isAdmin, _id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.MODE_ENV === "production",
      maxAge: 3600000,
    });
    ////

    res.status(200).json(createResponse(user, "logged in successfully"));
  }
);

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: UserDto = req.body;

    const user: IUser = await AuthService.addUser({
      username,
      password,
    });

    res.status(201).json(createResponse(user, "user created successfully"));
  }
);
