import { useState } from "react"
import ConversationBox from "./components/ConversationBox"

const mockSelectedConversationId = "9e0c5206-c0f2-40d0-8816-770a674da127"

export default function ConversationPage() {
  const userId = localStorage.getItem("token") || ""
  const [isGroup, setIsGroup] = useState<boolean>(true)
  const [selectedConversation, setSelectedConversation] = useState<string>(
    "7ff0d5e5-f26e-4197-bd6e-859616989351"
  )
  const [selectedConversationName, setSelectedConversationName] = useState<string>("Group Name")
  const [selectedConversationPicture, setSelectedConversationPicture] = useState<string>(
    "https://avatars.githubusercontent.com/u/58716471?v=4"
  )

  return (
    <>
      <div className="flex h-screen w-[845px]">
        <ConversationBox
          conversationId={selectedConversation}
          conversationName={selectedConversationName}
          conversationPicture={selectedConversationPicture}
          selfUserId={userId}
          isGroup={isGroup}
        />
      </div>
    </>
  )
}
