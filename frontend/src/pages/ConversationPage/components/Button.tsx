export default function Button({
  buttonText,
  onClick,
  isBlue,
  isRed
}: {
  buttonText: string
  onClick: () => void
  isBlue?: boolean
  isRed?: boolean
}) {
  return (
    <button
      className={`flex min-w-[85px] border-gray-200 px-[16px] py-[8px] border-2 rounded-md
     transition hover:bg-gray-100 hover:border-blue-500 justify-center text-center ${
       isBlue ? "bg-blue-500 text-white hover:text-blue-500" : "text-blue-500"
     } ${
        isRed ? "text-red-cancel hover:border-red-cancel hover:bg-red-cancel hover:text-white" : ""
      }`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}
