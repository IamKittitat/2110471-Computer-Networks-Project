import { db } from "../configs/pgdbConnection"
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
  addMessage: async (conversationId: string, senderId: string, message: string) => {
    try {
      await db.query(
        `
          INSERT INTO MESSAGE(conversation_id, sender_id, message_text)
          VALUES($1, $2, $3)
        `,
        [conversationId, senderId, message]
      )
      return true
    } catch (err) {
      return false
    }
  },
  createConversation: async (userId: string, otherUserId: string): Promise<Conversation | null> => {
    try {
      const conversation_id = await db.query(
        `
          INSERT INTO CONVERSATION(is_group)
          VALUES(FALSE)
          RETURNING conversation_id
        `
      )
      await db.query(
        `
          INSERT INTO USER_CONVERSATION(conversation_id, user_id)
          VALUES($1, $2),
                ($1, $3)
        `,
        [conversation_id.rows[0].conversation_id, userId, otherUserId]
      )
      return conversation_id.rows[0].conversation_id
    } catch (err) {
      console.error("Error creating conversation:", err)
      return null
    }
  },
  createGroupConversation: async (
    userIds: string[],
    groupName: string
  ): Promise<Conversation | null> => {
    try {
      const conversation_id = await db.query(
        `
          INSERT INTO CONVERSATION(is_group, group_name)
          VALUES(TRUE, $1)
          RETURNING conversation_id
        `,
        [groupName]
      )
      await Promise.all(
        userIds.map((userId) =>
          db.query(
            `
              INSERT INTO USER_CONVERSATION(conversation_id, user_id)
              VALUES($1, $2)
            `,
            [conversation_id.rows[0].conversation_id, userId]
          )
        )
      )
      return conversation_id.rows[0].conversation_id
    } catch (err) {
      console.error("Error creating group conversation:", err)
      return null
    }
  },
  getIndividualConversationList: async (userId: string): Promise<Conversation[]> => {
    console.log("userId", userId)
    try {
      const myConversation = await db.query(
        `
          SELECT conversation_id
          FROM USER_CONVERSATION
          WHERE user_id = $1
        `,
        [userId]
      )
      // query conversation in myConversation.rows
      const conversations = await db.query(
        `
          SELECT conversation_id
          FROM CONVERSATION
          WHERE conversation_id = ANY($1)
        `,
        [myConversation.rows.map((row) => row.conversation_id)]
      )
      // query user in USER_CONVERSATION where conversation_id in conversations and user_id != userId
      const users = await db.query(
        `
          SELECT user_id, conversation_id
          FROM USER_CONVERSATION
          WHERE conversation_id = ANY($1)
        `,
        [conversations.rows.map((row) => row.conversation_id)]
      )
      // for each user query user info with its conversation_id
      const result = await Promise.all(
        users.rows
          .filter((row) => row.user_id !== userId)
          .map(async (row) => {
            const user = await db.query(
              `
              SELECT username, profile_picture
              FROM USER_TABLE
              WHERE user_id = $1
            `,
              [row.user_id]
            )
            return { ...user.rows[0], conversation_id: row.conversation_id }
          })
      )
      return result
    } catch (err) {
      console.error("Error getting conversation list:", err)
      return []
    }
  },
  getGroupConversationList: async (userId: string): Promise<Conversation[]> => {
    try {
      const joinedGroup = await db.query(
        `
          SELECT uc.conversation_id, c.group_name, m.message_text AS last_message, TRUE AS is_join
          FROM user_conversation uc
          JOIN conversation c
          ON c.conversation_id = uc.conversation_id
          LEFT JOIN 
              (SELECT 
                  conversation_id, 
                  MAX(created_at) AS max_created_at
              FROM 
                  MESSAGE
              GROUP BY 
                  conversation_id
              ) latest_msg ON c.conversation_id = latest_msg.conversation_id
          LEFT JOIN 
              MESSAGE m ON latest_msg.conversation_id = m.conversation_id
                          AND latest_msg.max_created_at = m.created_at
          WHERE 1=1
            AND c.is_group = TRUE
            AND uc.user_id = $1
        `,
        [userId]
      )
      const notJoinedGroup = await db.query(
        `
          SELECT c.conversation_id, c.group_name, NULL AS last_message, FALSE AS is_join
          FROM conversation c
          WHERE 1=1
          AND c.is_group = TRUE
          AND c.conversation_id NOT IN (
            SELECT uc.conversation_id
            FROM user_conversation uc
            WHERE uc.user_id = $1
          )
        `,
        [userId]
      )
      return [...joinedGroup.rows, ...notJoinedGroup.rows]
    } catch (err) {
      console.error("Error getting conversation list:", err)
      return []
    }
  }
}
