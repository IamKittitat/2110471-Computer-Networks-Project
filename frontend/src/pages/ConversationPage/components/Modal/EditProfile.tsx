import { SetStateAction, useEffect, useRef, useState } from "react"
import ModalOverlay from "./ModalOverlay"
import Button from "../Button"
import { userServices } from "../../../../services/UserServices"

export default function EditProfile({
  oldName,
  oldPicture,
  userId,
  isVisible,
  onClose
}: {
  oldName: string
  oldPicture: string
  userId: string
  isVisible: boolean
  onClose: () => void
}) {
  const [name, setName] = useState<string>(oldName)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [previewFile, setPreviewFile] = useState<string | null>(null)

  const handleUploadPictureButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "" // Reset the value of the file input
      fileInputRef.current.click()
    }
  }

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      setFile(fileList[0])
    }
  }

  const handleSubmitButton = async () => {
    if (file !== null) {
      const formData = new FormData()
      formData.append("profile", file)
      formData.append("userId", userId)

      await userServices.upload(formData)
    }
    await userServices.updateUsername(userId, name)
    onClose()
  }

  useEffect(() => {
    // create the preview
    let objectUrl: SetStateAction<string> = oldPicture
    if (file) {
      objectUrl = URL.createObjectURL(file)
    }

    setPreviewFile(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <ModalOverlay isVisible={isVisible} onClose={onClose}>
      <div
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className="rounded-lg z-10 flex flex-col justify-items-center items-center p-6 space-y-4 h-[435px] w-[308px]"
      >
        <button
          className="relative w-[260px] h-[260px] rounded-full bg-gray-300 flex"
          onClick={handleUploadPictureButtonClick}
        >
          <input
            id="fileForm"
            name="fileForm"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handlePictureChange}
            className="absolute w-full h-full rounded-full opacity-0 cursor-pointer"
          />
          {previewFile !== null ? (
            <img src={previewFile} className="h-full w-full rounded-full object-cover" />
          ) : (
            <div />
          )}
        </button>

        <div className="flex flex-col justify-start w-full gap-1">
          <p className="font-semibold">Display Name</p>
          <textarea
            id="name"
            className="h-9 w-full resize-none overflow-hidden px-3 py-1 border-gray-200 border-[1.5px] rounded-md"
            value={name}
            placeholder="Change your name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-1 w-full">
          <Button onClick={onClose} buttonText="Cancel" isRed={true} />
          <Button onClick={handleSubmitButton} buttonText="Done" isBlue={true} />
        </div>
      </div>
    </ModalOverlay>
  )
}
