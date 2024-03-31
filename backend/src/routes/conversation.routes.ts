import express from "express"
import { conversationController } from "../controllers/conversation.controller"

const router = express.Router()

// expecting a get request to /conversation/individual?userId=...
router.get("/individual", conversationController.getIndividualConversations)

// expecting a post request to /conversation
// with body containing userId and friendUserId
router.post("/", conversationController.createConversation)

export default router
