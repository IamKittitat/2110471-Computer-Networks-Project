import express from "express"
import { conversationController } from "../controllers/conversation.controller"

const router = express.Router()

// expecting a get request to /conversation/individual?username=...
router.get("/individual", conversationController.getIndividualConversations)

// expecting a post request to /conversation
router.post("/", conversationController.createConversation)

export default router
