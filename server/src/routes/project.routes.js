import express from "express";
import { create, list } from "../controllers/project.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", requireAuth, create);
router.get("/", requireAuth, list);

export default router;
