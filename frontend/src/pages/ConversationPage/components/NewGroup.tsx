import Button from "./Button"

export default function NewGroup({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center justify-between h-[79px] w-[95%] rounded-md mt-[10px]">
      <div className="flex items-center">
        <div className="flex justify-center items-center text-center h-[60px] w-[60px] rounded-full bg-blue-500 mx-2">
          <p className="text-white text-3xl mb-1">+</p>
        </div>
        <div className="flex flex-col ml-4 text-gray-900">
          <p className="text-lg font-semibold">New Group</p>
        </div>
      </div>
      <div className="mx-2">
        <Button onClick={onClick} buttonText="Create 👥" isBlue={true}></Button>
      </div>
    </div>
  )
}
