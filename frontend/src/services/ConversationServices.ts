import { environment } from "../common/constants/environment"

export const conversationServices = {
  getMessagesByConversationId: async (conversationId: string | null) => {
    const response = await fetch(
      `${environment.backend.url}/conversations/messages?conversationId=${conversationId}`
    )
    return await response.json()
  }
}
