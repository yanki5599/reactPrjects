import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { createResponse } from "../utils/utils";
import userModel from "../models/userModel";
import UserService from "../services/usersService";

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .json(
        createResponse(
          await UserService.getAllUsers(),
          "users fetched successfully"
        )
      );
  }
);

export const voteForCandidate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const candidateId = req.body;
    await UserService.voteForCandidate(userId, candidateId);
    // add socket
  }
);

export const cancelVote = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    await UserService.cancelVote(userId);
    // add socket
  }
);
