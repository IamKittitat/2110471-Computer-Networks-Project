import { useState } from "react"
import Button from "../Button"

export default function NameList({
  onAdd,
  onRemove,
  name,
  picture
}: {
  onAdd: () => void
  onRemove: () => void
  name: string
  picture: string
}) {
  const [isAdded, setIsAdded] = useState<boolean>(false)
  const handleOnAdd = () => {
    onAdd()
    setIsAdded(!isAdded)
  }
  const handleOnRemove = () => {
    onRemove()
    setIsAdded(!isAdded)
  }
  return (
    <div className="flex items-center justify-between h-[79px] w-[95%] rounded-md mt-[10px] cursor-pointer">
      <div className="flex items-center">
        <img
          src={picture}
          alt="Profile Picture"
          className="h-[60px] w-[60px] rounded-full bg-black mx-2"
        />
        <div className="flex flex-col ml-4">
          <p className="font-semibold">{name}</p>
        </div>
      </div>
      <div className="mx-2">
        {!isAdded && <Button onClick={handleOnAdd} buttonText="Add to group" />}
        {isAdded && <Button onClick={handleOnRemove} buttonText="Remove" isRed={true} />}
      </div>
    </div>
  )
}
