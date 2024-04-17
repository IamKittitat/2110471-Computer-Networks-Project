import { useState } from "react"
import ModalOverlay from "./ModalOverlay"
import Button from "../Button"
import NameList from "./NameList"
import { conversationServices } from "../../../../services/ConversationServices"
import io from "socket.io-client"
import { environment } from "../../../../common/constants/environment"
import { User } from "../../../../common/types/user"

const socket = io(environment.backend.url)

export default function CreateGroup({
  allUsers,
  isVisible,
  onClose
}: {
  allUsers: User[]
  isVisible: boolean
  onClose: () => void
}) {
  const [name, setName] = useState<string>("")
  const [addingList, setAddingList] = useState<string[]>([])

  const handleSubmitButton = async () => {
    await conversationServices.createGroupConversation(addingList, name)
    socket.emit("group-list")
    setName("")
    onClose()
  }

  const handleAddUser = async (userId: string) => {
    let l = addingList
    l.push(userId)
    setAddingList(l)
  }

  const handleRemoveUser = async (userId: string) => {
    let l = addingList
    const idx = l.indexOf(userId)
    l.splice(idx, 1)
    setAddingList(l)
  }

  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-lg z-10 flex flex-col justify-items-center items-center p-6 space-y-6 h-[431px] w-[487px] overflow-y-auto"
      >
        <div className="flex flex-col justify-start w-full gap-1">
          <p className="font-semibold">Group Name</p>
          <textarea
            id="groupName"
            className="h-9 w-full resize-none overflow-hidden px-3 py-1 border-gray-200 border-[1.5px] rounded-md"
            value={name}
            placeholder="New group"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto w-full">
          {allUsers.map((user) => (
            <NameList
              key={`${user.username}`}
              onAdd={() => handleAddUser(user.user_id || "")}
              onRemove={() => handleRemoveUser(user.user_id || "")}
              name={user.username || ""}
              picture={
                user.profile_picture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU"
              }
            />
          ))}
        </div>
        <div className="flex justify-end gap-1 w-full">
          <Button onClick={onClose} buttonText="Cancel" isRed={true} />
          <Button onClick={handleSubmitButton} buttonText="Done" isBlue={true} />
        </div>
      </div>
    </ModalOverlay>
  )
}
