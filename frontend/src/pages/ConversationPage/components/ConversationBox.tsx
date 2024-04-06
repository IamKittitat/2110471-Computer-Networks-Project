import { useState, useEffect } from "react"
import io from "socket.io-client"
import MessageList from "./MessageList"
import ConversationFooter from "./ConversationFooter"
import { conversationServices } from "../../../services/ConversationServices"
import { environment } from "../../../common/constants/environment"
import ConversationHeader from "./ConversationHeader"
import { MessageInformation } from "../types/MessageInformation"

const socket = io(environment.backend.url)

export default function ConversationBox({
  conversationId,
  selfUserId
}: {
  conversationId: string | null
  selfUserId: string
}) {
  const [messages, setMessages] = useState<MessageInformation[]>([])
  const [messageText, setMessageText] = useState<string>("")
  const [otherName, setOtherName] = useState<string>("")
  const room = conversationId

  conversationId = "9e0c5206-c0f2-40d0-8816-770a674da127"

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await conversationServices.getMessagesByConversationId(conversationId)
      setMessages(messages)

      console.log(messages)
    }
    fetchMessages()
  }, [])

  useEffect(() => {
    socket.on("receiveMessage", (message: MessageInformation) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
    return () => {
      socket.off("receiveMessage")
    }
  }, [])

  useEffect(() => {
    socket.emit("joinRoom", room)
  }, [room])

  const sendMessage = () => {
    if (!messageText.trim() || !conversationId) {
      return
    }
    socket.emit(
      "sendMessage",
      {
        message_text: messageText,
        sender_id: selfUserId,
        created_at: new Date()
      },
      room,
      selfUserId
    )
    setMessages([
      ...messages,
      { message_text: messageText, sender_id: selfUserId, created_at: Date.now() }
    ])
    setMessageText("")
  }

  return (
    <div className="relative flex flex-col h-screen w-full bg-[url('../../../assets/images/common/chatBackground1.jpeg')]">
      <ConversationHeader otherName={otherName} />
      <MessageList messages={messages} selfUserId={selfUserId} />
      <ConversationFooter
        messageText={messageText}
        setMessageText={setMessageText}
        sendMessage={sendMessage}
      />
    </div>
  )
}
