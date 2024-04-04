import Button from "./Button"

export default function ConversationHeader({ otherName }: { otherName: string }) {
  return (
    <div className="bg-white w-full flex flex-row items-center justify-between p-[16px]">
      <div className="flex flex-row space-x-[16px] items-center">
        <img
          className="h-[56px] rounded-full"
          src="https://avatars.githubusercontent.com/u/58716471?v=4"
        ></img>
        <h1 className="text-blue-800">Buildka</h1>
      </div>
      <Button buttonText="Edit background 🎨"></Button>
    </div>
  )
}
