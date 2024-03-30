import { db } from "../configs/pgdbConnection"
import { v4 as uuidv4 } from "uuid"
import { Conversation } from "../models/conversation.model"

export const conversationRepository = {
  getMessagesByConversationId: async (conversationId: string, userId: string) => {
    const result = await db.query(
      `
        SELECT message_text, created_at, is_read,
        CASE 
          WHEN sender_id = $2 THEN 'SELF'
          WHEN sender_id <> $2 THEN 'OTHER'
        END AS sender
        FROM MESSAGE
        WHERE conversation_id = $1
        ORDER BY created_at
      `,
      [conversationId, userId]
    )
    return result.rows
  },
  addMessage: async (conversationId: string, senderName: string, message: string) => {
    try {
      // query senderId
      const senderId = await db.query(
        `
          SELECT user_id
          FROM USER_TABLE
          WHERE username = $1
        `,
        [senderName]
      )
      await db.query(
        `
          INSERT INTO MESSAGE(conversation_id, sender_id, message_text)
          VALUES($1, $2, $3)
        `,
        [conversationId, senderId.rows[0].user_id, message]
      )
      return true
    } catch (err) {
      return false
    }
  },
  createConversation: async (
    username: string,
    otherUsername: string
  ): Promise<Conversation | null> => {
    try {
      const conversation_id = uuidv4()
      const result = await db.query(
        `
          INSERT INTO CONVERSATION(conversation_id, is_group)
          VALUES($1, FALSE)
          RETURNING conversation_id
        `,
        [conversation_id]
      )
      // query userId
      const userId = await db.query(
        `
          SELECT user_id
          FROM USER_TABLE
          WHERE username = $1
        `,
        [username]
      )
      // query otherUserId
      const otherUserId = await db.query(
        `
          SELECT user_id
          FROM USER_TABLE
          WHERE username = $1
        `,
        [otherUsername]
      )
      await db.query(
        `
          INSERT INTO USER_CONVERSATION(conversation_id, user_id)
          VALUES($1, $2),
                ($1, $3)
        `,
        [conversation_id, userId.rows[0].user_id, otherUserId.rows[0].user_id]
      )
      return result.rows[0].conversation_id
    } catch (err) {
      console.error("Error creating conversation:", err)
      return null
    }
  },
  getIndividualConversationList: async (username: string): Promise<Conversation[]> => {
    try {
      // query userId
      const userId = await db.query(
        `
          SELECT user_id
          FROM USER_TABLE
          WHERE username = $1
        `,
        [username]
      )
      const result = await db.query(
        `
          SELECT conversation_id
          FROM USER_CONVERSATION
          WHERE user_id = $1
        `,
        [userId.rows[0].user_id]
      )
      // query conversation in result.rows
      const conversations = await db.query(
        `
          SELECT conversation_id
          FROM CONVERSATION
          WHERE conversation_id = ANY($1)
        `,
        [result.rows.map((row) => row.conversation_id)]
      )
      return conversations.rows.map((row) => row.conversation_id)
    } catch (err) {
      console.error("Error getting conversation list:", err)
      return []
    }
  }
}
