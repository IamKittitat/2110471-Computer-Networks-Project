import express from "express"
import { userController } from "../controllers/user.controller"

const router = express.Router()

// expecting a get request to /user
router.get("/", userController.getListOfUsers)
router.post("/register", userController.register)
router.post("/login", userController.login)

export default router
