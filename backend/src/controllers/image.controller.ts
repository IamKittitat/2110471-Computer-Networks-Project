import { Request, Response } from "express"
import { imageService } from "../services/image.service"

export const imageController = {
  upload: async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json("No file uploaded")
      }
      const file = req.file
      const image = await imageService.upload(file)
      return res.status(200).json(image)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
