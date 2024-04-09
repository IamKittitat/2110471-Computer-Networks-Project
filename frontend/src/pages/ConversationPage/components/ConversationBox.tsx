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
  selfUserId,
  conversationName,
  conversationPicture,
  isGroup
}: {
  conversationId: string | null
  selfUserId: string
  conversationName: string
  conversationPicture: string
  isGroup: boolean
}) {
  const [messages, setMessages] = useState<MessageInformation[]>([])
  const [messageText, setMessageText] = useState<string>("")
  const [bg, setBg] = useState<string>("")
  const [bgNumber, setBgNumber] = useState<number>(0)
  const room = conversationId
  const bgList = [
    "'https://i.postimg.cc/y8SvnRg1/sky-1286888-1280.jpg'",
    "'https://www.patternpictures.com/wp-content/uploads/Early-morning-sunset-sky-patternpictures-3612-1600x1063.jpg'",
    "'https://media.istockphoto.com/id/835370890/photo/sunset-sunrise-with-clouds-light-rays-and-other-atmospheric-effect.jpg?s=612x612&w=0&k=20&c=zGDOBYVFY74wX2gUgkonYGtNl1zenev5mPotAqUlJbM='",
    ""
  ]

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await conversationServices.getMessagesByConversationId(conversationId)
      setMessages(messages)
    }
    fetchMessages()
  }, [conversationId])

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

  const handleButtonClick = () => {
    setBgNumber((bgNumber + 1) % bgList.length)
    setBg(bgList[bgNumber])
  }

  return (
    <div
      className={`relative flex flex-col h-screen w-full bg-cover
    bg-[url(${bg})]`}
    >
      <ConversationHeader
        conversationName={conversationName}
        conversationPicture={conversationPicture}
        onClick={handleButtonClick}
      />
      <MessageList messages={messages} selfUserId={selfUserId} isGroup={isGroup} />
      <ConversationFooter
        messageText={messageText}
        setMessageText={setMessageText}
        sendMessage={sendMessage}
      />
    </div>
  )
}
