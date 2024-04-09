import { environment } from "../common/constants/environment"

export const conversationServices = {
  getMessagesByConversationId: async (conversationId: string | null) => {
    const response = await fetch(
      `${environment.backend.url}/conversations/messages?conversationId=${conversationId}`
    )
    return await response.json()
  },

  getConversationsByUserId: async (userId: string | null, mode: "individual" | "group") => {
    const response = await fetch(
      `${environment.backend.url}/conversations/${mode}?userId=${userId}`
    )
    return await response.json()
  },

  joinGroupConversation: async (userId: string, conversationId: string) => {
    try {
      const response = await fetch(`${environment.backend.url}/conversations/join-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, conversationId })
      })
      if (response.status === 500) {
        return null
      }
      return await response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  },

  createGroupConversation: async (userIds: string[], groupName: string) => {
    try {
      const response = await fetch(`${environment.backend.url}/conversations/create-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userIds, groupName })
      })
      if (response.status === 500) {
        return null
      }
      return await response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
