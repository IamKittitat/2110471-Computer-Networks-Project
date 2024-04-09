export default function Button({
  buttonText,
  onClick,
  isBlue
}: {
  buttonText: string
  onClick: () => void
  isBlue?: boolean
}) {
  return (
    <button
      className={`flex border-gray-200 px-[16px] py-[8px] border-2 rounded-md
     transition hover:bg-gray-100 hover:border-blue-500 ${
       isBlue ? "bg-blue-500 text-white hover:text-blue-500" : "text-blue-500"
     }`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}
