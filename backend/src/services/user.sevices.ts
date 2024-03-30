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
  }
}
