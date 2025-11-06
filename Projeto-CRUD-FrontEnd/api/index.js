import express from "express"
import cors from "cors"
import userRoutes from "./routes/users.js"

const app = express()

// Fazer requisições
app.use(express.json())
app.use(cors()) // Evitar conflitos 

// Caminho inicial seria useRoutes
app.use("/", userRoutes)

// Porta
app.listen(8800)