import mongoose, { ObjectId } from "mongoose";
import userModel, { IUser } from "../models/userModel";
import AuthService from "./authService";
import ErrorResponse from "../utils/ErrorResponse";
import CandidatesService from "./candidatesService";

export default class UsersService {
  static async getAllUsers(): Promise<IUser[]> {
    return await userModel.find();
  }

  static async voteForCandidate(
    userId: ObjectId | string | undefined,
    candidateId: string | ObjectId | undefined
  ) {
    if (!userId || !candidateId)
      throw new ErrorResponse("candidate id required", 400);

    if (!(await CandidatesService.isCandidateExistById(candidateId)))
      throw new ErrorResponse("user not exist", 500);

    const user = await userModel.findById(userId);
    if (!user) throw new ErrorResponse("user not exist", 400);

    if (user?.votedForId != null)
      throw new ErrorResponse(
        "you already voted , cancel vote first in order to vote again!",
        400
      );

    await user.updateOne({ votedForId: candidateId });
    await user.save();
  }

  static async cancelVote(userId: ObjectId | string | undefined) {
    if (!userId) throw new ErrorResponse("candidate id required", 400);

    const user = await userModel.findById(userId);
    if (!user) throw new ErrorResponse("user not exist", 500);

    await user.updateOne({ votedForId: null });
    await user.save();
  }
}
