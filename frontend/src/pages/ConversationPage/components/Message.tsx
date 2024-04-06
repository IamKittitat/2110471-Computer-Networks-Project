import { useState, useEffect } from "react"
import { userServices } from "../../../services/UserServices"
import { info } from "autoprefixer"

export default function Message({
  message,
  sender,
  timeSent,
  isShowTime,
  isShowName,
  self
}: {
  message: string
  sender: string
  timeSent: number
  isShowTime: boolean
  isShowName: boolean
  self: boolean
}) {
  const [senderName, setSenderName] = useState<string>("")
  const [senderProfile, setSenderProfile] = useState<string>("")

  useEffect(() => {
    const fetchSender = async () => {
      const info = await userServices.getUserInfo(sender)

      setSenderName(info.username)
      setSenderProfile(
        info.profile_picture === null
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEupjs-v_GGm_M3POkQCZZwcrdUyHXtIt2vcFL1ahPEMZ20cP1rC5c7oArrtBKoTS5AU&usqp=CAU"
          : info.profile_picture
      )
    }
    fetchSender()
  }, [])

  return (
    <div className={`flex items-end ${self ? "flex-row-reverse" : "flex-row"}`}>
      {self ? (
        <></>
      ) : !isShowTime ? (
        <div className="w-[56px] mr-4"></div>
      ) : (
        <img src={senderProfile} className=" rounded-full w-[56px] h-[56px] mr-4"></img>
      )}
      <div className={`flex flex-col ${self ? "items-end" : ""}`}>
        {isShowName ? <h5 className="pb-[4px] pt-[16px] text-gray-900">{senderName}</h5> : <></>}
        <div className={`flex`}>
          <div
            className={`rounded-t-xl px-[16px] py-[12px] ${
              self
                ? " rounded-l-xl bg-blue-500 text-white"
                : "rounded-r-xl bg-gray-100 text-gray-900"
            } word-wrap break-words max-w-[600px]`}
          >
            {message}
          </div>
        </div>
        {isShowTime ? (
          <div
            className={`text-gray-500 pt-[4px] justify-end flex items-center mix-blend-difference ${
              self ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <h6>
              {`${new Date(timeSent).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric"
              })}`}
            </h6>
            <div className="rounded-full h-[4px] w-[4px] bg-gray-500 mx-1"></div>
            <h6>
              {`${new Date(timeSent).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
              })}`}
            </h6>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
