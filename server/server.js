require('dotenv').config()
const express = require("express")
const connection  = require('./databse/db')
const app = express()
const cors = require("cors")
const adminRouter = require("./routes/adminRoute") 
const musicRouter = require("./routes/musicRoute") 
const router = require("./routes/userRoute")
const Cloudinary = require("cloudinary").v2
const corsOptions ={
    origin:"http://localhost:5173",
    credentials :true,
    methods:["POST","GET","PATCH","DELETE","PUT"]
}
app.use(cors(corsOptions))
app.use(express.json())
app.use("/user",router)
app.use("/admin",adminRouter)
app.use("/music",musicRouter)
Cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_SECRET_KEY,
    }
)

connection().then(()=>{
    app.listen(2000,()=>{
        console.log('serevr is running on port 2000');
        
    })
}) 
