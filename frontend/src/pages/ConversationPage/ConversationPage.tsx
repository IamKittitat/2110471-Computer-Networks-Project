import { useEffect, useState } from "react"
import ConversationBox from "./components/ConversationBox"
import ConversationSidebar from "./components/ConversationSideBar"
import { MessageInformation } from "./types/MessageInformation"
import { userServices } from "../../services/UserServices"

export default function ConversationPage() {
  const userId = localStorage.getItem("token") || ""
  const [userName, setUserName] = useState<string>("")
  const [userPicture, setUserPicture] = useState<string>("")
  const [isGroup, setIsGroup] = useState<boolean>(true)
  const [selectedConversation, setSelectedConversation] = useState<string>("")
  const [selectedConversationName, setSelectedConversationName] = useState<string>("")
  const [selectedConversationPicture, setSelectedConversationPicture] = useState<string>("")
  const [messages, setMessages] = useState<MessageInformation[]>([])
  const [hasfetched, setHasFetched] = useState<boolean>(false)

  const handleSelectConversation = (
    conversationId: string,
    conversationName: string,
    conversationPicture: string
  ) => {
    setSelectedConversation(conversationId)
    setSelectedConversationName(conversationName)
    setSelectedConversationPicture(conversationPicture)
  }

  useEffect(() => {
    const fetchSelf = async () => {
      const info = await userServices.getUserInfo(userId)

      setUserName(info.username)
      setUserPicture(
        info.profile_picture ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU"
      )
      setHasFetched(true)
    }
    fetchSelf()
  }, [])

  return (
    <div className="flex">
      <div className="h-screen w-[34%]">
        {hasfetched && (
          <ConversationSidebar
            userName={userName}
            setUserName={setUserName}
            userPicture={userPicture}
            setUserPicture={setUserPicture}
            onConversationSelect={handleSelectConversation}
            selectedConversationId={selectedConversation}
            setSelectedConversationName={setSelectedConversationName}
            setSelectedConversationPicture={setSelectedConversationPicture}
            userId={userId}
            setIsGroup={setIsGroup}
            messages={messages}
          />
        )}
      </div>
      <div className="flex h-screen w-[66%]">
        {selectedConversationName !== "" && (
          <>
            <ConversationBox
              conversationId={selectedConversation}
              conversationName={selectedConversationName}
              conversationPicture={selectedConversationPicture}
              selfUserId={userId}
              isGroup={isGroup}
            />
          </>
        )}
      </div>
    </div>
  )
}
