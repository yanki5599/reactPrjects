export interface IUser {
  _id: string;
  username: string;
  isAdmin: boolean;
  votedForId: string | null;
}
