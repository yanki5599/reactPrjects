import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";

const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // assuming auth middleware already extracted jwt
  if ((req as any).user && (req as any).user.isAdmin) next();
  else next(new ErrorResponse("admin access only", 401));
};

export default adminMiddleware;
