// types/index.ts
export interface Post {
  id: string;
  title: string;
  body: string;
  date: string;
  userId?: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

export interface User {
  id: string;
  name: string;
}

export interface RootState {
  posts: {
    posts: Post[];
    status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
    error: string;
  };
  users: {
    users: User[];
    status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
    error: string;
  };
}
