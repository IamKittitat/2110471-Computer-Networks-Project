import Button from "./Button"

export default function Profile({
  userPicture,
  userName,
  onClick
}: {
  userPicture: string | null
  userName: string | null
  onClick: () => void
}) {
  return (
    <div className="flex items-center justify-start w-full gap-4">
      <img
        className="h-20 w-20 object-cover rounded-full"
        src={userPicture}
        alt="userPicture"
      ></img>
      <div className="flex flex-col items-start gap-1">
        <p className="text-gray-900 font-semibold text-xl">{userName}</p>
        <Button onClick={onClick} buttonText="Edit profile 🖋️"></Button>
      </div>
    </div>
  )
}
