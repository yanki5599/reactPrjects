import { ObjectId } from "mongoose";
import candidateModel from "../models/candidateModel";

export default class CandidatesService {
  public static async isCandidateExistById(userId: string | ObjectId) {
    return (await candidateModel.findById(userId)) != undefined;
  }
  public static async getAllCandidates() {
    return await candidateModel.find();
  }
}
