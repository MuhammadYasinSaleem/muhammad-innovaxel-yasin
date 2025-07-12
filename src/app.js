import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

dotenv.config()

const app=express()
const PORT=process.env.PORT || 3000

app.use(express.json())

connectDB()

app.get('/',(req,res)=>{
    res.send("URL Shortener is running")
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
