import SendIcon from "./SendIcon"

export default function ConversationFooter({
  messageText,
  setMessageText,
  sendMessage
}: {
  messageText: string
  setMessageText: (message: string) => void
  sendMessage: () => void
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="flex w-full px-[16px] py-[12px] bg-white">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Aa"
        className="bg-gray-200 rounded-l-full w-full h-[40px] px-[16px]"
      />
      <button onClick={sendMessage} className="p-2 bg-gray-200 rounded-r-full">
        <SendIcon />
      </button>
    </div>
  )
}
