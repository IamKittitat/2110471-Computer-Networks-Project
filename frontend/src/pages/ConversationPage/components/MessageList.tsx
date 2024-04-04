import Message from "./Message"
import { useEffect, useRef } from "react"
import { MessageInformation } from "../types/MessageInformation"

export default function MessageList({ messages }: { messages: MessageInformation[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    scrollToBottom() // Scroll to bottom when component first renders
  }, [messages])

  console.log(messages.length)

  return (
    <div className="overflow-auto h-full py-[8px] px-[16px] space-y-1">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message.message}
          sender={message.sender}
          timeSent={message.timeSent}
          isShowTime={
            index > 0
              ? index === messages.length - 1
                ? true
                : messages[index - 1].sender !== message.sender
              : index === messages.length - 1
          }
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
