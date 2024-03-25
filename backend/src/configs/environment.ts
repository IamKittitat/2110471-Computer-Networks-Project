import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

export const environment = {
  server: {
    port: parseInt(process.env.PORT ?? "5002")
  },
  pg: {
    user: process.env.PG_USER ?? "",
    host: process.env.PG_HOST ?? "",
    database: process.env.PG_DATABASE ?? "",
    port: parseInt(process.env.PG_PORT ?? "5432"),
    password: process.env.PG_PASSWORD ?? ""
  },
}
