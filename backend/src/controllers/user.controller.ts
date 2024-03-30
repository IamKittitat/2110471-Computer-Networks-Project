import { Request, Response } from "express"
import { userServices } from "../services/user.sevices"

const getListOfUsers = async (req: Request, res: Response) => {
  const users = await userServices.getListOfUsers(req.query.username as string)
  res.status(200).json(users)
}

export const userController = {
  getListOfUsers
}
