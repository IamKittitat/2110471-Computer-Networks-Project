import SendIcon from "@mui/icons-material/Send"

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
    <div className="h-[59px] p-4 flex justify-center items-center">
      <div className="flex ml-2">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your Message"
          className="p-2 bg-gray-100 rounded-l-lg w-[821px]"
        />
        <button onClick={sendMessage} className="p-2 bg-gray-100 rounded-r-lg">
          <SendIcon />
        </button>
      </div>
    </div>
  )
}
