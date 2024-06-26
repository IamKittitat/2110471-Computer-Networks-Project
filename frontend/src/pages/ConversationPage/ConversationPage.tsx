import { useEffect, useState } from "react"
import ConversationBox from "./components/ConversationBox"
import ConversationSidebar from "./components/ConversationSideBar"
import { userServices } from "../../services/UserServices"
import EditProfile from "./components/Modal/EditProfile"
import CreateGroup from "./components/Modal/CreateGroup"
import { User } from "../../common/types/user"

export default function ConversationPage() {
  const userId = localStorage.getItem("token") || ""
  const [userName, setUserName] = useState<string>("")
  const [userPicture, setUserPicture] = useState<string>("")
  const [isGroup, setIsGroup] = useState<boolean>(true)
  const [selectedConversation, setSelectedConversation] = useState<string>("")
  const [selectedConversationName, setSelectedConversationName] = useState<string>("")
  const [selectedConversationPicture, setSelectedConversationPicture] = useState<string>("")
  const [hasfetched, setHasFetched] = useState<boolean>(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState<boolean>(false)
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState<boolean>(false)
  const [allUsers, setAllUsers] = useState<User[]>([])

  const handleSelectConversation = (
    conversationId: string,
    conversationName: string,
    conversationPicture: string,
    isGroup: boolean
  ) => {
    setSelectedConversation(conversationId)
    setSelectedConversationName(conversationName)
    setSelectedConversationPicture(conversationPicture)
    setIsGroup(isGroup)
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
  }, [isEditProfileModalOpen])

  return (
    <div className="flex">
      <div className="h-screen w-[34%]">
        {hasfetched && (
          <ConversationSidebar
            userName={userName}
            userPicture={userPicture}
            onConversationSelect={handleSelectConversation}
            selectedConversationId={selectedConversation}
            userId={userId}
            setEditProfileModal={() => setIsEditProfileModalOpen(true)}
            setCreateGroupModalOpen={() => setCreateGroupModalOpen(true)}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
          />
        )}
      </div>
      <div className="flex h-screen w-[66%]">
        {selectedConversation !== "" && (
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
      {hasfetched && (
        <EditProfile
          oldName={userName}
          oldPicture={userPicture}
          userId={userId}
          isVisible={isEditProfileModalOpen}
          onClose={() => {
            setIsEditProfileModalOpen(false)
          }}
        />
      )}
      {hasfetched && (
        <CreateGroup
          allUsers={allUsers}
          isVisible={isCreateGroupModalOpen}
          onClose={() => {
            setCreateGroupModalOpen(false)
          }}
        />
      )}
    </div>
  )
}
