import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import candidateModel from "../models/candidateModel";
import { createResponse } from "../utils/utils";
import CandidatesService from "../services/candidatesService";

export const getCandidates = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const candidates = await CandidatesService.getAllCandidates();
    res
      .status(200)
      .json(createResponse(candidates, "candidates fetched successfully"));
  }
);
