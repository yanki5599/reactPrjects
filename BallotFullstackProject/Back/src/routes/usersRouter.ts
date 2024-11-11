import express from "express";

import * as userController from "../controllers/userController";

const router = express.Router();

router.route("/").get(userController.getAllUsers);

export default router;
