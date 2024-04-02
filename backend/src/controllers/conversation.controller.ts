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
  },
  joinGroupConversation: async (req: Request, res: Response) => {
    const isSuccess = await conversationService.joinGroupConversation(
      req.body.userId as string,
      req.body.conversationId as string
    )
    if (isSuccess) {
      res.status(200).json("Successfully joined group conversation")
    } else {
      res.status(500).json("Error joining group conversation")
    }
  },
  getMessages: async (req: Request, res: Response) => {
    const messages = await conversationService.getMessages(req.query.conversationId as string)
    res.status(200).json(messages)
  }
}
