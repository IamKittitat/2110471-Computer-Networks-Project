import { RouteProps } from "react-router-dom"
import ExampleApp from "../pages/ExamplePage/ExampleApp"
import HomeApp from "../pages/HomePage/HomeApp"
import ConversationApp from "../pages/ConversationPage/ConversationApp"
import Redirect from "./Redirect"

export const getPagesData = () =>
  [
    {
      path: "/",
      element: <Redirect to={"/home"} />
    },
    {
      path: "/home",
      element: <HomeApp />
    },
    {
      path: "/conversation/:cid",
      element: <ConversationApp />
    },
    {
      path: "/conversation",
      element: <ConversationApp />
    },
    {
      path: "/example",
      element: <ExampleApp />
    }
  ] as unknown as RouteProps[]
