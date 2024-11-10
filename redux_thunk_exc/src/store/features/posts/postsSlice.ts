import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { Post, RootState } from "../../../types";
import axios from "axios";
import { createGenericFetchThunk } from "../../fetch";

interface PostsStateType {
  posts: Post[];
  status: "Idle" | "Pending" | "Fulfilled" | "Rejected";
  error: string;
}

// הגדרת טיפוס למצב ההתחלתי
const initialState: PostsStateType = { posts: [], status: "Idle", error: "" };

// הגדרת טיפוס לפעולת הוספת תגובה
interface ReactionAddedPayload {
  postId: string;
  reaction: keyof Post["reactions"];
}

export const fetchPosts = createGenericFetchThunk<Post>(
  "posts/get",
  import.meta.env.VITE_POSTS_BASE_URL
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action: PayloadAction<ReactionAddedPayload>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "Pending";
        state.error = "";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "Fulfilled";
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || "";
        state.status = "Rejected";
        console.log("rejected posts");
      });
  },
});

// סלקטור עם טיפוס מדויק
export const selectAllPosts = (state: RootState): Post[] => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
