import express from 'express'
import cors from 'cors'
import cookieparser from 'cookie-parser'

import authRoutes from "./routes/auth.routes.js";
import { requireAuth } from "./middlewares/auth.middleware.js";
import projectRoutes from "./routes/project.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";






const app = express()


app.use(express.json())
app.use(cookieparser())
app.use(
    cors({
        origin: "https://convo-sigma.vercel.app",
        credentials: true
    })
)

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/chat", messageRoutes);







app.get('/health', (req,res)=>{
    res.status(200).json({status:'ok', service: 'convo-api'})
})

app.get("/api/protected", requireAuth, (req, res) => {
  res.json({
    message: "You are authenticated",
    userId: req.user.id,
  });
});



export default app
