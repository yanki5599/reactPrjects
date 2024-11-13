import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtEncryptedUser } from "../types/jwtUserSignature";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) {
    res.status(401).send({ message: "Unauthorized, missing token" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  const id = (decoded as JwtEncryptedUser)._id;
  console.log("middleware decoded", decoded);

  if (!decoded || !id) {
    res.status(401).send({ message: "Unauthorized" });
  }

  req.user = decoded as JwtEncryptedUser;

  next();
};

export default authMiddleware;
