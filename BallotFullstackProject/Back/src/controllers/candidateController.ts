import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import candidateModel from "../models/candidateModel";
import { createResponse } from "../utils/utils";

export const getCandidates = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .json(
        createResponse(
          await candidateModel.find(),
          "candidates fetched successfully"
        )
      );
  }
);
