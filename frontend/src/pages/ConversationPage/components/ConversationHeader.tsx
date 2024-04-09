import Button from "./Button"

export default function ConversationHeader({
  conversationName,
  conversationPicture,
  onClick
}: {
  conversationName: string
  conversationPicture: string
  onClick: () => void
}) {
  return (
    <div className="bg-white w-full flex flex-row items-center justify-between p-[12px]">
      <div className="flex flex-row space-x-[16px] items-center">
        <img
          className="h-[56px] w-[56px] rounded-full"
          src={conversationPicture}
          alt="Conversation"
        ></img>
        <h1 className="text-blue-800">{conversationName}</h1>
      </div>
      <Button onClick={onClick} buttonText="Edit background 🎨"></Button>
    </div>
  )
}
