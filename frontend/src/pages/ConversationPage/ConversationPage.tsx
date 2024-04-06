import ConversationBox from "./components/ConversationBox"

const mockSelectedConversationId = "9e0c5206-c0f2-40d0-8816-770a674da127"

export default function ConversationPage() {
  const userId = localStorage.getItem("token") || ""

  return (
    <>
      <div className="flex h-screen w-[845px]">
        <ConversationBox conversationId={mockSelectedConversationId} selfUserId={userId} />
      </div>
    </>
  )
}
