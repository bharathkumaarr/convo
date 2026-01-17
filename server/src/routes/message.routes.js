import express from "express";
import { sendUserMessage } from "../controllers/message.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:chatSessionId/message", requireAuth, sendUserMessage);

export default router;
