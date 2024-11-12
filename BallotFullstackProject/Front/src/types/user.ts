import { ICandidate } from "./candidate";

export interface IUser {
  id: string;
  username: string;
  isAdmin: boolean;
  votedForId: string | null;
}
