import express from "express";
import {sendUserMessage, getMessages,} from "../controllers/message.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/:chatSessionId/message", requireAuth, sendUserMessage);
router.get("/:chatSessionId/messages", requireAuth, getMessages);

export default router;
