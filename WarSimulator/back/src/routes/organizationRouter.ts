import express from "express";
import * as organizationController from "../controllers/organizationController";
const router = express.Router();

router.route("/all").get(organizationController.getAllNames);

export default router;
