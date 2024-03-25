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
    socket.on("sendMessage", async (message: MessageType, room: string, senderId: string) => {
      socket.to(room).emit("receiveMessage", message)
      const isSuccess = await conversationRepository.addMessage(room, senderId, message.message)
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
  }
}
