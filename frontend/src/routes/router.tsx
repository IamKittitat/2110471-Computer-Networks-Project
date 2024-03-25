import { Route, Routes } from "react-router-dom"
import { getPagesData } from "./getPagesData"

const Router = () => {
  const pagesData = getPagesData()
  const pageRoutes = pagesData.map((pageRoute, index) => {
    return <Route key={index} {...pageRoute} />
  })

  return <Routes>{pageRoutes}</Routes>
}

export default Router
