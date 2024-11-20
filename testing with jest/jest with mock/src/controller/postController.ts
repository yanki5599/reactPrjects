// import { NextFunction, Request, Response } from "express";
// import asyncHandler from "../middleware/asyncHandler";
// import axios from "axios";
// import { IPost } from "../types/IPost";
// import PostService from "../services/postService";

// export const getPosts = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const posts: IPost[] = await PostService.fetchPosts();

//     res.status(200).json({
//       data: posts,
//       success: true,
//       message: "posts fetched successfully",
//     });
//   }
// );
