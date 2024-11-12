import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Jwt from "jsonwebtoken";
import AuthService from "../services/authService";
import userModel, { IUser } from "../models/userModel";
import ErrorResponse from "../utils/ErrorResponse";
import { createResponse } from "../utils/utils";
import { AddUserDto } from "../types/dto/userDto";
import UsersService from "../services/usersService";

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: AddUserDto = req.body;

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

    res.status(200).json(
      createResponse(
        {
          username: user.username,
          id: user.id,
          isAdmin: user.isAdmin,
          hasVoted: user.votedForId != null,
        },
        "logged in successfully"
      )
    );
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .clearCookie("token", { path: "/" })
      .status(200)
      .json(createResponse({}, "logged out successfully"));
  }
);

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: AddUserDto = req.body;

    const user: IUser = await AuthService.addUser({
      username,
      password,
    });

    res.status(201).json(
      createResponse(
        {
          username: user.username,
          id: user.id,
          isAdmin: user.isAdmin,
          hasVoted: user.votedForId != null,
        },
        "user created successfully"
      )
    );
  }
);

export const validate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userModel.findById(req.user?._id);
    if (!user) throw new ErrorResponse("internal error: user not found", 500);
    res.status(200).json(
      createResponse(
        {
          user: {
            username: user.username,
            id: user.id,
            isAdmin: user.isAdmin,
            hasVoted: user.votedForId != null,
          },
        },
        "validated successfully"
      )
    );
  }
);
