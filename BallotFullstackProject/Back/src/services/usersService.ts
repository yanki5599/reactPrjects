import mongoose, { ObjectId } from "mongoose";
import userModel, { IUser } from "../models/userModel";
import AuthService from "./authService";
import ErrorResponse from "../utils/ErrorResponse";
import CandidatesService from "./candidatesService";
import candidateModel, { ICandidate } from "../models/candidateModel";

export default class UsersService {
  static async getAllUsers(): Promise<IUser[]> {
    return await userModel.find();
  }

  static async voteForCandidate(
    userId: ObjectId | string | undefined,
    candidateId: string | ObjectId | undefined
  ) {
    console.log("service voteForCandidate");
    console.log(`userId:${userId}, candidateId:${candidateId}`);

    if (!userId || !candidateId)
      throw new ErrorResponse("candidate id required", 400);

    const user: IUser | null = await userModel.findById(userId);
    if (!user) throw new ErrorResponse("user not exist", 400);
    const candidate: ICandidate | null = await candidateModel.findById(
      candidateId as string
    );
    if (!candidate) throw new ErrorResponse("candidate not exist", 400);

    if (user?.votedForId != null)
      throw new ErrorResponse(
        "you already voted , cancel vote first in order to vote again!",
        400
      );

    await user.updateOne({ votedForId: candidateId });
    await candidate.updateOne({ votes: candidate.votes + 1 });
    await user.save();
    await candidate.save();
  }

  public static async cancelVote(userId: ObjectId | string | undefined) {
    if (!userId) throw new ErrorResponse("candidate id required", 400);

    const user = await userModel.findById(userId);
    if (!user) throw new ErrorResponse("user not exist", 500);

    if (!user.votedForId) throw new ErrorResponse("user not voted yet", 400);

    const candidate: ICandidate | null = await candidateModel.findById(
      user.votedForId
    );
    if (!candidate)
      throw new ErrorResponse("Internal error: last vote not found", 500);

    await user.updateOne({ votedForId: null });
    await candidate.updateOne({ votes: candidate.votes - 1 });
    await user.save();
    await candidate.save();
  }

  public static async isUserExistById(userId: string | ObjectId) {
    return (await userModel.findById(userId)) != undefined;
  }

  public static async isUsernameExist(username: string): Promise<boolean> {
    return (await userModel.findOne({ username })) != undefined;
  }
}
