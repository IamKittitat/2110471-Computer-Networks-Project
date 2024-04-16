import { Request, Response } from "express"
import { userServices } from "../services/user.sevices"

const getListOfUsers = async (req: Request, res: Response) => {
  const users = await userServices.getListOfUsers()
  res.status(200).json(users)
}

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await userServices.register(username, password)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(500).json("Error registering user")
  }
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user_id = await userServices.login(username, password)
  if (user_id) {
    const user = await userServices.reconnect(user_id)
    if (user) {
      res.status(200).json(user_id)
    } else {
      res.status(500).json("Error reconnecting user")
    }
  } else {
    res.status(500).json("Error logging in")
  }
}

const upload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json("No file uploaded")
    }
    if (!req.body.userId) {
      return res.status(400).json("No user id provided")
    }
    const file = req.file
    const image = await userServices.upload(req.body.userId, file)
    return res.status(200).json(image)
  } catch (error) {
    return res.status(500).json(error)
  }
}

const updateUsername = async (req: Request, res: Response) => {
  const { userId, username } = req.body
  const user = await userServices.updateUsername(userId, username)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(500).json("Error updating username")
  }
}

const getUserInfo = async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const user = await userServices.getUserInfo(userId)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(500).json("Error getting username")
  }
}

const removeUser = async (req: Request, res: Response) => {
  const userId = req.query.userId as string
  const user = await userServices.removeUser(userId)
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(500).json("Error removing user")
  }
}

export const userController = {
  getListOfUsers,
  register,
  login,
  upload,
  updateUsername,
  getUserInfo,
  removeUser
}
