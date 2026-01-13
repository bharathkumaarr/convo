import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'

const app = express()


app.use(express.json())
app.use(cookieparser())



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
