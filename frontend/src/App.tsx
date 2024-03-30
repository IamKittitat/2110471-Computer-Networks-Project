import "./App.css"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import { useEffect } from "react"
import { userServices } from "./services/UserServices"

let renderOnce = true

const App = () => {

  useEffect(() => {
    if(!localStorage.getItem("token") || localStorage.getItem("token") === ""){
      if(!renderOnce) return
      renderOnce = false
      const fetchUsers = async () => {
        // console.log("fetching users")
        let login
        while(!localStorage.getItem("token") || localStorage.getItem("token") === ""){
          let username = prompt("Please enter your username")
          let password = prompt("Please enter your password")
          while(username === "" || password === "" || username === null || password === null){
            username = prompt("Please enter your username")
            password = prompt("Please enter your password")
          }
          const register = await userServices.register(username, password)
          login = await userServices.login(username, password)
          console.log(register, login)
          if(register === null && login === null){
            alert("Error login user")
          } else {
            localStorage.setItem("token", login)
          }
        }
      }
      fetchUsers()
    }
  },[])

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
