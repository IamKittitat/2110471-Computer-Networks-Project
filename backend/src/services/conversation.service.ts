import { Socket } from "socket.io"

export const conversationService = {
  // Socket service
  sendMessage: async (socket: Socket) => {
    // socket.on("sendMessage", async (message: MessageType, room: string, senderId: string) => {
    //   socket.to(room).emit("receiveMessage", message)
    //   const isSuccess = await conversationRepository.addMessage(room, senderId, message.message)
    //   if (!isSuccess) {
    //     console.error("Error sending message")
    //   }
    //   // if only 1 unread message -> add to notification + chat notification
    //   const { otherId }: { otherId: string } = await conversationRepository.getOtherId(
    //     room,
    //     senderId
    //   )
    //   const unreadMessages = await conversationService.getUnreadMessagesByConversationId(
    //     room,
    //     otherId
    //   )
    //   if (unreadMessages.count === "1") {
    //     const result = await notificationRepository.createNotification(otherId, "CHAT")
    //     if (!result.isSuccess) return
    //     await notificationRepository.createChatNotification(result.notificationId, room)
    //   }
    // })
  },
  joinRoom: (socket: Socket) => {
    // socket.on("joinRoom", async (room: string) => {
    //   await socket.join(room)
    // })
  },
  disconnect: (socket: Socket) => {
    // socket.on("disconnect", () => {
    //   console.log("User disconnected")
    // })
  }
}
