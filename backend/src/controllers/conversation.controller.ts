import { Request, Response } from "express"
import { conversationService } from "../services/conversation.service"

export const conversationController = {
  getIndividualConversations: async (req: Request, res: Response) => {
    const conversations = await conversationService.getIndividualConversationList(
      req.query.userId as string
    )
    res.status(200).json(conversations)
  },
  createConversation: async (req: Request, res: Response) => {
    const conversation_id = await conversationService.createConversation(
      req.body.userId as string,
      req.body.friendUserId as string
    )
    if (conversation_id) {
      res.status(200).json(conversation_id)
    } else {
      res.status(500).json("Error creating conversation")
    }
  },
  createGroupConversation: async (req: Request, res: Response) => {
    const conversation_id = await conversationService.createGroupConversation(
      req.body.userIds as string[],
      req.body.groupName as string
    )
    if (conversation_id) {
      res.status(200).json(conversation_id)
    } else {
      res.status(500).json("Error creating group conversation")
    }
  },
  getGroupConversations: async (req: Request, res: Response) => {
    const conversations = await conversationService.getGroupConversationList(
      req.query.userId as string
    )
    res.status(200).json(conversations)
  }
}
