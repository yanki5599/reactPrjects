import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import MissileService from "../services/missileService";

export const attack = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { destination, missileId } = req.body;
    await MissileService.attack({
      attackerId: req.user?._id!,
      destination,
      missileId,
    });
  }
);

export const defend = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
