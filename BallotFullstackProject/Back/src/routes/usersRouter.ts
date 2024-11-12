import express from "express";

import * as userController from "../controllers/userController";
import adminMiddleware from "../middleware/adminMiddleware";

const router = express.Router();

router.route("/").get(adminMiddleware, userController.getAllUsers);
router.route("/vote").post(userController.voteForCandidate);
router.route("/cancel-vote").post(userController.cancelVote);

export default router;
