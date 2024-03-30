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
    res.status(200).json(user_id)
  } else {
    res.status(500).json("Error logging in")
  }
}

export const userController = {
  getListOfUsers,
  register,
  login
}
