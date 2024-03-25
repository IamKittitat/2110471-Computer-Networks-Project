import { useEffect, useState } from "react"
import NavBar from "../../common/components/NavBar/NavBar"
import { ExampleService } from "./services/ExampleService"

export default function ExamplePage() {
  const [hello, setHello] = useState<string>("")
  useEffect(() => {
    const fetchAllTests = async () => {
      const hello = await ExampleService.testHelloWorld()
      setHello(hello)
    }
    fetchAllTests()
  }, [])

  return (
    <>
      <NavBar menuFocus={"home"} />
      <h1 className="text-white">Message from backend: {hello}</h1>
    </>
  )
}
