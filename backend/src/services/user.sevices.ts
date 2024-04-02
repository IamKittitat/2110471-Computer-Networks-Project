import bucket from "../configs/firebase"
import { userRepository } from "../repositories/user.repository"

export const userServices = {
  register: async (username: string, password: string) => {
    return await userRepository.register(username, password)
  },
  login: async (username: string, password: string) => {
    return await userRepository.login(username, password)
  },
  getListOfUsers: async () => {
    return await userRepository.getUsersList()
  },
  updateProfilePicture: async (userId: string, profile_picture: string) => {
    return await userRepository.updateProfilePicture(userId, profile_picture)
  },
  upload: async (userId: string, file: Express.Multer.File) => {
    const image = bucket.file(file.originalname)
    await image.save(file.buffer)
    await image.makePublic()
    const publicUrl = image.publicUrl()
    return await userRepository.updateProfilePicture(userId, publicUrl)
  },
  updateUsername: async (userId: string, username: string) => {
    return await userRepository.updateUsername(userId, username)
  }
}
