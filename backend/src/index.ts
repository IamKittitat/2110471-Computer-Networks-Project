import express, { Request, Response, Application } from "express"
import userRouter from "./routes/user.routes"
import exampleRouter from "./routes/example.routes"
import conversationRouter from "./routes/conversation.routes"
import cors from "cors"
import { connectToSocket } from "./configs/socketConnection"
import { connectToDatabase } from "./configs/pgdbConnection"
import logger from "morgan"
import { environment } from "./configs/environment"

const app: Application = express()
const port = environment.server.port
const server = connectToSocket(app)

app.use(
  cors({
    origin: "*"
  })
)

app.use(express.json())

app.use(logger("dev"))

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})

app.use("/example", exampleRouter)
app.use("/user", userRouter)
app.use("/conversations", conversationRouter)

connectToDatabase().catch((error) => {
  console.error("Error connecting to the database:", error)
})

export default app
