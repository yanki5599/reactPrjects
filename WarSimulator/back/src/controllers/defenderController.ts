import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import AttackingMissileModel from "../models/AttackingMissileModel";
import { createResponse } from "../utils/utils";
import userModel from "../models/userModel";
import { Organization } from "../models/organizationModel";
import MissileService from "../services/missileService";

export const getAll = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const defender = await userModel
      .findById(req.user?._id)
      .populate("organizationId");
    if (!defender) throw new Error("ho shit");

    const dest = (
      defender.organizationId as unknown as Organization
    ).name.slice(6);

    const attacks = await AttackingMissileModel.find({ destination: dest });

    res
      .status(200)
      .json(createResponse(attacks, "attacks fetched successfully"));
  }
);

export const defend = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { attackerMissileId, missileId } = req.body;
    const intercepted = await MissileService.interceptMissile({
      defenderId: req.user?._id!,
      attackerMissileId,
      missileId,
    });
    res.status(200).json(createResponse(intercepted, "intercepted success"));
  }
);
