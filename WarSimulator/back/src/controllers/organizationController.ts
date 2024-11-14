import asyncHandler from "../middleware/asyncHandler";
import { NextFunction, Request, Response } from "express";
import organizationModel from "../models/organizationModel";
import { createResponse } from "../utils/utils";

export const getAllNames = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allNames = (await organizationModel.find()).map((org) => org.name);
    res
      .status(200)
      .json(
        createResponse(allNames, "organizations names fetched successfully")
      );
  }
);
