import { Request, Response } from "express"
import { conversationService } from "../services/conversation.service"

export const conversationController = {
  getIndividualConversations: async (req: Request, res: Response) => {
    const conversations = await conversationService.getIndividualConversationList(
      req.query.username as string
    )
    res.status(200).json(conversations)
  },
  createConversation: async (req: Request, res: Response) => {
    const conversation_id = await conversationService.createConversation(
      req.body.username as string,
      req.body.friendUsername as string
    )
    if (conversation_id) {
      res.status(200).json(conversation_id)
    } else {
      res.status(500).json("Error creating conversation")
    }
  }
}
