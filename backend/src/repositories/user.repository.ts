import { db } from "../configs/pgdbConnection"
import { User } from "../models/user.model"

export const userRepository = {
  getUsersList: async (): Promise<User[]> => {
    try {
      const users = await db.query("SELECT * FROM USER_TABLE")
      return users.rows
    } catch (error) {
      console.error("Error getting USER_TABLE list:", error)
      return []
    }
  },
  register: async (username: string, password: string): Promise<User | null> => {
    try {
      const existedUser = await db.query("SELECT * FROM USER_TABLE WHERE username = $1", [username])
      if (existedUser.rows.length > 0) {
        return null
      }
      const user = await db.query(
        "INSERT INTO USER_TABLE (username, password) VALUES ($1, $2)",
        [username, password]
      )
      return user.rows[0]
    } catch (error) {
      console.error("Error adding user:", error)
      return null
    }
  },
  login: async (username: string, password: string): Promise<string | null> => {
    try {
      const user = await db.query(
        "SELECT user_id FROM USER_TABLE WHERE username = $1 AND password = $2",
        [username, password]
      )
      return user.rows[0].user_id
    } catch (error) {
      console.error("Error logging in:", error)
      return null
    }
  },
  updateProfilePicture: async (userId: string, profile_picture: string): Promise<User | null> => {
    try {
      const user = await db.query("UPDATE USER_TABLE SET profile_picture = $1 WHERE user_id = $2", [
        profile_picture,
        userId
      ])
      return user.rows[0]
    } catch (error) {
      console.error("Error updating profile picture:", error)
      return null
    }
  }
}
