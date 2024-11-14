import express from "express";
import * as missileController from "../controllers/missileController";

const router = express.Router();

router.route("/attack").post(missileController.attack);
router.route("/defend").post(missileController.defend);

export default router;
