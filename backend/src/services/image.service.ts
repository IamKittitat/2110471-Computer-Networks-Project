import bucket from "../configs/firebase"

export const imageService = {
  upload: async (file: Express.Multer.File) => {
    const image = bucket.file(file.originalname)
    await image.save(file.buffer)
    await image.makePublic()
    return image.publicUrl()
  }
}
