import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import AttackingMissileModel from "../models/AttackingMissileModel";
import { createResponse } from "../utils/utils";
import MissileService from "../services/missileService";

export const getAll = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?._id;
    const attacks = await AttackingMissileModel.find({
      attackerId: id,
    }).populate("missileId");

    res
      .status(200)
      .json(createResponse(attacks, "attacks fetched successfully"));
  }
);

export const attack = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("attacking");

    const { destination, missileId } = req.body;
    const launched = await MissileService.attack({
      attackerId: req.user?._id!,
      destination,
      attackerMissileTypeId: missileId,
    });
    console.log(launched);
    res.status(201).json(createResponse(launched, "launched"));
  }
);
