import { userRepository } from "../repositories/user.repository"

export const userServices = {
  getListOfUsers: async (username: string) => {
    await userRepository.addUser(username)
    return await userRepository.getUsersList()
  },
  updateProfilePicture: async (username: string, profile_picture: string) => {
    return await userRepository.updateProfilePicture(username, profile_picture)
  }
}
