import Button from "./Button"

export default function ConversationList({
  onSelect,
  isSelected,
  mode,
  name,
  picture,
  isJoin,
  onButton
}: {
  onSelect: () => void
  isSelected: boolean
  mode: "INDIVIDUAL" | "GROUP"
  name: string
  picture: string
  isJoin: boolean | null
  onButton: () => void
}) {
  const handleSelectConversation = () => {
    if (isJoin !== false) {
      onSelect()
    }
  }
  return (
    <div
      className={`flex items-center justify-between h-[79px] w-[95%] rounded-md mt-[10px] py-2 cursor-pointer ${
        isSelected ? "bg-blue-100" : ""
      }`}
      onClick={handleSelectConversation}
    >
      <div className="flex items-center">
        <img
          src={picture}
          alt="Profile Picture"
          className="h-[60px] w-[60px] rounded-full bg-black mx-2"
        />
        <div className={`flex flex-col ml-4 ${isSelected ? "text-blue-800" : "text-gray-900"}`}>
          <p className="text-lg font-semibold">{name}</p>
        </div>
      </div>
      <div className="mx-2">
        {mode === "INDIVIDUAL" && isJoin === false && (
          <Button onClick={onButton} buttonText="New chat 💬" />
        )}
        {mode === "GROUP" && isJoin === false && (
          <Button onClick={onButton} buttonText="Join chat 💬" />
        )}
      </div>
    </div>
  )
}
