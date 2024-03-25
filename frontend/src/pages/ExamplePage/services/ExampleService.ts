import { environment } from "../../../common/constants/environment"

export const ExampleService = {
  testHelloWorld: async () => {
    const response = await fetch(`${environment.backend.url}/example/test`, {
      method: "GET"
    })
    const data = await response.json()
    return data.message
  }
}
