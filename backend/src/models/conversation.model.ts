export interface Conversation {
  conversation_id: string
  is_group: boolean
  group_name: string
  created_at: Date
  updated_at: Date
}

export interface Message {
  message_id: string
  conversation_id: string
  sender_id: string
  message_text: string
  created_at: Date
}
