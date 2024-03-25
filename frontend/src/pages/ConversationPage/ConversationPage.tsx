import NavBar from "../../common/components/NavBar/NavBar"
import ConversationBox from "./components/ConversationBox"

const mockSelfUserId = "11111111-1111-1111-1111-111111111111"
const mockSelectedConversationId = "44444444-4444-4444-4444-444444444444"

export default function ConversationPage() {
  return (
    <>
      <NavBar menuFocus={"conversation"} />
      <div className="flex h-screen">
        <ConversationBox conversationId={mockSelectedConversationId} selfUserId={mockSelfUserId} />
      </div>
    </>
  )
}
