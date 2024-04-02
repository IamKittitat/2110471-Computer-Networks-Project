import express from "express"
import { imageController } from "../controllers/image.controller"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const router = express.Router()

router.post("/upload", upload.single("image"), imageController.upload)

export default router
