export default function Message({
  message,
  sender,
  timeSent,
  isShowTime,
  self
}: {
  message: string
  sender: string
  timeSent: number
  isShowTime: boolean
  self: boolean
}) {
  return (
    <div className="flex flex-col">
      <div className={`flex ${self ? "flex-row" : "flex-row-reverse"} justify-end items-end`}>
        <div
          className={`rounded-t-xl px-[16px] py-[12px] ${
            self ? " rounded-l-xl bg-blue-500 text-white" : "rounded-r-xl bg-gray-100 text-gray-900"
          } word-wrap break-words max-w-[600px]`}
        >
          {message}
        </div>
      </div>
      {isShowTime ? (
        <div
          className={`text-gray-600 pt-[4px] justify-end flex items-center space-x-1 ${
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
          <div className="rounded-full h-[4px] w-[4px] bg-gray-300"></div>
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
  )
}
