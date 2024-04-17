import { environment } from "../../../common/constants/environment"
import { LocalStorageUtils } from "../../../common/utils/LocalStorageUtils"
import { userServices } from "../../../services/UserServices"
import Button from "./Button"
import EditProfileIcon from "./EditProfileIcon"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"

const socket = io(environment.backend.url)

export default function Profile({
  userPicture,
  userName,
  onClick,
  userId
}: {
  userPicture: string | null
  userName: string | null
  onClick: () => void
  userId: string
}) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await userServices.logout(userId)
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
