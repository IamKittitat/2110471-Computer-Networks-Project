import express from "express"
import { conversationController } from "../controllers/conversation.controller"

const router = express.Router()

// expecting a get request to /conversations/individual?userId=...
router.get("/individual", conversationController.getIndividualConversations)

// expecting a post request to /conversations
// with body containing userId and friendUserId
router.post("/", conversationController.createConversation)

// expecting a post request to /conversations/create-group
// with body containing list of userIds and groupName
router.post("/create-group", conversationController.createGroupConversation)

export default router
