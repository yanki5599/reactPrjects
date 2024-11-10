import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { createResponse } from "../utils/utils";
import userModel from "../models/userModel";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .json(
        createResponse(await userModel.find(), "users fetched successfully")
      );
  }
);
