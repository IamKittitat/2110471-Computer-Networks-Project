import { Socket } from "socket.io"
import { conversationRepository } from "../repositories/conversation.repository"

export interface MessageType {
  message: string
  sender: "SELF" | "OTHER" | "SYSTEM"
  isRead: boolean
  timeSent: number
}

export const conversationService = {
  // Socket service
  sendMessage: async (socket: Socket) => {
    socket.on("sendMessage", async (message: MessageType, room: string, senderName: string) => {
      socket.to(room).emit("receiveMessage", message)
      const isSuccess = await conversationRepository.addMessage(room, senderName, message.message)
      if (!isSuccess) {
        console.error("Error sending message")
      }
    })
  },
  joinRoom: (socket: Socket) => {
    socket.on("joinRoom", async (room: string) => {
      await socket.join(room)
    })
  },
  disconnect: (socket: Socket) => {
    socket.on("disconnect", () => {
      console.log("User disconnected")
    })
  },

  // Conversation service
  getIndividualConversationList: async (userId: string) => {
    return await conversationRepository.getIndividualConversationList(userId)
  },
  createConversation: async (userId: string, friendUserId: string) => {
    const conversation_id = await conversationRepository.createConversation(userId, friendUserId)
    return conversation_id
  },
  createGroupConversation: async (userIds: string[], groupName: string) => {
    const conversation_id = await conversationRepository.createGroupConversation(userIds, groupName)
    return conversation_id
  },
  getGroupConversationList: async (userId: string) => {
    return await conversationRepository.getGroupConversationList(userId)
  },
  joinGroupConversation: async (userId: string, conversationId: string) => {
    const isSuccess = await conversationRepository.joinGroupConversation(userId, conversationId)
    return isSuccess
  }
}
