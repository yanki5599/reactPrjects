// import { NextFunction, Request, Response } from "express";
// import asyncHandler from "../middleware/asyncHandler";
// import axios from "axios";
// import { IUser } from "../types/IUser";
// import UserService from "../services/userService";
// import ErrorResponse from "../types/ErrorResponse";

// const BASE_URL: string = (process.env.BASE_URL as string) + "users";

// // export const getUsers = asyncHandler(
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     const users: IUser[] = await UserService.fetchUsers();

// //     res.status(200).json({
// //       data: users,
// //       success: true,
// //       message: "users fetched successfully",
// //     });
// //   }
// // );
// // export const getUser = asyncHandler(
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     if (!req.params.userId) throw new ErrorResponse("no userId supplied", 400);
// //     const user: IUser = await UserService.fetchUser(+req.params.userId);

// //     res.status(200).json({
// //       data: user,
// //       success: true,
// //       message: "users fetched successfully",
// //     });
// //   }
// // );
