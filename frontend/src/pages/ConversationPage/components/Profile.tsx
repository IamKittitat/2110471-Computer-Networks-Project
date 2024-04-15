import { environment } from "../../../common/constants/environment"
import { LocalStorageUtils } from "../../../common/utils/LocalStorageUtils"
import Button from "./Button"
import EditProfileIcon from "./EditProfileIcon"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"

export default function Profile({
  userPicture,
  userName,
  onClick
}: {
  userPicture: string | null
  userName: string | null
  onClick: () => void
}) {
  const navigate = useNavigate()
  const socket = io(environment.backend.url)

  const handleLogout = () => {
    socket.emit("connected-user")
    LocalStorageUtils.removeData("token")
    navigate("/home")
  }

  return (
    <div className="flex items-center justify-start w-full gap-4">
      <img
        className="h-20 w-20 object-cover rounded-full"
        src={userPicture || ""}
        alt="userPicture"
      ></img>
      <div className="flex flex-col items-start gap-1">
        <div className="flex gap-2">
          <p className="text-gray-900 font-semibold text-xl">{userName}</p>
          <button onClick={onClick}>
            <EditProfileIcon />
          </button>
        </div>

        <Button onClick={handleLogout} buttonText="Log out 👋" />
      </div>
    </div>
  )
}
