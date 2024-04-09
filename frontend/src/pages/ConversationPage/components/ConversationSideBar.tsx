import { useState, useEffect } from "react"
import ConversationList from "./ConversationList"
import { ConversationInformation, UserInformation } from "../types/MessageInformation"
import Profile from "./Profile"
import { conversationServices } from "../../../services/ConversationServices"
import { userServices } from "../../../services/UserServices"
import NewGroup from "./NewGroup"

export default function ConversationSidebar({
  userName,
  userPicture,
  onConversationSelect,
  selectedConversationId,
  userId,
  setEditProfileModal,
  setCreateGroupModalOpen,
  setAllUsers
}: {
  userName: string | null
  userPicture: string | null
  onConversationSelect: (
    conversationId: string,
    conversationName: string,
    conversationPicture: string,
    isGroup: boolean
  ) => void
  selectedConversationId: string | null
  userId: string
  setEditProfileModal: () => void
  setCreateGroupModalOpen: () => void
  setAllUsers: React.Dispatch<React.SetStateAction<UserInformation[]>>
}) {
  const [individualConversationIds, setIndividualConversationIds] = useState<
    ConversationInformation[]
  >([])
  const [groupConversationIds, setGroupConversationIds] = useState<ConversationInformation[]>([])
  const [filteredConversations, setFilteredConversations] = useState<ConversationInformation[]>([])
  const [newConversations, setNewConversations] = useState<ConversationInformation[]>([])
  const [selectedMode, setSelectedMode] = useState<"INDIVIDUAL" | "GROUP">("INDIVIDUAL")
  const [toggleList, setToggleList] = useState<boolean>(false)

  const handleNewChat = async (friendUserId: string) => {
    await userServices.createConversation(userId, friendUserId)
    setToggleList(!toggleList)
  }

  const handleJoinGroup = async (conversationId: string) => {
    await conversationServices.joinGroupConversation(userId, conversationId)
    setToggleList(!toggleList)
  }

  useEffect(() => {
    let knownUsers: string[] = []
    const fetchConversations = async () => {
      const individualConversationIds = await conversationServices.getConversationsByUserId(
        userId,
        "individual"
      )
      setIndividualConversationIds(individualConversationIds)
      for (let i = 0; i < individualConversationIds.length; i++) {
        knownUsers.push(individualConversationIds[i].username)
      }
      const groupConversationIds = await conversationServices.getConversationsByUserId(
        userId,
        "group"
      )
      setGroupConversationIds(groupConversationIds)
      if (selectedMode === "GROUP") setFilteredConversations(groupConversationIds)
      else setFilteredConversations(individualConversationIds)
    }

    const fetchUsers = async () => {
      await fetchConversations()
      const users = await userServices.getUsers()
      setAllUsers(users)
      let newUsers: ConversationInformation[] = []
      for (let i = 0; i < users.length; i++) {
        if (!knownUsers.includes(users[i].username, 0) && users[i].username !== userName) {
          newUsers.push({
            username: users[i].username,
            profile_picture: users[i].profile_picture,
            is_join: false,
            user_id: users[i].user_id
          })
        }
      }
      setNewConversations(newUsers)
    }

    fetchUsers()
  }, [toggleList])

  useEffect(() => {
    if (selectedMode === "INDIVIDUAL") {
      setFilteredConversations(individualConversationIds)
    } else {
      setFilteredConversations(groupConversationIds)
    }
  }, [selectedMode])

  return (
    <div className="overflow-y-auto h-screen flex flex-col items-center justify-start py-8 px-5">
      <Profile userPicture={userPicture} userName={userName} onClick={setEditProfileModal} />
      <div className="flex w-full mt-3">
        <div
          className={`cursor-pointer p-2 border-b-2 w-full flex justify-center font-semibold ${
            selectedMode === "INDIVIDUAL"
              ? "text-blue-500 border-blue-500 border-b-[3px]"
              : "text-gray-600 border-gray-200"
          }`}
          onClick={() => setSelectedMode("INDIVIDUAL")}
        >
          Chats
        </div>
        <div
          className={`cursor-pointer p-2 border-b-2 w-full flex justify-center font-semibold ${
            selectedMode === "GROUP"
              ? "text-blue-500 border-blue-500 border-b-[3px]"
              : "text-gray-600 border-gray-200"
          }`}
          onClick={() => setSelectedMode("GROUP")}
        >
          Groups
        </div>
      </div>
      {selectedMode === "GROUP" && <NewGroup onClick={setCreateGroupModalOpen} />}
      {filteredConversations.map((conversation) => (
        <ConversationList
          key={`${conversation.conversation_id}_${conversation.username}`}
          onSelect={() =>
            onConversationSelect(
              conversation.conversation_id || "",
              conversation.group_name || conversation.username || "",
              conversation.profile_picture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU",
              conversation.group_name !== null
            )
          }
          isSelected={conversation.conversation_id === selectedConversationId}
          mode={selectedMode}
          name={conversation.group_name || conversation.username || ""}
          picture={
            conversation.profile_picture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU"
          }
          isJoin={conversation.is_join}
          onButton={() => handleJoinGroup(conversation.conversation_id || "")}
        />
      ))}
      {selectedMode === "INDIVIDUAL" &&
        newConversations.map((conversation) => (
          <ConversationList
            key={`${conversation.username}`}
            onSelect={() => handleNewChat(conversation.user_id || "")}
            isSelected={conversation.conversation_id === selectedConversationId}
            mode={selectedMode}
            name={conversation.username || ""}
            picture={
              conversation.profile_picture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU"
            }
            isJoin={conversation.is_join}
            onButton={() => handleNewChat(conversation.user_id || "")}
          />
        ))}
    </div>
  )
}
