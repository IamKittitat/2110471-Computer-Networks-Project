import { environment } from "../common/constants/environment"

export const userServices = {
  register: async (username: string, password: string) => {
    try {
      const response = await fetch(`${environment.backend.url}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
      if (response.status === 500) {
        return null
      }
      return await response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  },
  login: async (username: string, password: string) => {
    try {
      const response = await fetch(`${environment.backend.url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      })
      if (response.status === 500) {
        return null
      }
      return await response.json()
    } catch (error) {
      console.error(error)
      return null
    }
  },

  getUserInfo: async (userId: string) => {
    const response = await fetch(`${environment.backend.url}/user/info?userId=${userId}`)
    return await response.json()
  },

  getUsers: async () => {
    const response = await fetch(`${environment.backend.url}/user`)
    return await response.json()
  }
}
