import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import urlRoutes from './routes/url.routes.js';
import cors from "cors"


dotenv.config()

const app=express()
const PORT=process.env.PORT || 3000

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())

connectDB()

app.use('/shorten',urlRoutes)

app.get('/',(req,res)=>{
    res.send("URL Shortener is running")
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
