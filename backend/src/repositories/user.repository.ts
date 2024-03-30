import { db } from "../configs/pgdbConnection"
import { v4 as uuidv4 } from "uuid"
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
  addUser: async (username: string): Promise<User | null> => {
    const user_id = uuidv4()
    const password = "No Password were implemented yet"
    try {
      const existedUser = await db.query("SELECT * FROM USER_TABLE WHERE username = $1", [username])
      if (existedUser.rows.length > 0) {
        return existedUser.rows[0]
      }
      const user = await db.query(
        "INSERT INTO USER_TABLE (user_id, username, password) VALUES ($1, $2, $3)",
        [user_id, username, password]
      )
      return user.rows[0]
    } catch (error) {
      console.error("Error adding user:", error)
      return null
    }
  },
  updateProfilePicture: async (username: string, profile_picture: string): Promise<User | null> => {
    try {
      const user = await db.query(
        "UPDATE USER_TABLE SET profile_picture = $1 WHERE username = $2",
        [profile_picture, username]
      )
      return user.rows[0]
    } catch (error) {
      console.error("Error updating profile picture:", error)
      return null
    }
  }
}
