// import { useContext, useEffect, useState } from "react"
import NavBar from "../../common/components/NavBar/NavBar"
// import { ExampleService } from "./services/ExampleService"

export default function ExamplePage() {
  // useEffect(() => {
  //   const fetchAllTests = async () => {
  //     const customer = ExampleService.testCustomer(token)
  //     const fortuneTeller = ExampleService.testFortuneTeller(token)
  //     const admin = ExampleService.testAdmin(token)
  //     const results = await Promise.all([customer, fortuneTeller, admin])
  //     console.log("results", results)
  //     console.log("userType", userType)
  //   }
  //   fetchAllTests()
  // }, [userType, token])

  return (
    <>
      <NavBar menuFocus={"home"} />
    </>
  )
}
