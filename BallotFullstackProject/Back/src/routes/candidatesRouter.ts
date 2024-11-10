import express from "express";

import * as candidateController from "../controllers/candidateController";

const router = express.Router();

router.route("/candidates").get(candidateController.getCandidates);

export default router;
