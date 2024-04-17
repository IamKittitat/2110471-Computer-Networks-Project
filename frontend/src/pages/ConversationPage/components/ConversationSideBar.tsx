import { useState, useEffect } from "react"
import ConversationList from "./ConversationList"
import { ConversationInformation } from "../types/MessageInformation"
import Profile from "./Profile"
import { conversationServices } from "../../../services/ConversationServices"
import { userServices } from "../../../services/UserServices"
import NewGroup from "./NewGroup"
import { User } from "../../../common/types/user"
import io from "socket.io-client"
import { environment } from "../../../common/constants/environment"

const socket = io(environment.backend.url)

export default function ConversationSidebar({
  userName,
  userPicture,
  onConversationSelect,
  selectedConversationId,
  userId,
  setEditProfileModal,
  setCreateGroupModalOpen,
  allUsers,
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
  allUsers: User[]
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
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
    socket.emit("connected-user")
    socket.on("receive-connected-user", (users: User[]) => {
      console.log("Connected users", users)
      setAllUsers(users)
    })
    socket.emit("group-list")
    socket.on("receive-group-list", (groupList: any) => {
      // console.log("Group list", groupList)
    })
    return () => {
      socket.off("receive-connected-user")
      socket.off("receive-group-list")
    }
  }, [])

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
      let newUsers: ConversationInformation[] = []
      for (let i = 0; i < allUsers.length; i++) {
        if (!knownUsers.includes(allUsers[i].username, 0) && allUsers[i].username !== userName) {
          newUsers.push({
            username: allUsers[i].username,
            profile_picture: allUsers[i].profile_picture,
            is_join: false,
            user_id: allUsers[i].user_id
          })
        }
      }
      setNewConversations(newUsers)
    }

    fetchUsers()
  }, [toggleList, allUsers])

  useEffect(() => {
    if (selectedMode === "INDIVIDUAL") {
      setFilteredConversations(individualConversationIds)
    } else {
      setFilteredConversations(groupConversationIds)
    }
  }, [selectedMode])

  return (
    <div className="overflow-y-auto h-screen flex flex-col items-center justify-start py-8 px-5">
      <Profile
        userPicture={userPicture}
        userName={userName}
        onClick={setEditProfileModal}
        userId={userId}
      />
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
      <div className="overflow-y-auto w-full">
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
    </div>
  )
}
