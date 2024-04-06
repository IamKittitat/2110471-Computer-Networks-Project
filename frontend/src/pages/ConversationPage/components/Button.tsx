export default function Button({
  buttonText,
  onClick
}: {
  buttonText: string
  onClick: () => void
}) {
  return (
    <button
      className="flex text-blue-500 border-gray-200 px-[16px] py-[8px] border-2 rounded-md
    hover:bg-gray-100 hover:border-blue-500 transition"
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}
