import { useState } from "react"
import ModalOverlay from "./ModalOverlay"
import Button from "../Button"
import { UserInformation } from "../../types/MessageInformation"
import NameList from "./NameList"
import { conversationServices } from "../../../../services/ConversationServices"

export default function CreateGroup({
  allUsers,
  isVisible,
  onClose
}: {
  allUsers: UserInformation[]
  isVisible: boolean
  onClose: () => void
}) {
  const [name, setName] = useState<string>("")
  let addingList: string[] = []

  const handleSubmitButton = async () => {
    await conversationServices.createGroupConversation(addingList, name)
    onClose()
  }

  const handleAddUser = async (userId: string) => {
    addingList.push(userId)
  }

  const handleRemoveUser = async (userId: string) => {
    const idx = addingList.indexOf(userId)
    addingList.splice(idx, 1)
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
            id="name"
            className="h-9 w-full resize-none overflow-hidden px-3 py-1 border-gray-200 border-[1.5px] rounded-md"
            value={name}
            placeholder="New group"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="flex justify-end gap-1 w-full">
          <Button onClick={onClose} buttonText="Cancel" isRed={true} />
          <Button onClick={handleSubmitButton} buttonText="Done" isBlue={true} />
        </div>
      </div>
    </ModalOverlay>
  )
}
