import express from "express";
import { startSession, chat } from "../controllers/chat.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/start/:agentId", requireAuth, startSession);
router.post("/:chatSessionId/message", requireAuth, chat);


export default router;
