export interface AddUserDto {
  username: string;
  password: string;
}

export interface IUserDto {
  username: string;
  isAdmin: boolean;
  hasVoted: boolean;
}
