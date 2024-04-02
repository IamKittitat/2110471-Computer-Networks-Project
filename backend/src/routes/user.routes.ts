import express from "express"
import { userController } from "../controllers/user.controller"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

// expecting a get request to /user
router.get("/", userController.getListOfUsers)
router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/upload", upload.single("profile"), userController.upload)
router.post("/username", userController.updateUsername)

export default router
