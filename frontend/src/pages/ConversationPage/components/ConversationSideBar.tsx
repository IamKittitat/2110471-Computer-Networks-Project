import { useState, useEffect } from "react"
import ConversationList from "./ConversationList"
import { ConversationInformation, MessageInformation } from "../types/MessageInformation"
import Profile from "./Profile"
import { conversationServices } from "../../../services/ConversationServices"
import { userServices } from "../../../services/UserServices"
import NewGroup from "./NewGroup"

export default function ConversationSidebar({
  userName,
  setUserName,
  userPicture,
  setUserPicture,
  onConversationSelect,
  selectedConversationId,
  setSelectedConversationName,
  setSelectedConversationPicture,
  userId,
  setIsGroup,
  messages
}: {
  userName: string | null
  setUserName: (userName: string) => void
  userPicture: string | null
  setUserPicture: (userPicture: string) => void
  onConversationSelect: (
    conversationId: string,
    conversationName: string,
    conversationPicture: string
  ) => void
  selectedConversationId: string | null
  setSelectedConversationName: (conversationName: string) => void
  setSelectedConversationPicture: (conversationPicture: string) => void
  userId: string
  setIsGroup: (isGroup: boolean) => void
  messages: MessageInformation[]
}) {
  const [individualConversationIds, setIndividualConversationIds] = useState<
    ConversationInformation[]
  >([])
  const [groupConversationIds, setGroupConversationIds] = useState<ConversationInformation[]>([])
  const [filteredConversations, setFilteredConversations] = useState<ConversationInformation[]>([])
  const [newConversations, setNewConversations] = useState<ConversationInformation[]>([])
  const [selectedMode, setSelectedMode] = useState<"INDIVIDUAL" | "GROUP">("INDIVIDUAL")
  const handleModeSelect = (mode: "INDIVIDUAL" | "GROUP") => {
    setSelectedMode(mode)
  }

  const handleEditProfile = () => {
    alert("aaaa")
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
      let newUsers: ConversationInformation[] = []
      for (let i = 0; i < users.length; i++) {
        if (!knownUsers.includes(users[i].username, 0) && users[i].username !== userName) {
          newUsers.push({
            conversation_id: null,
            username: users[i].username,
            profile_picture: users[i].profile_picture,
            group_name: null,
            is_join: false
          })
        }
      }
      setNewConversations(newUsers)
    }

    fetchUsers()
  }, [messages])

  useEffect(() => {
    if (selectedMode === "INDIVIDUAL") {
      setFilteredConversations(individualConversationIds)
    } else {
      setFilteredConversations(groupConversationIds)
    }
  }, [selectedMode])

  return (
    <div className="overflow-y-auto h-screen flex flex-col items-center justify-start py-8 px-5">
      <Profile userPicture={userPicture} userName={userName} onClick={handleEditProfile} />
      <div className="flex w-full mt-3">
        <div
          className={`cursor-pointer p-2 border-b-2 w-full flex justify-center font-semibold ${
            selectedMode === "INDIVIDUAL"
              ? "text-blue-500 border-blue-500 border-b-[3px]"
              : "text-gray-600 border-gray-200"
          }`}
          onClick={() => handleModeSelect("INDIVIDUAL")}
        >
          Chats
        </div>
        <div
          className={`cursor-pointer p-2 border-b-2 w-full flex justify-center font-semibold ${
            selectedMode === "GROUP"
              ? "text-blue-500 border-blue-500 border-b-[3px]"
              : "text-gray-600 border-gray-200"
          }`}
          onClick={() => handleModeSelect("GROUP")}
        >
          Groups
        </div>
      </div>
      {selectedMode === "GROUP" && <NewGroup onClick={() => alert("newGG")} />}
      {filteredConversations.map((conversation) => (
        <ConversationList
          key={`${conversation.conversation_id}_${conversation.username}`}
          onSelect={() =>
            onConversationSelect(
              conversation.conversation_id || "",
              conversation.group_name || conversation.username || "",
              conversation.profile_picture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU"
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
        />
      ))}
      {selectedMode === "INDIVIDUAL" &&
        newConversations.map((conversation) => (
          <ConversationList
            key={`${conversation.username}`}
            onSelect={() => alert(`selected ${conversation.username}`)}
            isSelected={conversation.conversation_id === selectedConversationId}
            mode={selectedMode}
            name={conversation.username || ""}
            picture={
              conversation.profile_picture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU"
            }
            isJoin={conversation.is_join}
          />
        ))}
    </div>
  )
}
