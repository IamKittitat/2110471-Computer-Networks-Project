import Message from "./Message"
import { useEffect, useRef } from "react"
import { MessageInformation } from "../types/MessageInformation"

export default function MessageList({
  messages,
  selfUserId,
  isGroup
}: {
  messages: MessageInformation[]
  selfUserId: string
  isGroup: boolean
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom() // Scroll to bottom when component first renders
  }, [messages])

  return (
    <div className="overflow-auto h-full py-[8px] px-[16px] space-y-1">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.message_text}
          sender={message.sender_id}
          self={message.sender_id === selfUserId}
          timeSent={message.created_at}
          isShowTime={
            index === messages.length - 1
              ? true
              : message.sender_id !== messages[index + 1].sender_id
          }
          isShowName={
            index === 0
              ? message.sender_id !== selfUserId && isGroup
              : message.sender_id !== messages[index - 1].sender_id &&
                message.sender_id !== selfUserId &&
                isGroup
          }
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
