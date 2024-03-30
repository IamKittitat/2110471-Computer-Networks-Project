import "./App.css"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import { useEffect } from "react"

const App = () => {

  useEffect(() => {
    if(!localStorage.getItem("token") || localStorage.getItem("token") === ""){
      let username = prompt("Please enter your username")
      while(!username || username === ""){
        username = prompt("Please enter your username")
      }
      localStorage.setItem("token", username)
    }
  })

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
