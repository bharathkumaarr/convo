import express from "express";
import { startSession } from "../controllers/chat.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/start/:agentId", requireAuth, startSession);

export default router;
