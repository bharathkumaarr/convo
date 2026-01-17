import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js";


const app = express()


app.use(express.json())
app.use(cookieparser())

app.use("/api/auth", authRoutes);




app.use(
    cors({
        origin: "https://localhost:5173",
        credentials: true
    })
)
app.get('/health', (req,res)=>{
    res.status(200).json({status:'ok', service: 'convo-api'})
})


export default app
