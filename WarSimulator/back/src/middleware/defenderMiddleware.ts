import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import { Organization } from "../models/organizationModel";
import ErrorResponse from "../utils/ErrorResponse";

const defenderMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userModel
    .findById(req.user?._id)
    .populate("organizationId");
  if (!user) throw new Error("user not found in defender middleware");

  if ((user.organizationId as unknown as Organization).name.startsWith("IDF"))
    next();
  else next(new ErrorResponse("unauthorized! defenders only", 403));
};

export default defenderMiddleware;
