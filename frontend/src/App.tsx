import "./App.css"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import { useEffect } from "react"
import { userServices } from "./services/UserServices"
import io from "socket.io-client"
import { environment } from "./common/constants/environment"
import { User } from "./common/types/user"

let renderOnce = true

const socket = io(environment.backend.url)

const App = () => {
  useEffect(() => {
    socket.emit("connected-user")
    socket.on("receive-connected-user", (users: User[]) => {
      console.log("Connected users", users)
    })
    return () => {
      socket.off("receive-connected-user")
    }
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("token") === "") {
      if (!renderOnce) return
      renderOnce = false
      const fetchUsers = async () => {
        // console.log("fetching users")
        let login
        while (!localStorage.getItem("token") || localStorage.getItem("token") === "") {
          let username = prompt("Please enter your username")
          let password = prompt("Please enter your password")
          while (username === "" || password === "" || username === null || password === null) {
            username = prompt("Please enter your username")
            password = prompt("Please enter your password")
          }
          const register = await userServices.register(username, password)
          login = await userServices.login(username, password)
          console.log(register, login)
          if (register === null && login === null) {
            alert("Error login user")
          } else {
            localStorage.setItem("token", login)
            socket.emit("connected-user")
          }
        }
      }
      fetchUsers()
    }
  }, [])

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
