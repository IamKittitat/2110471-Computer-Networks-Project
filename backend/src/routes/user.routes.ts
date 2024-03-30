import express from "express"
import { userController } from "../controllers/user.controller"

const router = express.Router()

// expecting a get request to /user?username=...
router.get("/", userController.getListOfUsers)

export default router
