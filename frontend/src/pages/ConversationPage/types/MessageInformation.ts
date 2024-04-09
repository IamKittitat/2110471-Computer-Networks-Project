export interface MessageInformation {
  sender_id: string
  message_text: string
  created_at: number
}

export interface ConversationInformation {
  conversation_id?: string | null
  username: string | null
  profile_picture: string | null
  group_name?: string | null
  is_join: boolean | null
  user_id?: string | null
}

export interface UserInformation {
  user_id: string
  username: string
  profile_picture: string
  password: string
  created_at: string
  updated_at: string
}
