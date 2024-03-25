export default function ConversationHeader({ otherName }: { otherName: string }) {
  return (
    <div className="flex flex-col bg-white bg-opacity-85">
      <div className="font-bold text-xl mr-2">{otherName}</div>
    </div>
  )
}
