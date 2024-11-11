import express from "express";

import * as userController from "../controllers/userController";

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/vote").post(userController.voteForCandidate);
router.route("/cancel-vote").post(userController.cancelVote);

export default router;
